import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, loadPdfLib, loadPdfjs } from "@/lib/tools/pdf-runtime";
import { useLocale } from "@/lib/i18n/context";

type FieldType = "text" | "checkbox" | "radio" | "dropdown";

interface FormField {
  name: string;
  type: FieldType;
  value: string;
  options?: string[];
  readOnly: boolean;
  required: boolean;
  multiline: boolean;
}

type Phase = "idle" | "loading" | "filling" | "processing" | "done" | "error";

async function detectFields(file: File): Promise<FormField[]> {
  const { getDocument } = await loadPdfjs();
  const buf = await file.arrayBuffer();
  const doc = await getDocument({ data: buf }).promise;
  const fields: FormField[] = [];
  const seenNames = new Set<string>();

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: any[] = await (page as any).getAnnotations();
    for (const ann of annotations) {
      if (ann.subtype !== "Widget") continue;
      const name: string = ann.fieldName ?? ann.alternativeText ?? `campo-${fields.length + 1}`;
      if (seenNames.has(name)) continue;
      seenNames.add(name);

      const fieldType = ann.fieldType as string | undefined;
      let type: FieldType = "text";
      let options: string[] | undefined;
      let value = "";

      if (fieldType === "Tx") {
        type = "text";
        value = typeof ann.fieldValue === "string" ? ann.fieldValue : "";
      } else if (fieldType === "Btn") {
        if (ann.radioButton) {
          type = "radio";
          options = ann.exportValue ? [ann.exportValue] : [];
        } else {
          type = "checkbox";
          value = ann.fieldValue === "On" || ann.fieldValue === true ? "true" : "false";
        }
      } else if (fieldType === "Ch") {
        type = "dropdown";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options = Array.isArray(ann.options) ? ann.options.map((o: any) => o.displayValue ?? o.exportValue) : [];
        value = typeof ann.fieldValue === "string" ? ann.fieldValue : (options?.[0] ?? "");
      }

      fields.push({ name, type, value, options, readOnly: Boolean(ann.readOnly), required: Boolean(ann.required), multiline: Boolean(ann.multiLine) });
    }
  }
  return fields;
}

async function fillAndExport(file: File, fields: FormField[]): Promise<Uint8Array> {
  const { PDFDocument } = await loadPdfLib();
  const buf = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const form = pdfDoc.getForm();
  const pdfFields = form.getFields();

  for (const fieldDef of fields) {
    if (fieldDef.readOnly) continue;
    const pdfField = pdfFields.find((f) => f.getName() === fieldDef.name);
    if (!pdfField) continue;
    try {
      const typeName = pdfField.constructor.name;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeName === "PDFTextField") (pdfField as any).setText(fieldDef.value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else if (typeName === "PDFCheckBox") { if (fieldDef.value === "true") (pdfField as any).check(); else (pdfField as any).uncheck(); }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else if (typeName === "PDFRadioGroup") { try { (pdfField as any).select(fieldDef.value); } catch { /* ignore */ } }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else if (typeName === "PDFDropdown") { try { (pdfField as any).select(fieldDef.value); } catch { /* ignore */ } }
    } catch { /* skip non-fillable */ }
  }
  return pdfDoc.save({ useObjectStreams: true });
}

export function FormFillWorkspace() {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState("");
  const [outputSize, setOutputSize] = useState(0);

  useEffect(() => { return () => { if (outputUrl) URL.revokeObjectURL(outputUrl); }; }, [outputUrl]);

  const reset = useCallback(() => {
    setFile(null); setFields([]); setPhase("idle"); setMessage(null);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl(null); setOutputName(""); setOutputSize(0);
  }, [outputUrl]);

  const loadFile = useCallback(async (f: File) => {
    if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
      setPhase("error"); setMessage("Solo se aceptan archivos PDF con campos de formulario AcroForm."); return;
    }
    setFile(f); setPhase("loading"); setMessage(null); setFields([]);
    if (outputUrl) URL.revokeObjectURL(outputUrl); setOutputUrl(null);
    try {
      const detected = await detectFields(f);
      if (detected.length === 0) {
        setPhase("error");
        setMessage("Este PDF no contiene campos de formulario AcroForm compatibles. Solo funciona con PDFs que ya tengan campos definidos.");
        setFile(null); return;
      }
      setFields(detected); setPhase("filling");
    } catch (err) {
      setPhase("error");
      setMessage(err instanceof Error ? err.message : "Error al leer el formulario. Verifica que el PDF no esté protegido.");
      setFile(null);
    }
  }, [outputUrl]);

  const addFromInput = useCallback((fl: FileList | null) => { const f = fl?.[0]; if (f) loadFile(f); }, [loadFile]);
  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }, [loadFile]);
  const updateField = (index: number, value: string) => setFields((prev) => prev.map((f, i) => (i === index ? { ...f, value } : f)));

  const handleSubmit = async () => {
    if (!file) return;
    setPhase("processing"); setMessage(null);
    try {
      const bytes = await fillAndExport(file, fields);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const base = file.name.replace(/\.[^/.]+$/, "");
      setOutputUrl(url); setOutputName(`${base}-rellenado.pdf`); setOutputSize(blob.size); setPhase("done");
    } catch (err) {
      setPhase("filling"); setMessage(err instanceof Error ? err.message : "Error al exportar el PDF.");
    }
  };

  if (phase === "idle" || phase === "error") {
    return (
      <section className="surface-card overflow-hidden shadow-raised rounded-3xl border border-border/80" aria-label="Rellenar formulario PDF">
        <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => inputRef.current?.click()}
          className={`transition-all m-3.5 sm:m-5 rounded-2xl border-2 border-dashed px-6 py-10 sm:py-14 text-center cursor-pointer ${dragging ? "border-primary bg-primary-soft/80 scale-[1.006]" : "border-slate-300/90 bg-slate-50/50 hover:border-primary/60 hover:bg-white"}`}>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => addFromInput(e.target.files)} />
          <span className="mx-auto flex size-16 sm:size-18 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(49,94,234,0.28)]"><Upload className="size-8 sm:size-9" strokeWidth={2.3} aria-hidden /></span>
          <h2 className="mt-5 text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">Selecciona un PDF con formulario</h2>
          <p className="mt-1.5 text-[15px] text-slate-500 max-w-md mx-auto">Solo archivos PDF con campos AcroForm (texto, casillas, desplegables)</p>
          <div className="mt-6 flex justify-center"><Button size="lg" className="h-13 px-9 text-[16px] font-bold rounded-xl shadow-md" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} type="button">Seleccionar PDF</Button></div>
          <div className="mt-5 flex justify-center"><div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[13px] font-medium text-slate-600"><ShieldCheck className="size-4 text-slate-500 shrink-0" /><span>{t.workspace.privacyNote}</span></div></div>
        </div>
        {phase === "error" && message && (<div className="m-4 mt-0 flex items-start gap-3 rounded-xl bg-destructive-soft p-4 text-[14.5px] font-medium text-destructive"><AlertCircle className="size-5 shrink-0 mt-0.5" /><span>{message}</span></div>)}
      </section>
    );
  }

  if (phase === "loading") {
    return (<section className="surface-card p-8 shadow-raised rounded-3xl border border-border/80 flex items-center justify-center gap-3 text-primary font-semibold"><Loader2 className="size-5 animate-spin" /><span>Detectando campos del formulario…</span></section>);
  }

  if (phase === "done" && outputUrl) {
    return (
      <section className="surface-card overflow-hidden shadow-raised rounded-3xl border border-border/80">
        <div className="animate-rise border-t border-border bg-gradient-to-b from-success-soft/30 to-surface p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-success"><CheckCircle2 className="size-6" aria-hidden /><h3 className="text-[18px] font-bold">Formulario exportado con éxito</h3></div>
          <p className="mt-2 text-[15px] font-medium text-foreground/85">{fields.filter((f) => !f.readOnly).length} campos rellenados y guardados.</p>
          <div className="mt-5">
            <a href={outputUrl} download={outputName} className="transition-all flex items-center gap-3.5 rounded-xl border border-success/40 bg-surface p-4 shadow-subtle hover:-translate-y-0.5 hover:border-success hover:shadow-raised">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground"><Download className="size-5" aria-hidden /></div>
              <span className="min-w-0 flex-1"><span className="block truncate text-[15px] font-bold text-foreground">{outputName}</span><span className="text-[13px] font-semibold text-success">{formatBytes(outputSize)} · Descargar PDF rellenado</span></span>
            </a>
          </div>
          <div className="mt-5"><Button variant="outline" size="sm" onClick={reset} type="button">Rellenar otro formulario</Button></div>
        </div>
      </section>
    );
  }

  return (
    <section className="surface-card overflow-hidden shadow-raised rounded-3xl border border-border/80">
      <div className="border-b border-border bg-slate-50/60 px-6 py-4 flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><FileText className="size-5" /></div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[14.5px] font-bold text-foreground">{file?.name}</span>
          <span className="text-[13px] text-muted-foreground">{formatBytes(file?.size ?? 0)} · {fields.length} campo{fields.length !== 1 ? "s" : ""} detectado{fields.length !== 1 ? "s" : ""}</span>
        </div>
        <Button variant="outline" size="sm" onClick={reset} type="button">Cambiar</Button>
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="text-[16px] font-bold text-foreground mb-1">Campos del formulario</h3>
        <p className="text-[13px] text-muted-foreground mb-5">Rellena los campos y exporta el PDF con los datos guardados.</p>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                {field.name}
                {field.required && <span className="text-[10px] font-bold text-destructive uppercase tracking-wide">Obligatorio</span>}
                {field.readOnly && <span className="text-[10px] font-medium text-muted-foreground">(Solo lectura)</span>}
              </label>
              {field.type === "text" && !field.readOnly && (field.multiline
                ? <textarea value={field.value} onChange={(e) => updateField(index, e.target.value)} rows={3} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13.5px] text-slate-800 shadow-2xs transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y" />
                : <input type="text" value={field.value} onChange={(e) => updateField(index, e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13.5px] text-slate-800 shadow-2xs transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              )}
              {field.type === "text" && field.readOnly && (<div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13.5px] text-slate-500">{field.value || "(vacío)"}</div>)}
              {field.type === "checkbox" && !field.readOnly && (
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={field.value === "true"} onChange={(e) => updateField(index, e.target.checked ? "true" : "false")} className="size-4 rounded accent-primary cursor-pointer" />
                  <span className="text-[13.5px] text-slate-700">{field.value === "true" ? "Marcado" : "Sin marcar"}</span>
                </label>
              )}
              {field.type === "dropdown" && !field.readOnly && (
                <select value={field.value} onChange={(e) => updateField(index, e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13.5px] text-slate-800 shadow-2xs transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">— Selecciona una opción —</option>
                  {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
              {field.type === "radio" && !field.readOnly && field.options && (
                <div className="flex flex-wrap gap-3">
                  {field.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={field.name} value={opt} checked={field.value === opt} onChange={() => updateField(index, opt)} className="size-4 accent-primary cursor-pointer" />
                      <span className="text-[13.5px] text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button size="lg" onClick={handleSubmit} disabled={phase === "processing"} className="h-12 px-7 text-[15px] font-bold shadow-md">
            {phase === "processing" && <Loader2 className="mr-2 size-4 animate-spin" />}
            {phase === "processing" ? "Exportando PDF…" : "Exportar PDF rellenado"}
          </Button>
        </div>
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[13px] font-medium text-slate-600"><ShieldCheck className="size-4 text-slate-500 shrink-0" /><span>{t.workspace.privacyNote}</span></div>
        {message && (<div className="mt-5 flex items-start gap-3 rounded-xl bg-destructive-soft p-4 text-[14.5px] font-medium text-destructive"><AlertCircle className="size-5 shrink-0 mt-0.5" /><span>{message}</span></div>)}
      </div>
    </section>
  );
}
