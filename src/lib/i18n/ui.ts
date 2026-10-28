import type { Locale } from "./config";

/**
 * Centralised UI copy. Nothing user visible should be hardcoded in components.
 * The Spanish dictionary defines the shape; ca/en must match it.
 */

const es = {
  brandTagline: "Herramientas para trabajar con documentos PDF, con la privacidad por delante.",
  nav: {
    tools: "Herramientas",
    more: "Más herramientas",
    premium: "Premium",
    privacy: "Privacidad",
    login: "Acceder",
    register: "Registrarse",
    cta: "Comprimir un PDF",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menu: "Menú principal",
    categories: "Categorías de herramientas",
    allTools: "Todo el catálogo",
    language: "Idioma",
    languageAria: "Cambiar de idioma",
    home: "Inicio",
    megaTitle: "Catálogo por familias",
    megaFooter: "Ver todas las herramientas",
    myAccount: "Mi cuenta",
    myFavorites: "Mis favoritos",
    preferences: "Preferencias",
    communications: "Comunicaciones",
    security: "Seguridad",
    premiumStatus: "Estado Premium",
    logout: "Cerrar sesión",
    exit: "Salir",
    freePlan: "Gratis",
    premiumPlan: "Premium",
  },
  home: {
    eyebrow: "Plataforma documental",
    featured: "Herramientas destacadas",
    h1: "Todas tus herramientas PDF. En un solo lugar.",
    sub: "Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.",
    ctaAll: (n: number) => `Ver las ${n} herramientas`,
    ctaCompress: "Comprimir PDF",
    popularTitle: "Las más usadas en BreadPDF",
    popularSub: (live: number, soon: number) =>
      soon > 0
        ? `${live} herramientas listas para usar y ${soon} más en el roadmap.`
        : `${live} herramientas listas para usar directamente en tu navegador.`,
    viewAll: "Ver todo el catálogo",
    categoriesTitle: "Explora por familia",
    categoriesSub: "Cada familia agrupa las tareas que se parecen entre sí.",
    highlights: [
      {
        title: "Resultados en segundos",
        body: "Sin colas ni esperas: el proceso arranca en cuanto sueltas el archivo.",
      },
      {
        title: "Tus archivos no se suben",
        body: "Las herramientas trabajan íntegramente en tu dispositivo de forma 100% privada.",
      },
      {
        title: "Una herramienta, una tarea",
        body: "Cada página resuelve una intención concreta, con las opciones justas.",
      },
    ],
    editorial: {
      eyebrow: "Documentos sin complicaciones",
      title: "Herramientas PDF diseñadas para la productividad y la privacidad",
      sub: "BreadPDF proporciona un conjunto directo de utilidades para trabajar con archivos PDF y convertirlos de forma ágil, segura y sin necesidad de instalar software pesado.",
      articles: [
        {
          title: "Procesamiento en tu navegador",
          desc: "Trabaja con tus documentos directamente en el navegador cuando la herramienta lo permite, sin subir archivos a un servidor.",
        },
        {
          title: "Sin registros obligatorios",
          desc: "Accede directamente a las herramientas sin necesidad de crear una cuenta ni compartir tus datos.",
        },
        {
          title: "Conversión entre formatos",
          desc: "Convierte documentos e imágenes a los formatos que admite cada herramienta sin complicaciones.",
        },
        {
          title: "Optimización y preparación",
          desc: "Reduce el tamaño de tus PDF o prepara los documentos para compartirlos e imprimirlos, según la herramienta.",
        },
      ],
    },
  },
  catalog: {
    eyebrow: "Herramientas BreadPDF",
    h1: "Todas las herramientas PDF que necesitas.",
    sub: "Trabaja, convierte, organiza y optimiza tus documentos directamente desde BreadPDF.",
    intro: (live: number, soon: number) =>
      soon > 0
        ? `${live} herramientas funcionan hoy en tu propio dispositivo y ${soon} más están en camino.`
        : `${live} herramientas disponibles y listas para procesar en tu propio navegador.`,
    filters: "Filtrar herramientas",
    all: "Todas",
    popular: "Populares",
    popularAria: "Herramientas populares",
    count: (n: number) => (n === 1 ? "1 herramienta" : `${n} herramientas`),
    summary: (live: number, soon: number) =>
      `${live} herramientas disponibles hoy · ${soon} en el roadmap de BreadPDF.`,
  },
  search: {
    placeholder: "¿Qué quieres hacer con tu PDF?",
    popular: "Populares",
    emptyTitle: "No encontramos ninguna herramienta para esa búsqueda.",
    emptySuggestion: "Prueba con términos como comprimir, unir, convertir, firmar u OCR.",
    empty: "No encontramos ninguna herramienta para esa búsqueda.",
    results: "Resultados de búsqueda",
  },
  category: {
    otherTitle: "Otras familias",
    toolsIn: "Herramientas de esta familia",
    whatCanYouDo: "¿Qué puedes hacer en esta categoría?",
    faqTitle: "Preguntas frecuentes sobre esta categoría",
    details: {
      optimizar: {
        useCases: "Ideal para preparar documentos antes de enviarlos por correo electrónico, cumplir con los límites de tamaño en portales administrativos o acelerar la carga de PDFs en sitios web sin perder legibilidad.",
        faqs: [
          {
            q: "¿Cómo se reduce el tamaño de un PDF sin perder calidad?",
            a: "Con el modo sin pérdida se optimizan las tablas de fuentes y metadatos internos. Si se requiere mayor compresión, los algoritmos adaptativos reescalan imágenes con suavizado para mantener el texto nítido.",
          },
          {
            q: "¿Los documentos optimizados son compatibles con cualquier visor?",
            a: "Sí, todos los archivos generados cumplen con el estándar internacional ISO 32000-1 y se abren en Adobe Acrobat, navegadores y dispositivos móviles.",
          },
        ],
      },
      organizar: {
        useCases: "Perfecto para consolidar facturas, informes periódicos, eliminar páginas en blanco antes de imprimir o ensamblar un expediente completo a partir de fuentes independientes.",
        faqs: [
          {
            q: "¿Existe un límite en la cantidad de páginas o archivos?",
            a: "No hay límites prefijados. Las operaciones se procesan en la memoria de tu navegador, permitiendo organizar documentos de gran volumen de forma inmediata.",
          },
          {
            q: "¿Se puede alterar el orden de las páginas antes de procesar?",
            a: "Sí, nuestras utilidades interactivas permiten previsualizar, arrastrar y reordenar visualmente páginas o archivos antes de generar el PDF final.",
          },
        ],
      },
      convertir: {
        useCases: "Esencial para reutilizar gráficos de presentaciones, transformar recibos e imágenes en PDF estándar o extraer tablas para análisis en hojas de cálculo.",
        faqs: [
          {
            q: "¿Qué formatos son compatibles para la conversión?",
            a: "Puedes convertir imágenes (JPG, PNG, WebP) a PDF y transformar PDFs a imágenes de alta resolución conservando el contraste y color original.",
          },
          {
            q: "¿Se conserva la resolución de las imágenes?",
            a: "Sí, puedes seleccionar multiplicadores de escala (de 1x hasta 4x) para obtener imágenes listas para impresión profesional.",
          },
        ],
      },
      editar: {
        useCases: "Útil para separar capítulos de libros, descartar anexos confidenciales antes de compartir un informe o extraer páginas clave de documentos extensos.",
        faqs: [
          {
            q: "¿Cómo se eliminan páginas de un PDF?",
            a: "Seleccionas las hojas a suprimir de forma visual o mediante intervalos numéricos y generas una versión limpia al instante.",
          },
        ],
      },
      seguridad: {
        useCases: "Protección de contratos, nóminas y estados financieros mediante cifrado y restricciones de apertura.",
        faqs: [
          {
            q: "¿Es seguro procesar datos sensibles en BreadPDF?",
            a: "Completamente. Las operaciones se realizan localmente en tu navegador sin subir el contenido a servidores remotos.",
          },
        ],
      },
      inteligencia: {
        useCases: "Digitalización de recibos escaneados, extracción de texto editable y búsqueda de términos en documentos antiguos.",
        faqs: [
          {
            q: "¿Qué idiomas reconoce el motor de OCR?",
            a: "Soporta español, catalán, inglés y los principales alfabetos occidentales con detección automática de columnas y párrafos.",
          },
        ],
      },
    },
  },
  tool: {
    howItWorks: "Cómo funciona",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    details: "Ver detalles",
    viewMoreCategory: (name: string) => `Ver más de ${name}`,
    favorite: "Favorito",
    favorited: "Favorita",
    addFavorite: "Añadir a mis favoritos",
    removeFavorite: "Quitar de mis favoritos",
  },
  status: {
    pending: "En construcción",
    soon: "Próximamente",
    inBrowser: "En navegador",
  },
  workspace: {
    aria: (name: string) => `Área de trabajo de ${name}`,
    dropOne: "Arrastra tu archivo aquí",
    dropMany: "Arrastra tus archivos aquí",
    hint: "o selecciónalos desde tu dispositivo",
    hintOne: "o selecciónalo desde tu dispositivo",
    selectOne: "Seleccionar archivo",
    selectMany: "Seleccionar archivos",
    filesReady: (n: number) => (n === 1 ? "1 archivo listo" : `${n} archivos listos`),
    processing: "Procesando…",
    progress: (percent: number) => `${percent}% completado`,
    privacyNote: "Tus archivos no salen de este dispositivo.",
    adjustOptions: "Ajusta las opciones antes o después de añadir el archivo",
    privateLabel: "100% privado",
    optionsTitle: "Opciones de la herramienta",
    compressionLevel: "Nivel de compresión:",
    done: "¡Listo! Archivo procesado con éxito",
    moveUp: (name: string) => `Subir ${name}`,
    moveDown: (name: string) => `Bajar ${name}`,
    remove: (name: string) => `Quitar ${name}`,
    invalidFormat: "Ese formato de archivo no es válido para esta herramienta.",
    minFiles: (n: number) =>
      n === 1 ? "Añade al menos 1 archivo." : `Añade al menos ${n} archivos.`,
    genericError:
      "No se ha podido procesar el documento. Comprueba que el archivo no esté protegido.",
    pendingTitle: "Esta herramienta todavía no está disponible",
    pendingNote: "Preferimos decírtelo antes que ofrecerte un botón que no hace nada.",
    downloads: "Archivos generados",
    nextStepTitle: "¿Qué quieres hacer ahora?",
    suiteLabel: "Herramientas BreadPDF",
    continueWithoutDownload: "Sigue sin descargar",
    downloadPdf: "Descargar PDF",
    downloadImage: "Descargar imagen",
    downloadZip: "Descargar ZIP",
    downloadAction: "Descargar",
    discoverSuite: "Explora todas las herramientas",
    suiteDescription: "51 herramientas de conversión, organización y seguridad",
    settingsTitle: "Ajustes de la herramienta",
    noPagesSelected: "No hay páginas seleccionadas para procesar.",
    needSignature: "Por favor, dibuja o sube una firma antes de exportar.",
    pagesProcessed: (count: number) =>
      count === 1 ? "1 página procesada con éxito." : `${count} páginas procesadas con éxito.`,
    downloadNow: "Descargar ahora",
    downloadAllZip: "Descargar todo en un ZIP",
    splitTargetLabel: "¿Cómo quieres guardar las páginas seleccionadas?",
    splitTargetCombined: "En 1 solo PDF (juntas)",
    splitTargetIndividual: "En varios PDFs (1 por cada página)",
    loadingPages: "Generando vista previa de páginas...",
    loadingPreview: "Cargando...",
    addMoreFiles: "Añadir más archivos",
    addMoreFilesSubtitle: "Añade al menos otro archivo para poder combinarlos.",
    pagesReady: (count: number) => `${count} ${count === 1 ? "página lista" : "páginas listas"}`,
    readyForProcessing: "Listo para procesar",
    fileDetected: "Detectado",
    totalSize: (size: string) => `Tamaño total: ${size}`,
    configureToStart: "Configura las opciones y genera tu documento",
    viewThumbnails: "Miniaturas",
    viewFiles: "Archivos",
    selectedPages: (count: number) => `${count} ${count === 1 ? "página seleccionada" : "páginas seleccionadas"}`,
    allPages: (count: number) => `Seleccionar todas (${count})`,
    clearSelection: "Limpiar selección",
    undo: "Deshacer",
    redo: "Rehacer",
    rotateSelected: (count: number) => `Girar (${count})`,
    rotateAll: "Girar todas",
    deleteSelected: (count: number) => `Eliminar (${count})`,
    addMorePdfs: "Añadir más PDF",
    pageLabel: "pág.",
    pageSelectionHelp: "Selecciona páginas para aplicar las opciones disponibles o arrástralas para cambiar el orden.",
    splitPageSelectionHelp: "Selecciona las páginas que quieres incluir en el nuevo PDF.",
    pagesOutOfTotal: (selected: number, total: number) => `${selected} de ${total} páginas`,
    selectPage: "Seleccionar página",
    deselectPage: "Desmarcar página",
    rotatePage: "Girar 90°",
    deletePage: "Eliminar página",
    reorderPage: "Arrastrar para ordenar",
    pdfLoadError: "No se pudieron abrir las páginas. Comprueba que el PDF no esté dañado o protegido.",
    previewUnavailable: "Vista previa no disponible",
  },
  privacy: {
    eyebrow: "Transparencia",
    title: "Qué pasa con tus archivos",
    seoTitle: "Privacidad y tratamiento de archivos | BreadPDF",
    seoDescription:
      "Cómo trata BreadPDF tus documentos: las herramientas actuales procesan los archivos en tu navegador y no se envían a ningún servidor.",
    body: [
      "Todas las herramientas publicadas hoy en BreadPDF se ejecutan dentro de tu navegador. El documento que seleccionas no se envía a ningún servidor, no se almacena y no se comparte con terceros.",
      "Al cerrar o recargar la página, los archivos y los resultados generados desaparecen de la memoria del navegador. No conservamos copias porque nunca las recibimos.",
    ],
    sections: [
      {
        title: "Herramientas que sí necesitarán servidor",
        body: "Algunas conversiones complejas, como PDF a Word o Word a PDF, requieren motores especializados de procesamiento en servidor. Cuando dichas herramientas se publiquen, esta política indicará con total transparencia el tiempo estricto de retención y su eliminación automatizada.",
      },
      {
        title: "Sobre el proyecto BreadPDF",
        body: "BreadPDF es una suite independiente de herramientas documentales concebida bajo el principio de privacidad por diseño ('privacy by design'). Desarrollada con estándares web de última generación (WebAssembly, pdf-lib, pdf.js y React), nuestra misión es permitir que cualquier persona manipule, optimice, convierta y proteja sus archivos PDF directamente en su propio navegador sin ceder el control de sus documentos ni depender de servidores externos.",
      },
      {
        title: "Contacto, soporte y titularidad del servicio",
        body: "Para cualquier consulta técnica, sugerencia de nuevas funcionalidades, notificación de incidencias o ejercicio de derechos de privacidad, el canal oficial y directo de atención es breadpdfstudio@gmail.com. Atendemos todas las comunicaciones en español, catalán e inglés.",
      },
    ],
  },
  cookies: {
    eyebrow: "Consentimiento y Transparencia",
    title: "Política de Cookies de BreadPDF",
    seoTitle: "Política de Cookies | BreadPDF",
    seoDescription:
      "Información detallada sobre el uso de cookies técnicas, preferencias y preparación de consentimiento publicitario en BreadPDF.",
    body: [
      "BreadPDF utiliza cookies estrictamente necesarias y almacenamiento local para permitir el funcionamiento de las herramientas, recordar tus preferencias de idioma e inicio de sesión seguro.",
      "No utilizamos cookies invasivas ni vendemos tus datos. En cumplimiento de la normativa europea de protección de datos (RGPD y ePrivacy), te informamos de forma clara sobre qué tecnologías se utilizan.",
    ],
    sections: [
      {
        title: "1. Cookies técnicas y funcionales",
        body: "Son imprescindibles para el funcionamiento de la plataforma: mantener tu sesión iniciada si estás registrado, almacenar tu selección de idioma ('es', 'ca', 'en') y conservar el estado temporal de tu procesamiento.",
      },
      {
        title: "2. Preparación para Google AdSense y publicidad",
        body: "BreadPDF está preparado para integrar publicidad de Google AdSense sujeta a plataformas de consentimiento certificadas por Google compatibles con los estándares vigentes de IAB (marco TCF v2.3). Cuando los anuncios estén activos, podrás aceptar, configurar o rechazar cookies de personalización en cualquier momento desde el panel de consentimiento.",
      },
      {
        title: "3. Cómo gestionar o desactivar cookies",
        body: "Puedes configurar o bloquear las cookies en cualquier momento a través de los ajustes de tu navegador (Chrome, Firefox, Safari, Edge). Ten en cuenta que desactivar cookies técnicas puede afectar a la persistencia de tus preferencias.",
      },
    ],
  },
  terms: {
    eyebrow: "Condiciones de Uso",
    title: "Términos del Servicio de BreadPDF",
    seoTitle: "Términos del Servicio | BreadPDF",
    seoDescription:
      "Condiciones generales de uso, responsabilidad sobre el procesamiento local y suscripciones de BreadPDF.",
    body: [
      "Al acceder o utilizar BreadPDF, aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte, te rogamos que no utilices la plataforma.",
      "BreadPDF proporciona herramientas documentales orientadas a la privacidad y el procesamiento local directo en el navegador del usuario.",
    ],
    sections: [
      {
        title: "1. Uso del servicio y propiedad de los archivos",
        body: "Conservas en todo momento el 100% de la propiedad y los derechos sobre los documentos que procesas. Eres el único responsable del contenido de tus archivos y de contar con los derechos necesarios para su manipulación.",
      },
      {
        title: "2. Garantía y disponibilidad",
        body: "Las herramientas se proporcionan «tal cual» y «según disponibilidad». Aunque implementamos estándares de ingeniería rigurosos, BreadPDF no garantiza que el servicio esté libre de errores ni se hace responsable de pérdidas documentales derivadas del uso indebido.",
      },
      {
        title: "3. Suscripciones Premium y pagos",
        body: "Las suscripciones Premium otorgan acceso a funciones extendidas (procesamiento prioritario, entorno libre de publicidad). Los pagos se procesan de forma segura mediante plataformas de pago certificadas (Stripe) sin que BreadPDF almacene datos de tarjetas bancarias.",
      },
    ],
  },
  about: {
    eyebrow: "Sobre el proyecto",
    title: "La suite PDF construida para tu privacidad",
    seoTitle: "Sobre BreadPDF · Misión, Tecnología y Transparencia Documental",
    seoDescription:
      "Conoce la historia y arquitectura de BreadPDF: procesamiento WebAssembly en el navegador, privacidad por diseño y herramientas documentales directas.",
    missionTitle: "Nuestra misión",
    missionBody:
      "BreadPDF nació para resolver un problema recurrente en el manejo de documentos digitales: la mayoría de herramientas en línea exigen subir contratos, nóminas, expedientes o historiales médicos a servidores remotos desconocidos, con riesgos evidentes para la confidencialidad. Diseñamos BreadPDF para que el 100% de las operaciones habituales se resuelvan directamente en el navegador del usuario.",
    architectureTitle: "Arquitectura técnica: procesamiento en el navegador",
    architectureBody:
      "BreadPDF ejecuta sus utilidades directamente en el entorno de ejecución de tu navegador mediante bibliotecas especializadas de JavaScript y TypeScript (como pdf-lib para manipulación de estructura PDF, pdf.js y la API de Canvas para rasterizado y renderizado, y módulos WebAssembly / Web Workers para tareas intensivas como OCR con Tesseract.js). Las operaciones se procesan en la memoria volátil de tu dispositivo y los archivos seleccionados no se suben a servidores remotos.",
    pillars: [
      {
        title: "Sin subida de archivos",
        desc: "Las herramientas interactivas procesan, extraen, reordenan y transforman tus archivos localmente en el cliente.",
      },
      {
        title: "Tratamiento en memoria volátil",
        desc: "Los datos residen en la memoria temporal de la sesión del navegador y se liberan al cerrar o recargar la pestaña.",
      },
      {
        title: "Compatibilidad estándar PDF",
        desc: "Los documentos generados respetan la estructura estándar de archivos PDF para garantizar que se abran en visores estándar como Adobe Acrobat, navegadores y plataformas de firma.",
      },
      {
        title: "Soporte y contacto directo",
        desc: "Atención técnica directa y canal de resolución de dudas a través de breadpdfstudio@gmail.com.",
      },
    ],
    contactTitle: "Titularidad, soporte y contacto",
    contactBody:
      "BreadPDF es un proyecto independiente enfocado en la excelencia de software documental web. Si tienes preguntas técnicas, sugerencias para nuevas utilidades o necesitas resolver una duda sobre el tratamiento de tus datos, puedes escribirnos directamente a breadpdfstudio@gmail.com.",
  },
  footer: {
    rights: (year: number, tools: number) => `© ${year} BreadPDF · ${tools} herramientas y creciendo`,
    language: "Idioma",
  },
  notFound: {
    title: "Página no encontrada",
    body: "Esta página no existe o se ha movido. Puedes ver todo el catálogo de BreadPDF.",
    cta: "Ver herramientas",
  },
  error: {
    title: "Esta página no se ha cargado",
    body: "Algo ha fallado por nuestra parte. Puedes reintentarlo o volver al inicio.",
    retry: "Reintentar",
    home: "Ir al inicio",
  },
  meta: {
    homeTitle: "BreadPDF · Todas tus herramientas PDF en un solo lugar",
    homeDescription:
      "Comprime, une, divide, gira y convierte tus PDF en segundos. Herramientas gratuitas que procesan los archivos en tu navegador, sin registro.",
    catalogTitle: "Todas las herramientas PDF que necesitas | BreadPDF",
    catalogDescription:
      "Catálogo completo de BreadPDF: comprimir, unir, dividir, rotar, extraer y eliminar páginas, PDF a JPG, JPG a PDF y extracción de texto, con más herramientas en camino.",
    categoryMeta: {
      optimizar: {
        title: "Optimizar PDF Online · Comprimir y Reducir Tamaño | BreadPDF",
        desc: "Reduce el tamaño de tus documentos PDF manteniendo la máxima nitidez visual. Compresión rápida, segura y directa en tu navegador.",
      },
      organizar: {
        title: "Organizar PDF Online · Unir, Dividir, Rotar y Ordenar | BreadPDF",
        desc: "Herramientas para unir múltiples PDF en uno, separar páginas o girar documentos en segundos sin instalar programas.",
      },
      convertir: {
        title: "Convertir PDF Online · De y a PDF con Máxima Calidad | BreadPDF",
        desc: "Convierte entre PDF e imágenes JPG, documentos Office y texto con total fidelidad tipográfica y de diseño.",
      },
      editar: {
        title: "Editar PDF Online · Modificar, Extraer y Gestionar Contenido | BreadPDF",
        desc: "Herramientas para extraer páginas, eliminar hojas innecesarias y trabajar con el contenido de tus PDF de forma privada.",
      },
      seguridad: {
        title: "Seguridad y Protección de PDF Online · Privacidad Total | BreadPDF",
        desc: "Protege tus documentos PDF, gestiona contraseñas y permisos con procesamiento 100% local en tu dispositivo.",
      },
      inteligencia: {
        title: "PDF Intelligence Online · OCR y Análisis Inteligente | BreadPDF",
        desc: "Extrae texto de documentos escaneados mediante OCR y analiza documentos con herramientas avanzadas en tu navegador.",
      },
    },
  },
};

export type Dict = typeof es;

const ca: Dict = {
  brandTagline: "Eines per treballar amb documents PDF, amb la privadesa al davant.",
  nav: {
    tools: "Eines",
    more: "Més eines",
    premium: "Premium",
    privacy: "Privadesa",
    login: "Accedir",
    register: "Registrar-se",
    cta: "Comprimeix un PDF",
    openMenu: "Obre el menú",
    closeMenu: "Tanca el menú",
    menu: "Menú principal",
    categories: "Categories d'eines",
    allTools: "Tot el catàleg",
    language: "Idioma",
    languageAria: "Canvia d'idioma",
    home: "Inici",
    megaTitle: "Catàleg per famílies",
    megaFooter: "Mostra totes les eines",
    myAccount: "El meu compte",
    myFavorites: "Els meus preferits",
    preferences: "Preferències",
    communications: "Comunicacions",
    security: "Seguretat",
    premiumStatus: "Estat Premium",
    logout: "Tancar sessió",
    exit: "Sortir",
    freePlan: "Gratuït",
    premiumPlan: "Premium",
  },
  home: {
    eyebrow: "Plataforma documental",
    featured: "Eines destacades",
    h1: "Totes les teves eines PDF. En un sol lloc.",
    sub: "Comprimeix, converteix, uneix, divideix i edita els teus documents en línia. Ràpid, clar i sense complicacions.",
    ctaAll: (n: number) => `Mostra les ${n} eines`,
    ctaCompress: "Comprimeix PDF",
    popularTitle: "Les més utilitzades a BreadPDF",
    popularSub: (live: number, soon: number) =>
      `${live} eines a punt i ${soon} més al full de ruta.`,
    viewAll: "Mostra tot el catàleg",
    categoriesTitle: "Explora per família",
    categoriesSub: "Cada família agrupa les tasques que s'assemblen entre elles.",
    highlights: [
      {
        title: "Resultats en segons",
        body: "Sense cues ni esperes: el procés comença quan deixes anar el fitxer.",
      },
      {
        title: "Els teus fitxers no es pugen",
        body: "Les eines publicades avui treballen íntegrament al teu dispositiu.",
      },
      {
        title: "Una eina, una tasca",
        body: "Cada pàgina resol una intenció concreta, amb les opcions justes.",
      },
    ],
    editorial: {
      eyebrow: "Documents sense complicacions",
      title: "Eines PDF dissenyades per a la productivitat i la privadesa",
      sub: "BreadPDF proporciona un conjunt directe d'utilitats per treballar amb fitxers PDF i convertir-los de manera àgil, segura i sense necessitat d'instal·lar programari pesat.",
      articles: [
        {
          title: "Processament al teu navegador",
          desc: "Treballa amb els teus documents directament al navegador quan l'eina ho permet, sense pujar fitxers a cap servidor.",
        },
        {
          title: "Sense registres obligatoris",
          desc: "Accedeix directament a les eines sense necessitat de crear cap compte ni compartir les teves dades.",
        },
        {
          title: "Conversió entre formats",
          desc: "Converteix documents i imatges als formats admesos per cada eina sense complicacions.",
        },
        {
          title: "Optimització i preparació",
          desc: "Redueix la mida dels teus PDF o prepara els documents per compartir-los i imprimir-los, segons l'eina.",
        },
      ],
    },
  },
  catalog: {
    eyebrow: "Eines BreadPDF",
    h1: "Totes les eines PDF que necessites.",
    sub: "Treballa, converteix, organitza i optimitza els teus documents directament des d'BreadPDF.",
    intro: (live: number, soon: number) =>
      `${live} eines funcionen avui al teu dispositiu i ${soon} més estan en camí.`,
    filters: "Filtra les eines",
    all: "Totes",
    popular: "Populars",
    popularAria: "Eines populars",
    count: (n: number) => (n === 1 ? "1 eina" : `${n} eines`),
    summary: (live: number, soon: number) =>
      `${live} eines disponibles avui · ${soon} al full de ruta d'BreadPDF.`,
  },
  search: {
    placeholder: "Què vols fer amb el teu PDF?",
    popular: "Populars",
    emptyTitle: "No hem trobat cap eina per a aquesta cerca.",
    emptySuggestion: "Prova amb termes com comprimir, unir, convertir, signar o OCR.",
    empty: "No hem trobat cap eina per a aquesta cerca.",
    results: "Resultats de la cerca",
  },
  category: {
    otherTitle: "Altres famílies",
    toolsIn: "Eines d'aquesta família",
    whatCanYouDo: "Què pots fer en aquesta categoria?",
    faqTitle: "Preguntes freqüents sobre aquesta categoria",
    details: {
      optimizar: {
        useCases: "Ideal per preparar documents abans d'enviar-los per correu electrònic, complir els límits de mida a tràmits administratius o accelerar la càrrega de PDF al web sense perdre nitidesa.",
        faqs: [
          {
            q: "Com es redueix la mida d'un PDF sense perdre qualitat?",
            a: "Amb el mode sense pèrdua s'optimitzen les taules de tipografies i metadades internes. Si cal més compressió, els algorismes redueixen les imatges preservant la claredat del text.",
          },
          {
            q: "Els documents optimitzats són compatibles amb qualsevol visor?",
            a: "Sí, tots els fitxers compleixen l'estàndard internacional ISO 32000-1 i s'obren a Adobe Acrobat, navegadors i dispositius mòbils.",
          },
        ],
      },
      organizar: {
        useCases: "Perfecte per consolidar factures, informes periòdics, suprimir pàgines en blanc abans d'imprimir o preparar un expedient complet.",
        faqs: [
          {
            q: "Hi ha cap límit de pàgines o fitxers?",
            a: "No hi ha límits prefixats. Les operacions es processen a la memòria del teu navegador, permetent organitzar documents extensos a l'instant.",
          },
          {
            q: "Es pot canviar l'ordre abans de generar el PDF?",
            a: "Sí, pots previsualitzar i arrossegar lliurement els fitxers i pàgines abans de confirmar la generació.",
          },
        ],
      },
      convertir: {
        useCases: "Essencial per reutilitzar gràfics de presentacions, transformar rebuts en PDF estàndard o extreure dades.",
        faqs: [
          {
            q: "Quins formats són compatibles per a la conversió?",
            a: "Pots convertir imatges (JPG, PNG, WebP) a PDF i transformar PDF a imatges d'alta resolució conservant el color original.",
          },
          {
            q: "Es manté la resolució de les imatges?",
            a: "Sí, pots triar multiplicadors d'escala fins a 4x per a impressió d'alta definició.",
          },
        ],
      },
      editar: {
        useCases: "Útil per separar capítols, descartar fulls innecessaris o extreure pàgines clau.",
        faqs: [
          {
            q: "Com s'eliminen pàgines d'un PDF?",
            a: "Selecciones els fulls visualment o per intervals i generes una còpia neta a l'instant.",
          },
        ],
      },
      seguridad: {
        useCases: "Protecció de contractes i documents sensibles mitjançant xifratge i control d'accés.",
        faqs: [
          {
            q: "És segur processar documents confidencials a BreadPDF?",
            a: "Totalment. Les eines s'executen localment al teu navegador sense enviar el contingut a cap servidor remot.",
          },
        ],
      },
      inteligencia: {
        useCases: "Digitalització de documents escanejats, extracció de text i cerca avançada.",
        faqs: [
          {
            q: "Quins idiomes reconeix el motor OCR?",
            a: "Suporta català, castellà, anglès i els principals alfabets europeus.",
          },
        ],
      },
    },
  },
  tool: {
    howItWorks: "Com funciona",
    faq: "Preguntes freqüents",
    related: "Eines relacionades",
    details: "Mostra els detalls",
    viewMoreCategory: (name: string) => `Veure més de ${name}`,
    favorite: "Preferit",
    favorited: "Preferida",
    addFavorite: "Afegeix als meus preferits",
    removeFavorite: "Treu dels meus preferits",
  },
  status: {
    pending: "En construcció",
    soon: "Ben aviat",
    inBrowser: "Al navegador",
  },
  workspace: {
    aria: (name: string) => `Àrea de treball de ${name}`,
    dropOne: "Arrossega el teu fitxer aquí",
    dropMany: "Arrossega els teus fitxers aquí",
    hint: "o selecciona'ls des del teu dispositiu",
    hintOne: "o selecciona'l des del teu dispositiu",
    selectOne: "Selecciona un fitxer",
    selectMany: "Selecciona fitxers",
    filesReady: (n: number) => (n === 1 ? "1 fitxer a punt" : `${n} fitxers a punt`),
    processing: "S'està processant…",
    progress: (percent: number) => `${percent}% completat`,
    privacyNote: "Els teus fitxers no surten d'aquest dispositiu.",
    adjustOptions: "Ajusta les opcions abans o després d'afegir el fitxer",
    privateLabel: "100% privat",
    optionsTitle: "Opcions de l'eina",
    compressionLevel: "Nivell de compressió:",
    done: "A punt! Fitxer processat amb èxit",
    moveUp: (name: string) => `Puja ${name}`,
    moveDown: (name: string) => `Baixa ${name}`,
    remove: (name: string) => `Elimina ${name}`,
    invalidFormat: "Aquest format de fitxer no és vàlid per a aquesta eina.",
    minFiles: (n: number) =>
      n === 1 ? "Afegeix com a mínim 1 fitxer." : `Afegeix com a mínim ${n} fitxers.`,
    genericError:
      "No s'ha pogut processar el document. Comprova que el fitxer no estigui protegit.",
    pendingTitle: "Aquesta eina encara no està disponible",
    pendingNote: "Preferim dir-t'ho abans que oferir-te un botó que no fa res.",
    downloads: "Fitxers generats",
    nextStepTitle: "Què vols fer ara?",
    suiteLabel: "Eines BreadPDF",
    continueWithoutDownload: "Continua sense baixar",
    downloadPdf: "Descarrega el PDF",
    downloadImage: "Descarrega la imatge",
    downloadZip: "Descarrega el ZIP",
    downloadAction: "Descarrega",
    discoverSuite: "Explora totes les eines",
    suiteDescription: "51 eines de conversió, organització i seguretat",
    settingsTitle: "Ajustos de l'eina",
    noPagesSelected: "No hi ha pàgines seleccionades per processar.",
    needSignature: "Si us plau, dibuixa o puja una signatura abans d'exportar.",
    pagesProcessed: (count: number) =>
      count === 1 ? "1 pàgina processada amb èxit." : `${count} pàgines processades amb èxit.`,
    downloadNow: "Descarrega ara",
    downloadAllZip: "Descarrega tot en un ZIP",
    splitTargetLabel: "Com vols desar les pàgines seleccionades?",
    splitTargetCombined: "En 1 sol PDF (juntes)",
    splitTargetIndividual: "En diversos PDFs (1 per cada pàgina)",
    loadingPages: "Generant vista prèvia de pàgines...",
    loadingPreview: "Carregant...",
    addMoreFiles: "Afegeix més fitxers",
    addMoreFilesSubtitle: "Afegeix com a mínim un altre fitxer per poder combinar-los.",
    pagesReady: (count: number) => `${count} ${count === 1 ? "pàgina a punt" : "pàgines a punt"}`,
    readyForProcessing: "A punt per processar",
    fileDetected: "Detectat",
    totalSize: (size: string) => `Mida total: ${size}`,
    configureToStart: "Configura les opcions i genera el document",
    viewThumbnails: "Miniatures",
    viewFiles: "Fitxers",
    selectedPages: (count: number) => `${count} ${count === 1 ? "pàgina seleccionada" : "pàgines seleccionades"}`,
    allPages: (count: number) => `Selecciona-les totes (${count})`,
    clearSelection: "Neteja la selecció",
    undo: "Desfés",
    redo: "Refés",
    rotateSelected: (count: number) => `Gira (${count})`,
    rotateAll: "Gira-les totes",
    deleteSelected: (count: number) => `Elimina (${count})`,
    addMorePdfs: "Afegeix més PDF",
    pageLabel: "pàg.",
    pageSelectionHelp: "Selecciona pàgines per aplicar les opcions disponibles o arrossega-les per canviar l'ordre.",
    splitPageSelectionHelp: "Selecciona les pàgines que vols incloure al PDF nou.",
    pagesOutOfTotal: (selected: number, total: number) => `${selected} de ${total} pàgines`,
    selectPage: "Selecciona la pàgina",
    deselectPage: "Desselecciona la pàgina",
    rotatePage: "Gira 90°",
    deletePage: "Elimina la pàgina",
    reorderPage: "Arrossega per ordenar",
    pdfLoadError: "No s'han pogut obrir les pàgines. Comprova que el PDF no estigui malmès o protegit.",
    previewUnavailable: "Vista prèvia no disponible",
  },
  privacy: {
    eyebrow: "Transparència",
    title: "Què passa amb els teus fitxers",
    seoTitle: "Privadesa i tractament de fitxers | BreadPDF",
    seoDescription:
      "Com tracta BreadPDF els teus documents: les eines actuals processen els fitxers al navegador i no s'envien a cap servidor.",
    body: [
      "Totes les eines publicades avui a BreadPDF s'executen dins del teu navegador. El document que selecciones no s'envia a cap servidor, no s'emmagatzema i no es comparteix amb tercers.",
      "Quan tanques o recarregues la pàgina, els fitxers i els resultats generats desapareixen de la memòria del navegador. No en conservem còpies perquè mai no les rebem.",
    ],
    sections: [
      {
        title: "Eines que sí que necessitaran servidor",
        body: "Algunes conversions complexes, com PDF a Word o Word a PDF, requereixen motors especialitzats de processament al servidor. Quan aquestes eines es publiquin, aquesta política indicarà amb total transparència el temps estricte de retenció i la seva eliminació automatitzada.",
      },
      {
        title: "Sobre el projecte BreadPDF",
        body: "BreadPDF és una suite independent d'eines documentals concebuda sota el principi de privadesa des del disseny ('privacy by design'). Desenvolupada amb estàndards web de darrera generació (WebAssembly, pdf-lib, pdf.js i React), la nostra missió és permetre que tothom pugui manipular, optimitzar, convertir i protegir fitxers PDF directament al seu navegador sense cedir el control dels seus documents.",
      },
      {
        title: "Contacte, suport i titularitat del servei",
        body: "Per a qualsevol consulta tècnica, suggeriment de noves funcionalitats, notificació d'incidències o exercici de drets de privadesa, el canal oficial i directe és breadpdfstudio@gmail.com. Atendrem totes les consultes en català, castellà i anglès.",
      },
    ],
  },
  cookies: {
    eyebrow: "Consentiment i Transparència",
    title: "Política de Cookies de BreadPDF",
    seoTitle: "Política de Cookies | BreadPDF",
    seoDescription:
      "Informació detallada sobre l'ús de cookies tècniques, preferències i preparació de consentiment publicitari a BreadPDF.",
    body: [
      "BreadPDF utilitza cookies estrictament necessàries i emmagatzematge local per permetre el funcionament de les eines, recordar la teva tria d'idioma i mantenir sessions segures.",
      "No fem servir cookies invasives ni venem les teves dades. En compliment del RGPD i de la normativa europea ePrivacy, t'informem amb total claredat.",
    ],
    sections: [
      {
        title: "1. Cookies tècniques i funcionals",
        body: "Són imprescindibles perquè la plataforma funcioni: mantenir la teva sessió si t'has registrat, guardar el teu idioma seleccionat ('es', 'ca', 'en') i conservar l'estat temporal del teu document.",
      },
      {
        title: "2. Preparació per a Google AdSense i publicitat",
        body: "BreadPDF està preparat per integrar publicitat de Google AdSense subjecta a plataformes de consentiment certificades per Google compatibles amb els estàndards vigents de l'IAB (marc TCF v2.3). Quan els anuncis estiguin actius, podràs acceptar, configurar o rebutjar cookies publicitàries des del panell de consentiment.",
      },
      {
        title: "3. Com gestionar o desactivar cookies",
        body: "Pots configurar o bloquejar cookies en qualsevol moment des dels ajustos del teu navegador web (Chrome, Firefox, Safari, Edge).",
      },
    ],
  },
  terms: {
    eyebrow: "Condicions d'Ús",
    title: "Termes del Servei de BreadPDF",
    seoTitle: "Termes del Servei | BreadPDF",
    seoDescription:
      "Condicions generals d'ús, responsabilitat sobre el processament local i subscripcions a BreadPDF.",
    body: [
      "En accedir o utilitzar BreadPDF, acceptes aquests termes i condicions. Si no hi estàs d'acord, et preguem que no utilitzis la plataforma.",
      "BreadPDF ofereix eines documentals orientades a la privadesa i el processament local directe al navegador.",
    ],
    sections: [
      {
        title: "1. Ús del servei i propietat dels fitxers",
        body: "Mantens en tot moment el 100% de la propietat i els drets sobre els fitxers que processos. Ets l'únic responsable del contingut dels teus documents.",
      },
      {
        title: "2. Garantia i disponibilitat",
        body: "Les eines es proporcionen «tal com són» i «segons disponibilitat». BreadPDF no es fa responsable de pèrdues de dades derivades d'un ús inadequat.",
      },
      {
        title: "3. Subscripcions Premium i pagaments",
        body: "Les subscripcions Premium atorguen accés a funcions avançades sense publicitat. Els pagaments es gestionen de manera segura mitjançant passarel·les certificades (Stripe).",
      },
    ],
  },
  about: {
    eyebrow: "Sobre el projecte",
    title: "La suite PDF construïda per a la teva privadesa",
    seoTitle: "Sobre BreadPDF · Missió, Tecnologia i Transparència Documental",
    seoDescription:
      "Descobreix la història i arquitectura de BreadPDF: processament WebAssembly al navegador, privadesa des del disseny i eines documentals directes.",
    missionTitle: "La nostra missió",
    missionBody:
      "BreadPDF va néixer per resoldre un problema clau en el tractament de fitxers digitals: la majoria d'eines en línia demanen pujar documents privats a servidors desconeguts. Hem dissenyat BreadPDF perquè el 100% de les tasques quotidianes es resolguin directament al navegador del propi usuari.",
    architectureTitle: "Arquitectura tècnica: processament al navegador",
    architectureBody:
      "BreadPDF executa les seves eines directament a l'entorn del teu navegador mitjançant llibreries especialitzades de JavaScript i TypeScript (com pdf-lib per a manipulació d'estructura PDF, pdf.js i l'API Canvas per a rasterització, i mòduls WebAssembly / Web Workers per a tasques intensives com l'OCR amb Tesseract.js). Les operacions es processen a la memòria volàtil del teu dispositiu i els fitxers no es pugen a servidors remots.",
    pillars: [
      {
        title: "Sense pujada de fitxers",
        desc: "Les eines interactives processen, extreuen, reordenen i transformen els teus documents directament al client.",
      },
      {
        title: "Tractament en memòria volàtil",
        desc: "Les dades resideixen a la memòria temporal de la sessió del navegador i s'alliberen en tancar o recarregar la pestanya.",
      },
      {
        title: "Compatibilitat estàndard PDF",
        desc: "Els documents generats respecten l'estructura estàndard de fitxers PDF per garantir que s'obrin en visors habituals com Adobe Acrobat, navegadors i plataformes de signatura.",
      },
      {
        title: "Suport i contacte directe",
        desc: "Atenció tècnica directa i resolució de dubtes a través de breadpdfstudio@gmail.com.",
      },
    ],
    contactTitle: "Titularitat, suport i contacte",
    contactBody:
      "BreadPDF és un projecte independent compromès amb la privadesa documental web. Si tens dubtes tècnics, suggeriments o consultes sobre dades, escriu-nos directament a breadpdfstudio@gmail.com.",
  },
  footer: {
    rights: (year: number, tools: number) => `© ${year} BreadPDF · ${tools} eines i creixent`,
    language: "Idioma",
  },
  notFound: {
    title: "Pàgina no trobada",
    body: "Aquesta pàgina no existeix o s'ha mogut. Pots consultar tot el catàleg d'BreadPDF.",
    cta: "Mostra les eines",
  },
  error: {
    title: "Aquesta pàgina no s'ha carregat",
    body: "Alguna cosa ha fallat per part nostra. Pots tornar-ho a provar o anar a l'inici.",
    retry: "Torna-ho a provar",
    home: "Vés a l'inici",
  },
  meta: {
    homeTitle: "BreadPDF · Totes les teves eines PDF en un sol lloc",
    homeDescription:
      "Comprimeix, uneix, divideix, gira i converteix els teus PDF en segons. Eines gratuïtes que processen els fitxers al navegador, sense registre.",
    catalogTitle: "Totes les eines PDF que necessites | BreadPDF",
    catalogDescription:
      "Catàleg complet d'BreadPDF: comprimir, unir, dividir, girar, extreure i eliminar pàgines, PDF a JPG, JPG a PDF i extracció de text, amb més eines en camí.",
    categoryMeta: {
      optimizar: {
        title: "Optimitzar PDF en Línia · Comprimir i Reduir Mida | BreadPDF",
        desc: "Redueix la mida dels teus documents PDF mantenint la màxima nitidesa visual. Compressió ràpida, segura i directa al teu navegador.",
      },
      organizar: {
        title: "Organitzar PDF en Línia · Unir, Dividir, Girar i Ordenar | BreadPDF",
        desc: "Eines per unir múltiples PDF en un de sol, separar pàgines o girar documents en segons sense instal·lar cap programa.",
      },
      convertir: {
        title: "Convertir PDF en Línia · De i a PDF amb Màxima Qualitat | BreadPDF",
        desc: "Converteix entre PDF i imatges JPG, documents Office i text amb total fidelitat tipogràfica i d'estructura.",
      },
      editar: {
        title: "Editar PDF en Línia · Modificar, Extreure i Gestionar Contingut | BreadPDF",
        desc: "Eines per extreure pàgines, eliminar fulls innecessaris i treballar amb el contingut dels teus PDF de forma privada.",
      },
      seguridad: {
        title: "Seguretat i Protecció de PDF en Línia · Privadesa Total | BreadPDF",
        desc: "Protegeix els teus documents PDF, gestiona contrasenyes i permisos amb processament 100% local al teu dispositiu.",
      },
      inteligencia: {
        title: "PDF Intelligence en Línia · OCR i Anàlisi Intel·ligent | BreadPDF",
        desc: "Extreu text de documents escanejats mitjançant OCR i analitza documents amb eines avançades al teu navegador.",
      },
    },
  },
};

const en: Dict = {
  brandTagline: "Tools for working with PDF documents, with privacy first.",
  nav: {
    tools: "Tools",
    more: "More tools",
    premium: "Premium",
    privacy: "Privacy",
    login: "Log in",
    register: "Sign up",
    cta: "Compress a PDF",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Main menu",
    categories: "Tool categories",
    allTools: "Full catalogue",
    language: "Language",
    languageAria: "Change language",
    home: "Home",
    megaTitle: "Catalogue by family",
    megaFooter: "See all tools",
    myAccount: "My account",
    myFavorites: "My favorites",
    preferences: "Preferences",
    communications: "Communications",
    security: "Security",
    premiumStatus: "Premium Status",
    logout: "Log out",
    exit: "Log out",
    freePlan: "Free",
    premiumPlan: "Premium",
  },
  home: {
    eyebrow: "Document platform",
    featured: "Featured tools",
    h1: "Every PDF tool you need. In one place.",
    sub: "Compress, convert, merge, split and edit your documents online. Fast, clear and free of friction.",
    ctaAll: (n: number) => `See all ${n} tools`,
    ctaCompress: "Compress PDF",
    popularTitle: "Most used on BreadPDF",
    popularSub: (live: number, soon: number) =>
      `${live} tools ready to use and ${soon} more on the roadmap.`,
    viewAll: "See the full catalogue",
    categoriesTitle: "Browse by family",
    categoriesSub: "Each family groups the tasks that belong together.",
    highlights: [
      {
        title: "Results in seconds",
        body: "No queues, no waiting: processing starts the moment you drop the file.",
      },
      {
        title: "Your files stay with you",
        body: "Every tool published today runs entirely on your own device.",
      },
      {
        title: "One tool, one job",
        body: "Each page solves a single intent, with exactly the options it needs.",
      },
    ],
    editorial: {
      eyebrow: "Straightforward Documents",
      title: "PDF Tools Designed for Productivity and Privacy",
      sub: "BreadPDF provides a focused set of utilities to work with PDF documents and convert them quickly, securely, and without installing heavy desktop software.",
      articles: [
        {
          title: "In-browser processing",
          desc: "Work with your documents directly inside your browser whenever supported, without uploading files to a server.",
        },
        {
          title: "No mandatory sign-ups",
          desc: "Access every available tool right away without needing to register an account or share your details.",
        },
        {
          title: "Format conversion",
          desc: "Convert documents and images reliably into the formats supported by each tool without hassle.",
        },
        {
          title: "Optimization & preparation",
          desc: "Shrink your PDF size or prepare files for sharing and printing, depending on the tool selected.",
        },
      ],
    },
  },
  catalog: {
    eyebrow: "BreadPDF tools",
    h1: "Every PDF tool you need.",
    sub: "Work on, convert, organise and optimise your documents straight from BreadPDF.",
    intro: (live: number, soon: number) =>
      `${live} tools already run on your own device and ${soon} more are on the way.`,
    filters: "Filter tools",
    all: "All",
    popular: "Popular",
    popularAria: "Popular tools",
    count: (n: number) => (n === 1 ? "1 tool" : `${n} tools`),
    summary: (live: number, soon: number) =>
      `${live} tools available today · ${soon} on the BreadPDF roadmap.`,
  },
  search: {
    placeholder: "What do you want to do with your PDF?",
    popular: "Popular",
    emptyTitle: "We couldn't find any tool for that search.",
    emptySuggestion: "Try terms like compress, merge, convert, sign or OCR.",
    empty: "We couldn't find any tool for that search.",
    results: "Search results",
  },
  category: {
    otherTitle: "Other families",
    toolsIn: "Tools in this family",
    whatCanYouDo: "What can you do in this category?",
    faqTitle: "Frequently asked questions about this category",
    details: {
      optimizar: {
        useCases: "Ideal for preparing documents before emailing them, meeting strict upload limits on government portals, or accelerating web load speeds without sacrificing visual readability.",
        faqs: [
          {
            q: "How can I reduce PDF file size without quality loss?",
            a: "Lossless mode optimizes internal font tables and metadata structures. When higher compression is required, adaptive algorithms downscale embedded images while keeping text razor-sharp.",
          },
          {
            q: "Are optimized documents compatible with all PDF viewers?",
            a: "Yes. All output files conform strictly to the international ISO 32000-1 standard and open seamlessly in Adobe Acrobat, web browsers, and mobile devices.",
          },
        ],
      },
      organizar: {
        useCases: "Great for consolidating invoices, managing periodic reports, removing blank pages before printing, or compiling complete project dossiers from scattered files.",
        faqs: [
          {
            q: "Is there a limit on the number of pages or files?",
            a: "There are no arbitrary limits. Operations process directly in your device's browser memory, allowing you to manage large documents smoothly and instantaneously.",
          },
          {
            q: "Can I adjust the page sequence before generating the document?",
            a: "Yes. Our interactive cards allow you to preview, drag, and arrange pages or entire files visually prior to generating your final document.",
          },
        ],
      },
      convertir: {
        useCases: "Essential for extracting charts from presentation decks, converting receipts into standard PDFs, or pulling structured tables for spreadsheet analysis.",
        faqs: [
          {
            q: "What file formats can be converted?",
            a: "You can convert image formats (JPG, PNG, WebP) to PDF and transform PDFs into high-resolution images while preserving accurate color and contrast.",
          },
          {
            q: "Does conversion preserve original image resolution?",
            a: "Yes. You can configure scale multipliers (from 1x up to 4x) for crisp, print-ready image assets.",
          },
        ],
      },
      editar: {
        useCases: "Convenient for splitting book chapters, removing confidential disclosures before sharing a report, or extracting key excerpts from lengthy briefs.",
        faqs: [
          {
            q: "How do I remove unwanted pages from a PDF?",
            a: "Select pages visually or specify numeric ranges to immediately produce a clean, trimmed copy.",
          },
        ],
      },
      seguridad: {
        useCases: "Safeguarding contracts, payroll slips, and private financial records using industry-standard encryption and permission controls.",
        faqs: [
          {
            q: "Is it safe to process confidential documents on BreadPDF?",
            a: "Completely. All operations execute locally in your web browser without transmitting your document contents across external servers.",
          },
        ],
      },
      inteligencia: {
        useCases: "Digitizing scanned receipts, extracting editable text, and searching through legacy archive documents.",
        faqs: [
          {
            q: "Which languages are supported by the OCR engine?",
            a: "It supports English, Spanish, Catalan, and major Western scripts with automatic column and paragraph detection.",
          },
        ],
      },
    },
  },
  tool: {
    howItWorks: "How it works",
    faq: "Frequently asked questions",
    related: "Related tools",
    details: "See details",
    viewMoreCategory: (name: string) => `More ${name} tools`,
    favorite: "Favorite",
    favorited: "Favorited",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
  },
  status: {
    pending: "In progress",
    soon: "Coming soon",
    inBrowser: "In browser",
  },
  workspace: {
    aria: (name: string) => `${name} workspace`,
    dropOne: "Drop your file here",
    dropMany: "Drop your files here",
    hint: "or pick them from your device",
    hintOne: "or pick it from your device",
    selectOne: "Select file",
    selectMany: "Select files",
    filesReady: (n: number) => (n === 1 ? "1 file ready" : `${n} files ready`),
    processing: "Processing…",
    progress: (percent: number) => `${percent}% complete`,
    privacyNote: "Your files never leave this device.",
    adjustOptions: "Adjust settings before or after adding your file",
    privateLabel: "100% private",
    optionsTitle: "Tool options",
    compressionLevel: "Compression level:",
    done: "Ready! File processed successfully",
    moveUp: (name: string) => `Move ${name} up`,
    moveDown: (name: string) => `Move ${name} down`,
    remove: (name: string) => `Remove ${name}`,
    invalidFormat: "That file format isn't valid for this tool.",
    minFiles: (n: number) => (n === 1 ? "Add at least 1 file." : `Add at least ${n} files.`),
    genericError: "We couldn't process the document. Check that the file isn't password protected.",
    pendingTitle: "This tool isn't available yet",
    pendingNote: "We'd rather tell you than hand you a button that does nothing.",
    downloads: "Generated files",
    nextStepTitle: "What would you like to do next?",
    suiteLabel: "BreadPDF tools",
    continueWithoutDownload: "Continue without downloading",
    downloadPdf: "Download PDF",
    downloadImage: "Download image",
    downloadZip: "Download ZIP",
    downloadAction: "Download",
    discoverSuite: "Explore all tools",
    suiteDescription: "51 tools for converting, organizing and securing PDFs",
    settingsTitle: "Tool settings",
    noPagesSelected: "No pages selected to process.",
    needSignature: "Please draw or upload a signature before exporting.",
    pagesProcessed: (count: number) =>
      count === 1 ? "1 page processed successfully." : `${count} pages processed successfully.`,
    downloadNow: "Download now",
    downloadAllZip: "Download all in a ZIP",
    splitTargetLabel: "How would you like to save the selected pages?",
    splitTargetCombined: "In 1 single PDF (merged)",
    splitTargetIndividual: "In separate PDFs (1 per page)",
    loadingPages: "Generating pages preview...",
    loadingPreview: "Loading...",
    addMoreFiles: "Add more files",
    addMoreFilesSubtitle: "Add at least one more file to merge them together.",
    pagesReady: (count: number) => `${count} ${count === 1 ? "page ready" : "pages ready"}`,
    readyForProcessing: "Ready to process",
    fileDetected: "Detected",
    totalSize: (size: string) => `Total size: ${size}`,
    configureToStart: "Configure the options and create your document",
    viewThumbnails: "Thumbnails",
    viewFiles: "Files",
    selectedPages: (count: number) => `${count} ${count === 1 ? "page selected" : "pages selected"}`,
    allPages: (count: number) => `Select all (${count})`,
    clearSelection: "Clear selection",
    undo: "Undo",
    redo: "Redo",
    rotateSelected: (count: number) => `Rotate (${count})`,
    rotateAll: "Rotate all",
    deleteSelected: (count: number) => `Delete (${count})`,
    addMorePdfs: "Add more PDFs",
    pageLabel: "p.",
    pageSelectionHelp: "Select pages to apply the available options or drag them to change their order.",
    splitPageSelectionHelp: "Select the pages you want to include in the new PDF.",
    pagesOutOfTotal: (selected: number, total: number) => `${selected} of ${total} pages`,
    selectPage: "Select page",
    deselectPage: "Deselect page",
    rotatePage: "Rotate 90°",
    deletePage: "Delete page",
    reorderPage: "Drag to reorder",
    pdfLoadError: "Pages couldn't be opened. Check whether the PDF is damaged or password protected.",
    previewUnavailable: "Preview unavailable",
  },
  privacy: {
    eyebrow: "Transparency",
    title: "What happens to your files",
    seoTitle: "Privacy and file handling | BreadPDF",
    seoDescription:
      "How BreadPDF handles your documents: today's tools process files inside your browser and never send them to a server.",
    body: [
      "Every tool published on BreadPDF today runs inside your browser. The document you pick is never uploaded, never stored and never shared with third parties.",
      "When you close or reload the page, the files and generated results disappear from browser memory. We keep no copies because we never receive any.",
    ],
    sections: [
      {
        title: "Tools that will need a server",
        body: "Some complex conversions, such as PDF to Word or Word to PDF, require specialized server-side processing engines. When these tools launch, this policy will transparently describe the strict retention period and automated deletion process.",
      },
      {
        title: "About the BreadPDF Project",
        body: "BreadPDF is an independent document productivity suite engineered with a privacy-by-design ethos. Built with cutting-edge web technologies (WebAssembly, pdf-lib, pdf.js, and React), our core mission is empowering users to manipulate, optimize, convert, and protect PDF files directly inside their browser without surrendering ownership or transmitting sensitive data to cloud servers.",
      },
      {
        title: "Contact, Support & Publisher Information",
        body: "For technical inquiries, feature suggestions, bug reports, or data privacy requests, our official communication channel is breadpdfstudio@gmail.com. We answer all inquiries in English, Spanish, and Catalan.",
      },
    ],
  },
  cookies: {
    eyebrow: "Consent & Transparency",
    title: "Cookie Policy",
    seoTitle: "Cookie Policy | BreadPDF",
    seoDescription:
      "Detailed information about technical cookies, local storage preferences, and advertising consent preparation on BreadPDF.",
    body: [
      "BreadPDF uses strictly necessary cookies and local storage to enable core tool workflows, remember your language preference, and ensure secure authentication.",
      "We do not use invasive tracking cookies or sell your personal data. In full compliance with European data privacy regulations (GDPR & ePrivacy), we outline our practices with complete transparency.",
    ],
    sections: [
      {
        title: "1. Technical and functional cookies",
        body: "Essential for site reliability: persisting your authenticated session, storing your language preference ('es', 'ca', 'en'), and keeping temporary document state inside your browser.",
      },
      {
        title: "2. Preparation for Google AdSense and advertising",
        body: "BreadPDF is architected to integrate Google AdSense under Google-certified Consent Management Platforms compliant with current IAB standards (TCF v2.3 framework). When advertisements become active, you will be able to review, configure, accept, or reject personalization cookies at any time.",
      },
      {
        title: "3. How to manage or disable cookies",
        body: "You can modify or block cookie settings anytime via your browser preferences (Chrome, Firefox, Safari, Edge).",
      },
    ],
  },
  terms: {
    eyebrow: "Terms & Conditions",
    title: "Terms of Service | BreadPDF",
    seoTitle: "Terms of Service | BreadPDF",
    seoDescription:
      "General conditions of use, local processing liability, and subscription terms on BreadPDF.",
    body: [
      "By accessing or using BreadPDF, you agree to these Terms of Service. If you disagree with any portion, please refrain from using the platform.",
      "BreadPDF delivers document productivity utilities emphasizing local in-browser processing and data privacy.",
    ],
    sections: [
      {
        title: "1. Acceptable use and file ownership",
        body: "You retain 100% ownership and all intellectual property rights to the documents you process. You are solely responsible for ensuring you hold the legal authority to handle and modify your files.",
      },
      {
        title: "2. Availability and warranties",
        body: "Tools are provided 'as is' and 'as available'. While we uphold rigorous engineering and privacy standards, BreadPDF does not warrant uninterrupted uptime and disclaims liability for data loss arising from misuse.",
      },
      {
        title: "3. Premium subscriptions and billing",
        body: "Premium subscriptions unlock enhanced capabilities (priority speed, ad-free environment). Payments are processed securely via certified payment gateways (Stripe) without BreadPDF ever storing payment card details.",
      },
    ],
  },
  about: {
    eyebrow: "About the Project",
    title: "The PDF suite engineered for your privacy",
    seoTitle: "About BreadPDF · Mission, Technology & Privacy Architecture",
    seoDescription:
      "Learn about BreadPDF's history and architecture: client-side WebAssembly execution, privacy by design, and transparent document tools.",
    missionTitle: "Our Mission",
    missionBody:
      "BreadPDF was created to solve a critical flaw in digital document workflows: most online PDF converters require uploading private agreements, payslips, medical records, or legal filings to obscure remote servers. We architected BreadPDF so that 100% of standard operations run entirely inside the user's web browser.",
    architectureTitle: "Technical Architecture: Browser-Native Execution",
    architectureBody:
      "BreadPDF executes its document operations directly inside your web browser using dedicated JavaScript and TypeScript engines (including pdf-lib for binary PDF structure modifications, pdf.js and the HTML5 Canvas API for vector rendering, and WebAssembly / Web Workers for compute-intensive tasks such as client-side OCR with Tesseract.js). All operations are processed in the volatile memory of your local device, and selected files are never uploaded to remote servers.",
    pillars: [
      {
        title: "No Server Uploads",
        desc: "Interactive tools inspect, reorder, compress, and transform documents locally within your client session.",
      },
      {
        title: "Volatile Memory Handling",
        desc: "Document data resides strictly in temporary browser memory and is discarded as soon as the tab is closed or reloaded.",
      },
      {
        title: "Standard PDF Compatibility",
        desc: "Generated documents conform to standard PDF file structures, ensuring seamless rendering across Adobe Acrobat, modern browsers, and certified viewers.",
      },
      {
        title: "Direct Engineering Support",
        desc: "Direct support and technical inquiries handled openly via breadpdfstudio@gmail.com.",
      },
    ],
    contactTitle: "Ownership, Support & Inquiries",
    contactBody:
      "BreadPDF is an independent software project dedicated to document utility excellence. For technical inquiries, partnership queries, or privacy questions, reach us directly at breadpdfstudio@gmail.com.",
  },
  footer: {
    rights: (year: number, tools: number) => `© ${year} BreadPDF · ${tools} tools and growing`,
    language: "Language",
  },
  notFound: {
    title: "Page not found",
    body: "This page doesn't exist or has moved. You can browse the full BreadPDF catalogue.",
    cta: "See tools",
  },
  error: {
    title: "This page didn't load",
    body: "Something went wrong on our side. You can retry or go back home.",
    retry: "Retry",
    home: "Go home",
  },
  meta: {
    homeTitle: "BreadPDF · Every PDF tool in one place",
    homeDescription:
      "Compress, merge, split, rotate and convert your PDFs in seconds. Free tools that process files in your browser, with no sign-up.",
    catalogTitle: "Every PDF tool you need | BreadPDF",
    catalogDescription:
      "The full BreadPDF catalogue: compress, merge, split, rotate, extract and delete pages, PDF to JPG, JPG to PDF and text extraction, with more tools on the way.",
    categoryMeta: {
      optimizar: {
        title: "Optimize PDF Online · Compress and Shrink Size | BreadPDF",
        desc: "Reduce your PDF file size while retaining high visual sharpness. Fast, secure, and direct browser-based compression.",
      },
      organizar: {
        title: "Organize PDF Online · Merge, Split, Rotate and Reorder | BreadPDF",
        desc: "Tools to combine multiple PDFs, split pages, or rotate documents in seconds without installing desktop apps.",
      },
      convertir: {
        title: "Convert PDF Online · To and From PDF in High Quality | BreadPDF",
        desc: "Convert between PDF, JPG images, Office formats, and text with full typographic and structural fidelity.",
      },
      editar: {
        title: "Edit PDF Online · Extract, Delete and Manage Content | BreadPDF",
        desc: "Utilities to extract pages, remove unwanted sheets, and manage your PDF content privately in your browser.",
      },
      seguridad: {
        title: "PDF Security & Protection Online · Total Privacy | BreadPDF",
        desc: "Protect your PDF documents, manage passwords, and permissions with 100% local processing on your device.",
      },
      inteligencia: {
        title: "PDF Intelligence Online · OCR and Smart Analysis | BreadPDF",
        desc: "Extract text from scanned documents via OCR and analyze documents with advanced browser-based AI utilities.",
      },
    },
  },
};

export const UI: Record<Locale, Dict> = { es, ca, en };
