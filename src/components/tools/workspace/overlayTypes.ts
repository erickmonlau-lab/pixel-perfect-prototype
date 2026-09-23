export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type WatermarkConfig = {
  type: "text" | "image";
  text: string;
  imageBytes?: Uint8Array;
  imageMime?: "image/png" | "image/jpeg";
  position: WatermarkPosition;
  isTile: boolean; // Modo mosaico
  opacity: number; // 0.1 a 1.0
  fontSize: number;
  rotationAngle: number; // Grados (-90 a 90)
  color: string; // Hexadecimal, ej #64748B o #EF4444
  margin: number;
};

export type PageNumberPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PageNumberConfig = {
  position: PageNumberPosition;
  format: string; // ej. "{n}" o "Página {n} de {total}"
  startFrom: number; // default: 1
  excludeCover: boolean; // saltar la primera página
  fontSize: number;
  color: string;
  margin: number;
};

export type SignatureConfig = {
  dataUrl: string;
  position: WatermarkPosition;
  scale: number; // 0.2 a 1.0
  pageTarget: "all" | "first" | "last" | "selected";
};

export type TextOverlayItem = {
  id: string;
  text: string;
  xPercent: number; // 0 a 100 (% desde la izquierda)
  yPercent: number; // 0 a 100 (% desde arriba)
  fontSize: number;
  color: string;
  pageTarget: "all" | "first" | "last" | "selected";
};

export type TextOverlayConfig = {
  items: TextOverlayItem[];
  activeItemIndex: number;
};

