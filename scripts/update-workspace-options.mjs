import fs from 'node:fs';

const file = 'src/components/tools/ToolWorkspace.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace showInitialSettings panel contents with Neo-brutalist Radio Cards
const oldSettingsPanel = /\{showInitialSettings && \([\s\S]*?\)\s*\}\s*<\/div>\s*\)\}/;

const newSettingsPanel = `{showInitialSettings && (
                <div className="mt-4 text-left rounded-3xl border-2 border-[#0F0F12] bg-[#FFFFFF] p-6 sm:p-8 shadow-[6px_6px_0_#0F0F12] animate-fade-in">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-slate-100">
                    <span className="text-[16px] font-black uppercase tracking-wider text-[#0F0F12] flex items-center gap-2">
                      <SlidersHorizontal className="size-5 text-[#EC3C2D]" />
                      Configuración y presets recomendados
                    </span>
                    <span className="text-[12.5px] font-bold text-slate-500">
                      WASM en navegador
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    {tool.options.map((opt) => (
                      <div key={opt.key} className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[15px] font-black text-[#0F0F12] flex items-center gap-2">
                            <span>{opt.label}</span>
                            {opt.help && (
                              <span className="text-[13px] font-normal text-slate-500">({opt.help})</span>
                            )}
                          </label>
                          {opt.type === "range" && values[opt.key] != null && (
                            <span className="text-[14px] font-mono font-black text-[#0F0F12] bg-[#FEF08A] border-2 border-[#0F0F12] rounded-lg px-2.5 py-0.5 shadow-[1.5px_1.5px_0_#0F0F12]">
                              {values[opt.key]}{opt.unit ?? ""}
                            </span>
                          )}
                        </div>

                        {/* Interactive Radio Cards for Select Options */}
                        {opt.type === "select" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {opt.options.map((o) => {
                              const isSelected = (values[opt.key] ?? opt.default) === o.value;
                              
                              // Estimated reduction or feature badge if available
                              const badgeText = o.value === "lossless"
                                ? "-15%"
                                : o.value === "light"
                                ? "-40%"
                                : o.value === "balanced"
                                ? "-70% [Óptimo]"
                                : o.value === "aggressive" || o.value === "max"
                                ? "-85% [Máx]"
                                : null;

                              return (
                                <button
                                  key={o.value}
                                  type="button"
                                  onClick={() => setValues((v) => ({ ...v, [opt.key]: o.value }))}
                                  className={\`relative flex flex-col justify-between p-4 rounded-2xl border-2 border-[#0F0F12] text-left transition-all duration-120 cursor-pointer \${
                                    isSelected
                                      ? "bg-[#EFF6FF] shadow-[4px_4px_0_#2563EB] translate-x-[1px] translate-y-[1px]"
                                      : "bg-white shadow-[3px_3px_0_#0F0F12] hover:bg-slate-50 hover:translate-x-[1px] hover:translate-y-[1px]"
                                  }\`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-[15px] font-black text-[#0F0F12] leading-snug">
                                      {o.label.split("—")[0]?.trim()}
                                    </span>
                                    {isSelected ? (
                                      <span className="size-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[11px] font-black shrink-0">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="size-5 rounded-full border-2 border-slate-300 shrink-0" />
                                    )}
                                  </div>

                                  {badgeText && (
                                    <div className="mt-3">
                                      <span className={\`inline-block text-[11px] font-black uppercase px-2 py-0.5 rounded-md border border-[#0F0F12] \${
                                        isSelected
                                          ? "bg-[#2563EB] text-white shadow-[1px_1px_0_#0F0F12]"
                                          : "bg-slate-100 text-[#0F0F12]"
                                      }\`}>
                                        {badgeText}
                                      </span>
                                    </div>
                                  )}

                                  {o.label.includes("—") && (
                                    <p className="mt-2 text-[12.5px] font-medium text-slate-600 leading-tight">
                                      {o.label.split("—")[1]?.trim()}
                                    </p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* High-visibility Slider for Range */}
                        {opt.type === "range" && (
                          <div className="p-4 rounded-2xl border-2 border-[#0F0F12] bg-[#F8FAFC] shadow-[2px_2px_0_#0F0F12]">
                            <div className="flex items-center gap-4">
                              <input
                                type="range"
                                min={opt.min}
                                max={opt.max}
                                step={opt.step}
                                value={Number(values[opt.key] ?? opt.default)}
                                onChange={(e) => setValues((v) => ({ ...v, [opt.key]: Number(e.target.value) }))}
                                className="h-3 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#EC3C2D] border border-[#0F0F12] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EC3C2D] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0F0F12] [&::-webkit-slider-thumb]:shadow-[2px_2px_0_#0F0F12]"
                              />
                            </div>
                          </div>
                        )}

                        {/* High-visibility Text Input */}
                        {opt.type === "text" && (
                          <input
                            type="text"
                            value={String(values[opt.key] ?? opt.default)}
                            placeholder={(opt as any).placeholder}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-xl border-2 border-[#0F0F12] bg-white px-4 py-2.5 text-[15px] font-bold text-[#0F172A] shadow-[2px_2px_0_#0F0F12] focus:shadow-[3px_3px_0_#2563EB] focus:outline-hidden"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}`;

content = content.replace(oldSettingsPanel, newSettingsPanel);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated ToolWorkspace.tsx with Neo-brutalist Radio Cards');
