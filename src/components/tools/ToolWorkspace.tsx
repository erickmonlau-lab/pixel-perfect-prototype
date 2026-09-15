import { ArrowDown, ArrowUp, CheckCircle2, Download, Loader2, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import type { OptionValues, ToolDefinition, ToolOutput } from "@/lib/tools/types";
import { useLocale } from "@/lib/i18n/context";

type Phase = "idle" | "processing" | "done" | "error";

export function ToolWorkspace({ tool }: { tool: ToolDefinition }) {
  const { t } = useLocale();
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

  /** Reset only when the visitor switches to a different tool, never on mount. */
  const mountedSlug = useRef(tool.slug);
  useEffect(() => {
    if (mountedSlug.current === tool.slug) return;
    mountedSlug.current = tool.slug;
    setValues(defaults);
    setFiles([]);
    setOutputs([]);
    setPhase("idle");
    setMessage(null);
    setNote(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool.slug]);

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
        setMessage(t.workspace.invalidFormat);
        return;
      }
      setPhase("idle");
      setMessage(null);
      setOutputs([]);
      setFiles((current) => (tool.multiple ? [...current, ...valid] : valid.slice(0, 1)));
    },
    [tool, t],
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
      setMessage(t.workspace.minFiles(tool.minFiles));
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
      setMessage(error instanceof Error ? error.message : t.workspace.genericError);
    }
  };

  if (tool.status === "pending") {
    return (
      <section className="surface-card p-7 sm:p-9" aria-label={t.workspace.pendingAria}>
        <span className="rounded-full bg-warning-soft px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-warning">
          {t.status.pending}
        </span>
        <h2 className="mt-5 text-2xl">{t.workspace.pendingTitle}</h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
          {tool.pendingReason}
        </p>
        <p className="mt-4 text-[15px] text-muted-foreground">{t.workspace.pendingNote}</p>
      </section>
    );
  }

  return (
    <section className="surface-card overflow-hidden" aria-label={t.workspace.aria(tool.name)}>
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
        className={`transition-standard m-4 rounded-2xl border-2 border-dashed p-10 text-center ${
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
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Upload className="size-6" aria-hidden />
        </span>
        <h2 className="mt-5 text-xl sm:text-2xl">
          {tool.multiple ? t.workspace.dropMany : t.workspace.dropOne}
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">{t.workspace.hint}</p>
        <Button className="mt-6" size="lg" onClick={() => inputRef.current?.click()} type="button">
          {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
        </Button>
      </div>

      {files.length > 0 && (
        <div className="animate-rise border-t border-border p-6">
          <h3 className="text-[15px] font-semibold">{t.workspace.filesReady(files.length)}</h3>
          <ul className="mt-3.5 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 bg-surface px-4 py-3.5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium">{file.name}</span>
                  <span className="text-[13px] text-muted-foreground">{formatBytes(file.size)}</span>
                </span>
                {tool.multiple && files.length > 1 && (
                  <span className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={t.workspace.moveUp(file.name)}
                      className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === files.length - 1}
                      aria-label={t.workspace.moveDown(file.name)}
                      className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                    >
                      <ArrowDown className="size-4" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                  aria-label={t.workspace.remove(file.name)}
                  className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          {tool.options && tool.options.length > 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {tool.options.map((option) => (
                <div key={option.key}>
                  <label
                    htmlFor={`opt-${option.key}`}
                    className="block text-[15px] font-medium text-foreground"
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
                      className="transition-standard mt-2 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-[15px] outline-none focus:border-primary/60 focus:shadow-focus"
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
                      className="transition-standard mt-2 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-[15px] outline-none focus:border-primary/60 focus:shadow-focus"
                    />
                  )}
                  {option.type === "range" && (
                    <div className="mt-2.5 flex items-center gap-3">
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
                      <span className="w-14 shrink-0 text-[15px] tabular-nums text-muted-foreground">
                        {Number(values[option.key] ?? option.default)}
                        {option.unit ?? ""}
                      </span>
                    </div>
                  )}
                  {option.help && (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {option.help}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={run} disabled={phase === "processing"}>
              {phase === "processing" && <Loader2 className="mr-2 size-4 animate-spin" />}
              {phase === "processing" ? t.workspace.processing : tool.ctaLabel}
            </Button>
            <p className="text-[13px] text-muted-foreground">{t.workspace.privacyNote}</p>
          </div>

          {phase === "processing" && (
            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-primary-soft">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {t.workspace.progress(Math.round(progress * 100))}
              </p>
            </div>
          )}

          {phase === "error" && message && (
            <p className="mt-5 rounded-xl bg-destructive-soft px-4 py-3.5 text-[15px] text-destructive">
              {message}
            </p>
          )}
        </div>
      )}

      {phase === "done" && outputs.length > 0 && (
        <div className="animate-rise border-t border-border bg-primary-soft/40 p-6">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="size-5" aria-hidden />
            <h3 className="text-[15px] font-semibold">{t.workspace.done}</h3>
          </div>
          {note && <p className="mt-2 text-[15px] text-foreground/85">{note}</p>}
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2" aria-label={t.workspace.downloads}>
            {outputs.map((output, index) => (
              <li key={output.name}>
                <a
                  href={urls[index]}
                  download={output.name}
                  className="transition-standard flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-primary/40"
                >
                  <Download className="size-5 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium">{output.name}</span>
                    <span className="text-[13px] text-muted-foreground">
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
