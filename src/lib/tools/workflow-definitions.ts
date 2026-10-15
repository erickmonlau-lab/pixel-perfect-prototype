import type { Locale } from "@/lib/i18n/config";

export interface WorkflowSuggestion {
  targetToolSlug: string;
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  cta: Record<Locale, string>;
}

export interface ToolPracticalGuide {
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  engineDescription: Record<Locale, string>;
  bestFor: Record<Locale, string[]>;
  limitations: Record<Locale, string[]>;
  proTip: Record<Locale, string>;
}

/**
 * Dedicated, highly specific technical criteria and operational guidance per tool.
 * Provides real document engineering depth for high-priority pages.
 */
export const TOOL_PRACTICAL_PROFILES: Record<string, ToolPracticalGuide> = {
  "comprimir-pdf": {
    eyebrow: {
      es: "Ingeniería de compresión adaptativa",
      ca: "Enginyeria de compressió adaptativa",
      en: "Adaptive compression engineering",
    },
    title: {
      es: "Criterios técnicos de optimización y modos de compresión",
      ca: "Criteris tècnics d'optimització i modes de compressió",
      en: "Technical optimization criteria and compression modes",
    },
    engineDescription: {
      es: "El motor evalúa si el PDF está compuesto por texto vectorial o bitmaps pesados. En modo 'Sin pérdida', reestructura diccionarios XRef, elimina metadatos redundantes y compacta flujos Deflate sin alterar píxeles ni vectores. En los modos visuales (Ligero, Equilibrado, Máximo), aplica renderizado adaptativo por página con submuestreo bicúbico respetando proporciones.",
      ca: "El motor avalua si el PDF està format per text vectorial o bitmaps pesats. En mode 'Sense pèrdua', reestructura diccionaris XRef, elimina metadades redundants i compacta fluxos Deflate sense tocar píxels ni vectors. En els modes visuals (Lleuger, Equilibrat, Màxim), aplica renderitzat adaptatiu per pàgina amb submostreig bicúbic respectant proporcions.",
      en: "The engine evaluates whether the PDF is built with vector typography or raster bitmaps. In 'Lossless' mode, it rebuilds XRef tables, strips unreferenced objects, and recompresses Deflate streams preserving 100% of text and vectors. In visual modes, it dynamically applies canvas subsampling tailored to target resolutions.",
    },
    bestFor: {
      es: [
        "Envíos por email sujetos a cuotas de 10 a 25 MB.",
        "Trámites en sedes electrónicas (Moodle ≤ 5 MB, LexNET ≤ 10 MB, plataformas de empleo ≤ 2 MB).",
        "Publicación web para acelerar la carga en dispositivos móviles.",
      ],
      ca: [
        "Enviaments per correu electrònic subjectes a quotes de 10 a 25 MB.",
        "Tràmits a seus electròniques (Moodle ≤ 5 MB, LexNET ≤ 10 MB, portals de feina ≤ 2 MB).",
        "Publicació web per accelerar la càrrega en dispositius mòbils.",
      ],
      en: [
        "Email delivery constrained by 10 MB to 25 MB gateway limits.",
        "Portal submissions with strict ceilings (Moodle ≤ 5 MB, Court systems ≤ 10 MB, Job boards ≤ 2 MB).",
        "Web optimization ensuring fast mobile document previews.",
      ],
    },
    limitations: {
      es: [
        "Los modos visuales (Ligero, Equilibrado, Máximo) rasterizan páginas, por lo que el texto deja de ser seleccionable con Ctrl+F. Usa 'Sin pérdida' si necesitas copiar texto.",
        "Documentos que ya consisten exclusivamente en texto plano sin imágenes apenas reducen su peso (1-5%), pues el texto ya está comprimido eficientemente.",
      ],
      ca: [
        "Els modes visuals (Lleuger, Equilibrat, Màxim) rasteritzen pàgines, de manera que el text deixa de ser seleccionable amb Ctrl+F. Fes servir 'Sense pèrdua' si necessites copiar text.",
        "Documents que només contenen text net sense imatges gairebé no redueixen el pes (1-5%), ja que el text ja està comprimit per defecte.",
      ],
      en: [
        "Visual presets rasterize canvas pages; text will no longer be selectable via Ctrl+F. Choose 'Lossless' to preserve font vectors.",
        "Pure-text documents without embedded photographs experience minimal reduction (1-5%) because text glyph tables are already dense.",
      ],
    },
    proTip: {
      es: "Si tu PDF contiene tanto planos técnicos como fotos, prueba primero el nivel 'Ligero' o 'Sin pérdida'. BreadPDF incluye una salvaguarda automática que impide que el archivo final pese más que el original.",
      ca: "Si el teu PDF conté plànols tècnics i fotos, prova primer el nivell 'Lleuger' o 'Sense pèrdua'. BreadPDF inclou una salvaguarda automàtica que impedeix que el fitxer final pesi més que l'original.",
      en: "If your PDF combines technical CAD schematics with photography, test 'Light' or 'Lossless' first. BreadPDF automatically rejects any run that would increase file size.",
    },
  },
  "unir-pdf": {
    eyebrow: {
      es: "Ensamblado vectorial en cliente",
      ca: "Assemblatge vectorial al client",
      en: "Client-side vector assembly",
    },
    title: {
      es: "Especificaciones de combinación y conservación de capas",
      ca: "Especificacions de combinació i conservació de capes",
      en: "Merging specifications and layer preservation",
    },
    engineDescription: {
      es: "La combinación de archivos se realiza a través de pdf-lib leyendo cada documento como árbol de objetos binario. Las páginas seleccionadas se clonan con sus diccionarios de fuentes, mapas de caracteres y anotaciones vectoriales intactos, unificando los catálogos en un único archivo correlativo.",
      ca: "La combinació de fitxers s'executa mitjançant pdf-lib llegint cada document com a arbre d'objectes binari. Les pàgines es clonen amb els seus diccionaris de tipografies, mapes de caràcters i anotacions vectorials intactes, unificant els catàlegs en un sol arxiu correlatiu.",
      en: "Document concatenation operates through pdf-lib, parsing each input PDF as a binary object tree. Pages are cloned with their embedded font dictionaries, character maps, and vector annotations fully preserved into a unified destination catalogue.",
    },
    bestFor: {
      es: [
        "Compilar memorias, tesis (TFG/TFM), portadas institucionales y anexos en un único expediente.",
        "Consolidar facturas mensuales, nóminas y recibos en un archivo de archivo ordenado.",
        "Agrupar contratos multiparte con hojas de firma anexadas.",
      ],
      ca: [
        "Compilar memòries, tesis (TFG/TFM), portades institucionals i annexos en un únic expedient.",
        "Consolidar factures mensuals, nòmines i rebuts en un arxiu ordenat.",
        "Agrupar contractes multipart amb fulls de signatura annexats.",
      ],
      en: [
        "Compiling academic theses, covers, and empirical appendices into one clean document.",
        "Consolidating monthly invoices, payroll, and receipts into audit-ready bundles.",
        "Assembling multipart agreements and signed counterparty addenda.",
      ],
    },
    limitations: {
      es: [
        "Documentos cifrados con contraseña de apertura deben desbloquearse previamente antes de ser incorporados.",
        "Formularios dinámicos interactivos complejos (XFA de Adobe) pueden requerir aplanado previo para evitar conflictos de nombres de campo entre archivos distintos.",
      ],
      ca: [
        "Documents xifrats amb contrasenya d'obertura han de desbloquejar-se abans de poder-los combinar.",
        "Formularis dinàmics complexos (XFA d'Adobe) poden necessitar aplanat previ per evitar conflictes de camps entre fitxers diferents.",
      ],
      en: [
        "Password-encrypted files must be decrypted prior to assembly.",
        "Dynamic interactive forms (Adobe XFA) should be flattened beforehand to prevent duplicate form field collisions across documents.",
      ],
    },
    proTip: {
      es: "Puedes mezclar páginas con orientación vertical y horizontal en el mismo documento; cada hoja conserva sus dimensiones y rotación nativas.",
      ca: "Pots combinar pàgines amb orientació vertical i apaïsada al mateix document; cada full conserva la seva mida i rotació natives.",
      en: "You can mix portrait and landscape sheets in a single pass; each page retains its native bounding box and orientation.",
    },
  },
  "dividir-pdf": {
    eyebrow: {
      es: "Segmentación estructural de páginas",
      ca: "Segmentació estructural de pàgines",
      en: "Structural page segmentation",
    },
    title: {
      es: "Directrices de partición por intervalos y extracción atómica",
      ca: "Directrius de partició per intervals i extracció atòmica",
      en: "Partitioning guidelines: custom intervals and atomic extraction",
    },
    engineDescription: {
      es: "El divisor aísla los índices de página solicitados y reconstruye árboles de páginas autónomos para cada fragmento generado. Solo se transfieren al nuevo archivo los recursos (fuentes, imágenes) referenciados por las páginas del intervalo, manteniendo el peso optimizado.",
      ca: "El divisor aïlla els índexs de pàgina sol·licitats i reconstrueix arbres de pàgines autònoms per a cada fragment generat. Només es transfereixen al nou arxiu els recursos referenciats per les pàgines de l'interval.",
      en: "The splitting engine isolates requested page indices, rebuilding self-contained page trees for each resulting chunk. Only resources (embedded fonts, imagery) directly referenced by target pages are copied over, keeping output files lean.",
    },
    bestFor: {
      es: [
        "Extraer capítulos específicos de libros, manuales técnicos o normativas.",
        "Separar facturas agrupadas en un PDF masivo para enviarlas individualmente a clientes.",
        "Aislar anexos confidenciales antes de remitir el cuerpo principal de un documento.",
      ],
      ca: [
        "Extreure capítols específics de llibres, manuals tècnics o normatives.",
        "Separar factures agrupades en un PDF massiu per enviar-les individualment a clients.",
        "Aïllar annexos confidencials abans de remetre el cos principal d'un document.",
      ],
      en: [
        "Isolating specific chapters or sections from lengthy reference manuals.",
        "Splitting batched monthly customer bills into individual PDFs for delivery.",
        "Separating proprietary annexes from public executive summaries.",
      ],
    },
    limitations: {
      es: [
        "La sintaxis de intervalos requiere comas y guiones válidos (ej. '1-3, 5, 8-10'). Números de página fuera del rango del documento serán ignorados.",
        "Si el PDF original contiene marcadores de índice jerárquicos (bookmarks), estos pueden no corresponderse en los fragmentos aislados.",
      ],
      ca: [
        "La sintaxi d'intervals requereix comes i guions vàlids (ex. '1-3, 5, 8-10'). Números fora del rang del document s'ometran.",
        "Si el PDF original conté marcadors d'índex jeràrquics (bookmarks), aquests poden no correspondre's en els fragments aïllats.",
      ],
      en: [
        "Interval syntax requires standard commas and hyphens (e.g. '1-3, 5, 8-10'). Out-of-bounds indices are safely ignored.",
        "Hierarchical table-of-contents bookmarks pointing to excluded pages will not survive into isolated fragments.",
      ],
    },
    proTip: {
      es: "Si lo que necesitas es cumplir un límite de megabytes para una plataforma escolar o judicial, utiliza la herramienta complementaria 'Dividir PDF por tamaño' que calcula automáticamente los cortes en MB.",
      ca: "Si el que necessites és complir un límit de megabytes per a un campus o seu judicial, utilitza l'eina complementària 'Dividir PDF per mida' que calcula els talls en MB.",
      en: "If your goal is meeting exact MB thresholds for institutional uploads, consider 'Split PDF by Size', which calculates cutoffs automatically.",
    },
  },
  "pdf-a-jpg": {
    eyebrow: {
      es: "Renderizado matricial de alta definición",
      ca: "Renderitzat matricial d'alta definició",
      en: "High-definition raster rendering",
    },
    title: {
      es: "Especificaciones de rasterizado, escala y fidelidad de color",
      ca: "Especificacions de rasterització, escala i fidelitat de color",
      en: "Rasterization specifications: scale multipliers and color fidelity",
    },
    engineDescription: {
      es: "Mediante el motor de visualización pdf.js conectado al contexto 2D de Canvas del navegador, cada página se decodifica en coordenadas vectoriales y se rasteriza a una matriz de píxeles RGB con suavizado subpíxel. La imagen resultante se codifica en JPEG con control granular de compresión y densidad.",
      ca: "Mitjançant el motor pdf.js connectat al context 2D de Canvas del navegador, cada pàgina es descodifica en coordenades vectorials i es rasteritza a una matriu de píxels RGB amb antialiasing. La imatge resultant es codifica en JPEG amb control granular de compressió.",
      en: "Using pdf.js coupled with browser Canvas 2D contexts, vector paths and embedded typography are rasterized into high-resolution RGB pixel buffers with subpixel antialiasing, then encoded into standard JPEG streams with adjustable quality factors.",
    },
    bestFor: {
      es: [
        "Publicar diapositivas y portadas en redes sociales (LinkedIn, X, Instagram) o presentaciones web.",
        "Incrustar páginas de catálogo en sitios de comercio electrónico o boletines por correo.",
        "Generar miniaturas de previsualización para portales documentales.",
      ],
      ca: [
        "Publicar diapositives i portades a xarxes socials o presentacions web.",
        "Incrustar pàgines de catàleg en botigues en línia o butlletins per correu.",
        "Generar miniatures de previsualització per a portals documentals.",
      ],
      en: [
        "Publishing slide decks and report covers on social platforms or web slide carousels.",
        "Embedding catalog pages into ecommerce product galleries and newsletters.",
        "Creating crisp preview thumbnails for digital document repositories.",
      ],
    },
    limitations: {
      es: [
        "El formato JPG no admite fondos transparentes (los fondos vacíos se renderizan en blanco sólido). Para transparencia alfa, utiliza la herramienta 'PDF a PNG'.",
        "El texto rasterizado en JPG pasa a ser gráfico; no es seleccionable ni almacena metadatos de accesibilidad para lectores de pantalla.",
      ],
      ca: [
        "El format JPG no admet fons transparents (els fons buits es renderitzen en blanc sòlid). Per a transparència, utilitza 'PDF a PNG'.",
        "El text rasteritzat a JPG passa a ser gràfic; no és seleccionable ni conserva metadades d'accessibilitat.",
      ],
      en: [
        "JPEG does not support alpha transparency (transparent canvas renders as solid white). For transparent backgrounds, use 'PDF to PNG'.",
        "Rasterized text becomes pure image data, losing screen-reader accessibility and Ctrl+F searchability.",
      ],
    },
    proTip: {
      es: "Para documentos destinados a lectura en pantalla (móviles y monitores), un multiplicador de escala de 1.5x o 2x con calidad al 85% ofrece nitidez perfecta sin disparar el peso de la imagen.",
      ca: "Per a documents destinats a pantalla, un multiplicador d'escala d'1.5x o 2x amb qualitat al 85% ofereix nitidesa perfecta sense disparar el pes.",
      en: "For screen viewing, a 1.5x or 2x resolution factor at 85% quality achieves crisp text edges without excessive byte weight.",
    },
  },
  "jpg-a-pdf": {
    eyebrow: {
      es: "Empaquetado documental de imágenes",
      ca: "Empaquetament documental d'imatges",
      en: "Image-to-document packaging",
    },
    title: {
      es: "Estandarización de páginas, márgenes y relaciones de aspecto",
      ca: "Estandardització de pàgines, marges i relacions d'aspecte",
      en: "Page sizing, margins, and aspect ratio standardization",
    },
    engineDescription: {
      es: "Las imágenes seleccionadas se leen en memoria mediante FileReader y se integran en un nuevo documento PDF como flujos XObject Image. En el modo 'A4 con márgenes', el algoritmo calcula el factor de escala proporcional (contain) para centrar la fotografía en 595.28 × 841.89 puntos tipográficos sin recortar bordes.",
      ca: "Les imatges seleccionades es llegeixen a memòria mitjançant FileReader i s'integren en un nou document PDF com a fluxos XObject Image. En mode 'A4 amb marges', l'algorisme calcula el factor d'escala proporcional per centrar la fotografia sense retallar vores.",
      en: "Source images are parsed via FileReader into raw memory and embedded as native PDF Image XObjects. In 'A4 with margins' mode, proportional containment algorithms position images within standard ISO 595.28 × 841.89 point canvases without clipping.",
    },
    bestFor: {
      es: [
        "Convertir fotos de recibos, albaranes, DNI o tickets en un archivo PDF ordenado listo para gestoría.",
        "Crear dossieres fotográficos o catálogos imprimibles a partir de imágenes de producto.",
        "Unificar capturas de pantalla de trámites en un único documento cronológico.",
      ],
      ca: [
        "Convertir fotos de rebuts, albarans, DNI o tiquets en un arxiu PDF ordenat per a gestoria.",
        "Crear dossiers fotogràfics o catàlegs imprimibles a partir d'imatges de producte.",
        "Unificar captures de pantalla de tràmits en un sol document cronològic.",
      ],
      en: [
        "Converting camera snapshots of receipts, identity cards, or physical forms for administrative filing.",
        "Creating clean, printable photo lookbooks from individual product renders.",
        "Consolidating chronological software screenshots into an audit log.",
      ],
    },
    limitations: {
      es: [
        "Empaquetar fotos en PDF no convierte mágicamente el texto de la imagen en texto seleccionable. Si necesitas buscar en el documento, aplica posteriormente 'OCR de PDF'.",
        "Imágenes con resoluciones dispares pueden mostrar tamaños variables si se elige el modo 'Ajustado a la imagen'. Utiliza 'A4' para uniformidad visual.",
      ],
      ca: [
        "Empaquetar fotos a PDF no converteix màgicament el text de la foto en text seleccionable. Si necessites cercar-hi, aplica després 'OCR de PDF'.",
        "Imatges amb resolucions dispars poden mostrar mides variables si es tria 'Ajustat a la imatge'. Fes servir 'A4' per a uniformitat.",
      ],
      en: [
        "Packaging photos into a PDF does not turn bitmap glyphs into selectable text. Use 'PDF OCR' afterwards to add a searchable text layer.",
        "Photos shot across varying cameras will yield mismatched canvas dimensions in 'Image Fitted' mode. Select 'A4' for homogeneous layout.",
      ],
    },
    proTip: {
      es: "Arrastra y reordena las tarjetas de imagen en la vista previa antes de pulsar convertir para garantizar que el PDF siga exactamente el orden deseado.",
      ca: "Arrossega i reordena les targetes d'imatge a la vista prèvia abans de prémer convertir per garantir l'ordre desitjat.",
      en: "Drag and drop the thumbnail cards into your desired sequence before conversion to ensure chronological order in the generated PDF.",
    },
  },
  "rotar-pdf": {
    eyebrow: {
      es: "Geometría y metadatos de orientación",
      ca: "Geometria i metadades d'orientació",
      en: "Geometry and orientation metadata",
    },
    title: {
      es: "Modificación de diccionarios de página y persistencia visual",
      ca: "Modificació de diccionaris de pàgina i persistència visual",
      en: "Page dictionary mutation and cross-viewer persistence",
    },
    engineDescription: {
      es: "A diferencia de un visor que solo rota la pantalla de manera temporal, BreadPDF modifica la propiedad intrínseca /Rotate (en múltiplos canónicos de 90°) dentro del diccionario de cada página en la estructura binaria del PDF. Al guardar, el giro queda fijado de forma permanente para cualquier lector de software, navegador o dispositivo de impresión.",
      ca: "A diferència d'un visor que només gira la pantalla temporalment, BreadPDF modifica la propietat intrínseca /Rotate (en múltiples canònics de 90°) dins del diccionari de cada pàgina. En desar, el gir queda fixat de forma permanent.",
      en: "Unlike desktop viewers that merely rotate the viewport in temporary memory, BreadPDF alters the underlying /Rotate key within each page dictionary. Upon download, rotation is permanently baked in across all PDF readers, mobile operating systems, and physical printers.",
    },
    bestFor: {
      es: [
        "Corregir páginas escaneadas accidentalmente al revés (180°) o en orientación vertical errónea.",
        "Alinear tablas financieras o planos apaisados (90°) dentro de informes verticales.",
        "Preparar expedientes para lectura cómoda en tabletas y portátiles sin forzar el visor.",
      ],
      ca: [
        "Corregir pàgines escanejades accidentalment a l'inrevés (180°) o en orientació vertical errònia.",
        "Alinear taules financeres o plànols apaïsats (90°) dins d'informes verticals.",
        "Preparar expedients per a lectura còmoda en tauletes i portàtils.",
      ],
      en: [
        "Fixing documents fed upside down (180°) or sideways into sheet-fed scanners.",
        "Rotating landscape financial sheets or engineering schematics (90°) embedded in upright reports.",
        "Preparing presentation handouts for tablet reading without requiring manual viewer orientation overrides.",
      ],
    },
    limitations: {
      es: [
        "La rotación modifica la orientación de la hoja completa, no de fragmentos o textos aislados dentro de ella.",
        "Documentos protegidos con contraseña de edición requieren autorización previa para escribir cambios en los diccionarios de página.",
      ],
      ca: [
        "La rotació modifica l'orientació del full sencer, no de fragments o textos aïllats dins d'ell.",
        "Documents protegits amb contrasenya d'edició requereixen autorització prèvia per escriure canvis.",
      ],
      en: [
        "Rotation mutates the entire page canvas bounding box, not individual text blocks or embedded images.",
        "Files with write-protection passwords require unlocking before orientation dictionary edits can be applied.",
      ],
    },
    proTip: {
      es: "Puedes rotar solo páginas impares, pares o rangos específicos (por ejemplo: '2, 4, 7-9') para corregir hojas horizontales sin alterar el resto de la memoria.",
      ca: "Pots girar només pàgines senars, parells o rangs concrets (ex. '2, 4, 7-9') per corregir fulls apaïsats sense tocar la resta.",
      en: "Target specific sheets using comma ranges (e.g. '2, 4, 7-9') to orient horizontal tables without touching the rest of your report.",
    },
  },

  "mejorar-imagenes": {
    eyebrow: {
      es: "Procesado digital de señal e imagen",
      ca: "Processament digital de senyal i imatge",
      en: "Digital signal & image processing",
    },
    title: {
      es: "Algoritmos de convolución espacial y calibración dinámica",
      ca: "Algorismes de convolució espacial i calibratge dinàmic",
      en: "Spatial convolution and dynamic calibration algorithms",
    },
    engineDescription: {
      es: "El motor ejecuta un filtro espacial laplaciano de alta frecuencia (unsharp masking) sobre la matriz RGB de píxeles sin interpolar artefactos de compresión. En modo Documento, aplica un umbral adaptativo que intensifica la tinta de los caracteres alfanuméricos y elimina el ruido de fondo amarillo o gris de escaneos y fotografías móviles.",
      ca: "El motor executa un filtre espacial laplacià d'alta freqüència (unsharp masking) sobre la matriu RGB de píxels sense interpolar artefactes de compressió. En mode Document, aplica un llindar adaptatiu que intensifica la tinta dels caràcters alfanumèrics i elimina el soroll de fons groc o gris d'escanejats i fotografies mòbils.",
      en: "The engine runs a high-frequency Laplacian spatial unsharp mask across the RGB pixel matrix without introducing artificial compression ringing. In Document mode, it applies adaptive thresholding to darken typographic strokes while clearing yellowed or uneven background illumination from camera captures.",
    },
    bestFor: {
      es: [
        "Aclarar y enfocar fotografías de facturas, albaranes, recibos y apuntes tomadas con el móvil.",
        "Aumentar la nitidez de capturas de pantalla borrosas o de baja resolución para presentaciones.",
        "Restaurar el contraste y la definición de fotos antiguas o descoloridas sin subir archivos a internet.",
      ],
      ca: [
        "Aclarir i enfocar fotografies de factures, albarans, rebuts i apunts preses amb el mòbil.",
        "Augmentar la nitidesa de captures de pantalla borroses o de baixa resolució per a presentacions.",
        "Restaurar el contrast i la definició de fotos antigues o descolorides sense pujar fitxers a internet.",
      ],
      en: [
        "Sharpening mobile camera captures of receipts, handwritten notes, and paper documents.",
        "Clarifying blurry low-resolution screenshots for technical slide decks.",
        "Restoring contrast and edge fidelity in faded or compressed images with 100% in-browser privacy.",
      ],
    },
    limitations: {
      es: [
        "Si una imagen tiene desenfoque extremo o motion blur grave de lente, la máscara de enfoque resaltará los bordes existentes pero no puede inventar detalles destruidos por completo.",
        "El reescalado 2x aumenta el número de píxeles mediante interpolación bicúbica; para imágenes gigantes de más de 30 megapíxeles se recomienda 1x o 1.5x para optimizar la memoria del navegador.",
      ],
      ca: [
        "Si una imatge té desenfocament extrem o motion blur greu de lent, la màscara d'enfocament ressaltarà les vores existents però no pot inventar detalls destruïts per complet.",
        "El reescalat 2x augmenta el nombre de píxels mitjançant interpolació bicúbica; per a imatges gegants de més de 30 megapíxels es recomana 1x o 1.5x per optimitzar la memòria del navegador.",
      ],
      en: [
        "Severe optical lens motion blur or extreme out-of-focus captures cannot synthesize completely missing microscopic details.",
        "2x upscaling resamples the canvas bicubically; for ultra-large files (>30 megapixels), 1x or 1.5x is recommended to conserve browser RAM.",
      ],
    },
    proTip: {
      es: "Para documentos escaneados o recibos con sombras, selecciona el modo 'Texto / Documento escaneado' con nitidez al 30%: blanqueará el papel y hará que las letras destaquen con total legibilidad.",
      ca: "Per a documents escanejats o rebuts amb ombres, selecciona el mode 'Text / Document escanejat' amb nitidesa al 30%: blanquejarà el paper i farà que les lletres destaquin amb total llegibilitat.",
      en: "For photographed paper receipts with shadows, select 'Text / Scanned Document' with 30% sharpness: it will purify background paper tones and make typography punchy and readable.",
    },
  },
};

/**
 * Verified Multi-Tool Workflow Map derived directly from BREADPDF_MASTER_WORKFLOWS.csv
 * Only compatible PDF-producing to PDF-accepting connections are established.
 */
export const TOOL_WORKFLOW_MAP: Record<string, WorkflowSuggestion> = {
  // WF-01: word-a-pdf -> unir-pdf -> comprimir-pdf
  "word-a-pdf": {
    targetToolSlug: "unir-pdf",
    badge: {
      es: "Paso siguiente recomendado",
      ca: "Següent pas recomanat",
      en: "Recommended next step",
    },
    title: {
      es: "¿Vas a juntar este documento con otros?",
      ca: "Vols ajuntar aquest document amb altres?",
      en: "Combining this document with others?",
    },
    description: {
      es: "Une tus anexos, portadas o memorias en un único archivo ordenado.",
      ca: "Uneix els teus annexos, portades o memòries en un sol arxiu ordenat.",
      en: "Merge your appendices, covers or notes into a single organized file.",
    },
    cta: {
      es: "Continuar a Unir PDF",
      ca: "Continuar a Unir PDF",
      en: "Continue to Merge PDF",
    },
  },
  "unir-pdf": {
    targetToolSlug: "comprimir-pdf",
    badge: {
      es: "Paso siguiente recomendado",
      ca: "Següent pas recomanat",
      en: "Recommended next step",
    },
    title: {
      es: "¿Supera el límite de subida o correo?",
      ca: "Supera el límit de pujada o correu?",
      en: "Exceeds upload or email limits?",
    },
    description: {
      es: "Reduce el peso de tu documento unificado para Moodle (5MB), LexNET (10MB) o email (20MB).",
      ca: "Redueix el pes del teu document unit per a Moodle (5MB), LexNET (10MB) o correu (20MB).",
      en: "Shrink your merged document for Moodle (5MB), legal portals (10MB) or email (20MB).",
    },
    cta: {
      es: "Comprimir este documento",
      ca: "Comprimir aquest document",
      en: "Compress this document",
    },
  },

  // WF-02 & WF-04: censurar-pdf -> firmar-pdf o sanear-pdf
  "censurar-pdf": {
    targetToolSlug: "sanear-pdf",
    badge: {
      es: "Seguridad y RGPD",
      ca: "Seguretat i RGPD",
      en: "Security & GDPR",
    },
    title: {
      es: "¿Quieres purgar metadatos ocultos?",
      ca: "Vols purgar metadades ocultes?",
      en: "Need to purge hidden metadata?",
    },
    description: {
      es: "Elimina historiales de autoría, comentarios y pistas antes de compartir el documento.",
      ca: "Elimina historials d'autoria, comentaris i pistes abans de compartir el document.",
      en: "Strip author history, comments, and traces before sharing externally.",
    },
    cta: {
      es: "Sanear metadatos",
      ca: "Sanejar metadades",
      en: "Sanitize metadata",
    },
  },

  // WF-04: rellenar-formulario-pdf -> firmar-pdf
  "rellenar-formulario-pdf": {
    targetToolSlug: "firmar-pdf",
    badge: {
      es: "Trámite final",
      ca: "Tràmit final",
      en: "Final step",
    },
    title: {
      es: "¿Necesitas estampar tu firma?",
      ca: "Necessites estampar la teva signatura?",
      en: "Need to sign the completed form?",
    },
    description: {
      es: "Añade tu rúbrica manuscrita al formulario cumplimentado sin imprimirlo.",
      ca: "Afegeix la teva signatura manuscrita al formulari omplert sense imprimir-lo.",
      en: "Add your handwritten signature to the filled form without printing.",
    },
    cta: {
      es: "Firmar documento ahora",
      ca: "Signar document ara",
      en: "Sign document now",
    },
  },

  // WF-06: eliminar-paginas-en-blanco -> ocr-pdf
  "eliminar-paginas-en-blanco": {
    targetToolSlug: "ocr-pdf",
    badge: {
      es: "Digitalización",
      ca: "Digitalització",
      en: "Digitization",
    },
    title: {
      es: "¿Hacer el documento escaneado buscable?",
      ca: "Fer el document escanejat cercable?",
      en: "Make scanned pages searchable?",
    },
    description: {
      es: "Reconoce el texto de las páginas limpias para poder copiarlo y buscar con Ctrl+F.",
      ca: "Reconeix el text de les pàgines netes per copiar-lo i cercar amb Ctrl+F.",
      en: "Recognize text on clean pages to copy and search with Ctrl+F.",
    },
    cta: {
      es: "Reconocer texto con OCR",
      ca: "Reconèixer text amb OCR",
      en: "Recognize text with OCR",
    },
  },

  // ocr-pdf -> pdf-a-word
  "ocr-pdf": {
    targetToolSlug: "pdf-a-word",
    badge: {
      es: "Edición completa",
      ca: "Edició completa",
      en: "Full editing",
    },
    title: {
      es: "¿Quieres editar el texto en Word?",
      ca: "Vols editar el text a Word?",
      en: "Want to edit the text in Word?",
    },
    description: {
      es: "Pasa el documento con texto reconocido directamente a un archivo .docx editable.",
      ca: "Passa el document amb text reconegut directament a un fitxer .docx editable.",
      en: "Convert the document with recognized text straight into an editable .docx.",
    },
    cta: {
      es: "Convertir a Word",
      ca: "Convertir a Word",
      en: "Convert to Word",
    },
  },

  // comprimir-pdf -> firmar-pdf o proteger-pdf
  "comprimir-pdf": {
    targetToolSlug: "firmar-pdf",
    badge: {
      es: "Finalización de documento",
      ca: "Finalització de document",
      en: "Document finalization",
    },
    title: {
      es: "¿Necesitas firmar o proteger tu PDF optimizado?",
      ca: "Necessites signar o protegir el teu PDF optimitzat?",
      en: "Need to sign or protect your optimized PDF?",
    },
    description: {
      es: "Estampa tu firma digital simple o añade una contraseña antes de enviarlo.",
      ca: "Estampa la teva signatura digital simple o afegeix una contrasenya abans d'enviar-lo.",
      en: "Add your visual signature or encrypt with a password before sending.",
    },
    cta: {
      es: "Ir a Firmar PDF",
      ca: "Anar a Signar PDF",
      en: "Go to Sign PDF",
    },
  },

  // dividir-pdf -> unir-pdf o marca-de-agua
  "dividir-pdf": {
    targetToolSlug: "marca-de-agua",
    badge: {
      es: "Confidencialidad",
      ca: "Confidencialitat",
      en: "Confidentiality",
    },
    title: {
      es: "¿Añadir sello de confidencialidad a las páginas?",
      ca: "Afegir segell de confidencialitat a les pàgines?",
      en: "Add confidentiality watermark?",
    },
    description: {
      es: "Estampa 'COPIA OFICIAL' o 'CONFIDENCIAL' sobre las páginas extraídas.",
      ca: "Estampa 'CÒPIA OFICIAL' o 'CONFIDENCIAL' sobre les pàgines extretes.",
      en: "Stamp 'CONFIDENTIAL' or custom text over the extracted pages.",
    },
    cta: {
      es: "Añadir marca de agua",
      ca: "Afegir marca d'aigua",
      en: "Add watermark",
    },
  },

  // recortar-pdf -> numerar-paginas (Workflow encuadre + foliado)
  "recortar-pdf": {
    targetToolSlug: "numerar-paginas",
    badge: {
      es: "Maquetación final",
      ca: "Maquetació final",
      en: "Final formatting",
    },
    title: {
      es: "¿Necesitas foliar las páginas recortadas?",
      ca: "Necessites foliar les pàgines retallades?",
      en: "Need to number your cropped pages?",
    },
    description: {
      es: "Añade numeración de página limpia y homogénea en pie o cabecera con el formato que elijas.",
      ca: "Afegeix numeració de pàgina neta i homogènia al peu o capçalera amb el format que triïs.",
      en: "Add clean, uniform page numbering in headers or footers in your preferred format.",
    },
    cta: {
      es: "Continuar a Numerar páginas",
      ca: "Continuar a Numerar pàgines",
      en: "Continue to Number pages",
    },
  },

  // extraer-imagenes-pdf -> imagen-a-webp (Workflow optimización de fotos extraídas)
  "extraer-imagenes-pdf": {
    targetToolSlug: "imagen-a-webp",
    badge: {
      es: "Optimización web",
      ca: "Optimització web",
      en: "Web optimization",
    },
    title: {
      es: "¿Optimizar las imágenes extraídas para web?",
      ca: "Optimitzar les imatges extretes per a web?",
      en: "Optimize extracted images for the web?",
    },
    description: {
      es: "Convierte tus imágenes a WebP moderno para reducir hasta un 80% su peso en tiendas online y webs.",
      ca: "Converteix les teves imatges a WebP modern per reduir fins a un 80% el seu pes en botigues en línia i webs.",
      en: "Convert your images to modern WebP format to reduce up to 80% file size for websites and ecommerce.",
    },
    cta: {
      es: "Optimizar a WebP",
      ca: "Optimitzar a WebP",
      en: "Optimize to WebP",
    },
  },

  // numerar-paginas -> aplanar-pdf (Workflow fijar foliado)
  "numerar-paginas": {
    targetToolSlug: "aplanar-pdf",
    badge: {
      es: "Seguridad y fijación",
      ca: "Seguretat i fixació",
      en: "Security & Flattening",
    },
    title: {
      es: "¿Fijar la numeración de forma permanente?",
      ca: "Vols fixar la numeració de manera permanent?",
      en: "Permanently flatten page numbers?",
    },
    description: {
      es: "Aplana el documento para consolidar los números de página como parte gráfica del PDF e impedir su edición.",
      ca: "Aplana el document per consolidar els números de pàgina com a part gràfica del PDF i evitar-ne l'edició.",
      en: "Flatten the document to merge page numbers permanently into the PDF background and prevent edits.",
    },
    cta: {
      es: "Aplanar este documento",
      ca: "Aplanar aquest document",
      en: "Flatten this document",
    },
  },

  // mejorar-imagenes -> jpg-a-pdf (Workflow empaquetar imágenes a PDF)
  "mejorar-imagenes": {
    targetToolSlug: "jpg-a-pdf",
    badge: {
      es: "Conversión a documento",
      ca: "Conversió a document",
      en: "Document conversion",
    },
    title: {
      es: "¿Reunir tus imágenes mejoradas en un único PDF?",
      ca: "Vols reunir les imatges millorades en un sol PDF?",
      en: "Combine your enhanced images into a single PDF?",
    },
    description: {
      es: "Convierte tus fotos, facturas o recibos ya nítidos en un documento PDF organizado y listo para enviar.",
      ca: "Converteix les teves fotos, factures o rebuts ja nítids en un document PDF organitzat i a punt per enviar.",
      en: "Convert your sharpened photos, invoices or receipts into a consolidated PDF ready to share.",
    },
    cta: {
      es: "Convertir a PDF",
      ca: "Convertir a PDF",
      en: "Convert to PDF",
    },
  },
};
