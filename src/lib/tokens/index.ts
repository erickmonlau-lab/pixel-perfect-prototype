/**
 * BreadPDF Design Tokens — "Panadería Neo-Brutalista, Juguetona y Rápida"
 * Central source of truth for colors, borders, shadows, radii, easings, and transitions.
 */

export const TOKENS = {
  colors: {
    // Brand primary palette
    breadDark: '#0F0F12',       // Tinta negra sólida
    breadWhite: '#FFFFFF',      // Blanco puro harinero
    breadCream: '#FFFDF9',      // Crema masa cálida
    breadCreamAlt: '#FAF7F2',   // Crema tostado suave
    breadRed: '#E8372C',        // Rojo pan-tostado corporativo oficial
    breadRedHover: '#D32F2F',   // Rojo tostado intenso
    breadCrust: '#DE834C',      // Corteza dorada
    breadCrumb: '#FEE7CE',      // Miga suave
    breadAmber: '#FEF08A',      // Mantequilla cálida
    breadAmberDark: '#F59E0B',  // Miel tostada
    
    // Functional category sticker colors
    toolRed: '#EF4444',         // Comprimir / Dividir / Unir
    toolBlue: '#2563EB',        // Word / Texto
    toolGreen: '#10B981',       // Excel / Tablas / Firmar
    toolPurple: '#8B5CF6',      // JPG / Imágenes
    toolOrange: '#EA580C',      // PowerPoint
    toolAmber: '#F59E0B',       // Proteger / Desbloquear
    toolCyan: '#06B6D4',        // Rotar / Extraer
    toolPink: '#EC4899',        // OCR / IA
    
    // Dark mode "Horno de noche"
    darkOvenBg: '#141418',      // Fondo horno de noche
    darkOvenSurface: '#1C1C22', // Superficie horno
    darkOvenCard: '#24242C',    // Tarjeta horno
    darkOvenBorder: '#3A3A48',  // Borde horno
    darkOvenText: '#F4F4F6',    // Texto harina claro
    darkOvenMuted: '#9E9EA8',   // Texto tostado medio
  },
  
  shadows: {
    hardSm: '2px 2px 0px #0F0F12',
    hardMd: '4px 4px 0px #0F0F12',
    hardLg: '6px 6px 0px #0F0F12',
    hardXl: '8px 8px 0px #0F0F12',
    hardRed: '4px 4px 0px #E8372C',
    hardAmber: '4px 4px 0px #F59E0B',
  },
  
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  
  transitions: {
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fast: '120ms ease-out',
    normal: '200ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  }
} as const;
