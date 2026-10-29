import type { Locale } from "@/lib/i18n/config";

export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface GuideDefinition {
  canonicalSlug: string;
  slugs: Record<Locale, string>;
  title: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  image?: {
    url: string;
    alt: Record<Locale, string>;
    width: number;
    height: number;
  };
  publishedDate: string;
  modifiedDate: string;
  author: {
    name: string;
    role: string;
  };
  readingTimeMinutes: number;
  category: "educacion" | "empresas" | "ecommerce" | "tecnica";
  faqs: Record<Locale, GuideFaqItem[]>;
}

export const GUIDES: GuideDefinition[] = [
  {
    canonicalSlug: "reducir-pdf-limite-subida-campus-virtual",
    slugs: {
      es: "reducir-pdf-limite-subida-campus-virtual",
      ca: "reduir-pdf-limit-pujada-campus-virtual",
      en: "reduce-pdf-file-size-for-virtual-campus-submission",
    },
    title: {
      es: "Cómo reducir un PDF que supera el límite de subida en un campus virtual",
      ca: "Com reduir un PDF que supera el límit de pujada a un campus virtual",
      en: "How to Reduce a PDF Exceeding Virtual Campus Upload Limits",
    },
    seoTitle: {
      es: "Reducir PDF para Moodle y campus virtuales | BreadPDF",
      ca: "Reduir PDF per a Moodle i campus virtuals | BreadPDF",
      en: "Reduce PDF Size for Moodle & Campus Submissions | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a reducir un PDF que supera el límite de subida de Moodle o tu campus virtual. Comprímelo o divídelo por tamaño antes de entregar tu trabajo.",
      ca: "Aprèn a reduir un PDF que supera el límit de pujada de Moodle o el teu campus virtual. Comprimeix-lo o divideix-lo per mida abans de lliurar la teva feina.",
      en: "Learn how to reduce a PDF exceeding Moodle or virtual campus upload limits. Compress or split it by file size before submitting your assignment.",
    },
    image: {
      url: "https://breadpdf.com/reducir-pdf-limite-subida-campus-virtual.svg",
      alt: {
        es: "Diagrama de reducción y división de un archivo PDF para entregas en campus virtual",
        ca: "Diagrama de reducció i divisió d'un arxiu PDF per a lliuraments en campus virtual",
        en: "Diagram of PDF compression and splitting for virtual campus submissions",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 5,
    category: "educacion",
    faqs: {
      es: [
        {
          q: "¿Moodle tiene un límite de tamaño universal?",
          a: "No. En Moodle el tamaño máximo de entrega no es único ni universal. Lo define el administrador del campus a nivel de servidor PHP, las políticas del centro y los ajustes específicos fijados por el profesor en cada actividad de Tarea.",
        },
        {
          q: "¿Reducir un PDF siempre disminuye su calidad visual?",
          a: "Depende del método aplicado. Si se utiliza optimización estructural sin pérdida, el texto vectorial y la nitidez original no cambian. Si el PDF pesa mucho por contener fotografías de alta resolución y se recomprimen las imágenes, puede existir una leve reducción visual inapreciable en pantalla.",
        },
        {
          q: "¿Qué hago si mi PDF sigue siendo demasiado grande tras comprimir?",
          a: "Si la compresión no alcanza el umbral necesario, revisa si puedes eliminar páginas innecesarias o en blanco generadas por escaneo. Si la entrega lo autoriza, la solución idónea es dividir el documento en dos o más partes numeradas.",
        },
        {
          q: "¿Puedo dividir un PDF para entregarlo en varias partes?",
          a: "Sí, siempre que la configuración de la tarea en tu campus admita la subida de múltiples archivos adjuntos. Si la plataforma sólo admite un único archivo, deberás consultar con tu docente o reducir el número de páginas.",
        },
        {
          q: "¿Es mejor comprimir o dividir un documento?",
          a: "Comprimir es la opción preferente porque preserva la unidad formal de la entrega en un único documento. Dividir por tamaño es el recurso idóneo cuando el trabajo contiene cientos de páginas o planos técnicos donde comprimir comprometería la lectura.",
        },
        {
          q: "¿Cómo sé cuál es el límite exacto que me aplica mi campus?",
          a: "Accede a la actividad concreta de entrega en tu campus virtual. Justo encima o al lado del recuadro para arrastrar el archivo, la plataforma muestra un aviso explícito (por ejemplo: 'Tamaño máximo para archivos nuevos: 5 MB, archivos máximos: 1').",
        },
        {
          q: "¿Qué ocurre si una sola página pesa más que el límite objetivo?",
          a: "Un PDF no puede trocear internamente una página por la mitad. Si una sola hoja (por ejemplo, un plano escaneado a 600 DPI) ya pesa 12 MB, ninguna herramienta de división podrá dejar esa parte por debajo de 5 MB sin comprimir o rasterizar primero esa hoja.",
        },
      ],
      ca: [
        {
          q: "Moodle té un límit de mida universal?",
          a: "No. A Moodle la mida màxima de lliurament no és universal. La defineix l'administrador del campus a escala de servidor, la política del centre i la configuració que el docent assigna a cada Tasca.",
        },
        {
          q: "Reduir un PDF sempre fa perdre qualitat visual?",
          a: "Depèn del mètode. L'optimització estructural preserva el text vectorial intacte. Quan es recomprimeixen imatges incrustades molt pesades, la resolució s'ajusta a valors idonis per a pantalla amb mínima pèrdua visual.",
        },
        {
          q: "Què faig si el PDF continua pesant massa després de comprimir?",
          a: "Revisa si conté pàgines buides o innecessàries. Si la tasca permet lliurar més d'un fitxer, pots dividir-lo en fragments ordenats respectant el límit de pes de la plataforma.",
        },
        {
          q: "Puc dividir un PDF per lliurar-lo en diverses parts?",
          a: "Sí, sempre que la configuració de la tasca al campus virtual permeti adjuntar múltiples fitxers.",
        },
        {
          q: "És millor comprimir o dividir?",
          a: "Comprimir és preferible per mantenir tot el treball en un sol document. Dividir és la solució quan hi ha centenars de pàgines o gràfics d'alta resolució que no admeten més compressió.",
        },
        {
          q: "Com puc saber el límit exacte del meu campus?",
          a: "A la mateixa pàgina de lliurament de la tasca, el campus virtual mostra una indicació explícita com 'Mida màxima per a fitxers nous: X MB'.",
        },
        {
          q: "Què passa si una sola pàgina ja supera el límit?",
          a: "Una pàgina no es pot fraccionar per la meitat. Caldrà reduir la resolució d'aquesta imatge o pàgina en concret abans de dividir el document.",
        },
      ],
      en: [
        {
          q: "Does Moodle have a universal upload limit?",
          a: "No. Maximum upload limits in Moodle are not universal. They are determined by the server's PHP configuration, institutional policies, and the specific assignment settings defined by the instructor.",
        },
        {
          q: "Does shrinking a PDF always degrade visual quality?",
          a: "It depends on the optimization method. Structural lossless optimization keeps vector text and line art intact. When downscaling embedded high-DPI photos, compression is adjusted for screen readability with minimal visual difference.",
        },
        {
          q: "What should I do if the file remains too large after compression?",
          a: "Inspect the document to remove accidental blank pages or unnecessary appendices. If multi-file submission is allowed, split the PDF into numbered parts respecting the threshold.",
        },
        {
          q: "Can I submit my assignment as multiple split PDF parts?",
          a: "Yes, provided the virtual campus assignment settings allow more than one attached file. Check the submission area for the allowed file count.",
        },
        {
          q: "Is it better to compress or split a document?",
          a: "Compression is preferred because it maintains your work in a single file. Splitting by size is ideal for comprehensive theses or documents with high-resolution plans where further compression would compromise readability.",
        },
        {
          q: "How can I check the exact upload limit for my assignment?",
          a: "Open the assignment submission page in your virtual campus. The upload box explicitly states the maximum file size (for example: 'Maximum file size for new files: 5 MB, maximum attachments: 1').",
        },
        {
          q: "What happens if a single page is larger than the target file size?",
          a: "A PDF cannot split a single page mid-canvas. If one individual scanned page is 12 MB, splitting tools cannot create a sub-5 MB chunk without compressing that page first.",
        },
      ],
    },
  },
  {
    canonicalSlug: "webp-vs-jpg-png-tiendas-online",
    slugs: {
      es: "webp-vs-jpg-png-tiendas-online",
      ca: "webp-vs-jpg-png-botigues-online",
      en: "webp-vs-jpg-png-online-stores",
    },
    title: {
      es: "WebP vs JPG y PNG en tiendas online: qué formato usar y cómo optimizar tus imágenes",
      ca: "WebP vs JPG i PNG a botigues online: quin format fer servir i com optimitzar les teves imatges",
      en: "WebP vs JPG and PNG for Online Stores: Which Format to Choose and How to Optimize Product Images",
    },
    seoTitle: {
      es: "WebP vs JPG vs PNG: qué formato usar en tu tienda | BreadPDF",
      ca: "WebP vs JPG vs PNG: quin format usar a la botiga | BreadPDF",
      en: "WebP vs JPG vs PNG: Best Format for Online Stores | BreadPDF",
    },
    seoDescription: {
      es: "Descubre las diferencias entre WebP, JPG y PNG para ecommerce y aprende a optimizar imágenes de producto sin sacrificar calidad innecesariamente.",
      ca: "Descobreix les diferències entre WebP, JPG i PNG per a ecommerce i aprèn a optimitzar imatges de producte sense sacrificar qualitat innecessàriament.",
      en: "Discover the differences between WebP, JPG, and PNG for ecommerce and learn how to optimize product images without unnecessary visual quality loss.",
    },
    image: {
      url: "https://breadpdf.com/webp-vs-jpg-png-ecommerce.svg",
      alt: {
        es: "Diagrama comparativo de optimización de imágenes JPG y PNG a WebP para tiendas online",
        ca: "Diagrama comparatiu d'optimització d'imatges JPG i PNG a WebP per a botigues online",
        en: "Comparative diagram of JPG and PNG image optimization to WebP for ecommerce",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 7,
    category: "ecommerce",
    faqs: {
      es: [
        {
          q: "¿Es WebP siempre superior a JPG?",
          a: "No de forma universal. WebP ofrece algoritmos de compresión más modernos que reducen el peso manteniendo calidad similar. Sin embargo, en fotografías que ya han sido comprimidas eficientemente en JPG, una reconversión adicional puede no aportar un ahorro significativo o incluso introducir ligeros artefactos si se baja en exceso la calidad.",
        },
        {
          q: "¿PNG siempre pesa más que WebP?",
          a: "Generalmente sí cuando se compara con WebP con pérdida o WebP lossless para gráficos complejos, ya que el algoritmo predictivo de WebP comprime mejor. No obstante, en iconos vectoriales muy pequeños o imágenes monocromáticas indexadas (PNG-8), la diferencia de bytes es prácticamente despreciable.",
        },
        {
          q: "¿WebP admite transparencias como PNG?",
          a: "Sí. WebP soporta canal alfa de 8 bits tanto en compresión con pérdida como sin pérdida, permitiendo siluetas de producto y fondos transparentes con un peso significativamente inferior al de un PNG-24 convencional.",
        },
        {
          q: "¿Puedo subir imágenes WebP directamente a Shopify?",
          a: "Sí. La plataforma de Shopify acepta imágenes en formato WebP, PNG y JPG. Además, la red de distribución (CDN) de Shopify convierte y sirve dinámicamente formatos de última generación cuando el navegador del cliente lo soporta.",
        },
        {
          q: "¿Convertir imágenes a WebP mejora automáticamente el LCP de Core Web Vitals?",
          a: "No de forma automática. El Largest Contentful Paint (LCP) depende no solo del formato, sino de las dimensiones nativas, la prioridad de carga (`fetchpriority='high'`), la infraestructura del servidor o CDN y la ausencia de scripts bloqueantes en el renderizado.",
        },
        {
          q: "¿Qué nivel de calidad WebP conviene elegir para catálogo?",
          a: "Para fotografías de producto se recomienda un nivel entre 80% y 85%, que equilibra nitidez visual y ahorro de peso. Para banners de gran formato donde el detalle fino es secundario, valores entre 75% y 80% suelen ser adecuados.",
        },
        {
          q: "¿Debería convertir todas las imágenes de mi tienda a WebP?",
          a: "Es aconsejable priorizar las imágenes con mayor impacto en el rendimiento: la imagen destacada de la ficha de producto, los banners principales de la página de inicio y los fondos de categoría pesados. Elementos menores como favicons o pequeños iconos SVG no requieren este cambio.",
        },
        {
          q: "¿WebP sustituye por completo la necesidad de usar PNG?",
          a: "En la mayoría de casos de catálogo web sí, especialmente por el soporte de transparencia. Sin embargo, PNG sigue siendo preferible como archivo máster de diseño en programas de edición que no exporten WebP nativamente o cuando se requiera fidelidad pixel-perfect matemática sin pérdida.",
        },
      ],
      ca: [
        {
          q: "És WebP sempre superior a JPG?",
          a: "No de forma absoluta. WebP disposa d'algoritmes més eficients, però en fotografies que ja estan ben comprimides en JPG, una segona conversió pot no aportar una reducció rellevant.",
        },
        {
          q: "PNG sempre pesa més que WebP?",
          a: "En general sí, sobretot davant de PNG-24 amb transparències. En gràfics diminuts o paletes molt reduïdes (PNG-8), la variació és mínima.",
        },
        {
          q: "WebP admet fons transparents com PNG?",
          a: "Sí. WebP té suport natiu per a canal alfa tant en mode amb pèrdua com sense pèrdua, sent ideal per a siluetes de catàleg de producte.",
        },
        {
          q: "Puc pujar WebP directament a Shopify?",
          a: "Sí. Shopify admet càrrega directa de WebP, JPG i PNG, i gestiona el lliurament òptim mitjançant la seva xarxa CDN.",
        },
        {
          q: "Convertir a WebP millora automàticament les Core Web Vitals (LCP)?",
          a: "No exclusivament. El LCP també depèn de les dimensions reals del contenidor, la càrrega diferida (lazy loading), el servidor i el codi JavaScript de la botiga.",
        },
        {
          q: "Quin percentatge de qualitat WebP és recomanable per a ecommerce?",
          a: "Un valor entre el 80% i el 85% ofereix el millor equilibri entre fidelitat visual del producte i reducció de bytes.",
        },
        {
          q: "Cal convertir totes les imatges de la botiga?",
          a: "Convé centrar-se en les imatges principals de fitxes de producte i bàngers de portada, que són les que més influeixen en el temps de càrrega percebut.",
        },
        {
          q: "WebP substitueix totalment el format PNG?",
          a: "A la web sí per a la immensa majoria de casos. No obstant això, PNG continua sent essencial com a fitxer mestre en programari de disseny gràfic tradicional.",
        },
      ],
      en: [
        {
          q: "Is WebP universally better than JPG?",
          a: "Not in every single scenario. While WebP uses more advanced compression algorithms, re-compressing an already highly optimized JPG may yield negligible savings or risk minor compression artifacts if quality is lowered excessively.",
        },
        {
          q: "Does PNG always have a larger file size than WebP?",
          a: "Typically yes, especially when replacing 24-bit PNGs with transparency. For very small icons or indexed 8-bit PNG assets, the byte difference is negligible.",
        },
        {
          q: "Does WebP support transparency like PNG?",
          a: "Yes. WebP supports 8-bit alpha channels in both lossy and lossless modes, making it ideal for isolated product cutouts with transparent backgrounds.",
        },
        {
          q: "Can I upload WebP images directly to Shopify?",
          a: "Yes. Shopify accepts WebP, PNG, and JPG uploads, and its CDN infrastructure dynamically serves modern formats depending on the shopper's browser.",
        },
        {
          q: "Does switching to WebP automatically fix Core Web Vitals (LCP)?",
          a: "Not automatically. Largest Contentful Paint (LCP) is influenced by rendered dimensions, fetch priority, CDN delivery, and render-blocking scripts in addition to file weight.",
        },
        {
          q: "What WebP quality setting is recommended for ecommerce catalogs?",
          a: "A quality setting between 80% and 85% delivers the optimal balance between sharp product textures and efficient download speed.",
        },
        {
          q: "Should I convert every single image across my store?",
          a: "Prioritize high-impact assets: the hero product gallery images, homepage promotional banners, and heavy category thumbnails that directly impact user experience.",
        },
        {
          q: "Does WebP completely eliminate the need for PNG?",
          a: "For online display, largely yes. However, PNG remains valuable as a source master format in graphics software that lacks native WebP export or requires pixel-level mathematical preservation.",
        },
      ],
    },
  },
  {
    canonicalSlug: "unificar-memoria-anexos-portada-tfg-tfm",
    slugs: {
      es: "unificar-memoria-anexos-portada-tfg-tfm",
      ca: "unificar-memoria-annexos-portada-tfg-tfm",
      en: "merge-thesis-appendices-cover-pdf",
    },
    title: {
      es: "Cómo unificar memoria, anexos y portada en un PDF para TFG o TFM",
      ca: "Com unificar memòria, annexos i portada en un PDF per a TFG o TFM",
      en: "How to Merge Thesis Cover, Appendices, and Body into a Single PDF",
    },
    seoTitle: {
      es: "Unir memoria, anexos y portada en un PDF TFG/TFM | BreadPDF",
      ca: "Unir memòria, annexos i portada en un PDF TFG/TFM | BreadPDF",
      en: "Merge Thesis Body, Cover and Appendices into One PDF | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a reunir memoria, portada y anexos en un único PDF para un TFG o TFM y comprueba el orden, la numeración y el tamaño antes de entregarlo.",
      ca: "Aprèn a reunir memòria, portada i annexos en un únic PDF per a un TFG o TFM i comprova l'ordre, la numeració i el pes abans de lliurar-lo.",
      en: "Learn how to assemble thesis body, cover page, and appendices into a single PDF and verify page numbering, order, and file size before turn-in.",
    },
    image: {
      url: "https://breadpdf.com/unificar-tfg-tfm-pdf.svg",
      alt: {
        es: "Esquema del proceso de unificación de portada, memoria y anexos en un único PDF para TFG o TFM",
        ca: "Esquema del procés d'unificació de portada, memòria i annexos en un únic PDF per a TFG o TFM",
        en: "Workflow diagram illustrating the assembly of thesis cover, body, and appendices into a single PDF",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 6,
    category: "educacion",
    faqs: {
      es: [
        {
          q: "¿Es obligatorio entregar el TFG o TFM siempre en un único archivo PDF?",
          a: "No existe una norma universal para todas las universidades. La mayoría de comisiones académicas y sedes electrónicas solicitan un único PDF con la portada, memoria y anexos encuadernados digitalmente. Sin embargo, algunas facultades admiten o exigen adjuntar los anexos pesados (planos, código fuente o bases de datos) en ficheros independientes o carpetas comprimidas.",
        },
        {
          q: "¿Se pueden unir documentos de Word y PDF directamente?",
          a: "En el estándar PDF, los documentos deben compilarse a formato PDF antes de ensamblarse. La secuencia consiste en convertir la memoria principal de Word a PDF y después unificarla con la portada oficial y los escaneos en una única operación.",
        },
        {
          q: "¿Cómo debo incorporar certificados, encuestas o anexos fotográficos?",
          a: "Si dispones de certificados en papel o capturas en JPG/PNG, conviértelos previamente a páginas PDF estándar. Así conservarán sus proporciones y podrás ordenarlos visualmente junto al resto del trabajo.",
        },
        {
          q: "¿Cómo se gestiona la numeración de páginas entre la memoria y los anexos?",
          a: "Depende de la guía de estilo de tu universidad. Lo más frecuente es que la portada oficial no lleve número visible, las páginas preliminares (agradecimientos, resumen) lleven números romanos o no se numeren, y la memoria junto a los anexos sigan una numeración arábiga correlativa.",
        },
        {
          q: "¿Qué hago si el PDF resultante supera el límite de subida de la secretaría?",
          a: "Revisa si contiene páginas escaneadas a resolución excesiva o fotografías de cámara sin comprimir. Aplica una compresión equilibrada de PDF para ajustar el peso por debajo de la cuota de la plataforma sin que las gráficas pierdan legibilidad.",
        },
        {
          q: "¿Conviene comprimir un TFG o TFM antes de depositarlo?",
          a: "Solo si el peso del archivo resultante excede la cuota fijada por la universidad o si el documento tarda demasiado en abrirse en visores web. Si el PDF ya pesa pocos megabytes y cumple las directrices, no es necesario comprimirlo.",
        },
        {
          q: "¿Cómo puedo comprobar que el documento final está completo y sin errores?",
          a: "Abre el PDF unificado en un visor independiente a pantalla completa. Comprueba que la portada es la versión aprobada, que la foliación coincide exactamente con el índice de contenidos y que los anexos aparecen en el orden exacto citado en el texto.",
        },
      ],
      ca: [
        {
          q: "És obligatori lliurar el TFG o TFM sempre en un sol arxiu PDF?",
          a: "No existeix una normativa universal. Moltes comissions acadèmiques i seus electròniques demanen un únic document per facilitar la revisió del tribunal. No obstant això, determinades facultats permeten annexos tècnics en arxius independents.",
        },
        {
          q: "Es poden fusionar directament arxius de Word amb documents PDF?",
          a: "Cal convertir prèviament el document Word (.docx) a format PDF. Un cop obtinguda la memòria en PDF, es pot fusionar directament amb la portada i els annexos.",
        },
        {
          q: "Com s'han d'afegir certificats, enquestes o captures gràfiques?",
          a: "Si tens imatges o escanejos en format JPG/PNG, passa'ls primer a PDF per unificar les mides de pàgina abans d'incorporar-los a la cua d'unió.",
        },
        {
          q: "Com es numera el document si els annexos s'afegeixen al final?",
          a: "Segons la guia d'estil del teu centre. El patró més estès manté la portada sense número visible i aplica numeració aràbiga contínua al llarg de la memòria i els annexos posteriors.",
        },
        {
          q: "Què faig si el PDF final sobrepassa la mida permesa pel dipòsit digital?",
          a: "Aplica compressió equilibrada a les fotografies incrustades per situar el fitxer dins del límit estipulat pel campus sense degradar la lectura.",
        },
        {
          q: "És aconsellable comprimir sempre el TFG o TFM?",
          a: "Només si el fitxer supera el límit del servidor o pesa desenes de megabytes innecessaris. Si el document és lleuger, no cal recomprimir-lo.",
        },
        {
          q: "Com puc revisar que el treball està llest per a lliurament?",
          a: "Revisa el PDF pàgina per pàgina verificant que la portada oficial conté les dades correctes, que l'índex coincideix amb la numeració i que no hi ha pàgines duplicades.",
        },
      ],
      en: [
        {
          q: "Is it universally mandatory to submit a thesis as a single PDF?",
          a: "No universal rule applies across all institutions. Most academic evaluation committees prefer a single compiled PDF to streamline plagiarism checks and review. However, specific departments may permit supplementary files for datasets or technical drawings.",
        },
        {
          q: "Can Word (.docx) and PDF files be merged directly?",
          a: "Under the PDF document model, all source assets must be converted into PDF format first. The standard procedure is to convert your Word manuscript to PDF, then merge it with the cover and appendices in one step.",
        },
        {
          q: "How should I include scanned certificates or survey forms?",
          a: "Convert individual JPG or PNG scans into standard PDF sheets first. This ensures uniform page dimensions and allows intuitive visual reordering.",
        },
        {
          q: "How should page numbering be structured across body and appendices?",
          a: "Always follow your faculty style guidelines. Typically, the formal title page carries no visible page number, front matter uses roman numerals, and body text through appendices follows continuous arabic numbering.",
        },
        {
          q: "What should I do if the merged thesis exceeds the portal upload limit?",
          a: "Inspect high-DPI scans and embedded camera photos. Apply balanced PDF compression to bring the document under the portal threshold while preserving chart legibility.",
        },
        {
          q: "Should I always compress my thesis before submission?",
          a: "Only if the file exceeds institutional file-size limits or opens sluggishly. If the uncompressed PDF is already compact, further compression is unnecessary.",
        },
        {
          q: "How can I verify the final thesis is ready for turn-in?",
          a: "Perform a full-screen audit: check that the cover page is current, verify that the table of contents page numbers match the layout, and confirm all referenced appendices appear in sequence.",
        },
      ],
    },
  },
  {
    canonicalSlug: "ocultar-datos-personales-pdf",
    slugs: {
      es: "ocultar-datos-personales-pdf",
      ca: "ocultar-dades-personals-pdf",
      en: "hide-personal-data-in-pdf",
    },
    title: {
      es: "Cómo ocultar datos personales en un PDF antes de compartirlo",
      ca: "Com ocultar dades personals en un PDF abans de compartir-lo",
      en: "How to Hide Personal Data in a PDF Before Sharing It",
    },
    seoTitle: {
      es: "Ocultar datos personales en un PDF antes de compartir | BreadPDF",
      ca: "Ocultar dades personals d'un PDF abans de compartir | BreadPDF",
      en: "How to Hide Personal Data in a PDF Before Sharing | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a ocultar datos personales en un PDF, revisar sus metadatos y sanear determinados elementos técnicos antes de compartir un documento.",
      ca: "Aprèn a ocultar dades personals en un PDF, revisar les metadades i sanejar determinats elements tècnics abans de compartir un document.",
      en: "Learn how to hide personal data in a PDF, clear metadata properties, and sanitize technical elements before sharing any document.",
    },
    image: {
      url: "https://breadpdf.com/ocultar-datos-personales-pdf.svg",
      alt: {
        es: "Diagrama de revisión en tres capas: censura visual, purga de metadatos y saneamiento técnico en PDF",
        ca: "Diagrama de revisió en tres capes: censura visual, purga de metadades i sanejament tècnic en PDF",
        en: "Three-layer PDF inspection workflow: visual redaction, metadata purge, and technical sanitization",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Privacidad Documental y Seguridad Web",
    },
    readingTimeMinutes: 7,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Qué diferencia hay entre censurar y anonimizar?",
          a: "Censurar consiste en ocultar o suprimir fragmentos visibles concretos de un documento (como tapar un DNI o un número de cuenta con un bloque opaco). Anonimizar, según el marco del RGPD (Recital 26), es un proceso exhaustivo que impide que la persona afectada sea identificable de forma directa o indirecta por cualquier tercero mediante el conjunto de datos restantes o el cruce con fuentes externas.",
        },
        {
          q: "¿Borrar el nombre hace que el PDF sea anónimo?",
          a: "No necesariamente. La identidad de una persona física puede deducirse por correlación de identificadores indirectos persistentes en el texto o anexos: cargo directivo en una empresa concreta, fechas de nacimiento, descripciones biográficas o direcciones postales.",
        },
        {
          q: "¿Los PDF guardan metadatos?",
          a: "Sí. Todo documento PDF incluye cabeceras con información estructurada sobre el archivo: nombre del autor registrado en el sistema operativo, software emisor, versión de la impresora virtual, fecha exacta de creación y última modificación, e incluso rutas locales de guardado.",
        },
        {
          q: "¿Qué puede eliminar BreadPDF de los metadatos?",
          a: "La herramienta purga el diccionario de información estándar del documento (campos Title, Author, Subject, Keywords, Creator y Producer) y elimina el flujo de metadatos XML/XMP embebido en el catálogo raíz.",
        },
        {
          q: "¿Qué hace realmente 'Sanear PDF'?",
          a: "Localiza y neutraliza elementos de automatización dentro de la estructura interna del PDF: elimina scripts JavaScript incrustados (/JavaScript), suprime acciones automáticas de apertura o cierre de documento (/OpenAction, /AA) y purga los metadatos de autoría.",
        },
        {
          q: "¿Censurar un PDF garantiza el cumplimiento del RGPD?",
          a: "No. La censura visual es una medida técnica de mitigación del riesgo de exposición, pero el cumplimiento de la normativa de protección de datos (RGPD / LOPDGDD) exige una base de legitimación adecuada, minimización de datos y una evaluación global del tratamiento que excede el ámbito de un software de edición.",
        },
        {
          q: "¿Debo revisar todas las páginas después de censurar?",
          a: "Sí. Es una práctica imprescindible. Debes abrir el PDF exportado en un visor independiente y verificar cada página para confirmar que no quedan menciones desatendidas en pies de página, encabezados, tablas anexas o gráficos incrustados.",
        },
        {
          q: "¿Qué debería comprobar antes de publicar un PDF?",
          a: "Comprueba visualmente que los datos identificativos están cubiertos, verifica que las propiedades del archivo no revelan nombres de empleados ni licencias de software, confirma que no contiene scripts automáticos y asegúrate de haber aplanado o eliminado capas si el documento incluía formularios interactivos.",
        },
      ],
      ca: [
        {
          q: "Quina diferència hi ha entre censurar i anonimitzar?",
          a: "Censurar consisteix a tapar o suprimir fragments visibles concrets d'un document (com ara cobrir un DNI o un compte bancari amb un bloc opac). Anonimitzar, segons el marc de l'RGPD (Recital 26), és un procediment exhaustiu que impedeix que la persona física sigui identificable de forma directa o indirecta per qualsevol tercer mitjançant les dades restants o l'encreuament amb altres fonts.",
        },
        {
          q: "Esborrar el nom fa que el PDF sigui anònim?",
          a: "No necessàriament. La identitat es pot deduir per correlació d'identificadors indirectes persistents al text o als annexos: un càrrec professional únic en una entitat, dates de naixement, perfils biomètrics o adreces de localització.",
        },
        {
          q: "Els PDF guarden metadades?",
          a: "Sí. Tot document PDF inclou capçaleres estructurades amb informació del fitxer: nom d'usuari de l'equip que el va crear, programari emprat, data i hora exacta d'edició i fluxos de metadades XMP.",
        },
        {
          q: "Què pot eliminar BreadPDF de les metadades?",
          a: "L'eina purga el diccionari d'informació estàndard (camps Title, Author, Subject, Keywords, Creator i Producer) i suprimeix l'stream de metadades XML/XMP incrustat al catàleg de l'arxiu.",
        },
        {
          q: "Què fa realment 'Sanejar PDF'?",
          a: "Identifica i neutralitza elements dinàmics de l'estructura interna del fitxer: elimina scripts JavaScript incrustats (/JavaScript), desactiva accions automàtiques d'obertura (/OpenAction, /AA) i purga les metadades d'autoria.",
        },
        {
          q: "Censurar un PDF garanteix el compliment de l'RGPD?",
          a: "No. La censura visual és una mesura tècnica preventiva, però el compliment de la legislació de protecció de dades requereix un tractament jurídic integral que supera l'àmbit d'una eina d'edició documental.",
        },
        {
          q: "Cal revisar totes les pàgines després de censurar?",
          a: "Sí. És fonamental obrir el PDF resultant en un visor i comprovar pàgina per pàgina que no han quedat dades exposades en capçaleres, peus de pàgina, taules d'annexos o gràfics.",
        },
        {
          q: "Què hauria de comprovar abans de publicar un PDF?",
          a: "Verifica visualment que els blocs opacs cobreixen la informació sensible, confirma que les propietats no revelen noms ni rutes del sistema, comprova que no queden scripts actius i assegura't que no conté formularis interactius residuals.",
        },
      ],
      en: [
        {
          q: "What is the difference between redacting and anonymizing?",
          a: "Redaction involves visibly covering or obscuring specific elements within a document (such as placing opaque blocks over ID numbers or account numbers). Anonymization, under GDPR standards (Recital 26), is a comprehensive state ensuring the data subject is irreversibly non-identifiable by any party through reasonable means, remaining context, or third-party data linkages.",
        },
        {
          q: "Does removing a name make a PDF anonymous?",
          a: "Not necessarily. Identity can often be re-established through persistent indirect identifiers in the document body: unique executive roles, specific project timelines, postal addresses, or detailed biographical descriptions.",
        },
        {
          q: "Do PDF files store hidden metadata?",
          a: "Yes. Standard PDF structures include document information dictionaries and XMP packages recording the operating system username, author, originating software, creation and modification timestamps, and local printer profiles.",
        },
        {
          q: "What metadata does BreadPDF remove?",
          a: "The tool clears standard document information fields (Title, Author, Subject, Keywords, Creator, and Producer) and strips the embedded XMP metadata stream from the document catalog root.",
        },
        {
          q: "What does 'Sanitize PDF' actually do?",
          a: "It scans and strips automated technical elements from the PDF object tree: removes embedded JavaScript routines (/JavaScript), deactivates automatic launch triggers (/OpenAction, /AA), and purges standard author metadata.",
        },
        {
          q: "Does redacting a PDF ensure full GDPR compliance?",
          a: "No. Visual redaction is a practical risk-reduction safeguard, but GDPR compliance requires a lawful basis for processing, data minimization principles, and holistic governance that cannot be guaranteed by any document software.",
        },
        {
          q: "Should I inspect every page after redaction?",
          a: "Yes. It is essential to reopen the exported PDF in an independent viewer and review every page to ensure no identifiers remain exposed across running headers, footers, charts, or appendix tables.",
        },
        {
          q: "What should I verify before publishing a PDF?",
          a: "Confirm visual coverage over sensitive entries, check that file properties display no personal author names, verify the absence of automated scripts, and ensure interactive forms have been flattened or removed.",
        },
      ],
    },
  },
  {
    canonicalSlug: "pasar-tablas-pdf-a-excel",
    slugs: {
      es: "pasar-tablas-pdf-a-excel",
      ca: "passar-taules-pdf-a-excel",
      en: "convert-pdf-tables-to-excel",
    },
    title: {
      es: "Cómo pasar tablas de un PDF a Excel sin perder el formato de las columnas",
      ca: "Com passar taules d'un PDF a Excel sense perdre el format de les columnes",
      en: "How to Convert PDF Tables to Excel While Preserving Column Layout",
    },
    seoTitle: {
      es: "Pasar tablas de PDF a Excel manteniendo las columnas | BreadPDF",
      ca: "Passar taules de PDF a Excel mantenint columnes | BreadPDF",
      en: "How to Convert PDF Tables to Excel and Keep Columns | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a convertir tablas de un PDF a Excel, detectar problemas de columnas y revisar números, fechas y totales antes de utilizar los datos.",
      ca: "Aprèn a convertir taules d'un PDF a Excel, detectar problemes de columnes i revisar números, dates i totals abans d'utilitzar les dades.",
      en: "Learn how to convert tables from PDF to Excel, troubleshoot column alignment, and audit figures, dates, and sums before using the data.",
    },
    image: {
      url: "https://breadpdf.com/pasar-tablas-pdf-a-excel.svg",
      alt: {
        es: "Diagrama de conversión de tablas PDF a celdas y columnas en hoja de cálculo Excel",
        ca: "Diagrama de conversió de taules PDF a cel·les i columnes en full de càlcul Excel",
        en: "Technical conversion flow from visual PDF table streams to Excel spreadsheet grid",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Gestión Documental y Datos Financieros",
    },
    readingTimeMinutes: 6,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Se puede convertir cualquier PDF a Excel?",
          a: "No de forma directa ni automática. Los documentos generados digitalmente con texto vectorial permiten agrupar caracteres en cuadrículas mediante coordenadas X/Y. Sin embargo, los PDF escaneados o procedentes de fotografías son imágenes puras y requieren reconocimiento óptico de caracteres (OCR) previo para identificar el texto.",
        },
        {
          q: "¿Por qué las columnas salen desordenadas a veces?",
          a: "Porque en el estándar PDF las tablas no se guardan como celdas de Excel, sino como fragmentos de texto flotantes posicionados en coordenadas individuales. Si una columna contiene saltos de línea imprevistos, números con sangrías dispares o celdas combinadas, el algoritmo de detección geométrica puede interpretar que pertenecen a columnas diferentes.",
        },
        {
          q: "¿Puedo convertir un PDF escaneado a Excel?",
          a: "Sí, pero mediante un proceso en dos etapas. Primero debes procesar el archivo con una herramienta de OCR para generar una capa de texto reconocible sobre la imagen, y posteriormente convertir ese texto a una hoja de cálculo estructurada.",
        },
        {
          q: "¿Necesito OCR siempre?",
          a: "No. Solo es necesario cuando el PDF es una imagen (escáner físico o fotografía) donde el texto no se puede seleccionar con el cursor. Si en tu visor puedes marcar y copiar el texto, el documento es digital nativo y la conversión se realiza directamente sin OCR.",
        },
        {
          q: "¿Se mantienen las fórmulas de la tabla original?",
          a: "No. Un archivo PDF solo almacena los valores calculados visibles (por ejemplo, el número final de un total), nunca las fórmulas matemáticas ('=SUMA(...)') ni las relaciones dinámicas entre celdas. La hoja de cálculo generada contendrá únicamente valores estáticos.",
        },
        {
          q: "¿Se mantienen los números y fechas con su formato?",
          a: "Depende de la configuración regional de tu software de hoja de cálculo. En España y la Unión Europea se utiliza habitualmente la coma para los decimales y el punto para los millares, mientras que en sistemas anglosajones es a la inversa. Es imprescindible revisar que Excel no haya interpretado una cifra decimal como texto o como fecha.",
        },
        {
          q: "¿Cómo sé si los datos se han convertido correctamente?",
          a: "El método de control contable estándar consiste en aplicar una fórmula de suma simple en Excel sobre la columna de importes y verificar que el resultado coincide al céntimo con la cifra del total general impresa en el PDF original.",
        },
        {
          q: "¿Qué hago si Excel no reconoce bien las columnas?",
          a: "Si el archivo exportado en XLSX presenta desplazamientos en filas complejas, puedes probar a exportar en formato CSV y utilizar el asistente de importación de texto de Excel ('Datos > Desde texto/CSV') ajustando manualmente los delimitadores o el ancho fijo de columnas.",
        },
      ],
      ca: [
        {
          q: "Es pot convertir qualsevol PDF a Excel?",
          a: "No de manera directa ni automàtica. Els documents generats digitalment amb text vectorial permeten agrupar caràcters en quadrícules mitjançant coordenades geomètriques. En canvi, els PDF escanejats o derivats de fotografies són imatges i requereixen reconeixement òptic de caràcters (OCR) previ per identificar el contingut.",
        },
        {
          q: "Per què les columnes surten desordenades a vegades?",
          a: "Perquè en l'estàndard PDF les taules no es desen com a cel·les natives d'Excel, sinó com a fragments de text flotants posicionats en coordenades individuals. Si hi ha salts de línia imprevistos o cel·les combinades, l'algoritme de detecció pot interpretar que pertanyen a columnes diferents.",
        },
        {
          q: "Puc convertir un PDF escanejat a Excel?",
          a: "Sí, però mitjançant un flux en dues fases: primer cal aplicar OCR per generar una capa de caràcters sobre la imatge escanejada, i després convertir aquest text a full de càlcul estructurat.",
        },
        {
          q: "Necessito OCR sempre?",
          a: "No. Només és imprescindible si el document prové d'un escàner físic i el text no es pot seleccionar amb el ratolí. Si el text és interactiu i seleccionable, la conversió es fa directament.",
        },
        {
          q: "Es mantenen les fórmules de la taula original?",
          a: "No. El PDF només desa el resultat calculat visible imprès al full, no pas la fórmula matemàtica d'origen. L'arxiu Excel resultant contindrà valors estàtics.",
        },
        {
          q: "Es mantenen els números i les dates amb el seu format?",
          a: "Depèn de la configuració regional del teu programari d'ofimàtica. És fonamental revisar els separadors de decimals (coma o punt) per comprovar que el full de càlcul no ha interpretat imports monetaris com a text pla.",
        },
        {
          q: "Com sé si les dades s'han convertit correctament?",
          a: "Aplica una fórmula de suma a la columna d'imports a Excel i comprova que la xifra coincideix exactament amb el total general imprès al PDF d'origen.",
        },
        {
          q: "Què faig si Excel no reconeix bé l'amplada de les columnes?",
          a: "Si el fitxer XLSX presenta desplaçaments, prova d'exportar en format CSV i utilitzar l'assistent d'importació ('Dades > Des de text/CSV') d'Excel fixant manualment l'amplada de les columnes.",
        },
      ],
      en: [
        {
          q: "Can any PDF be converted into Excel?",
          a: "Not universally or automatically. Digitally generated PDFs with vector text streams permit grouping characters into rows and columns using X/Y coordinates. In contrast, scanned PDFs or photos are pure bitmap images requiring Optical Character Recognition (OCR) first to detect typography.",
        },
        {
          q: "Why do table columns sometimes appear misaligned in Excel?",
          a: "Under the PDF specification, tables are not stored as structured spreadsheet grids, but as floating character strings positioned at absolute coordinates. Multiline cell wraps or irregular column gutters can cause the spatial grouping algorithm to misjudge column boundaries.",
        },
        {
          q: "Can I convert a scanned PDF to Excel?",
          a: "Yes, using a two-step workflow: first apply OCR to generate a searchable character layer over the scanned image, then convert that extracted text into an Excel workbook.",
        },
        {
          q: "Do I always need OCR?",
          a: "No. OCR is only required if the document is a flattened image where text cannot be highlighted with your cursor. If you can select and copy words, it is a native digital PDF and can be converted directly.",
        },
        {
          q: "Are mathematical formulas preserved in the conversion?",
          a: "No. PDF files store only the rendered visual output of calculations (e.g., the static total number), never underlying spreadsheet logic ('=SUM(...)'). Exported sheets will contain static values.",
        },
        {
          q: "Are numeric formats and dates preserved accurately?",
          a: "This depends heavily on regional locale settings. European documents often employ commas as decimal separators and periods for thousands, whereas US/UK systems use the inverse. You must verify that your spreadsheet application parsed numbers as numeric values rather than raw text.",
        },
        {
          q: "How can I verify that the data converted accurately?",
          a: "The standard administrative audit technique is to insert a `=SUM()` formula over the imported amount column and verify that the calculated balance matches the printed total on the original PDF down to the cent.",
        },
        {
          q: "What should I do if Excel fails to align columns cleanly?",
          a: "If the XLSX output shows shifted cells due to complex nesting, export in CSV format and use Excel's 'Get Data > From Text/CSV' wizard to manually adjust column widths and delimiter rules.",
        },
      ],
    },
  },
  {
    canonicalSlug: "hacer-buscable-pdf-escaneado-ocr",
    slugs: {
      es: "hacer-buscable-pdf-escaneado-ocr",
      ca: "fer-buscable-pdf-escanejat-ocr",
      en: "make-scanned-pdf-searchable-with-ocr",
    },
    title: {
      es: "Cómo hacer buscable un PDF escaneado con OCR",
      ca: "Com fer cercable un PDF escanejat amb OCR",
      en: "How to Make a Scanned PDF Searchable with OCR",
    },
    seoTitle: {
      es: "Cómo hacer buscable un PDF escaneado con OCR | BreadPDF",
      ca: "Com fer cercable un PDF escanejat amb OCR | BreadPDF",
      en: "How to Make a Scanned PDF Searchable with OCR | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a convertir un PDF escaneado en un documento buscable con OCR, comprobar el texto reconocido y detectar los errores más habituales.",
      ca: "Aprèn a convertir un PDF escanejat en un document cercable amb OCR, comprovar el text reconegut i detectar els errors més habituals.",
      en: "Learn how to make a scanned PDF searchable with OCR, verify recognized text, and troubleshoot common character detection issues.",
    },
    image: {
      url: "https://breadpdf.com/hacer-buscable-pdf-escaneado-ocr.svg",
      alt: {
        es: "Diagrama de reconocimiento óptico de caracteres (OCR) para transformar documentos escaneados en PDF buscables con Ctrl+F",
        ca: "Diagrama de reconeixement òptic de caràcters (OCR) per transformar documents escanejats en PDF cercables amb Ctrl+F",
        en: "Optical character recognition (OCR) architecture diagram showing scanned bitmap conversion into searchable text layer",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Digitalización Documental y Tecnologías OCR",
    },
    readingTimeMinutes: 7,
    category: "educacion",
    faqs: {
      es: [
        {
          q: "¿Qué es exactamente el OCR?",
          a: "OCR son las siglas de Reconocimiento Óptico de Caracteres (Optical Character Recognition). Es una tecnología de visión artificial que analiza mapas de bits o imágenes escaneadas para identificar patrones de letras, números y símbolos, traduciéndolos a caracteres tipográficos digitales.",
        },
        {
          q: "¿Cómo sé si mi PDF necesita OCR?",
          a: "Abre el archivo en cualquier visor e intenta seleccionar una palabra con el cursor o buscar un término conocido pulsando Ctrl+F. Si el visor no permite marcar texto o arrastra un recuadro azul sobre toda la página, el documento está compuesto exclusivamente por imágenes y requiere OCR para ser interactivo.",
        },
        {
          q: "¿Puedo buscar texto después de aplicar OCR?",
          a: "Sí. Si seleccionas la salida en formato PDF buscable, el motor genera una capa tipográfica invisible perfectamente posicionada sobre la imagen del escaneo. Esto permite utilizar Ctrl+F, indexar el documento en sistemas de búsqueda y seleccionar fragmentos para copiarlos al portapapeles.",
        },
        {
          q: "¿El OCR mantiene el formato original?",
          a: "El modo 'PDF con capa de texto' mantiene la apariencia visual idéntica al 100%, ya que la imagen escaneada original no se altera. En cambio, si exportas el contenido a texto plano (.txt) o procesas el documento hacia Word/Excel, el diseño dependerá de la complejidad de la maquetación original.",
        },
        {
          q: "¿Puede el OCR reconocer tablas?",
          a: "El motor reconoce las palabras y cifras situadas dentro de una tabla. Sin embargo, reconstruir la cuadrícula formal con sus filas y columnas matemáticas exige un análisis de estructura posterior (mediante herramientas de conversión a Excel), no garantizándose una alineación idéntica en tablas complejas o sin bordes.",
        },
        {
          q: "¿Puede el OCR reconocer escritura a mano (manuscritos)?",
          a: "El OCR estándar de propósito general está entrenado para tipografía impresa (fuentes de imprenta o procesador de textos). La caligrafía manuscrita, anotaciones marginales o firmas suelen presentar tasas de error muy elevadas o no ser detectadas.",
        },
        {
          q: "¿Por qué el OCR confunde letras y números a veces?",
          a: "Ocurre habitualmente por falta de resolución, bajo contraste o manchas en el papel original. Glifos visualmente cercanos como el número '0' y la letra 'O', el '1', la 'l' minúscula y la 'I' mayúscula, o el '5' y la 'S', comparten perfiles morfológicos que pueden inducir a error algorítmico.",
        },
        {
          q: "¿Puedo convertir un PDF escaneado a Excel después de hacer OCR?",
          a: "Sí. Es el flujo de trabajo recomendado: primero se procesa el documento con OCR para crear la capa tipográfica digital y, a continuación, se utiliza la herramienta 'PDF a Excel' para agrupar los datos en columnas auditando posteriormente los totales.",
        },
      ],
      ca: [
        {
          q: "Què és exactament l'OCR?",
          a: "OCR són les sigles de Reconeixement Òptic de Caràcters (Optical Character Recognition). És una tecnologia informàtica que analitza imatges escanejades o fotografies per identificar formes de lletres i xifres, traduint-les a text digital codificat.",
        },
        {
          q: "Com sé si el meu PDF necessita OCR?",
          a: "Obre el document i prova de seleccionar una paraula amb el ratolí o cerca un terme prement Ctrl+F. Si el visor no permet marcar frases individuals i arrossega un rectangle opac sobre la pàgina, el PDF és una imatge pura i necessita OCR.",
        },
        {
          q: "Puc cercar text després d'aplicar OCR?",
          a: "Sí. En triar la sortida en format PDF cercable, el motor incrusta una capa tipogràfica invisible alineada sobre la imatge original. Podràs prémer Ctrl+F, seleccionar línies i indexar el contingut en gestors documentals.",
        },
        {
          q: "L'OCR manté el format original?",
          a: "El mode 'PDF amb capa de text' conserva la representació visual idèntica a l'escaneig original. Si exportes el contingut a text pla (.txt), el format gràfic es descarta per oferir només els caràcters reconeguts.",
        },
        {
          q: "Pot l'OCR reconèixer taules?",
          a: "Reconeix els caràcters i números continguts a les cel·les. No obstant això, mantenir la matriu estricta de columnes requereix una eina posterior de conversió a full de càlcul (PDF a Excel).",
        },
        {
          q: "Pot l'OCR reconèixer escriptura manuscrita?",
          a: "L'OCR està dissenyat i optimitzat per a caràcters tipogràfics impresos. Els manuscrits, apunts a mà o signatures solen presentar discrepàncies notables de reconeixement.",
        },
        {
          q: "Per què l'OCR confon lletres i números?",
          a: "A causa de limitacions de resolució, deficiències de contrast o taques a l'escaneig. Caràcters similars com el '0' i la 'O', o l''1' i la 'l', comparteixen geometries fàcilment confongibles en mapes de bits degradats.",
        },
        {
          q: "Puc convertir un PDF escanejat a Excel després de l'OCR?",
          a: "Sí. És el procediment metòdic adequat: primer s'aplica OCR per donar identitat digital al text i posteriorment es processa amb l'eina de conversió a Excel per tabular les xifres.",
        },
      ],
      en: [
        {
          q: "What is OCR exactly?",
          a: "OCR stands for Optical Character Recognition. It is a computer vision technology that inspects scanned bitmaps or photographed pages to identify letter and number glyphs, converting visual shapes into machine-readable digital text.",
        },
        {
          q: "How can I tell if my PDF needs OCR?",
          a: "Open the file in any PDF reader and try highlighting a word with your mouse or searching with Ctrl+F. If the cursor fails to select individual words or drags a whole-page bounding box, the file is a pure bitmap image requiring OCR.",
        },
        {
          q: "Can I search text after applying OCR?",
          a: "Yes. When generating a searchable PDF, the OCR engine generates an invisible vector typography layer positioned precisely above the scanned background bitmap. This activates Ctrl+F search, system indexing, and clipboard copying.",
        },
        {
          q: "Does OCR retain the original page layout?",
          a: "The 'Searchable PDF' mode preserves 100% of the original visual appearance because the scanned picture remains unaltered underneath. If you extract content into plain text (.txt), visual positioning is discarded in favor of raw characters.",
        },
        {
          q: "Can OCR accurately recognize tables?",
          a: "OCR detects characters and numerical values located within table boundaries. However, reconstructing formal relational columns requires secondary spreadsheet parsing (e.g., PDF to Excel), particularly for borderless designs.",
        },
        {
          q: "Can OCR read handwritten notes?",
          a: "Standard OCR models are trained on printed typography (typeset books, digital fonts, typewriters). Cursive handwriting, margin notes, and ink signatures exhibit high error rates under conventional OCR.",
        },
        {
          q: "Why does OCR sometimes confuse letters and numbers?",
          a: "Scan resolution issues, low contrast, or paper artifacts frequently cause ambiguity. Visually similar glyphs such as digit '0' vs letter 'O', numeral '1' vs lowercase 'l' vs uppercase 'I', or '5' vs 'S' share morphological profiles.",
        },
        {
          q: "Can I convert a scanned PDF to Excel after OCR?",
          a: "Yes, that is the recommended two-tier pipeline: run OCR first to produce a searchable character layer, then feed the result into the 'PDF to Excel' tool to extract structured tabular data.",
        },
      ],
    },
  },
  {
    canonicalSlug: "rellenar-y-firmar-formulario-pdf",
    slugs: {
      es: "rellenar-y-firmar-formulario-pdf",
      ca: "omplir-i-signar-formulari-pdf",
      en: "fill-and-sign-pdf-form",
    },
    title: {
      es: "Cómo rellenar y firmar un formulario PDF desde el navegador",
      ca: "Com omplir i signar un formulari PDF des del navegador",
      en: "How to Fill and Sign a PDF Form from Your Browser",
    },
    seoTitle: {
      es: "Rellenar y firmar un formulario PDF en el navegador | BreadPDF",
      ca: "Com omplir i signar un formulari PDF des del navegador | BreadPDF",
      en: "How to Fill and Sign a PDF Form in Your Browser | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a rellenar campos AcroForm, añadir una firma visual y revisar un formulario PDF antes de enviarlo. Incluye diferencias entre firma visual y digital.",
      ca: "Aprèn a omplir camps AcroForm, afegir una signatura visual i revisar un formulari PDF abans d'enviar-lo. Inclou diferències entre signatura visual i digital.",
      en: "Learn how to complete interactive AcroForm fields, stamp a visual signature, and inspect a PDF form before submission. Clarifies visual vs. digital certificates.",
    },
    image: {
      url: "https://breadpdf.com/rellenar-y-firmar-formulario-pdf.svg",
      alt: {
        es: "Diagrama del flujo para rellenar campos AcroForm y distinguir firma visual de firma basada en certificado digital",
        ca: "Diagrama del flux per omplir camps AcroForm i distingir signatura visual de signatura basada en certificat digital",
        en: "Workflow diagram for completing interactive AcroForm fields and distinguishing visual marks from cryptographic certificate signatures",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Tramitación Digital y Formularios PDF",
    },
    readingTimeMinutes: 6,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Qué es exactamente un formulario AcroForm?",
          a: "AcroForm es la arquitectura nativa del estándar PDF (ISO 32000) para formularios interactivos. Permite que el documento contenga campos de texto estructurados, casillas de selección, desplegables y botones de opción donde el usuario puede escribir directamente sin alterar la maquetación de fondo.",
        },
        {
          q: "¿Cómo sé si mi PDF tiene campos realmente rellenables?",
          a: "Haz clic con el ratón sobre un espacio en blanco de respuesta o sobre una casilla. Si el visor resalta el campo con un recuadro interactivo y permite escribir con el teclado o marcar un tic, se trata de un formulario activo. Si el cursor se comporta como en una foto y no puedes interactuar, es un documento plano no interactivo.",
        },
        {
          q: "¿Puedo rellenar un formulario PDF que está escaneado?",
          a: "No de forma automática como formulario. Un PDF escaneado es una imagen estática sin objetos de formulario interactivo. Para completarlo, deberás recurrir a una herramienta de edición para añadir cajas de texto manualmente o solicitar al emisor una copia digital con AcroForms activos.",
        },
        {
          q: "¿Qué tipos de campos interactivos admite BreadPDF?",
          a: "La herramienta 'Rellenar formulario PDF' de BreadPDF detecta y permite completar: campos de texto simple, cajas de texto multilínea, casillas de verificación (checkbox), botones de opción única (radio buttons) y menús desplegables (dropdown). No soporta formularios dinámicos propietarios basados en tecnología Adobe XFA.",
        },
        {
          q: "¿Una firma visual equivale a una firma digital con certificado?",
          a: "No. Una firma visual es una representación gráfica manuscrita o sello estampado sobre la página. Una firma digital cualificada o avanzada se basa en criptografía asimétrica de clave pública (PKI) y certificados electrónicos emitidos por prestadores de servicios de confianza (como FNMT o DNIe), vinculando la identidad del firmante e impidiendo cualquier modificación posterior del contenido.",
        },
        {
          q: "¿Puedo firmar un formulario oficial de la administración con BreadPDF?",
          a: "Depende estrictamente de los requisitos del organismo destinatario. Para solicitudes internas, autorizaciones escolares o acuerdos privados suele bastar una firma visual. Sin embargo, para trámites formales ante la Administración Pública o sedes electrónicas oficiales se exige habitualmente firma electrónica mediante certificado digital o pasarelas estatales (como AutoFirma o Cl@ve).",
        },
        {
          q: "¿Qué hace la función 'Aplanar PDF' tras completar un formulario?",
          a: "Aplanar (o 'flatten') consolida los campos interactivos completados y las anotaciones en texto e imágenes estáticas fijas en la página. Esto impide que otra persona modifique casualmente los valores en un visor convencional, aunque no sustituye a un bloqueo criptográfico formal.",
        },
        {
          q: "¿Puedo proteger el formulario con contraseña tras firmarlo?",
          a: "Sí. Puedes aplicar la herramienta 'Proteger PDF' para cifrar el archivo con una clave de apertura, impidiendo que personas no autorizadas puedan abrir y leer la información confidencial completada en el formulario.",
        },
      ],
      ca: [
        {
          q: "Què és exactament un formulari AcroForm?",
          a: "AcroForm és l'estàndard oficial de formularis interactius integrat a l'especificació PDF (ISO 32000). Permet incloure capses de text, caselles de selecció i menús desplegables sobre el document de manera que l'usuari pugui introduir dades directament.",
        },
        {
          q: "Com puc comprovar si el meu PDF conté camps editables?",
          a: "Fes clic a l'àrea d'una resposta o casella. Si el cursor canvia i et permet escriure text o marcar una opció, el document té camps interactius actius. Si només es comporta com una imatge estàtica, no conté estructura AcroForm.",
        },
        {
          q: "Puc omplir un formulari PDF que prové d'un escàner?",
          a: "No com a formulari dinàmic directe. Un PDF escanejat és una fotografia plana. Per omplir-lo, cal utilitzar una eina d'afegir text per superposar les dades o bé demanar a l'emissor una plantilla amb AcroForms nadius.",
        },
        {
          q: "Quins tipus de camps interactius admet BreadPDF?",
          a: "L'eina reconeix camps de text senzill, text multilínia, caselles de verificació (checkbox), botons d'opció (radio buttons) i desplegables (dropdown). No és compatible amb la tecnologia propietària Adobe XFA.",
        },
        {
          q: "Una signatura visual equival a una signatura digital amb certificat?",
          a: "No. La signatura visual és una rúbrica gràfica traçada sobre el full. La signatura electrònica avançada o qualificada es fonamenta en certificats digitals (PKI) emesos per autoritats de certificació oficials que garanteixen criptogràficament la identitat i la integritat del fitxer.",
        },
        {
          q: "Puc tramitar un formulari oficial d'una seu electrònica amb BreadPDF?",
          a: "Depèn de la normativa de cada administració. Per a consentiments o justificants privats una firma gràfica pot ser vàlida. No obstant això, els tràmits telemàtics oficials exigeixen gairebé sempre signatura amb certificat digital mitjançant aplicacions homologades.",
        },
        {
          q: "Què fa l'eina 'Aplanar PDF'?",
          a: "Consolida els camps interactius completats convertint-los en contingut estàtic permanent del document, evitant que els valors s'esborrin o es modifiquin fàcilment en visors estàndard.",
        },
        {
          q: "Puc protegir el document amb contrasenya després de signar-lo?",
          a: "Sí. Pots emprar l'eina 'Protegir PDF' per xifrar l'arxiu i exigir una clau d'accés per poder visualitzar el contingut emplenat.",
        },
      ],
      en: [
        {
          q: "What is an AcroForm PDF form?",
          a: "AcroForm is the native interactive form architecture specified in the ISO 32000 PDF standard. It embeds fillable text boxes, checkboxes, radio groups, and dropdowns directly into the document layout so users can supply data cleanly.",
        },
        {
          q: "How can I tell if my PDF form is truly fillable?",
          a: "Click inside a designated blank line or checkbox. If the reader displays an active blue border and accepts keyboard input, it contains native AcroForms. If the file behaves like a static graphic and will not accept typing, it is a flattened document.",
        },
        {
          q: "Can I fill out a scanned PDF form?",
          a: "Not as an automated form. A scanned PDF is a flat image without interactive field objects. To fill it, you must overlay text annotations manually or request an official digital AcroForm version from the sender.",
        },
        {
          q: "Which interactive field types does BreadPDF support?",
          a: "BreadPDF's 'Fill PDF Form' tool parses single-line text fields, multiline text areas, checkboxes, radio buttons, and dropdown selection menus. It does not support Adobe proprietary XFA dynamic architectures.",
        },
        {
          q: "Is a visual signature equivalent to a digital certificate signature?",
          a: "No. A visual signature is an electronic graphic mark (handwritten ink trace or stamp image) affixed to the page canvas. A qualified digital signature relies on asymmetric public-key cryptography (PKI) and trust certificates (X.509) to mathematically bind identity and prevent subsequent alterations.",
        },
        {
          q: "Can I use BreadPDF to sign an official government administrative filing?",
          a: "That depends on the receiving authority's formal requirements. For internal corporate consents, academic forms, or commercial templates, visual signatures are often sufficient. However, public administration portals typically mandate qualified digital certificates or official signing software.",
        },
        {
          q: "What does flattening a PDF form achieve?",
          a: "Flattening integrates active form entries and annotations into the permanent graphic stream of the PDF. This prevents casual tampering in basic PDF readers, though it does not provide cryptographic tamper-proofing.",
        },
        {
          q: "Can I password-protect the form after signing it?",
          a: "Yes. You can run the 'Protect PDF' tool to encrypt the completed file, ensuring unauthorized third parties cannot open or inspect the sensitive details entered into the form without the password.",
        },
      ],
    },
  },
  {
    canonicalSlug: "que-es-pdfa-cuando-convertir",
    slugs: {
      es: "que-es-pdfa-cuando-convertir",
      ca: "que-es-pdfa-quan-convertir",
      en: "what-is-pdf-a-and-when-to-use-it",
    },
    title: {
      es: "Qué es PDF/A y cuándo necesitas convertir un PDF a PDF/A",
      ca: "Què és PDF/A i quan necessites convertir un PDF a PDF/A",
      en: "What Is PDF/A and When Do You Need to Convert a PDF to PDF/A",
    },
    seoTitle: {
      es: "Qué es PDF/A y cuándo convertir un PDF a PDF/A | BreadPDF",
      ca: "Què és PDF/A i quan convertir un PDF a PDF/A | BreadPDF",
      en: "What Is PDF/A and When to Convert a PDF to PDF/A | BreadPDF",
    },
    seoDescription: {
      es: "Descubre qué es PDF/A, en qué se diferencia de un PDF normal y cuándo puede ser necesario convertir un documento para archivo y conservación digital.",
      ca: "Descobreix què és PDF/A, en què es diferencia d'un PDF normal i quan pot ser necessari convertir un document per a arxiu i conservació digital.",
      en: "Discover what PDF/A is, how it differs from a standard PDF, and when you may need to convert a document for digital archiving and long-term preservation.",
    },
    image: {
      url: "https://breadpdf.com/que-es-pdfa-cuando-convertir.svg",
      alt: {
        es: "Diagrama de flujo entre PDF estándar, requisitos de archivo, conversión estructural PDF/A y validación",
        ca: "Diagrama de flux entre PDF estàndard, requisits d'arxiu, conversió estructural PDF/A i validació",
        en: "Workflow diagram comparing standard PDF, archiving specifications, structural PDF/A conversion, and validation",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 8,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Qué significa PDF/A?",
          a: "PDF/A (Portable Document Format for Archiving) es un conjunto de especificaciones estandarizadas por ISO (como ISO 19005-1 e ISO 19005-2) diseñado para garantizar que los documentos electrónicos puedan visualizarse y reproducirse con exactitud visual idéntica a lo largo de décadas.",
        },
        {
          q: "¿Para qué sirve PDF/A?",
          a: "Sirve para eliminar dependencias técnicas externas (como fuentes no incrustadas, scripts interactivos, contenidos multimedia o referencias de red) que podrían provocar que un documento no se abra o se muestre alterado en el futuro.",
        },
        {
          q: "¿Es lo mismo un PDF que un PDF/A?",
          a: "No. Todo PDF/A es un archivo PDF, pero restringe deliberadamente ciertas funciones del PDF convencional. Prohíbe el código JavaScript ejecutable, el cifrado con contraseña, el audio/vídeo incrustado y exige que todas las fuentes tipográficas y perfiles de color estén integrados de forma autosuficiente.",
        },
        {
          q: "¿PDF/A es obligatorio para todos los documentos?",
          a: "No necesariamente. Para el intercambio diario de archivos entre particulares, presupuestos provisionales o borradores de trabajo, un PDF convencional es idóneo y suficiente. El formato PDF/A solo debe emplearse cuando un procedimiento administrativo, un repositorio documental o una normativa institucional lo solicite expresamente.",
        },
        {
          q: "¿Qué diferencia hay entre PDF/A-1 y PDF/A-2?",
          a: "PDF/A-1 (ISO 19005-1:2005) está basado en PDF 1.4 y prohíbe transparencias o archivos adjuntos. PDF/A-2 (ISO 19005-2:2011) se basa en PDF 1.7 (ISO 32000-1) y admite compresión JPEG 2000, capas visuales opcionales, transparencias y permite adjuntar otros archivos que también cumplan la especificación PDF/A.",
        },
        {
          q: "¿Convertir a PDF/A garantiza que una administración acepte el archivo?",
          a: "No de forma automática. La conversión en BreadPDF estandariza la estructura binaria e inyecta metadatos canónicos de archivo. Sin embargo, cada registro, juzgado o sede electrónica puede exigir perfiles concretos (ej. PDF/A-1b o PDF/A-2u) y someter el fichero a validadores estrictos específicos antes de admitirlo a trámite.",
        },
        {
          q: "¿PDF/A protege el documento con contraseña?",
          a: "No. De hecho, el estándar PDF/A prohíbe estrictamente el cifrado con contraseña porque impediría que los sistemas de archivo automatizados lean o auditen el contenido a largo plazo. Para poner clave a un PDF se debe utilizar la herramienta 'Proteger PDF', la cual es incompatible con los perfiles estrictos de PDF/A.",
        },
        {
          q: "¿Cómo puedo comprobar si un PDF cumple PDF/A?",
          a: "Puedes abrir el archivo en visores avanzados (como Adobe Acrobat Reader, que muestra un banner azul indicando 'Este archivo cumple con la norma PDF/A') o utilizar herramientas de validación de conformidad especializadas como el motor de código abierto VeraPDF.",
        },
      ],
      ca: [
        {
          q: "Què significa PDF/A?",
          a: "PDF/A (Portable Document Format for Archiving) és una família d'especificacions estandarditzades per l'ISO (com ISO 19005-1 i ISO 19005-2) dissenyada per garantir que els documents electrònics puguin visualitzar-se i reproduir-se amb exactitud visual idèntica al llarg de dècades.",
        },
        {
          q: "Per a què serveix PDF/A?",
          a: "Serveix per suprimir dependències tècniques externes (com tipografies no incrustades, codi dinàmic, elements multimèdia o enllaços de xarxa) que podrien impedir que el document s'obri correctament en el futur.",
        },
        {
          q: "És el mateix un PDF que un PDF/A?",
          a: "No. Tot fitxer PDF/A és un PDF, però restringeix expressament determinades funcions del PDF convencional. Prohibeix scripts JavaScript, xifratge amb contrasenya, àudio o vídeo incrustat, i exigeix que totes les fonts i perfils de color estiguin integrats de manera autosuficient.",
        },
        {
          q: "PDF/A és obligatori per a tots els documents?",
          a: "No necessàriament. Per a l'ús diari corporatiu, factures provisionals o esborranys, el PDF convencional és plenament adequat. El format PDF/A només cal utilitzar-lo quan un procediment judicial, un registre administratiu o una política institucional d'arxiu ho exigeixi.",
        },
        {
          q: "Quina diferència hi ha entre PDF/A-1 i PDF/A-2?",
          a: "PDF/A-1 (ISO 19005-1:2005) es basa en PDF 1.4 i no admet transparències ni adjunts. PDF/A-2 (ISO 19005-2:2011) es fonamenta en PDF 1.7 i incorpora compatibilitat amb compressió JPEG 2000, capes i la possibilitat d'incrustar altres documents que també compleixin PDF/A.",
        },
        {
          q: "Convertir a PDF/A garanteix que una administració accepti l'arxiu?",
          a: "No de forma automàtica. La conversió a BreadPDF adapta l'estructura i incorpora les metadades canòniques d'arxiu. No obstant això, cada organisme públic pot aplicar validadors particulars o requerir nivells de conformitat específics (com PDF/A-1b o PDF/A-2u).",
        },
        {
          q: "PDF/A protegeix el document amb contrasenya?",
          a: "No. L'estàndard PDF/A prohibeix expressament el xifratge amb contrasenya perquè bloquejaria l'accés dels sistemes d'arxiu a llarg termini. Per aplicar una clau d'accés cal fer servir l'eina 'Protegir PDF', la qual és incompatible amb PDF/A estricte.",
        },
        {
          q: "Com puc comprovar si un PDF compleix PDF/A?",
          a: "Pots obrir el document en visors compatibles com Adobe Acrobat (que notifica amb una barra superior que el fitxer està en mode PDF/A) o emprar motors de validació formal de codi obert com VeraPDF.",
        },
      ],
      en: [
        {
          q: "What does PDF/A stand for?",
          a: "PDF/A (Portable Document Format for Archiving) is an ISO-standardized family of specifications (such as ISO 19005-1 and ISO 19005-2) designed to preserve electronic documents with visual and functional fidelity over extended periods.",
        },
        {
          q: "What is the primary purpose of PDF/A?",
          a: "Its goal is to eliminate volatile external dependencies—such as un-embedded fonts, executable scripts, dynamic media streams, or remote hyperlinks—that could cause a file to render incorrectly or become unreadable over time.",
        },
        {
          q: "Is a regular PDF the same as a PDF/A?",
          a: "No. While every PDF/A file is technically a PDF, it enforces strict prohibitions on features allowed in standard PDFs. It bans JavaScript, password encryption, embedded audio/video, and mandates full embedding of fonts and device-independent color spaces.",
        },
        {
          q: "Is PDF/A mandatory for all digital documents?",
          a: "Not necessarily. For routine day-to-day sharing, drafts, or general office collaboration, a standard PDF is perfectly sufficient. PDF/A should be chosen when a court filing, government repository, public tender, or institutional record-keeping policy explicitly requires it.",
        },
        {
          q: "What is the difference between PDF/A-1 and PDF/A-2?",
          a: "PDF/A-1 (ISO 19005-1:2005) is based on PDF 1.4 and forbids transparency and external attachments. PDF/A-2 (ISO 19005-2:2011) builds on PDF 1.7 (ISO 32000-1), adding support for JPEG 2000 compression, transparent graphics layers, and embedded sub-documents that also satisfy PDF/A standards.",
        },
        {
          q: "Does converting to PDF/A guarantee institutional acceptance?",
          a: "No. Conversion in BreadPDF structurally prepares the document and embeds normative archive metadata. However, public agencies and court portals frequently run proprietary or strict automated validators and may mandate specific compliance profiles (such as PDF/A-1b or PDF/A-2u).",
        },
        {
          q: "Does PDF/A password-protect the document?",
          a: "No. In fact, password encryption is explicitly prohibited in PDF/A because access restrictions hinder automated long-term indexing and archival retrieval. To apply passwords, use the 'Protect PDF' tool instead.",
        },
        {
          q: "How can I verify if a file complies with PDF/A?",
          a: "Open the file in compliant readers like Adobe Acrobat Reader (which displays a distinctive blue notification bar stating 'This file conforms to the PDF/A standard') or utilize dedicated conformance test suites like VeraPDF.",
        },
      ],
    },
  },
  {
    canonicalSlug: "subir-archivos-grandes-wordpress-woocommerce",
    slugs: {
      es: "subir-archivos-grandes-wordpress-woocommerce",
      ca: "pujar-fitxers-grans-wordpress-woocommerce",
      en: "upload-large-files-to-wordpress-woocommerce",
    },
    title: {
      es: "Cómo solucionar problemas al subir archivos grandes a WordPress y WooCommerce",
      ca: "Com solucionar problemes en pujar fitxers grans a WordPress i WooCommerce",
      en: "How to Fix Large File Upload Issues in WordPress and WooCommerce",
    },
    seoTitle: {
      es: "Subir archivos grandes a WordPress y WooCommerce | BreadPDF",
      ca: "Pujar fitxers grans a WordPress i WooCommerce | BreadPDF",
      en: "Upload Large Files to WordPress & WooCommerce | BreadPDF",
    },
    seoDescription: {
      es: "Descubre por qué WordPress puede rechazar archivos grandes, dónde comprobar el límite real y cómo reducir PDFs o imágenes antes de volver a subirlos.",
      ca: "Descobreix per què WordPress pot rebutjar fitxers grans, on comprovar el límit real i com reduir PDFs o imatges abans de tornar-los a pujar.",
      en: "Learn why WordPress rejects large files, where to verify your real upload ceiling, and how to optimize PDFs or images before retrying your upload.",
    },
    image: {
      url: "https://breadpdf.com/subir-archivos-grandes-wordpress-woocommerce.svg",
      alt: {
        es: "Diagrama de diagnóstico para errores de subida de archivos en WordPress y WooCommerce",
        ca: "Diagrama de diagnòstic per a errors de pujada de fitxers a WordPress i WooCommerce",
        en: "Diagnostic workflow diagram for large file upload failures in WordPress and WooCommerce",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 7,
    category: "ecommerce",
    faqs: {
      es: [
        {
          q: "¿Cuál es el tamaño máximo de subida de WordPress?",
          a: "WordPress no tiene un tamaño máximo de subida universal prefijado. El límite visible en la Biblioteca de medios está determinado por la configuración de PHP del servidor (especialmente 'upload_max_filesize' y 'post_max_size'), las políticas del proveedor de hosting, posibles cuotas del sitio y las reglas del servidor web.",
        },
        {
          q: "¿Dónde puedo ver el límite de subida real de mi WordPress?",
          a: "Puedes consultarlo de forma oficial desde el panel de administración en Herramientas → Salud del sitio → Pestaña Información → Sección Medios (o sección Servidor). Allí se detalla el 'Tamaño máximo de subida de archivos' y el 'Tamaño máximo de POST'.",
        },
        {
          q: "¿Qué diferencia hay entre upload_max_filesize y post_max_size?",
          a: "'upload_max_filesize' fija el peso máximo que puede tener un único archivo individual adjunto en una petición HTTP. 'post_max_size' determina el volumen total máximo de toda la solicitud POST (incluyendo todos los archivos subidos juntos, campos de texto y cabeceras). Por ello, 'post_max_size' debe ser siempre igual o superior a 'upload_max_filesize'.",
        },
        {
          q: "¿WooCommerce tiene un límite de archivo propio?",
          a: "No. WooCommerce se ejecuta sobre la arquitectura de WordPress y utiliza el mismo sistema de medios y configuración de servidor para la subida de imágenes de producto, galerías o ficheros descargables. Sin embargo, en productos descargables, si los archivos son extremadamente grandes, la documentación oficial recomienda servirlos mediante métodos de redirección o enlaces externos para evitar bloqueos por tiempo de ejecución de PHP.",
        },
        {
          q: "¿Por qué WordPress muestra 'HTTP error' durante la subida?",
          a: "'HTTP error' es un síntoma genérico que indica que el servidor no pudo completar la petición de subida. Las causas frecuentes abarcan desde agotar el límite de memoria de PHP ('memory_limit') durante el reescalado de imágenes pesadas, timeouts de conexión, bloqueos del firewall de aplicaciones web (WAF / Cloudflare), hasta permisos de escritura incorrectos en la carpeta 'wp-content/uploads'.",
        },
        {
          q: "¿Reducir una imagen puede solucionar el problema?",
          a: "Sí, cuando el motivo del fallo es que la imagen excede el límite de PHP o satura la memoria del servidor al generar las miniaturas automáticas. Convertir fotos pesadas de cámara a formato WebP o redimensionar imágenes de 4000px a dimensiones web estándar suele resolver el error al instante.",
        },
        {
          q: "¿Comprimir un PDF puede ayudar con la subida a WordPress?",
          a: "Sí. Si estás subiendo un catálogo de productos, manual técnico o informe en PDF que supera los megabytes permitidos por el hosting, comprimir el archivo reduce el volumen de datos de transferencia y permite que el servidor lo procese sin sobrepasar el umbral de subida.",
        },
        {
          q: "¿Qué hago si el archivo es pequeño y sigue fallando la subida?",
          a: "Si un archivo de apenas 200 KB falla con un error de subida, el tamaño no es la causa. Debes revisar los permisos de directorios en el servidor (normalmente 755 para carpetas de uploads), descartar bloqueos de seguridad del CDN/WAF, desactivar temporalmente plugins de optimización o seguridad conflictivos y consultar los logs de errores de PHP en el panel del hosting.",
        },
      ],
      ca: [
        {
          q: "Quin és el límit màxim de pujada de WordPress?",
          a: "WordPress no disposa d'un límit universal preestablert. La xifra indicada a la Biblioteca de mitjans està determinada per la configuració de PHP del servidor (sobretot 'upload_max_filesize' i 'post_max_size'), les polítiques del proveïdor de hosting i el servidor web.",
        },
        {
          q: "On puc consultar el límit de pujada del meu lloc?",
          a: "Pots verificar-ho oficialment des del tauler a Eines → Salut del lloc → Pestanya Informació → Secció Mitjans / Servidor, on s'indica clarament la mida màxima de pujada i el límit de POST.",
        },
        {
          q: "Quina diferència hi ha entre upload_max_filesize i post_max_size?",
          a: "'upload_max_filesize' és el pes màxim permès per a un sol fitxer. 'post_max_size' és el volum màxim admès per a tota la petició HTTP POST en conjunt. Perquè la càrrega funcioni, 'post_max_size' ha de ser igual o superior a 'upload_max_filesize'.",
        },
        {
          q: "WooCommerce té un límit propi de fitxers?",
          a: "No. WooCommerce empra la mateixa infraestructura de fitxers i mitjans de WordPress. Per a productes descarregables molt pesats, la documentació de WooCommerce aconsella utilitzar enllaços de descàrrega directa o redirecció per no saturar la memòria del servidor.",
        },
        {
          q: "Per què WordPress mostra l'avís 'HTTP error' en pujar arxius?",
          a: "És un missatge genèric que indica que la petició no ha acabat satisfactòriament. Les causes més habituals són la manca de memòria PHP durant el processament de miniatures, talls de temps (timeouts), permisos incorrectes o restriccions de tallafocs WAF.",
        },
        {
          q: "Reduir una imatge pot resoldre l'avís?",
          a: "Sí, si el motiu és l'excés de mida en megabytes o unes dimensions en píxels excessivament altes que saturen el mòdul de tractament d'imatges del servidor. Convertir a WebP i ajustar les dimensions sol resoldre la incidència.",
        },
        {
          q: "Comprimir un PDF ajuda a la pujada?",
          a: "Sí. Si intentes pujar un catàleg o document PDF que sobrepassa la quota del servidor, aplicar compressió permet situar el document per sota del sostre de càrrega.",
        },
        {
          q: "Què puc fer si el fitxer és petit i continua fallant?",
          a: "Quan un fitxer molt lleuger no es pot pujar, el problema no és la mida. Cal revisar permisos de carpetes a 'wp-content/uploads' (recomanat 755), regles de seguretat de CDN o possibles conflictes de connectors.",
        },
      ],
      en: [
        {
          q: "What is the universal maximum upload size in WordPress?",
          a: "WordPress does not have a single universal upload limit. The upload ceiling displayed in the Media Library is governed by the server's PHP directives ('upload_max_filesize' and 'post_max_size'), web server settings (like Nginx 'client_max_body_size'), and hosting account quotas.",
        },
        {
          q: "Where can I check the actual upload limit in WordPress?",
          a: "Navigate to Tools → Site Health → Info tab → Media section (or Server section). WordPress officially reports both the 'Max effective upload size' and the 'PHP post_max_size'.",
        },
        {
          q: "What is the difference between upload_max_filesize and post_max_size?",
          a: "'upload_max_filesize' sets the maximum binary weight of a single uploaded file. 'post_max_size' defines the ceiling for the entire HTTP POST request body. Therefore, 'post_max_size' must always be equal to or larger than 'upload_max_filesize'.",
        },
        {
          q: "Does WooCommerce impose a separate file limit?",
          a: "No. WooCommerce relies on the underlying WordPress media architecture and server PHP execution environment. For large downloadable products, official WooCommerce documentation suggests using redirect or external storage methods rather than direct PHP uploads.",
        },
        {
          q: "Why does WordPress display a generic 'HTTP error' during upload?",
          a: "'HTTP error' is an umbrella symptom indicating that the server could not finalize the upload transaction. Common culprits include PHP memory exhaustion during thumbnail generation, gateway timeouts, cloud firewall (WAF) blocks, or restrictive file system permissions on 'wp-content/uploads'.",
        },
        {
          q: "Can resizing or optimizing an image resolve the error?",
          a: "Yes. When the failure is triggered by high-resolution photos that exceed PHP memory while generating thumbnail crops, converting to modern WebP and scaling to realistic web dimensions immediately bypasses server constraints.",
        },
        {
          q: "Does compressing a PDF help with WordPress uploads?",
          a: "Yes. Compressing a product brochure, technical datasheet, or corporate document brings the payload safely below your host's maximum POST limit without sacrificing readability.",
        },
        {
          q: "What should I investigate if a tiny file also fails to upload?",
          a: "If a 200 KB test file fails, file weight is not the root cause. Inspect file permissions on 'wp-content/uploads' (standard is 755 for folders), check web application firewall (WAF) logs, temporarily disable conflicting image optimization plugins, and review server PHP error logs.",
        },
      ],
    },
  },
  {
    canonicalSlug: "eliminar-paginas-en-blanco-pdf-escaneado",
    slugs: {
      es: "eliminar-paginas-en-blanco-pdf-escaneado",
      ca: "eliminar-pagines-en-blanc-pdf-escanejat",
      en: "remove-blank-pages-from-scanned-pdf",
    },
    title: {
      es: "Cómo eliminar páginas en blanco de un PDF escaneado a doble cara",
      ca: "Com eliminar pàgines en blanc d'un PDF escanejat a doble cara",
      en: "How to Remove Blank Pages from a Double-Sided Scanned PDF",
    },
    seoTitle: {
      es: "Cómo eliminar páginas en blanco de un PDF escaneado | BreadPDF",
      ca: "Com eliminar pàgines en blanc d'un PDF escanejat | BreadPDF",
      en: "How to Remove Blank Pages from a Scanned PDF | BreadPDF",
    },
    seoDescription: {
      es: "Aprende a detectar y eliminar páginas en blanco de un PDF escaneado, ajustar la sensibilidad y revisar el resultado antes de aplicar OCR o compartirlo.",
      ca: "Aprèn a detectar i eliminar pàgines en blanc d'un PDF escanejat, ajustar la sensibilitat i revisar el resultat abans d'aplicar OCR o compartir-lo.",
      en: "Learn how to detect and remove blank pages from scanned PDFs, configure sensitivity thresholds, and audit outputs before applying OCR or sharing.",
    },
    image: {
      url: "https://breadpdf.com/eliminar-paginas-en-blanco-pdf-escaneado.svg",
      alt: {
        es: "Diagrama de detección y eliminación de páginas en blanco en PDF escaneado con alimentador dúplex",
        ca: "Diagrama de detecció i eliminació de pàgines en blanc en PDF escanejat amb alimentador dúplex",
        en: "Workflow diagram illustrating blank page detection and removal in duplex scanned PDFs",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-09-17",
    modifiedDate: "2026-09-17",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 6,
    category: "educacion",
    faqs: {
      es: [
        {
          q: "¿Por qué aparecen páginas en blanco al escanear a doble cara?",
          a: "Aparecen cuando se utiliza el alimentador automático de documentos (ADF) en modo dúplex para digitalizar un fajo que contiene hojas impresas únicamente por el anverso. El sensor del escáner captura mecánicamente el reverso de cada hoja, generando una página vacía por cada cara en blanco física.",
        },
        {
          q: "¿Cómo detecta BreadPDF una página en blanco?",
          a: "BreadPDF renderiza cada página en memoria mediante un canvas interno y analiza la densidad cromática de sus píxeles. Si el porcentaje de píxeles con valores de luminosidad casi blanca (RGB superior a 240) supera el umbral configurado (por ejemplo, el 97%), la página se clasifica como candidata a eliminación.",
        },
        {
          q: "¿Puedo ajustar la sensibilidad de la detección?",
          a: "Sí. La herramienta permite definir el umbral porcentual de tolerancia. Un umbral más alto (ej. 99%) es más estricto y solo eliminará páginas totalmente limpias. Un umbral ligeramente menor (ej. 95%) permite tolerar motas de polvo del cristal del escáner o ligeras sombras de plegado.",
        },
        {
          q: "¿Qué pasa si una página tiene una marca pequeña o un sello tenue?",
          a: "Si la marca ocupa una superficie de píxeles muy reducida respecto al lienzo total, un umbral excesivamente bajo podría confundirla con una página blanca. Por ello, en documentos notariales, registros oficiales o contratos con sellos periféricos tenues, se recomienda una sensibilidad conservadora y una revisión humana.",
        },
        {
          q: "¿Se puede eliminar una página que no está completamente vacía?",
          a: "Para eliminar páginas que contienen texto, portadas intermedias o anexos prescindibles que no están en blanco, no se debe utilizar la detección automática. Para esos casos, se debe emplear la herramienta 'Eliminar páginas PDF', que permite marcar manualmente los números de página exactos a suprimir.",
        },
        {
          q: "¿Es mejor eliminar páginas en blanco antes de aplicar OCR?",
          a: "En la mayoría de flujos de trabajo de digitalización, sí. Purgar las páginas vacías antes de procesar el OCR reduce a la mitad el tiempo de reconocimiento óptico, evita saturar el motor con páginas sin texto y deja un documento final más ordenado para búsquedas con Ctrl+F.",
        },
        {
          q: "¿Eliminar páginas en blanco reduce el tamaño del PDF?",
          a: "Sí, porque se eliminan los flujos de objetos de página y las imágenes escaneadas completas asociadas a esos reversos. La reducción proporcional exacta dependerá de la resolución a la que se digitalizó el documento.",
        },
        {
          q: "¿Cómo puedo recuperar una página eliminada por error?",
          a: "BreadPDF procesa los documentos en tu navegador y genera un archivo nuevo descargable sin alterar tu PDF original del disco. Si tras la revisión detectas que se eliminó una hoja importante, simplemente conserva el PDF original intacto y vuelve a procesarlo ajustando el umbral o eliminando páginas de forma manual.",
        },
      ],
      ca: [
        {
          q: "Per què apareixen pàgines en blanc en escanejar a doble cara?",
          a: "Es produeix quan es fa servir l'alimentador automàtic (ADF) en mode dúplex per digitalitzar un feix de fulls impresos només per una cara. L'escàner captura de manera automatitzada el revers de cada full, afegint pàgines buides al document final.",
        },
        {
          q: "Com detecta BreadPDF una pàgina en blanc?",
          a: "BreadPDF renderitza cada pàgina a la memòria local mitjançant un canvas intern i n'examina la distribució de píxels. Si el percentatge de píxels clarament blancs supera el llindar establert (per defecte el 97%), la pàgina es classifica com a buida.",
        },
        {
          q: "Es pot ajustar la sensibilitat de detecció?",
          a: "Sí. Pots regular el llindar de tolerància. Un valor més elevat (99%) és exigent i només suprimeix pàgines pures; un valor més flexible (95%) tolera petites ombres o pols del vidre de l'escàner.",
        },
        {
          q: "Què passa si una pàgina té una petita marca o un segell tènue?",
          a: "Si la marca ocupa molt pocs píxels en proporció al total de la pàgina, un llindar massa tolerant podria eliminar-la per error. Per això, en documents oficials és indispensable fer una revisió visual del resultat.",
        },
        {
          q: "Puc eliminar una pàgina que no estigui en blanc?",
          a: "Per esborrar fulls concrets que contenen text o cobertes secundàries, cal emprar l'eina 'Eliminar pàgines PDF', que permet seleccionar manualment qualsevol pàgina del document.",
        },
        {
          q: "És convenient suprimir pàgines en blanc abans de fer OCR?",
          a: "Generalment sí. Netejar els reversos buits redueix el temps de computació de l'OCR a la meitat, evita càlculs innecessaris i produeix un PDF final més àgil per a la cerca de text.",
        },
        {
          q: "Eliminar pàgines en blanc redueix el pes del fitxer?",
          a: "Sí. En prescindir de la imatge escanejada sencera corresponent a cada revers, el volum d'octets del fitxer disminueix de manera directa.",
        },
        {
          q: "Com puc recuperar una pàgina si s'ha suprimit per error?",
          a: "Com que BreadPDF genera un nou document i no sobreescriu el fitxer del teu disc, el document original es conserva sempre intacte per tornar a provar amb un llindar més estricte.",
        },
      ],
      en: [
        {
          q: "Why do blank pages appear when scanning double-sided documents?",
          a: "This happens when using an Automatic Document Feeder (ADF) in duplex mode on a stack containing single-sided sheets. The scanner's dual imaging sensors mechanically digitize both sides of every leaf, resulting in blank pages for unprinted reverses.",
        },
        {
          q: "How does BreadPDF detect a blank page?",
          a: "BreadPDF renders each page into an in-memory HTML5 canvas and measures the luminance distribution of its pixel buffer. If the ratio of near-white pixels (RGB values > 240) meets or exceeds your selected threshold (e.g. 97%), the page is earmarked as blank.",
        },
        {
          q: "Can I fine-tune the detection sensitivity?",
          a: "Yes. You can adjust the percentage threshold. A high threshold (99%) ensures only mathematically immaculate pages are purged, while a slightly lower setting (95%) forgives scanner glass dust specks, staple shadows, or minor bleed-through.",
        },
        {
          q: "What happens if a page contains a tiny smudge or faint rubber stamp?",
          a: "Because a tiny stamp represents a minute fraction of the overall pixel surface, an overly aggressive sensitivity setting might classify it as blank. For official legal, notarial, or archival files, manual visual auditing is mandatory.",
        },
        {
          q: "Can I remove a page that is not blank?",
          a: "To delete non-blank pages (such as blank-looking divider title sheets, appendices, or superseded drafts), use the dedicated 'Delete PDF Pages' tool, which allows explicit page-by-page manual selection.",
        },
        {
          q: "Should blank pages be removed before applying OCR?",
          a: "In standard document archiving pipelines, yes. Purging vacant pages prior to running Optical Character Recognition cuts processing time significantly, avoids OCR engine timeouts on noisy blank canvases, and produces cleaner searchable archives.",
        },
        {
          q: "Does purging blank pages reduce PDF file size?",
          a: "Yes. In scanned documents, every page is a full-bleed raster image. Stripping away unwanted reverse scans discards those large image payloads directly from the PDF file.",
        },
        {
          q: "How can I restore a page removed by mistake?",
          a: "BreadPDF processes documents non-destructively in client memory and generates a new output file. Your original master file on your disk remains completely untouched, allowing you to re-process with a more conservative threshold.",
        },
      ],
    },
  },
  {
    canonicalSlug: "convertir-pdf-a-word-editable",
    slugs: {
      es: "convertir-pdf-a-word-editable",
      ca: "passar-pdf-a-word-editable",
      en: "convert-pdf-to-editable-word",
    },
    title: {
      es: "Cómo convertir un PDF a Word editable (y qué se conserva)",
      ca: "Com convertir un PDF a Word editable (i què es conserva)",
      en: "How to Convert a PDF to Editable Word (and What Is Preserved)",
    },
    seoTitle: {
      es: "Convertir PDF a Word editable: qué conserva | BreadPDF",
      ca: "Convertir PDF a Word editable: què conserva | BreadPDF",
      en: "Convert PDF to Editable Word: What Is Preserved | BreadPDF",
    },
    seoDescription: {
      es: "Convierte un PDF a Word editable en el navegador. Te explicamos qué conserva el conversor (texto, líneas y orden) y qué no (imágenes, fuentes y diseño).",
      ca: "Converteix un PDF a Word editable al navegador. T'expliquem què conserva el conversor (text, línies i ordre) i què no (imatges, tipografies i disseny).",
      en: "Convert a PDF to editable Word in your browser. See what the converter keeps (text, lines, order) and what it does not (images, fonts, layout).",
    },
    image: {
      url: "https://breadpdf.com/convertir-pdf-a-word-editable.svg",
      alt: {
        es: "Diagrama del flujo de conversión de PDF a DOCX: extracción de texto por líneas, marcadores de página y límites de fidelidad",
        ca: "Diagrama del flux de conversió de PDF a DOCX: extracció de text per línies, marcadors de pàgina i límits de fidelitat",
        en: "PDF to DOCX conversion workflow: line-based text extraction, page markers, and fidelity limits",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-10-28",
    modifiedDate: "2026-10-28",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Documentación Digital y Optimización Web",
    },
    readingTimeMinutes: 8,
    category: "tecnica",
    faqs: {
      es: [
        {
          q: "¿Qué se conserva exactamente al convertir un PDF a Word?",
          a: "Se conserva el texto seleccionable, agrupado por líneas visuales y ordenado de arriba abajo y de izquierda a derecha dentro de cada página. Cada página del PDF se separa con un marcador '--- Página N ---'. El resultado es un .docx editable, pero no una réplica del diseño original.",
        },
        {
          q: "¿Se conservan las imágenes, los colores y el diseño?",
          a: "No. El conversor extrae únicamente la capa de texto. Las imágenes, los fondos, los bordes, las tablas dibujadas como gráficos y la posición exacta de cada bloque no se trasladan al documento Word, que se genera con un estilo uniforme de 12 puntos.",
        },
        {
          q: "¿Funciona con PDF escaneados o fotografías de documentos?",
          a: "No directamente. Un escaneo no contiene texto digital, sino una imagen. Primero hay que aplicar OCR con la herramienta 'OCR de PDF' para generar una capa de texto y, después, convertir ese PDF resultante a Word.",
        },
        {
          q: "¿El archivo .docx se abre en Word, LibreOffice y Google Docs?",
          a: "Sí. Se genera un documento estándar .docx compatible con Microsoft Word, LibreOffice Writer y Google Docs. Al abrirlo, puedes aplicar estilos, cambiar tipografías, crear tablas reales y reorganizar el contenido.",
        },
        {
          q: "¿Qué son los marcadores '--- Página N ---'?",
          a: "Son párrafos en cursiva y gris que el conversor inserta al principio de cada página para que puedas localizar el texto original. Si no los necesitas en la versión final, búscalos y elimínalos en Word antes de compartir el documento.",
        },
        {
          q: "¿Puedo elegir la fuente o el tamaño de letra durante la conversión?",
          a: "No. La conversión genera todo el texto con el mismo tamaño base para no inventar jerarquías que el PDF no declara de forma fiable. Después, en Word, puedes seleccionar títulos y párrafos y aplicar los estilos que necesites.",
        },
        {
          q: "¿Se sube mi PDF a algún servidor?",
          a: "No. La conversión se ejecuta en la memoria del navegador con el archivo que tú seleccionas. BreadPDF no envía el documento a un servidor para procesarlo, por lo que el contenido no se almacena en la nube.",
        },
      ],
      ca: [
        {
          q: "Què es conserva exactament en convertir un PDF a Word?",
          a: "Es conserva el text seleccionable, agrupat per línies visuals i ordenat de dalt a baix i d'esquerra a dreta dins de cada pàgina. Cada pàgina del PDF se separa amb un marcador '--- Página N ---'. El resultat és un .docx editable, però no una rèplica del disseny original.",
        },
        {
          q: "Es conserven les imatges, els colors i el disseny?",
          a: "No. El conversor extreu només la capa de text. Les imatges, els fons, les vores, les taules dibuixades com a gràfics i la posició exacta de cada bloc no passen al document Word, que es genera amb un estil uniforme de 12 punts.",
        },
        {
          q: "Funciona amb PDF escanejats o fotografies de documents?",
          a: "No directament. Un escaneig no conté text digital, sinó una imatge. Primer cal aplicar OCR amb l'eina 'OCR de PDF' per generar una capa de text i, després, convertir aquest PDF resultant a Word.",
        },
        {
          q: "El fitxer .docx s'obre a Word, LibreOffice i Google Docs?",
          a: "Sí. Es genera un document estàndard .docx compatible amb Microsoft Word, LibreOffice Writer i Google Docs. En obrir-lo, pots aplicar estils, canviar tipografies, crear taules reals i reorganitzar el contingut.",
        },
        {
          q: "Què són els marcadors '--- Página N ---'?",
          a: "Són paràgrafs en cursiva i grisos que el conversor insereix a l'inici de cada pàgina perquè puguis localitzar el text original. Si no els necessites a la versió final, cerca'ls i elimina'ls a Word abans de compartir el document.",
        },
        {
          q: "Puc triar la font o la mida de lletra durant la conversió?",
          a: "No. La conversió genera tot el text amb la mateixa mida base per no inventar jerarquies que el PDF no declara de manera fiable. Després, a Word, pots seleccionar títols i paràgrafs i aplicar-hi els estils que calgui.",
        },
        {
          q: "Es puja el meu PDF a algun servidor?",
          a: "No. La conversió s'executa a la memòria del navegador amb el fitxer que tu selecciones. BreadPDF no envia el document a un servidor per processar-lo, així que el contingut no s'emmagatzema al núvol.",
        },
      ],
      en: [
        {
          q: "What exactly is preserved when converting a PDF to Word?",
          a: "Selectable text is preserved, grouped into visual lines and ordered top to bottom, left to right within each page. Every PDF page is separated by a '--- Página N ---' marker. The output is an editable .docx, not a replica of the original layout.",
        },
        {
          q: "Are images, colors, and layout preserved?",
          a: "No. The converter extracts only the text layer. Images, backgrounds, borders, tables drawn as graphics, and the exact position of each block are not carried into the Word document, which is generated with a uniform 12-point style.",
        },
        {
          q: "Does it work with scanned PDFs or photos of documents?",
          a: "Not directly. A scan contains an image, not digital text. First run OCR with the 'OCR PDF' tool to create a text layer, then convert that resulting PDF to Word.",
        },
        {
          q: "Does the .docx open in Word, LibreOffice, and Google Docs?",
          a: "Yes. The tool produces a standard .docx file compatible with Microsoft Word, LibreOffice Writer, and Google Docs. Once open, you can apply styles, change fonts, build real tables, and reorganize the content.",
        },
        {
          q: "What are the '--- Página N ---' markers?",
          a: "They are italic gray paragraphs the converter inserts at the start of each page so you can trace text back to its source. If you do not need them in the final version, search for them and delete them in Word before sharing.",
        },
        {
          q: "Can I choose the font or font size during conversion?",
          a: "No. Conversion applies the same base size to all text so it does not invent heading levels the PDF cannot reliably declare. In Word you can then select titles and paragraphs and apply the styles you need.",
        },
        {
          q: "Is my PDF uploaded to a server?",
          a: "No. Conversion runs in your browser memory using the file you select. BreadPDF does not send the document to a server for processing, so the content is not stored in the cloud.",
        },
        {
          q: "Can I convert several PDFs at once?",
          a: "No. The converter processes one PDF per run so page order and progress stay predictable. If you need a single Word file from several documents, merge them first with the 'Merge PDF' tool, then convert the merged PDF.",
        },
      ],
    },
  },
  {
    canonicalSlug: "firma-electronica-simple-avanzada-cualificada-eidas",
    slugs: {
      es: "firma-electronica-simple-avanzada-cualificada-eidas",
      ca: "signatura-electronica-simple-avancada-qualificada-eidas",
      en: "simple-advanced-qualified-electronic-signature-eidas",
    },
    title: {
      es: "Firma electrónica simple, avanzada y cualificada: diferencias bajo eIDAS",
      ca: "Signatura electrònica simple, avançada i qualificada: diferències sota eIDAS",
      en: "Simple, Advanced, and Qualified Electronic Signatures under eIDAS",
    },
    seoTitle: {
      es: "Firma electrónica simple, avanzada y cualificada eIDAS | BreadPDF",
      ca: "Signatura simple, avançada i qualificada eIDAS | BreadPDF",
      en: "Simple, Advanced, Qualified Electronic Signature eIDAS | BreadPDF",
    },
    seoDescription: {
      es: "Diferencias legales y técnicas entre firma simple, avanzada y cualificada según el Reglamento eIDAS (UE) 910/2014, valor probatorio y límites de firmas visuales.",
      ca: "Diferències legals i tècniques entre signatura simple, avançada i qualificada segons l'eIDAS (UE) 910/2014, valor probatori i límits de signatures visuals.",
      en: "Legal and technical differences between simple, advanced, and qualified signatures under EU Regulation 910/2014 (eIDAS), evidentiary weight, and visual stamps.",
    },
    image: {
      url: "https://breadpdf.com/rellenar-y-firmar-formulario-pdf.svg",
      alt: {
        es: "Esquema comparativo de los tres niveles de firma electrónica bajo el Reglamento eIDAS de la Unión Europea",
        ca: "Esquema comparatiu dels tres nivells de signatura electrònica sota el Reglament eIDAS de la Unió Europea",
        en: "Comparative diagram of the three electronic signature levels under EU eIDAS Regulation",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-10-29",
    modifiedDate: "2026-10-29",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Marco Regulatorio e Identificación Digital",
    },
    readingTimeMinutes: 8,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Una firma electrónica simple tiene validez legal en España y la Unión Europea?",
          a: "Sí. El Artículo 25.1 del Reglamento (UE) 910/2014 (eIDAS) prohíbe denegar efectos jurídicos o admisibilidad como prueba en juicio a una firma por el simple hecho de estar en formato electrónico. Sin embargo, no goza de la presunción legal automática de autoría ni de integridad si es impugnada por la otra parte.",
        },
        {
          q: "¿Qué firma tiene el mismo valor que una firma manuscrita sobre papel?",
          a: "Únicamente la firma electrónica cualificada (Artículo 25.2 eIDAS). Para ser cualificada, debe basarse en un certificado cualificado expedido por un prestador de confianza de la UE y crearse mediante un dispositivo cualificado (QSCD), como el chip del DNI electrónico o tarjetas criptográficas.",
        },
        {
          q: "¿La herramienta 'Firmar PDF' de BreadPDF emite firmas cualificadas?",
          a: "No. BreadPDF permite dibujar, teclear o estampar una representación gráfica o rúbrica visual sobre el PDF directamente en tu navegador. Constituye una firma electrónica simple; no es un sistema PKI, no genera un contenedor criptográfico PAdES ni valida certificados ante listas de revocación (CRL/OCSP).",
        },
        {
          q: "¿Qué ocurre si modifico un PDF después de haberlo firmado digitalmente?",
          a: "Cualquier cambio posterior (como comprimir, agregar páginas o editar texto) altera los bytes del documento y rompe el resumen criptográfico (hash). Esto hace que los visores oficiales como Adobe Acrobat o VALIDe muestren la firma como no válida o alterada.",
        },
        {
          q: "¿Cuándo es obligatorio usar firma cualificada y cuándo basta con firma simple?",
          a: "La firma cualificada es obligatoria para trámites con administraciones públicas, sedes judiciales (LexNET), contratación pública o actos notariales. Para acuerdos privados entre empresas o particulares, partes de trabajo o autorizaciones internas donde existe confianza previa, una firma simple o avanzada suele ser suficiente.",
        },
      ],
      ca: [
        {
          q: "Una signatura electrònica simple té validesa legal a Espanya i la Unió Europea?",
          a: "Sí. L'Article 25.1 del Reglament (UE) 910/2014 (eIDAS) prohibeix denegar efectes jurídics o admissibilitat com a prova en judici a una signatura pel simple fet d'estar en format electrònic. No obstant això, no gaudeix de la presumpció legal automàtica d'autoria si és impugnada per la contrapart.",
        },
        {
          q: "Quina signatura té el mateix valor que una signatura manuscrita en paper?",
          a: "Únicament la signatura electrònica qualificada (Article 25.2 eIDAS). Per ser qualificada, s'ha de basar en un certificat qualificat expedit per un prestador de confiança de la UE i crear-se mitjançant un dispositiu qualificat (QSCD), com ara el xip del DNIe o targetes criptogràfiques.",
        },
        {
          q: "L'eina 'Signar PDF' de BreadPDF emet signatures qualificades?",
          a: "No. BreadPDF permet dibuixar o estampar una representació gràfica o rúbrica visual sobre el PDF al teu navegador. Constitueix una signatura simple; no és un sistema PKI, no genera contenidors criptogràfics PAdES ni valida certificats davant llistes de revocació (CRL/OCSP).",
        },
        {
          q: "Què passa si modifico un PDF després d'haver-lo signat digitalment?",
          a: "Qualsevol canvi posterior (comprimir, afegir pàgines o aplanar camps) altera els bytes del document i trenca el resum criptogràfic (hash). Això fa que els visors com Adobe Acrobat o VALIDe mostrin la signatura com a invàlida o manipulada.",
        },
        {
          q: "Quan és obligatori fer servir signatura qualificada i quan n'hi ha prou amb signatura simple?",
          a: "La signatura qualificada és obligatòria per a tràmits amb l'administració pública, seus judicials (LexNET) o licitacions. Per a acords privats, fitxes de lliurament o autoritzacions internes amb confiança prèvia, una signatura simple és habitualment suficient.",
        },
      ],
      en: [
        {
          q: "Is a simple electronic signature legally valid in the European Union?",
          a: "Yes. Under Article 25(1) of Regulation (EU) No 910/2014 (eIDAS), an electronic signature shall not be denied legal effect or admissibility in court solely because it is in electronic form. However, it lacks the automatic statutory presumption of authenticity if challenged.",
        },
        {
          q: "Which signature carries statutory equivalence to handwritten ink?",
          a: "Only a Qualified Electronic Signature (Article 25.2 eIDAS). It must be founded on a qualified certificate from an accredited EU trust provider and generated through a certified qualified signature creation device (QSCD), such as cryptographic hardware smartcards or cloud HSMs.",
        },
        {
          q: "Does BreadPDF's 'Sign PDF' tool generate qualified signatures?",
          a: "No. BreadPDF lets users draw or position a visual signature stamp across PDF pages locally in the browser. It functions as a simple electronic signature; it is not a PKI trust provider, does not issue PAdES cryptographic envelopes, and does not check CRL/OCSP status.",
        },
        {
          q: "What happens if a PDF is edited after cryptographic signing?",
          a: "Any subsequent modification (such as compression, splitting, page extraction, or form flattening) changes the file byte stream and invalidates the cryptographic hash. Software like Adobe Acrobat will flag the signature as modified or invalid.",
        },
        {
          q: "When is a qualified signature required versus a simple mark?",
          a: "Qualified signatures are mandatory for filings with tax authorities, court dockets (LexNET), public procurement, or deeds. For standard commercial receipts, delivery notes, or internal team approvals, simple or advanced signatures are commonplace.",
        },
      ],
    },
  },
  {
    canonicalSlug: "como-preparar-pdf-para-lexnet",
    slugs: {
      es: "como-preparar-pdf-para-lexnet",
      ca: "com-preparar-pdf-per-a-lexnet",
      en: "how-to-prepare-pdf-for-lexnet",
    },
    title: {
      es: "Cómo preparar un PDF para LexNET: requisitos técnicos, OCR y firma",
      ca: "Com preparar un PDF per a LexNET: requisits tècnics, OCR i signatura",
      en: "How to Prepare a PDF for LexNET: Technical Specs, OCR, and Signing",
    },
    seoTitle: {
      es: "Preparar PDF para LexNET: requisitos técnicos y OCR | BreadPDF",
      ca: "Preparar PDF per a LexNET: requisits tècnics i OCR | BreadPDF",
      en: "Prepare PDF for LexNET: Technical Specs & OCR | BreadPDF",
    },
    seoDescription: {
      es: "Guía técnica para presentar escritos y documentos en LexNET: límites de tamaño, texto buscable con OCR, aplanado de formularios y orden de firma electrónica.",
      ca: "Guia tècnica per presentar escrits a LexNET: límits de mida, text cercable amb OCR, aplanat de formularis i ordre de signatura electrònica.",
      en: "Technical guide to preparing pleadings and evidence for the Spanish LexNET court system: size limits, OCR text layers, form flattening, and digital signing order.",
    },
    image: {
      url: "https://breadpdf.com/que-es-pdfa-cuando-convertir.svg",
      alt: {
        es: "Diagrama del flujo procesal de preparación de documentos PDF para la presentación en el sistema judicial LexNET",
        ca: "Diagrama del flux processal de preparació de documents PDF per a la presentació al sistema judicial LexNET",
        en: "Technical workflow diagram illustrating PDF preparation steps for the Spanish LexNET court portal",
      },
      width: 1200,
      height: 630,
    },
    publishedDate: "2026-10-29",
    modifiedDate: "2026-10-29",
    author: {
      name: "Equipo Editorial BreadPDF",
      role: "Especialistas en Gestión Documental y Justicia Digital",
    },
    readingTimeMinutes: 9,
    category: "empresas",
    faqs: {
      es: [
        {
          q: "¿Cuál es el límite máximo de tamaño de archivo admitido en LexNET?",
          a: "El Real Decreto 1065/2015 no establece un tope rígido universal en megabytes en su texto, sino que remite a las especificaciones técnicas aplicables. El límite por envío varía según el punto de acceso (portal web de LexNET, pasarela de software colegial o sede autonómica). Si tu presentación excede la capacidad admitida en tu entorno, debes comprimir los archivos o presentarlos en envíos sucesivos vinculados.",
        },
        {
          q: "¿Es obligatorio convertir todos los documentos a formato PDF/A?",
          a: "No de forma universal en todos los procedimientos. Las directrices técnicas del Real Decreto 1065/2015 recomiendan el formato PDF/A por motivos de preservación a largo plazo, pero los juzgados admiten PDF estándar (v1.4 a 1.7) siempre que contengan texto seleccionable y no tengan contraseñas.",
        },
        {
          q: "¿Por qué rechaza LexNET un PDF escaneado?",
          a: "Porque los juzgados exigen que el documento contenga una capa de texto indexable (OCR) para que el personal del juzgado y las partes puedan realizar búsquedas con Ctrl+F. Un escaneo que sea solo una imagen plana sin texto reconocido incumple los requisitos técnicos.",
        },
        {
          q: "¿En qué orden se debe aplanar, comprimir y firmar un PDF para el juzgado?",
          a: "El orden es crítico: 1º Aplicar OCR si es escaneado; 2º Aplanar campos de formulario interactivo si los hay; 3º Comprimir el archivo para ajustarlo al límite de megabytes; y 4º Firmar electrónicamente con tu certificado digital cualificado en AutoFirma o LexNET. Nunca modifiques el PDF tras firmarlo.",
        },
        {
          q: "¿Puedo usar BreadPDF para firmar un escrito de LexNET?",
          a: "No para la firma digital oficial. BreadPDF estampa firmas visuales en el navegador sin certificado cualificado PKI. La presentación judicial en LexNET requiere la firma electrónica cualificada del letrado o procurador generada con certificado reconocido (como ACA o FNMT) y AutoFirma.",
        },
      ],
      ca: [
        {
          q: "Quin és el límit màxim de mida de fitxer admès a LexNET?",
          a: "El Reial Decret 1065/2015 no fixa un sostre rígid universal en megabytes al seu text, sinó que remet a les especificacions tècniques aplicables. El límit per enviament varia segons el punt d'accés (portal web, seu autonòmica o integració col·legial). Si el tràmit supera la capacitat admesa, cal comprimir els fitxers o dividir-los en enviaments vinculats.",
        },
        {
          q: "És obligatori convertir tots els documents a format PDF/A?",
          a: "No de manera universal a tots els procediments. El Reial Decret 1065/2015 recomana el format PDF/A per motius d'arxiu i conservació, però els jutjats admeten PDF estàndard (v1.4 a 1.7) sempre que continguin text cercable i no tinguin contrasenyes d'obertura.",
        },
        {
          q: "Per què LexNET rebutja un PDF escanejat?",
          a: "Perquè la justícia exigeix que el document contingui una capa de text indexable (OCR) per poder fer cerques de paraules clau. Un escaneig pla que sigui només una imatge sense text reconegut incompleix les normes tècniques judicials.",
        },
        {
          q: "En quin ordre s'ha d'aplanar, comprimir i signar un PDF judicial?",
          a: "L'ordre és fonamental: 1r Aplicar OCR si és escanejat; 2n Aplanar formularis si cal; 3r Comprimir per ajustar-se al límit de mida; i 4t Signar electrònicament amb certificat qualificat a AutoFirma o LexNET. Mai modifiquis el document després de signar-lo.",
        },
        {
          q: "Puc fer servir BreadPDF per signar un escrit de LexNET?",
          a: "No per a la signatura judicial oficial. BreadPDF estampa signatures visuals simples al navegador. La presentació processal a LexNET requereix signatura electrònica qualificada generada amb certificat reconegut (com ACA o FNMT) i el programari oficial AutoFirma.",
        },
      ],
      en: [
        {
          q: "What is the maximum submission file size in the Spanish LexNET court portal?",
          a: "Royal Decree 1065/2015 does not legislate a universal megabyte cap in its statutory text, but delegates size rules to applicable technical specifications. Maximum capacity varies depending on the access gateway (central portal, regional justice portals, or bar association web services). Always verify your specific portal specifications and compress files if needed.",
        },
        {
          q: "Is converting all court exhibits to PDF/A-1b strictly required?",
          a: "Not universally across all dockets. Technical guidance under Royal Decree 1065/2015 strongly recommends PDF/A for long-term archiving, but court clerks accept standard PDFs (v1.4 to 1.7) provided they carry selectable text and are free from encryption passwords.",
        },
        {
          q: "Why do court portals reject flat scanned PDF documents?",
          a: "Because judicial workflows mandate searchable text layers (OCR) allowing court staff and opposing counsel to perform word searches with Ctrl+F. A scanned bitmap image with no machine-readable text violates mandatory e-filing rules.",
        },
        {
          q: "What is the correct sequence to flatten, compress, and digitally sign a court filing?",
          a: "The sequence is critical: 1st Run OCR on scanned materials; 2nd Flatten interactive form fields; 3rd Compress to satisfy size limits; and 4th Digitally sign via your qualified PKI certificate inside AutoFirma or LexNET. Never edit the file after signing.",
        },
        {
          q: "Can I use BreadPDF to digitally sign pleadings for LexNET?",
          a: "No for official court submissions. BreadPDF applies client-side visual signatures without PKI certificates. Official filings in LexNET mandate a qualified electronic signature backed by an accredited legal certificate (such as ACA or FNMT) and AutoFirma.",
        },
      ],
    },
  },
];

export const ALL_GUIDES = GUIDES;

export function findGuideBySlug(locale: Locale, slug: string): GuideDefinition | undefined {
  return GUIDES.find((g) => g.slugs[locale] === slug || g.canonicalSlug === slug);
}

export function guideSlugFor(locale: Locale, canonicalSlug: string): string {
  const guide = GUIDES.find((g) => g.canonicalSlug === canonicalSlug);
  return guide ? guide.slugs[locale] : canonicalSlug;
}
