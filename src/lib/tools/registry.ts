import type { ToolCategory, ToolDefinition } from "./types";
import {
  compressPdf,
  deletePages,
  extractPages,
  extractText,
  jpgToPdf,
  mergePdf,
  pdfToJpg,
  rotatePdf,
  splitPdf,
} from "./runners";

export const CATEGORIES: Record<
  ToolCategory,
  { slug: ToolCategory; name: string; description: string }
> = {
  optimizar: {
    slug: "optimizar",
    name: "Optimizar",
    description: "Reduce el peso de tus documentos sin perder control sobre la calidad.",
  },
  organizar: {
    slug: "organizar",
    name: "Organizar",
    description: "Une, divide, gira y reordena páginas en pocos segundos.",
  },
  convertir: {
    slug: "convertir",
    name: "Convertir",
    description: "Pasa de PDF a imagen, texto u Office y al contrario.",
  },
  editar: {
    slug: "editar",
    name: "Editar",
    description: "Extrae, modifica y trabaja con el contenido de tus PDF.",
  },
  seguridad: {
    slug: "seguridad",
    name: "Seguridad",
    description: "Protege tus documentos y controla quién puede abrirlos.",
  },
  inteligencia: {
    slug: "inteligencia",
    name: "PDF Intelligence",
    description: "OCR, extracción inteligente, análisis y herramientas con IA.",
  },
};

/** Categories that already contain at least one published tool. */
export const MAIN_CATEGORIES: ToolCategory[] = ["optimizar", "organizar", "convertir", "editar"];

export const TOOLS: ToolDefinition[] = [
  {
    slug: "comprimir-pdf",
    name: "Comprimir PDF",
    h1: "Comprimir PDF y reducir su tamaño",
    tagline: "Baja el peso de tu PDF eligiendo el equilibrio exacto entre tamaño y calidad.",
    seoTitle: "Comprimir PDF online gratis | ARVIO",
    seoDescription:
      "Reduce el tamaño de tu PDF en el navegador, con tres niveles de compresión y comparación de peso antes y después. Sin subir archivos a ningún servidor.",
    category: "optimizar",
    icon: "Minimize2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Comprimir PDF",
    keywords: ["comprimir pdf", "reducir tamaño pdf", "pdf ligero"],
    howItWorks: [
      "Selecciona el PDF que quieres reducir.",
      "Elige el nivel: sin pérdida, ligero, equilibrado o máximo.",
      "Compara el peso antes y después y descarga el resultado.",
    ],
    faq: [
      {
        q: "¿Se pierde calidad al comprimir?",
        a: "En el nivel sin pérdida no se recomprime nada: solo se reestructura el archivo. En los niveles ligero, equilibrado y máximo las páginas se reconstruyen como imagen, por lo que la nitidez baja de forma proporcional al ahorro.",
      },
      {
        q: "¿Cuánto peso voy a ahorrar?",
        a: "Depende del documento. ARVIO te muestra el tamaño original y el final para que puedas repetir con otro nivel si el resultado no te convence.",
      },
      {
        q: "¿Se sube mi archivo a un servidor?",
        a: "No. Esta herramienta trabaja íntegramente en tu navegador.",
      },
    ],
    options: [
      {
        key: "level",
        type: "select",
        label: "Nivel de compresión",
        help: "Sin pérdida conserva el texto seleccionable; el resto rasteriza las páginas.",
        default: "balanced",
        options: [
          { value: "lossless", label: "Sin pérdida — reestructura el archivo" },
          { value: "light", label: "Ligero — máxima calidad visual" },
          { value: "balanced", label: "Equilibrado — recomendado" },
          { value: "strong", label: "Máximo — el archivo más pequeño" },
        ],
      },
    ],
    run: compressPdf,
  },
  {
    slug: "unir-pdf",
    name: "Unir PDF",
    h1: "Unir varios PDF en un solo documento",
    tagline: "Combina archivos en el orden que quieras y descarga un único PDF.",
    seoTitle: "Unir PDF online gratis y en orden | ARVIO",
    seoDescription:
      "Combina dos o más PDF en un único documento, reordena los archivos antes de procesar y descarga el resultado al instante desde tu navegador.",
    category: "organizar",
    icon: "Combine",
    status: "live",
    accept: "application/pdf",
    multiple: true,
    minFiles: 2,
    ctaLabel: "Unir PDF",
    keywords: ["unir pdf", "juntar pdf", "combinar pdf"],
    howItWorks: [
      "Añade los PDF que quieras combinar.",
      "Ordénalos arrastrando o con las flechas de la lista.",
      "Descarga el documento final.",
    ],
    faq: [
      {
        q: "¿Cuántos archivos puedo unir?",
        a: "No hay un límite fijo. El proceso usa la memoria de tu dispositivo, así que con documentos muy grandes conviene hacerlo por tandas.",
      },
      {
        q: "¿Se conserva el orden?",
        a: "Sí, exactamente el orden de la lista antes de pulsar el botón.",
      },
    ],
    run: mergePdf,
  },
  {
    slug: "dividir-pdf",
    name: "Dividir PDF",
    h1: "Dividir un PDF en varios documentos",
    tagline: "Separa página a página o por los intervalos que tú definas.",
    seoTitle: "Dividir PDF online por páginas o intervalos | ARVIO",
    seoDescription:
      "Divide un PDF en documentos independientes: una página por archivo o intervalos personalizados como 1-3, 4-8. Todo en tu navegador y sin registro.",
    category: "organizar",
    icon: "Scissors",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Dividir PDF",
    keywords: ["dividir pdf", "separar pdf", "cortar pdf"],
    howItWorks: [
      "Sube el PDF que quieres dividir.",
      "Elige separar cada página o escribe tus intervalos.",
      "Descarga los documentos generados.",
    ],
    faq: [
      {
        q: "¿Cómo se escriben los intervalos?",
        a: "Separa cada documento con una coma: 1-3, 4, 5-9 genera tres PDF.",
      },
    ],
    options: [
      {
        key: "mode",
        type: "select",
        label: "Modo",
        default: "each",
        options: [
          { value: "each", label: "Una página por archivo" },
          { value: "ranges", label: "Intervalos personalizados" },
        ],
      },
      {
        key: "ranges",
        type: "text",
        label: "Intervalos",
        help: "Solo se usa en modo intervalos. Ejemplo: 1-3, 4, 5-9",
        default: "",
        placeholder: "1-3, 4, 5-9",
      },
    ],
    run: splitPdf,
  },
  {
    slug: "pdf-a-jpg",
    name: "PDF a JPG",
    h1: "Convertir PDF a JPG",
    tagline: "Cada página del PDF se convierte en una imagen JPG nítida.",
    seoTitle: "Convertir PDF a JPG online con calidad ajustable | ARVIO",
    seoDescription:
      "Convierte las páginas de un PDF en imágenes JPG eligiendo la resolución y la calidad. El proceso ocurre en tu navegador, sin subir el documento.",
    category: "convertir",
    icon: "Image",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a JPG",
    keywords: ["pdf a jpg", "pdf a imagen", "convertir pdf a jpg"],
    howItWorks: [
      "Sube tu PDF.",
      "Ajusta resolución y calidad si lo necesitas.",
      "Descarga las imágenes una a una.",
    ],
    faq: [
      {
        q: "¿Qué resolución debo elegir?",
        a: "El valor 2x equivale a unos 144 ppp y funciona bien en pantalla. Para imprimir, sube a 3x o 4x.",
      },
    ],
    options: [
      {
        key: "scale",
        type: "range",
        label: "Resolución",
        help: "Multiplicador sobre el tamaño de página original.",
        default: 2,
        min: 1,
        max: 4,
        step: 0.5,
        unit: "x",
      },
      {
        key: "quality",
        type: "range",
        label: "Calidad JPG",
        default: 0.9,
        min: 0.4,
        max: 1,
        step: 0.05,
      },
    ],
    run: pdfToJpg,
  },
  {
    slug: "jpg-a-pdf",
    name: "JPG a PDF",
    h1: "Convertir JPG a PDF",
    tagline: "Convierte tus imágenes en un PDF ordenado y listo para enviar.",
    seoTitle: "Convertir JPG a PDF online, varias imágenes a la vez | ARVIO",
    seoDescription:
      "Convierte imágenes JPG o PNG en un único PDF, con páginas al tamaño de la imagen o en A4. Ordena las fotos antes de generar el documento.",
    category: "convertir",
    icon: "ImagePlus",
    status: "live",
    accept: "image/jpeg,image/png",
    multiple: true,
    minFiles: 1,
    ctaLabel: "Crear PDF",
    keywords: ["jpg a pdf", "imagen a pdf", "png a pdf"],
    howItWorks: [
      "Añade tus imágenes JPG o PNG.",
      "Ordénalas y elige el tamaño de página.",
      "Descarga el PDF resultante.",
    ],
    faq: [
      {
        q: "¿Admite PNG?",
        a: "Sí, puedes mezclar JPG y PNG en el mismo documento.",
      },
    ],
    options: [
      {
        key: "pageSize",
        type: "select",
        label: "Tamaño de página",
        default: "a4",
        options: [
          { value: "a4", label: "A4 con márgenes" },
          { value: "image", label: "Ajustado a la imagen" },
        ],
      },
    ],
    run: jpgToPdf,
  },
  {
    slug: "rotar-pdf",
    name: "Rotar PDF",
    h1: "Rotar páginas de un PDF",
    tagline: "Gira todo el documento o solo las páginas que indiques.",
    seoTitle: "Rotar PDF online y guardar el giro | ARVIO",
    seoDescription:
      "Gira páginas de un PDF 90, 180 o 270 grados, en todo el documento o en páginas concretas, y guarda el resultado de forma permanente.",
    category: "organizar",
    icon: "RotateCw",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Rotar PDF",
    keywords: ["rotar pdf", "girar pdf", "voltear pdf"],
    howItWorks: ["Sube el PDF.", "Elige el giro y las páginas.", "Descarga el PDF ya rotado."],
    faq: [
      {
        q: "¿El giro se guarda?",
        a: "Sí, la rotación queda escrita en el archivo, no es solo una vista.",
      },
    ],
    options: [
      {
        key: "angle",
        type: "select",
        label: "Giro",
        default: "90",
        options: [
          { value: "90", label: "90° a la derecha" },
          { value: "180", label: "180°" },
          { value: "270", label: "90° a la izquierda" },
        ],
      },
      {
        key: "pages",
        type: "text",
        label: "Páginas",
        help: "Vacío gira todas. Ejemplo: 1, 3-5",
        default: "",
        placeholder: "todas",
      },
    ],
    run: rotatePdf,
  },
  {
    slug: "extraer-paginas-pdf",
    name: "Extraer páginas",
    h1: "Extraer páginas de un PDF",
    tagline: "Quédate solo con las páginas que te interesan.",
    seoTitle: "Extraer páginas de un PDF online | ARVIO",
    seoDescription:
      "Crea un PDF nuevo únicamente con las páginas que elijas, indicando páginas sueltas o intervalos. Rápido, gratuito y en tu propio navegador.",
    category: "editar",
    icon: "FileOutput",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer páginas",
    keywords: ["extraer páginas pdf", "separar páginas pdf"],
    howItWorks: ["Sube el PDF.", "Indica las páginas a conservar.", "Descarga el nuevo documento."],
    faq: [
      {
        q: "¿Se mantiene el orden que escribo?",
        a: "Las páginas se ordenan de forma ascendente para conservar la lectura original del documento.",
      },
    ],
    options: [
      {
        key: "pages",
        type: "text",
        label: "Páginas a extraer",
        help: "Ejemplo: 1, 4-6, 10",
        default: "",
        placeholder: "1, 4-6, 10",
      },
    ],
    run: extractPages,
  },
  {
    slug: "eliminar-paginas-pdf",
    name: "Eliminar páginas",
    h1: "Eliminar páginas de un PDF",
    tagline: "Borra las páginas que no necesitas y conserva el resto intacto.",
    seoTitle: "Eliminar páginas de un PDF online | ARVIO",
    seoDescription:
      "Elimina páginas concretas o intervalos de un PDF y descarga el documento limpio, sin instalar programas y sin subir el archivo a un servidor.",
    category: "editar",
    icon: "FileMinus2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Eliminar páginas",
    keywords: ["eliminar páginas pdf", "borrar páginas pdf", "quitar hojas pdf"],
    howItWorks: ["Sube el PDF.", "Indica las páginas a eliminar.", "Descarga el resultado."],
    faq: [
      {
        q: "¿Puedo eliminar todas las páginas?",
        a: "No: el documento final debe conservar al menos una página.",
      },
    ],
    options: [
      {
        key: "pages",
        type: "text",
        label: "Páginas a eliminar",
        help: "Ejemplo: 2, 7-9",
        default: "",
        placeholder: "2, 7-9",
      },
    ],
    run: deletePages,
  },
  {
    slug: "extraer-texto-pdf",
    name: "Extraer texto",
    h1: "Extraer el texto de un PDF",
    tagline: "Obtén todo el texto del documento en un archivo de texto plano.",
    seoTitle: "Extraer texto de un PDF online | ARVIO",
    seoDescription:
      "Copia el texto de un PDF a un archivo .txt página por página, sin instalar nada. Útil para reutilizar contenido o revisarlo rápidamente.",
    category: "convertir",
    icon: "TextSelect",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer texto",
    keywords: ["extraer texto pdf", "pdf a txt", "copiar texto pdf"],
    howItWorks: ["Sube el PDF.", "ARVIO recorre las páginas.", "Descarga el archivo de texto."],
    faq: [
      {
        q: "¿Funciona con documentos escaneados?",
        a: "No. Un escaneo es una imagen y necesita OCR, que llegará en una fase posterior.",
      },
    ],
    run: extractText,
  },
  {
    slug: "pdf-a-word",
    name: "PDF a Word",
    h1: "Convertir PDF a Word",
    tagline: "Conversión con maquetación editable en documento .docx.",
    seoTitle: "Convertir PDF a Word (.docx) | ARVIO",
    seoDescription:
      "Convierte un PDF en un documento Word editable conservando párrafos, tablas y estilos. Herramienta en preparación dentro de ARVIO.",
    category: "convertir",
    icon: "FileType2",
    status: "pending",
    pendingReason:
      "Reconstruir la maquetación en .docx exige un motor de conversión en servidor con cola de trabajos. Está en construcción y no se activará hasta que el resultado sea fiable.",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a Word",
    keywords: ["pdf a word", "pdf a docx", "convertir pdf editable"],
    howItWorks: [
      "Subirás el PDF.",
      "El documento se procesará en la cola de conversión de ARVIO.",
      "Descargarás un .docx editable.",
    ],
    faq: [
      {
        q: "¿Cuándo estará disponible?",
        a: "En cuanto el motor de conversión en servidor esté validado. Preferimos no ofrecer una conversión que rompa la maquetación.",
      },
    ],
  },
  {
    slug: "word-a-pdf",
    name: "Word a PDF",
    h1: "Convertir Word a PDF",
    tagline: "Convierte .doc y .docx en PDF respetando fuentes y saltos de página.",
    seoTitle: "Convertir Word a PDF online | ARVIO",
    seoDescription:
      "Convierte documentos Word en PDF manteniendo tipografías, imágenes y saltos de página. Herramienta en preparación dentro de ARVIO.",
    category: "convertir",
    icon: "FileType",
    status: "pending",
    pendingReason:
      "Una conversión fiel a Word necesita un motor de composición tipográfica en servidor. Está en construcción; mientras no funcione bien, no la publicamos.",
    accept:
      "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["word a pdf", "docx a pdf", "convertir word"],
    howItWorks: [
      "Subirás el documento Word.",
      "Se compondrá en la cola de conversión de ARVIO.",
      "Descargarás el PDF final.",
    ],
    faq: [
      {
        q: "¿Se conservarán las fuentes?",
        a: "Sí, ese es justamente el motivo por el que la herramienta aún no está publicada.",
      },
    ],
  },
];

export function getTool(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function toolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function relatedTools(tool: ToolDefinition, limit = 4): ToolDefinition[] {
  const sameCategory = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug);
  const others = TOOLS.filter((t) => t.category !== tool.category && t.status === "live");
  return [...sameCategory, ...others].slice(0, limit);
}

/** Lightweight fuzzy match: subsequence + token scoring, no dependencies. */
export function searchTools(query: string): ToolDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;

  const score = (tool: ToolDefinition): number => {
    const haystacks = [tool.name, ...tool.keywords, tool.tagline].map((h) => h.toLowerCase());
    let best = 0;
    for (const [index, hay] of haystacks.entries()) {
      const weight = index === 0 ? 3 : index < tool.keywords.length + 1 ? 2 : 1;
      if (hay === q) best = Math.max(best, 100 * weight);
      else if (hay.startsWith(q)) best = Math.max(best, 60 * weight);
      else if (hay.includes(q)) best = Math.max(best, 40 * weight);
      else if (isSubsequence(q, hay)) best = Math.max(best, 12 * weight);
    }
    return best;
  };

  return TOOLS.map((tool) => ({ tool, value: score(tool) }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
    .map((entry) => entry.tool);
}

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const char of hay) {
    if (char === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return i === needle.length;
}
