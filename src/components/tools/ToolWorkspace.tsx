import { ArrowDown, ArrowUp, CheckCircle2, Download, Loader2, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import type { OptionValues, ToolDefinition, ToolOutput } from "@/lib/tools/types";

type Phase = "idle" | "processing" | "done" | "error";

export function ToolWorkspace({ tool }: { tool: ToolDefinition }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<ToolOutput[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const defaults = useMemo<OptionValues>(() => {
    const values: OptionValues = {};
    tool.options?.forEach((option) => {
      values[option.key] = option.default;
    });
    return values;
  }, [tool]);
  const [values, setValues] = useState<OptionValues>(defaults);

  useEffect(() => {
    setValues(defaults);
    setFiles([]);
    setOutputs([]);
    setPhase("idle");
    setMessage(null);
    setNote(null);
  }, [defaults]);

  useEffect(() => {
    const created = outputs.map((output) => URL.createObjectURL(output.blob));
    setUrls(created);
    return () => created.forEach((url) => URL.revokeObjectURL(url));
  }, [outputs]);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = tool.accept.split(",").map((type) => type.trim());
      const valid = [...incoming].filter(
        (file) =>
          accepted.includes(file.type) ||
          accepted.some((type) => type.startsWith(".") && file.name.toLowerCase().endsWith(type)),
      );
      if (valid.length === 0) {
        setPhase("error");
        setMessage("Ese formato de archivo no es válido para esta herramienta.");
        return;
      }
      setPhase("idle");
      setMessage(null);
      setOutputs([]);
      setFiles((current) => (tool.multiple ? [...current, ...valid] : valid.slice(0, 1)));
    },
    [tool],
  );

  const move = (index: number, direction: -1 | 1) => {
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      const a = next[index];
      const b = next[target];
      if (!a || !b) return current;
      next[index] = b;
      next[target] = a;
      return next;
    });
  };

  const run = async () => {
    if (!tool.run) return;
    if (files.length < tool.minFiles) {
      setPhase("error");
      setMessage(`Añade al menos ${tool.minFiles} archivo${tool.minFiles > 1 ? "s" : ""}.`);
      return;
    }
    setPhase("processing");
    setProgress(0);
    setMessage(null);
    setNote(null);
    setOutputs([]);
    try {
      const result = await tool.run(files, values, {
        onProgress: (ratio) => setProgress(Math.min(1, Math.max(0, ratio))),
      });
      setOutputs(result.outputs);
      setNote(result.note ?? null);
      setProgress(1);
      setPhase("done");
    } catch (error) {
      setPhase("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No se ha podido procesar el documento. Comprueba que el archivo no esté protegido.",
      );
    }
  };

  if (tool.status === "pending") {
    return (
      <section className="surface-card p-6 sm:p-8" aria-label="Herramienta en construcción">
        <span className="rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-warning">
          En construcción
        </span>
        <h2 className="mt-4 text-xl font-semibold">Esta herramienta todavía no está disponible</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {tool.pendingReason}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Preferimos decírtelo antes que ofrecerte un botón que no hace nada.
        </p>
      </section>
    );
  }

  return (
    <section className="surface-card overflow-hidden" aria-label={`Área de trabajo de ${tool.name}`}>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={`transition-standard m-3 rounded-xl border-2 border-dashed p-8 text-center ${
          dragging ? "border-primary bg-primary-soft" : "border-border bg-background"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={tool.accept}
          multiple={tool.multiple}
          className="sr-only"
          onChange={(event) => addFiles(event.target.files)}
        />
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Upload className="size-5" aria-hidden />
        </span>
        <h2 className="mt-4 text-lg font-semibold">
          {tool.multiple ? "Arrastra tus archivos aquí" : "Arrastra tu archivo aquí"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          o selecciónalo desde tu dispositivo · se procesa en tu navegador
        </p>
        <Button className="mt-5" onClick={() => inputRef.current?.click()} type="button">
          Seleccionar {tool.multiple ? "archivos" : "archivo"}
        </Button>
      </div>

      {files.length > 0 && (
        <div className="animate-rise border-t border-border p-5">
          <h3 className="text-sm font-semibold">
            {files.length} archivo{files.length > 1 ? "s" : ""} listo{files.length > 1 ? "s" : ""}
          </h3>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center gap-3 bg-surface px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                </span>
                {tool.multiple && files.length > 1 && (
                  <span className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Subir ${file.name}`}
                      className="transition-standard rounded-md border border-border p-1.5 text-muted-foreground hover:text-primary disabled:opacity-40"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === files.length - 1}
                      aria-label={`Bajar ${file.name}`}
                      className="transition-standard rounded-md border border-border p-1.5 text-muted-foreground hover:text-primary disabled:opacity-40"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                  aria-label={`Quitar ${file.name}`}
                  className="transition-standard rounded-md border border-border p-1.5 text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {tool.options && tool.options.length > 0 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {tool.options.map((option) => (
                <div key={option.key}>
                  <label
                    htmlFor={`opt-${option.key}`}
                    className="block text-sm font-medium text-foreground"
                  >
                    {option.label}
                  </label>
                  {option.type === "select" && (
                    <select
                      id={`opt-${option.key}`}
                      value={String(values[option.key] ?? option.default)}
                      onChange={(event) =>
                        setValues((v) => ({ ...v, [option.key]: event.target.value }))
                      }
                      className="transition-standard mt-1.5 w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-primary/60 focus:shadow-focus"
                    >
                      {option.options.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {option.type === "text" && (
                    <input
                      id={`opt-${option.key}`}
                      value={String(values[option.key] ?? "")}
                      placeholder={option.placeholder}
                      onChange={(event) =>
                        setValues((v) => ({ ...v, [option.key]: event.target.value }))
                      }
                      className="transition-standard mt-1.5 w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-primary/60 focus:shadow-focus"
                    />
                  )}
                  {option.type === "range" && (
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        id={`opt-${option.key}`}
                        type="range"
                        min={option.min}
                        max={option.max}
                        step={option.step}
                        value={Number(values[option.key] ?? option.default)}
                        onChange={(event) =>
                          setValues((v) => ({ ...v, [option.key]: Number(event.target.value) }))
                        }
                        className="h-1.5 w-full accent-primary"
                      />
                      <span className="w-14 shrink-0 text-sm tabular-nums text-muted-foreground">
                        {Number(values[option.key] ?? option.default)}
                        {option.unit ?? ""}
                      </span>
                    </div>
                  )}
                  {option.help && (
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {option.help}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={run} disabled={phase === "processing"}>
              {phase === "processing" && <Loader2 className="mr-2 size-4 animate-spin" />}
              {phase === "processing" ? "Procesando..." : tool.ctaLabel}
            </Button>
            <p className="text-xs text-muted-foreground">
              Tus archivos no salen de este dispositivo.
            </p>
          </div>

          {phase === "processing" && (
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-primary-soft">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {Math.round(progress * 100)}% completado
              </p>
            </div>
          )}

          {phase === "error" && message && (
            <p className="mt-4 rounded-lg bg-destructive-soft px-4 py-3 text-sm text-destructive">
              {message}
            </p>
          )}
        </div>
      )}

      {phase === "done" && outputs.length > 0 && (
        <div className="animate-rise border-t border-border bg-primary-soft/40 p-5">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="size-5" aria-hidden />
            <h3 className="text-sm font-semibold">Listo</h3>
          </div>
          {note && <p className="mt-1.5 text-sm text-foreground/80">{note}</p>}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {outputs.map((output, index) => (
              <li key={output.name}>
                <a
                  href={urls[index]}
                  download={output.name}
                  className="transition-standard flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 hover:border-primary/40"
                >
                  <Download className="size-4 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{output.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(output.blob.size)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
