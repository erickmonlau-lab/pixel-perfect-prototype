import React, { useState } from "react";
import { PenTool, Plus, Trash2, Type } from "lucide-react";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
  TextOverlayItem,
  WatermarkPosition,
  PageNumberPosition,
} from "./overlayTypes";

type OverlaySettingsProps = {
  activeToolSlug: string;
  watermarkConfig: WatermarkConfig;
  setWatermarkConfig: React.Dispatch<React.SetStateAction<WatermarkConfig>>;
  pageNumberConfig: PageNumberConfig;
  setPageNumberConfig: React.Dispatch<React.SetStateAction<PageNumberConfig>>;
  signatureConfig?: SignatureConfig;
  setSignatureConfig?: React.Dispatch<React.SetStateAction<SignatureConfig>>;
  textOverlayConfig?: TextOverlayConfig;
  setTextOverlayConfig?: React.Dispatch<React.SetStateAction<TextOverlayConfig>>;
  onOpenSignaturePad?: () => void;
};

export function OverlaySettingsPanel({
  activeToolSlug,
  watermarkConfig,
  setWatermarkConfig,
  pageNumberConfig,
  setPageNumberConfig,
  signatureConfig,
  setSignatureConfig,
  textOverlayConfig,
  setTextOverlayConfig,
  onOpenSignaturePad,
}: OverlaySettingsProps) {
  if (
    activeToolSlug !== "marca-de-agua" &&
    activeToolSlug !== "numerar-paginas" &&
    activeToolSlug !== "firmar-pdf" &&
    activeToolSlug !== "anadir-texto-pdf"
  ) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs">
      {activeToolSlug === "marca-de-agua" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-[15px] font-bold text-slate-800">Configuración de Marca de Agua</h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWatermarkConfig((c) => ({ ...c, isTile: !c.isTile }))}
                className={`rounded-lg px-2.5 py-1 text-[12px] font-semibold transition-colors border ${
                  watermarkConfig.isTile
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {watermarkConfig.isTile ? "Mosaico Activo (3x3)" : "Modo Mosaico"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Texto de la marca */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700">Texto</label>
              <input
                type="text"
                value={watermarkConfig.text}
                onChange={(e) => setWatermarkConfig((c) => ({ ...c, text: e.target.value }))}
                placeholder="Ej. CONFIDENCIAL, COPIA"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[14px] text-slate-800 focus:border-primary focus:outline-hidden"
              />
            </div>

            {/* Color y Opacidad */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-slate-700">Color</label>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="color"
                    value={watermarkConfig.color}
                    onChange={(e) => setWatermarkConfig((c) => ({ ...c, color: e.target.value }))}
                    className="size-8 cursor-pointer rounded-md border border-slate-200 p-0.5"
                  />
                  <span className="text-[13px] font-mono text-slate-600 uppercase">
                    {watermarkConfig.color}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-slate-700">
                  Opacidad: {Math.round(watermarkConfig.opacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={watermarkConfig.opacity}
                  onChange={(e) =>
                    setWatermarkConfig((c) => ({ ...c, opacity: parseFloat(e.target.value) }))
                  }
                  className="mt-2.5 w-full accent-primary"
                />
              </div>
            </div>

            {/* Rotación y Tamaño */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-slate-700">
                  Ángulo: {watermarkConfig.rotationAngle}°
                </label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="15"
                  value={watermarkConfig.rotationAngle}
                  onChange={(e) =>
                    setWatermarkConfig((c) => ({ ...c, rotationAngle: parseInt(e.target.value) }))
                  }
                  className="mt-2.5 w-full accent-primary"
                />
              </div>

              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-slate-700">
                  Tamaño: {watermarkConfig.fontSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="72"
                  step="4"
                  value={watermarkConfig.fontSize}
                  onChange={(e) =>
                    setWatermarkConfig((c) => ({ ...c, fontSize: parseInt(e.target.value) }))
                  }
                  className="mt-2.5 w-full accent-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeToolSlug === "numerar-paginas" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-[15px] font-bold text-slate-800">Configuración de Numeración de Páginas</h4>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Formato */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700">Plantilla de Formato</label>
              <select
                value={pageNumberConfig.format}
                onChange={(e) => setPageNumberConfig((c) => ({ ...c, format: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[14px] text-slate-800 focus:border-primary focus:outline-hidden"
              >
                <option value="{n}">Solo número ({pageNumberConfig.startFrom})</option>
                <option value="Página {n}">Página {pageNumberConfig.startFrom}</option>
                <option value="Página {n} de {total}">Página {pageNumberConfig.startFrom} de total</option>
                <option value="{n} / {total}">{pageNumberConfig.startFrom} / total</option>
              </select>
            </div>

            {/* Posición */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700">Posición</label>
              <select
                value={pageNumberConfig.position}
                onChange={(e) =>
                  setPageNumberConfig((c) => ({ ...c, position: e.target.value as PageNumberPosition }))
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[14px] text-slate-800 focus:border-primary focus:outline-hidden"
              >
                <option value="bottom-center">Pie — Centro</option>
                <option value="bottom-right">Pie — Derecha</option>
                <option value="bottom-left">Pie — Izquierda</option>
                <option value="top-center">Encabezado — Centro</option>
                <option value="top-right">Encabezado — Derecha</option>
                <option value="top-left">Encabezado — Izquierda</option>
              </select>
            </div>

            {/* Portada y Tamaño */}
            <div className="flex flex-col justify-between">
              <label className="flex items-center gap-2 cursor-pointer mt-2 text-[13px] font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={pageNumberConfig.excludeCover}
                  onChange={(e) => setPageNumberConfig((c) => ({ ...c, excludeCover: e.target.checked }))}
                  className="rounded-sm accent-primary size-4"
                />
                <span>Excluir primera página (Portada)</span>
              </label>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1">
                  <label className="block text-[12px] font-semibold text-slate-500">Color</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={pageNumberConfig.color}
                      onChange={(e) => setPageNumberConfig((c) => ({ ...c, color: e.target.value }))}
                      className="size-7 cursor-pointer rounded-md border border-slate-200 p-0.5"
                    />
                    <span className="text-[12px] font-mono text-slate-600 uppercase">
                      {pageNumberConfig.color}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-[12px] font-semibold text-slate-500">
                    Tamaño: {pageNumberConfig.fontSize}pt
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="1"
                    value={pageNumberConfig.fontSize}
                    onChange={(e) =>
                      setPageNumberConfig((c) => ({ ...c, fontSize: parseInt(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeToolSlug === "firmar-pdf" && signatureConfig && setSignatureConfig && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-[15px] font-bold text-slate-800">Ajustes de Firma</h4>
              <p className="text-[12px] text-slate-500">
                {signatureConfig.dataUrl
                  ? "Firma creada lista para estampar. Ajusta su tamaño y posición."
                  : "Dibuja tu firma a mano alzada o sube una imagen de tu rúbrica."}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenSignaturePad}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[13px] font-semibold text-white shadow-xs hover:bg-primary/90 transition-colors"
            >
              <PenTool className="size-4" />
              <span>{signatureConfig.dataUrl ? "Cambiar firma" : "Crear firma"}</span>
            </button>
          </div>

          {signatureConfig.dataUrl ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
              {/* Vista previa de la rúbrica */}
              <div className="flex flex-col gap-1.5">
                <label className="block text-[12px] font-semibold text-slate-700">Rúbrica activa</label>
                <div className="flex h-16 w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
                  <img
                    src={signatureConfig.dataUrl}
                    alt="Firma"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Posición 3x3 */}
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                  Ubicación en la página
                </label>
                <div className="inline-grid grid-cols-3 gap-1 rounded-lg border border-slate-300 bg-white p-1">
                  {(
                    [
                      "top-left",
                      "top-center",
                      "top-right",
                      "middle-left",
                      "center",
                      "middle-right",
                      "bottom-left",
                      "bottom-center",
                      "bottom-right",
                    ] as WatermarkPosition[]
                  ).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setSignatureConfig((c) => ({ ...c, position: pos }))}
                      className={`size-6 rounded-xs transition-colors ${
                        signatureConfig.position === pos
                          ? "bg-primary text-white font-bold"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                      title={pos}
                    />
                  ))}
                </div>
              </div>

              {/* Escala y páginas objetivo */}
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-semibold text-slate-700">
                      Tamaño de la firma
                    </label>
                    <span className="text-[12px] font-mono text-slate-500">
                      {Math.round(signatureConfig.scale * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={signatureConfig.scale}
                    onChange={(e) =>
                      setSignatureConfig((c) => ({ ...c, scale: parseFloat(e.target.value) }))
                    }
                    className="mt-1 w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                    Aplicar firma en
                  </label>
                  <select
                    value={signatureConfig.pageTarget}
                    onChange={(e) =>
                      setSignatureConfig((c) => ({
                        ...c,
                        pageTarget: e.target.value as SignatureConfig["pageTarget"],
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[13px] text-slate-800 focus:border-primary focus:outline-hidden"
                  >
                    <option value="last">Última página (Recomendado)</option>
                    <option value="first">Primera página</option>
                    <option value="all">Todas las páginas</option>
                    <option value="selected">Páginas seleccionadas</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 bg-white p-4">
              <span className="text-[13px] text-slate-500">
                No has configurado ninguna firma todavía. Pulsa el botón para dibujar o subir tu firma.
              </span>
              <button
                type="button"
                onClick={onOpenSignaturePad}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-slate-800"
              >
                Abrir lienzo de firma
              </button>
            </div>
          )}
        </div>
      )}

      {/* ANADIR TEXTO AL PDF */}
      {activeToolSlug === "anadir-texto-pdf" && textOverlayConfig && setTextOverlayConfig && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Type className="size-4 text-primary" />
              <h4 className="text-[15px] font-bold text-slate-800">Añadir texto sobre el documento</h4>
            </div>
            <button
              type="button"
              onClick={() => {
                const newItem: TextOverlayItem = {
                  id: `text-${Date.now()}`,
                  text: "Nuevo texto",
                  xPercent: 50,
                  yPercent: 50,
                  fontSize: 16,
                  color: "#0F172A",
                  pageTarget: "all",
                };
                setTextOverlayConfig((cfg) => ({
                  items: [...cfg.items, newItem],
                  activeItemIndex: cfg.items.length,
                }));
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary px-3 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-primary/90 cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Añadir otro texto</span>
            </button>
          </div>

          {textOverlayConfig.items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center">
              <p className="text-[13px] text-slate-500">No hay textos añadidos.</p>
              <button
                type="button"
                onClick={() => {
                  setTextOverlayConfig({
                    items: [
                      {
                        id: `text-${Date.now()}`,
                        text: "Texto añadido",
                        xPercent: 50,
                        yPercent: 30,
                        fontSize: 16,
                        color: "#0F172A",
                        pageTarget: "all",
                      },
                    ],
                    activeItemIndex: 0,
                  });
                }}
                className="mt-2 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-primary/90"
              >
                Crear primer texto
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Pestañas de textos si hay más de uno */}
              {textOverlayConfig.items.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {textOverlayConfig.items.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setTextOverlayConfig((cfg) => ({ ...cfg, activeItemIndex: idx }))
                      }
                      className={`rounded-lg px-3 py-1 text-[12px] font-semibold transition-colors cursor-pointer border ${
                        textOverlayConfig.activeItemIndex === idx
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Texto {idx + 1}
                    </button>
                  ))}
                </div>
              )}

              {(() => {
                const currentIdx = Math.min(
                  textOverlayConfig.activeItemIndex,
                  textOverlayConfig.items.length - 1
                );
                const currentItem = textOverlayConfig.items[currentIdx];
                if (!currentItem) return null;

                const updateCurrent = (patch: Partial<TextOverlayItem>) => {
                  setTextOverlayConfig((cfg) => {
                    const nextItems = [...cfg.items];
                    nextItems[currentIdx] = { ...currentItem, ...patch };
                    return { ...cfg, items: nextItems };
                  });
                };

                const removeCurrent = () => {
                  setTextOverlayConfig((cfg) => {
                    const nextItems = cfg.items.filter((_, i) => i !== currentIdx);
                    return {
                      items: nextItems,
                      activeItemIndex: Math.max(0, currentIdx - 1),
                    };
                  });
                };

                return (
                  <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
                    {/* Campo de texto y botón eliminar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={currentItem.text}
                        placeholder="Escribe el texto a insertar..."
                        onChange={(e) => updateCurrent({ text: e.target.value })}
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[13.5px] text-slate-800 focus:border-primary focus:outline-hidden"
                      />
                      {textOverlayConfig.items.length > 1 && (
                        <button
                          type="button"
                          onClick={removeCurrent}
                          title="Eliminar este texto"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>

                    {/* Controles de posición (X % e Y %) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-[12px] font-semibold text-slate-700">
                            Posición horizontal (X)
                          </label>
                          <span className="text-[12px] font-mono text-slate-500 font-bold">
                            {currentItem.xPercent}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="95"
                          step="1"
                          value={currentItem.xPercent}
                          onChange={(e) =>
                            updateCurrent({ xPercent: parseInt(e.target.value, 10) })
                          }
                          className="mt-1 w-full accent-primary"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-[12px] font-semibold text-slate-700">
                            Posición vertical (Y)
                          </label>
                          <span className="text-[12px] font-mono text-slate-500 font-bold">
                            {currentItem.yPercent}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="95"
                          step="1"
                          value={currentItem.yPercent}
                          onChange={(e) =>
                            updateCurrent({ yPercent: parseInt(e.target.value, 10) })
                          }
                          className="mt-1 w-full accent-primary"
                        />
                      </div>
                    </div>

                    {/* Tamaño, Color y Destino de página */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-[12px] font-semibold text-slate-700">
                            Tamaño de fuente
                          </label>
                          <span className="text-[12px] font-mono text-slate-500 font-bold">
                            {currentItem.fontSize} pt
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="60"
                          step="1"
                          value={currentItem.fontSize}
                          onChange={(e) =>
                            updateCurrent({ fontSize: parseInt(e.target.value, 10) })
                          }
                          className="mt-1 w-full accent-primary"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-semibold text-slate-700 block mb-1">
                          Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={currentItem.color}
                            onChange={(e) => updateCurrent({ color: e.target.value })}
                            className="size-8 cursor-pointer rounded-lg border border-slate-300 p-0.5"
                          />
                          <span className="text-[12px] font-mono text-slate-500">
                            {currentItem.color}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[12px] font-semibold text-slate-700 block mb-1">
                          Aplicar en
                        </label>
                        <select
                          value={currentItem.pageTarget}
                          onChange={(e) =>
                            updateCurrent({
                              pageTarget: e.target.value as TextOverlayItem["pageTarget"],
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[13px] text-slate-800 focus:border-primary focus:outline-hidden"
                        >
                          <option value="all">Todas las páginas</option>
                          <option value="first">Primera página</option>
                          <option value="last">Última página</option>
                          <option value="selected">Páginas seleccionadas</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
