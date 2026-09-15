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
    privacy: "Privacidad",
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
  },
  home: {
    eyebrow: "Plataforma documental",
    h1: "Todas tus herramientas PDF. En un solo lugar.",
    sub: "Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.",
    ctaAll: (n: number) => `Ver las ${n} herramientas`,
    ctaCompress: "Comprimir PDF",
    popularTitle: "Las más usadas en ARVIO",
    popularSub: (live: number, soon: number) =>
      `${live} herramientas listas para usar y ${soon} más en el roadmap.`,
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
        body: "Las herramientas publicadas hoy trabajan íntegramente en tu dispositivo.",
      },
      {
        title: "Una herramienta, una tarea",
        body: "Cada página resuelve una intención concreta, con las opciones justas.",
      },
    ],
  },
  catalog: {
    eyebrow: "Herramientas ARVIO",
    h1: "Todas las herramientas PDF que necesitas.",
    sub: "Trabaja, convierte, organiza y optimiza tus documentos directamente desde ARVIO.",
    intro: (live: number, soon: number) =>
      `${live} herramientas funcionan hoy en tu propio dispositivo y ${soon} más están en camino.`,
    filters: "Filtrar herramientas",
    all: "Todas",
    popular: "Populares",
    popularAria: "Herramientas populares",
    count: (n: number) => (n === 1 ? "1 herramienta" : `${n} herramientas`),
    summary: (live: number, soon: number) =>
      `${live} herramientas disponibles hoy · ${soon} en el roadmap de ARVIO.`,
  },
  search: {
    placeholder: "¿Qué quieres hacer con tu PDF?",
    popular: "Populares",
    empty: "Todavía no tenemos esa herramienta. Prueba con «comprimir», «unir» o «convertir».",
    results: "Resultados de búsqueda",
  },
  category: {
    otherTitle: "Otras familias",
    toolsIn: "Herramientas de esta familia",
  },
  tool: {
    howItWorks: "Cómo funciona",
    faq: "Preguntas frecuentes",
    related: "Herramientas relacionadas",
    details: "Ver detalles",
  },
  status: {
    pending: "En construcción",
    soon: "Próximamente",
  },
  workspace: {
    aria: (name: string) => `Área de trabajo de ${name}`,
    dropOne: "Arrastra tu archivo aquí",
    dropMany: "Arrastra tus archivos aquí",
    hint: "o selecciónalo desde tu dispositivo · se procesa en tu navegador",
    selectOne: "Seleccionar archivo",
    selectMany: "Seleccionar archivos",
    filesReady: (n: number) => (n === 1 ? "1 archivo listo" : `${n} archivos listos`),
    processing: "Procesando…",
    progress: (percent: number) => `${percent}% completado`,
    privacyNote: "Tus archivos no salen de este dispositivo.",
    done: "Listo",
    moveUp: (name: string) => `Subir ${name}`,
    moveDown: (name: string) => `Bajar ${name}`,
    remove: (name: string) => `Quitar ${name}`,
    invalidFormat: "Ese formato de archivo no es válido para esta herramienta.",
    minFiles: (n: number) => (n === 1 ? "Añade al menos 1 archivo." : `Añade al menos ${n} archivos.`),
    genericError:
      "No se ha podido procesar el documento. Comprueba que el archivo no esté protegido.",
    pendingAria: "Herramienta en construcción",
    pendingTitle: "Esta herramienta todavía no está disponible",
    pendingNote: "Preferimos decírtelo antes que ofrecerte un botón que no hace nada.",
    downloads: "Archivos generados",
  },
  privacy: {
    eyebrow: "Transparencia",
    title: "Qué pasa con tus archivos",
    seoTitle: "Privacidad y tratamiento de archivos | ARVIO",
    seoDescription:
      "Cómo trata ARVIO tus documentos: las herramientas actuales procesan los archivos en tu navegador y no se envían a ningún servidor.",
    body: [
      "Todas las herramientas publicadas hoy en ARVIO se ejecutan dentro de tu navegador. El documento que seleccionas no se envía a ningún servidor, no se almacena y no se comparte con terceros.",
      "Al cerrar o recargar la página, los archivos y los resultados generados desaparecen de la memoria del navegador. No conservamos copias porque nunca las recibimos.",
    ],
    sections: [
      {
        title: "Herramientas que sí necesitarán servidor",
        body: "Algunas conversiones, como PDF a Word o Word a PDF, requieren un motor de procesamiento en servidor. Están marcadas como «en construcción» y no aceptan archivos todavía. Cuando se publiquen, esta página explicará exactamente cuánto tiempo se conserva cada archivo y cómo se elimina.",
      },
      {
        title: "Sin cuentas ni seguimiento innecesario",
        body: "Puedes usar las herramientas sin registrarte. Todavía no existen cuentas de usuario, por lo que no recogemos datos personales asociados a tu actividad.",
      },
    ],
  },
  footer: {
    rights: (year: number, tools: number) =>
      `© ${year} ARVIO · ${tools} herramientas y creciendo`,
    language: "Idioma",
  },
  notFound: {
    title: "Página no encontrada",
    body: "Esta página no existe o se ha movido. Puedes ver todo el catálogo de ARVIO.",
    cta: "Ver herramientas",
  },
  error: {
    title: "Esta página no se ha cargado",
    body: "Algo ha fallado por nuestra parte. Puedes reintentarlo o volver al inicio.",
    retry: "Reintentar",
    home: "Ir al inicio",
  },
  meta: {
    homeTitle: "ARVIO · Todas tus herramientas PDF en un solo lugar",
    homeDescription:
      "Comprime, une, divide, gira y convierte tus PDF en segundos. Herramientas gratuitas que procesan los archivos en tu navegador, sin registro.",
    catalogTitle: "Todas las herramientas PDF que necesitas | ARVIO",
    catalogDescription:
      "Catálogo completo de ARVIO: comprimir, unir, dividir, rotar, extraer y eliminar páginas, PDF a JPG, JPG a PDF y extracción de texto, con más herramientas en camino.",
    categoryTitle: (name: string) => `${name} PDF · herramientas de ARVIO`,
  },
};

export type Dict = typeof es;

const ca: Dict = {
  brandTagline: "Eines per treballar amb documents PDF, amb la privadesa al davant.",
  nav: {
    tools: "Eines",
    more: "Més eines",
    privacy: "Privadesa",
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
  },
  home: {
    eyebrow: "Plataforma documental",
    h1: "Totes les teves eines PDF. En un sol lloc.",
    sub: "Comprimeix, converteix, uneix, divideix i edita els teus documents en línia. Ràpid, clar i sense complicacions.",
    ctaAll: (n: number) => `Mostra les ${n} eines`,
    ctaCompress: "Comprimeix PDF",
    popularTitle: "Les més utilitzades a ARVIO",
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
  },
  catalog: {
    eyebrow: "Eines ARVIO",
    h1: "Totes les eines PDF que necessites.",
    sub: "Treballa, converteix, organitza i optimitza els teus documents directament des d'ARVIO.",
    intro: (live: number, soon: number) =>
      `${live} eines funcionen avui al teu dispositiu i ${soon} més estan en camí.`,
    filters: "Filtra les eines",
    all: "Totes",
    popular: "Populars",
    popularAria: "Eines populars",
    count: (n: number) => (n === 1 ? "1 eina" : `${n} eines`),
    summary: (live: number, soon: number) =>
      `${live} eines disponibles avui · ${soon} al full de ruta d'ARVIO.`,
  },
  search: {
    placeholder: "Què vols fer amb el teu PDF?",
    popular: "Populars",
    empty: "Encara no tenim aquesta eina. Prova amb «comprimeix», «uneix» o «converteix».",
    results: "Resultats de la cerca",
  },
  category: {
    otherTitle: "Altres famílies",
    toolsIn: "Eines d'aquesta família",
  },
  tool: {
    howItWorks: "Com funciona",
    faq: "Preguntes freqüents",
    related: "Eines relacionades",
    details: "Mostra els detalls",
  },
  status: {
    pending: "En construcció",
    soon: "Ben aviat",
  },
  workspace: {
    aria: (name: string) => `Àrea de treball de ${name}`,
    dropOne: "Arrossega el teu fitxer aquí",
    dropMany: "Arrossega els teus fitxers aquí",
    hint: "o selecciona'l des del teu dispositiu · es processa al navegador",
    selectOne: "Selecciona un fitxer",
    selectMany: "Selecciona fitxers",
    filesReady: (n: number) => (n === 1 ? "1 fitxer a punt" : `${n} fitxers a punt`),
    processing: "S'està processant…",
    progress: (percent: number) => `${percent}% completat`,
    privacyNote: "Els teus fitxers no surten d'aquest dispositiu.",
    done: "Fet",
    moveUp: (name: string) => `Puja ${name}`,
    moveDown: (name: string) => `Baixa ${name}`,
    remove: (name: string) => `Elimina ${name}`,
    invalidFormat: "Aquest format de fitxer no és vàlid per a aquesta eina.",
    minFiles: (n: number) => (n === 1 ? "Afegeix com a mínim 1 fitxer." : `Afegeix com a mínim ${n} fitxers.`),
    genericError: "No s'ha pogut processar el document. Comprova que el fitxer no estigui protegit.",
    pendingAria: "Eina en construcció",
    pendingTitle: "Aquesta eina encara no està disponible",
    pendingNote: "Preferim dir-t'ho abans que oferir-te un botó que no fa res.",
    downloads: "Fitxers generats",
  },
  privacy: {
    eyebrow: "Transparència",
    title: "Què passa amb els teus fitxers",
    seoTitle: "Privadesa i tractament de fitxers | ARVIO",
    seoDescription:
      "Com tracta ARVIO els teus documents: les eines actuals processen els fitxers al navegador i no s'envien a cap servidor.",
    body: [
      "Totes les eines publicades avui a ARVIO s'executen dins del teu navegador. El document que selecciones no s'envia a cap servidor, no s'emmagatzema i no es comparteix amb tercers.",
      "Quan tanques o recarregues la pàgina, els fitxers i els resultats generats desapareixen de la memòria del navegador. No en conservem còpies perquè mai no les rebem.",
    ],
    sections: [
      {
        title: "Eines que sí que necessitaran servidor",
        body: "Algunes conversions, com PDF a Word o Word a PDF, necessiten un motor de processament al servidor. Estan marcades com «en construcció» i encara no accepten fitxers. Quan es publiquin, aquesta pàgina explicarà exactament quant temps es conserva cada fitxer i com s'elimina.",
      },
      {
        title: "Sense comptes ni seguiment innecessari",
        body: "Pots fer servir les eines sense registrar-te. Encara no hi ha comptes d'usuari, de manera que no recollim dades personals associades a la teva activitat.",
      },
    ],
  },
  footer: {
    rights: (year: number, tools: number) => `© ${year} ARVIO · ${tools} eines i creixent`,
    language: "Idioma",
  },
  notFound: {
    title: "Pàgina no trobada",
    body: "Aquesta pàgina no existeix o s'ha mogut. Pots consultar tot el catàleg d'ARVIO.",
    cta: "Mostra les eines",
  },
  error: {
    title: "Aquesta pàgina no s'ha carregat",
    body: "Alguna cosa ha fallat per part nostra. Pots tornar-ho a provar o anar a l'inici.",
    retry: "Torna-ho a provar",
    home: "Vés a l'inici",
  },
  meta: {
    homeTitle: "ARVIO · Totes les teves eines PDF en un sol lloc",
    homeDescription:
      "Comprimeix, uneix, divideix, gira i converteix els teus PDF en segons. Eines gratuïtes que processen els fitxers al navegador, sense registre.",
    catalogTitle: "Totes les eines PDF que necessites | ARVIO",
    catalogDescription:
      "Catàleg complet d'ARVIO: comprimir, unir, dividir, girar, extreure i eliminar pàgines, PDF a JPG, JPG a PDF i extracció de text, amb més eines en camí.",
    categoryTitle: (name: string) => `${name} PDF · eines d'ARVIO`,
  },
};

const en: Dict = {
  brandTagline: "Tools for working with PDF documents, with privacy first.",
  nav: {
    tools: "Tools",
    more: "More tools",
    privacy: "Privacy",
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
  },
  home: {
    eyebrow: "Document platform",
    h1: "Every PDF tool you need. In one place.",
    sub: "Compress, convert, merge, split and edit your documents online. Fast, clear and free of friction.",
    ctaAll: (n: number) => `See all ${n} tools`,
    ctaCompress: "Compress PDF",
    popularTitle: "Most used on ARVIO",
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
  },
  catalog: {
    eyebrow: "ARVIO tools",
    h1: "Every PDF tool you need.",
    sub: "Work on, convert, organise and optimise your documents straight from ARVIO.",
    intro: (live: number, soon: number) =>
      `${live} tools already run on your own device and ${soon} more are on the way.`,
    filters: "Filter tools",
    all: "All",
    popular: "Popular",
    popularAria: "Popular tools",
    count: (n: number) => (n === 1 ? "1 tool" : `${n} tools`),
    summary: (live: number, soon: number) =>
      `${live} tools available today · ${soon} on the ARVIO roadmap.`,
  },
  search: {
    placeholder: "What do you want to do with your PDF?",
    popular: "Popular",
    empty: "We don't have that tool yet. Try “compress”, “merge” or “convert”.",
    results: "Search results",
  },
  category: {
    otherTitle: "Other families",
    toolsIn: "Tools in this family",
  },
  tool: {
    howItWorks: "How it works",
    faq: "Frequently asked questions",
    related: "Related tools",
    details: "See details",
  },
  status: {
    pending: "In development",
    soon: "Coming soon",
  },
  workspace: {
    aria: (name: string) => `${name} workspace`,
    dropOne: "Drop your file here",
    dropMany: "Drop your files here",
    hint: "or pick it from your device · processed in your browser",
    selectOne: "Select file",
    selectMany: "Select files",
    filesReady: (n: number) => (n === 1 ? "1 file ready" : `${n} files ready`),
    processing: "Processing…",
    progress: (percent: number) => `${percent}% complete`,
    privacyNote: "Your files never leave this device.",
    done: "Done",
    moveUp: (name: string) => `Move ${name} up`,
    moveDown: (name: string) => `Move ${name} down`,
    remove: (name: string) => `Remove ${name}`,
    invalidFormat: "That file format isn't valid for this tool.",
    minFiles: (n: number) => (n === 1 ? "Add at least 1 file." : `Add at least ${n} files.`),
    genericError: "We couldn't process the document. Check that the file isn't password protected.",
    pendingAria: "Tool in development",
    pendingTitle: "This tool isn't available yet",
    pendingNote: "We'd rather tell you than hand you a button that does nothing.",
    downloads: "Generated files",
  },
  privacy: {
    eyebrow: "Transparency",
    title: "What happens to your files",
    seoTitle: "Privacy and file handling | ARVIO",
    seoDescription:
      "How ARVIO handles your documents: today's tools process files inside your browser and never send them to a server.",
    body: [
      "Every tool published on ARVIO today runs inside your browser. The document you pick is never uploaded, never stored and never shared with third parties.",
      "When you close or reload the page, the files and generated results disappear from browser memory. We keep no copies because we never receive any.",
    ],
    sections: [
      {
        title: "Tools that will need a server",
        body: "Some conversions, such as PDF to Word or Word to PDF, require a server-side processing engine. They are marked as in development and accept no files yet. When they launch, this page will explain exactly how long each file is kept and how it is deleted.",
      },
      {
        title: "No accounts, no needless tracking",
        body: "You can use the tools without signing up. There are no user accounts yet, so we collect no personal data tied to your activity.",
      },
    ],
  },
  footer: {
    rights: (year: number, tools: number) => `© ${year} ARVIO · ${tools} tools and growing`,
    language: "Language",
  },
  notFound: {
    title: "Page not found",
    body: "This page doesn't exist or has moved. You can browse the full ARVIO catalogue.",
    cta: "See tools",
  },
  error: {
    title: "This page didn't load",
    body: "Something went wrong on our side. You can retry or go back home.",
    retry: "Retry",
    home: "Go home",
  },
  meta: {
    homeTitle: "ARVIO · Every PDF tool in one place",
    homeDescription:
      "Compress, merge, split, rotate and convert your PDFs in seconds. Free tools that process files in your browser, with no sign-up.",
    catalogTitle: "Every PDF tool you need | ARVIO",
    catalogDescription:
      "The full ARVIO catalogue: compress, merge, split, rotate, extract and delete pages, PDF to JPG, JPG to PDF and text extraction, with more tools on the way.",
    categoryTitle: (name: string) => `${name} PDF · ARVIO tools`,
  },
};

export const UI: Record<Locale, Dict> = { es, ca, en };
