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
  ocrPdf,
  repairPdf,
  protectPdf,
  unlockPdf,
  pdfToExcel,
  pdfToWord,
  wordToPdf,
  pdfToPptx,
  summarizePdf,
  extractStructuredData,
  pdfToWebp,
  generateQrPdf,
  redactPdf,
  cropPdf,
  pdfToMarkdown,
  pdfToPdfA,
  excelToPdf,
  reorderPdf,
  flattenPdf,
  removeMetadataPdf,
  pdfToPng,
  pngToPdf,
  resizePdf,
  editMetadataPdf,
  addTextPdf,
  insertPagesPdf,
  optimizePdfForPrint,
  webpToPdf,
  markdownToPdf,
  powerpointToPdf,
  svgToPdf,
  extractImagesPdf,
  splitPdfBySize,
  removeBlankPagesPdf,
  imageToWebp,
  sanitizePdf,
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
    seoTitle: "Comprimir PDF online gratis y reducir tamaño | BreadPDF",
    seoDescription:
      "Reduce el tamaño de tu PDF en el navegador con cuatro niveles de compresión y comparativa de peso. Rápido, privado y sin subir archivos a servidores.",
    category: "optimizar",
    icon: "Minimize2",
    status: "live",
    accept: "application/pdf",
    multiple: true,
    minFiles: 1,
    autoProcess: true,
    ctaLabel: "Comprimir PDF",
    keywords: [
      "comprimir pdf",
      "reducir tamaño pdf",
      "bajar peso pdf",
      "comprimir pdf a 2mb",
      "comprimir pdf moodle 5mb",
      "pdf ligero",
    ],
    howItWorks: [
      "Selecciona el PDF que quieres reducir.",
      "Elige el nivel: sin pérdida, ligero, equilibrado o máximo.",
      "Compara el peso antes y después y descarga el resultado.",
    ],
    faq: [
      {
        q: "¿Se pierde calidad al comprimir un PDF?",
        a: "Depende del modo elegido. En el nivel 'Sin pérdida' no se recomprime nada: se reorganizan los objetos internos del PDF y el texto y vectores permanecen intactos. En los niveles Ligero, Equilibrado y Máximo las páginas se rasterizan a imagen con resolución optimizada para lograr mayor reducción de peso.",
      },
      {
        q: "¿Qué diferencia hay entre los cuatro niveles de compresión?",
        a: "'Sin pérdida' conserva texto seleccionable y estructura original; 'Ligero' ofrece una reducción moderada con máxima fidelidad visual; 'Equilibrado' es el ajuste recomendado para envíos generales por email; y 'Máximo' prioriza el menor peso posible para plataformas con límites estrictos.",
      },
      {
        q: "¿Qué ocurre si el archivo comprimido resulta más pesado que el original?",
        a: "BreadPDF incluye una salvaguarda automática: si la compresión con rasterización generase un archivo de mayor tamaño (habitual en PDFs con solo texto plano), el sistema descarta el incremento y aplica la optimización estructural para garantizar que nunca aumente de peso.",
      },
      {
        q: "¿Puedo ver cuánto peso se ha reducido antes de descargar?",
        a: "Sí. Una vez finalizado el proceso, BreadPDF te muestra el peso original, el peso final obtenido y el porcentaje exacto de ahorro para que puedas validar el resultado antes de guardarlo.",
      },
      {
        q: "¿Se puede volver a seleccionar o copiar texto tras una compresión en modo equilibrado o máximo?",
        a: "En los modos Ligero, Equilibrado y Máximo las páginas se procesan como imágenes optimizadas, por lo que el texto vectorial se aplana. Si necesitas mantener el texto seleccionable para copiar o buscar con Ctrl+F, utiliza siempre el modo 'Sin pérdida'.",
      },
      {
        q: "¿Cómo comprimir un PDF para que pese menos de 2 MB, 5 MB o 10 MB?",
        a: "Selecciona el selector 'Nivel de compresión' y elige el preset correspondiente (≤ 2 MB para CV y portales de empleo, ≤ 5 MB para Moodle y campus virtuales, o ≤ 10 MB para sedes judiciales como LexNET). El motor adaptativo ajusta dinámicamente el submuestreo de imágenes hasta alcanzar el objetivo sin romper la legibilidad.",
      },
      {
        q: "¿Por qué Moodle o mi campus universitario rechazan mi PDF por tamaño?",
        a: "La mayoría de plataformas Moodle y campus virtuales están configuradas por su administrador con un límite de subida por tarea (frecuentemente 5 MB o 10 MB). Con el ajuste 'Objetivo ≤ 5 MB (Moodle)', el archivo se comprime localmente en tu equipo para garantizar que la entrega se suba de inmediato sin errores.",
      },
      {
        q: "¿Se sube mi archivo a algún servidor externo?",
        a: "No. Toda la compresión y análisis de páginas se procesa localmente en la memoria de tu navegador mediante JavaScript y WebAssembly. Tus documentos confidenciales nunca viajan por internet.",
      },
    ],
    options: [
      {
        key: "level",
        type: "select",
        label: "Nivel de compresión",
        default: "balanced",
        options: [
          { value: "balanced", label: "Equilibrado — recomendado" },
          { value: "target_2mb", label: "Objetivo ≤ 2 MB (CV, InfoJobs, portales)" },
          { value: "target_5mb", label: "Objetivo ≤ 5 MB (Moodle, Campus Virtual)" },
          { value: "target_10mb", label: "Objetivo ≤ 10 MB (LexNET, sedes judiciales)" },
          { value: "lossless", label: "Sin pérdida — reestructura sin rasterizar" },
          { value: "light", label: "Ligero — máxima nitidez visual" },
          { value: "strong", label: "Máximo — reducción extrema" },
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
    seoTitle: "Unir PDF online gratis y en orden | BreadPDF",
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
      {
        title: "Añade tus PDF",
        desc: "Selecciona los archivos que quieras combinar.",
      },
      {
        title: "Ordénalos",
        desc: "Arrástralos para colocarlos en el orden que quieras.",
      },
      {
        title: "Descarga el resultado",
        desc: "Genera un único PDF y descárgalo.",
      },
    ],
    faq: [
      {
        q: "¿Cuántos archivos puedo unir a la vez?",
        a: "No existe un límite artificial en la aplicación. La combinación se ejecuta íntegramente en la memoria de tu dispositivo, por lo que puedes unir dos o decenas de documentos siempre que tu navegador cuente con memoria suficiente.",
      },
      {
        q: "¿Cómo elijo el orden en el que aparecerán los documentos?",
        a: "En la lista de archivos puedes arrastrar o usar las flechas para ordenar los documentos exactamente como desees antes de pulsar en 'Unir PDF'. El PDF final seguirá de forma estricta esa posición de arriba a abajo.",
      },
      {
        q: "¿Se conservan los enlaces, hipervínculos y texto seleccionable?",
        a: "Sí. Las páginas se importan vectorialmente con sus objetos nativos, fuentes y capas de contenido, por lo que el texto sigue siendo seleccionable, legible y con la máxima fidelidad sin sufrir compresión forzada.",
      },
      {
        q: "¿Puedo unir archivos PDF que tengan diferentes tamaños de página (A4, carta, apaisado)?",
        a: "Sí. Cada página añadida conserva sus dimensiones originales y su orientación particular (vertical u horizontal) dentro del mismo documento final unificado.",
      },
      {
        q: "¿Qué nombre tendrá el archivo PDF final descargado?",
        a: "Por defecto el documento se genera con el nombre 'breadpdf-documento-unido.pdf', listo para guardar en tu carpeta de descargas o renombrar en tu equipo.",
      },
      {
        q: "¿Mis documentos se suben a algún servidor externo?",
        a: "No. La unión de PDFs se realiza 100% de forma local en tu navegador mediante WebAssembly y JavaScript. Los archivos nunca viajan por internet ni quedan almacenados en la nube.",
      },
    ],
    run: mergePdf,
  },
  {
    slug: "dividir-pdf",
    name: "Dividir PDF",
    h1: "Dividir un PDF en varios documentos",
    tagline: "Separa página a página o por los intervalos que tú definas.",
    seoTitle: "Dividir PDF online por páginas o intervalos | BreadPDF",
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
        q: "¿Cómo se definen los intervalos o rangos de páginas?",
        a: "En el modo de intervalos, escribe las páginas o rangos separados por comas (por ejemplo: '1-3, 4, 5-9'). Cada intervalo producirá un archivo PDF independiente con esas páginas exactas.",
      },
      {
        q: "¿Puedo dividir el PDF en un archivo por cada página?",
        a: "Sí. Selecciona la opción 'Una página por archivo' en el selector de modo. Si tu PDF tiene 10 páginas, obtendrás 10 archivos PDF individuales numerados correlativamente.",
      },
      {
        q: "¿Qué nombre reciben los archivos resultantes tras la división?",
        a: "Cada archivo descargable toma como base el nombre del documento original añadiendo la página o el intervalo correspondiente (por ejemplo: 'documento-pagina-1.pdf' o 'documento-1-3.pdf').",
      },
      {
        q: "¿Se modifica el archivo original que subo?",
        a: "En absoluto. Tu archivo de origen permanece intacto en tu dispositivo; la herramienta solo extrae y guarda nuevas copias de las páginas indicadas sin alterar el original.",
      },
      {
        q: "¿Se pierde calidad visual o texto seleccionable al dividir?",
        a: "No. La división se realiza copiando directamente las estructuras y flujos vectoriales originales de cada página, preservando textos, fuentes, imágenes y nitidez al 100%.",
      },
      {
        q: "¿Se envían mis documentos a servidores remotos para dividirlos?",
        a: "No. Todo el proceso de separación y empaquetado de páginas ocurre de manera local y privada en tu navegador. Ningún dato viaja a la nube ni a servidores externos.",
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
    seoTitle: "Convertir PDF a JPG online con calidad ajustable | BreadPDF",
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
        q: "¿Cómo se convierte un PDF a imágenes JPG?",
        a: "Solo tienes que seleccionar tu archivo PDF, ajustar los valores de resolución (escala) y calidad de compresión JPG si lo deseas, y hacer clic en 'Convertir a JPG'. Cada página se procesará y se generará una imagen independiente lista para descargar.",
      },
      {
        q: "¿Se convierten todas las páginas del documento?",
        a: "Sí. El conversor recorre automáticamente cada una de las páginas del PDF desde la primera hasta la última, generando un archivo JPG numerado por cada una de ellas.",
      },
      {
        q: "¿Qué significan los controles de resolución y calidad?",
        a: "La 'Resolución' aplica un multiplicador de escala sobre las dimensiones de la página (desde 1x hasta 4x para mayor nitidez), mientras que la 'Calidad JPG' ajusta el nivel de compresión de la imagen (de 40% a 100%) para equilibrar claridad y tamaño de archivo.",
      },
      {
        q: "¿Qué ocurre con los textos, vectores e imágenes del PDF?",
        a: "El motor de renderizado rasteriza todo el contenido visible de cada página tal y como se diseñó, incluyendo tipografías, ilustraciones vectoriales y fotografías, consolidándolos en una imagen JPG de alta definición.",
      },
      {
        q: "¿Se pueden descargar las imágenes individualmente?",
        a: "Sí. Cada página convertida genera su propio archivo descargable con el nombre original del PDF seguido de su número de página (por ejemplo: 'documento-01.jpg', 'documento-02.jpg').",
      },
      {
        q: "¿Se cargan mis documentos en servidores externos durante la conversión?",
        a: "No. El renderizado a imagen se ejecuta al 100% de manera local en el motor de tu navegador web. La información de tus documentos jamás se envía a ningún servidor.",
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
    seoTitle: "Convertir JPG a PDF online en A4 o ajustado | BreadPDF",
    seoDescription:
      "Convierte imágenes JPG o PNG en un único documento PDF, eligiendo tamaño A4 con márgenes o ajustado a la foto. Ordena tus imágenes en el navegador.",
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
        q: "¿Puedo añadir varias imágenes a la vez?",
        a: "Sí. Puedes seleccionar y cargar tantas imágenes como necesites en una sola tanda para combinarlas en un único documento PDF.",
      },
      {
        q: "¿Se pueden combinar imágenes en formato JPG y PNG juntas?",
        a: "Sí. La herramienta es compatible tanto con archivos JPEG/JPG como con PNG, permitiéndote combinarlos indistintamente en el mismo archivo PDF final.",
      },
      {
        q: "¿Cómo se organiza el orden de las fotos en el PDF?",
        a: "En la lista previa puedes arrastrar o usar las flechas para ordenar las imágenes en la secuencia exacta que desees. La primera imagen corresponderá a la primera página del PDF.",
      },
      {
        q: "¿Qué diferencia hay entre 'A4 con márgenes' y 'Ajustado a la imagen'?",
        a: "El modo 'A4 con márgenes' escala proporcionalmente cada foto para centrarla en una hoja estándar A4 con borde limpio, ideal para imprimir. El modo 'Ajustado a la imagen' crea páginas del tamaño exacto en píxeles de cada fotografía.",
      },
      {
        q: "¿Puedo convertir imágenes con diferentes resoluciones o proporciones?",
        a: "Sí. Si seleccionas A4, cada imagen se ajustará automáticamente manteniendo su relación de aspecto original sin deformarse. Si seleccionas ajustado a la imagen, cada página adoptará las medidas propias de cada foto.",
      },
      {
        q: "¿Se suben mis fotografías a internet o a algún servidor?",
        a: "No. El empaquetado de imágenes en PDF se realiza al 100% de manera local en tu navegador mediante WebAssembly. Tus fotos privadas nunca abandonan tu ordenador o teléfono.",
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
    seoTitle: "Rotar PDF online y guardar el giro | BreadPDF",
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
        q: "¿La rotación se guarda de forma permanente en el archivo?",
        a: "Sí. El ángulo de rotación se inscribe directamente en los metadatos y en los diccionarios de página del documento PDF. Al abrirlo en Adobe Acrobat, en el navegador o en cualquier visor, aparecerá girado de manera definitiva.",
      },
      {
        q: "¿Puedo rotar únicamente páginas específicas o intervalos?",
        a: "Sí. En el campo 'Páginas' puedes especificar páginas sueltas o rangos separados por comas (por ejemplo: '1, 3-5'). Si dejas el campo vacío, el giro se aplicará automáticamente a todas las páginas del PDF.",
      },
      {
        q: "¿Qué ángulos de giro están disponibles?",
        a: "Puedes rotar las páginas 90° a la derecha (en sentido horario), 180° (para documentos invertidos) o 90° a la izquierda (en sentido antihorario/270°).",
      },
      {
        q: "¿Se modifica o comprime el contenido del PDF al rotarlo?",
        a: "No. La rotación solo modifica la propiedad de orientación geométrica de las páginas seleccionadas. Los textos, fuentes incrustadas, imágenes y vectores permanecen exactamente con su calidad original.",
      },
      {
        q: "¿Qué nombre tiene el archivo descargado tras rotarlo?",
        a: "El documento se descarga automáticamente conservando el nombre original con el sufijo '-rotado.pdf' para no sobreescribir accidentalmente tu archivo de origen.",
      },
      {
        q: "¿El procesamiento de rotación se realiza en mi navegador?",
        a: "Sí. Todo el proceso se ejecuta 100% de forma local en tu dispositivo mediante WebAssembly. Tu documento nunca se envía a la red ni a servidores de terceros.",
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
    seoTitle: "Extraer páginas de un PDF en un nuevo archivo | BreadPDF",
    seoDescription:
      "Selecciona y extrae páginas concretas o intervalos de un PDF para crear un nuevo documento independiente, sin alterar el archivo original.",
    category: "organizar",
    icon: "FileOutput",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer páginas",
    keywords: ["extraer páginas pdf", "separar páginas pdf", "sacar hojas de pdf", "copiar páginas pdf", "guardar páginas pdf"],
    howItWorks: ["Sube el PDF.", "Indica las páginas a conservar.", "Descarga el nuevo documento."],
    faq: [
      {
        q: "¿Cómo se indican las páginas que quiero extraer?",
        a: "En el campo 'Páginas a extraer' puedes escribir números individuales separados por comas o rangos con guiones (por ejemplo: '1, 4-6, 10'). Solo se incluirán en el nuevo documento las páginas que especifiques.",
      },
      {
        q: "¿En qué orden aparecen las páginas en el nuevo PDF?",
        a: "El procesador recopila las páginas y las ordena de forma ascendente natural para conservar la coherencia y el sentido de lectura cronológico del documento original.",
      },
      {
        q: "¿Qué diferencia hay entre extraer páginas y dividir un PDF?",
        a: "'Extraer páginas' genera un único archivo PDF que contiene exclusivamente la selección de páginas que necesitas. 'Dividir PDF', en cambio, separa el documento en múltiples archivos individuales o por bloques.",
      },
      {
        q: "¿El PDF original se altera o pierde páginas?",
        a: "No. Tu documento original en tu ordenador o móvil no sufre ningún cambio. La herramienta genera un archivo nuevo descargable sin modificar el original.",
      },
      {
        q: "¿Se conserva la calidad, fuentes y gráficos de las páginas extraídas?",
        a: "Sí. Las páginas se copian fielmente a nivel vectorial con todos sus flujos de texto, imágenes y estilos intactos, sin pérdida de resolución ni cambios de formato.",
      },
      {
        q: "¿Se procesa el archivo de forma privada en mi navegador?",
        a: "Sí. La extracción ocurre íntegramente dentro de tu navegador con WebAssembly. Ningún documento viaja por la red ni se aloja en servidores externos.",
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
    seoTitle: "Eliminar páginas de un PDF y guardar online | BreadPDF",
    seoDescription:
      "Borra las hojas que no necesitas de un documento PDF y descarga el archivo limpio con páginas reindexadas, sin instalar programas ni subir archivos.",
    category: "organizar",
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
        q: "¿Puedo eliminar todas las páginas de un documento?",
        a: "No. Un archivo PDF válido requiere conservar al menos una página. Si intentas eliminar la totalidad de las páginas, el sistema te solicitará ajustar la selección.",
      },
      {
        q: "¿Cómo indico qué páginas o intervalos quiero borrar?",
        a: "En el campo 'Páginas a eliminar', escribe los números sueltos o intervalos separados por comas (por ejemplo: '2, 7-9'). Esas páginas serán suprimidas y el resto se mantendrá intacto.",
      },
      {
        q: "¿Qué ocurre con la numeración de las páginas restantes?",
        a: "El documento resultante se reindexa automáticamente de forma consecutiva desde la página 1 en adelante, manteniendo un flujo continuo y ordenado sin huecos en blanco.",
      },
      {
        q: "¿Se reduce el peso del archivo tras eliminar páginas?",
        a: "Sí. Al retirar páginas completas, se eliminan del documento final los elementos, gráficos y fuentes incrustadas exclusivos de dichas páginas, reduciendo el tamaño total del PDF.",
      },
      {
        q: "¿Se ve afectado el archivo original que subí?",
        a: "No. Tu archivo en tu dispositivo permanece inalterado. La herramienta genera un nuevo PDF descargable con el sufijo '-sin-paginas.pdf' sin sobreescribir tu documento de origen.",
      },
      {
        q: "¿Se borran las páginas en mi propio navegador de forma privada?",
        a: "Sí. La eliminación y reensamblado del PDF ocurre en la memoria local de tu navegador sin transferir archivos a ningún servidor externo.",
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
    seoTitle: "Extraer texto de un PDF a TXT online | BreadPDF",
    seoDescription:
      "Copia y extrae el texto plano de un PDF en un archivo .txt limpio delimitado por páginas. Proceso 100% privado en tu navegador.",
    category: "convertir",
    icon: "TextSelect",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer texto",
    keywords: ["extraer texto pdf", "pdf a txt", "copiar texto pdf"],
    howItWorks: ["Sube el PDF.", "BreadPDF recorre las páginas.", "Descarga el archivo de texto."],
    faq: [
      {
        q: "¿En qué formato se descarga el texto extraído?",
        a: "El texto se descarga en un archivo de texto plano con extensión .txt (codificación UTF-8), compatible de forma universal con cualquier editor de texto como Bloc de Notas, Word o TextEdit.",
      },
      {
        q: "¿Se conserva la separación entre páginas en el archivo .txt?",
        a: "Sí. Cada página del PDF se identifica en el archivo de texto resultante mediante un encabezado claro (por ejemplo: '--- Página 1 ---') que delimita el contenido de cada hoja.",
      },
      {
        q: "¿Funciona con documentos escaneados o imágenes de texto?",
        a: "Esta herramienta extrae texto nativo vectorial incrustado en el documento. Para documentos procedentes de escáner o fotos donde el texto forma parte de una imagen, se requiere reconocimiento óptico (OCR).",
      },
      {
        q: "¿Se extraen tablas, negritas o imágenes en el archivo de texto?",
        a: "No. El archivo .txt extrae exclusivamente los caracteres alfanuméricos y palabras en texto plano limpio. No contiene imágenes ni formato visual como colores o tipografías.",
      },
      {
        q: "¿Puedo extraer el texto de un PDF protegido con contraseña?",
        a: "Si el archivo requiere contraseña para abrirse, primero debes desbloquearlo con la herramienta de desbloqueo de BreadPDF para que el lector pueda acceder a su contenido.",
      },
      {
        q: "¿Mis documentos se analizan de manera privada y segura?",
        a: "Sí. La lectura y extracción de caracteres se realiza íntegramente en la memoria de tu navegador con la librería pdf.js. Tu archivo nunca sale de tu dispositivo ni se almacena externamente.",
      },
    ],
    run: extractText,
  },
  {
    slug: "pdf-a-word",
    name: "PDF a Word",
    h1: "Convertir PDF a Word editable",
    tagline: "Extrae el contenido textual y la estructura básica de tu PDF a un archivo .docx editable en tu navegador.",
    seoTitle: "Convertir PDF a Word (.docx) editable online | BreadPDF",
    seoDescription:
      "Convierte el texto y párrafos de un PDF a un documento Word (.docx) editable en tu navegador. Proceso local y privado sin registro.",
    category: "convertir",
    icon: "FileType2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a Word",
    keywords: ["pdf a word", "pdf a docx", "convertir pdf editable", "pasar pdf a word"],
    howItWorks: [
      "Sube el documento PDF que deseas transformar.",
      "El motor en memoria extrae el texto agrupando líneas y párrafos.",
      "Descarga tu archivo .docx editable al instante.",
    ],
    faq: [
      {
        q: "¿Puedo editar el archivo generado en Microsoft Word o Google Docs?",
        a: "Sí. La herramienta genera un documento estándar en formato .docx compatible con Microsoft Word, LibreOffice Writer y Google Docs.",
      },
      {
        q: "¿Qué tipo de documentos funcionan mejor con esta conversión?",
        a: "Funciona de manera óptima con documentos basados en texto continuo, como informes, contratos, artículos y cartas. En estos archivos los párrafos se extraen con fluidez para su posterior redacción.",
      },
      {
        q: "¿Qué limitaciones tiene respecto a un conversor de escritorio profesional?",
        a: "Al ejecutarse enteramente en el navegador sin un motor de maquetación de pago, los documentos con múltiples columnas periodísticas, tablas anidadas sin bordes o cajas de texto flotantes se reorganizan de forma lineal y pueden requerir ajustes manuales de espaciado.",
      },
      {
        q: "¿Se conservan las fuentes exactas y las imágenes?",
        a: "El texto se exporta con tipografía estándar limpia. Las imágenes decorativas complejas no se incrustan en esta versión beta para priorizar la fidelidad y ligereza del contenido editable.",
      },
      {
        q: "¿Funciona con PDFs escaneados o que solo contienen imágenes?",
        a: "No directamente. Para documentos escaneados donde el texto no es seleccionable nativamente, debes procesar primero el archivo con la herramienta 'OCR de PDF' de BreadPDF para reconocer los caracteres antes de convertirlos a Word.",
      },
      {
        q: "¿Mis documentos se envían a servidores externos?",
        a: "No. La extracción de bloques de texto y la composición del fichero .docx se ejecuta al 100% de manera local en la memoria de tu navegador mediante JavaScript. Tus archivos nunca salen de tu ordenador o móvil.",
      },
    ],
    run: pdfToWord,
  },
  {
    slug: "word-a-pdf",
    name: "Word a PDF",
    h1: "Convertir Word a PDF",
    tagline: "Transforma documentos .docx en archivos PDF estándar y listos para compartir o imprimir.",
    seoTitle: "Convertir Word a PDF online en tu navegador | BreadPDF",
    seoDescription:
      "Pasa tus documentos Word (.docx) a PDF conservando párrafos, títulos y estructura limpia. 100% privado en tu navegador.",
    category: "convertir",
    icon: "FileType",
    status: "live",
    accept:
      "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["word a pdf", "docx a pdf", "convertir word a pdf", "pasar docx a pdf"],
    howItWorks: [
      "Sube tu archivo Word (.docx o .doc).",
      "El procesador local interpreta el contenido y lo pagina en formato A4.",
      "Descarga tu documento PDF final de inmediato.",
    ],
    faq: [
      {
        q: "¿Qué versiones de Word son compatibles?",
        a: "Es compatible con archivos modernos en formato .docx (Word 2007 en adelante). Para documentos muy antiguos (.doc binario), se recomienda guardarlos previamente como .docx para asegurar una lectura fluida.",
      },
      {
        q: "¿Qué elementos del documento se transfieren al PDF?",
        a: "El motor extrae los textos completos, títulos, saltos de párrafo y listas, maquetándolos en páginas estándar A4 con márgenes uniformes y tipografía legible.",
      },
      {
        q: "¿El diseño se verá exactamente igual que en Microsoft Word?",
        a: "El conversor client-side prioriza la integridad del texto y la estructura. Documentos con diseños de diseño gráfico avanzado, encabezados multinivel personalizados o fuentes propietarias de Windows se renderizan con tipografías estándar universales para garantizar compatibilidad.",
      },
      {
        q: "¿Qué tamaño de página y márgenes utiliza el PDF generado?",
        a: "Por defecto genera páginas estándar en formato A4 vertical con márgenes limpios de 50 puntos y división automática de líneas para evitar desbordamientos.",
      },
      {
        q: "¿Se sube mi archivo Word a algún servidor para la conversión?",
        a: "No. El análisis del archivo .docx y la generación del PDF ocurren 100% de manera local en tu navegador mediante WebAssembly y librerías de cliente. Ningún texto viaja por la red.",
      },
    ],
    run: wordToPdf,
  },
  {
    slug: "marca-de-agua",
    name: "Marca de agua",
    h1: "Añadir marca de agua a un PDF",
    tagline: "Sella cada página con texto o imagen, rotación y control de opacidad.",
    seoTitle: "Añadir marca de agua a PDF online gratis | BreadPDF",
    seoDescription:
      "Añade marcas de agua de texto o imagen a tus archivos PDF con control total de ángulo, posición y transparencia, directamente en tu navegador.",
    category: "seguridad",
    icon: "Droplets",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Aplicar marca de agua",
    keywords: ["marca de agua pdf", "watermark pdf", "sello pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Configura el texto, ángulo, tamaño, opacidad y posición.",
      "Descarga tu documento protegido.",
    ],
    faq: [
      {
        q: "¿Se puede aplicar la marca de agua en modo mosaico o repetición?",
        a: "Sí. El panel interactivo permite activar el modo mosaico para estampar el texto de forma repetida diagonalmente sobre toda la superficie de cada página, impidiendo el recorte o reutilización no autorizada de secciones del documento.",
      },
      {
        q: "¿Puedo personalizar el nivel de transparencia y la rotación?",
        a: "Sí. Dispones de un control deslizante de opacidad (del 5% al 100%) para que la marca no oculte la legibilidad del texto principal, así como rotación angular libre (por ejemplo, inclinación clásica a 45 grados).",
      },
      {
        q: "¿Se pueden añadir marcas de agua con imágenes o logotipos?",
        a: "Sí. Además de marcas de texto personalizadas, puedes cargar archivos PNG con fondo transparente o logotipos corporativos en formato gráfico para estampar la identidad de tu empresa o estudio.",
      },
      {
        q: "¿La marca de agua se superpone encima o detrás del texto del documento?",
        a: "La herramienta estampa la marca de agua como una capa vectorial superior calibrada con opacidad, asegurando que quede visible sobre los elementos gráficos pero manteniendo la lectura del texto subyacente.",
      },
      {
        q: "¿Los documentos marcados se transmiten a internet?",
        a: "No. Toda la composición vectorial, inyección de capas y renderizado del documento resultante se procesa en el navegador de tu dispositivo de forma estrictamente privada.",
      },
    ],
  },
  {
    slug: "numerar-paginas",
    name: "Numerar páginas",
    h1: "Numerar páginas de un PDF",
    tagline: "Inserta numeración con formato, posición y márgenes configurables.",
    seoTitle: "Numerar páginas PDF online gratis | BreadPDF",
    seoDescription:
      "Añade números de página a tu documento PDF, en el encabezado o pie, personalizando el formato y la tipografía.",
    category: "editar",
    icon: "Hash",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Numerar páginas",
    keywords: ["numerar pdf", "paginar pdf", "numeros de pagina pdf"],
    howItWorks: [
      "Sube tu documento PDF.",
      "Selecciona el formato ({n} de {total}) y la posición.",
      "Descarga tu PDF paginado.",
    ],
    faq: [
      {
        q: "¿Puedo excluir la portada o las primeras hojas de la numeración?",
        a: "Sí. Puedes activar la opción 'Excluir primera página' o especificar el número inicial de página para no estampar cifras en portadas, índices o páginas de cortesía de tesis, libros y memorias.",
      },
      {
        q: "¿Qué formatos de numeración están disponibles?",
        a: "Admite formatos estándar como número simple ('1', '2', '3'), formato completo ('Página 1 de 15' / '1/15') o numeración romana ('i, ii, iii') según los requisitos de tu trabajo académico o informe técnico.",
      },
      {
        q: "¿En qué posiciones del documento se puede colocar el número?",
        a: "Puedes elegir entre pie de página (inferior centrado, inferior derecho o inferior izquierdo) y encabezado superior con márgenes de seguridad para no invadir el texto del documento.",
      },
      {
        q: "¿Se alteran las fuentes originales o la maquetación al paginar?",
        a: "No. Los números se incrustan como una capa vectorial limpia e independiente utilizando fuentes estándar legibles, sin modificar ni mover las líneas de texto existentes en tus páginas.",
      },
      {
        q: "¿El proceso de paginación es privado?",
        a: "Sí. Toda la lectura, numeración e inyección tipográfica se procesa localmente en tu navegador sin enviar ninguna página a servidores externos.",
      },
    ],
  },
  {
    slug: "ocr-pdf",
    name: "OCR de PDF",
    h1: "Reconocimiento óptico de caracteres (OCR) en PDF",
    tagline: "Convierte documentos escaneados en archivos con texto seleccionable y buscable.",
    seoTitle: "OCR de PDF online gratis | Reconocimiento de texto BreadPDF",
    seoDescription:
      "Aplica OCR a tus PDF escaneados o imágenes directamente en el navegador. Genera un PDF con texto buscable o extrae el contenido en formato .txt.",
    category: "inteligencia",
    icon: "ScanText",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Iniciar OCR",
    keywords: ["ocr pdf", "reconocer texto pdf", "pdf escaneado a texto", "pdf buscable"],
    howItWorks: [
      "Sube tu PDF escaneado.",
      "Elige el idioma del documento (español, inglés, francés, etc.).",
      "Descarga tu nuevo PDF con texto seleccionable o el archivo .txt con el texto extraído.",
    ],
    faq: [
      {
        q: "¿Qué es el OCR y para qué sirve en un PDF?",
        a: "OCR (Reconocimiento Óptico de Caracteres) analiza las imágenes de páginas escaneadas o fotografías de documentos para identificar letras y palabras, convirtiéndolas en texto digital interactivo que puedes buscar y copiar.",
      },
      {
        q: "¿Qué idiomas reconoce el motor de OCR?",
        a: "Admite 7 idiomas principales: español, inglés, catalán, francés, alemán, italiano y portugués. Debes seleccionar el idioma predominante del documento antes de iniciar el reconocimiento para maximizar la precisión.",
      },
      {
        q: "¿Puedo seleccionar y copiar el texto después de aplicar OCR?",
        a: "Sí. Si seleccionas la salida en PDF, el sistema incrusta una capa tipográfica invisible perfectamente alineada sobre la imagen escaneada original, permitiéndote seleccionar palabras, copiarlas y buscar términos con Ctrl+F.",
      },
      {
        q: "¿Qué diferencia hay entre el formato de salida PDF y TXT?",
        a: "El modo 'PDF con capa de texto' mantiene la apariencia visual exacta del documento escaneado agregando la capa de búsqueda interna. El modo 'Archivo de texto plano (.txt)' extrae exclusivamente los caracteres en un archivo ligero sin gráficos ni diseño.",
      },
      {
        q: "¿Por qué tarda más o consume más recursos que otras herramientas?",
        a: "El reconocimiento óptico analiza píxel a píxel cada página mediante redes neuronales en WebAssembly dentro de tu propio equipo. En documentos de muchas páginas o imágenes de gran resolución, puede requerir varios segundos por hoja y un uso intensivo del procesador local.",
      },
      {
        q: "¿Se sube mi archivo a un servidor externo para procesar el OCR?",
        a: "No. El motor Tesseract se ejecuta íntegramente de manera local en tu navegador. Tus documentos escaneados nunca se transfieren por internet ni quedan almacenados en servidores de terceros.",
      },
    ],
    options: [
      {
        key: "lang",
        type: "select",
        label: "Idioma del documento",
        default: "spa",
        options: [
          { value: "spa", label: "Español" },
          { value: "eng", label: "Inglés" },
          { value: "cat", label: "Catalán" },
          { value: "fra", label: "Francés" },
          { value: "deu", label: "Alemán" },
          { value: "ita", label: "Italiano" },
          { value: "por", label: "Portugués" },
        ],
      },
      {
        key: "mode",
        type: "select",
        label: "Formato de salida",
        default: "pdf",
        options: [
          { value: "pdf", label: "PDF con capa de texto buscable" },
          { value: "txt", label: "Archivo de texto plano (.txt)" },
        ],
      },
    ],
    run: ocrPdf,
  },
  {
    slug: "reparar-pdf",
    name: "Reparar PDF",
    h1: "Reparar y recuperar archivos PDF dañados",
    tagline: "Recupera documentos corruptos reconstruyendo su estructura y tabla de referencias.",
    seoTitle: "Reparar PDF online gratis | Recuperación de documentos BreadPDF",
    seoDescription:
      "Repara archivos PDF que no abren, tienen la estructura rota o errores de XRef. Recupera páginas y descarga un PDF saneado en tu navegador.",
    category: "optimizar",
    icon: "Wrench",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Reparar PDF",
    keywords: ["reparar pdf", "arreglar pdf", "recuperar pdf dañado", "reconstruir pdf"],
    howItWorks: [
      "Sube el PDF dañado o incompleto.",
      "BreadPDF analiza la estructura binaria y rescata todas las páginas legibles.",
      "Descarga tu documento PDF reconstruido y saneado.",
    ],
    faq: [
      {
        q: "¿Qué tipo de errores y corrupciones repara esta herramienta?",
        a: "Aplica una doble estrategia de recuperación: primero repara cabeceras truncadas, tablas de referencias cruzadas (XRef) corruptas y reconstruye los flujos de objetos con pdf-lib; si el archivo presenta daños severos, activa un motor secundario con pdf.js que rescata y reensambla todas las páginas legibles de forma individual.",
      },
      {
        q: "¿Qué sucede si algunas páginas están completamente irrecuperables?",
        a: "La herramienta rescata e indexa todas las páginas válidas que el motor consiga interpretar y emite una notificación con el recuento exacto de páginas salvadas, evitando que pierdas la totalidad del documento.",
      },
      {
        q: "¿Qué mensajes de error comunes puede solucionar?",
        a: "Puede intentar recuperar archivos que muestran mensajes como 'El archivo PDF está dañado y no se puede reparar', 'Error al leer el archivo', 'Failed to load PDF document' en el navegador, o documentos que se abren pero aparecen en blanco o con páginas mezcladas. Si el archivo es una descarga incompleta o se interrumpió la transferencia, también puede recuperar las páginas que llegaron completas.",
      },
      {
        q: "¿Es seguro procesar contratos o documentos confidenciales dañados?",
        a: "Totalmente. El diagnóstico binario y la reconstrucción estructural se ejecutan al 100% en la memoria de tu navegador mediante WebAssembly y JavaScript sin transferir tus archivos por internet.",
      },
      {
        q: "¿Puede reparar un PDF protegido del cual no conozco la contraseña?",
        a: "No. La corrupción estructural es diferente del cifrado criptográfico. Si el archivo está protegido por contraseña, no está dañado sino bloqueado; para ese caso debes utilizar la herramienta 'Desbloquear PDF'.",
      },
      {
        q: "¿Qué ocurre si la herramienta no puede recuperar el documento?",
        a: "Si el motor no encuentra ninguna página legible, lo informará claramente. En ese caso, el daño es demasiado extenso para una recuperación automatizada en el navegador. Para documentos críticos irrecuperables, existen servicios profesionales de recuperación de datos que actúan a nivel de bytes del sistema de archivos.",
      },
    ],
    run: repairPdf,
  },
  {
    slug: "proteger-pdf",
    name: "Proteger PDF",
    h1: "Proteger PDF con contraseña y cifrado fuerte",
    tagline: "Añade una contraseña de apertura y cifra tu documento con seguridad AES de alta resistencia.",
    seoTitle: "Proteger PDF con contraseña online gratis | BreadPDF",
    seoDescription:
      "Cifra y añade contraseña a tus documentos PDF en tu navegador sin subirlos a internet. Máxima privacidad y compatibilidad con lectores PDF.",
    category: "seguridad",
    icon: "Lock",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Proteger PDF",
    keywords: ["proteger pdf", "contraseña pdf", "bloquear pdf", "cifrar pdf"],
    howItWorks: [
      "Sube el archivo PDF que deseas proteger.",
      "Introduce la contraseña de apertura que solicitará el documento.",
      "Descarga tu PDF blindado con cifrado robusto.",
    ],
    faq: [
      {
        q: "¿Qué tipo de protección añade esta herramienta?",
        a: "Añade una contraseña de usuario para la apertura del documento. Cada vez que alguien intente abrir el PDF en cualquier lector, se le solicitará la clave para desencriptar el contenido.",
      },
      {
        q: "¿Qué algoritmo de cifrado se utiliza?",
        a: "Se utiliza cifrado estándar AES compatible con las especificaciones oficiales de Adobe Acrobat, visores de navegadores modernos y aplicaciones móviles.",
      },
      {
        q: "¿Qué ocurre si olvido la contraseña que he establecido?",
        a: "No existe ningún mecanismo de recuperación. El cifrado altera matemáticamente los bytes del documento con tu clave; si la olvidas, nadie podrá volver a abrir el archivo.",
      },
      {
        q: "¿La contraseña o mi documento se envían a algún servidor?",
        a: "No. El proceso de cifrado se ejecuta al 100% de manera local en tu navegador mediante librerías criptográficas de cliente. Tu contraseña nunca viaja por la red ni queda registrada en ninguna base de datos.",
      },
      {
        q: "¿El PDF protegido es compatible con smartphones y tablets?",
        a: "Sí. Cualquier lector estándar en iOS, Android, macOS o Windows (como Adobe Acrobat, Apple Books o el visor integrado de Chrome/Edge) solicitará la clave al intentar abrirlo.",
      },
    ],
    options: [
      {
        key: "password",
        type: "text",
        label: "Contraseña de protección",
        default: "",
        placeholder: "Escribe una contraseña segura...",
        help: "Guarda tu clave. Sin ella nadie podrá abrir el archivo.",
      },
    ],
    run: protectPdf,
  },
  {
    slug: "desbloquear-pdf",
    name: "Desbloquear PDF",
    h1: "Desbloquear PDF y quitar contraseña",
    tagline: "Retira la contraseña de un PDF del que tienes la clave para abrirlo sin restricciones.",
    seoTitle: "Desbloquear PDF online y quitar contraseña | BreadPDF",
    seoDescription:
      "Elimina la contraseña de apertura de tu archivo PDF introduciendo la clave legítima una sola vez. Descarga tu PDF libre de contraseñas.",
    category: "seguridad",
    icon: "Unlock",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Desbloquear PDF",
    keywords: ["desbloquear pdf", "quitar contraseña pdf", "eliminar clave pdf"],
    howItWorks: [
      "Sube tu archivo PDF protegido.",
      "Introduce la contraseña actual del documento.",
      "Descarga el nuevo PDF limpio y sin contraseña de apertura.",
    ],
    faq: [
      {
        q: "¿Puedo desbloquear un PDF si he olvidado o no conozco la contraseña?",
        a: "No. Esta herramienta no es un descifrador ni utiliza ataques de fuerza bruta para quebrar claves ajenas. Requiere que introduzcas la contraseña legítima para desencriptar el documento y retirar la protección permanentemente.",
      },
      {
        q: "¿Para qué sirve esta herramienta si ya tengo la contraseña?",
        a: "Es útil para documentos de uso diario (nóminas, extractos bancarios, facturas o manuales) a los que debes acceder con frecuencia sin tener que teclear la clave cada vez que los abres.",
      },
      {
        q: "¿Qué sucede si introduzco una contraseña incorrecta?",
        a: "El proceso fallará de inmediato en tu navegador con un mensaje de error indicando que la clave es incorrecta, sin alterar ni dañar tu archivo original.",
      },
      {
        q: "¿Se modifica el contenido o la calidad del documento al desbloquearlo?",
        a: "No. El contenido binario se descifra conservando al 100% el texto vectorial, imágenes, firmas y maquetación original, eliminando únicamente la barrera de seguridad de apertura.",
      },
      {
        q: "¿Mi contraseña o mi documento se envían a internet?",
        a: "No. Todo el desencriptado tiene lugar en la memoria de tu dispositivo mediante WebAssembly y JavaScript. Ningún dato ni contraseña se transmite a servidores externos.",
      },
    ],
    options: [
      {
        key: "password",
        type: "text",
        label: "Contraseña actual",
        default: "",
        placeholder: "Introduce la contraseña del documento...",
        help: "Es necesaria para desencriptar los datos en tu navegador.",
      },
    ],
    run: unlockPdf,
  },
  {
    slug: "firmar-pdf",
    name: "Firmar PDF",
    h1: "Firmar PDF online gratis y a mano alzada",
    tagline: "Dibuja o sube tu firma electrónica y estámpala en cualquier página de tu documento.",
    seoTitle: "Firmar PDF online gratis | Firma digital BreadPDF",
    seoDescription:
      "Añade tu rúbrica o firma gráfica a tu documento PDF directamente en el navegador. 100% privado, sin subir datos a ningún servidor.",
    category: "seguridad",
    icon: "Signature",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Firmar y descargar PDF",
    keywords: ["firmar pdf", "firma digital pdf", "firmar documento", "rúbrica pdf"],
    howItWorks: [
      "Sube el PDF que necesitas firmar.",
      "Dibuja tu firma en el lienzo interactivo o sube una imagen de tu rúbrica.",
      "Coloca la firma en la posición y página que desees y descarga el PDF firmado.",
    ],
    faq: [
      {
        q: "¿Mi firma se almacena en sus servidores?",
        a: "No. El proceso de firma y renderizado se realiza 100% en tu navegador mediante WebAssembly y Canvas. Ni tu documento ni tu firma salen de tu equipo.",
      },
      {
        q: "¿Puedo colocar la firma en varias páginas?",
        a: "Sí, puedes elegir colocarla en la última página, la primera, todas las páginas o solo las páginas que selecciones.",
      },
      {
        q: "¿Qué validez legal tiene esta firma según la normativa eIDAS?",
        a: "Esta herramienta genera una Firma Electrónica Simple (rúbrica gráfica manuscrita estampada sobre el documento), plenamente admitida como prueba en procedimientos de común acuerdo (contratos de arrendamiento, autorizaciones, solicitudes cotidianas o recibís laborales). No es una Firma Cualificada con certificado digital de la FNMT/DNIe, requerida para trámites específicos con la Administración Pública española o LexNET.",
      },
      {
        q: "¿Para qué documentos es útil firmar un PDF de esta forma?",
        a: "Es el método habitual para contratos de arrendamiento entre particulares, autorizaciones escolares, albaranes de entrega, documentos de aceptación de presupuesto, comunicaciones internas o cualquier acuerdo donde ambas partes consienten expresamente y guardan una copia firmada. No requiere ninguna aplicación adicional ni certificado digital.",
      },
      {
        q: "¿Puedo subir una imagen de mi firma en lugar de dibujarla?",
        a: "Sí. Además del lienzo interactivo para dibujar tu rúbrica con el ratón o el dedo en pantalla táctil, puedes cargar una imagen PNG o JPG de tu firma manuscrita real y posicionarla libremente sobre el documento.",
      },
      {
        q: "¿Qué diferencia hay entre firmar un PDF y añadirle un sello o marca de agua?",
        a: "Firmar implica colocar tu rúbrica personal en una posición concreta del documento, normalmente al pie de un contrato o formulario, con la intención de manifestar conformidad o autoría. Una marca de agua o sello, en cambio, se estampa de forma repetida o destacada sobre todas las páginas con un propósito de identificación o protección de la distribución.",
      },
    ],
  },
  {
    slug: "pdf-a-excel",
    name: "PDF a Excel",
    h1: "Convertir PDF a Excel y CSV online gratis",
    tagline: "Extrae tablas y datos estructurados de tu PDF a hojas de cálculo XLSX o CSV.",
    seoTitle: "Convertir PDF a Excel online gratis | XLSX y CSV en BreadPDF",
    seoDescription:
      "Convierte tablas y datos de tus archivos PDF a hojas de cálculo Excel (.xlsx) o CSV de forma rápida, exacta y sin subir archivos a servidores externos.",
    category: "convertir",
    icon: "FileSpreadsheet",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a Excel",
    keywords: ["pdf a excel", "convertir pdf a xlsx", "extraer tablas pdf", "pdf a csv"],
    howItWorks: [
      "Selecciona o arrastra el documento PDF con tablas o datos.",
      "Elige el formato de salida: Libro Excel (.xlsx) o archivo separado por comas (.csv).",
      "Descarga tu hoja de cálculo lista para editar y analizar.",
    ],
    faq: [
      {
        q: "¿Cómo agrupa el conversor las celdas, columnas y filas de mis tablas?",
        a: "El motor analiza la geometría espacial y las coordenadas X/Y de cada elemento textual mediante pdf.js, agrupando las palabras alineadas horizontalmente en filas y detectando las columnas según los márgenes de separación entre bloques para reconstruir la cuadrícula original con exactitud.",
      },
      {
        q: "¿Qué diferencia hay entre exportar en formato Excel (.xlsx) o CSV (.csv)?",
        a: "El formato Excel (.xlsx) genera un libro completo donde cada página del PDF se convierte en una hoja o pestaña independiente numerada; el formato CSV (.csv) genera un archivo de texto plano delimitado ideal para importar bases de datos o abrir con cualquier versión de hoja de cálculo.",
      },
      {
        q: "¿Para qué documentos funciona mejor esta conversión?",
        a: "Funciona mejor con facturas digitales con estructura de tabla, extractos bancarios, albaranes de pedido, inventarios de productos, informes financieros y presupuestos que contengan texto nativo seleccionable. El resultado es más preciso cuanto más regular es la cuadrícula del documento.",
      },
      {
        q: "¿Funciona en PDFs que son imágenes o facturas escaneadas?",
        a: "Para que las celdas se reconozcan mediante coordenadas, el PDF debe contener texto digital interactivo. Si tu documento es una fotografía o un escaneo sin capa tipográfica, debes pasar primero el archivo por 'OCR de PDF' antes de convertir a Excel.",
      },
      {
        q: "¿En qué se diferencia de la herramienta 'Extraer datos'?",
        a: "'PDF a Excel' convierte toda la estructura tabular de cada página en filas y columnas de hoja de cálculo, ideal para tablas completas. 'Extraer datos', en cambio, detecta y extrae campos específicos como correos electrónicos, teléfonos, fechas e importes monetarios en formato JSON o CSV, ideal para procesar facturas o formularios en lote.",
      },
      {
        q: "¿Se suben mis datos contables o financieros a servidores externos?",
        a: "Absolutamente no. La extracción espacial y la codificación del archivo .xlsx con la librería XLSX se ejecutan íntegramente en la memoria de tu navegador de forma 100% confidencial y privada.",
      },
    ],
    options: [
      {
        key: "format",
        type: "select",
        label: "Formato de hoja de cálculo",
        default: "xlsx",
        options: [
          { value: "xlsx", label: "Excel (.xlsx) — Recomendado con múltiples pestañas" },
          { value: "csv", label: "CSV (.csv) — Texto plano delimitado" },
        ],
      },
    ],
    run: pdfToExcel,
  },
  {
    slug: "comparar-pdf",
    name: "Comparar PDF",
    h1: "Comparar dos documentos PDF online y ver diferencias",
    tagline: "Inspecciona cambios visuales y discrepancias de texto entre dos versiones de un archivo PDF.",
    seoTitle: "Comparar dos PDF online y ver diferencias | BreadPDF",
    seoDescription:
      "Compara dos versiones de un documento PDF en paralelo o con cortinilla deslizante interactiva. Detecta cambios de texto y diseño en tu navegador.",
    category: "inteligencia",
    icon: "FileSearch",
    status: "live",
    accept: "application/pdf",
    multiple: true,
    minFiles: 2,
    ctaLabel: "Comparar documentos",
    keywords: ["comparar pdf", "diferencias pdf", "visualizador de diferencias", "diff pdf", "comparar dos pdf"],
    howItWorks: [
      "Sube el documento original (Versión A) y el documento modificado (Versión B).",
      "Navega página a página para ver el indicador automático de discrepancias de texto.",
      "Alterna entre vista en paralelo o cortinilla interactiva deslizante para inspeccionar cada detalle.",
    ],
    faq: [
      {
        q: "¿Qué tipo de diferencias detecta el comparador?",
        a: "Realiza dos comprobaciones complementarias: una comparación visual mediante renderizado de alta fidelidad y un análisis automático del flujo de texto que avisa si el contenido escrito de la página presenta cambios.",
      },
      {
        q: "¿Cómo funciona la vista de cortinilla interactiva?",
        a: "Superpone ambas versiones en un único lienzo y te permite desplazar un divisor horizontal o vertical con el ratón, haciendo evidente cualquier desplazamiento de párrafos, cambios tipográficos o variaciones de imágenes.",
      },
      {
        q: "¿Puedo comparar documentos con distinto número de páginas?",
        a: "Sí. El visor te permite avanzar hasta el total máximo de páginas entre ambos documentos y te alertará cuando una página exista en una versión pero no en la otra.",
      },
      {
        q: "¿Genera un informe descargable de cambios?",
        a: "Sí. Puedes inspeccionar visualmente en pantalla en paralelo o con la cortinilla deslizante, y pulsar en 'Descargar informe PDF' para guardar un documento con el resumen detallado de diferencias página por página.",
      },
      {
        q: "¿Mis documentos se suben a algún servidor externo para la comparación?",
        a: "No. El visor procesa, renderiza y compara ambas versiones íntegramente en la memoria de tu navegador mediante pdf.js y elementos Canvas. Tus documentos confidenciales nunca salen de tu equipo.",
      },
    ],
  },
  {
    slug: "resumir-pdf",
    name: "Resumir PDF",
    h1: "Resumir PDF y extraer puntos clave",
    tagline: "Genera resúmenes ejecutivos y puntos clave de documentos largos directamente en tu navegador.",
    seoTitle: "Resumir PDF online y extraer puntos clave | BreadPDF",
    seoDescription:
      "Extrae los puntos clave y oraciones más relevantes de cualquier PDF sin enviar tu documento a la nube ni requerir suscripciones.",
    category: "inteligencia",
    icon: "Sparkles",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Generar resumen",
    keywords: ["resumir pdf", "resumen pdf", "ideas clave pdf", "sintetizar pdf"],
    howItWorks: [
      "Sube el documento PDF que deseas resumir.",
      "Selecciona la extensión del resumen (breve, ejecutivo o puntos clave con viñetas).",
      "Descarga tu síntesis en formato texto limpio.",
    ],
    faq: [
      {
        q: "¿Cómo funciona técnicamente el algoritmo de resumen sin enviar datos a la nube?",
        a: "Utiliza un motor extractivo de puntuación semántica basado en frecuencia de términos ponderada (TF/TextRank) adaptado al español e inglés. El analizador descarta palabras vacías ('stop words') y puntúa las oraciones con mayor densidad informativa directamente en JavaScript en tu dispositivo.",
      },
      {
        q: "¿Qué formatos de resumen puedo elegir?",
        a: "Puedes seleccionar entre tres modalidades: 'Puntos clave destacados (Viñetas)' para obtener viñetas ágiles, 'Resumen breve' (las 3 ideas fundamentales) y 'Resumen ejecutivo' (las 5 oraciones con mayor relevancia global).",
      },
      {
        q: "¿Funciona en documentos escaneados o fotocopiados?",
        a: "El sintetizador requiere texto digital nativo. Si tu archivo es una imagen o fotocopia escaneada, primero debes procesarlo con la herramienta 'OCR de PDF' de BreadPDF para generar la capa de texto seleccionable.",
      },
      {
        q: "¿Hay límite en el número de páginas que se pueden resumir?",
        a: "No existe limitación artificial de páginas. El documento se procesa en fragmentos según la memoria RAM disponible en tu navegador, siendo capaz de sintetizar informes de decenas de páginas en segundos.",
      },
      {
        q: "¿Queda almacenado el texto de mi informe en algún servidor?",
        a: "No. El análisis y la generación del texto resumen ocurren en el entorno local de tu navegador. Ningún fragmento de texto o dato privado se transfiere a APIs externas.",
      },
    ],
    options: [
      {
        key: "length",
        type: "select",
        label: "Formato del resumen",
        default: "bullets",
        options: [
          { value: "bullets", label: "Puntos clave destacados (Viñetas)" },
          { value: "short", label: "Resumen breve (3 ideas clave)" },
          { value: "medium", label: "Resumen ejecutivo (5 ideas clave)" },
        ],
      },
    ],
    run: summarizePdf,
  },
  {
    slug: "extraer-datos",
    name: "Extraer datos",
    h1: "Extraer datos estructurados de PDF",
    tagline: "Detecta y extrae correos, teléfonos, fechas e importes monetarios automáticamente.",
    seoTitle: "Extraer datos de PDF online gratis | JSON y CSV en BreadPDF",
    seoDescription:
      "Extrae información sensible y estructurada como emails, importes, fechas y teléfonos directamente en formato JSON o CSV.",
    category: "inteligencia",
    icon: "TableProperties",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer campos",
    keywords: ["extraer datos pdf", "extraer facturas pdf", "datos estructurados pdf", "pdf a json"],
    howItWorks: [
      "Sube el documento PDF, factura o formulario.",
      "Elige el formato de salida: JSON o CSV.",
      "Descarga los datos estructurados listos para importar en tu base de datos o Excel.",
    ],
    faq: [
      {
        q: "¿Qué tipos de datos detecta y extrae el analizador?",
        a: "El motor aplica expresiones regulares y heurísticas para aislar correos electrónicos válidos, números de teléfono nacionales e internacionales, fechas en formatos estándar (DD/MM/AAAA) y cifras monetarias identificadas con símbolos de divisa (EUR, USD, €).",
      },
      {
        q: "¿En qué formatos puedo descargar la información extraída?",
        a: "Puedes elegir entre un archivo JSON estructurado (con arrays limpios de campos únicos, idóneo para automatizaciones y desarrolladores) o un archivo CSV delimitado por comas listo para importar directamente en Microsoft Excel, Google Sheets o LibreOffice Calc.",
      },
      {
        q: "¿Se eliminan los registros duplicados?",
        a: "Sí. El procesador desduplica automáticamente los correos electrónicos, teléfonos y fechas repetidas en las diferentes páginas, entregando una lista limpia y normalizada.",
      },
      {
        q: "¿Funciona con PDFs protegidos por contraseña o escaneados?",
        a: "En PDFs escaneados (imágenes sin texto digital) es necesario aplicar previamente 'OCR de PDF'. En documentos con contraseña de lectura, primero debes retirarla mediante la herramienta 'Desbloquear PDF'.",
      },
      {
        q: "¿Se envían mis facturas o datos confidenciales a terceros?",
        a: "No. Toda la búsqueda por expresiones regulares y estructuración de datos se ejecuta en la memoria local de tu navegador. Ningún teléfono, correo o importe se transmite por internet.",
      },
    ],
    options: [
      {
        key: "format",
        type: "select",
        label: "Formato de exportación",
        default: "json",
        options: [
          { value: "json", label: "JSON estructurado (Recomendado para desarrolladores)" },
          { value: "csv", label: "CSV delimitado (Recomendado para hojas de cálculo)" },
        ],
      },
    ],
    run: extractStructuredData,
  },
  {
    slug: "pdf-a-powerpoint",
    name: "PDF a PowerPoint",
    h1: "Convertir PDF a diapositivas PowerPoint",
    tagline: "Convierte cada página de tu PDF en una diapositiva .pptx en formato panorámico 16:9.",
    seoTitle: "Convertir PDF a PowerPoint (.pptx) online gratis | BreadPDF",
    seoDescription:
      "Transforma presentaciones en PDF en archivos PowerPoint (.pptx) listos para proyectar y editar en Microsoft PowerPoint o Google Slides.",
    category: "convertir",
    icon: "Presentation",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PowerPoint",
    keywords: ["pdf a powerpoint", "pdf a pptx", "convertir diapositivas pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "El motor genera diapositivas vectoriales panorámicas de alta definición.",
      "Descarga el archivo .pptx listo para proyectar.",
    ],
    faq: [
      {
        q: "¿El archivo .pptx resultante es compatible con Microsoft PowerPoint y Google Slides?",
        a: "Sí. Genera presentaciones bajo el estándar Office Open XML (.pptx) con disposición panorámica 16:9, compatibles nativamente con Microsoft PowerPoint, Google Slides, Keynote y LibreOffice Impress.",
      },
      {
        q: "¿Cómo se transfieren las páginas a las diapositivas?",
        a: "Cada página de tu PDF se renderiza con un factor de escala de alta fidelidad (2.0x) y se ajusta automáticamente para llenar la diapositiva completa, preservando la proporción, colores y nitidez de diagramas, fotografías y tipografías.",
      },
      {
        q: "¿Puedo añadir notas, formas o nuevas diapositivas en PowerPoint tras la conversión?",
        a: "Sí. El archivo descargado es un documento de presentación estándar totalmente editable en tu software de presentaciones habitual, donde podrás agregar nuevas hojas, transiciones o animaciones.",
      },
      {
        q: "¿Qué ocurre con PDFs en formato vertical (A4 vertical)?",
        a: "Se centran en la diapositiva panorámica 16:9 manteniendo sus proporciones exactas para evitar deformaciones o estiramientos de imagen no deseados.",
      },
      {
        q: "¿Se sube mi presentación a algún servidor en la nube?",
        a: "No. La conversión de páginas a diapositivas se procesa 100% de forma local en tu navegador web mediante librerías de cliente. Tus diapositivas nunca salen de tu ordenador.",
      },
    ],
    run: pdfToPptx,
  },
  {
    slug: "pdf-a-webp",
    name: "PDF a WebP",
    h1: "Convertir PDF a imágenes WebP",
    tagline: "Convierte páginas PDF a formato WebP moderno, nítido y hasta 70% más ligero.",
    seoTitle: "Convertir PDF a WebP online gratis | BreadPDF",
    seoDescription:
      "Transforma cada página de tu PDF en imágenes WebP de última generación. Alta calidad visual, compresión superior y 100% procesado en tu navegador.",
    category: "convertir",
    icon: "Image",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a WebP",
    keywords: ["pdf a webp", "convertir pdf webp", "extraer imagenes webp pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Elige la resolución de renderizado.",
      "Descarga las páginas convertidas en formato WebP ultraligero.",
    ],
    faq: [
      {
        q: "¿Qué ventajas ofrece el formato WebP frente a JPG o PNG?",
        a: "WebP es un formato moderno para imágenes web que ofrece una compresión hasta un 70% superior a JPG manteniendo una nitidez y fidelidad fotográfica impecables, ideal para páginas web rápidas y presentaciones digitales.",
      },
      {
        q: "¿Se convierten todas las páginas del PDF a WebP?",
        a: "Sí. Cada página del documento se procesa individualmente y genera una imagen en formato .webp independiente lista para ser descargada.",
      },
      {
        q: "¿Qué resolución o nitidez tienen las imágenes WebP generadas?",
        a: "Puedes ajustar la escala de renderizado entre 1x (tamaño estándar de pantalla) y hasta 4x para obtener imágenes en ultra alta resolución y gran detalle de texto y gráficos.",
      },
      {
        q: "¿Son compatibles las imágenes WebP con navegadores y programas actuales?",
        a: "Sí. WebP cuenta con compatibilidad universal en todos los navegadores modernos (Chrome, Safari, Edge, Firefox) y en los principales sistemas operativos como Windows, macOS, Android e iOS.",
      },
      {
        q: "¿Qué nombre reciben las imágenes descargadas?",
        a: "Cada archivo descargado toma el nombre de tu archivo PDF original añadiendo el sufijo '-pagina-X.webp', facilitando su clasificación y archivo.",
      },
      {
        q: "¿Se sube mi PDF a algún servidor para realizar la conversión a WebP?",
        a: "No. La conversión se procesa íntegramente de manera local en el motor de renderizado de tu navegador web. Tus archivos nunca salen de tu ordenador o teléfono móvil.",
      },
    ],
    options: [
      {
        key: "scale",
        type: "range",
        label: "Resolución",
        default: 2,
        min: 1,
        max: 4,
        step: 0.5,
        unit: "x",
      },
    ],
    run: pdfToWebp,
  },
  {
    slug: "qr-pdf",
    name: "Generar QR a PDF",
    h1: "Crear código QR para un PDF online",
    tagline: "Genera códigos QR estáticos de alta resolución y descárgalos maquetados en PDF listos para imprimir.",
    seoTitle: "Crear código QR para un PDF online | BreadPDF",
    seoDescription:
      "Genera códigos QR estáticos para enlaces, menús o texto y descárgalos en una hoja PDF A4 lista para imprimir o en PNG transparente.",
    category: "inteligencia",
    icon: "QrCode",
    status: "live",
    accept: "application/pdf,text/plain",
    multiple: false,
    minFiles: 0,
    ctaLabel: "Generar Código QR",
    keywords: ["qr a pdf", "generar codigo qr pdf", "crear qr imprimir", "codigo qr estatico"],
    howItWorks: [
      "Escribe la URL, texto o enlace que desees codificar.",
      "Asigna un título opcional para la hoja impresa.",
      "Descarga tu PDF maquetado en A4 junto con el archivo PNG del QR.",
    ],
    faq: [
      {
        q: "¿Qué tipo de código QR genera esta herramienta?",
        a: "Genera códigos QR estándar estáticos de alta resolución. La información (URL o texto) queda codificada directamente en la matriz de puntos del código.",
      },
      {
        q: "¿El código QR caduca o requiere suscripción?",
        a: "No. Al ser un código QR estático sin intermediarios ni redirecciones en servidores externos, nunca caduca y funcionará de forma permanente y gratuita sin límites de escaneos.",
      },
      {
        q: "¿En qué formatos se descarga el resultado?",
        a: "Obtienes dos archivos: un documento PDF maquetado en tamaño A4 con el título centrado y listo para imprimir en papel, y una imagen PNG individual con fondo transparente para insertar en carteles o diseños propios.",
      },
      {
        q: "¿Qué nivel de corrección de errores utiliza?",
        a: "Aplica el nivel de corrección alto ('H' - High), lo que permite que el código siga siendo legible incluso si la hoja impresa sufre manchas, dobleces o un desgaste de hasta el 30% de su superficie.",
      },
      {
        q: "¿Qué tipo de contenidos puedo introducir?",
        a: "Puedes introducir cualquier dirección web (https://...), texto informativo, contraseñas de red Wi-Fi o datos de contacto. Se recomienda verificar que el texto sea conciso para que el patrón de puntos no sea excesivamente denso.",
      },
      {
        q: "¿Mis enlaces o datos se registran en algún servidor?",
        a: "No. La generación del código QR se procesa en tu propio navegador mediante librerías de cliente. Tus enlaces y textos privados nunca se transmiten a bases de datos externas.",
      },
    ],
    options: [
      {
        key: "text",
        type: "text",
        label: "Enlace o contenido del QR",
        default: "https://breadpdf.com",
        placeholder: "https://tu-web.com o texto...",
      },
      {
        key: "title",
        type: "text",
        label: "Título en la hoja PDF",
        default: "Escanea este código QR",
        placeholder: "Ej. Menú del restaurante, Red Wifi...",
      },
    ],
    run: generateQrPdf,
  },
  {
    slug: "censurar-pdf",
    name: "Censurar PDF",
    h1: "Censurar PDF y tapar datos confidenciales",
    tagline: "Oculta visualmente textos, nombres, DNI o cifras confidenciales con bloques opacos permanentes.",
    seoTitle: "Censurar PDF online y tapar datos confidenciales | BreadPDF",
    seoDescription:
      "Tapa y cubre información sensible en tu PDF con bloques opacos negros o blancos. Procesamiento 100% privado en tu navegador.",
    category: "seguridad",
    icon: "ShieldAlert",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Censurar documento",
    keywords: ["censurar pdf", "redact pdf", "ocultar datos pdf", "tachar pdf confidencial", "tapar datos pdf"],
    howItWorks: [
      "Sube el documento PDF que contiene datos confidenciales.",
      "Introduce las palabras, DNI, nombres o cifras a ocultar separadas por comas.",
      "Descarga tu PDF con los bloques de censura superpuestos de forma permanente.",
    ],
    faq: [
      {
        q: "¿Cómo funciona técnicamente la censura en esta herramienta?",
        a: "El motor localiza las coordenadas espaciales exactas de los términos introducidos y dibuja rectángulos vectoriales opacos (negros o blancos) sobre esas posiciones en cada página.",
      },
      {
        q: "¿El texto cubierto se elimina físicamente o solo se oculta visualmente?",
        a: "La herramienta superpone rectángulos sólidos opacos sobre el contenido. En documentos vectoriales nativos, la capa de dibujo tapa visualmente la zona en pantalla e impresiones, pero no reescribe los flujos binarios internos del PDF; por ello, para documentos de máxima confidencialidad legal o judicial se recomienda validar que el texto no sea seleccionable o rasterizar el PDF.",
      },
      {
        q: "¿Puedo elegir el color de los bloques de censura?",
        a: "Sí. Puedes seleccionar 'Bloque Negro', el formato clásico de censura oficial y documental, o 'Bloque Blanco', ideal si deseas un borrado discreto que se integre limpiamente con el fondo de la página.",
      },
      {
        q: "¿Cómo debo indicar los términos que quiero tapar?",
        a: "Escribe las palabras clave, números de identificación (como DNI/NIE), apellidos o importes separados por comas en el campo de texto (por ejemplo: '12345678Z, confidencial, García'). La coincidencia no distingue entre mayúsculas y minúsculas.",
      },
      {
        q: "¿Funciona en PDFs escaneados donde el texto es una imagen?",
        a: "La detección automática busca coincidencias en la capa de texto digital. En PDFs que son fotografías o escaneos sin OCR previo, los términos no se detectan automáticamente por texto y requieren reconocimiento previo.",
      },
      {
        q: "¿Mis documentos confidenciales salen de mi ordenador?",
        a: "No. Toda la inspección de texto y el trazado de rectángulos de censura se realiza localmente en la memoria de tu navegador con pdf.js y pdf-lib. Ningún dato viaja a la nube.",
      },
    ],
    options: [
      {
        key: "terms",
        type: "text",
        label: "Palabras, nombres o números a censurar (separados por coma)",
        default: "",
        placeholder: "Ej. 12345678Z, confidencial, García",
      },
      {
        key: "color",
        type: "select",
        label: "Color del bloque de censura",
        default: "black",
        options: [
          { value: "black", label: "Bloque Negro (Clásico de censura oficial)" },
          { value: "white", label: "Bloque Blanco (Borrado discreto)" },
        ],
      },
    ],
    run: redactPdf,
  },
  {
    slug: "recortar-pdf",
    name: "Recortar PDF",
    h1: "Recortar márgenes de páginas PDF",
    tagline: "Elimina los márgenes en blanco sobrantes y ajusta el encuadre de todas las páginas.",
    seoTitle: "Recortar PDF online gratis | Ajustar márgenes BreadPDF",
    seoDescription:
      "Recorta márgenes vacíos y ajusta la caja de visualización de tus documentos PDF de forma precisa y 100% en tu navegador.",
    category: "editar",
    icon: "Crop",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Recortar PDF",
    keywords: ["recortar pdf", "crop pdf", "ajustar margenes pdf", "quitar bordes blancos pdf"],
    howItWorks: [
      "Sube el PDF que deseas recortar.",
      "Selecciona los milímetros de margen que deseas retirar de los bordes.",
      "Descarga el PDF encuadrado y limpio.",
    ],
    faq: [
      {
        q: "¿Se reduce el tamaño de letra o la calidad tipográfica al recortar?",
        a: "No. El contenido vectorial conserva su resolución y nitidez nativas; la herramienta únicamente ajusta la caja de recorte (CropBox) del estándar PDF para ocultar los bordes perimetrales sobrantes sin alterar las fuentes ni las imágenes internas.",
      },
      {
        q: "¿Cómo se calcula el margen que se recorta?",
        a: "El selector permite especificar el recorte en milímetros (entre 5 mm y 50 mm). Este valor se descuenta de forma uniforme en los cuatro bordes (superior, inferior, izquierdo y derecho) de cada página, garantizando una caja visible mínima de 50 puntos para evitar recortes accidentales totales.",
      },
      {
        q: "¿Es adecuado para eliminar márgenes blancos antes de leer en un lector de libros electrónicos (e-reader)?",
        a: "Sí. Es uno de sus usos más comunes: retirar entre 15 y 25 mm de márgenes vacíos permite que el texto ocupe un porcentaje mucho mayor de la pantalla de dispositivos como Kindle o Kobo sin necesidad de hacer zoom manual.",
      },
      {
        q: "¿Se recortan todas las páginas del PDF por igual?",
        a: "Sí. La dimensión de recorte elegida se aplica de forma automatizada y homogénea sobre cada una de las páginas que componen el documento.",
      },
      {
        q: "¿Mis documentos se transfieren a servidores externos para realizar el recorte?",
        a: "No. Toda la modificación del CropBox se ejecuta íntegramente en la memoria de tu navegador mediante pdf-lib y WebAssembly. Tu información confidencial nunca sale de tu equipo.",
      },
    ],
    options: [
      {
        key: "margin",
        type: "range",
        label: "Margen a recortar en bordes",
        default: 15,
        min: 5,
        max: 50,
        step: 5,
        unit: "mm",
      },
    ],
    run: cropPdf,
  },
  {
    slug: "pdf-a-markdown",
    name: "PDF a Markdown",
    h1: "Convertir PDF a Markdown (.md)",
    tagline: "Transforma tus documentos en Markdown limpio estructurado para ChatGPT, Claude y Notion.",
    seoTitle: "Convertir PDF a Markdown online gratis (.md) | BreadPDF",
    seoDescription:
      "Convierte PDFs en archivos Markdown estructurados con encabezados, listas y párrafos limpios, listos para alimentar modelos de IA o tus notas en Obsidian.",
    category: "convertir",
    icon: "FileCode",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a Markdown",
    keywords: ["pdf a markdown", "pdf a md", "convertir pdf obsidian", "pdf para chatgpt"],
    howItWorks: [
      "Sube el archivo PDF.",
      "El analizador detecta jerarquías de texto, títulos y listas.",
      "Descarga tu archivo .md listo para copiar en tu LLM o base de conocimiento.",
    ],
    faq: [
      {
        q: "¿Cómo detecta el conversor los títulos, subtítulos y listas en Markdown?",
        a: "El algoritmo analiza el tamaño de fuente y la separación vertical de cada fragmento de texto mediante pdf.js: tipografías de tamaño superior a 18pt se convierten automáticamente en encabezados ('### Encabezado'), y líneas precedidas por viñetas o guiones se formatean como listas no ordenadas ('* elemento').",
      },
      {
        q: "¿Por qué Markdown es el formato ideal para ChatGPT, Claude o Notion?",
        a: "A diferencia del PDF binario que introduce saltos de línea arbitrarios y caracteres invisibles, Markdown ofrece texto plano semántico limpio que maximiza el aprovechamiento de la ventana de contexto de los modelos de lenguaje (LLMs) y se pega limpiamente en bases de conocimiento como Obsidian o Notion.",
      },
      {
        q: "¿Se conservan las divisiones por páginas en el archivo descargado?",
        a: "Sí. El generador añade separadores comentados con el número de página ('## Página X') para que puedas localizar fácilmente la procedencia de cada cita o sección en el documento original.",
      },
      {
        q: "¿Funciona en PDFs que contienen tablas complejas o gráficos?",
        a: "El motor extrae los textos en el orden de lectura espacial (coordenadas X e Y). Para tablas con cuadrícula estructurada que requieran edición en celdas, se recomienda utilizar la herramienta especializada 'PDF a Excel' de BreadPDF.",
      },
      {
        q: "¿Se transmiten mis apuntes o libros a servidores de inteligencia artificial?",
        a: "No. La conversión a Markdown se procesa 100% en tu navegador. Tus textos nunca se envían a servidores de terceros ni se utilizan para entrenar modelos de IA.",
      },
    ],
    run: pdfToMarkdown,
  },
  {
    slug: "pdf-a-pdfa",
    name: "PDF a PDF/A",
    h1: "Convertir PDF a PDF/A para archivo a largo plazo",
    tagline: "Estandariza tu PDF bajo la norma ISO 19005-1 para trámites con Hacienda, juzgados y administraciones públicas.",
    seoTitle: "Convertir PDF a PDF/A online gratis | Norma ISO BreadPDF",
    seoDescription:
      "Transforma tus documentos al formato PDF/A estándar de conservación a largo plazo, requerido por Hacienda, juzgados, LexNET y administraciones públicas. Sin subir archivos.",
    category: "convertir",
    icon: "FileCheck",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF/A",
    keywords: ["pdf a pdfa", "convertir pdf/a", "pdf hacienda", "iso 19005-1"],
    howItWorks: [
      "Sube el archivo PDF que necesitas presentar o archivar.",
      "El motor inyecta metadatos ISO y neutraliza dependencias dinámicas.",
      "Descarga tu PDF/A certificado.",
    ],
    faq: [
      {
        q: "¿Qué diferencia existe entre un archivo PDF estándar y un PDF/A?",
        a: "PDF/A (ISO 19005-1) es un subconjunto estricto del formato PDF diseñado para la conservación y archivo digital a largo plazo. Prohíbe características no autónomas como scripts dinámicos de JavaScript, referencias a fuentes externas no incrustadas o cifrado dependiente de contraseñas.",
      },
      {
        q: "¿Es válido para trámites telemáticos ante la Agencia Tributaria, sedes judiciales y universidades?",
        a: "Sí. Las administraciones públicas exigen PDF/A para garantizar que el expediente pueda abrirse e interpretarse con total fidelidad visual dentro de 10, 20 o 50 años, independientemente del sistema operativo o visor utilizado.",
      },
      {
        q: "¿Qué ajustes técnicos introduce BreadPDF en el documento?",
        a: "Inyecta el esquema de metadatos XMP correspondiente a la norma ISO 19005-1 (PDF/A-1b), reestructura la tabla de objetos y guarda el documento desactivando flujos de compresión cruzada de objetos no soportados en visores arcaicos.",
      },
      {
        q: "¿Se pierde calidad en las imágenes o el texto al estandarizar a PDF/A?",
        a: "No. La estandarización no rasteriza ni comprime con pérdida el contenido existente; únicamente valida e integra las estructuras de metadatos requeridas por la norma internacional.",
      },
      {
        q: "¿Mis documentos oficiales se suben a la nube?",
        a: "No. Toda la inyección de metadatos y reensamblado conforme a ISO se ejecuta de forma local en tu navegador. Tus documentos oficiales y privados nunca salen de tu ordenador.",
      },
    ],
    run: pdfToPdfA,
  },
  {
    slug: "excel-a-pdf",
    name: "Excel a PDF",
    h1: "Convertir Excel a PDF online gratis",
    tagline: "Convierte hojas de cálculo XLSX y XLS a tablas PDF apaisadas listas para imprimir.",
    seoTitle: "Convertir Excel a PDF online gratis | BreadPDF",
    seoDescription:
      "Transforma tus archivos de Excel (.xlsx, .xls) a documentos PDF maquetados y ordenados con total privacidad en tu navegador.",
    category: "convertir",
    icon: "Sheet",
    status: "live",
    accept:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.xlsx,.xls",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["excel a pdf", "convertir xlsx a pdf", "hoja de calculo a pdf"],
    howItWorks: [
      "Sube tu libro de Excel (.xlsx o .xls).",
      "El motor procesa cada pestaña y ajusta las tablas en formato apaisado A4.",
      "Descarga tu documento PDF maquetado y listo para compartir o imprimir.",
    ],
    faq: [
      {
        q: "¿Se conservan las diferentes pestañas u hojas del libro de Excel?",
        a: "Sí. Cada pestaña con datos de tu archivo .xlsx o .xls genera una página independiente en el PDF final con su título de hoja destacado en la cabecera.",
      },
      {
        q: "¿Por qué el PDF se genera en formato apaisado (horizontal)?",
        a: "Las hojas de cálculo suelen incluir múltiples columnas que se cortarían en una página vertical; la disposición apaisada A4 (841 x 595 puntos) garantiza que las columnas se distribuyan proporcionalmente sin desbordar los márgenes de impresión.",
      },
      {
        q: "¿Qué formatos de hoja de cálculo son compatibles?",
        a: "Admite tanto el formato estándar moderno de Excel (.xlsx) como formatos clásicos (.xls) procesados mediante librerías especializadas sin requerir tener instalado Microsoft Office en tu equipo.",
      },
      {
        q: "¿Se mantiene el formato de celdas y cabeceras?",
        a: "La primera fila de cada hoja se identifica automáticamente como cabecera destacada con sombreado de contraste para facilitar la lectura de balances, inventarios y presupuestos.",
      },
      {
        q: "¿Se suben mis datos contables o financieros a servidores externos?",
        a: "No. Toda la lectura del binario de cálculo y la maquetación vectorial del PDF se ejecuta íntegramente en la memoria local de tu navegador. Tu información financiera permanece 100% privada.",
      },
    ],
    run: excelToPdf,
  },
  {
    slug: "reordenar-paginas-pdf",
    name: "Reordenar páginas",
    h1: "Reordenar páginas de un PDF",
    tagline: "Cambia el orden de las páginas arrastrando y soltando visualmente.",
    seoTitle: "Reordenar páginas de un PDF online gratis | BreadPDF",
    seoDescription:
      "Cambia el orden de las páginas de tu documento PDF fácilmente con vista previa visual. Arrastra las hojas a la posición deseada y descarga el resultado.",
    category: "organizar",
    icon: "ArrowUpDown",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Guardar nuevo orden",
    keywords: ["reordenar páginas pdf", "cambiar orden páginas pdf", "mover hojas pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Arrastra las miniaturas de las páginas para colocarlas en el orden exacto que desees.",
      "Haz clic en 'Guardar nuevo orden' y descarga tu documento reorganizado.",
    ],
    faq: [
      {
        q: "¿Cómo cambio el orden de las páginas?",
        a: "Al cargar el documento verás una cuadrícula interactiva con las miniaturas de todas las hojas. Solo tienes que hacer clic sobre una página y arrastrarla a su nueva posición.",
      },
      {
        q: "¿Se pierde calidad visual o texto seleccionable al reordenar?",
        a: "No. Las páginas se reordenan de forma nativa a nivel vectorial manteniendo las fuentes, capas y nitidez idénticas al archivo original.",
      },
      {
        q: "¿Puedo eliminar o rotar páginas mientras las reordeno?",
        a: "Sí. En el espacio de trabajo dispones de controles para girar o descartar páginas concretas antes de exportar el PDF con la secuencia final.",
      },
      {
        q: "¿Mis documentos se envían a algún servidor para reordenarlos?",
        a: "No. La reordenación se ejecuta al 100% de forma local en tu navegador mediante WebAssembly. Tu información permanece privada en tu dispositivo.",
      },
      {
        q: "¿Hay límite de páginas para reorganizar?",
        a: "No hay un límite artificial. Puedes procesar documentos de decenas de páginas según la memoria de tu navegador.",
      },
    ],
    options: [
      {
        key: "order",
        type: "text",
        label: "Secuencia de páginas",
        help: "Orden de páginas resultante (ejemplo: 3, 1, 2)",
        default: "",
        placeholder: "1, 2, 3...",
      },
    ],
    run: reorderPdf,
  },
  {
    slug: "aplanar-pdf",
    name: "Aplanar PDF",
    h1: "Aplanar PDF y consolidar formularios",
    tagline: "Convierte campos interactivos y formularios en contenido estático fijo.",
    seoTitle: "Aplanar PDF online y bloquear formularios | BreadPDF",
    seoDescription:
      "Consolida formularios interactivos y anotaciones en contenido gráfico no editable. Protege tus datos completados antes de compartir o presentar documentos.",
    category: "optimizar",
    icon: "Layers",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Aplanar PDF",
    keywords: ["aplanar pdf", "flatten pdf", "bloquear formulario pdf", "pdf no editable"],
    howItWorks: [
      "Sube el PDF que contiene campos de formulario o elementos interactivos.",
      "El motor de procesamiento consolida los campos y valores en texto y gráficos fijos.",
      "Descarga tu PDF aplanado, listo para presentar en sedes electrónicas o imprimir.",
    ],
    faq: [
      {
        q: "¿Qué significa exactamente aplanar un PDF?",
        a: "Aplanar (o 'flatten') consolida los campos editables de formularios (AcroForms), cajas de texto y casillas de verificación en gráficos permanentes del documento, impidiendo que los valores se alteren o borren.",
      },
      {
        q: "¿Se puede volver a editar un formulario después de aplanarlo?",
        a: "No. Una vez aplanado, los campos dejan de ser interactivos y se convierten en contenido estático no editable, asegurando que nadie pueda modificar los datos introducidos.",
      },
      {
        q: "¿El texto sigue siendo legible y seleccionable?",
        a: "Sí. Las apariencias de los textos completados se conservan con la máxima fidelidad tipográfica dentro del flujo de la página.",
      },
      {
        q: "¿Aplanar reduce el tamaño del archivo?",
        a: "En documentos con estructuras complejas de formularios interactivos puede reducir ligeramente el peso al eliminar metadatos y diccionarios dinámicos del formulario.",
      },
      {
        q: "¿Mis datos introducidos viajan a algún servidor?",
        a: "No. La consolidación del formulario ocurre de manera íntegramente local en la memoria de tu navegador.",
      },
    ],
    run: flattenPdf,
  },
  {
    slug: "eliminar-metadatos-pdf",
    name: "Eliminar metadatos",
    h1: "Eliminar metadatos ocultos de un PDF",
    tagline: "Limpia información oculta: autor, software, fechas y propiedades.",
    seoTitle: "Eliminar metadatos de PDF online y limpiar propiedades | BreadPDF",
    seoDescription:
      "Elimina información confidencial oculta en tu PDF como autor, software creador, fechas de modificación y propiedades personales de forma 100% privada.",
    category: "optimizar",
    icon: "FileX2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Limpiar metadatos",
    keywords: ["eliminar metadatos pdf", "limpiar propiedades pdf", "quitar autor pdf"],
    howItWorks: [
      "Selecciona el PDF que deseas limpiar.",
      "El sistema purga los campos de autor, título, asunto, software creador y fechas.",
      "Descarga una copia saneada sin rastro de tus datos personales o de tu equipo.",
    ],
    faq: [
      {
        q: "¿Qué metadatos se eliminan del documento?",
        a: "Se eliminan los campos del diccionario de información estándar: Título, Autor, Asunto, Palabras clave, Creador, Productor y Fechas de creación y modificación.",
      },
      {
        q: "¿Afecta este proceso al contenido visual o texto de las páginas?",
        a: "En absoluto. El texto, imágenes, tablas y diagramas visibles de las páginas permanecen exactamente iguales. Solo se purga la información oculta del archivo.",
      },
      {
        q: "¿Por qué es importante limpiar los metadatos antes de compartir un PDF?",
        a: "Los metadatos pueden revelar tu nombre completo, nombres de usuarios de tu ordenador, programas utilizados y la fecha exacta en la que se trabajó el documento.",
      },
      {
        q: "¿Se envían mis archivos a un servidor para eliminar los metadatos?",
        a: "No. La lectura y reescritura de la cabecera del PDF se lleva a cabo en tu propio navegador sin conexiones remotas.",
      },
      {
        q: "¿Es lo mismo eliminar metadatos que censurar un PDF?",
        a: "No. 'Eliminar metadatos' retira información invisible de las propiedades del archivo. 'Censurar PDF' borra y cubre de forma permanente fragmentos de texto o imágenes visibles en las páginas.",
      },
    ],
    run: removeMetadataPdf,
  },
  {
    slug: "pdf-a-png",
    name: "PDF a PNG",
    h1: "Convertir PDF a imágenes PNG",
    tagline: "Convierte páginas de PDF en imágenes PNG de alta resolución sin pérdidas.",
    seoTitle: "Convertir PDF a PNG online gratis en alta calidad | BreadPDF",
    seoDescription:
      "Transforma cada página de tu documento PDF en imágenes PNG nítidas sin artefactos de compresión. Rápido, seguro y procesado localmente en tu navegador.",
    category: "convertir",
    icon: "FileImage",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PNG",
    keywords: ["pdf a png", "convertir pdf a png", "extraer imagenes png pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Selecciona la resolución o escala deseada.",
      "Descarga tus páginas en formato PNG con la máxima nitidez.",
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre PDF a PNG y PDF a JPG?",
        a: "PNG es un formato sin pérdidas ('lossless') que ofrece bordes de texto perfectos y mayor definición gráfica sin los artefactos de compresión típicos de JPG.",
      },
      {
        q: "¿Cómo se descargan los documentos con varias páginas?",
        a: "Cada página se procesa como un archivo PNG numerado de forma correlativa listo para guardar en tu dispositivo.",
      },
      {
        q: "¿Puedo elegir la resolución de salida?",
        a: "Sí. Puedes seleccionar entre resolución estándar (1x) o alta resolución (2x) según si necesitas la imagen para web o para impresión.",
      },
      {
        q: "¿El fondo de la página se mantiene blanco?",
        a: "Sí, las páginas PDF se renderizan sobre un fondo blanco sólido para garantizar que el contenido sea legible universalmente en cualquier visor.",
      },
      {
        q: "¿Se sube mi PDF a algún servidor?",
        a: "No. La renderización se realiza íntegramente en el motor Canvas de tu propio navegador sin enviar datos a servidores externos.",
      },
    ],
    options: [
      {
        key: "scale",
        type: "select",
        label: "Resolución de imagen",
        default: "2",
        options: [
          { value: "1", label: "Estándar (72-96 DPI) — Ligero" },
          { value: "2", label: "Alta definición (150-200 DPI) — Recomendado" },
          { value: "3", label: "Máxima nitidez (300 DPI) — Impresión" },
        ],
      },
    ],
    run: pdfToPng,
  },
  {
    slug: "png-a-pdf",
    name: "PNG a PDF",
    h1: "Convertir imágenes PNG a documento PDF",
    tagline: "Une imágenes PNG y capturas en un único documento PDF maquetado.",
    seoTitle: "Convertir PNG a PDF online gratis y en orden | BreadPDF",
    seoDescription:
      "Combina una o varias imágenes PNG en un único PDF. Ajusta a formato A4 o mantén las dimensiones originales de tus gráficos con total privacidad.",
    category: "convertir",
    icon: "Image",
    status: "live",
    accept: "image/png,image/*,.png",
    multiple: true,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["png a pdf", "convertir png a pdf", "unir png en pdf"],
    howItWorks: [
      "Selecciona una o varias imágenes PNG de tu dispositivo.",
      "Elige si prefieres encajarlas en hoja A4 con márgenes o conservar el tamaño original.",
      "Descarga tu documento PDF unificado de inmediato.",
    ],
    faq: [
      {
        q: "¿Puedo subir varias imágenes PNG a la vez?",
        a: "Sí. Puedes seleccionar múltiples archivos PNG y se ordenarán en páginas consecutivas dentro del mismo documento PDF.",
      },
      {
        q: "¿Se conservan las transparencias de los archivos PNG?",
        a: "Sí. El motor de BreadPDF incrusta las imágenes PNG directamente en el PDF respetando su canal alfa y calidad original sin convertirlas forzosamente a JPEG.",
      },
      {
        q: "¿Qué opciones de tamaño de página están disponibles?",
        a: "Puedes elegir 'Ajustar a A4' (con márgenes uniformes) o 'Tamaño original de imagen' para que cada página tenga exactamente los píxeles de la imagen de origen.",
      },
      {
        q: "¿Hay límite en la cantidad de imágenes?",
        a: "Puedes combinar decenas de imágenes siempre que la memoria disponible en tu navegador lo permita.",
      },
      {
        q: "¿Se envían mis fotos o capturas a servidores externos?",
        a: "No. Toda la composición del PDF se realiza localmente en tu equipo sin transferencia a la nube.",
      },
    ],
    options: [
      {
        key: "pageSize",
        type: "select",
        label: "Tamaño de página",
        default: "a4",
        options: [
          { value: "a4", label: "Ajustar a hoja A4 (con márgenes)" },
          { value: "fit", label: "Tamaño original de cada imagen" },
        ],
      },
    ],
    run: pngToPdf,
  },
  {
    slug: "redimensionar-pdf",
    name: "Ajustar tamaño de página",
    h1: "Ajustar tamaño de página y normalizar PDF a A4",
    tagline: "Estandariza las dimensiones de tu PDF a A4, Carta u Oficio.",
    seoTitle: "Ajustar tamaño de página de PDF online a A4 | BreadPDF",
    seoDescription:
      "Normaliza documentos con páginas heterogéneas o adapta formatos de impresión a estándar A4, Carta o Legal, manteniendo proporciones sin distorsión.",
    category: "optimizar",
    icon: "Maximize2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Ajustar tamaño",
    keywords: ["ajustar tamaño pdf", "cambiar tamaño pagina pdf", "pasar pdf a a4"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Elige el formato de página objetivo (A4, Carta, Legal o A3).",
      "Descarga tu documento normalizado con páginas centradas y escaladas proporcionalmente.",
    ],
    faq: [
      {
        q: "¿Cómo se adapta el contenido al nuevo tamaño de página?",
        a: "El contenido de cada página se escala proporcionalmente y se centra dentro de la nueva hoja, asegurando que no se corte ningún elemento y que no se distorsione la relación de aspecto.",
      },
      {
        q: "¿Qué ocurre con las páginas horizontales (apaisadas)?",
        a: "El sistema detecta automáticamente la orientación de cada hoja. Si la página original es apaisada, la hoja de destino se orientará horizontalmente respetando el formato.",
      },
      {
        q: "¿Qué tamaños de página estándar están disponibles?",
        a: "Puedes normalizar a A4 (210 × 297 mm), Carta / US Letter (216 × 279 mm), Oficio / Legal (216 × 356 mm) y A3 (297 × 420 mm).",
      },
      {
        q: "¿Se altera la calidad del texto al redimensionar?",
        a: "No. El contenido vectorial, las fuentes y los gráficos se preservan con precisión matemática en las nuevas dimensiones.",
      },
      {
        q: "¿Mis archivos se procesan de forma privada?",
        a: "Sí. Toda la reestructuración dimensional se efectúa en la memoria local de tu navegador sin enviarse a servidores.",
      },
    ],
    options: [
      {
        key: "size",
        type: "select",
        label: "Tamaño objetivo",
        default: "a4",
        options: [
          { value: "a4", label: "A4 (210 × 297 mm) — Estándar europeo / internacional" },
          { value: "letter", label: "Carta / US Letter (216 × 279 mm) — Estándar americano" },
          { value: "legal", label: "Oficio / Legal (216 × 356 mm) — Documentos legales" },
          { value: "a3", label: "A3 (297 × 420 mm) — Gran formato / planos" },
        ],
      },
    ],
    run: resizePdf,
  },
  {
    slug: "editar-metadatos-pdf",
    name: "Editar metadatos PDF",
    h1: "Editar metadatos de un PDF",
    tagline: "Modifica título, autor, asunto y palabras clave directamente en tu navegador.",
    seoTitle: "Editar metadatos de PDF online gratis | BreadPDF",
    seoDescription:
      "Cambia las propiedades y metadatos de tu PDF (título, autor, asunto y palabras clave) de forma 100% privada sin subir archivos a servidores.",
    category: "editar",
    icon: "FileEdit",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Guardar metadatos",
    keywords: ["editar metadatos pdf", "cambiar autor pdf", "modificar titulo pdf", "propiedades pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Introduce o modifica el título, autor, asunto y palabras clave.",
      "Haz clic en Guardar metadatos para descargar el PDF actualizado.",
    ],
    faq: [
      {
        q: "¿Qué metadatos se pueden editar?",
        a: "Puedes modificar los campos del diccionario estándar de información: Título, Autor, Asunto y Palabras clave.",
      },
      {
        q: "¿Para qué situaciones es útil editar los metadatos de un PDF?",
        a: "Es útil para corregir el autor en documentos generados automáticamente con el nombre de la licencia de software, para actualizar el título de un informe antes de distribuirlo, para añadir palabras clave que faciliten la búsqueda en sistemas de gestión documental, o para homogeneizar la información de metadatos en archivos corporativos.",
      },
      {
        q: "¿Se altera el contenido visual o las páginas del documento?",
        a: "No. El contenido visual, fuentes, imágenes y textos permanecen intactos. Solo se actualizan las propiedades del documento.",
      },
      {
        q: "¿En qué se diferencia de 'Eliminar metadatos'?",
        a: "'Editar metadatos' te permite escribir valores nuevos y correctos en los campos de título, autor, asunto y palabras clave. 'Eliminar metadatos' borra todos esos campos dejándolos vacíos, lo que es más útil cuando quieres compartir un documento sin revelar ninguna información de autoría.",
      },
      {
        q: "¿Se sube mi archivo a algún servidor externo?",
        a: "No. La lectura y modificación del archivo se ejecuta 100% en la memoria de tu navegador con total privacidad.",
      },
    ],
    options: [
      {
        key: "title",
        type: "text",
        label: "Título del documento",
        placeholder: "Ej. Informe Anual 2026",
        default: "",
      },
      {
        key: "author",
        type: "text",
        label: "Autor",
        placeholder: "Ej. Nombre o Empresa",
        default: "",
      },
      {
        key: "subject",
        type: "text",
        label: "Asunto / Tema",
        placeholder: "Ej. Resumen financiero trimestral",
        default: "",
      },
      {
        key: "keywords",
        type: "text",
        label: "Palabras clave (separadas por comas)",
        placeholder: "finanzas, informe, balance",
        default: "",
      },
    ],
    run: editMetadataPdf,
  },
  {
    slug: "anadir-texto-pdf",
    name: "Añadir texto al PDF",
    h1: "Añadir texto a un documento PDF",
    tagline: "Inserta textos, notas o anotaciones tipográficas en la posición y página que elijas.",
    seoTitle: "Añadir texto a PDF online gratis | BreadPDF",
    seoDescription:
      "Escribe y añade texto a cualquier página de tu PDF con control de tamaño, color y posición. 100% en tu navegador y sin registro.",
    category: "editar",
    icon: "Type",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Insertar texto y descargar",
    keywords: ["añadir texto pdf", "escribir en pdf", "insertar texto pdf", "poner texto pdf"],
    howItWorks: [
      "Sube tu archivo PDF.",
      "Escribe el texto, ajusta la posición horizontal y vertical, tamaño y color.",
      "Previsualiza los cambios y descarga tu PDF con el texto insertado.",
    ],
    faq: [
      {
        q: "¿Puedo añadir texto a páginas específicas o a todo el documento?",
        a: "Sí. Puedes elegir aplicar el texto a todas las páginas, a la primera página, a la última o a páginas seleccionadas.",
      },
      {
        q: "¿Puedo cambiar el tamaño y el color del texto añadido?",
        a: "Sí. Tienes controles deslizantes para el tamaño tipográfico, posición en porcentaje sobre la página y selector de color.",
      },
      {
        q: "¿Para qué situaciones es útil añadir texto a un PDF?",
        a: "Es ideal para estampar una fecha de recepción, añadir un número de referencia o expediente en documentos que no incluyen ese campo, insertar la nota 'BORRADOR', 'CONFIDENCIAL' o 'COPIA' sobre páginas de un informe, o completar manualmente un campo que quedó en blanco en un formulario fijo.",
      },
      {
        q: "¿Cuándo debo usar 'Añadir texto' y cuándo 'Rellenar formulario PDF'?",
        a: "Usa 'Rellenar formulario PDF' si el documento tiene campos AcroForm interactivos (cuadros de texto, casillas, desplegables que se activan al hacer clic). Usa 'Añadir texto' si el PDF no tiene campos interactivos y quieres superponer texto libre en cualquier posición de la página.",
      },
      {
        q: "¿El texto añadido queda integrado en el documento final?",
        a: "Sí. El texto se incrusta vectorialmente en el archivo PDF descargable manteniendo nitidez absoluta al imprimir o visualizar.",
      },
      {
        q: "¿Es seguro procesar documentos confidenciales?",
        a: "Totalmente. El procesamiento se ejecuta en el navegador de tu dispositivo sin comunicarse con servidores externos.",
      },
    ],
    options: [
      {
        key: "text",
        type: "text",
        label: "Texto a insertar",
        placeholder: "Escribe aquí el texto...",
        default: "Texto de ejemplo",
      },
      {
        key: "fontSize",
        type: "range",
        label: "Tamaño de fuente",
        default: 18,
        min: 10,
        max: 60,
        step: 1,
        unit: "pt",
      },
      {
        key: "xPercent",
        type: "range",
        label: "Posición horizontal (%)",
        default: 50,
        min: 5,
        max: 95,
        step: 1,
        unit: "%",
      },
      {
        key: "yPercent",
        type: "range",
        label: "Posición vertical (%)",
        default: 25,
        min: 5,
        max: 95,
        step: 1,
        unit: "%",
      },
    ],
    run: addTextPdf,
  },
  {
    slug: "insertar-paginas-pdf",
    name: "Insertar páginas en PDF",
    h1: "Insertar páginas de otro PDF en un documento",
    tagline: "Añade páginas de un segundo PDF en una posición exacta dentro del archivo base.",
    seoTitle: "Insertar páginas en PDF online gratis y en posición exacta | BreadPDF",
    seoDescription:
      "Inserta páginas procedentes de otro PDF al inicio, al final o entre páginas concretas de tu documento de forma visual y 100% privada.",
    category: "organizar",
    icon: "FilePlus2",
    status: "live",
    accept: "application/pdf",
    multiple: true,
    minFiles: 2,
    ctaLabel: "Insertar páginas y descargar",
    keywords: ["insertar paginas pdf", "añadir paginas a pdf", "intercalar paginas pdf", "pegar paginas en pdf"],
    howItWorks: [
      "Sube el documento PDF base (el primero) y el archivo con las páginas que deseas insertar (el segundo).",
      "Elige la posición de inserción: al principio, tras la primera página o al final del documento.",
      "Previsualiza el orden resultante y descarga el PDF final con las páginas integradas.",
    ],
    faq: [
      {
        q: "¿En qué se diferencia esta herramienta de 'Unir PDF'?",
        a: "Unir PDF concatena documentos completos uno detrás de otro de forma secuencial. 'Insertar páginas' permite colocar las páginas de un segundo PDF en una posición específica intermedia o inicial dentro del archivo base.",
      },
      {
        q: "¿Puedo insertar un archivo de varias páginas de una sola vez?",
        a: "Sí. Si el segundo documento tiene 3 páginas, las 3 páginas se incrustarán consecutivamente en la posición que hayas designado.",
      },
      {
        q: "¿Se conservan los enlaces y la nitidez original de ambos archivos?",
        a: "Sí. Las páginas se copian fielmente respetando los árboles vectoriales, fuentes tipográficas e imágenes embebidas.",
      },
      {
        q: "¿Es necesario registrarse o crear una cuenta?",
        a: "No. Puedes usar la herramienta de forma inmediata y anónima sin límites de uso ni suscripciones.",
      },
      {
        q: "¿Mis documentos se transfieren por internet?",
        a: "No. La combinación e inserción de páginas ocurre estrictamente en el motor WebAssembly de tu navegador sin subidas a servidores.",
      },
    ],
    options: [
      {
        key: "position",
        type: "select",
        label: "Posición de inserción",
        default: "end",
        options: [
          { value: "end", label: "Al final del documento base" },
          { value: "start", label: "Al principio (página 1)" },
          { value: "after-first", label: "Después de la portada (página 2)" },
        ],
      },
    ],
    run: insertPagesPdf,
  },
  {
    slug: "optimizar-pdf-para-impresion",
    name: "Optimizar PDF para impresión",
    h1: "Optimizar PDF para impresión y escala de grises",
    tagline: "Convierte tu PDF a escala de grises para ahorrar tóner y agilizar la impresión.",
    seoTitle: "Optimizar PDF para impresión online gratis a escala de grises | BreadPDF",
    seoDescription:
      "Transforma tu PDF a escala de grises real para imprimir sin gastar tinta de color. Proceso nítido, privado y sin subir archivos a servidores.",
    category: "optimizar",
    icon: "Printer",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Optimizar para impresión",
    keywords: ["optimizar pdf para impresion", "pdf escala de grises", "imprimir pdf monocromo", "ahorrar toner pdf"],
    howItWorks: [
      "Selecciona el PDF que vas a enviar a imprimir.",
      "Elige el nivel de resolución objetivo (estándar para lectura o alta definición para gráficos detallados).",
      "Descarga el documento optimizado en escala de grises listo para tu impresora.",
    ],
    faq: [
      {
        q: "¿Por qué convertir un PDF a escala de grises antes de imprimir?",
        a: "Muchas impresoras láser o de inyección combinan tintas de color para simular negros o grises si el archivo contiene elementos RGB/CMYK. Al normalizar a escala de grises se garantiza el uso exclusivo del cartucho negro, reduciendo costes de impresión.",
      },
      {
        q: "¿Cómo se realiza técnicamente la conversión a blanco y negro / grises?",
        a: "Cada página se renderiza a alta resolución (150-200 DPI) calculando la luminancia perceptiva de cada píxel (Rec. 709 / sRGB) y se reconstruye un nuevo PDF monocromo nítido.",
      },
      {
        q: "¿Afecta la legibilidad del texto en letra pequeña?",
        a: "No. El renderizado en alta resolución asegura que el texto conserve sus contrastes y bordes limpios tanto en pantalla como en papel físico.",
      },
      {
        q: "¿El tamaño del archivo se reduce?",
        a: "En documentos con fotografías en color o fondos pesados suele reducirse significativamente al descartar la información cromática de tres canales.",
      },
      {
        q: "¿Se conservan las páginas con confidencialidad?",
        a: "Sí. Toda la conversión se procesa localmente en tu ordenador mediante tecnologías web de cliente, sin transferir páginas a ningún servidor externo.",
      },
    ],
    options: [
      {
        key: "dpi",
        type: "select",
        label: "Calidad de renderizado para impresión",
        default: "2",
        options: [
          { value: "2", label: "Alta definición (~150-200 DPI) — Recomendado" },
          { value: "1", label: "Borrador rápido (~96 DPI) — Archivo más ligero" },
        ],
      },
    ],
    run: optimizePdfForPrint,
  },
  {
    slug: "webp-a-pdf",
    name: "WebP a PDF",
    h1: "Convertir imágenes WebP a PDF online",
    tagline: "Convierte imágenes WebP en un PDF unificado de alta fidelidad.",
    seoTitle: "Convertir WebP a PDF online gratis y en orden | BreadPDF",
    seoDescription:
      "Transforma una o varias imágenes WebP en un único archivo PDF sin pérdida de calidad. Rápido, privado en tu navegador y sin subir archivos a servidores.",
    category: "convertir",
    icon: "Image",
    status: "live",
    accept: "image/webp,image/*,.webp",
    multiple: true,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["webp a pdf", "convertir webp a pdf", "pasar imagenes webp a pdf", "unir webp en pdf"],
    howItWorks: [
      "Selecciona una o varias imágenes WebP de tu dispositivo.",
      "Elige si prefieres encajar las imágenes en hoja estándar A4 con márgenes o conservar el tamaño original.",
      "Descarga tu documento PDF resultante de inmediato.",
    ],
    faq: [
      {
        q: "¿Puedo convertir varias imágenes WebP en un único documento PDF?",
        a: "Sí. Puedes seleccionar múltiples archivos WebP simultáneamente y se ordenarán en páginas consecutivas dentro del mismo documento PDF.",
      },
      {
        q: "¿Se pierde calidad visual al convertir de WebP a PDF?",
        a: "No. El motor decodifica los píxeles originales en el navegador y los incrusta en el PDF con resolución completa sin artefactos de recomprobación innecesarios.",
      },
      {
        q: "¿Qué tamaños de página están disponibles?",
        a: "Puedes elegir 'Ajustar a hoja A4' (con márgenes proporcionales) o 'Tamaño original de cada imagen' para adaptar cada página a las dimensiones exactas de la foto.",
      },
      {
        q: "¿Se pueden reordenar las imágenes antes de exportar?",
        a: "Sí. Puedes organizar el orden de las páginas directamente desde el panel de carga antes de generar el PDF final.",
      },
      {
        q: "¿Mis imágenes WebP se suben a la nube?",
        a: "No. Todo el proceso de decodificación y empaquetado del PDF ocurre 100% en la memoria de tu dispositivo mediante JavaScript y Canvas en cliente.",
      },
    ],
    options: [
      {
        key: "pageSize",
        type: "select",
        label: "Tamaño de página",
        default: "a4",
        options: [
          { value: "a4", label: "Ajustar a hoja A4 (con márgenes)" },
          { value: "fit", label: "Tamaño original de cada imagen" },
        ],
      },
    ],
    run: webpToPdf,
  },
  {
    slug: "markdown-a-pdf",
    name: "Markdown a PDF",
    h1: "Convertir Markdown a PDF online",
    tagline: "Convierte archivos Markdown (.md) en documentos PDF limpios y estructurados.",
    seoTitle: "Convertir Markdown a PDF online gratis y limpio | BreadPDF",
    seoDescription:
      "Transforma tus notas y documentos Markdown (.md) en PDF elegantes con títulos, párrafos, listas, citas y bloques de código maquetados al instante.",
    category: "convertir",
    icon: "FileCode",
    status: "live",
    accept: "text/markdown,text/plain,.md,.markdown",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["markdown a pdf", "convertir md a pdf", "exportar markdown a pdf", "documento md a pdf"],
    howItWorks: [
      "Sube tu archivo Markdown (.md o .markdown).",
      "El motor analiza y pagina la jerarquía de encabezados, listas y bloques de texto.",
      "Descarga tu documento PDF estructurado y listo para imprimir o compartir.",
    ],
    faq: [
      {
        q: "¿Qué elementos de sintaxis Markdown son compatibles?",
        a: "La herramienta procesa encabezados (#, ##, ###), párrafos, negritas (**), citas en bloque (>), listas con viñetas (* o -), listas numeradas y bloques de código cercados con tipografía monoespaciada.",
      },
      {
        q: "¿Cómo se gestiona el salto de página en documentos extensos?",
        a: "El conversor calcula automáticamente los márgenes y la altura vertical disponible, distribuyendo el contenido en hojas A4 con saltos limpios y proporcionales.",
      },
      {
        q: "¿Es adecuado para exportar respuestas de IA como ChatGPT o Claude?",
        a: "Sí. Es el flujo perfecto para convertir respuestas, prompts y documentación exportada en Markdown desde modelos de IA o aplicaciones como Notion y Obsidian.",
      },
      {
        q: "¿Se conservan los bloques de código formateados?",
        a: "Sí. Los fragmentos de código delimitados por tres acentos graves (```) se renderizan en una caja con fondo sombreado y fuente Courier monoespaciada.",
      },
      {
        q: "¿Se envían mis notas o textos a servidores externos?",
        a: "No. El análisis y la generación tipográfica del PDF se realizan en tu navegador con total confidencialidad.",
      },
    ],
    run: markdownToPdf,
  },
  {
    slug: "powerpoint-a-pdf",
    name: "PowerPoint a PDF",
    h1: "Convertir PowerPoint a PDF online",
    tagline: "Convierte presentaciones .pptx en diapositivas PDF en formato panorámico (Vista previa beta).",
    seoTitle: "Convertir PowerPoint a PDF online gratis (.pptx) | BreadPDF",
    seoDescription:
      "Transforma diapositivas de PowerPoint (.pptx) a documento PDF panorámico en tu navegador. Rápido, 100% privado y sin subir archivos a servidores externos.",
    category: "convertir",
    icon: "Presentation",
    status: "live",
    accept:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,.pptx,.ppt",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["powerpoint a pdf", "convertir pptx a pdf", "pasar powerpoint a pdf", "diapositivas a pdf"],
    howItWorks: [
      "Sube tu archivo de presentación PowerPoint (.pptx).",
      "El motor en el navegador analiza diapositivas, textos y títulos.",
      "Descarga tu documento PDF estructurado en formato panorámico 16:9.",
    ],
    faq: [
      {
        q: "¿Qué nivel de fidelidad visual ofrece esta conversión?",
        a: "Esta herramienta funciona en fase beta y utiliza un analizador client-side en tu navegador. Extrae textos, títulos, párrafos y estructura de diapositivas en páginas panorámicas 16:9 con tipografías universales. No reproduce animaciones ni maquetaciones con SmartArt complejas de Microsoft Office.",
      },
      {
        q: "¿Qué versiones de PowerPoint son compatibles?",
        a: "Es compatible con presentaciones modernas en formato .pptx (PowerPoint 2007 en adelante). Para archivos antiguos con extensión .ppt binaria, se recomienda guardarlos previamente como .pptx.",
      },
      {
        q: "¿Se conservan las diapositivas en formato panorámico o A4?",
        a: "El documento PDF se genera de forma nativa en proporción panorámica estándar 16:9 (960 × 540 pt), ideal para proyectar en pantallas o visualizar en tablets y ordenadores.",
      },
      {
        q: "¿Por qué se presenta como versión Beta / Vista previa?",
        a: "Porque la especificación OpenXML de PowerPoint contiene cientos de tipos de formas propietarias. Para garantizar una experiencia transparente y rigurosa, documentamos con honestidad que la conversión es estructural y tipográfica, sin prometer fidelidad gráfica al 100%.",
      },
      {
        q: "¿Se sube mi presentación a algún servidor externo?",
        a: "No. La lectura del archivo ZIP interno del .pptx y la composición del PDF se ejecutan íntegramente de manera local en tu navegador con total privacidad.",
      },
    ],
    run: powerpointToPdf,
  },
  {
    slug: "svg-a-pdf",
    name: "SVG a PDF",
    h1: "Convertir archivos SVG a PDF online",
    tagline: "Transforma gráficos vectoriales SVG en documentos PDF nítidos en alta definición.",
    seoTitle: "Convertir SVG a PDF online gratis en alta definición | BreadPDF",
    seoDescription:
      "Convierte archivos vectoriales SVG a documentos PDF conservando curvas, trazados y proporciones visuales nítidas en tu navegador con total privacidad.",
    category: "convertir",
    icon: "FileCode",
    status: "live",
    accept: "image/svg+xml,.svg",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Convertir a PDF",
    keywords: ["svg a pdf", "convertir svg a pdf", "vector a pdf", "pasar svg a pdf"],
    howItWorks: [
      "Sube tu archivo gráfico vectorial (.svg).",
      "Elige si prefieres encajar en hoja A4 estándar o en el tamaño exacto del lienzo (viewBox).",
      "Descarga tu documento PDF renderizado con la máxima nitidez.",
    ],
    faq: [
      {
        q: "¿Cómo se procesa técnicamente la conversión de SVG a PDF?",
        a: "La herramienta interpreta el marcado XML del SVG y sus proporciones nativas de viewBox, renderizando el contenido a alta definición (2.5x escala hipernítida) e incrustándolo de forma limpia y proporcional en un documento PDF estándar.",
      },
      {
        q: "¿Se adapta a hojas verticales u horizontales?",
        a: "Sí. Si seleccionas el modo de página A4, el sistema detecta la relación de aspecto del gráfico e inicializa la página en formato vertical u horizontal según la orientación natural del SVG.",
      },
      {
        q: "¿Puedo mantener las dimensiones exactas del gráfico original?",
        a: "Sí. Al elegir 'Tamaño original (viewBox)', la página del PDF adoptará exactamente los puntos de ancho y alto definidos en la caja de coordenadas de tu archivo SVG.",
      },
      {
        q: "¿Se conservan colores y degradados?",
        a: "Sí. El motor de dibujo del navegador interpreta la totalidad de los estilos CSS, rellenos, trazos y degradados estándar soportados en la especificación SVG.",
      },
      {
        q: "¿Se sube mi archivo vectorial a algún servidor externo?",
        a: "No. La lectura, el renderizado de píxeles y el empaquetado del documento PDF ocurren 100% de manera local y privada en la memoria de tu dispositivo.",
      },
    ],
    options: [
      {
        key: "pageSize",
        type: "select",
        label: "Tamaño de página",
        default: "a4",
        options: [
          { value: "a4", label: "Ajustar a hoja A4 (con márgenes limpios)" },
          { value: "viewbox", label: "Tamaño original del gráfico (viewBox)" },
        ],
      },
    ],
    run: svgToPdf,
  },

  // ─── EXTRAER IMÁGENES DE PDF ────────────────────────────────────────────────
  {
    slug: "extraer-imagenes-pdf",
    name: "Extraer imágenes de PDF",
    h1: "Extraer imágenes embebidas de un PDF",
    tagline: "Obtén las fotografías e imágenes incrustadas en tu PDF como archivos PNG independientes.",
    seoTitle: "Extraer imágenes de PDF online gratis | BreadPDF",
    seoDescription:
      "Extrae las imágenes embebidas en tu documento PDF como archivos PNG individuales directamente en tu navegador, sin subir nada a ningún servidor.",
    category: "organizar",
    icon: "ImageDown",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Extraer imágenes",
    keywords: ["extraer imágenes pdf", "sacar fotos pdf", "obtener imágenes pdf", "pdf a imágenes"],
    howItWorks: [
      "Sube el PDF del que quieres extraer imágenes.",
      "El motor analiza cada página en busca de objetos de imagen XObject embebidos.",
      "Descarga las imágenes individuales en PNG o como ZIP si hay varias.",
    ],
    faq: [
      {
        q: "¿Qué tipo de imágenes extrae esta herramienta?",
        a: "Extrae imágenes rasterizadas incrustadas como objetos XObject en el PDF: fotografías JPEG embebidas, PNG embebidos o imágenes en color RGBA. No extrae elementos vectoriales como gráficos SVG ni texto formateado.",
      },
      {
        q: "¿Por qué no aparece ninguna imagen en mi PDF?",
        a: "Algunos PDFs solo contienen texto y vectores sin imágenes rasterizadas embebidas. También puede ocurrir que las imágenes estén en un formato interno no estándar que el extractor no pueda recuperar como objeto independiente.",
      },
      {
        q: "¿En qué formato se descargan las imágenes?",
        a: "Las imágenes se exportan en formato PNG con la resolución original del objeto embebido. Si hay más de una imagen, se empaquetan automáticamente en un archivo ZIP.",
      },
      {
        q: "¿Hay diferencia entre 'Extraer imágenes' y 'PDF a PNG'?",
        a: "Sí. 'PDF a PNG' convierte cada página completa del PDF en una imagen de pantalla, incluyendo texto y vectores. 'Extraer imágenes' recupera exclusivamente los objetos de imagen embebidos dentro del PDF, que pueden ser fotografías individuales distintas al contenido general de la página.",
      },
      {
        q: "¿Se sube el PDF a algún servidor externo?",
        a: "No. El análisis del documento y la extracción de imágenes se realizan completamente en la memoria de tu navegador mediante pdf.js. Ningún dato abandona tu dispositivo.",
      },
    ],
    run: extractImagesPdf,
  },

  // ─── DIVIDIR PDF POR TAMAÑO EN MB ──────────────────────────────────────────
  {
    slug: "dividir-pdf-por-tamano",
    name: "Dividir PDF por tamaño",
    h1: "Dividir un PDF en partes por tamaño máximo en MB",
    tagline: "Fragmenta documentos grandes respetando un límite de peso por parte, ideal para correo, Moodle o sedes electrónicas.",
    seoTitle: "Dividir PDF por tamaño en MB online gratis | BreadPDF",
    seoDescription:
      "Divide un PDF grande en fragmentos con un límite de tamaño en MB por parte. Perfecto para adjuntos de correo (25 MB), Moodle (5-10 MB) o LexNET. 100% en tu navegador.",
    category: "organizar",
    icon: "SplitSquareHorizontal",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Dividir por tamaño",
    keywords: ["dividir pdf por tamaño", "partir pdf mb", "fragmentar pdf peso", "dividir pdf email"],
    howItWorks: [
      "Sube el PDF que necesitas fragmentar.",
      "Elige el tamaño máximo aproximado en MB para cada parte.",
      "Descarga las partes numeradas o en ZIP si hay más de tres.",
    ],
    faq: [
      {
        q: "¿El tamaño de cada parte es exacto?",
        a: "Es aproximado. El PDF está compuesto por páginas completas que no pueden fraccionarse por la mitad. El motor calcula cuántas páginas caben en el objetivo de MB y ajusta en consecuencia, pero el resultado real puede variar ligeramente según el contenido de cada página.",
      },
      {
        q: "¿En qué se diferencia de 'Dividir PDF'?",
        a: "'Dividir PDF' divide el documento en rangos de páginas o intervalos específicos que tú defines. 'Dividir PDF por tamaño' divide automáticamente según un peso máximo en MB por fragmento, sin que necesites saber el número exacto de páginas.",
      },
      {
        q: "¿Cuántas partes genera?",
        a: "El número de partes depende del tamaño del archivo original y del límite de MB que definas. No existe un límite artificial de fragmentos; el proceso continúa hasta que todo el documento queda cubierto.",
      },
      {
        q: "¿Se pierde calidad al dividir el PDF?",
        a: "No. Las páginas se copian íntegramente con su contenido vectorial, imágenes y fuentes originales sin ninguna recompresión ni pérdida de fidelidad.",
      },
      {
        q: "¿Mis archivos se suben a algún servidor?",
        a: "No. El proceso de división se realiza en la memoria de tu navegador con pdf-lib. Tus documentos no se transmiten a ningún servidor externo.",
      },
    ],
    options: [
      {
        key: "maxMb",
        type: "range",
        label: "Tamaño máximo aproximado por parte",
        default: 5,
        min: 1,
        max: 50,
        step: 1,
        unit: " MB",
      },
    ],
    run: splitPdfBySize,
  },

  // ─── ELIMINAR PÁGINAS EN BLANCO ─────────────────────────────────────────────
  {
    slug: "eliminar-paginas-en-blanco",
    name: "Eliminar páginas en blanco",
    h1: "Eliminar páginas en blanco de un PDF",
    tagline: "Detecta y elimina automáticamente las páginas vacías de documentos escaneados o formularios.",
    seoTitle: "Eliminar páginas en blanco de PDF online gratis | BreadPDF",
    seoDescription:
      "Detecta y elimina automáticamente las páginas en blanco o vacías de tu PDF. Ideal para documentos escaneados, formularios y reportes. 100% privado.",
    category: "optimizar",
    icon: "FileX2",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Eliminar páginas en blanco",
    keywords: ["eliminar páginas en blanco pdf", "quitar páginas vacías pdf", "borrar páginas blancas pdf"],
    howItWorks: [
      "Sube el PDF con páginas en blanco o casi vacías.",
      "El analizador renderiza cada página en baja resolución y mide el ratio de píxeles blancos.",
      "Las páginas que superan el umbral se eliminan y descargas el PDF resultante.",
    ],
    faq: [
      {
        q: "¿Cómo detecta la herramienta si una página está en blanco?",
        a: "Renderiza cada página en resolución reducida (escala 0.4×) con pdf.js y analiza el porcentaje de píxeles que tienen una luminosidad muy alta (R, G, B > 240). Si ese porcentaje supera el umbral configurado, la página se considera en blanco.",
      },
      {
        q: "¿Puede eliminar páginas con muy poco contenido pero no completamente blancas?",
        a: "Sí. Reduciendo el umbral de sensibilidad puedes hacer que el detector elimine también páginas con contenido muy escaso (sellos sutiles, encabezados tenues). Por defecto el umbral es del 97% de píxeles blancos para ser conservador.",
      },
      {
        q: "¿Puede eliminar páginas que no están realmente vacías?",
        a: "Con el umbral por defecto (97%) el riesgo es muy bajo. Páginas con texto o imágenes visibles raramente superan el 90% de píxeles blancos. Si el documento tiene páginas con fondos muy claros o marcas de agua sutiles, ajusta el umbral o revisa el resultado.",
      },
      {
        q: "¿Funciona con PDFs escaneados?",
        a: "Sí. La detección trabaja sobre el renderizado visual de la página, por lo que funciona tanto con PDFs de texto vectorial como con documentos escaneados en imagen.",
      },
      {
        q: "¿Se sube el PDF a algún servidor?",
        a: "No. Todo el análisis y la eliminación de páginas se realizan localmente en tu navegador sin transmitir ningún dato externo.",
      },
    ],
    options: [
      {
        key: "threshold",
        type: "range",
        label: "Sensibilidad de detección",
        help: "Porcentaje mínimo de píxeles blancos para considerar una página 'en blanco'. Mayor valor = más conservador.",
        default: 97,
        min: 85,
        max: 99,
        step: 1,
        unit: "%",
      },
    ],
    run: removeBlankPagesPdf,
  },

  // ─── IMAGEN A WEBP ──────────────────────────────────────────────────────────
  {
    slug: "imagen-a-webp",
    name: "Imagen a WebP",
    h1: "Convertir imágenes JPG y PNG a WebP",
    tagline: "Reduce el peso de tus imágenes para web convirtiéndolas al formato WebP moderno: mejora el PageSpeed y las Core Web Vitals.",
    seoTitle: "Convertir imagen a WebP online gratis | JPG y PNG | BreadPDF",
    seoDescription:
      "Convierte imágenes JPG y PNG al formato WebP para optimizar su peso y mejorar el rendimiento web. Ideal para Core Web Vitals, PageSpeed Insights y SEO. Privado en tu navegador.",
    category: "optimizar",
    icon: "Zap",
    status: "live",
    accept: "image/jpeg,image/png,image/jpg,.jpg,.jpeg,.png",
    multiple: true,
    minFiles: 1,
    ctaLabel: "Convertir a WebP",
    keywords: ["imagen a webp", "jpg a webp", "png a webp", "convertir webp", "optimizar imagen web"],
    howItWorks: [
      "Sube una o varias imágenes JPG o PNG.",
      "Ajusta el nivel de calidad WebP (mayor calidad = mayor peso).",
      "Descarga las imágenes convertidas o el ZIP si son varias.",
    ],
    faq: [
      {
        q: "¿Qué formatos de imagen acepta esta herramienta?",
        a: "Acepta imágenes en formato JPG/JPEG y PNG. Estos son los dos formatos más comunes en uso web y ambos se convierten con total fidelidad al formato WebP.",
      },
      {
        q: "¿Cuánto se reduce el peso de la imagen?",
        a: "El ahorro depende del contenido de la imagen original y de la calidad elegida. WebP ofrece generalmente mejor compresión que JPG o PNG para el mismo nivel de calidad visual, pero el resultado exacto varía por imagen. Esta herramienta no garantiza una reducción de peso específica.",
      },
      {
        q: "¿Se conserva la transparencia de los PNG al convertir a WebP?",
        a: "Sí. WebP admite canal alfa (transparencia), por lo que imágenes PNG con fondo transparente mantienen esa característica al convertirse.",
      },
      {
        q: "¿Puedo convertir varias imágenes a la vez?",
        a: "Sí. Puedes añadir múltiples archivos JPG y PNG en una sola sesión. Si son varias imágenes, el resultado se empaqueta automáticamente en un archivo ZIP.",
      },
      {
        q: "¿Tiene soporte universal WebP en navegadores y sistemas operativos?",
        a: "Sí. WebP está soportado en todos los navegadores modernos (Chrome, Safari, Firefox, Edge) y en los principales sistemas operativos (Windows, macOS, Android, iOS). Es el formato recomendado para imágenes en web actualmente.",
      },
      {
        q: "¿Los archivos se suben a algún servidor?",
        a: "No. La conversión utiliza exclusivamente la API Canvas del navegador (canvas.toBlob) de forma local. Ninguna imagen abandona tu dispositivo.",
      },
    ],
    options: [
      {
        key: "quality",
        type: "range",
        label: "Calidad WebP",
        help: "Mayor calidad = mayor peso del archivo resultante.",
        default: 85,
        min: 60,
        max: 95,
        step: 5,
        unit: "%",
      },
    ],
    run: imageToWebp,
  },

  // ─── SANEAR / LIMPIAR PDF ───────────────────────────────────────────────────
  {
    slug: "sanear-pdf",
    name: "Sanear PDF",
    h1: "Sanear y limpiar un PDF de elementos no deseados",
    tagline: "Elimina JavaScript embebido, acciones automáticas y metadatos de autor de tus documentos PDF.",
    seoTitle: "Sanear PDF online gratis — eliminar JavaScript y metadatos | BreadPDF",
    seoDescription:
      "Limpia tu PDF eliminando JavaScript embebido, acciones automáticas de apertura y metadatos de autor. Ideal antes de compartir documentos de terceros.",
    category: "seguridad",
    icon: "ShieldOff",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Sanear PDF",
    keywords: ["sanear pdf", "limpiar pdf", "eliminar javascript pdf", "limpiar metadatos pdf", "pdf seguro"],
    howItWorks: [
      "Sube el PDF que quieres sanear.",
      "El motor elimina JavaScript, acciones automáticas y metadatos de autor.",
      "Descarga el PDF limpio listo para compartir.",
    ],
    faq: [
      {
        q: "¿Qué elementos elimina exactamente esta herramienta?",
        a: "Elimina: (1) JavaScript embebido en el catálogo del documento (/JavaScript, /Names con scripts), (2) Acciones automáticas de apertura (/OpenAction, /AA en el catálogo y en páginas individuales), (3) El stream de metadatos XMP (/Metadata), y (4) Los campos del diccionario de información del documento (Autor, Creador, Palabras clave, Asunto).",
      },
      {
        q: "¿Garantiza que el PDF sea completamente seguro?",
        a: "No. Esta herramienta elimina elementos conocidos y estándar. No puede garantizar la neutralización de vectores de ataque avanzados, payloads cifrados en flujos de objetos no estándar, o vulnerabilidades en el propio visor de PDF. Para documentos de alta criticidad en entornos corporativos, utiliza soluciones especializadas de sandbox documental.",
      },
      {
        q: "¿Se altera el contenido visual del documento?",
        a: "No. El contenido de las páginas (texto, imágenes, vectores) permanece intacto. Solo se eliminan los elementos de metadatos y scripting del catálogo del PDF.",
      },
      {
        q: "¿Para qué situaciones es útil?",
        a: "Es útil cuando recibes PDFs de terceros desconocidos que quieres compartir o distribuir, cuando necesitas eliminar datos del autor antes de publicar un documento, o cuando quieres asegurarte de que el PDF no ejecuta acciones automáticas al abrirse.",
      },
      {
        q: "¿Se sube el documento a algún servidor?",
        a: "No. Todo el proceso de limpieza se ejecuta localmente en tu navegador con pdf-lib. El documento no sale de tu dispositivo en ningún momento.",
      },
    ],
    run: sanitizePdf,
  },

  // ─── RELLENAR FORMULARIO PDF ────────────────────────────────────────────────
  {
    slug: "rellenar-formulario-pdf",
    name: "Rellenar formulario PDF",
    h1: "Rellenar campos de formulario en un PDF online",
    tagline: "Detecta y rellena los campos AcroForm de cualquier PDF directamente en tu navegador.",
    seoTitle: "Rellenar formulario PDF online gratis sin Adobe | BreadPDF",
    seoDescription:
      "Rellena campos de texto, casillas, desplegables y botones de opción en PDFs con AcroForm sin instalar nada. Exporta el PDF completado al instante.",
    category: "editar",
    icon: "ClipboardEdit",
    status: "live",
    accept: "application/pdf",
    multiple: false,
    minFiles: 1,
    ctaLabel: "Abrir formulario",
    keywords: [
      "rellenar formulario pdf",
      "completar pdf online",
      "rellenar pdf sin adobe",
      "formulario pdf interactivo",
    ],
    howItWorks: [
      "Sube el PDF con campos de formulario AcroForm.",
      "La herramienta detecta automáticamente todos los campos: texto, casillas, desplegables y opciones.",
      "Rellena los campos y exporta el PDF completado listo para firmar o enviar.",
    ],
    faq: [
      {
        q: "¿Qué tipo de formularios PDF son compatibles?",
        a: "Solo funciona con PDFs que contienen campos AcroForm estándar (el estándar PDF nativo). No es compatible con formularios XFA (tecnología Adobe propietaria usada en algunos PDFs generados por Adobe LiveCycle). Si el PDF no tiene campos definidos, la herramienta te avisará.",
      },
      {
        q: "¿Qué tipos de campos se pueden rellenar?",
        a: "Soporta campos de texto (simples y multilínea), casillas de verificación (checkbox), botones de opción (radio button) y listas desplegables (dropdown). Estos son los cuatro tipos de campos AcroForm más comunes en formularios estándar.",
      },
      {
        q: "¿El PDF exportado mantiene los campos editables?",
        a: "Sí. El PDF exportado conserva los campos AcroForm con los valores que has introducido. No se aplana el formulario automáticamente, por lo que sigue siendo editable en Adobe Reader u otros visores. Si quieres convertirlo en un PDF no editable, puedes usar la herramienta Aplanar PDF de BreadPDF.",
      },
      {
        q: "¿Qué pasa si el PDF está protegido con contraseña?",
        a: "Si el PDF está cifrado con restricciones de edición de formulario, es posible que los campos no sean accesibles. Primero desbloquea el documento con la herramienta 'Desbloquear PDF' de BreadPDF e inténtalo de nuevo.",
      },
      {
        q: "¿Se sube mi formulario a algún servidor externo?",
        a: "No. La detección de campos se realiza con pdf.js y el guardado de valores con pdf-lib, ambos ejecutándose íntegramente en la memoria de tu navegador. Los datos del formulario no salen de tu dispositivo.",
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
