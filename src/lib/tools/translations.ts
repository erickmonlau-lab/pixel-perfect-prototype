import type { Locale } from "@/lib/i18n/config";
import type { ToolCategory } from "./types";

/**
 * Localised content for the catalogue. Keys are the canonical (Spanish) slugs
 * from the registry; each locale provides its own URL slug and natural copy.
 * Spanish text lives in the registry itself and is derived at runtime.
 */

export type ToolOptionText = {
  label?: string;
  help?: string;
  placeholder?: string;
  /** Localised labels keyed by option value. */
  choices?: Record<string, string>;
};

export type ToolText = {
  slug: string;
  name: string;
  h1: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  ctaLabel: string;
  keywords: string[];
  howItWorks: string[];
  faq: { q: string; a: string }[];
  pendingReason?: string;
  options?: Record<string, ToolOptionText>;
};

export const CATEGORY_TEXT: Record<
  Exclude<Locale, "es">,
  Record<ToolCategory, { slug: string; name: string; description: string }>
> = {
  ca: {
    optimizar: {
      slug: "optimitzar",
      name: "Optimitzar",
      description: "Redueix el pes dels teus documents sense perdre el control de la qualitat.",
    },
    organizar: {
      slug: "organitzar",
      name: "Organitzar",
      description: "Uneix, divideix, gira i reordena pàgines en pocs segons.",
    },
    convertir: {
      slug: "convertir",
      name: "Convertir",
      description: "Passa de PDF a imatge, text o Office i al contrari.",
    },
    editar: {
      slug: "editar",
      name: "Editar",
      description: "Extreu, modifica i treballa amb el contingut dels teus PDF.",
    },
    seguridad: {
      slug: "seguretat",
      name: "Seguretat",
      description: "Protegeix els teus documents i controla qui els pot obrir.",
    },
    inteligencia: {
      slug: "pdf-intelligence",
      name: "PDF Intelligence",
      description: "OCR, extracció intel·ligent, anàlisi i eines amb IA.",
    },
  },
  en: {
    optimizar: {
      slug: "optimize",
      name: "Optimize",
      description: "Shrink your documents without losing control over quality.",
    },
    organizar: {
      slug: "organize",
      name: "Organize",
      description: "Merge, split, rotate and reorder pages in seconds.",
    },
    convertir: {
      slug: "convert",
      name: "Convert",
      description: "Move between PDF, images, text and Office formats.",
    },
    editar: {
      slug: "edit",
      name: "Edit",
      description: "Extract, change and work with the content of your PDFs.",
    },
    seguridad: {
      slug: "security",
      name: "Security",
      description: "Protect your documents and control who can open them.",
    },
    inteligencia: {
      slug: "pdf-intelligence",
      name: "PDF Intelligence",
      description: "OCR, smart extraction, analysis and AI-assisted tools.",
    },
  },
};

/** Roadmap copy, keyed by the Spanish roadmap name. */
export const ROADMAP_TEXT: Record<
  Exclude<Locale, "es">,
  Record<string, { name: string; tagline: string }>
> = {
  ca: {
    "Proteger PDF": {
      name: "Protegeix PDF",
      tagline: "Afegeix contrasenya i permisos d'obertura a un document.",
    },
    "Desbloquear PDF": {
      name: "Desbloqueja PDF",
      tagline: "Treu la contrasenya d'un PDF del qual tens la clau.",
    },
    "Firmar PDF": {
      name: "Signa PDF",
      tagline: "Signa documents i demana signatures a altres persones.",
    },
    "Marca de agua": {
      name: "Marca d'aigua",
      tagline: "Segella cada pàgina amb text o imatge i control d'opacitat.",
    },
    "OCR de PDF": {
      name: "OCR de PDF",
      tagline: "Converteix escanejos en documents amb text cercable.",
    },
    "Resumir PDF": {
      name: "Resumeix PDF",
      tagline: "Resums i punts clau de documents llargs.",
    },
    "Extraer datos": {
      name: "Extreu dades",
      tagline: "Treu taules i camps estructurats de factures i formularis.",
    },
    "Comparar PDF": {
      name: "Compara PDF",
      tagline: "Detecta les diferències entre dues versions d'un document.",
    },
    "Numerar páginas": {
      name: "Numera pàgines",
      tagline: "Insereix numeració amb format i posició configurables.",
    },
    "Reparar PDF": {
      name: "Repara PDF",
      tagline: "Recupera documents malmesos o incomplets.",
    },
    "PDF a Excel": {
      name: "PDF a Excel",
      tagline: "Passa taules d'un PDF a un full de càlcul.",
    },
    "PDF a PowerPoint": {
      name: "PDF a PowerPoint",
      tagline: "Converteix presentacions en PDF a format editable.",
    },
  },
  en: {
    "Proteger PDF": {
      name: "Protect PDF",
      tagline: "Add a password and opening permissions to a document.",
    },
    "Desbloquear PDF": {
      name: "Unlock PDF",
      tagline: "Remove the password from a PDF you have the key for.",
    },
    "Firmar PDF": {
      name: "Sign PDF",
      tagline: "Sign documents and request signatures from other people.",
    },
    "Marca de agua": {
      name: "Watermark",
      tagline: "Stamp every page with text or an image and control opacity.",
    },
    "OCR de PDF": {
      name: "PDF OCR",
      tagline: "Turn scans into documents with searchable text.",
    },
    "Resumir PDF": {
      name: "Summarize PDF",
      tagline: "Summaries and key points from long documents.",
    },
    "Extraer datos": {
      name: "Extract data",
      tagline: "Pull tables and structured fields from invoices and forms.",
    },
    "Comparar PDF": {
      name: "Compare PDF",
      tagline: "Spot the differences between two versions of a document.",
    },
    "Numerar páginas": {
      name: "Number pages",
      tagline: "Insert page numbers with configurable format and position.",
    },
    "Reparar PDF": {
      name: "Repair PDF",
      tagline: "Recover damaged or incomplete documents.",
    },
    "PDF a Excel": {
      name: "PDF to Excel",
      tagline: "Move tables from a PDF into a spreadsheet.",
    },
    "PDF a PowerPoint": {
      name: "PDF to PowerPoint",
      tagline: "Convert PDF presentations into an editable format.",
    },
  },
};

const caTools: Record<string, ToolText> = {
  "comprimir-pdf": {
    slug: "comprimeix-pdf",
    name: "Comprimeix PDF",
    h1: "Comprimeix un PDF i redueix-ne la mida",
    tagline: "Baixa el pes del teu PDF triant l'equilibri exacte entre mida i qualitat.",
    seoTitle: "Comprimir PDF en línia i gratis | ARVIO",
    seoDescription:
      "Redueix la mida del teu PDF al navegador, amb quatre nivells de compressió i comparació de pes abans i després. Sense pujar fitxers a cap servidor.",
    ctaLabel: "Comprimeix PDF",
    keywords: ["comprimir pdf", "reduir mida pdf", "pdf lleuger"],
    howItWorks: [
      "Selecciona el PDF que vols reduir.",
      "Tria el nivell: sense pèrdua, lleuger, equilibrat o màxim.",
      "Compara el pes abans i després i descarrega el resultat.",
    ],
    faq: [
      {
        q: "Es perd qualitat en comprimir?",
        a: "Al nivell sense pèrdua no es recomprimeix res: només es reestructura el fitxer. Als nivells lleuger, equilibrat i màxim les pàgines es reconstrueixen com a imatge, així que la nitidesa baixa proporcionalment a l'estalvi.",
      },
      {
        q: "Quant pes estalviaré?",
        a: "Depèn del document. ARVIO et mostra la mida original i la final perquè puguis repetir amb un altre nivell si el resultat no et convenç.",
      },
      {
        q: "El meu fitxer es puja a un servidor?",
        a: "No. Aquesta eina treballa íntegrament al teu navegador.",
      },
    ],
    options: {
      level: {
        label: "Nivell de compressió",
        help: "Sense pèrdua conserva el text seleccionable; la resta rasteritza les pàgines.",
        choices: {
          lossless: "Sense pèrdua — reestructura el fitxer",
          light: "Lleuger — màxima qualitat visual",
          balanced: "Equilibrat — recomanat",
          strong: "Màxim — el fitxer més petit",
        },
      },
    },
  },
  "unir-pdf": {
    slug: "uneix-pdf",
    name: "Uneix PDF",
    h1: "Uneix diversos PDF en un sol document",
    tagline: "Combina fitxers en l'ordre que vulguis i descarrega un únic PDF.",
    seoTitle: "Unir PDF en línia i en ordre | ARVIO",
    seoDescription:
      "Combina dos o més PDF en un únic document, reordena els fitxers abans de processar i descarrega el resultat al moment des del navegador.",
    ctaLabel: "Uneix PDF",
    keywords: ["unir pdf", "ajuntar pdf", "combinar pdf"],
    howItWorks: [
      "Afegeix els PDF que vulguis combinar.",
      "Ordena'ls amb les fletxes de la llista.",
      "Descarrega el document final.",
    ],
    faq: [
      {
        q: "Quants fitxers puc unir?",
        a: "No hi ha un límit fix. El procés fa servir la memòria del teu dispositiu, així que amb documents molt grans val la pena fer-ho per tandes.",
      },
      {
        q: "Es conserva l'ordre?",
        a: "Sí, exactament l'ordre de la llista abans de prémer el botó.",
      },
    ],
  },
  "dividir-pdf": {
    slug: "divideix-pdf",
    name: "Divideix PDF",
    h1: "Divideix un PDF en diversos documents",
    tagline: "Separa pàgina a pàgina o pels intervals que tu defineixis.",
    seoTitle: "Dividir PDF per pàgines o intervals | ARVIO",
    seoDescription:
      "Divideix un PDF en documents independents: una pàgina per fitxer o intervals personalitzats com 1-3, 4-8. Tot al navegador i sense registre.",
    ctaLabel: "Divideix PDF",
    keywords: ["dividir pdf", "separar pdf", "tallar pdf"],
    howItWorks: [
      "Puja el PDF que vols dividir.",
      "Tria separar cada pàgina o escriu els teus intervals.",
      "Descarrega els documents generats.",
    ],
    faq: [
      {
        q: "Com s'escriuen els intervals?",
        a: "Separa cada document amb una coma: 1-3, 4, 5-9 genera tres PDF.",
      },
    ],
    options: {
      mode: {
        label: "Mode",
        choices: { each: "Una pàgina per fitxer", ranges: "Intervals personalitzats" },
      },
      ranges: {
        label: "Intervals",
        help: "Només s'aplica en mode intervals. Exemple: 1-3, 4, 5-9",
      },
    },
  },
  "pdf-a-jpg": {
    slug: "pdf-a-jpg",
    name: "PDF a JPG",
    h1: "Converteix PDF a JPG",
    tagline: "Cada pàgina del PDF es converteix en una imatge JPG nítida.",
    seoTitle: "Convertir PDF a JPG amb qualitat ajustable | ARVIO",
    seoDescription:
      "Converteix les pàgines d'un PDF en imatges JPG triant la resolució i la qualitat. El procés passa al navegador, sense pujar el document.",
    ctaLabel: "Converteix a JPG",
    keywords: ["pdf a jpg", "pdf a imatge", "convertir pdf a jpg"],
    howItWorks: [
      "Puja el teu PDF.",
      "Ajusta la resolució i la qualitat si ho necessites.",
      "Descarrega les imatges una a una.",
    ],
    faq: [
      {
        q: "Quina resolució he de triar?",
        a: "El valor 2x equival a uns 144 ppp i funciona bé en pantalla. Per imprimir, puja a 3x o 4x.",
      },
    ],
    options: {
      scale: { label: "Resolució", help: "Multiplicador sobre la mida de pàgina original." },
      quality: { label: "Qualitat JPG" },
    },
  },
  "jpg-a-pdf": {
    slug: "jpg-a-pdf",
    name: "JPG a PDF",
    h1: "Converteix JPG a PDF",
    tagline: "Converteix les teves imatges en un PDF ordenat i llest per enviar.",
    seoTitle: "Convertir JPG a PDF, diverses imatges de cop | ARVIO",
    seoDescription:
      "Converteix imatges JPG o PNG en un únic PDF, amb pàgines a la mida de la imatge o en A4. Ordena les fotos abans de generar el document.",
    ctaLabel: "Crea el PDF",
    keywords: ["jpg a pdf", "imatge a pdf", "png a pdf"],
    howItWorks: [
      "Afegeix les teves imatges JPG o PNG.",
      "Ordena-les i tria la mida de pàgina.",
      "Descarrega el PDF resultant.",
    ],
    faq: [{ q: "Admet PNG?", a: "Sí, pots barrejar JPG i PNG al mateix document." }],
    options: {
      pageSize: {
        label: "Mida de pàgina",
        choices: { a4: "A4 amb marges", image: "Ajustat a la imatge" },
      },
    },
  },
  "rotar-pdf": {
    slug: "gira-pdf",
    name: "Gira PDF",
    h1: "Gira les pàgines d'un PDF",
    tagline: "Gira tot el document o només les pàgines que indiquis.",
    seoTitle: "Girar PDF en línia i desar el gir | ARVIO",
    seoDescription:
      "Gira pàgines d'un PDF 90, 180 o 270 graus, a tot el document o a pàgines concretes, i desa el resultat de manera permanent.",
    ctaLabel: "Gira PDF",
    keywords: ["girar pdf", "rotar pdf", "voltejar pdf"],
    howItWorks: ["Puja el PDF.", "Tria el gir i les pàgines.", "Descarrega el PDF ja girat."],
    faq: [{ q: "El gir es desa?", a: "Sí, la rotació queda escrita al fitxer, no és només una vista." }],
    options: {
      angle: {
        label: "Gir",
        choices: { "90": "90° a la dreta", "180": "180°", "270": "90° a l'esquerra" },
      },
      pages: { label: "Pàgines", help: "Buit gira totes. Exemple: 1, 3-5", placeholder: "totes" },
    },
  },
  "extraer-paginas-pdf": {
    slug: "extreu-pagines-pdf",
    name: "Extreu pàgines",
    h1: "Extreu pàgines d'un PDF",
    tagline: "Queda't només amb les pàgines que t'interessen.",
    seoTitle: "Extreure pàgines d'un PDF | ARVIO",
    seoDescription:
      "Crea un PDF nou només amb les pàgines que triïs, indicant pàgines soltes o intervals. Ràpid, gratuït i al teu navegador.",
    ctaLabel: "Extreu pàgines",
    keywords: ["extreure pàgines pdf", "separar pàgines pdf"],
    howItWorks: ["Puja el PDF.", "Indica les pàgines que vols conservar.", "Descarrega el document nou."],
    faq: [
      {
        q: "Es manté l'ordre que escric?",
        a: "Les pàgines s'ordenen de manera ascendent per conservar la lectura original del document.",
      },
    ],
    options: { pages: { label: "Pàgines a extreure", help: "Exemple: 1, 4-6, 10" } },
  },
  "eliminar-paginas-pdf": {
    slug: "elimina-pagines-pdf",
    name: "Elimina pàgines",
    h1: "Elimina pàgines d'un PDF",
    tagline: "Esborra les pàgines que no necessites i conserva la resta intacta.",
    seoTitle: "Eliminar pàgines d'un PDF | ARVIO",
    seoDescription:
      "Elimina pàgines concretes o intervals d'un PDF i descarrega el document net, sense instal·lar programes i sense pujar el fitxer a cap servidor.",
    ctaLabel: "Elimina pàgines",
    keywords: ["eliminar pàgines pdf", "esborrar pàgines pdf", "treure fulls pdf"],
    howItWorks: ["Puja el PDF.", "Indica les pàgines que vols eliminar.", "Descarrega el resultat."],
    faq: [
      {
        q: "Puc eliminar totes les pàgines?",
        a: "No: el document final ha de conservar com a mínim una pàgina.",
      },
    ],
    options: { pages: { label: "Pàgines a eliminar", help: "Exemple: 2, 7-9" } },
  },
  "extraer-texto-pdf": {
    slug: "extreu-text-pdf",
    name: "Extreu text",
    h1: "Extreu el text d'un PDF",
    tagline: "Obtén tot el text del document en un fitxer de text pla.",
    seoTitle: "Extreure text d'un PDF | ARVIO",
    seoDescription:
      "Copia el text d'un PDF a un fitxer .txt pàgina per pàgina, sense instal·lar res. Útil per reutilitzar contingut o revisar-lo ràpidament.",
    ctaLabel: "Extreu text",
    keywords: ["extreure text pdf", "pdf a txt", "copiar text pdf"],
    howItWorks: ["Puja el PDF.", "ARVIO recorre les pàgines.", "Descarrega el fitxer de text."],
    faq: [
      {
        q: "Funciona amb documents escanejats?",
        a: "No. Un escaneig és una imatge i necessita OCR, que arribarà en una fase posterior.",
      },
    ],
  },
  "pdf-a-word": {
    slug: "pdf-a-word",
    name: "PDF a Word",
    h1: "Converteix PDF a Word",
    tagline: "Conversió amb maquetació editable en un document .docx.",
    seoTitle: "Convertir PDF a Word (.docx) | ARVIO",
    seoDescription:
      "Converteix un PDF en un document Word editable conservant paràgrafs, taules i estils. Eina en preparació dins d'ARVIO.",
    ctaLabel: "Converteix a Word",
    keywords: ["pdf a word", "pdf a docx", "convertir pdf editable"],
    pendingReason:
      "Reconstruir la maquetació en .docx exigeix un motor de conversió al servidor amb cua de treballs. Està en construcció i no s'activarà fins que el resultat sigui fiable.",
    howItWorks: [
      "Pujaràs el PDF.",
      "El document es processarà a la cua de conversió d'ARVIO.",
      "Descarregaràs un .docx editable.",
    ],
    faq: [
      {
        q: "Quan estarà disponible?",
        a: "Tan bon punt el motor de conversió al servidor estigui validat. Preferim no oferir una conversió que trenqui la maquetació.",
      },
    ],
  },
  "word-a-pdf": {
    slug: "word-a-pdf",
    name: "Word a PDF",
    h1: "Converteix Word a PDF",
    tagline: "Converteix .doc i .docx en PDF respectant tipografies i salts de pàgina.",
    seoTitle: "Convertir Word a PDF en línia | ARVIO",
    seoDescription:
      "Converteix documents Word en PDF mantenint tipografies, imatges i salts de pàgina. Eina en preparació dins d'ARVIO.",
    ctaLabel: "Converteix a PDF",
    keywords: ["word a pdf", "docx a pdf", "convertir word"],
    pendingReason:
      "Una conversió fidel a Word necessita un motor de composició tipogràfica al servidor. Està en construcció; mentre no funcioni bé, no la publiquem.",
    howItWorks: [
      "Pujaràs el document Word.",
      "Es compondrà a la cua de conversió d'ARVIO.",
      "Descarregaràs el PDF final.",
    ],
    faq: [
      {
        q: "Es conservaran les tipografies?",
        a: "Sí, justament per això l'eina encara no està publicada.",
      },
    ],
  },
};

const enTools: Record<string, ToolText> = {
  "comprimir-pdf": {
    slug: "compress-pdf",
    name: "Compress PDF",
    h1: "Compress a PDF and reduce its size",
    tagline: "Shrink your PDF by choosing the exact balance between size and quality.",
    seoTitle: "Compress PDF online, free | ARVIO",
    seoDescription:
      "Reduce your PDF size in the browser with four compression levels and a before/after size comparison. No files are uploaded to any server.",
    ctaLabel: "Compress PDF",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf"],
    howItWorks: [
      "Pick the PDF you want to shrink.",
      "Choose a level: lossless, light, balanced or maximum.",
      "Compare the before and after size and download the result.",
    ],
    faq: [
      {
        q: "Does compression lose quality?",
        a: "The lossless level recompresses nothing: it only restructures the file. The light, balanced and maximum levels rebuild pages as images, so sharpness drops in proportion to the savings.",
      },
      {
        q: "How much weight will I save?",
        a: "It depends on the document. ARVIO shows the original and final size so you can retry with another level if you're not happy.",
      },
      {
        q: "Is my file uploaded to a server?",
        a: "No. This tool runs entirely in your browser.",
      },
    ],
    options: {
      level: {
        label: "Compression level",
        help: "Lossless keeps text selectable; the other levels rasterise the pages.",
        choices: {
          lossless: "Lossless — restructures the file",
          light: "Light — best visual quality",
          balanced: "Balanced — recommended",
          strong: "Maximum — smallest file",
        },
      },
    },
  },
  "unir-pdf": {
    slug: "merge-pdf",
    name: "Merge PDF",
    h1: "Merge several PDFs into one document",
    tagline: "Combine files in any order and download a single PDF.",
    seoTitle: "Merge PDF online, in your own order | ARVIO",
    seoDescription:
      "Combine two or more PDFs into one document, reorder the files before processing and download the result instantly from your browser.",
    ctaLabel: "Merge PDF",
    keywords: ["merge pdf", "combine pdf", "join pdf"],
    howItWorks: [
      "Add the PDFs you want to combine.",
      "Reorder them with the arrows in the list.",
      "Download the final document.",
    ],
    faq: [
      {
        q: "How many files can I merge?",
        a: "There's no fixed limit. Processing uses your device's memory, so very large documents are best merged in batches.",
      },
      { q: "Is the order kept?", a: "Yes, exactly the order of the list before you press the button." },
    ],
  },
  "dividir-pdf": {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Split a PDF into several documents",
    tagline: "Separate page by page or by the ranges you define.",
    seoTitle: "Split PDF online by pages or ranges | ARVIO",
    seoDescription:
      "Split a PDF into standalone documents: one page per file or custom ranges such as 1-3, 4-8. All in your browser, with no sign-up.",
    ctaLabel: "Split PDF",
    keywords: ["split pdf", "separate pdf", "cut pdf"],
    howItWorks: [
      "Upload the PDF you want to split.",
      "Choose one file per page or type your ranges.",
      "Download the generated documents.",
    ],
    faq: [
      {
        q: "How do I write ranges?",
        a: "Separate each document with a comma: 1-3, 4, 5-9 produces three PDFs.",
      },
    ],
    options: {
      mode: { label: "Mode", choices: { each: "One page per file", ranges: "Custom ranges" } },
      ranges: { label: "Ranges", help: "Only used in ranges mode. Example: 1-3, 4, 5-9" },
    },
  },
  "pdf-a-jpg": {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    h1: "Convert PDF to JPG",
    tagline: "Every page of your PDF becomes a sharp JPG image.",
    seoTitle: "Convert PDF to JPG with adjustable quality | ARVIO",
    seoDescription:
      "Turn the pages of a PDF into JPG images, choosing resolution and quality. Everything happens in your browser, with no upload.",
    ctaLabel: "Convert to JPG",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg"],
    howItWorks: [
      "Upload your PDF.",
      "Adjust resolution and quality if you need to.",
      "Download the images one by one.",
    ],
    faq: [
      {
        q: "Which resolution should I pick?",
        a: "2x is roughly 144 dpi and works well on screen. For printing, go up to 3x or 4x.",
      },
    ],
    options: {
      scale: { label: "Resolution", help: "Multiplier over the original page size." },
      quality: { label: "JPG quality" },
    },
  },
  "jpg-a-pdf": {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    h1: "Convert JPG to PDF",
    tagline: "Turn your images into a tidy PDF that's ready to send.",
    seoTitle: "Convert JPG to PDF, several images at once | ARVIO",
    seoDescription:
      "Turn JPG or PNG images into a single PDF, with pages sized to the image or set to A4. Reorder the photos before generating the document.",
    ctaLabel: "Create PDF",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf"],
    howItWorks: [
      "Add your JPG or PNG images.",
      "Reorder them and pick the page size.",
      "Download the resulting PDF.",
    ],
    faq: [{ q: "Does it accept PNG?", a: "Yes, you can mix JPG and PNG in the same document." }],
    options: {
      pageSize: {
        label: "Page size",
        choices: { a4: "A4 with margins", image: "Fit to the image" },
      },
    },
  },
  "rotar-pdf": {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    h1: "Rotate pages in a PDF",
    tagline: "Rotate the whole document or only the pages you list.",
    seoTitle: "Rotate PDF online and save the rotation | ARVIO",
    seoDescription:
      "Rotate PDF pages by 90, 180 or 270 degrees, across the whole document or on specific pages, and save the result permanently.",
    ctaLabel: "Rotate PDF",
    keywords: ["rotate pdf", "turn pdf pages", "flip pdf"],
    howItWorks: ["Upload the PDF.", "Choose the rotation and the pages.", "Download the rotated PDF."],
    faq: [
      {
        q: "Is the rotation saved?",
        a: "Yes, the rotation is written into the file — it isn't just a preview.",
      },
    ],
    options: {
      angle: {
        label: "Rotation",
        choices: { "90": "90° clockwise", "180": "180°", "270": "90° counter-clockwise" },
      },
      pages: {
        label: "Pages",
        help: "Empty rotates all pages. Example: 1, 3-5",
        placeholder: "all pages",
      },
    },
  },
  "extraer-paginas-pdf": {
    slug: "extract-pdf-pages",
    name: "Extract pages",
    h1: "Extract pages from a PDF",
    tagline: "Keep only the pages you actually need.",
    seoTitle: "Extract pages from a PDF online | ARVIO",
    seoDescription:
      "Build a new PDF with only the pages you choose, using single pages or ranges. Fast, free and inside your own browser.",
    ctaLabel: "Extract pages",
    keywords: ["extract pdf pages", "separate pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to keep.", "Download the new document."],
    faq: [
      {
        q: "Is my typed order preserved?",
        a: "Pages are sorted in ascending order so the document keeps its original reading flow.",
      },
    ],
    options: { pages: { label: "Pages to extract", help: "Example: 1, 4-6, 10" } },
  },
  "eliminar-paginas-pdf": {
    slug: "delete-pdf-pages",
    name: "Delete pages",
    h1: "Delete pages from a PDF",
    tagline: "Remove the pages you don't need and keep the rest untouched.",
    seoTitle: "Delete pages from a PDF online | ARVIO",
    seoDescription:
      "Remove specific pages or ranges from a PDF and download the clean document, with no software to install and no upload.",
    ctaLabel: "Delete pages",
    keywords: ["delete pdf pages", "remove pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to delete.", "Download the result."],
    faq: [
      {
        q: "Can I delete every page?",
        a: "No: the final document has to keep at least one page.",
      },
    ],
    options: { pages: { label: "Pages to delete", help: "Example: 2, 7-9" } },
  },
  "extraer-texto-pdf": {
    slug: "extract-pdf-text",
    name: "Extract text",
    h1: "Extract the text from a PDF",
    tagline: "Get all the document text as a plain text file.",
    seoTitle: "Extract text from a PDF online | ARVIO",
    seoDescription:
      "Copy the text of a PDF into a .txt file page by page, with nothing to install. Handy for reusing content or reviewing it quickly.",
    ctaLabel: "Extract text",
    keywords: ["extract pdf text", "pdf to txt", "copy pdf text"],
    howItWorks: ["Upload the PDF.", "ARVIO walks through the pages.", "Download the text file."],
    faq: [
      {
        q: "Does it work with scanned documents?",
        a: "No. A scan is an image and needs OCR, which is coming in a later phase.",
      },
    ],
  },
  "pdf-a-word": {
    slug: "pdf-to-word",
    name: "PDF to Word",
    h1: "Convert PDF to Word",
    tagline: "Conversion with an editable layout in a .docx document.",
    seoTitle: "Convert PDF to Word (.docx) | ARVIO",
    seoDescription:
      "Convert a PDF into an editable Word document keeping paragraphs, tables and styles. Tool currently in development at ARVIO.",
    ctaLabel: "Convert to Word",
    keywords: ["pdf to word", "pdf to docx", "editable pdf conversion"],
    pendingReason:
      "Rebuilding the layout as .docx requires a server-side conversion engine with a job queue. It's in development and won't go live until the result is reliable.",
    howItWorks: [
      "You'll upload the PDF.",
      "The document will be processed in the ARVIO conversion queue.",
      "You'll download an editable .docx.",
    ],
    faq: [
      {
        q: "When will it be available?",
        a: "As soon as the server-side conversion engine is validated. We'd rather not ship a conversion that breaks your layout.",
      },
    ],
  },
  "word-a-pdf": {
    slug: "word-to-pdf",
    name: "Word to PDF",
    h1: "Convert Word to PDF",
    tagline: "Turn .doc and .docx into PDF while respecting fonts and page breaks.",
    seoTitle: "Convert Word to PDF online | ARVIO",
    seoDescription:
      "Convert Word documents into PDF keeping typefaces, images and page breaks. Tool currently in development at ARVIO.",
    ctaLabel: "Convert to PDF",
    keywords: ["word to pdf", "docx to pdf", "convert word"],
    pendingReason:
      "A faithful Word conversion needs a server-side typesetting engine. It's in development; until it works properly, we won't publish it.",
    howItWorks: [
      "You'll upload the Word document.",
      "It will be typeset in the ARVIO conversion queue.",
      "You'll download the final PDF.",
    ],
    faq: [
      {
        q: "Will fonts be preserved?",
        a: "Yes — that's exactly why the tool isn't published yet.",
      },
    ],
  },
};

export const TOOL_TEXT: Record<Exclude<Locale, "es">, Record<string, ToolText>> = {
  ca: caTools,
  en: enTools,
};
