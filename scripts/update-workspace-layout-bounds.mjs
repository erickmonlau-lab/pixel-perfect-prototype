import fs from 'node:fs';
import path from 'node:path';

const twPath = path.join(process.cwd(), 'src', 'components', 'tools', 'ToolWorkspace.tsx');
let content = fs.readFileSync(twPath, 'utf8');

const startMarker = '{/* Zona de Subida / Dropzone principal: visible SOLO si files.length === 0 y no estamos procesando ni terminados en modo auto */}';
const endMarker = '{/* Pantalla interactiva de Máquina BREADPDF durante subida / procesamiento */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacementNew = `{/* Zona de Subida y Configuración Integrada — Composición equilibrada y ergonómica */}
      {files.length === 0 && (!isAutoFlow || (phase !== "uploading" && phase !== "processing" && phase !== "done")) && (
        <div className="p-4 sm:p-6 lg:p-8">
          <div className={\`grid grid-cols-1 \${tool.options && tool.options.length > 0 ? "lg:grid-cols-12" : ""} gap-6 items-stretch\`}>
            
            {/* Columna Izquierda: Dropzone & Acción Principal */}
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
              onClick={() => inputRef.current?.click()}
              className={\`flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-[#0F0F12] p-6 sm:p-8 cursor-pointer select-none transition-all duration-150 \${
                tool.options && tool.options.length > 0 ? "lg:col-span-5 xl:col-span-5" : "w-full py-10 sm:py-14"
              } \${
                dragging
                  ? "bg-[#FEECEB] scale-[1.01] shadow-[6px_6px_0_#EC3C2D]"
                  : "bg-[#FAFAFB] shadow-[3px_3px_0_#0F0F12] hover:bg-white hover:shadow-[4px_4px_0_#0F0F12]"
              }\`}
            >
              <input
                ref={inputRef}
                type="file"
                accept={tool.accept}
                multiple={tool.multiple}
                className="sr-only"
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />

              {/* Icono de subida en Rojo BreadPDF */}
              <span className="flex size-14 sm:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[3px_3px_0_#0F0F12] transition-transform hover:scale-105 shrink-0">
                <Upload className="size-7 sm:size-8 text-white stroke-[2.4]" aria-hidden />
              </span>

              {/* Título de acción principal */}
              <h2 className="mt-4 text-[20px] sm:text-[22px] font-black tracking-tight text-[#0F0F12] leading-tight">
                {tool.multiple ? t.workspace.dropMany : t.workspace.dropOne}
              </h2>

              {/* Subtítulo aclaratorio */}
              <p className="mt-1.5 text-[14px] sm:text-[15px] text-slate-600 max-w-xs leading-normal font-normal">
                {tool.multiple ? t.workspace.hint : t.workspace.hintOne}
              </p>

              {/* Botón protagonista "Seleccionar archivos" */}
              <div className="mt-5 w-full flex justify-center">
                <Button
                  size="lg"
                  className="w-full max-w-xs h-13 sm:h-14 px-6 text-[16px] sm:text-[17px] font-black rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[3px_3px_0_#0F0F12] hover:bg-[#D43426] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  type="button"
                >
                  {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
                </Button>
              </div>

              {/* Mensaje de privacidad discreto y legible */}
              <div className="mt-4 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#0F0F12] bg-white px-3 py-1 text-[12.5px] sm:text-[13px] font-bold text-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                  <ShieldCheck className="size-4 text-[#2563EB] shrink-0" />
                  <span>{t.workspace.privacyNote}</span>
                </div>
              </div>

              {/* Error si ocurre antes de cargar */}
              {phase === "error" && message && files.length === 0 && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-[#FEECEB] px-3 py-1.5 text-[13px] font-semibold text-[#EC3C2D]">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}
            </div>

            {/* Columna Derecha: Panel de Configuración Integrado (si la herramienta ofrece opciones) */}
            {tool.options && tool.options.length > 0 && (
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] bg-white p-5 sm:p-6 shadow-[3px_3px_0_#0F0F12]">
                <div>
                  {/* Encabezado del panel integrado */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-slate-100">
                    <span className="text-[15px] sm:text-[16px] font-black uppercase tracking-wider text-[#0F0F12] flex items-center gap-2">
                      <SlidersHorizontal className="size-4.5 text-[#EC3C2D]" />
                      Configuración y presets recomendados
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-[#0F0F12] bg-[#F1F1F4] px-2 py-0.5 text-[11.5px] font-bold text-[#0F0F12]">
                      <span className="size-1.5 rounded-full bg-[#10B981]" />
                      WASM local
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {tool.options.map((opt) => (
                      <div key={opt.key} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[14px] sm:text-[14.5px] font-black text-[#0F0F12] flex items-center gap-1.5">
                            <span>{opt.label}</span>
                            {opt.help && (
                              <span className="text-[12px] font-normal text-slate-500">({opt.help})</span>
                            )}
                          </label>
                          {opt.type === "range" && values[opt.key] != null && (
                            <span className="text-[13px] font-mono font-black text-[#0F0F12] bg-[#FEF08A] border-2 border-[#0F0F12] rounded-lg px-2.5 py-0.5 shadow-[1px_1px_0_#0F0F12]">
                              {values[opt.key]}{opt.unit ?? ""}
                            </span>
                          )}
                        </div>

                        {/* Interactive Options Cards */}
                        {opt.type === "select" && (
                          <div className={\`grid gap-2 \${
                            opt.options.length > 4 ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
                          }\`}>
                            {opt.options.map((o) => {
                              const isSelected = (values[opt.key] ?? opt.default) === o.value;
                              
                              const badgeText = o.value === "lossless"
                                ? "-15%"
                                : o.value === "light"
                                ? "-40%"
                                : o.value === "balanced"
                                ? "-70%"
                                : o.value === "aggressive" || o.value === "max"
                                ? "-85%"
                                : null;

                              return (
                                <button
                                  key={o.value}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setValues((v) => ({ ...v, [opt.key]: o.value }));
                                  }}
                                  className={\`relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl border-2 border-[#0F0F12] text-left transition-all duration-120 cursor-pointer \${
                                    isSelected
                                      ? "bg-[#EFF6FF] border-[#0F0F12] shadow-[2.5px_2.5px_0_#2563EB]"
                                      : "bg-white shadow-[1.5px_1.5px_0_#0F0F12] hover:bg-slate-50"
                                  }\`}
                                >
                                  <div className="flex flex-col min-w-0 pr-2">
                                    <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0F0F12] truncate leading-tight">
                                      {o.label.split("—")[0]?.trim()}
                                    </span>
                                    {o.label.includes("—") && (
                                      <span className="text-[11.5px] text-slate-500 truncate mt-0.5">
                                        {o.label.split("—")[1]?.trim()}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {badgeText && (
                                      <span className={\`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-[#0F0F12] \${
                                        isSelected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-[#0F0F12]"
                                      }\`}>
                                        {badgeText}
                                      </span>
                                    )}
                                    {isSelected ? (
                                      <span className="size-4.5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-black">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="size-4.5 rounded-full border-2 border-slate-300" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Slider for Range */}
                        {opt.type === "range" && (
                          <div className="p-3 rounded-xl border-2 border-[#0F0F12] bg-[#F8FAFC] shadow-[1.5px_1.5px_0_#0F0F12]">
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={opt.min}
                                max={opt.max}
                                step={opt.step}
                                value={Number(values[opt.key] ?? opt.default)}
                                onChange={(e) => setValues((v) => ({ ...v, [opt.key]: Number(e.target.value) }))}
                                className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#EC3C2D] border border-[#0F0F12] [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EC3C2D] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0F0F12] [&::-webkit-slider-thumb]:shadow-[1.5px_1.5px_0_#0F0F12]"
                              />
                            </div>
                          </div>
                        )}

                        {/* Text Input */}
                        {opt.type === "text" && (
                          <input
                            type="text"
                            value={String(values[opt.key] ?? opt.default)}
                            placeholder={(opt as any).placeholder}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-xl border-2 border-[#0F0F12] bg-white px-3.5 py-2 text-[14px] font-bold text-[#0F172A] shadow-[1.5px_1.5px_0_#0F0F12] focus:shadow-[2px_2px_0_#2563EB] focus:outline-hidden"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12.5px] text-slate-500 font-medium">
                  <span>Ajusta las opciones antes o después de añadir el archivo</span>
                  <span className="font-bold text-[#0F0F12]">100% privado</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      `;

  content = content.substring(0, startIndex) + replacementNew + content.substring(endIndex);
  fs.writeFileSync(twPath, content, 'utf8');
  console.log('SUCCESSFULLY REPLACED DROPZONE USING INDEX BOUNDS');
} else {
  console.log('START OR END MARKER NOT FOUND', { startIndex, endIndex });
}
