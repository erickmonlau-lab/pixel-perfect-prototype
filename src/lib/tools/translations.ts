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
    seoTitle: "Comprimir PDF en línia gratis i reduir mida | BreadPDF",
    seoDescription:
      "Redueix la mida del teu PDF al navegador amb quatre nivells de compressió i comparativa de pes. Ràpid, privat i sense pujar fitxers a servidors.",
    ctaLabel: "Comprimeix PDF",
    keywords: ["comprimir pdf", "reduir mida pdf", "pdf lleuger"],
    howItWorks: [
      "Selecciona el PDF que vols reduir.",
      "Tria el nivell: sense pèrdua, lleuger, equilibrat o màxim.",
      "Compara el pes abans i després i descarrega el resultat.",
    ],
    faq: [
      {
        q: "Es perd qualitat en comprimir un PDF?",
        a: "Depèn del mode triat. Al nivell 'Sense pèrdua' no es recomprimeix res: es reorganitzen els objectes interns del PDF i el text i els vectors romanen intactes. Als nivells Lleuger, Equilibrat i Màxim les pàgines es rasteritzen a imatge amb resolució optimitzada per aconseguir un major estalvi de pes.",
      },
      {
        q: "Quina diferència hi ha entre els quatre nivells de compressió?",
        a: "'Sense pèrdua' manté text seleccionable i estructura original; 'Lleuger' ofereix una reducció moderada amb màxima fidelitat visual; 'Equilibrat' és l'ajust recomanat per a enviaments generals per correu; i 'Màxim' prioritza el fitxer més petit possible per a formularis amb límits estrictes.",
      },
      {
        q: "Què passa si el fitxer comprimit resulta més pesat que l'original?",
        a: "BreadPDF inclou una salvaguarda automàtica: si la compressió amb rasterització generés un fitxer més gran (habitual en PDF de text pla), el sistema descarta l'increment i aplica l'optimització estructural per garantir que mai no pesi més que l'origen.",
      },
      {
        q: "Puc veure quant pes s'ha reduït abans de descarregar?",
        a: "Sí. Un cop acabat el procés, BreadPDF et mostra la mida inicial, la mida final obtinguda i el percentatge exacte d'estalvi per validar el resultat abans de desar-lo.",
      },
      {
        q: "Es pot tornar a seleccionar o copiar text després d'una compressió en mode equilibrat o màxim?",
        a: "Als modes Lleuger, Equilibrat i Màxim les pàgines es processen com a imatges optimitzades, de manera que el text vectorial s'aplana. Si necessites mantenir el text seleccionable per copiar o fer cerques amb Ctrl+F, utilitza sempre el mode 'Sense pèrdua'.",
      },
      {
        q: "El meu fitxer es puja a cap servidor extern?",
        a: "No. Tota la compressió i anàlisi de pàgines es processa localment a la memòria del teu navegador mitjançant JavaScript i WebAssembly. Els teus documents confidencials mai no viatgen per internet.",
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
    seoTitle: "Unir PDF en línia i en ordre | BreadPDF",
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
        q: "Quants fitxers puc unir alhora?",
        a: "No hi ha cap límit artificial a l'aplicació. La combinació s'executa íntegrament a la memòria del teu dispositiu, de manera que pots unir dos o desenes de documents sempre que el teu navegador disposi de prou memòria.",
      },
      {
        q: "Com trio l'ordre en què apareixeran els documents?",
        a: "A la llista de fitxers pots arrossegar o utilitzar les fletxes per ordenar els documents exactament com vulguis abans de prémer 'Uneix PDF'. El document final respectarà estrictament aquesta seqüència de dalt a baix.",
      },
      {
        q: "Es conserven els enllaços, hipervincles i text seleccionable?",
        a: "Sí. Les pàgines s'importen vectorialment amb els seus objectes nadius, tipografies i capes de contingut, de manera que el text roman seleccionable, net i amb la màxima fidelitat sense compressió forçada.",
      },
      {
        q: "Puc unir fitxers PDF amb mides de pàgina diferents (A4, carta, apaïsat)?",
        a: "Sí. Cada pàgina afegida conserva les seves dimensions originals i la seva orientació particular (vertical o horitzontal) dins del mateix document unificat.",
      },
      {
        q: "Quin nom tindrà el fitxer PDF descarregat?",
        a: "Per defecte el document es genera amb el nom 'breadpdf-documento-unido.pdf', a punt per desar a la teva carpeta de descàrregues o reanomenar al teu ordinador.",
      },
      {
        q: "Els meus documents es pugen a cap servidor extern?",
        a: "No. La unió de PDF es realitza 100% de manera local al teu navegador mitjançant WebAssembly i JavaScript. Els fitxers mai no viatgen per internet ni s'allotgen al núvol.",
      },
    ],
  },
  "dividir-pdf": {
    slug: "divideix-pdf",
    name: "Divideix PDF",
    h1: "Divideix un PDF en diversos documents",
    tagline: "Separa pàgina a pàgina o pels intervals que tu defineixis.",
    seoTitle: "Dividir PDF per pàgines o intervals | BreadPDF",
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
        q: "Com es defineixen els intervals o rangs de pàgines?",
        a: "En el mode d'intervals, escriu les pàgines o rangs separats per comes (per exemple: '1-3, 4, 5-9'). Cada interval generarà un fitxer PDF independent amb aquestes pàgines exactes.",
      },
      {
        q: "Puc dividir el PDF en un fitxer per a cada pàgina?",
        a: "Sí. Tria l'opció 'Una pàgina per fitxer' al selector de mode. Si el teu PDF té 10 pàgines, obtindràs 10 fitxers PDF individuals numerats correlativament.",
      },
      {
        q: "Quin nom reben els fitxers resultants després de la divisió?",
        a: "Cada fitxer descarregable pren com a base el nom del document original afegint la pàgina o l'interval corresponent (per exemple: 'document-pagina-1.pdf' o 'document-1-3.pdf').",
      },
      {
        q: "Es modifica el fitxer original que he pujat?",
        a: "De cap manera. El teu document original roman intacte al teu dispositiu; l'eina només extreu i desa còpies noves de les pàgines indicades sense tocar l'origen.",
      },
      {
        q: "Es perd qualitat visual o text seleccionable en dividir?",
        a: "No. La divisió es realitza copiant directament les estructures i fluxos vectorials originals de cada pàgina, preservant textos, fonts, imatges i nitidesa al 100%.",
      },
      {
        q: "S'envien els meus documents a servidors remots per dividir-los?",
        a: "No. Tot el procés de separació i empaquetament de pàgines té lloc de manera local i privada al teu navegador. Cap dada viatja a la xarxa ni a servidors externs.",
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
    seoTitle: "Convertir PDF a JPG amb qualitat ajustable | BreadPDF",
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
        q: "Com es converteix un PDF a imatges JPG?",
        a: "Només has de seleccionar el teu fitxer PDF, ajustar els valors de resolució (escala) i qualitat de compressió JPG si ho desitges, i fer clic a 'Converteix a JPG'. Cada pàgina es processarà i es generarà una imatge independent a punt per descarregar.",
      },
      {
        q: "Es converteixen totes les pàgines del document?",
        a: "Sí. El conversor recorre automàticament cadascuna de les pàgines del PDF des de la primera fins a l'última, generant un fitxer JPG numerat per a cadascuna d'elles.",
      },
      {
        q: "Què signifiquen els controls de resolució i qualitat?",
        a: "La 'Resolució' aplica un multiplicador d'escala sobre les dimensions de la pàgina (des d'1x fins a 4x per a més nitidesa), mentre que la 'Qualitat JPG' ajusta el nivell de compressió de la imatge (del 40% al 100%) per equilibrar claredat i mida de fitxer.",
      },
      {
        q: "Què passa amb els textos, vectors i imatges del PDF?",
        a: "El motor de renderització rasteritza tot el contingut visible de cada pàgina tal com es va dissenyar, incloent tipografies, il·lustracions vectorials i fotografies, consolidant-los en una imatge JPG d'alta definició.",
      },
      {
        q: "Es poden descarregar les imatges individualment?",
        a: "Sí. Cada pàgina convertida genera el seu propi fitxer descarregable amb el nom original del PDF seguit del seu número de pàgina (per exemple: 'document-01.jpg', 'document-02.jpg').",
      },
      {
        q: "Es carreguen els meus documents a servidors externs durant la conversió?",
        a: "No. La renderització a imatge s'executa al 100% de manera local al motor del teu navegador web. La informació dels teus documents mai no s'envia a cap servidor.",
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
    seoTitle: "Convertir JPG a PDF en línia en A4 o ajustat | BreadPDF",
    seoDescription:
      "Converteix imatges JPG o PNG en un únic document PDF, triant mida A4 amb marges o ajustat a la foto. Ordena les imatges al teu navegador.",
    ctaLabel: "Crea el PDF",
    keywords: ["jpg a pdf", "imatge a pdf", "png a pdf"],
    howItWorks: [
      "Afegeix les teves imatges JPG o PNG.",
      "Ordena-les i tria la mida de pàgina.",
      "Descarrega el PDF resultant.",
    ],
    faq: [
      {
        q: "Puc afegir diverses imatges alhora?",
        a: "Sí. Pots seleccionar i carregar tantes imatges com necessitis en una sola tanda per combinar-les en un únic document PDF.",
      },
      {
        q: "Es poden combinar imatges en format JPG i PNG juntes?",
        a: "Sí. L'eina és compatible tant amb fitxers JPEG/JPG com amb PNG, permetent-te combinar-los indistintament al mateix fitxer PDF final.",
      },
      {
        q: "Com s'organitza l'ordre de les fotos al PDF?",
        a: "A la llista prèvia pots arrossegar o utilitzar les fletxes per ordenar les imatges en la seqüència exacta que vulguis. La primera imatge correspondrà a la primera pàgina del PDF.",
      },
      {
        q: "Quina diferència hi ha entre 'A4 amb marges' i 'Ajustat a la imatge'?",
        a: "El mode 'A4 amb marges' escala proporcionalment cada foto per centrar-la en un full estàndard A4 amb vora neta, ideal per imprimir. El mode 'Ajustat a la imatge' crea pàgines de la mida exacta en píxels de cada fotografia.",
      },
      {
        q: "Puc convertir imatges amb diferents resolucions o proporcions?",
        a: "Sí. Si selecciones A4, cada imatge s'ajustarà automàticament mantenint la seva relació d'aspecte original sense deformar-se. Si selecciones ajustat a la imatge, cada pàgina adoptarà les mides pròpies de cada foto.",
      },
      {
        q: "Es pugen les meves fotografies a internet o a cap servidor?",
        a: "No. L'empaquetament d'imatges a PDF es realitza al 100% de manera local al teu navegador mitjançant WebAssembly. Les teves fotos privades mai no abandonen el teu ordinador o telèfon.",
      },
    ],
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
    seoTitle: "Girar PDF en línia i desar el gir | BreadPDF",
    seoDescription:
      "Gira pàgines d'un PDF 90, 180 o 270 graus, a tot el document o a pàgines concretes, i desa el resultat de manera permanent.",
    ctaLabel: "Gira PDF",
    keywords: ["girar pdf", "rotar pdf", "voltejar pdf"],
    howItWorks: ["Puja el PDF.", "Tria el gir i les pàgines.", "Descarrega el PDF ja girat."],
    faq: [
      {
        q: "El gir es desa de manera permanent al fitxer?",
        a: "Sí. L'angle de rotació s'inscriu directament a les metadades i als diccionaris de pàgina del document PDF. En obrir-lo a Adobe Acrobat, al navegador o a qualsevol visor, apareixerà girat de forma definitiva.",
      },
      {
        q: "Puc girar només pàgines específiques o intervals?",
        a: "Sí. Al camp 'Pàgines' pots especificar pàgines soltes o rangs separats per comes (per exemple: '1, 3-5'). Si deixes el camp buit, el gir s'aplicarà automàticament a totes les pàgines del PDF.",
      },
      {
        q: "Quins angles de gir hi ha disponibles?",
        a: "Pots girar les pàgines 90° a la dreta (en sentit horari), 180° (per a documents invertits) o 90° a l'esquerra (en sentit antihorari/270°).",
      },
      {
        q: "Es modifica o es comprimeix el contingut del PDF en girar-lo?",
        a: "No. La rotació només modifica la propietat d'orientació geomètrica de les pàgines seleccionades. Els textos, fonts incrustades, imatges i vectors romanen exactament amb la seva qualitat original.",
      },
      {
        q: "Quin nom té el fitxer descarregat després de girar-lo?",
        a: "El document es descarrega automàticament conservant el nom original amb el sufix '-rotado.pdf' per no sobreescriure accidentalment el teu fitxer d'origen.",
      },
      {
        q: "El processament de rotació es realitza al meu navegador?",
        a: "Sí. Tot el procés s'executa 100% de manera local al teu dispositiu mitjançant WebAssembly. El teu document mai no s'envia a la xarxa ni a servidors de tercers.",
      },
    ],
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
    seoTitle: "Extreure pàgines d'un PDF en un fitxer nou | BreadPDF",
    seoDescription:
      "Selecciona i extreu pàgines concretes o intervals d'un PDF per crear un nou document independent, sense alterar el fitxer original.",
    ctaLabel: "Extreu pàgines",
    keywords: ["extreure pàgines pdf", "separar pàgines pdf"],
    howItWorks: [
      "Puja el PDF.",
      "Indica les pàgines que vols conservar.",
      "Descarrega el document nou.",
    ],
    faq: [
      {
        q: "Com s'indiquen les pàgines que vull extreure?",
        a: "Al camp 'Pàgines a extreure' pots escriure números individuals separats per comes o rangs amb guions (per exemple: '1, 4-6, 10'). Només s'inclouran al nou document les pàgines que especifiquis.",
      },
      {
        q: "En quin ordre apareixen les pàgines al nou PDF?",
        a: "El processador recopila les pàgines i les ordena de manera ascendent natural per conservar la coherència i el sentit de lectura cronològic del document original.",
      },
      {
        q: "Quina diferència hi ha entre extreure pàgines i dividir un PDF?",
        a: "'Extreu pàgines' genera un únic fitxer PDF que conté exclusivament la selecció de pàgines que necessites. 'Divideix PDF', en canvi, separa el document en múltiples fitxers individuals o per blocs.",
      },
      {
        q: "El PDF original s'altera o perd pàgines?",
        a: "No. El teu document original al teu ordinador o mòbil no pateix cap canvi. L'eina genera un fitxer nou descarregable sense modificar l'original.",
      },
      {
        q: "Es conserva la qualitat, fonts i gràfics de les pàgines extretes?",
        a: "Sí. Les pàgines es copien fidelment a nivell vectorial amb tots els seus fluxos de text, imatges i estils intactes, sense pèrdua de resolució ni canvis de format.",
      },
      {
        q: "Es processa el fitxer de manera privada al meu navegador?",
        a: "Sí. L'extracció té lloc íntegrament dins del teu navegador amb WebAssembly. Cap document viatja per la xarxa ni s'allotja a servidors externs.",
      },
    ],
    options: { pages: { label: "Pàgines a extreure", help: "Exemple: 1, 4-6, 10" } },
  },
  "eliminar-paginas-pdf": {
    slug: "elimina-pagines-pdf",
    name: "Elimina pàgines",
    h1: "Elimina pàgines d'un PDF",
    tagline: "Esborra les pàgines que no necessites i conserva la resta intacta.",
    seoTitle: "Eliminar pàgines d'un PDF i desar en línia | BreadPDF",
    seoDescription:
      "Esborra les pàgines que no necessites d'un document PDF i descarrega el fitxer net amb pàgines reindexades, sense instal·lar programes ni pujar fitxers.",
    ctaLabel: "Elimina pàgines",
    keywords: ["eliminar pàgines pdf", "esborrar pàgines pdf", "treure fulls pdf"],
    howItWorks: [
      "Puja el PDF.",
      "Indica les pàgines que vols eliminar.",
      "Descarrega el resultat.",
    ],
    faq: [
      {
        q: "Puc eliminar totes les pàgines d'un document?",
        a: "No. Un fitxer PDF vàlid requereix conservar almenys una pàgina. Si intentes eliminar la totalitat de les pàgines, el sistema et demanarà ajustar la selecció.",
      },
      {
        q: "Com indico quines pàgines o intervals vull esborrar?",
        a: "Al camp 'Pàgines a eliminar', escriu els números solts o intervals separats per comes (per exemple: '2, 7-9'). Aquestes pàgines seran suprimides i la resta es mantindrà intacta.",
      },
      {
        q: "Què passa amb la numeració de les pàgines restants?",
        a: "El document resultant es reindexa automàticament de forma consecutiva des de la pàgina 1 en endavant, mantenint un flux continu i ordenat sense buits en blanc.",
      },
      {
        q: "Es redueix el pes del fitxer després d'eliminar pàgines?",
        a: "Sí. En retirar pàgines completes, s'eliminen del document final els elements, gràfics i fonts incrustades exclusius d'aquestes pàgines, reduint la mida total del PDF.",
      },
      {
        q: "Es veu afectat el fitxer original que he pujat?",
        a: "No. El teu fitxer al teu dispositiu roman inalterat. L'eina genera un nou PDF descarregable amb el sufix '-sin-paginas.pdf' sense sobreescriure el teu document d'origen.",
      },
      {
        q: "S'esborren les pàgines al meu propi navegador de manera privada?",
        a: "Sí. L'eliminació i reassemblatge del PDF té lloc a la memòria local del teu navegador sense transferir fitxers a cap servidor extern.",
      },
    ],
    options: { pages: { label: "Pàgines a eliminar", help: "Exemple: 2, 7-9" } },
  },
  "extraer-texto-pdf": {
    slug: "extreu-text-pdf",
    name: "Extreu text",
    h1: "Extreu el text d'un PDF",
    tagline: "Aconsegueix tot el text del document en un fitxer de text pla.",
    seoTitle: "Extreure text d'un PDF a TXT en línia | BreadPDF",
    seoDescription:
      "Copia i extreu el text pla d'un PDF en un fitxer .txt net delimitat per pàgines. Procés 100% privat al teu navegador.",
    ctaLabel: "Extreu text",
    keywords: ["extreure text pdf", "pdf a txt", "copiar text pdf"],
    howItWorks: ["Puja el PDF.", "BreadPDF recorre les pàgines.", "Descarrega el fitxer de text."],
    faq: [
      {
        q: "En quin format es descarrega el text extret?",
        a: "El text es descarrega en un fitxer de text pla amb extensió .txt (codificació UTF-8), compatible de forma universal amb qualsevol editor de text com Bloc de Notes, Word o TextEdit.",
      },
      {
        q: "Es conserva la separació entre pàgines al fitxer .txt?",
        a: "Sí. Cada pàgina del PDF s'identifica al fitxer de text resultant mitjançant una capçalera clara (per exemple: '--- Pàgina 1 ---') que delimita el contingut de cada full.",
      },
      {
        q: "Funciona amb documents escanejats o imatges de text?",
        a: "Aquesta eina extreu text natiu vectorial incrustat al document. Per a documents procedents d'escàner o fotos on el text forma part d'una imatge, es requereix reconeixement òptic (OCR).",
      },
      {
        q: "S'extreuen taules, negretes o imatges al fitxer de text?",
        a: "No. El fitxer .txt extreu exclusivament els caràcters alfanumèrics i paraules en text pla net. No conté imatges ni format visual com colors o tipografies.",
      },
      {
        q: "Puc extreure el text d'un PDF protegit amb contrasenya?",
        a: "Si el fitxer requereix contrasenya per obrir-se, primer l'has de desbloquejar amb l'eina de desbloqueig d'BreadPDF perquè el lector pugui accedir al seu contingut.",
      },
      {
        q: "Els meus documents s'analitzen de manera privada i segura?",
        a: "Sí. La lectura i extracció de caràcters es realitza íntegrament a la memòria del teu navegador amb la llibreria pdf.js. El teu fitxer mai no surt del teu dispositiu ni s'emmagatzema externament.",
      },
    ],
  },
  "pdf-a-webp": {
    slug: "pdf-a-webp",
    name: "PDF a WebP",
    h1: "Converteix PDF a imatges WebP",
    tagline: "Converteix pàgines PDF a format WebP modern, nítid i fins a un 70% més lleuger.",
    seoTitle: "Convertir PDF a WebP en línia gratis | BreadPDF",
    seoDescription:
      "Transforma cada pàgina del teu PDF en imatges WebP d'última generació. Alta qualitat visual, compressió superior i 100% processat al teu navegador.",
    ctaLabel: "Converteix a WebP",
    keywords: ["pdf a webp", "convertir pdf webp", "extreure imatges webp pdf"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Tria la resolució de renderització.",
      "Descarrega les pàgines convertides en format WebP ultralleuger.",
    ],
    faq: [
      {
        q: "Quins avantatges ofereix el format WebP respecte a JPG o PNG?",
        a: "WebP és un format modern per a imatges web que ofereix una compressió fins a un 70% superior a JPG mantenint una nitidesa i fidelitat fotogràfica impecables, ideal per a llocs web ràpids i presentacions digitals.",
      },
      {
        q: "Es converteixen totes les pàgines del PDF a WebP?",
        a: "Sí. Cada pàgina del document es processa individualment i genera una imatge en format .webp independent a punt per ser descarregada.",
      },
      {
        q: "Quina resolució o nitidesa tenen les imatges WebP generades?",
        a: "Pots ajustar l'escala de renderització entre 1x (mida estàndard de pantalla) i fins a 4x per obtenir imatges en ultra alta resolució i gran detall de text i gràfics.",
      },
      {
        q: "Són compatibles les imatges WebP amb navegadors i programes actuals?",
        a: "Sí. WebP compta amb compatibilitat universal a tots els navegadors moderns (Chrome, Safari, Edge, Firefox) i als principals sistemes operatius com Windows, macOS, Android i iOS.",
      },
      {
        q: "Quin nom reben les imatges descarregades?",
        a: "Cada fitxer descarregat pren el nom del teu fitxer PDF original afegint el sufix '-pagina-X.webp', facilitant la seva classificació i arxiu.",
      },
      {
        q: "Es puja el meu PDF a cap servidor per fer la conversió a WebP?",
        a: "No. La conversió es processa íntegrament de manera local al motor de renderització del teu navegador web. Els teus fitxers mai no surten del teu ordinador o telèfon mòbil.",
      },
    ],
    options: {
      scale: { label: "Resolució", help: "Multiplicador sobre la mida de pàgina original." },
    },
  },
  "pdf-a-word": {
    slug: "pdf-a-word",
    name: "PDF a Word",
    h1: "Converteix PDF a Word editable",
    tagline: "Extreu el contingut textual i l'estructura bàsica del teu PDF a un fitxer .docx editable al teu navegador.",
    seoTitle: "Convertir PDF a Word (.docx) editable en línia | BreadPDF",
    seoDescription:
      "Converteix el text i paràgrafs d'un PDF a un document Word (.docx) editable al navegador. Procés local i privat sense registre.",
    ctaLabel: "Converteix a Word",
    keywords: ["pdf a word", "pdf a docx", "convertir pdf editable", "passar pdf a word"],
    howItWorks: [
      "Puja el document PDF que vols transformar.",
      "El motor en memòria extreu el text agrupant línies i paràgrafs.",
      "Descarrega el teu fitxer .docx editable a l'instant.",
    ],
    faq: [
      {
        q: "Puc editar el fitxer generat a Microsoft Word o Google Docs?",
        a: "Sí. L'eina genera un document estàndard en format .docx compatible amb Microsoft Word, LibreOffice Writer i Google Docs.",
      },
      {
        q: "Quin tipus de documents funcionen millor amb aquesta conversió?",
        a: "Funciona de manera òptima amb documents basats en text continu, com ara informes, contractes, articles i cartes. En aquests fitxers els paràgrafs s'extreuen amb fluïdesa per a la seva posterior redacció.",
      },
      {
        q: "Quines limitacions té respecte a un conversor d'escriptori professional?",
        a: "En executar-se íntegrament al navegador sense un motor de maquetació de pagament, els documents amb múltiples columnes periodístiques, taules niades sense vores o caixes de text flotants es reorganitzen de manera lineal i poden requerir ajustos manuals d'espaiat.",
      },
      {
        q: "Es conserven les tipografies exactes i les imatges?",
        a: "El text s'exporta amb tipografia estàndard neta. Les imatges decoratives complexes no s'incrusten en aquesta versió beta per prioritzar la fidelitat i lleugeresa del contingut editable.",
      },
      {
        q: "Funciona amb PDF escanejats o que només contenen imatges?",
        a: "No directament. Per a documents escanejats on el text no és seleccionable nativament, has de processar primer el fitxer amb l'eina 'OCR de PDF' d'BreadPDF per reconèixer els caràcters abans de convertir-los a Word.",
      },
      {
        q: "S'envien els meus documents a servidors externs?",
        a: "No. L'extracció de blocs de text i la composició del fitxer .docx s'executa al 100% de manera local a la memòria del teu navegador mitjançant JavaScript. Els teus fitxers mai no surten del teu ordinador o mòbil.",
      },
    ],
  },
  "word-a-pdf": {
    slug: "word-a-pdf",
    name: "Word a PDF",
    h1: "Converteix Word a PDF",
    tagline: "Transforma documents .docx en fitxers PDF estàndard i a punt per compartir o imprimir.",
    seoTitle: "Convertir Word a PDF en línia al teu navegador | BreadPDF",
    seoDescription:
      "Passa els teus documents Word (.docx) a PDF conservant paràgrafs, títols i estructura neta. 100% privat al teu navegador.",
    ctaLabel: "Converteix a PDF",
    keywords: ["word a pdf", "docx a pdf", "convertir word a pdf", "passar docx a pdf"],
    howItWorks: [
      "Puja el teu fitxer Word (.docx o .doc).",
      "El processador local interpreta el contingut i el pagina en format A4.",
      "Descarrega el teu document PDF final immediatament.",
    ],
    faq: [
      {
        q: "Quines versions de Word són compatibles?",
        a: "És compatible amb fitxers moderns en format .docx (Word 2007 en endavant). Per a documents molt antics (.doc binari), es recomana desar-los prèviament com a .docx per garantir una lectura fluida.",
      },
      {
        q: "Quins elements del document es transfereixen al PDF?",
        a: "El motor extreu els textos complets, títols, salts de paràgraf i llistes, maquetant-los en pàgines estàndard A4 amb marges uniformes i tipografia llegible.",
      },
      {
        q: "El disseny es veurà exactament igual que a Microsoft Word?",
        a: "El conversor client-side prioritza la integritat del text i l'estructura. Documents amb dissenys gràfics avançats, capçaleres multinivell personalitzades o fonts propietàries de Windows es renderitzen amb tipografies estàndard universals per garantir compatibilitat.",
      },
      {
        q: "Quina mida de pàgina i marges utilitza el PDF generat?",
        a: "Per defecte genera pàgines estàndard en format A4 vertical amb marges nets de 50 punts i divisió automàtica de línies per evitar desbordaments.",
      },
      {
        q: "Es puja el meu fitxer Word a cap servidor per a la conversió?",
        a: "No. L'anàlisi del fitxer .docx i la generació del PDF tenen lloc 100% de manera local al teu navegador mitjançant WebAssembly i llibreries de client. Cap text viatja per la xarxa.",
      },
    ],
  },
  "reordenar-paginas-pdf": {
    slug: "reordenar-pagines-pdf",
    name: "Reordenar pàgines",
    h1: "Reordena pàgines d'un PDF",
    tagline: "Canvia l'ordre de les pàgines arrossegant i deixant anar visualment.",
    seoTitle: "Reordenar pàgines d'un PDF en línia de franc | BreadPDF",
    seoDescription:
      "Canvia l'ordre de les pàgines del teu document PDF fàcilment amb vista prèvia visual. Arrossega els fulls a la posició desitjada i descarrega el resultat.",
    ctaLabel: "Desar nou ordre",
    keywords: ["reordenar pàgines pdf", "canviar ordre pàgines pdf", "moure fulls pdf"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Arrossega les miniatures de les pàgines per col·locar-les en l'ordre exacte que vulguis.",
      "Fes clic a 'Desar nou ordre' i descarrega el document reorganitzat.",
    ],
    faq: [
      {
        q: "Com canvio l'ordre de les pàgines?",
        a: "En carregar el document veuràs una quadrícula interactiva amb les miniatures de totes les pàgines. Només has de fer clic sobre una pàgina i arrossegar-la a la seva nova posició.",
      },
      {
        q: "Es perd qualitat visual o text seleccionable en reordenar?",
        a: "No. Les pàgines es reordenen de manera nativa a nivell vectorial mantenint les fonts, capes i nitidesa idèntiques al fitxer original.",
      },
      {
        q: "Puc eliminar o girar pàgines mentre les reordeno?",
        a: "Sí. A l'espai de treball disposes de controls per girar o descartar pàgines concretes abans d'exportar el PDF amb la seqüència final.",
      },
      {
        q: "Els meus documents s'envien a algun servidor per reordenar-los?",
        a: "No. La reordenació s'executa al 100% de manera local al teu navegador mitjançant WebAssembly. La teva informació roman privada al teu dispositiu.",
      },
      {
        q: "Hi ha límit de pàgines per reorganitzar?",
        a: "No hi ha cap límit artificial. Pots processar documents de desenes de pàgines segons la memòria del teu navegador.",
      },
    ],
  },
  "aplanar-pdf": {
    slug: "aplanar-pdf",
    name: "Aplanar PDF",
    h1: "Aplanar PDF i consolidar formularis",
    tagline: "Converteix camps interactius i formularis en contingut estàtic fix.",
    seoTitle: "Aplanar PDF en línia i bloquejar formularis | BreadPDF",
    seoDescription:
      "Consolida formularis interactius i anotacions en contingut gràfic no editable. Protegeix les teves dades abans de compartir documents.",
    ctaLabel: "Aplanar PDF",
    keywords: ["aplanar pdf", "flatten pdf", "bloquejar formulari pdf", "pdf no editable"],
    howItWorks: [
      "Puja el PDF que conté camps de formulari o elements interactius.",
      "El motor consolida els camps i valors en text i gràfics fixos.",
      "Descarrega el teu PDF aplanat, a punt per presentar en tràmits o imprimir.",
    ],
    faq: [
      {
        q: "Què vol dir exactament aplanar un PDF?",
        a: "Aplanar (o 'flatten') consolida els camps editables de formularis (AcroForms), capses de text i caselles de selecció en gràfics permanents del document, impedint que els valors s'alterin o s'esborrin.",
      },
      {
        q: "Es pot tornar a editar un formulari després d'aplanar-lo?",
        a: "No. Un cop aplanat, els camps deixen de ser interactius i esdevenen contingut estàtic no editable, assegurant que ningú pugui modificar les dades introduïdes.",
      },
      {
        q: "El text continua sent llegible i seleccionable?",
        a: "Sí. Les aparences dels textos completats es conserven amb la màxima fidelitat tipogràfica dins del flux de la pàgina.",
      },
      {
        q: "Aplanar redueix la mida del fitxer?",
        a: "En documents amb estructures complexes de formularis interactius pot reduir lleugerament el pes en eliminar metadades i diccionaris dinàmics del formulari.",
      },
      {
        q: "Les meves dades viatgen a algun servidor?",
        a: "No. La consolidació del formulari té lloc de manera íntegrament local a la memòria del teu navegador.",
      },
    ],
  },
  "eliminar-metadatos-pdf": {
    slug: "eliminar-metadades-pdf",
    name: "Eliminar metadades",
    h1: "Eliminar metadades ocultes d'un PDF",
    tagline: "Neteja informació oculta: autor, programari, dates i propietats.",
    seoTitle: "Eliminar metadades de PDF en línia i netejar propietats | BreadPDF",
    seoDescription:
      "Elimina informació confidencial oculta al teu PDF com autor, programari creador, dates de modificació i propietats de forma 100% privada.",
    ctaLabel: "Netejar metadades",
    keywords: ["eliminar metadades pdf", "netejar propietats pdf", "treure autor pdf"],
    howItWorks: [
      "Selecciona el PDF que vols netejar.",
      "El sistema purga els camps d'autor, títol, assumpte, programari creador i dates.",
      "Descarrega una còpia sanejada sense rastre de les teves dades personals.",
    ],
    faq: [
      {
        q: "Quines metadades s'eliminen del document?",
        a: "S'eliminen els camps del diccionari d'informació estàndard: Títol, Autor, Assumpte, Paraules clau, Creador, Productor i Dates de creació i modificació.",
      },
      {
        q: "Afecta aquest procés el contingut visual o text de les pàgines?",
        a: "De cap manera. El text, imatges, taules i diagrames visibles romanen exactament iguals. Només es purga la informació oculta del fitxer.",
      },
      {
        q: "Per què és important netejar les metadades abans de compartir un PDF?",
        a: "Les metadades poden revelar el teu nom complet, noms d'usuaris del teu ordinador, programes utilitzats i la data exacta en què es va treballar el document.",
      },
      {
        q: "S'envien els meus fitxers a un servidor per eliminar les metadades?",
        a: "No. La lectura i reescriptura de la capçalera del PDF es duu a terme al teu propi navegador sense connexions remotes.",
      },
      {
        q: "És el mateix eliminar metadades que censurar un PDF?",
        a: "No. 'Eliminar metadades' retira informació invisible de les propietats del fitxer. 'Censurar PDF' esborra i cobreix de manera permanent fragments de text o imatges visibles a les pàgines.",
      },
    ],
  },
  "pdf-a-png": {
    slug: "pdf-a-png",
    name: "PDF a PNG",
    h1: "Convertir PDF a imatges PNG",
    tagline: "Converteix pàgines de PDF en imatges PNG d'alta resolució sense pèrdues.",
    seoTitle: "Convertir PDF a PNG en línia de franc en alta qualitat | BreadPDF",
    seoDescription:
      "Transforma cada pàgina del teu document PDF en imatges PNG nítides sense artefactes de compressió. Ràpid, segur i al teu navegador.",
    ctaLabel: "Convertir a PNG",
    keywords: ["pdf a png", "convertir pdf a png", "extreure imatges png pdf"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Selecciona la resolució o escala desitjada.",
      "Descarrega les teves pàgines en format PNG amb la màxima nitidesa.",
    ],
    faq: [
      {
        q: "Quina diferència hi ha entre PDF a PNG i PDF a JPG?",
        a: "PNG és un format sense pèrdues ('lossless') que ofereix vores de text perfectes i més definició gràfica sense els artefactes típics de JPG.",
      },
      {
        q: "Com es descarreguen els documents amb diverses pàgines?",
        a: "Cada pàgina es processa com un fitxer PNG numerat de manera correlativa a punt per desar al teu dispositiu.",
      },
      {
        q: "Puc triar la resolució de sortida?",
        a: "Sí. Pots seleccionar entre resolució estàndard (1x) o alta resolució (2x) segons si necessites la imatge per a web o per a impressió.",
      },
      {
        q: "El fons de la pàgina es manté blanc?",
        a: "Sí, les pàgines PDF es renderitzen sobre un fons blanc sòlid per garantir que el contingut sigui universalment llegible en qualsevol visor.",
      },
      {
        q: "Es puja el meu PDF a algun servidor?",
        a: "No. La renderització es realitza íntegrament al motor Canvas del teu propi navegador sense enviar dades a servidors externs.",
      },
    ],
    options: {
      scale: {
        label: "Resolució d'imatge",
        choices: {
          "1": "Estàndard (72-96 DPI) — Lleuger",
          "2": "Alta definició (150-200 DPI) — Recomanat",
          "3": "Màxima nitidesa (300 DPI) — Impressió",
        },
      },
    },
  },
  "png-a-pdf": {
    slug: "png-a-pdf",
    name: "PNG a PDF",
    h1: "Convertir imatges PNG a document PDF",
    tagline: "Uneix imatges PNG i captures en un únic document PDF maquetat.",
    seoTitle: "Convertir PNG a PDF en línia de franc i en ordre | BreadPDF",
    seoDescription:
      "Combina una o diverses imatges PNG en un únic PDF. Ajusta a format A4 o mantén les dimensions originals amb total privadesa.",
    ctaLabel: "Convertir a PDF",
    keywords: ["png a pdf", "convertir png a pdf", "unir png en pdf"],
    howItWorks: [
      "Selecciona una o diverses imatges PNG del teu dispositiu.",
      "Tria si prefereixes encaixar-les en full A4 amb marges o conservar la mida original.",
      "Descarrega el teu document PDF unificat d'immediat.",
    ],
    faq: [
      {
        q: "Puc pujar diverses imatges PNG alhora?",
        a: "Sí. Pots seleccionar múltiples fitxers PNG i s'ordenaran en pàgines consecutives dins del mateix document PDF.",
      },
      {
        q: "Es conserven les transparències dels fitxers PNG?",
        a: "Sí. El motor d'BreadPDF incrusta les imatges PNG directament al PDF respectant el seu canal alfa i qualitat original sense convertir-les forçosament a JPEG.",
      },
      {
        q: "Quines opcions de mida de pàgina hi ha disponibles?",
        a: "Pots triar 'Ajustar a A4' (amb marges uniformes) o 'Mida original d'imatge' perquè cada pàgina tingui exactament els píxels de la imatge d'origen.",
      },
      {
        q: "Hi ha límit en la quantitat d'imatges?",
        a: "Pots combinar desenes d'imatges sempre que la memòria disponible al teu navegador ho permeti.",
      },
      {
        q: "S'envien les meves fotos o captures a servidors externs?",
        a: "No. Tota la composició del PDF es realitza localment al teu equip sense transferència al núvol.",
      },
    ],
    options: {
      pageSize: {
        label: "Mida de pàgina",
        choices: {
          a4: "Ajustar a full A4 (amb marges)",
          fit: "Mida original de cada imatge",
        },
      },
    },
  },
  "redimensionar-pdf": {
    slug: "redimensionar-pdf",
    name: "Ajustar mida de pàgina",
    h1: "Ajusta la mida de pàgina i normalitza a A4",
    tagline: "Estandarditza les dimensions del teu PDF a A4, Carta o Ofici.",
    seoTitle: "Ajustar mida de pàgina de PDF en línia a A4 | BreadPDF",
    seoDescription:
      "Normalitza documents amb pàgines heterogènies o adapta formats d'impressió a estàndard A4, Carta o Legal, mantenint proporcions.",
    ctaLabel: "Ajustar mida",
    keywords: ["ajustar mida pdf", "canviar mida pagina pdf", "passar pdf a a4"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Tria el format de pàgina objectiu (A4, Carta, Legal o A3).",
      "Descarrega el teu document normalitzat amb pàgines centrades i escalades proporcionalment.",
    ],
    faq: [
      {
        q: "Com s'adapta el contingut a la nova mida de pàgina?",
        a: "El contingut de cada pàgina s'escala proporcionalment i es centra dins del nou full, assegurant que no es talli cap element i que no es distorsioni la relació d'aspecte.",
      },
      {
        q: "Què passa amb les pàgines horitzontals (apaïsades)?",
        a: "El sistema detecta automàticament l'orientació de cada full. Si la pàgina original és apaïsada, el full de destinació s'orientarà horitzontalment respectant el format.",
      },
      {
        q: "Quines mides de pàgina estàndard hi ha disponibles?",
        a: "Pots normalitzar a A4 (210 × 297 mm), Carta / US Letter (216 × 279 mm), Ofici / Legal (216 × 356 mm) i A3 (297 × 420 mm).",
      },
      {
        q: "S'altera la qualitat del text en redimensionar?",
        a: "No. El contingut vectorial, les fonts i els gràfics es preserven amb precisió matemàtica en les noves dimensions.",
      },
      {
        q: "Els meus fitxers es processen de manera privada?",
        a: "Sí. Tota la reestructuració dimensional s'efectua a la memòria local del teu navegador sense enviar-se a servidors.",
      },
    ],
    options: {
      size: {
        label: "Mida objectiu",
        choices: {
          a4: "A4 (210 × 297 mm) — Estàndard europeu / internacional",
          letter: "Carta / US Letter (216 × 279 mm) — Estàndard americà",
          legal: "Ofici / Legal (216 × 356 mm) — Documents legals",
          a3: "A3 (297 × 420 mm) — Gran format / plànols",
        },
      },
    },
  },
  "editar-metadatos-pdf": {
    slug: "editar-metadades-pdf",
    name: "Editar metadades PDF",
    h1: "Editar metadades d'un PDF",
    tagline: "Modifica títol, autor, assumpte i paraules clau directament al teu navegador.",
    seoTitle: "Editar metadades de PDF en línia de franc | BreadPDF",
    seoDescription:
      "Canvia les propietats i metadades del teu PDF (títol, autor, assumpte i paraules clau) de manera 100% privada sense pujar fitxers a servidors.",
    ctaLabel: "Desar metadades",
    keywords: ["editar metadades pdf", "canviar autor pdf", "modificar titol pdf", "propietats pdf"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Introdueix o modifica el títol, autor, assumpte i paraules clau.",
      "Fes clic a Desar metadades per descarregar el PDF actualitzat.",
    ],
    faq: [
      {
        q: "Quines metadades es poden editar?",
        a: "Pots modificar els camps del diccionari estàndard d'informació: Títol, Autor, Assumpte i Paraules clau.",
      },
      {
        q: "S'altera el contingut visual o les pàgines del document?",
        a: "No. El contingut visual, fonts, imatges i textos romanen intactes. Només s'actualitzen les propietats del document.",
      },
      {
        q: "Es puja el meu fitxer a algun servidor extern?",
        a: "No. La lectura i modificació del fitxer s'executa 100% a la memòria del teu navegador amb total privadesa.",
      },
    ],
    options: {
      title: {
        label: "Títol del document",
        placeholder: "Ex. Memòria Anual 2026",
      },
      author: {
        label: "Autor",
        placeholder: "Ex. Nom o Empresa",
      },
      subject: {
        label: "Assumpte / Tema",
        placeholder: "Ex. Resum financer trimestral",
      },
      keywords: {
        label: "Paraules clau (separades per comes)",
        placeholder: "finances, informe, balanç",
      },
    },
  },
  "anadir-texto-pdf": {
    slug: "afegir-text-pdf",
    name: "Afegir text al PDF",
    h1: "Afegir text a un document PDF",
    tagline: "Insereix textos, notes o anotacions tipogràfiques a la posició i pàgina que triïs.",
    seoTitle: "Afegir text a PDF en línia de franc | BreadPDF",
    seoDescription:
      "Escriu i afegeix text a qualsevol pàgina del teu PDF amb control de mida, color i posició. 100% al teu navegador i sense registre.",
    ctaLabel: "Inserir text i descarregar",
    keywords: ["afegir text pdf", "escriure en pdf", "inserir text pdf", "posar text pdf"],
    howItWorks: [
      "Puja el teu fitxer PDF.",
      "Escriu el text, ajusta la posició horitzontal i vertical, la mida i el color.",
      "Previsualitza els canvis i descarrega el teu PDF amb el text inserit.",
    ],
    faq: [
      {
        q: "Puc afegir text a pàgines específiques o a tot el document?",
        a: "Sí. Pots triar aplicar el text a totes les pàgines, a la primera pàgina, a l'última o a pàgines seleccionades.",
      },
      {
        q: "Puc canviar la mida i el color del text afegit?",
        a: "Sí. Tens controls lliscants per a la mida tipogràfica, posició en percentatge sobre la pàgina i selector de color.",
      },
      {
        q: "El text afegit queda integrat en el document final?",
        a: "Sí. El text s'incrusta vectorialment en el fitxer PDF descarregable mantenint una nitidesa absoluta en imprimir o visualitzar.",
      },
      {
        q: "És segur processar documents confidencials?",
        a: "Totalment. El processament s'executa al navegador del teu dispositiu sense comunicar-se amb servidors externs.",
      },
    ],
    options: {
      text: {
        label: "Text a inserir",
        placeholder: "Escriu aquí el text...",
      },
      fontSize: {
        label: "Mida de font",
      },
      xPercent: {
        label: "Posició horitzontal (%)",
      },
      yPercent: {
        label: "Posició vertical (%)",
      },
    },
  },
  "insertar-paginas-pdf": {
    slug: "inserir-pagines-pdf",
    name: "Inserir pàgines a PDF",
    h1: "Inserir pàgines d'un altre PDF en un document",
    tagline: "Afegeix pàgines d'un segon PDF en una posició exacta dins del fitxer base.",
    seoTitle: "Inserir pàgines a PDF en línia de franc i en posició exacta | BreadPDF",
    seoDescription:
      "Insereix pàgines procedents d'un altre PDF a l'inici, al final o entre pàgines concretes del teu document de manera 100% privada.",
    ctaLabel: "Inserir pàgines i descarregar",
    keywords: ["inserir pagines pdf", "afegir pagines a pdf", "intercalar pagines pdf", "enganxar pagines pdf"],
    howItWorks: [
      "Puja el document PDF base (el primer) i el fitxer amb les pàgines que vols inserir (el segon).",
      "Tria la posició d'inserció: al principi, després de la portada o al final del document.",
      "Previsualitza l'ordre resultant i descarrega el PDF final amb les pàgines integrades.",
    ],
    faq: [
      {
        q: "En què es diferencia aquesta eina d'Unir PDF?",
        a: "Unir PDF concatena documents sencers un darrere l'altre seqüencialment. 'Inserir pàgines' permet col·locar les pàgines d'un segon PDF en una posició específica intermèdia o inicial dins del fitxer base.",
      },
      {
        q: "Puc inserir un fitxer de diverses pàgines de cop?",
        a: "Sí. Si el segon document conté 3 pàgines, les 3 pàgines s'incrustaran correlativament a la posició que hagis triat.",
      },
      {
        q: "Es conserven els enllaços i la nitidesa original?",
        a: "Sí. Les pàgines es copien fidelment respectant els traçats vectorials, tipografies i imatges integrades.",
      },
      {
        q: "Cal registrar-se o crear un compte d'usuari?",
        a: "No. Pots emprar l'eina immediatament i de manera anònima sense límits d'ús ni quotes.",
      },
      {
        q: "Els meus fitxers es transfereixen per internet?",
        a: "No. La combinació i inserció de pàgines es produeix al motor WebAssembly del teu navegador sense pujades al núvol.",
      },
    ],
    options: {
      position: {
        label: "Posició d'inserció",
        choices: {
          end: "Al final del document base",
          start: "Al principi (pàgina 1)",
          "after-first": "Després de la portada (pàgina 2)",
        },
      },
    },
  },
  "optimizar-pdf-para-impresion": {
    slug: "optimitzar-pdf-per-impressio",
    name: "Optimitzar PDF per a impressió",
    h1: "Optimitzar PDF per a impressió i escala de grisos",
    tagline: "Converteix el teu PDF a escala de grisos per estalviar tòner i agilitzar la impressió.",
    seoTitle: "Optimitzar PDF per a impressió en línia a escala de grisos | BreadPDF",
    seoDescription:
      "Transforma el teu PDF a escala de grisos real per imprimir sense gastar tinta de color. Procés nítid, privat i sense pujar fitxers a servidors.",
    ctaLabel: "Optimitzar per a impressió",
    keywords: ["optimitzar pdf impressio", "pdf escala de grisos", "imprimir pdf monocrom", "estalviar toner pdf"],
    howItWorks: [
      "Selecciona el PDF que vols enviar a imprimir.",
      "Tria el nivell de resolució objectiu (estàndard per a lectura o alta definició per a gràfics detallats).",
      "Descarrega el document optimitzat en escala de grisos a punt per a la teva impressora.",
    ],
    faq: [
      {
        q: "Per què convertir un PDF a escala de grisos abans d'imprimir?",
        a: "Moltes impressores combinen tintes de color per simular negres o grisos si el fitxer conté elements de color. Normalitzant a escala de grisos es garanteix l'ús exclusiu del cartutx negre.",
      },
      {
        q: "Com es realitza tècnicament la conversió?",
        a: "Cada pàgina es renderitza a alta resolució calculant la luminància perceptiva de cada píxel i es reconstrueix un nou PDF monocrom nítid.",
      },
      {
        q: "Afecta la llegibilitat del text petit?",
        a: "No. El renderitzat a alta resolució assegura que el text conservi contrastos nets tant en pantalla com en paper físic.",
      },
      {
        q: "La mida del fitxer es redueix?",
        a: "En documents amb fotografies o fons pesats de color sol reduir-se en descartar la informació cromàtica de tres canals.",
      },
      {
        q: "Es conserven els fitxers amb privadesa?",
        a: "Sí. Tota la conversió es processa localment al teu equip sense transferir pàgines a cap servidor extern.",
      },
    ],
    options: {
      dpi: {
        label: "Qualitat de renderització per a impressió",
        choices: {
          "2": "Alta definició (~150-200 DPI) — Recomanat",
          "1": "Esborrany ràpid (~96 DPI) — Fitxer més lleuger",
        },
      },
    },
  },
  "webp-a-pdf": {
    slug: "webp-a-pdf",
    name: "WebP a PDF",
    h1: "Convertir imatges WebP a PDF en línia",
    tagline: "Converteix imatges WebP en un PDF unificat d'alta fidelitat.",
    seoTitle: "Convertir WebP a PDF en línia de franc i en ordre | BreadPDF",
    seoDescription:
      "Transforma una o diverses imatges WebP en un únic fitxer PDF sense pèrdua de qualitat. Ràpid, privat al teu navegador i sense pujar fitxers a servidors.",
    ctaLabel: "Convertir a PDF",
    keywords: ["webp a pdf", "convertir webp a pdf", "passar imatges webp a pdf", "unir webp a pdf"],
    howItWorks: [
      "Selecciona una o diverses imatges WebP del teu dispositiu.",
      "Tria si prefereixes encaixar les imatges en full estàndard A4 amb marges o conservar la mida original.",
      "Descarrega el teu document PDF resultant d'immediat.",
    ],
    faq: [
      {
        q: "Puc convertir diverses imatges WebP en un únic document PDF?",
        a: "Sí. Pots seleccionar múltiples fitxers WebP simultàniament i s'ordenaran en pàgines consecutives dins del mateix document PDF.",
      },
      {
        q: "Es perd qualitat visual en convertir de WebP a PDF?",
        a: "No. El motor decodifica els píxels originals al navegador i els incrusta al PDF amb resolució completa sense artefactes innecessaris.",
      },
      {
        q: "Quines mides de pàgina estan disponibles?",
        a: "Pots triar 'Ajustar a full A4' (amb marges proporcionals) o 'Mida original de cada imatge' per adaptar cada pàgina a les dimensions exactes de la foto.",
      },
      {
        q: "Es poden reordenar les imatges abans d'exportar?",
        a: "Sí. Pots organitzar l'ordre de les pàgines directament des del panell de càrrega abans de generar el PDF final.",
      },
      {
        q: "Les meves imatges WebP es pugen al núvol?",
        a: "No. Tot el procés de decodificació i empaquetat del PDF té lloc 100% a la memòria del teu dispositiu mitjançant JavaScript i Canvas en client.",
      },
    ],
    options: {
      pageSize: {
        label: "Mida de pàgina",
        choices: {
          a4: "Ajustar a full A4 (amb marges)",
          fit: "Mida original de cada imatge",
        },
      },
    },
  },
  "markdown-a-pdf": {
    slug: "markdown-a-pdf",
    name: "Markdown a PDF",
    h1: "Convertir Markdown a PDF en línia",
    tagline: "Converteix fitxers Markdown (.md) en documents PDF nets i estructurats.",
    seoTitle: "Convertir Markdown a PDF en línia de franc i net | BreadPDF",
    seoDescription:
      "Transforma les teves notes i documents Markdown (.md) en PDF elegants amb títols, paràgrafs, llistes, cites i blocs de codi maquetats a l'instant.",
    ctaLabel: "Convertir a PDF",
    keywords: ["markdown a pdf", "convertir md a pdf", "exportar markdown a pdf", "document md a pdf"],
    howItWorks: [
      "Puja el teu fitxer Markdown (.md o .markdown).",
      "El motor analitza i pagina la jerarquia d'encapçalaments, llistes i blocs de text.",
      "Descarrega el teu document PDF estructurat i a punt per imprimir o compartir.",
    ],
    faq: [
      {
        q: "Quins elements de sintaxi Markdown són compatibles?",
        a: "L'eina processa encapçalaments (#, ##, ###), paràgrafs, negretes (**), cites en bloc (>), llistes amb vinyetes (* o -), llistes numerades i blocs de codi voltats amb tipografia monoespaiada.",
      },
      {
        q: "Com es gestiona el salt de pàgina en documents extensos?",
        a: "El conversor calcula automàticament els marges i l'alçada vertical disponible, distribuint el contingut en fulls A4 amb salts nets i proporcionals.",
      },
      {
        q: "És adequat per exportar respostes d'IA com ChatGPT o Claude?",
        a: "Sí. És el flux perfecte per convertir respostes, prompts i documentació exportada en Markdown des de models d'IA o aplicacions com Notion i Obsidian.",
      },
      {
        q: "Es conserven els blocs de codi formatats?",
        a: "Sí. Els fragments de codi delimitats per tres accents greus (```) es renderitzen en una capsa amb fons ombrejat i font Courier monoespaiada.",
      },
      {
        q: "S'envien les meves notes o textos a servidors externs?",
        a: "No. L'anàlisi i la generació tipogràfica del PDF es realitzen al teu navegador amb total confidencialitat.",
      },
    ],
  },
  "powerpoint-a-pdf": {
    slug: "powerpoint-a-pdf",
    name: "PowerPoint a PDF",
    h1: "Convertir PowerPoint a PDF en línia",
    tagline: "Converteix presentacions .pptx en diapositives PDF panoràmiques (Vista prèvia beta).",
    seoTitle: "Convertir PowerPoint a PDF en línia gratis (.pptx) | BreadPDF",
    seoDescription:
      "Transforma diapositives de PowerPoint (.pptx) a document PDF panoràmic al teu navegador. Ràpid, 100% privat i sense pujar fitxers a servidors externs.",
    ctaLabel: "Convertir a PDF",
    keywords: ["powerpoint a pdf", "convertir pptx a pdf", "passar powerpoint a pdf", "diapositives a pdf"],
    howItWorks: [
      "Puja el teu fitxer de presentació PowerPoint (.pptx).",
      "El motor al navegador analitza diapositives, textos i títols.",
      "Descarrega el teu document PDF estructurat en format panoràmic 16:9.",
    ],
    faq: [
      {
        q: "Quin nivell de fidelitat visual ofereix aquesta conversió?",
        a: "Aquesta eina funciona en fase beta i utilitza un analitzador client-side al teu navegador. Extreu textos, títols, paràgrafs i estructura de diapositives en pàgines panoràmiques 16:9 amb tipografies universals. No reprodueix animacions ni maquetacions complexes amb SmartArt de Microsoft Office.",
      },
      {
        q: "Quines versions de PowerPoint són compatibles?",
        a: "És compatible amb presentacions modernes en format .pptx (PowerPoint 2007 en endavant). Per a fitxers antics amb extensió .ppt binària, es recomana desar-los prèviament com a .pptx.",
      },
      {
        q: "Es conserven les diapositives en format panoràmic o A4?",
        a: "El document PDF es genera de forma nativa en proporció panoràmica estàndard 16:9 (960 × 540 pt), ideal per projectar en pantalles o visualitzar en tauletes i ordinadors.",
      },
      {
        q: "Per què es presenta com a versió Beta / Vista prèvia?",
        a: "Perquè l'especificació OpenXML de PowerPoint conté centenars de tipus de formes propietàries. Per garantir una experiència transparent i rigorosa, documentem amb honestedat que la conversió és estructural i tipogràfica, sense prometre fidelitat gràfica al 100%.",
      },
      {
        q: "Es puja la meva presentació a cap servidor extern?",
        a: "No. La lectura del fitxer ZIP intern del .pptx i la composició del PDF s'executen íntegrament de manera local al teu navegador amb total privadesa.",
      },
    ],
  },
  "svg-a-pdf": {
    slug: "svg-a-pdf",
    name: "SVG a PDF",
    h1: "Convertir fitxers SVG a PDF en línia",
    tagline: "Transforma gràfics vectorials SVG en documents PDF nítids en alta definició.",
    seoTitle: "Convertir SVG a PDF en línia gratis en alta definició | BreadPDF",
    seoDescription:
      "Converteix fitxers vectorials SVG a documents PDF preservant corbes, traçats i proporcions visuals al teu navegador amb total privadesa.",
    ctaLabel: "Convertir a PDF",
    keywords: ["svg a pdf", "convertir svg a pdf", "vector a pdf", "passar svg a pdf"],
    howItWorks: [
      "Puja el teu fitxer gràfic vectorial (.svg).",
      "Tria si prefereixes encaixar en full A4 estàndard o en la mida exacta del llenç (viewBox).",
      "Descarrega el teu document PDF renderitzat amb la màxima nitidesa.",
    ],
    faq: [
      {
        q: "Com es processa tècnicament la conversió d'SVG a PDF?",
        a: "L'eina interpreta el marcat XML de l'SVG i les seves proporcions natives de viewBox, renderitzant el contingut a alta definició (escala 2.5x hipernítida) i incrustant-lo de forma neta i proporcional en un document PDF estàndard.",
      },
      {
        q: "S'adapta a fulls verticals o horitzontals?",
        a: "Sí. Si selecciones el mode de pàgina A4, el sistema detecta la relació d'aspecte del gràfic i inicialitza la pàgina en format vertical o apaïsat segons l'orientació natural de l'SVG.",
      },
      {
        q: "Puc mantenir les dimensions exactes del gràfic original?",
        a: "Sí. En triar 'Mida original (viewBox)', la pàgina del PDF adoptarà exactament els punts d'amplada i alçada definits a la caixa de coordenades del teu fitxer SVG.",
      },
      {
        q: "Es conserven colors i degradats?",
        a: "Sí. El motor de dibuix del navegador interpreta la totalitat dels estils CSS, farciments, traços i degradats estàndard suportats en l'especificació SVG.",
      },
      {
        q: "Es puja el meu fitxer vectorial a cap servidor extern?",
        a: "No. La lectura, el renderitzat de píxels i l'empaquetament del document PDF tenen lloc 100% de manera local i privada a la memòria del teu dispositiu.",
      },
    ],
    options: {
      pageSize: {
        label: "Mida de pàgina",
        choices: {
          a4: "Ajustar a full A4 (amb marges nets)",
          viewbox: "Mida original del gràfic (viewBox)",
        },
      },
    },
  },

  "extraer-imagenes-pdf": {
    slug: "extreure-imatges-pdf",
    name: "Extreure imatges de PDF",
    h1: "Extreure imatges incrustades d'un PDF",
    tagline: "Obtén les fotografies i imatges incrustades al teu PDF com a fitxers PNG independents.",
    seoTitle: "Extreure imatges de PDF en línia gratis | BreadPDF",
    seoDescription:
      "Extreu les imatges incrustades al teu document PDF com a fitxers PNG individuals directament al teu navegador, sense pujar res a cap servidor.",
    ctaLabel: "Extreu imatges",
    keywords: ["extreure imatges pdf", "treure fotos pdf", "obtenir imatges pdf", "pdf a imatges"],
    howItWorks: [
      "Puja el PDF del qual vols extreure imatges.",
      "El motor analitza cada pàgina cercant objectes de tipus XObject de imatge incrustats.",
      "Descarrega les imatges individuals en PNG o com a ZIP si n'hi ha diverses.",
    ],
    faq: [
      {
        q: "Quin tipus d'imatges extreu aquesta eina?",
        a: "Extreu imatges rasteritzades incrustades com a objectes XObject en el PDF: fotografies JPEG, PNG o imatges en color RGBA. No extreu elements vectorials ni text formatat.",
      },
      {
        q: "Per què no apareix cap imatge al meu PDF?",
        a: "Alguns PDFs només contenen text i vectors sense imatges rasteritzades incrustades. També pot ocórrer que les imatges estiguin en un format intern no estàndard.",
      },
      {
        q: "En quin format es descarreguen les imatges?",
        a: "Les imatges s'exporten en format PNG amb la resolució original de l'objecte incrustat. Si n'hi ha més d'una, s'empaquet automàticament en un fitxer ZIP.",
      },
      {
        q: "Quina diferència hi ha entre 'Extreure imatges' i 'PDF a PNG'?",
        a: "'PDF a PNG' converteix cada pàgina completa del PDF en una imatge de pantalla, incloent text i vectors. 'Extreure imatges' recupera exclusivament els objectes d'imatge incrustats dins el PDF.",
      },
      {
        q: "Es puja el PDF a cap servidor extern?",
        a: "No. L'anàlisi del document i l'extracció d'imatges es realitzen completament a la memòria del teu navegador mitjançant pdf.js.",
      },
    ],
  },

  "dividir-pdf-por-tamano": {
    slug: "dividir-pdf-per-mida",
    name: "Dividir PDF per mida",
    h1: "Dividir un PDF en parts per mida màxima en MB",
    tagline: "Fragmenta documents grans respectant un límit de pes aproximat per part.",
    seoTitle: "Dividir PDF per mida en MB en línia gratis | BreadPDF",
    seoDescription:
      "Divideix un PDF gran en fragments amb un límit de mida en MB per part. Ideal per a fitxers adjunts de correu o plataformes amb límits de pes.",
    ctaLabel: "Divideix per mida",
    keywords: ["dividir pdf per mida", "partir pdf mb", "fragmentar pdf pes", "dividir pdf correu"],
    howItWorks: [
      "Puja el PDF que necessites fragmentar.",
      "Tria la mida màxima aproximada en MB per a cada part.",
      "Descarrega les parts numerades o en ZIP si n'hi ha més de tres.",
    ],
    faq: [
      {
        q: "La mida de cada part és exacta?",
        a: "És aproximada. El PDF està compost per pàgines completes que no es poden fraccionar. El motor calcula quantes pàgines caben en l'objectiu de MB, però el resultat real pot variar lleugerament.",
      },
      {
        q: "En què es diferencia de 'Dividir PDF'?",
        a: "'Dividir PDF' divideix el document en intervals de pàgines que tu defines. 'Dividir PDF per mida' divideix automàticament segons un pes màxim en MB per fragment.",
      },
      {
        q: "Quantes parts genera?",
        a: "El nombre de parts depèn de la mida del fitxer original i del límit de MB que defineixis. No hi ha límit artificial de fragments.",
      },
      {
        q: "Es perd qualitat en dividir el PDF?",
        a: "No. Les pàgines es copien íntegrament amb el seu contingut vectorial, imatges i fonts originals sense cap recompressió.",
      },
      {
        q: "Els meus fitxers es pugen a cap servidor?",
        a: "No. El procés de divisió es realitza a la memòria del teu navegador amb pdf-lib. Els teus documents no es transmeten a cap servidor extern.",
      },
    ],
    options: {
      maxMb: {
        label: "Mida màxima aproximada per part",
      },
    },
  },

  "eliminar-paginas-en-blanco": {
    slug: "eliminar-pagines-en-blanc",
    name: "Eliminar pàgines en blanc",
    h1: "Eliminar pàgines en blanc d'un PDF",
    tagline: "Detecta i elimina automàticament les pàgines buides de documents escanejats o formularis.",
    seoTitle: "Eliminar pàgines en blanc de PDF en línia gratis | BreadPDF",
    seoDescription:
      "Detecta i elimina automàticament les pàgines en blanc o buides del teu PDF. Ideal per a documents escanejats, formularis i informes.",
    ctaLabel: "Elimina pàgines en blanc",
    keywords: ["eliminar pàgines en blanc pdf", "treure pàgines buides pdf", "esborrar pàgines blanques pdf"],
    howItWorks: [
      "Puja el PDF amb pàgines en blanc o quasi buides.",
      "L'analitzador renderitza cada pàgina a baixa resolució i mesura el percentatge de píxels blancs.",
      "Les pàgines que superen el llindar s'eliminen i descarregues el PDF resultant.",
    ],
    faq: [
      {
        q: "Com detecta l'eina si una pàgina és en blanc?",
        a: "Renderitza cada pàgina a baixa resolució (escala 0.4×) amb pdf.js i analitza el percentatge de píxels amb una lluminositat molt alta (R, G, B > 240). Si aquest percentatge supera el llindar configurat, la pàgina es considera en blanc.",
      },
      {
        q: "Pot eliminar pàgines amb molt poc contingut però no completament blanques?",
        a: "Sí. Reduint el llindar de sensibilitat pots fer que el detector elimini també pàgines amb contingut molt escàs. Per defecte el llindar és del 97% per ser conservador.",
      },
      {
        q: "Funciona amb PDFs escanejats?",
        a: "Sí. La detecció treballa sobre el renderitzat visual de la pàgina, de manera que funciona tant amb PDFs de text vectorial com amb documents escanejats en imatge.",
      },
      {
        q: "Es puja el PDF a cap servidor?",
        a: "No. Tota l'anàlisi i l'eliminació de pàgines es realitzen localment al teu navegador sense transmetre cap dada externa.",
      },
    ],
    options: {
      threshold: {
        label: "Sensibilitat de detecció",
        help: "Percentatge mínim de píxels blancs per considerar una pàgina 'en blanc'. Valor més alt = més conservador.",
      },
    },
  },

  "imagen-a-webp": {
    slug: "imatge-a-webp",
    name: "Imatge a WebP",
    h1: "Convertir imatges JPG i PNG a WebP",
    tagline: "Redueix el pes de les teves imatges per al web convertint-les al format WebP modern.",
    seoTitle: "Convertir imatge a WebP en línia gratis | JPG i PNG | BreadPDF",
    seoDescription:
      "Converteix imatges JPG i PNG al format WebP per optimitzar-ne el pes per al web. Ajusta la qualitat i descarrega el resultat al instant al teu navegador.",
    ctaLabel: "Convertir a WebP",
    keywords: ["imatge a webp", "jpg a webp", "png a webp", "convertir webp", "optimitzar imatge web"],
    howItWorks: [
      "Puja una o diverses imatges JPG o PNG.",
      "Ajusta el nivell de qualitat WebP (més qualitat = més pes).",
      "Descarrega les imatges convertides o el ZIP si n'hi ha diverses.",
    ],
    faq: [
      {
        q: "Quins formats d'imatge accepta aquesta eina?",
        a: "Accepta imatges en format JPG/JPEG i PNG. Aquests són els dos formats més comuns per al web i tots dos es converteixen amb total fidelitat al format WebP.",
      },
      {
        q: "Quant es redueix el pes de la imatge?",
        a: "L'estalvi depèn del contingut de la imatge original i de la qualitat triada. WebP ofereix generalment una millor compressió que JPG o PNG per al mateix nivell de qualitat visual, però el resultat exacte varia per imatge. Aquesta eina no garanteix una reducció de pes específica.",
      },
      {
        q: "Es conserva la transparència dels PNG en convertir a WebP?",
        a: "Sí. WebP admet canal alfa (transparència), de manera que les imatges PNG amb fons transparent mantenen aquesta característica en convertir-se.",
      },
      {
        q: "Puc convertir diverses imatges alhora?",
        a: "Sí. Pots afegir múltiples fitxers JPG i PNG en una sola sessió. Si n'hi ha diverses, el resultat s'empaqueta automàticament en un fitxer ZIP.",
      },
      {
        q: "Els fitxers es pugen a cap servidor?",
        a: "No. La conversió utilitza exclusivament l'API Canvas del navegador de forma local. Cap imatge abandona el teu dispositiu.",
      },
    ],
    options: {
      quality: {
        label: "Qualitat WebP",
        help: "Més qualitat = més pes del fitxer resultant.",
      },
    },
  },

  "sanear-pdf": {
    slug: "sanear-pdf",
    name: "Sanejar PDF",
    h1: "Sanejar i netejar un PDF d'elements no desitjats",
    tagline: "Elimina JavaScript incrustat, accions automàtiques i metadades d'autor dels teus documents PDF.",
    seoTitle: "Sanejar PDF en línia gratis — eliminar JavaScript i metadades | BreadPDF",
    seoDescription:
      "Neteja el teu PDF eliminant JavaScript incrustat, accions automàtiques d'obertura i metadades d'autor. Ideal abans de compartir documents de tercers.",
    ctaLabel: "Sanejar PDF",
    keywords: ["sanejar pdf", "netejar pdf", "eliminar javascript pdf", "netejar metadades pdf", "pdf segur"],
    howItWorks: [
      "Puja el PDF que vols sanejar.",
      "El motor elimina JavaScript, accions automàtiques i metadades d'autor.",
      "Descarrega el PDF net i llest per compartir.",
    ],
    faq: [
      {
        q: "Quins elements elimina exactament aquesta eina?",
        a: "Elimina: (1) JavaScript incrustat al catàleg del document, (2) Accions automàtiques d'obertura (/OpenAction, /AA), (3) El flux de metadades XMP (/Metadata), i (4) Els camps del diccionari d'informació (Autor, Creador, Paraules clau, Assumpte).",
      },
      {
        q: "Garanteix que el PDF sigui completament segur?",
        a: "No. Aquesta eina elimina elements coneguts i estàndard. No pot garantir la neutralització de vectors d'atac avançats o vulnerabilitats en el visor de PDF. Per a documents d'alta criticitat, utilitza solucions especialitzades.",
      },
      {
        q: "S'altera el contingut visual del document?",
        a: "No. El contingut de les pàgines (text, imatges, vectors) roman intacte. Només s'eliminen els elements de metadades i scripting del catàleg del PDF.",
      },
      {
        q: "Es puja el document a cap servidor?",
        a: "No. Tot el procés de neteja s'executa localment al teu navegador amb pdf-lib. El document no surt del teu dispositiu en cap moment.",
      },
    ],
  },

  "rellenar-formulario-pdf": {
    slug: "emplenar-formulari-pdf",
    name: "Emplenar formulari PDF",
    h1: "Emplenar camps de formulari en un PDF en línia",
    tagline: "Detecta i emplena els camps AcroForm de qualsevol PDF directament al teu navegador.",
    seoTitle: "Emplenar formulari PDF en línia gratis sense Adobe | BreadPDF",
    seoDescription:
      "Emplena camps de text, caselles, desplegables i botons d'opció en PDFs amb AcroForm sense instal·lar res. Exporta el PDF completat a l'instant.",
    ctaLabel: "Obre el formulari",
    keywords: ["emplenar formulari pdf", "completar pdf en línia", "emplenar pdf sense adobe", "formulari pdf interactiu"],
    howItWorks: [
      "Puja el PDF amb camps de formulari AcroForm.",
      "L'eina detecta automàticament tots els camps: text, caselles, desplegables i opcions.",
      "Emplena els camps i exporta el PDF completat llest per signar o enviar.",
    ],
    faq: [
      {
        q: "Quin tipus de formularis PDF són compatibles?",
        a: "Només funciona amb PDFs que contenen camps AcroForm estàndard (l'estàndard PDF natiu). No és compatible amb formularis XFA (tecnologia propietària d'Adobe). Si el PDF no té camps definits, l'eina t'avisarà.",
      },
      {
        q: "Quins tipus de camps es poden emplenar?",
        a: "Suporta camps de text (simples i multilínia), caselles de verificació (checkbox), botons d'opció (radio button) i llistes desplegables (dropdown).",
      },
      {
        q: "El PDF exportat manté els camps editables?",
        a: "Sí. El PDF exportat conserva els camps AcroForm amb els valors que has introduït. No s'aplana el formulari automàticament. Si vols convertir-lo en un PDF no editable, pots usar l'eina Aplanar PDF d'BreadPDF.",
      },
      {
        q: "Es puja el meu formulari a cap servidor extern?",
        a: "No. La detecció de camps es realitza amb pdf.js i el desament de valors amb pdf-lib, tots dos executant-se íntegrament a la memòria del teu navegador.",
      },
    ],
  },

  "marca-de-agua": {
    "slug": "marca-daigua",
    "name": "Marca d'aigua",
    "h1": "Afegir marca d'aigua a un PDF",
    "tagline": "Segella cada pàgina amb text o imatge, rotació i control d'opacitat.",
    "seoTitle": "Afegir marca d'aigua a PDF en línia gratis | BreadPDF",
    "seoDescription": "Afegeix marques d'aigua de text o imatge als teus fitxers PDF amb control total d'angle, posició i transparència, directament al teu navegador.",
    "ctaLabel": "Aplica la marca d'aigua",
    "keywords": [
      "marca d'aigua pdf",
      "watermark pdf",
      "segell pdf"
    ],
    "howItWorks": [
      "Puja el teu fitxer PDF.",
      "Configura el text, angle, mida, opacitat i posició.",
      "Descarrega el teu document protegit."
    ],
    "faq": [
      {
        "q": "Es pot aplicar en mosaic?",
        "a": "Sí, pots activar el mode mosaic per cobrir tota la pàgina repetidament."
      }
    ]
  },

  "numerar-paginas": {
    "slug": "numerar-pagines",
    "name": "Numerar pàgines",
    "h1": "Numerar pàgines d'un PDF",
    "tagline": "Insereix numeració amb format, posició i marges configurables.",
    "seoTitle": "Numerar pàgines PDF en línia gratis | BreadPDF",
    "seoDescription": "Afegeix números de pàgina al teu document PDF, a la capçalera o al peu, personalitzant el format i la tipografia.",
    "ctaLabel": "Numera les pàgines",
    "keywords": [
      "numerar pdf",
      "paginar pdf",
      "numeros de pagina pdf"
    ],
    "howItWorks": [
      "Puja el teu document PDF.",
      "Selecciona el format ({n} de {total}) i la posició.",
      "Descarrega el teu PDF paginat."
    ],
    "faq": [
      {
        "q": "Puc saltar-me la portada?",
        "a": "Sí, activa l'opció 'Excloure primera pàgina' per no numerar la portada."
      }
    ]
  },

  "ocr-pdf": {
    "slug": "ocr-pdf",
    "name": "OCR de PDF",
    "h1": "Reconeixement òptic de caràcters (OCR) en PDF",
    "tagline": "Converteix documents escanejats en fitxers amb text seleccionable i cercable.",
    "seoTitle": "OCR de PDF en línia gratis | Reconeixement de text BreadPDF",
    "seoDescription": "Aplica OCR als teus PDF escanejats o imatges directament al navegador. Genera un PDF cercable o extreu el text en .txt.",
    "ctaLabel": "Inicia l'OCR",
    "keywords": [
      "ocr pdf",
      "reconèixer text pdf",
      "pdf escanejat a text",
      "pdf cercable"
    ],
    "howItWorks": [
      "Puja el teu PDF escanejat.",
      "Tria l'idioma del document (català, castellà, anglès, etc.).",
      "Descarrega el nou PDF amb text seleccionable o l'arxiu .txt."
    ],
    "faq": [
      {
        "q": "Què és l'OCR i per a què serveix en un PDF?",
        "a": "L'OCR (Reconeixement Òptic de Caràcters) analitza les imatges de pàgines escanejades per identificar lletres i paraules, convertint-les en text digital interactiu que pots cercar i copiar."
      },
      {
        "q": "Quins idiomes reconeix el motor d'OCR?",
        "a": "Admet 7 idiomes principals: català, castellà, anglès, francès, alemany, italià i portuguès."
      },
      {
        "q": "Es puja el meu fitxer a cap servidor extern per processar l'OCR?",
        "a": "No. El motor Tesseract s'executa íntegrament de manera local al teu navegador. Els teus documents mai no es transfereixen per internet."
      }
    ],
    "options": {
      "lang": {
        "label": "Idioma del document",
        "choices": {
          "spa": "Castellà",
          "eng": "Anglès",
          "cat": "Català",
          "fra": "Francès",
          "deu": "Alemany",
          "ita": "Italià",
          "por": "Portuguès"
        }
      },
      "mode": {
        "label": "Format de sortida",
        "choices": {
          "pdf": "PDF amb capa de text cercable",
          "txt": "Fitxer de text pla (.txt)"
        }
      }
    }
  },

  "reparar-pdf": {
    "slug": "reparar-pdf",
    "name": "Reparar PDF",
    "h1": "Reparar i recuperar fitxers PDF danyats",
    "tagline": "Recupera documents corruptes reconstruint la seva estructura i taula de referències.",
    "seoTitle": "Reparar PDF en línia gratis | Recuperació de documents BreadPDF",
    "seoDescription": "Repara fitxers PDF que no s'obren, tenen l'estructura trencada o errors de referències. Recupera pàgines de manera 100% privada.",
    "ctaLabel": "Reparar PDF",
    "keywords": [
      "reparar pdf",
      "arreglar pdf",
      "recuperar pdf danyat",
      "reconstruir pdf"
    ],
    "howItWorks": [
      "Puja el PDF danyat o incomplet.",
      "BreadPDF analitza l'estructura binària i rescata totes les pàgines llegibles.",
      "Descarrega el teu document PDF reconstruït i sanejat."
    ],
    "faq": [
      {
        "q": "Quins errors soluciona aquesta eina?",
        "a": "Repara capçaleres truncades, taules de referències creuades (XRef) danyades i objectes desconnectats."
      },
      {
        "q": "És segur per a les meves dades?",
        "a": "Totalment. La reconstrucció estructural ocorre dins de la memòria del teu navegador."
      }
    ]
  },

  "proteger-pdf": {
    "slug": "protegir-pdf",
    "name": "Protegir PDF",
    "h1": "Protegir PDF amb contrasenya i xifratge fort",
    "tagline": "Afegeix una contrasenya d'obertura i xifra el teu document amb seguretat AES d'alta resistència.",
    "seoTitle": "Protegir PDF amb contrasenya en línia gratis | BreadPDF",
    "seoDescription": "Xifra i afegeix contrasenya als teus documents PDF al teu navegador sense pujar-los a internet. Màxima privadesa.",
    "ctaLabel": "Protegir PDF",
    "keywords": [
      "protegir pdf",
      "contrasenya pdf",
      "bloquejar pdf",
      "xifrar pdf"
    ],
    "howItWorks": [
      "Puja el fitxer PDF que vols protegir.",
      "Introdueix la contrasenya d'obertura que sol·licitarà el document.",
      "Descarrega el teu PDF blindat amb xifratge robust."
    ],
    "faq": [
      {
        "q": "Quin tipus de protecció afegeix aquesta eina?",
        "a": "Afegeix una contrasenya d'usuari per a l'obertura del document requerida a qualsevol visor."
      },
      {
        "q": "La contrasenya o el document s'envien a cap servidor?",
        "a": "No. El xifratge s'executa 100% localment al teu navegador mitjançant llibreries criptogràfiques de client."
      }
    ],
    "options": {
      "password": {
        "label": "Contrasenya de protecció",
        "placeholder": "Escriu una contrasenya segura...",
        "help": "Desa la teva clau. Sense ella ningú podrà obrir el fitxer."
      }
    }
  },

  "desbloquear-pdf": {
    "slug": "desbloquejar-pdf",
    "name": "Desbloquejar PDF",
    "h1": "Desbloquejar PDF i treure contrasenya",
    "tagline": "Retira la contrasenya d'un PDF del qual tens la clau per obrir-lo sense restriccions.",
    "seoTitle": "Desbloquejar PDF en línia i treure contrasenya | BreadPDF",
    "seoDescription": "Elimina la contrasenya d'obertura del teu PDF introduint la clau legítima una sola vegada. Descarrega el teu PDF lliure de contrasenyes.",
    "ctaLabel": "Desbloquejar PDF",
    "keywords": [
      "desbloquejar pdf",
      "treure contrasenya pdf",
      "eliminar clau pdf"
    ],
    "howItWorks": [
      "Puja el teu fitxer PDF protegit.",
      "Introdueix la contrasenya actual del document.",
      "Descarrega el nou PDF lliure de contrasenya d'obertura."
    ],
    "faq": [
      {
        "q": "Puc desbloquejar un PDF si he oblidat la contrasenya?",
        "a": "No. Requereix la contrasenya legítima per desxifrar el document i retirar la protecció permanentment."
      }
    ],
    "options": {
      "password": {
        "label": "Contrasenya actual",
        "placeholder": "Introdueix la contrasenya del document...",
        "help": "És necessària per desxifrar les dades al teu navegador."
      }
    }
  },

  "firmar-pdf": {
    "slug": "signar-pdf",
    "name": "Signar PDF",
    "h1": "Signar PDF en línia gratis i a mà alçada",
    "tagline": "Dibuixa o puja la teva signatura electrònica i estampa-la a qualsevol pàgina del teu document.",
    "seoTitle": "Signar PDF en línia gratis | Signatura digital BreadPDF",
    "seoDescription": "Afegeix la teva rúbrica o signatura gràfica al teu document PDF directament al navegador. 100% privat i sense servidors.",
    "ctaLabel": "Signar i descarregar PDF",
    "keywords": [
      "signar pdf",
      "signatura digital pdf",
      "signar document"
    ],
    "howItWorks": [
      "Puja el PDF que necessites signar.",
      "Dibuixa la teva signatura al llenç interactiu o puja una imatge de la teva rúbrica.",
      "Col·loca la signatura a la posició i pàgina desitjades i descarrega el PDF signat."
    ],
    "faq": [
      {
        "q": "La meva signatura s'emmagatzema als vostres servidors?",
        "a": "No. El procés de signatura es realitza 100% al teu navegador."
      }
    ]
  },

  "pdf-a-excel": {
    "slug": "pdf-a-excel",
    "name": "PDF a Excel",
    "h1": "Convertir PDF a Excel i CSV en línia gratis",
    "tagline": "Extreu taules i dades estructurades del teu PDF a fulls de càlcul XLSX o CSV.",
    "seoTitle": "Convertir PDF a Excel en línia gratis | XLSX i CSV a BreadPDF",
    "seoDescription": "Converteix taules i dades dels teus fitxers PDF a fulls de càlcul Excel (.xlsx) o CSV de forma ràpida i sense servidors.",
    "ctaLabel": "Convertir a Excel",
    "keywords": [
      "pdf a excel",
      "convertir pdf a xlsx",
      "extreure taules pdf",
      "pdf a csv"
    ],
    "howItWorks": [
      "Selecciona el document PDF amb taules o dades.",
      "Tria el format de sortida: Llibre Excel (.xlsx) o fitxer separat per comes (.csv).",
      "Descarrega el teu full de càlcul a punt per editar."
    ],
    "faq": [
      {
        "q": "Es conserven les columnes i files de les taules?",
        "a": "Sí. BreadPDF agrupa els textos segons les seves coordenades per respectar la graella original."
      }
    ],
    "options": {
      "format": {
        "label": "Format de full de càlcul",
        "choices": {
          "xlsx": "Excel (.xlsx) — Recomanat amb múltiples pestanyes",
          "csv": "CSV (.csv) — Text pla delimitat"
        }
      }
    }
  },

  "comparar-pdf": {
    "slug": "comparar-pdf",
    "name": "Comparar PDF",
    "h1": "Comparar dos documents PDF en línia i veure diferències",
    "tagline": "Inspecciona canvis visuals i discrepàncies de text entre dues versions d'un fitxer PDF.",
    "seoTitle": "Comparar dos PDF en línia i veure diferències | BreadPDF",
    "seoDescription": "Compara dues versions d'un document PDF en paral·lel o amb cortineta lliscant interactiva. Detecta canvis al navegador.",
    "ctaLabel": "Comparar documents",
    "keywords": [
      "comparar pdf",
      "diferencies pdf",
      "visualitzador de diferencies",
      "diff pdf"
    ],
    "howItWorks": [
      "Puja el document original (Versió A) i el document modificat (Versió B).",
      "Navega pàgina per pàgina per veure les discrepàncies de text.",
      "Alterna entre vista en paral·lel o cortineta interactiva lliscant."
    ],
    "faq": [
      {
        "q": "Quin tipus de diferències detecta el comparador?",
        "a": "Realitza una comparació visual d'alta fidelitat i una anàlisi automàtica del flux de text."
      }
    ]
  },

  "resumir-pdf": {
    "slug": "resumir-pdf",
    "name": "Resumir PDF",
    "h1": "Resumir PDF i extreure punts clau",
    "tagline": "Genera resums executius i punts clau de documents llargs directament al teu navegador.",
    "seoTitle": "Resumir PDF en línia i extreure punts clau | BreadPDF",
    "seoDescription": "Extreu els punts clau i oracions més rellevants de qualsevol PDF sense enviar el document al núvol ni subscripcions.",
    "ctaLabel": "Generar resum",
    "keywords": [
      "resumir pdf",
      "resum pdf",
      "idees clau pdf",
      "sintetitzar pdf"
    ],
    "howItWorks": [
      "Puja el document PDF que vols resumir.",
      "Selecciona l'extensió del resum (breu, executiu o punts clau amb vinyetes).",
      "Descarrega la teva síntesi en text net."
    ],
    "faq": [
      {
        "q": "És privat el resum?",
        "a": "Sí. L'algorisme corre 100% al teu navegador."
      }
    ],
    "options": {
      "length": {
        "label": "Format del resum",
        "choices": {
          "bullets": "Punts clau destacats (Vinyetes)",
          "short": "Resum breu (3 idees clau)",
          "medium": "Resum executiu (5 idees clau)"
        }
      }
    }
  },

  "extraer-datos": {
    "slug": "extreure-dades",
    "name": "Extreure dades",
    "h1": "Extreure dades estructurades de PDF",
    "tagline": "Detecta i extreu correus, telèfons, dates i imports monetaris automàticament.",
    "seoTitle": "Extreure dades de PDF en línia gratis | JSON i CSV a BreadPDF",
    "seoDescription": "Extreu informació estructurada com emails, imports, dates i telèfons directament en format JSON o CSV.",
    "ctaLabel": "Extreure camps",
    "keywords": [
      "extreure dades pdf",
      "extreure factures pdf",
      "dades estructurades pdf",
      "pdf a json"
    ],
    "howItWorks": [
      "Puja el document PDF, factura o formulari.",
      "Tria el format de sortida: JSON o CSV.",
      "Descarrega les dades estructurades a punt per importar."
    ],
    "faq": [
      {
        "q": "Quines dades reconeix automàticament?",
        "a": "Adreces d'email, números de telèfon, dates i quantitats monetàries."
      }
    ],
    "options": {
      "format": {
        "label": "Format d'exportació",
        "choices": {
          "json": "JSON estructurat (Recomanat per a desenvolupadors)",
          "csv": "CSV delimitat (Recomanat per a fulls de càlcul)"
        }
      }
    }
  },

  "pdf-a-powerpoint": {
    "slug": "pdf-a-powerpoint",
    "name": "PDF a PowerPoint",
    "h1": "Convertir PDF a diapositives PowerPoint",
    "tagline": "Converteix cada pàgina del teu PDF en una diapositiva .pptx en format panoràmic 16:9.",
    "seoTitle": "Convertir PDF a PowerPoint (.pptx) en línia gratis | BreadPDF",
    "seoDescription": "Transforma presentacions en PDF en fitxers PowerPoint (.pptx) a punt per projectar i editar a PowerPoint o Google Slides.",
    "ctaLabel": "Convertir a PowerPoint",
    "keywords": [
      "pdf a powerpoint",
      "pdf a pptx",
      "convertir diapositives pdf"
    ],
    "howItWorks": [
      "Puja el teu fitxer PDF.",
      "El motor genera diapositives vectorials panoràmiques d'alta definició.",
      "Descarrega el fitxer .pptx a punt per projectar."
    ],
    "faq": [
      {
        "q": "És compatible amb PowerPoint i Google Slides?",
        "a": "Sí. Genera fitxers estàndard .pptx d'Office Open XML amb total compatibilitat."
      }
    ]
  },

  "qr-pdf": {
    "slug": "qr-pdf",
    "name": "Generar QR a PDF",
    "h1": "Crear codi QR per a un PDF en línia",
    "tagline": "Genera codis QR estàtics d'alta resolució i descarrega'ls maquetats en PDF a punt per imprimir.",
    "seoTitle": "Crear codi QR per a un PDF en línia | BreadPDF",
    "seoDescription": "Genera codis QR estàtics per a enllaços, menús o text i descarrega'ls en un full PDF A4 llest per imprimir o en PNG transparent.",
    "ctaLabel": "Generar Codi QR",
    "keywords": [
      "qr a pdf",
      "generar codi qr pdf",
      "crear qr imprimir",
      "codi qr estatic"
    ],
    "howItWorks": [
      "Escriu l'URL, text o enllaç que vols codificar.",
      "Assigna un títol opcional per al full imprès.",
      "Descarrega el teu PDF maquetat en A4 juntament amb el PNG del QR."
    ],
    "faq": [
      {
        "q": "El codi QR caduca o requereix subscripció?",
        "a": "No. En ser un codi QR estàtic sense intermediaris, mai no caduca i funcionarà de forma permanent i gratuïta."
      }
    ],
    "options": {
      "text": {
        "label": "Enllaç o contingut del QR",
        "placeholder": "https://la-teva-web.cat o text..."
      },
      "title": {
        "label": "Títol al full PDF",
        "placeholder": "Ex. Menú del restaurant, Xarxa Wifi..."
      }
    }
  },

  "censurar-pdf": {
    "slug": "censurar-pdf",
    "name": "Censurar PDF",
    "h1": "Censurar PDF i tapar dades confidencials",
    "tagline": "Oculta visualment textos, noms, DNI o xifres confidencials amb blocs opacs permanents.",
    "seoTitle": "Censurar PDF en línia i tapar dades confidencials | BreadPDF",
    "seoDescription": "Tapa informació sensible al teu PDF amb blocs opacs negres o blancs. Processament 100% privat al teu navegador.",
    "ctaLabel": "Censurar document",
    "keywords": [
      "censurar pdf",
      "redact pdf",
      "ocultar dades pdf",
      "tapar dades pdf"
    ],
    "howItWorks": [
      "Puja el document PDF que conté dades confidencials.",
      "Introdueix les paraules, DNI, noms o xifres a ocultar separades per comes.",
      "Descarrega el teu PDF amb els blocs de censura superposats."
    ],
    "faq": [
      {
        "q": "Puc triar el color dels blocs de censura?",
        "a": "Sí. Pots seleccionar 'Bloc Negre', el format clàssic de censura oficial, o 'Bloc Blanc' per a un esborrat discret."
      }
    ],
    "options": {
      "terms": {
        "label": "Paraules, noms o números a censurar (separats per coma)",
        "placeholder": "Ex. 12345678Z, confidencial, Garcia"
      },
      "color": {
        "label": "Color del bloc de censura",
        "choices": {
          "black": "Bloc Negre (Clàssic de censura oficial)",
          "white": "Bloc Blanc (Esborrat discret)"
        }
      }
    }
  },

  "recortar-pdf": {
    "slug": "retallar-pdf",
    "name": "Retallar PDF",
    "h1": "Retallar marges de pàgines PDF",
    "tagline": "Elimina els marges en blanc sobrants i ajusta l'enquadrament de totes les pàgines.",
    "seoTitle": "Retallar PDF en línia gratis | Ajustar marges BreadPDF",
    "seoDescription": "Retalla marges buits i ajusta la caixa de visualització dels teus documents PDF de forma precisa i 100% al navegador.",
    "ctaLabel": "Retallar PDF",
    "keywords": [
      "retallar pdf",
      "crop pdf",
      "ajustar marges pdf",
      "treure vores blanques pdf"
    ],
    "howItWorks": [
      "Puja el PDF que vols retallar.",
      "Selecciona els mil·límetres de marge que vols retirar de les vores.",
      "Descarrega el PDF enquadrat i net."
    ],
    "faq": [
      {
        "q": "Es redueix la mida de lletra?",
        "a": "No. El contingut conserva la seva escala vectorial original, només es retalla l'espai en blanc perimetral."
      }
    ],
    "options": {
      "margin": {
        "label": "Marge a retallar a les vores"
      }
    }
  },

  "pdf-a-markdown": {
    "slug": "pdf-a-markdown",
    "name": "PDF a Markdown",
    "h1": "Convertir PDF a Markdown (.md)",
    "tagline": "Transforma els teus documents en Markdown net estructurat per a ChatGPT, Claude i Notion.",
    "seoTitle": "Convertir PDF a Markdown en línia gratis (.md) | BreadPDF",
    "seoDescription": "Converteix PDFs en fitxers Markdown estructurats amb encapçalaments, llistes i paràgrafs nets, a punt per a IA o Obsidian.",
    "ctaLabel": "Convertir a Markdown",
    "keywords": [
      "pdf a markdown",
      "pdf a md",
      "convertir pdf obsidian",
      "pdf per a chatgpt"
    ],
    "howItWorks": [
      "Puja el fitxer PDF.",
      "L'analitzador detecta jerarquies de text, títols i llistes.",
      "Descarrega el teu fitxer .md llest per utilitzar."
    ],
    "faq": [
      {
        "q": "És ideal per alimentar prompts d'IA?",
        "a": "Sí. Markdown és el format òptim perquè els models comprenguin l'estructura sense caràcters brossa."
      }
    ]
  },

  "pdf-a-pdfa": {
    "slug": "pdf-a-pdfa",
    "name": "PDF a PDF/A",
    "h1": "Convertir PDF a PDF/A per a arxiu a llarg termini",
    "tagline": "Estandarditza el teu PDF sota la norma ISO 19005-1 per a tràmits legals i administracions públiques.",
    "seoTitle": "Convertir PDF a PDF/A en línia gratis | Norma ISO BreadPDF",
    "seoDescription": "Transforma els teus documents al format PDF/A estàndard de conservació a llarg termini, requerit per administracions públiques i jutjats.",
    "ctaLabel": "Convertir a PDF/A",
    "keywords": [
      "pdf a pdfa",
      "convertir pdf/a",
      "pdf hisenda",
      "iso 19005-1"
    ],
    "howItWorks": [
      "Puja el fitxer PDF que necessites presentar o arxivar.",
      "El motor injecta metadades ISO i neutralitza dependències dinàmiques.",
      "Descarrega el teu PDF/A certificat."
    ],
    "faq": [
      {
        "q": "És vàlid per a l'Agència Tributària i seus electròniques?",
        "a": "Sí. Compleix amb els requeriments de format tancat i metadades exigits a les administracions públiques."
      }
    ]
  },

  "excel-a-pdf": {
    "slug": "excel-a-pdf",
    "name": "Excel a PDF",
    "h1": "Convertir Excel a PDF en línia gratis",
    "tagline": "Converteix fulls de càlcul XLSX i XLS a taules PDF apaïsades a punt per imprimir.",
    "seoTitle": "Convertir Excel a PDF en línia gratis | BreadPDF",
    "seoDescription": "Transforma els teus fitxers d'Excel (.xlsx, .xls) a documents PDF maquetats i ordenats amb total privadesa al navegador.",
    "ctaLabel": "Convertir a PDF",
    "keywords": [
      "excel a pdf",
      "convertir xlsx a pdf",
      "full de calcul a pdf"
    ],
    "howItWorks": [
      "Puja el teu llibre d'Excel (.xlsx o .xls).",
      "El motor processa cada pestanya i ajusta les taules en format apaïsat A4.",
      "Descarrega el teu document PDF maquetat i llest per imprimir o compartir."
    ],
    "faq": [
      {
        "q": "Es conserven les diferents pestanyes de l'Excel?",
        "a": "Sí. Cada pestanya es renderitza amb el seu títol i estructura tabular corresponents."
      }
    ]
  },

};


const enTools: Record<string, ToolText> = {
  "comprimir-pdf": {
    slug: "compress-pdf",
    name: "Compress PDF",
    h1: "Compress a PDF and reduce its size",
    tagline: "Shrink your PDF by choosing the exact balance between size and quality.",
    seoTitle: "Compress PDF online free and reduce size | BreadPDF",
    seoDescription:
      "Reduce PDF file size directly in your browser with four compression modes and size comparison. Fast, private, and no files uploaded to servers.",
    ctaLabel: "Compress PDF",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf"],
    howItWorks: [
      "Pick the PDF you want to shrink.",
      "Choose a level: lossless, light, balanced or maximum.",
      "Compare the before and after size and download the result.",
    ],
    faq: [
      {
        q: "Does compressing a PDF degrade visual quality?",
        a: "It depends on the chosen mode. In 'Lossless' mode, nothing is recompressed: internal PDF structures are streamlined while text and vectors remain untouched. In Light, Balanced, and Strong modes, pages are rendered as images with optimized resolution to achieve substantial file size reduction.",
      },
      {
        q: "What is the difference between the four compression levels?",
        a: "'Lossless' preserves selectable text and the native structure; 'Light' provides modest size reduction with maximum visual fidelity; 'Balanced' is the recommended setting for general email sharing; and 'Strong' achieves the smallest possible size for platforms with strict upload limits.",
      },
      {
        q: "What happens if the compressed file ends up larger than the original?",
        a: "BreadPDF incorporates an automatic safeguard: if image-based compression would yield a larger file (common with pure text PDFs), the system discards the increase and applies structural lossless optimization to ensure your file never gains weight.",
      },
      {
        q: "Can I check how much file size was saved before downloading?",
        a: "Yes. Once processing finishes, BreadPDF displays the original size, the final generated size, and the exact percentage of space saved so you can review the result before saving.",
      },
      {
        q: "Can text still be selected and copied after balanced or strong compression?",
        a: "In Light, Balanced, and Strong modes, pages are processed as optimized images, which flattens selectable text. If you need text to remain copyable or searchable with Ctrl+F, always select 'Lossless' mode.",
      },
      {
        q: "Are my files uploaded to an external server?",
        a: "No. All PDF compression and page processing runs locally in your browser memory via WebAssembly and JavaScript. Confidential documents never leave your computer or phone.",
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
    seoTitle: "Merge PDF online, in your own order | BreadPDF",
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
        q: "How many files can I merge at once?",
        a: "There is no artificial limit in the tool. Merging runs entirely inside your device's browser memory, so you can join two or dozens of documents as long as your system has sufficient RAM available.",
      },
      {
        q: "How do I control the order of the merged documents?",
        a: "In the file list you can drag or use the arrows to arrange documents in your exact preferred sequence before clicking 'Merge PDF'. The final document strictly follows that order from top to bottom.",
      },
      {
        q: "Are links, hyperlinks, and selectable text preserved?",
        a: "Yes. Pages are imported vectorially with their native objects, embedded fonts, and layer structures intact, keeping text sharp, selectable, and high-fidelity without forced degradation.",
      },
      {
        q: "Can I merge PDF files with different page sizes (A4, Letter, Landscape)?",
        a: "Yes. Each added page retains its original dimensions and orientation (portrait or landscape) within the combined final document.",
      },
      {
        q: "What filename will the downloaded merged PDF have?",
        a: "By default, the unified file is named 'breadpdf-documento-unido.pdf', ready to be saved in your downloads folder or renamed on your machine.",
      },
      {
        q: "Are my documents uploaded to an external server?",
        a: "No. Merging runs 100% locally in your browser using WebAssembly and JavaScript. Files are never transmitted over the internet nor stored in the cloud.",
      },
    ],
  },
  "dividir-pdf": {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Split a PDF into several documents",
    tagline: "Split page by page or by custom page ranges you define.",
    seoTitle: "Split PDF online by pages or ranges | BreadPDF",
    seoDescription:
      "Split a PDF into separate documents: one page per file or custom ranges like 1-3, 4-8. Everything runs in your browser with no sign-up.",
    ctaLabel: "Split PDF",
    keywords: ["split pdf", "separate pdf", "cut pdf"],
    howItWorks: [
      "Upload the PDF you want to split.",
      "Choose to extract every page or enter custom ranges.",
      "Download the generated documents.",
    ],
    faq: [
      {
        q: "How do I specify page intervals or custom ranges?",
        a: "In custom ranges mode, type page numbers or ranges separated by commas (for example: '1-3, 4, 5-9'). Each interval creates a distinct PDF document containing those exact pages.",
      },
      {
        q: "Can I split the PDF into one separate file for each page?",
        a: "Yes. Select 'One page per file' in the mode selector. If your PDF has 10 pages, you will receive 10 individual, sequentially numbered PDF files.",
      },
      {
        q: "How are the split PDF files named?",
        a: "Each downloaded file takes the original document's base name and appends the page number or range (for example: 'document-pagina-1.pdf' or 'document-1-3.pdf').",
      },
      {
        q: "Is my original uploaded PDF file modified or replaced?",
        a: "Not at all. Your original file remains untouched on your device; the tool only creates and saves new copies of the designated pages.",
      },
      {
        q: "Is visual quality or text selectability lost when splitting?",
        a: "No. Splitting directly copies the native vector content and streams from each page, preserving fonts, images, text, and vector graphics at 100% original fidelity.",
      },
      {
        q: "Are my documents sent to remote servers for splitting?",
        a: "No. The entire page separation and packaging process takes place locally and privately inside your browser. No file data is uploaded to remote servers.",
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
    seoTitle: "Convert PDF to JPG with adjustable quality | BreadPDF",
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
        q: "How do I convert a PDF into JPG images?",
        a: "Select your PDF file, choose your preferred resolution scale and JPG quality sliders if desired, then click 'Convert to JPG'. Each page will render and produce an individual downloadable image.",
      },
      {
        q: "Are all pages of the document converted?",
        a: "Yes. The converter automatically iterates through every page of the PDF from start to finish, generating a numbered JPG file for each one.",
      },
      {
        q: "What do the resolution and quality settings adjust?",
        a: "'Resolution' applies a rendering multiplier to page dimensions (from 1x up to 4x for extreme sharpness), while 'JPG quality' adjusts image compression (40% to 100%) to balance crispness with compact file size.",
      },
      {
        q: "What happens to the PDF text, fonts, and graphics?",
        a: "The rendering engine draws every visible element exactly as laid out, consolidating vector text, illustrations, and photos into a high-definition JPG image.",
      },
      {
        q: "Can I download converted pages individually?",
        a: "Yes. Each converted page outputs its own file bearing the original PDF name plus the page number (for example: 'document-01.jpg', 'document-02.jpg').",
      },
      {
        q: "Are my files uploaded to external servers during conversion?",
        a: "No. The entire image rendering process is executed 100% locally in your web browser engine. Your document contents are never transmitted across the network.",
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
    seoTitle: "Convert JPG to PDF online in A4 or custom fit | BreadPDF",
    seoDescription:
      "Convert JPG or PNG images into a single PDF document, choosing A4 with margins or fit to photo. Reorder images directly in your browser.",
    ctaLabel: "Create PDF",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf"],
    howItWorks: [
      "Add your JPG or PNG images.",
      "Reorder them and pick the page size.",
      "Download the resulting PDF.",
    ],
    faq: [
      {
        q: "Can I add multiple images at once?",
        a: "Yes. You can select and upload as many images as you need in a single batch to combine them into one comprehensive PDF document.",
      },
      {
        q: "Can I mix JPG and PNG image formats together?",
        a: "Yes. The tool natively supports both JPEG/JPG and PNG files, allowing you to combine different image types freely into the same resulting PDF.",
      },
      {
        q: "How do I organize the order of photos in the PDF?",
        a: "In the preview list, drag or use the arrow controls to arrange photos in your desired sequence. The topmost image will become page 1 of your PDF.",
      },
      {
        q: "What is the difference between 'A4 with margins' and 'Fit to image'?",
        a: "'A4 with margins' proportionally scales each photo onto a standard A4 page with a clean border, ideal for printing. 'Fit to image' sets each page dimensions to the exact pixel size of the image.",
      },
      {
        q: "Can I convert images with different sizes or aspect ratios?",
        a: "Yes. When choosing A4, each image fits proportionally without distortion. In 'Fit to image' mode, each individual page adopts the respective dimensions of each photo.",
      },
      {
        q: "Are my photos uploaded to the cloud or external servers?",
        a: "No. All image embedding and PDF generation runs 100% client-side in your browser via WebAssembly. Private photos never leave your device.",
      },
    ],
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
    seoTitle: "Rotate PDF online and save the rotation | BreadPDF",
    seoDescription:
      "Rotate PDF pages by 90, 180 or 270 degrees, across the whole document or on specific pages, and save the result permanently.",
    ctaLabel: "Rotate PDF",
    keywords: ["rotate pdf", "turn pdf pages", "flip pdf"],
    howItWorks: [
      "Upload the PDF.",
      "Choose the rotation and the pages.",
      "Download the rotated PDF.",
    ],
    faq: [
      {
        q: "Is the rotation saved permanently in the file?",
        a: "Yes. The rotation angle is written directly into the PDF page dictionary metadata. When opened in Adobe Acrobat, a browser, or any viewer, it appears permanently rotated.",
      },
      {
        q: "Can I rotate only specific pages or ranges?",
        a: "Yes. In the 'Pages' field you can list individual page numbers or ranges separated by commas (for example: '1, 3-5'). Leaving it empty rotates all pages in the PDF.",
      },
      {
        q: "Which rotation angles are supported?",
        a: "You can rotate pages 90° clockwise, 180° (for upside-down pages), or 90° counter-clockwise (270°).",
      },
      {
        q: "Does rotating modify or recompress document content?",
        a: "No. Rotation only changes the geometric orientation flag of the selected pages. Text, embedded fonts, vectors, and photos remain at their exact original quality.",
      },
      {
        q: "What will the downloaded rotated file be named?",
        a: "The file downloads automatically keeping the original name with a '-rotado.pdf' suffix so you don't accidentally overwrite your source file.",
      },
      {
        q: "Does rotation happen locally in my browser?",
        a: "Yes. All processing executes 100% client-side on your device using WebAssembly. Your file is never uploaded to remote servers.",
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
    seoTitle: "Extract pages from PDF to a new file | BreadPDF",
    seoDescription:
      "Select and extract specific pages or ranges from a PDF into a new standalone document, keeping the original intact.",
    ctaLabel: "Extract pages",
    keywords: ["extract pdf pages", "separate pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to keep.", "Download the new document."],
    faq: [
      {
        q: "How do I specify which pages to extract?",
        a: "In the 'Pages to extract' field, enter page numbers separated by commas or ranges with hyphens (for example: '1, 4-6, 10'). Only the pages you specify will be compiled into the new document.",
      },
      {
        q: "In what order do extracted pages appear in the new PDF?",
        a: "The processor collects your selected pages and organizes them in natural ascending order to preserve the chronological reading flow of the original document.",
      },
      {
        q: "What is the difference between extracting pages and splitting a PDF?",
        a: "'Extract pages' produces a single new PDF document containing only your chosen pages. 'Split PDF', on the other hand, divides the file into multiple individual documents.",
      },
      {
        q: "Is the original PDF altered or does it lose pages?",
        a: "No. Your original file on your computer or phone remains unchanged. The tool creates and downloads a brand new PDF without overwriting the source.",
      },
      {
        q: "Are visual quality, fonts, and graphics preserved?",
        a: "Yes. Selected pages are copied natively at the vector level with all fonts, graphics, and text intact, without recompression or loss of quality.",
      },
      {
        q: "Is the file processed privately inside my browser?",
        a: "Yes. Extraction happens entirely inside your browser via WebAssembly. No files or personal data are ever uploaded to external servers.",
      },
    ],
    options: { pages: { label: "Pages to extract", help: "Example: 1, 4-6, 10" } },
  },
  "eliminar-paginas-pdf": {
    slug: "delete-pdf-pages",
    name: "Delete pages",
    h1: "Delete pages from a PDF",
    tagline: "Remove the pages you don't need and keep the rest untouched.",
    seoTitle: "Delete pages from PDF and save online | BreadPDF",
    seoDescription:
      "Delete unwanted pages from a PDF and download a clean document with re-indexed pages, without installing software or uploading files.",
    ctaLabel: "Delete pages",
    keywords: ["delete pdf pages", "remove pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to delete.", "Download the result."],
    faq: [
      {
        q: "Can I delete every page from a PDF?",
        a: "No. A valid PDF file must retain at least one page. If you attempt to delete all pages, the tool will ask you to adjust your selection.",
      },
      {
        q: "How do I indicate which pages to remove?",
        a: "In the 'Pages to delete' field, enter page numbers or ranges separated by commas (for example: '2, 7-9'). Those specific pages will be removed and the rest retained.",
      },
      {
        q: "What happens to the page numbering of remaining pages?",
        a: "The resulting document automatically re-indexes starting sequentially from page 1, ensuring a clean and continuous reading experience without blank gaps.",
      },
      {
        q: "Does deleting pages reduce the PDF file size?",
        a: "Yes. Removing full pages strips their dedicated graphics, fonts, and contents from the final file, resulting in a lighter overall PDF.",
      },
      {
        q: "Is my original source file affected?",
        a: "No. Your file on your device remains unaltered. The tool downloads a new document with the '-sin-paginas.pdf' suffix without overwriting your original.",
      },
      {
        q: "Are pages deleted privately in my browser?",
        a: "Yes. Page removal and PDF assembly takes place entirely in your browser's local memory without uploading files to any external server.",
      },
    ],
    options: { pages: { label: "Pages to delete", help: "Example: 2, 7-9" } },
  },
  "extraer-texto-pdf": {
    slug: "extract-pdf-text",
    name: "Extract text",
    h1: "Extract the text from a PDF",
    tagline: "Get all the document text as a plain text file.",
    seoTitle: "Extract text from PDF to TXT online | BreadPDF",
    seoDescription:
      "Copy and extract clean plain text from a PDF into a formatted .txt file page by page. 100% private in your browser.",
    ctaLabel: "Extract text",
    keywords: ["extract pdf text", "pdf to txt", "copy pdf text"],
    howItWorks: ["Upload the PDF.", "BreadPDF walks through the pages.", "Download the text file."],
    faq: [
      {
        q: "What format is the extracted text downloaded in?",
        a: "Text is saved as a clean plain text file with a .txt extension (UTF-8 encoding), universally compatible with any text editor like Notepad, Word, or TextEdit.",
      },
      {
        q: "Is page separation maintained in the text file?",
        a: "Yes. Each page of the PDF is marked in the output text with a clear header (for example: '--- Página 1 ---') defining the content of each page.",
      },
      {
        q: "Does it work with scanned PDFs or image-only documents?",
        a: "This tool extracts native digital text embedded in the PDF. For scanned documents or photos where text is part of an image, optical character recognition (OCR) is required.",
      },
      {
        q: "Are tables, bold fonts, or images included in the text file?",
        a: "No. The .txt file extracts clean alphanumeric characters and words in plain text. It does not carry images, font styles, or layout formatting.",
      },
      {
        q: "Can I extract text from a password-protected PDF?",
        a: "If the document requires a password to open, unlock it first using BreadPDF's unlock tool so the reader engine can access its text content.",
      },
      {
        q: "Is my document analyzed privately and securely?",
        a: "Yes. Text parsing and extraction runs entirely in your browser memory via pdf.js. Your document never leaves your machine or touches external servers.",
      },
    ],
  },
  "pdf-a-webp": {
    slug: "pdf-to-webp",
    name: "PDF to WebP",
    h1: "Convert PDF to WebP images",
    tagline: "Convert PDF pages to modern WebP format, sharp and up to 70% lighter.",
    seoTitle: "Convert PDF to WebP online free | BreadPDF",
    seoDescription:
      "Transform every page of your PDF into next-generation WebP images. High visual quality, superior compression, and 100% processed in your browser.",
    ctaLabel: "Convert to WebP",
    keywords: ["pdf to webp", "convert pdf webp", "extract webp from pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Select rendering resolution.",
      "Download converted pages in ultralight WebP format.",
    ],
    faq: [
      {
        q: "What advantages does WebP offer over JPG or PNG?",
        a: "WebP is a modern image format designed for the web that delivers up to 70% better compression than JPG while preserving impeccable photographic sharpness, making it ideal for fast websites and digital presentations.",
      },
      {
        q: "Are all pages of the PDF converted to WebP?",
        a: "Yes. Each document page is rendered individually and outputs a standalone .webp image file ready for download.",
      },
      {
        q: "What resolution do the generated WebP images have?",
        a: "You can adjust the rendering scale between 1x (standard screen resolution) and up to 4x for ultra-sharp images with crisp text and graphic details.",
      },
      {
        q: "Are WebP images supported by modern browsers and systems?",
        a: "Yes. WebP is universally supported across all modern browsers (Chrome, Safari, Edge, Firefox) and major operating systems including Windows, macOS, Android, and iOS.",
      },
      {
        q: "How are the downloaded WebP images named?",
        a: "Each downloaded image uses your original PDF file name followed by '-pagina-X.webp' for easy sorting and archiving.",
      },
      {
        q: "Is my PDF uploaded to an external server for WebP conversion?",
        a: "No. Conversion happens entirely client-side inside your web browser engine. Your files never leave your computer or mobile device.",
      },
    ],
    options: {
      scale: { label: "Resolution", help: "Multiplier over original page size." },
    },
  },
  "pdf-a-word": {
    slug: "pdf-to-word",
    name: "PDF to Word",
    h1: "Convert PDF to editable Word",
    tagline: "Extract text content and basic structure from your PDF to an editable .docx file in your browser.",
    seoTitle: "Convert PDF to Word (.docx) editable online | BreadPDF",
    seoDescription:
      "Convert text and paragraphs from a PDF into an editable Word (.docx) document in your browser. 100% private and sign-up free.",
    ctaLabel: "Convert to Word",
    keywords: ["pdf to word", "pdf to docx", "editable pdf conversion", "turn pdf to word"],
    howItWorks: [
      "Upload the PDF document you want to convert.",
      "The in-memory engine extracts text by grouping lines and paragraphs.",
      "Download your editable .docx file instantly.",
    ],
    faq: [
      {
        q: "Can I edit the generated file in Microsoft Word or Google Docs?",
        a: "Yes. The tool outputs a standard .docx document fully compatible with Microsoft Word, LibreOffice Writer, and Google Docs.",
      },
      {
        q: "What types of documents work best with this conversion?",
        a: "It works best with continuous text documents such as reports, contracts, essays, and letters. In these documents, paragraphs flow cleanly for straightforward word processing.",
      },
      {
        q: "What are its limitations compared to professional desktop software?",
        a: "Because it runs entirely inside the browser without a proprietary typesetting server, documents with complex multi-column newspaper layouts, borderless nested tables, or floating text boxes will be linearized and may require manual formatting adjustments.",
      },
      {
        q: "Are exact fonts and embedded images preserved?",
        a: "Text is exported using clean, universal standard typography. Complex decorative graphics are omitted in this beta version to prioritize speed, privacy, and text fidelity.",
      },
      {
        q: "Does it work with scanned PDFs or image-only files?",
        a: "Not directly. For scanned documents where text is not selectable, you should first process the file with BreadPDF's 'PDF OCR' tool to recognize characters before converting them to Word.",
      },
      {
        q: "Are my documents uploaded to external servers?",
        a: "No. All text parsing and .docx file generation takes place 100% locally in your browser memory using client-side JavaScript. Your files never leave your machine.",
      },
    ],
  },
  "word-a-pdf": {
    slug: "word-to-pdf",
    name: "Word to PDF",
    h1: "Convert Word to PDF",
    tagline: "Turn .docx files into standard PDF documents ready to share or print.",
    seoTitle: "Convert Word to PDF online in your browser | BreadPDF",
    seoDescription:
      "Convert Word documents (.docx) to PDF while preserving paragraphs, headings, and clean structure. 100% private in your browser.",
    ctaLabel: "Convert to PDF",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "turn docx to pdf"],
    howItWorks: [
      "Upload your Word file (.docx or .doc).",
      "The local processor interprets the content and lays it out in A4 format.",
      "Download your final PDF document immediately.",
    ],
    faq: [
      {
        q: "Which Word versions are supported?",
        a: "It supports modern .docx files (Word 2007 and newer). For older legacy binary (.doc) files, we recommend saving them as .docx first for optimal compatibility.",
      },
      {
        q: "Which document elements are transferred into the PDF?",
        a: "The engine extracts complete text, headings, paragraph breaks, and lists, laying them out on standard A4 pages with consistent margins and clean typography.",
      },
      {
        q: "Will the layout look identical to Microsoft Word?",
        a: "The client-side engine prioritizes textual integrity and readability. Elaborate graphical layouts, custom multi-level headers, or proprietary fonts are rendered using universal standard typefaces to guarantee cross-device compatibility.",
      },
      {
        q: "What page dimensions and margins does the generated PDF use?",
        a: "By default, it produces standard vertical A4 pages with 50-point margins and automatic line wrapping to prevent text clipping.",
      },
      {
        q: "Is my Word file uploaded to any server for conversion?",
        a: "No. File parsing and PDF compilation occur 100% locally in your browser via WebAssembly and client libraries. No text is ever transmitted over the network.",
      },
    ],
  },
  "reordenar-paginas-pdf": {
    slug: "reorder-pdf-pages",
    name: "Reorder PDF Pages",
    h1: "Reorder PDF pages visually",
    tagline: "Rearrange the order of PDF pages by dragging and dropping them easily.",
    seoTitle: "Reorder PDF Pages Online Free | BreadPDF",
    seoDescription:
      "Change the page order of your PDF document visually with live page thumbnails. Drag pages into your preferred sequence and download instantly.",
    ctaLabel: "Save New Order",
    keywords: ["reorder pdf pages", "rearrange pdf pages", "move pdf pages"],
    howItWorks: [
      "Upload your PDF file.",
      "Drag and drop the page thumbnails to put them in your exact desired order.",
      "Click 'Save New Order' and download your reorganized document.",
    ],
    faq: [
      {
        q: "How do I change the page order?",
        a: "When you upload a document, an interactive thumbnail grid displays all pages. Simply click and drag any page to its new position.",
      },
      {
        q: "Does reordering degrade visual quality or remove selectable text?",
        a: "No. Reordering runs natively at the vector level, preserving embedded fonts, vector artwork, and sharpness without modification.",
      },
      {
        q: "Can I rotate or delete pages while reordering?",
        a: "Yes. The interactive workspace provides individual buttons on each page card to rotate or delete specific pages prior to saving.",
      },
      {
        q: "Are my documents uploaded to a server to reorder them?",
        a: "No. Page reordering executes 100% locally in your browser via WebAssembly. Your files stay strictly on your device.",
      },
      {
        q: "Is there a limit on how many pages I can reorder?",
        a: "There is no artificial page limit. You can organize documents with dozens of pages according to your browser's available memory.",
      },
    ],
  },
  "aplanar-pdf": {
    slug: "flatten-pdf",
    name: "Flatten PDF",
    h1: "Flatten PDF forms and annotations",
    tagline: "Turn interactive form fields and widgets into permanent, non-editable text and graphics.",
    seoTitle: "Flatten PDF Online Free and Lock Form Fields | BreadPDF",
    seoDescription:
      "Consolidate fillable form fields and interactive annotations into static document content. Lock filled values securely before sharing.",
    ctaLabel: "Flatten PDF",
    keywords: ["flatten pdf", "lock pdf form", "flatten fillable pdf", "non editable pdf"],
    howItWorks: [
      "Upload the PDF containing interactive form fields or annotations.",
      "The in-browser engine consolidates field values into static page graphics.",
      "Download your flattened PDF ready for formal submission or printing.",
    ],
    faq: [
      {
        q: "What does flattening a PDF actually do?",
        a: "Flattening locks interactive form fields (AcroForms), text inputs, checkboxes, and signatures, converting them into standard non-editable page graphics so values cannot be altered.",
      },
      {
        q: "Can a flattened form be edited again afterwards?",
        a: "No. Once flattened, form fields lose their interactive definitions and become static graphical content, ensuring filled data remains tamper-proof.",
      },
      {
        q: "Does text remain crisp and selectable?",
        a: "Yes. Completed text appearances are rendered vectorially within the page stream, retaining high typographical clarity.",
      },
      {
        q: "Does flattening reduce PDF file size?",
        a: "In files with heavy interactive structures, it often slightly reduces file size by stripping dynamic widget dictionaries.",
      },
      {
        q: "Do my entered form details ever leave my device?",
        a: "No. Flattening occurs entirely inside your local browser memory with zero network uploads.",
      },
    ],
  },
  "eliminar-metadatos-pdf": {
    slug: "remove-pdf-metadata",
    name: "Remove PDF Metadata",
    h1: "Remove hidden metadata and properties from PDF",
    tagline: "Wipe hidden author, software, dates, and sensitive document properties.",
    seoTitle: "Remove PDF Metadata Online and Clean File Properties | BreadPDF",
    seoDescription:
      "Strip hidden personal data from your PDF such as author, creation tool, revision timestamps, and document properties 100% privately.",
    ctaLabel: "Clean Metadata",
    keywords: ["remove pdf metadata", "clean pdf properties", "strip author from pdf"],
    howItWorks: [
      "Select the PDF you wish to sanitize.",
      "The system purges author, title, subject, application creator, and date fields.",
      "Download a clean PDF copy with zero traces of personal or system details.",
    ],
    faq: [
      {
        q: "Which metadata fields are purged?",
        a: "All standard document information dictionary fields are cleared: Title, Author, Subject, Keywords, Creator, Producer, and Creation/Modification timestamps.",
      },
      {
        q: "Does this affect visible page text or images?",
        a: "Not at all. Visible text, images, tables, and layouts remain untouched. Only invisible background properties are sanitized.",
      },
      {
        q: "Why should I clean metadata before distributing a PDF?",
        a: "Metadata can inadvertently reveal your full name, local computer username, software versions, and exact modification dates.",
      },
      {
        q: "Are my files uploaded to a remote server for cleaning?",
        a: "No. Reading and rewriting the PDF header takes place directly in your web browser with no remote communication.",
      },
      {
        q: "How does this differ from redacting a PDF?",
        a: "'Remove Metadata' cleans invisible file properties. 'Redact PDF' permanently blacks out and removes visible sensitive text or graphics on the page.",
      },
    ],
  },
  "pdf-a-png": {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    h1: "Convert PDF pages to PNG images",
    tagline: "Turn PDF pages into sharp, lossless PNG images with high resolution.",
    seoTitle: "Convert PDF to PNG Online Free in High Quality | BreadPDF",
    seoDescription:
      "Transform every page of your PDF into crisp, lossless PNG images without compression artifacts. Fast, private, and browser-powered.",
    ctaLabel: "Convert to PNG",
    keywords: ["pdf to png", "convert pdf to png", "extract png from pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Select your preferred rendering scale or resolution.",
      "Download your pages in high-fidelity PNG format.",
    ],
    faq: [
      {
        q: "What is the difference between PDF to PNG and PDF to JPG?",
        a: "PNG is a lossless format that delivers crisp text edges and superior graphic precision without the compression artifacts common in JPG.",
      },
      {
        q: "How are multi-page documents downloaded?",
        a: "Each page renders as a separately numbered PNG file ready for individual download and saving on your device.",
      },
      {
        q: "Can I choose the output resolution?",
        a: "Yes. You can choose between Standard (1x) or High Definition (2x) depending on whether you need images for web sharing or printing.",
      },
      {
        q: "Is the page background rendered white?",
        a: "Yes, PDF pages are rendered over a solid white canvas background to guarantee universal readability in any image viewer.",
      },
      {
        q: "Is my PDF uploaded to any external server?",
        a: "No. Rendering executes directly on your browser's Canvas engine without sending any file data to remote servers.",
      },
    ],
    options: {
      scale: {
        label: "Image resolution",
        choices: {
          "1": "Standard (72-96 DPI) — Lightweight",
          "2": "High Definition (150-200 DPI) — Recommended",
          "3": "Maximum Sharpness (300 DPI) — Print",
        },
      },
    },
  },
  "png-a-pdf": {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    h1: "Convert PNG images to PDF document",
    tagline: "Combine PNG images and screenshots into a single structured PDF document.",
    seoTitle: "Convert PNG to PDF Online Free in Order | BreadPDF",
    seoDescription:
      "Merge one or multiple PNG images into a single PDF document. Fit to A4 with neat margins or keep original dimensions with complete privacy.",
    ctaLabel: "Convert to PDF",
    keywords: ["png to pdf", "convert png to pdf", "combine png into pdf"],
    howItWorks: [
      "Select one or more PNG files from your device.",
      "Choose whether to fit images into standard A4 pages with margins or keep original dimensions.",
      "Download your consolidated PDF document instantly.",
    ],
    faq: [
      {
        q: "Can I upload multiple PNG images at once?",
        a: "Yes. You can select multiple PNG files, and they will be arranged consecutively in the resulting PDF.",
      },
      {
        q: "Are transparent PNG backgrounds preserved?",
        a: "Yes. BreadPDF's engine embeds PNG images natively into the PDF preserving their alpha transparency channel without forced conversion to JPEG.",
      },
      {
        q: "What page sizing options are available?",
        a: "You can choose 'Fit to A4' (with balanced page margins) or 'Original image dimensions' so each PDF page matches the source image size.",
      },
      {
        q: "Is there a limit on how many images I can merge?",
        a: "You can combine dozens of images as long as your device's browser memory supports them.",
      },
      {
        q: "Are my pictures uploaded to external servers?",
        a: "No. All PDF generation happens locally inside your browser memory with zero cloud transfer.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to A4 page (with margins)",
          fit: "Original image dimensions",
        },
      },
    },
  },
  "redimensionar-pdf": {
    slug: "resize-pdf",
    name: "Resize PDF Pages",
    h1: "Resize and normalize PDF pages to A4",
    tagline: "Standardize your PDF page dimensions to A4, US Letter, or Legal.",
    seoTitle: "Resize PDF Pages Online to A4 or Letter | BreadPDF",
    seoDescription:
      "Normalize documents with mixed page sizes or adapt print formats to standard A4, Letter, or Legal while preserving proportions without distortion.",
    ctaLabel: "Resize Pages",
    keywords: ["resize pdf", "change pdf page size", "convert pdf to a4"],
    howItWorks: [
      "Upload your PDF file.",
      "Select your target page standard (A4, Letter, Legal, or A3).",
      "Download your standardized document with proportionally scaled, centered pages.",
    ],
    faq: [
      {
        q: "How does content adapt to the new page dimensions?",
        a: "Page content is scaled proportionally and centered on the new canvas, ensuring no text is cropped and no aspect ratios are stretched.",
      },
      {
        q: "What happens to landscape (horizontal) pages?",
        a: "The engine automatically senses page orientation. If an incoming page is landscape, the target sheet orients horizontally to match.",
      },
      {
        q: "Which standard page sizes are supported?",
        a: "You can standardize to A4 (210 × 297 mm), US Letter (216 × 279 mm), Legal (216 × 356 mm), and A3 (297 × 420 mm).",
      },
      {
        q: "Does resizing degrade text sharpness?",
        a: "No. Vector paths, embedded fonts, and graphics scale with mathematical precision inside the target page boundaries.",
      },
      {
        q: "Are my files processed privately?",
        a: "Yes. All dimensional scaling runs locally within your browser without sending files to remote servers.",
      },
    ],
    options: {
      size: {
        label: "Target page size",
        choices: {
          a4: "A4 (210 × 297 mm) — European / International standard",
          letter: "US Letter (216 × 279 mm) — American standard",
          legal: "Legal (216 × 356 mm) — Legal documents",
          a3: "A3 (297 × 420 mm) — Large format / blueprints",
        },
      },
    },
  },
  "editar-metadatos-pdf": {
    slug: "edit-pdf-metadata",
    name: "Edit PDF Metadata",
    h1: "Edit PDF Document Metadata",
    tagline: "Update title, author, subject, and keywords directly in your browser.",
    seoTitle: "Edit PDF Metadata Online for Free | BreadPDF",
    seoDescription:
      "Modify title, author, subject, and keywords in your PDF file with 100% client-side privacy. No files are sent to remote servers.",
    ctaLabel: "Save Metadata",
    keywords: ["edit pdf metadata", "change pdf author", "update pdf title", "pdf properties"],
    howItWorks: [
      "Upload your PDF document.",
      "Fill in or edit title, author, subject, and keywords.",
      "Click Save Metadata to download the updated PDF.",
    ],
    faq: [
      {
        q: "Which metadata fields can be updated?",
        a: "You can update the standard document information dictionary: Title, Author, Subject, and Keywords.",
      },
      {
        q: "Does this affect page contents or visual layouts?",
        a: "Not at all. Visual text, images, and embedded vector graphics remain completely intact. Only document properties are updated.",
      },
      {
        q: "Are my documents uploaded to any server?",
        a: "No. Everything runs locally in your browser memory via WebAssembly and client-side JavaScript.",
      },
    ],
    options: {
      title: {
        label: "Document title",
        placeholder: "e.g. Annual Report 2026",
      },
      author: {
        label: "Author",
        placeholder: "e.g. Company or Author name",
      },
      subject: {
        label: "Subject",
        placeholder: "e.g. Financial performance summary",
      },
      keywords: {
        label: "Keywords (comma-separated)",
        placeholder: "finance, report, balance",
      },
    },
  },
  "anadir-texto-pdf": {
    slug: "add-text-to-pdf",
    name: "Add Text to PDF",
    h1: "Add Text and Annotations to a PDF",
    tagline: "Insert custom text, notes, or typography at your chosen position and page.",
    seoTitle: "Add Text to PDF Online for Free | BreadPDF",
    seoDescription:
      "Type and add text overlays to any PDF page with font size, color, and positioning controls. Fast, private, and no signup required.",
    ctaLabel: "Insert Text & Download",
    keywords: ["add text to pdf", "type on pdf", "insert text into pdf", "write on pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Type your text, adjust horizontal and vertical coordinates, size, and color.",
      "Preview the result and download your modified PDF.",
    ],
    faq: [
      {
        q: "Can I add text to specific pages or all pages?",
        a: "Yes. You can choose to place text on all pages, the first page, the last page, or selected pages.",
      },
      {
        q: "Can I adjust font size and text color?",
        a: "Yes. Use the sliders for font size (pt), page coordinates (percentage), and the color picker for text color.",
      },
      {
        q: "Is the text embedded into the output PDF?",
        a: "Yes. The text is drawn directly into the PDF content stream with vector sharpness for crisp viewing and printing.",
      },
      {
        q: "Is it safe to process confidential documents?",
        a: "Completely safe. Processing happens on your device without sending any document data across the network.",
      },
    ],
    options: {
      text: {
        label: "Text to insert",
        placeholder: "Type text here...",
      },
      fontSize: {
        label: "Font size",
      },
      xPercent: {
        label: "Horizontal position (%)",
      },
      yPercent: {
        label: "Vertical position (%)",
      },
    },
  },
  "insertar-paginas-pdf": {
    slug: "insert-pages-pdf",
    name: "Insert Pages into PDF",
    h1: "Insert Pages from Another PDF into a Document",
    tagline: "Add pages from a second PDF at an exact position inside your base document.",
    seoTitle: "Insert Pages into PDF Online for Free at Exact Position | BreadPDF",
    seoDescription:
      "Insert pages from another PDF at the beginning, end, or specific point of your document. Fast, private, and no signup needed.",
    ctaLabel: "Insert Pages & Download",
    keywords: ["insert pages into pdf", "add pages to pdf", "combine pages into pdf", "paste pages in pdf"],
    howItWorks: [
      "Upload your base PDF document and the PDF containing the pages to insert.",
      "Choose the target insertion position: start, after cover, or at the end.",
      "Preview the combined page sequence and download your merged PDF.",
    ],
    faq: [
      {
        q: "How is this different from 'Merge PDF'?",
        a: "Merge PDF appends whole documents sequentially one after another. 'Insert Pages' lets you place the pages of a second document at an exact point inside the base file.",
      },
      {
        q: "Can I insert a multi-page PDF all at once?",
        a: "Yes. All pages from the secondary PDF will be inserted consecutively at your selected target position.",
      },
      {
        q: "Are hyperlinks, text, and vector graphics preserved?",
        a: "Yes. Pages are copied faithfully with original fonts, vectors, and image resolutions intact.",
      },
      {
        q: "Do I need an account or subscription?",
        a: "No. You can use the tool right away with zero limits, completely free and anonymously.",
      },
      {
        q: "Are my documents kept private?",
        a: "Yes. Processing executes exclusively inside your local browser via WebAssembly without cloud uploads.",
      },
    ],
    options: {
      position: {
        label: "Insertion position",
        choices: {
          end: "At the end of base document",
          start: "At the beginning (page 1)",
          "after-first": "After cover page (page 2)",
        },
      },
    },
  },
  "optimizar-pdf-para-impresion": {
    slug: "optimize-pdf-for-print",
    name: "Optimize PDF for Print",
    h1: "Optimize PDF for Print and Grayscale Conversion",
    tagline: "Convert your PDF to grayscale to save color toner and speed up printing.",
    seoTitle: "Optimize PDF for Print Online Free to Grayscale | BreadPDF",
    seoDescription:
      "Transform your PDF to true grayscale for cost-effective monochrome printing. Sharp, private, and runs directly in your browser.",
    ctaLabel: "Optimize for Print",
    keywords: ["optimize pdf for print", "grayscale pdf", "print pdf monochrome", "save toner pdf"],
    howItWorks: [
      "Select the PDF you intend to print.",
      "Choose your target resolution quality (standard for reading or high-definition for intricate graphics).",
      "Download your optimized grayscale PDF ready for your printer.",
    ],
    faq: [
      {
        q: "Why convert a PDF to grayscale before printing?",
        a: "Many color printers mix color inks to create blacks and grays when a PDF contains RGB/CMYK elements. Grayscale normalization guarantees only black ink is used.",
      },
      {
        q: "How does the grayscale conversion work technically?",
        a: "Each page is rendered at high definition calculating the perceptual luminance of each pixel, reconstructing a sharp monochrome PDF.",
      },
      {
        q: "Does it preserve fine text sharpness?",
        a: "Yes. High-resolution rendering ensures sharp contrast and clean letter edges both on screen and on physical paper.",
      },
      {
        q: "Does grayscale conversion reduce file size?",
        a: "For PDFs containing high-resolution color photos or complex backgrounds, discarding three color channels typically lowers file weight.",
      },
      {
        q: "Is document privacy maintained?",
        a: "Yes. Conversion is handled entirely locally on your machine without transmitting pages to third-party servers.",
      },
    ],
    options: {
      dpi: {
        label: "Print rendering quality",
        choices: {
          "2": "High Definition (~150-200 DPI) — Recommended",
          "1": "Quick Draft (~96 DPI) — Lighter file",
        },
      },
    },
  },
  "webp-a-pdf": {
    slug: "webp-to-pdf",
    name: "WebP to PDF",
    h1: "Convert WebP images to PDF online",
    tagline: "Convert WebP images into a crisp, unified PDF document.",
    seoTitle: "Convert WebP to PDF online free and in order | BreadPDF",
    seoDescription:
      "Turn one or multiple WebP images into a single PDF file without quality loss. Fast, private in your browser, and no files uploaded to servers.",
    ctaLabel: "Convert to PDF",
    keywords: ["webp to pdf", "convert webp to pdf", "webp images to pdf", "combine webp into pdf"],
    howItWorks: [
      "Select one or multiple WebP images from your device.",
      "Choose whether to fit images onto standard A4 pages with margins or preserve original dimensions.",
      "Download your unified PDF document instantly.",
    ],
    faq: [
      {
        q: "Can I convert multiple WebP images into a single PDF document?",
        a: "Yes. You can select multiple WebP files at once and they will be arranged into consecutive pages inside the resulting PDF.",
      },
      {
        q: "Is there any visual quality loss when converting WebP to PDF?",
        a: "No. The engine decodes the original pixels directly in your browser and embeds them with full fidelity without unnecessary recompression artifacts.",
      },
      {
        q: "What page size options are available?",
        a: "You can choose 'Fit to A4 page' (with proportional margins) or 'Original image size' to match each page to the exact image dimensions.",
      },
      {
        q: "Can I reorder images before generating the PDF?",
        a: "Yes. You can organize the sequence of pages directly in the upload panel before converting.",
      },
      {
        q: "Are my WebP photos uploaded to cloud servers?",
        a: "No. The entire decoding and PDF compilation process runs 100% locally in your device's memory using client-side JavaScript and Canvas.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to A4 page (with margins)",
          fit: "Original size of each image",
        },
      },
    },
  },
  "markdown-a-pdf": {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    h1: "Convert Markdown to PDF online",
    tagline: "Turn Markdown (.md) files into clean, beautifully structured PDF documents.",
    seoTitle: "Convert Markdown to PDF online free and clean | BreadPDF",
    seoDescription:
      "Transform your Markdown (.md) notes and documents into elegant PDFs with headings, paragraphs, lists, quotes, and code blocks rendered instantly.",
    ctaLabel: "Convert to PDF",
    keywords: ["markdown to pdf", "convert md to pdf", "export markdown to pdf", "md document to pdf"],
    howItWorks: [
      "Upload your Markdown (.md or .markdown) file.",
      "The engine parses headings, lists, quotes, and typography blocks into clean pages.",
      "Download your beautifully formatted PDF ready to print, present, or share.",
    ],
    faq: [
      {
        q: "What Markdown syntax elements are supported?",
        a: "The tool renders headings (#, ##, ###), standard paragraphs, bold text (**), blockquotes (>), bullet lists (* or -), numbered lists, and fenced code blocks with monospace font.",
      },
      {
        q: "How does page-splitting work for long documents?",
        a: "The converter calculates available vertical space on standard A4 pages and breaks paragraphs naturally with clean margins.",
      },
      {
        q: "Is it suitable for exporting AI responses from ChatGPT or Claude?",
        a: "Yes. It provides the ideal workflow to convert AI summaries, documentation, and notes exported from Notion or Obsidian into shareable PDFs.",
      },
      {
        q: "Are code blocks preserved with proper formatting?",
        a: "Yes. Code snippets delimited by triple backticks (```) are rendered in shaded background boxes with Courier monospace typography.",
      },
      {
        q: "Are my notes or text files transmitted to external servers?",
        a: "No. All text parsing and PDF vector layout are executed entirely inside your browser with complete privacy.",
      },
    ],
  },
  "powerpoint-a-pdf": {
    slug: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    h1: "Convert PowerPoint to PDF online",
    tagline: "Convert .pptx presentations into widescreen PDF slides (Beta preview).",
    seoTitle: "Convert PowerPoint to PDF online free (.pptx) | BreadPDF",
    seoDescription:
      "Transform PowerPoint slides (.pptx) into a widescreen PDF document directly in your browser. Fast, 100% private, and no files uploaded to external servers.",
    ctaLabel: "Convert to PDF",
    keywords: ["powerpoint to pdf", "convert pptx to pdf", "pptx to pdf online", "slides to pdf"],
    howItWorks: [
      "Upload your PowerPoint presentation (.pptx) file.",
      "The in-browser engine parses slides, typography, and text blocks.",
      "Download your clean 16:9 widescreen PDF presentation.",
    ],
    faq: [
      {
        q: "What visual fidelity should I expect from this conversion?",
        a: "This tool is in beta preview and runs completely on the client side in your browser. It extracts text runs, headings, paragraphs, and slide hierarchy into 16:9 widescreen pages using universal fonts. It does not replicate animations or intricate proprietary Microsoft Office SmartArt layouts.",
      },
      {
        q: "Which PowerPoint file versions are supported?",
        a: "It supports modern presentations in .pptx format (PowerPoint 2007 and newer). For legacy binary .ppt files, we recommend saving them as .pptx first.",
      },
      {
        q: "Are slides saved in widescreen or A4 proportions?",
        a: "The PDF is rendered natively in standard 16:9 widescreen proportions (960 × 540 pt), ideal for digital displays, laptops, and tablets.",
      },
      {
        q: "Why is it labeled as a Beta Preview?",
        a: "Because PowerPoint's OpenXML specification includes hundreds of complex proprietary shapes and macros. To ensure complete transparency, we clearly disclose that this is a client-side structural conversion rather than claiming 100% Office layout reproduction.",
      },
      {
        q: "Are my slides uploaded to any external servers?",
        a: "No. Reading the internal presentation XML and compiling the output PDF takes place entirely in your browser's local memory.",
      },
    ],
  },
  "svg-a-pdf": {
    slug: "svg-to-pdf",
    name: "SVG to PDF",
    h1: "Convert SVG to PDF online",
    tagline: "Turn SVG vector graphics into crisp, high-definition PDF documents.",
    seoTitle: "Convert SVG to PDF online free in high resolution | BreadPDF",
    seoDescription:
      "Convert SVG vector files into sharp PDF documents preserving curves, paths, and visual proportions directly in your browser with complete privacy.",
    ctaLabel: "Convert to PDF",
    keywords: ["svg to pdf", "convert svg to pdf", "vector to pdf", "export svg to pdf"],
    howItWorks: [
      "Upload your SVG vector graphic (.svg) file.",
      "Choose whether to fit into a standard A4 page or match the exact graphic dimensions (viewBox).",
      "Download your high-definition PDF document immediately.",
    ],
    faq: [
      {
        q: "How does the SVG to PDF conversion work technically?",
        a: "The tool interprets the SVG XML markup and native viewBox proportions, rendering the visual curves and typography at 2.5x high definition and embedding it into an uncompressed standard PDF page.",
      },
      {
        q: "Does it support both portrait and landscape orientations?",
        a: "Yes. When choosing A4, the system measures the aspect ratio of the graphic and automatically initializes the page in portrait or landscape format to match the SVG.",
      },
      {
        q: "Can I retain the exact dimensions of my original artwork?",
        a: "Yes. Selecting 'Original graphic size (viewBox)' ensures the PDF page is created with the exact point dimensions declared in your SVG canvas.",
      },
      {
        q: "Are gradients and CSS fills preserved?",
        a: "Yes. The browser's native rendering engine accurately rasterizes and renders standard SVG gradients, clip-paths, and styling without missing definitions.",
      },
      {
        q: "Are my vector graphics transmitted over the internet?",
        a: "No. All XML parsing, canvas rendering, and PDF assembly are performed locally inside your device memory with zero cloud uploads.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to standard A4 (with clean margins)",
          viewbox: "Original graphic size (viewBox)",
        },
      },
    },
  },

  "extraer-imagenes-pdf": {
    slug: "extract-pdf-images",
    name: "Extract Images from PDF",
    h1: "Extract embedded images from a PDF",
    tagline: "Get the photographs and images embedded in your PDF as individual PNG files.",
    seoTitle: "Extract images from PDF online free | BreadPDF",
    seoDescription:
      "Extract embedded images from your PDF document as individual PNG files directly in your browser, without uploading anything to any server.",
    ctaLabel: "Extract images",
    keywords: ["extract images from pdf", "get photos from pdf", "export pdf images", "pdf to images"],
    howItWorks: [
      "Upload the PDF you want to extract images from.",
      "The engine scans each page for embedded XObject image resources.",
      "Download individual PNG images or a ZIP archive if multiple images are found.",
    ],
    faq: [
      {
        q: "What type of images does this tool extract?",
        a: "It extracts rasterized images embedded as XObject resources in the PDF: JPEG photographs, PNG graphics, or RGBA color images. It does not extract vector elements or formatted text.",
      },
      {
        q: "Why are no images showing up in my PDF?",
        a: "Some PDFs contain only text and vectors without any embedded raster images. It is also possible that images are stored in a non-standard internal format that the extractor cannot recover as individual objects.",
      },
      {
        q: "What format are the extracted images saved in?",
        a: "Images are exported as PNG files at the original resolution of the embedded object. If more than one image is found, they are automatically packaged in a ZIP archive.",
      },
      {
        q: "What is the difference between 'Extract images' and 'PDF to PNG'?",
        a: "'PDF to PNG' converts each full PDF page into a screen image, including text and vectors. 'Extract images' recovers only the individual image objects embedded inside the PDF, which may be separate photographs distinct from the page layout.",
      },
      {
        q: "Are my files uploaded to an external server?",
        a: "No. The document analysis and image extraction run entirely in your browser memory using pdf.js. No data ever leaves your device.",
      },
    ],
  },

  "dividir-pdf-por-tamano": {
    slug: "split-pdf-by-size",
    name: "Split PDF by Size",
    h1: "Split a PDF into parts by maximum file size in MB",
    tagline: "Fragment large documents while respecting an approximate size limit per part.",
    seoTitle: "Split PDF by size in MB online free | BreadPDF",
    seoDescription:
      "Split a large PDF into fragments with a size limit in MB per part. Ideal for email attachments or platforms with file size restrictions. 100% in your browser.",
    ctaLabel: "Split by size",
    keywords: ["split pdf by size", "split pdf mb", "fragment pdf size", "split pdf email attachment"],
    howItWorks: [
      "Upload the PDF you need to split.",
      "Choose the approximate maximum size in MB for each part.",
      "Download the numbered parts or a ZIP archive if there are more than three.",
    ],
    faq: [
      {
        q: "Is the size of each part exact?",
        a: "It is approximate. A PDF is composed of whole pages that cannot be split mid-page. The engine estimates how many pages fit within the target MB and adjusts accordingly, but the actual result may vary slightly depending on the content of each page.",
      },
      {
        q: "How is this different from 'Split PDF'?",
        a: "'Split PDF' divides the document into specific page ranges or intervals you define. 'Split PDF by Size' automatically splits by a maximum MB per fragment, without requiring you to know the exact page count.",
      },
      {
        q: "How many parts does it create?",
        a: "The number of parts depends on the size of the original file and the MB limit you set. There is no artificial cap on the number of fragments; the process continues until the entire document is covered.",
      },
      {
        q: "Is any quality lost when splitting the PDF?",
        a: "No. Pages are copied in full with their original vector content, images, and fonts — no recompression or quality degradation occurs.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. The splitting process runs in your browser memory using pdf-lib. Your documents are never transmitted to an external server.",
      },
    ],
    options: {
      maxMb: {
        label: "Approximate maximum size per part",
      },
    },
  },

  "eliminar-paginas-en-blanco": {
    slug: "remove-blank-pages-pdf",
    name: "Remove Blank Pages",
    h1: "Remove blank pages from a PDF",
    tagline: "Automatically detect and remove empty pages from scanned documents or forms.",
    seoTitle: "Remove blank pages from PDF online free | BreadPDF",
    seoDescription:
      "Automatically detect and remove blank or empty pages from your PDF. Ideal for scanned documents, forms, and reports. 100% private and browser-based.",
    ctaLabel: "Remove blank pages",
    keywords: ["remove blank pages pdf", "delete empty pages pdf", "strip blank pages pdf"],
    howItWorks: [
      "Upload the PDF with blank or nearly empty pages.",
      "The analyser renders each page at low resolution and measures the white-pixel ratio.",
      "Pages exceeding the threshold are removed and you download the cleaned PDF.",
    ],
    faq: [
      {
        q: "How does the tool detect blank pages?",
        a: "It renders each page at reduced scale (0.4×) with pdf.js and analyses the percentage of pixels with very high brightness (R, G, B > 240). If that percentage exceeds the configured threshold, the page is considered blank.",
      },
      {
        q: "Can it remove pages with very little content that are not completely white?",
        a: "Yes. By lowering the sensitivity threshold, the detector can also remove pages with minimal content such as faint headers or light watermarks. The default threshold of 97% is intentionally conservative.",
      },
      {
        q: "Can it accidentally remove pages that are not actually blank?",
        a: "At the default threshold (97%), the risk is very low. Pages with visible text or images rarely exceed 90% white pixels. If your document has very light backgrounds or subtle watermarks, adjust the threshold or review the result.",
      },
      {
        q: "Does it work with scanned PDFs?",
        a: "Yes. Detection works on the visual render of each page, so it functions correctly for both vector-text PDFs and image-based scanned documents.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. All analysis and page removal are performed locally in your browser with no external data transmission.",
      },
    ],
    options: {
      threshold: {
        label: "Detection sensitivity",
        help: "Minimum white-pixel percentage to classify a page as 'blank'. Higher value = more conservative.",
      },
    },
  },

  "imagen-a-webp": {
    slug: "image-to-webp",
    name: "Image to WebP",
    h1: "Convert JPG and PNG images to WebP",
    tagline: "Reduce the file size of your images for the web by converting them to the modern WebP format.",
    seoTitle: "Convert image to WebP online free | JPG and PNG | BreadPDF",
    seoDescription:
      "Convert JPG and PNG images to WebP to reduce their weight for the web. Adjust quality and download the result instantly, all in your browser.",
    ctaLabel: "Convert to WebP",
    keywords: ["image to webp", "jpg to webp", "png to webp", "convert to webp", "optimize image web"],
    howItWorks: [
      "Upload one or more JPG or PNG images.",
      "Adjust the WebP quality level (higher quality = larger file).",
      "Download the converted images or a ZIP archive if there are multiple.",
    ],
    faq: [
      {
        q: "What image formats does this tool accept?",
        a: "It accepts JPG/JPEG and PNG images. These are the two most common web image formats and both convert with full fidelity to the WebP format.",
      },
      {
        q: "How much will the image size be reduced?",
        a: "The saving depends on the original image content and the quality setting chosen. WebP generally offers better compression than JPG or PNG at the same visual quality level, but the exact result varies per image. This tool does not guarantee a specific reduction percentage.",
      },
      {
        q: "Is PNG transparency preserved when converting to WebP?",
        a: "Yes. WebP supports an alpha channel (transparency), so PNG images with transparent backgrounds retain that property after conversion.",
      },
      {
        q: "Can I convert multiple images at once?",
        a: "Yes. You can upload multiple JPG and PNG files in a single session. If there are multiple images, the result is automatically packaged as a ZIP file.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. Conversion uses only the browser's native Canvas API locally. No image ever leaves your device.",
      },
    ],
    options: {
      quality: {
        label: "WebP quality",
        help: "Higher quality = larger output file size.",
      },
    },
  },

  "sanear-pdf": {
    slug: "sanitize-pdf",
    name: "Sanitize PDF",
    h1: "Sanitize and clean a PDF of unwanted elements",
    tagline: "Remove embedded JavaScript, automatic actions, and author metadata from PDF documents.",
    seoTitle: "Sanitize PDF online free — remove JavaScript and metadata | BreadPDF",
    seoDescription:
      "Clean your PDF by removing embedded JavaScript, automatic open actions, and author metadata. Ideal before sharing third-party documents.",
    ctaLabel: "Sanitize PDF",
    keywords: ["sanitize pdf", "clean pdf", "remove javascript pdf", "strip pdf metadata", "secure pdf"],
    howItWorks: [
      "Upload the PDF you want to sanitize.",
      "The engine removes JavaScript, automatic actions, and author metadata.",
      "Download the clean PDF ready to share safely.",
    ],
    faq: [
      {
        q: "What elements does this tool exactly remove?",
        a: "It removes: (1) JavaScript embedded in the document catalogue (/JavaScript, /Names entries with scripts), (2) Automatic open actions (/OpenAction, /AA in the catalogue and in individual pages), (3) The XMP metadata stream (/Metadata), and (4) Author information fields from the document info dictionary (Author, Creator, Keywords, Subject).",
      },
      {
        q: "Does it guarantee the PDF is completely safe?",
        a: "No. This tool removes known and standard elements. It cannot guarantee neutralisation of advanced attack vectors, payloads encrypted in non-standard object streams, or vulnerabilities in your PDF viewer. For high-criticality documents in corporate environments, use specialised document sandbox solutions.",
      },
      {
        q: "Is the visual content of the document altered?",
        a: "No. Page content (text, images, vectors) remains intact. Only metadata and scripting elements are removed from the PDF catalogue.",
      },
      {
        q: "When is this useful?",
        a: "It is useful when you receive PDFs from unknown third parties you want to share or distribute, when you need to strip author data before publishing a document, or when you want to ensure the PDF does not execute automatic actions on opening.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. The entire sanitisation process runs locally in your browser using pdf-lib. The document never leaves your device.",
      },
    ],
  },

  "rellenar-formulario-pdf": {
    slug: "fill-pdf-form",
    name: "Fill PDF Form",
    h1: "Fill form fields in a PDF online",
    tagline: "Detect and fill AcroForm fields in any PDF directly in your browser.",
    seoTitle: "Fill PDF form online free without Adobe | BreadPDF",
    seoDescription:
      "Fill text fields, checkboxes, dropdowns, and radio buttons in AcroForm PDFs without installing anything. Export the completed PDF instantly.",
    ctaLabel: "Open form",
    keywords: ["fill pdf form", "complete pdf online", "fill pdf without adobe", "interactive pdf form"],
    howItWorks: [
      "Upload the PDF containing AcroForm fields.",
      "The tool automatically detects all fields: text, checkboxes, dropdowns, and radio buttons.",
      "Fill in the fields and export the completed PDF ready to sign or submit.",
    ],
    faq: [
      {
        q: "What types of PDF forms are supported?",
        a: "Only PDFs containing standard AcroForm fields (the native PDF standard) are supported. XFA forms (Adobe's proprietary technology used by some Adobe LiveCycle-generated PDFs) are not supported. If the PDF has no defined fields, the tool will alert you.",
      },
      {
        q: "What field types can be filled?",
        a: "Supports text fields (single-line and multiline), checkboxes, radio buttons, and dropdown lists. These are the four most common AcroForm field types in standard forms.",
      },
      {
        q: "Does the exported PDF keep the fields editable?",
        a: "Yes. The exported PDF retains AcroForm fields with the values you entered. The form is not automatically flattened, so it remains editable in Adobe Reader or other viewers. To make it non-editable, use BreadPDF's Flatten PDF tool.",
      },
      {
        q: "What if the PDF is password protected?",
        a: "If the PDF is encrypted with form editing restrictions, fields may not be accessible. First unlock the document with BreadPDF's 'Unlock PDF' tool and try again.",
      },
      {
        q: "Are my forms uploaded to an external server?",
        a: "No. Field detection uses pdf.js and value saving uses pdf-lib — both running entirely in your browser memory. Form data never leaves your device.",
      },
    ],
  },

  "marca-de-agua": {
    "slug": "watermark-pdf",
    "name": "Watermark",
    "h1": "Add Watermark to a PDF",
    "tagline": "Stamp every page with text or an image, rotation and opacity control.",
    "seoTitle": "Add Watermark to PDF Online for Free | BreadPDF",
    "seoDescription": "Add custom text or image watermarks to your PDF documents with angle, position, and transparency controls directly in your browser.",
    "ctaLabel": "Apply Watermark",
    "keywords": [
      "watermark pdf",
      "add watermark to pdf",
      "stamp pdf"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "Configure text, angle, size, opacity, and position.",
      "Download your secured document."
    ],
    "faq": [
      {
        "q": "Can I tile the watermark across the page?",
        "a": "Yes, you can enable tile mode to repeat the watermark across the entire page."
      }
    ]
  },

  "numerar-paginas": {
    "slug": "number-pdf-pages",
    "name": "Number pages",
    "h1": "Number Pages in a PDF",
    "tagline": "Insert page numbers with configurable format, position, and margins.",
    "seoTitle": "Number PDF Pages Online for Free | BreadPDF",
    "seoDescription": "Add clean page numbers to your PDF document in the header or footer, customizing layout, font, and margins.",
    "ctaLabel": "Number pages",
    "keywords": [
      "number pdf pages",
      "paginate pdf",
      "page numbers pdf"
    ],
    "howItWorks": [
      "Upload your PDF document.",
      "Select format ({n} of {total}) and position.",
      "Download your numbered PDF."
    ],
    "faq": [
      {
        "q": "Can I skip numbering the cover page?",
        "a": "Yes, enable 'Exclude first page' to keep the cover page unnumbered."
      }
    ]
  },

  "ocr-pdf": {
    "slug": "ocr-pdf",
    "name": "PDF OCR",
    "h1": "Optical Character Recognition (OCR) for PDF",
    "tagline": "Turn scanned documents into files with selectable, searchable text.",
    "seoTitle": "Free Online PDF OCR | Text Recognition BreadPDF",
    "seoDescription": "Apply OCR to scanned PDFs or images directly in your browser. Generate a searchable PDF or extract plain text as .txt.",
    "ctaLabel": "Start OCR",
    "keywords": [
      "ocr pdf",
      "recognize text pdf",
      "scanned pdf to text",
      "searchable pdf"
    ],
    "howItWorks": [
      "Upload your scanned PDF.",
      "Choose document language (English, Spanish, French, etc.).",
      "Download your new PDF with selectable text or a .txt file."
    ],
    "faq": [
      {
        "q": "What is OCR and why is it useful?",
        "a": "OCR (Optical Character Recognition) analyzes scanned page images to identify characters and words, turning them into digital interactive text you can search and copy."
      },
      {
        "q": "Which languages are supported?",
        "a": "It supports 7 primary languages: English, Spanish, Catalan, French, German, Italian, and Portuguese."
      },
      {
        "q": "Is my file uploaded to an external server?",
        "a": "No. The Tesseract engine runs completely client-side in your browser via WebAssembly. Your documents are never uploaded."
      }
    ],
    "options": {
      "lang": {
        "label": "Document language",
        "choices": {
          "spa": "Spanish",
          "eng": "English",
          "cat": "Catalan",
          "fra": "French",
          "deu": "German",
          "ita": "Italian",
          "por": "Portuguese"
        }
      },
      "mode": {
        "label": "Output format",
        "choices": {
          "pdf": "Searchable PDF with text layer",
          "txt": "Plain text file (.txt)"
        }
      }
    }
  },

  "reparar-pdf": {
    "slug": "repair-pdf",
    "name": "Repair PDF",
    "h1": "Repair and Recover Corrupted PDF Files",
    "tagline": "Recover damaged documents by reconstructing their structure and cross-reference table.",
    "seoTitle": "Repair PDF Online for Free | Document Recovery BreadPDF",
    "seoDescription": "Fix PDF files that won't open, have broken structures, or XRef errors. Recover pages and download a clean PDF.",
    "ctaLabel": "Repair PDF",
    "keywords": [
      "repair pdf",
      "fix corrupted pdf",
      "recover damaged pdf",
      "rebuild pdf"
    ],
    "howItWorks": [
      "Upload the damaged or incomplete PDF.",
      "BreadPDF analyzes the binary structure and rescues all readable pages.",
      "Download your sanitized, reconstructed PDF document."
    ],
    "faq": [
      {
        "q": "What errors does this tool fix?",
        "a": "It fixes truncated headers, damaged cross-reference tables (XRef), and detached object streams."
      },
      {
        "q": "Is it safe for my private data?",
        "a": "Completely safe. Structural reconstruction occurs entirely in your browser's local memory."
      }
    ]
  },

  "proteger-pdf": {
    "slug": "protect-pdf",
    "name": "Protect PDF",
    "h1": "Protect PDF with Password and Strong Encryption",
    "tagline": "Add an opening password and encrypt your document with high-strength AES security.",
    "seoTitle": "Protect PDF with Password Online for Free | BreadPDF",
    "seoDescription": "Encrypt and password-protect your PDF files in your browser without uploading them to the internet. Maximum privacy.",
    "ctaLabel": "Protect PDF",
    "keywords": [
      "protect pdf",
      "password pdf",
      "lock pdf",
      "encrypt pdf"
    ],
    "howItWorks": [
      "Upload the PDF document you want to protect.",
      "Enter the opening password the document will require.",
      "Download your locked PDF with robust encryption."
    ],
    "faq": [
      {
        "q": "What kind of protection does this tool add?",
        "a": "It adds a user opening password. Any reader opening the PDF will prompt for the key before decrypting content."
      },
      {
        "q": "Are my password or files sent to any server?",
        "a": "No. Encryption runs 100% locally in your browser via client-side cryptographic libraries."
      }
    ],
    "options": {
      "password": {
        "label": "Protection password",
        "placeholder": "Enter a strong password...",
        "help": "Save your password. Without it, no one can open the file."
      }
    }
  },

  "desbloquear-pdf": {
    "slug": "unlock-pdf",
    "name": "Unlock PDF",
    "h1": "Unlock PDF and Remove Password",
    "tagline": "Remove the password from a PDF you have the key for to open it without restrictions.",
    "seoTitle": "Unlock PDF Online and Remove Password | BreadPDF",
    "seoDescription": "Remove opening passwords from your PDF file by entering the legitimate password once. Download an unlocked, restriction-free PDF.",
    "ctaLabel": "Unlock PDF",
    "keywords": [
      "unlock pdf",
      "remove pdf password",
      "decrypt pdf"
    ],
    "howItWorks": [
      "Upload your password-protected PDF file.",
      "Enter the current document password.",
      "Download the new PDF free of opening passwords."
    ],
    "faq": [
      {
        "q": "Can I unlock a PDF if I forgot or do not have the password?",
        "a": "No. This tool requires the legitimate password to decrypt the document and permanently remove security restrictions."
      }
    ],
    "options": {
      "password": {
        "label": "Current password",
        "placeholder": "Enter document password...",
        "help": "Required to decrypt document data in your browser."
      }
    }
  },

  "firmar-pdf": {
    "slug": "sign-pdf",
    "name": "Sign PDF",
    "h1": "Sign PDF Online for Free and Freehand",
    "tagline": "Draw or upload your electronic signature and place it on any page of your document.",
    "seoTitle": "Sign PDF Online for Free | Digital Signature BreadPDF",
    "seoDescription": "Add your graphic signature or mark to any PDF document right inside your browser. 100% private, no file uploads.",
    "ctaLabel": "Sign & Download PDF",
    "keywords": [
      "sign pdf",
      "digital signature pdf",
      "sign document online"
    ],
    "howItWorks": [
      "Upload the PDF you need to sign.",
      "Draw your signature on the interactive canvas or upload an image of your signature.",
      "Place the signature on the desired page and position, then download the signed PDF."
    ],
    "faq": [
      {
        "q": "Is my signature stored on your servers?",
        "a": "No. Signing and rendering runs 100% in your browser using WebAssembly and Canvas."
      }
    ]
  },

  "pdf-a-excel": {
    "slug": "pdf-to-excel",
    "name": "PDF to Excel",
    "h1": "Convert PDF to Excel and CSV Online for Free",
    "tagline": "Extract tables and structured data from your PDF into XLSX or CSV spreadsheets.",
    "seoTitle": "Convert PDF to Excel Online for Free | XLSX & CSV in BreadPDF",
    "seoDescription": "Convert tables and tabular data from PDF files into Excel spreadsheets (.xlsx) or CSV format quickly and privately without server uploads.",
    "ctaLabel": "Convert to Excel",
    "keywords": [
      "pdf to excel",
      "convert pdf to xlsx",
      "extract pdf tables",
      "pdf to csv"
    ],
    "howItWorks": [
      "Select or drop the PDF document containing tables or data.",
      "Choose output format: Excel workbook (.xlsx) or comma-separated file (.csv).",
      "Download your spreadsheet ready to edit and analyze."
    ],
    "faq": [
      {
        "q": "Are columns and rows preserved accurately?",
        "a": "Yes. BreadPDF groups text by spatial coordinates and geometric alignment to respect table grids."
      }
    ],
    "options": {
      "format": {
        "label": "Spreadsheet format",
        "choices": {
          "xlsx": "Excel (.xlsx) — Recommended with multiple sheets",
          "csv": "CSV (.csv) — Delimited plain text"
        }
      }
    }
  },

  "comparar-pdf": {
    "slug": "compare-pdf",
    "name": "Compare PDF",
    "h1": "Compare Two PDF Documents Online and Spot Differences",
    "tagline": "Inspect visual changes and text discrepancies between two versions of a PDF file.",
    "seoTitle": "Compare Two PDF Files Online and View Differences | BreadPDF",
    "seoDescription": "Compare two versions of a PDF document side-by-side or with an interactive sliding curtain divider. Detect changes in your browser.",
    "ctaLabel": "Compare documents",
    "keywords": [
      "compare pdf",
      "pdf differences",
      "diff pdf",
      "compare two pdfs"
    ],
    "howItWorks": [
      "Upload the original document (Version A) and modified document (Version B).",
      "Navigate page by page to view automated text difference highlights.",
      "Toggle between side-by-side view or the interactive split slider to inspect every detail."
    ],
    "faq": [
      {
        "q": "What types of differences does the comparator spot?",
        "a": "It performs two complementary checks: a high-fidelity visual render comparison and an automated text flow diff."
      }
    ]
  },

  "resumir-pdf": {
    "slug": "summarize-pdf",
    "name": "Summarize PDF",
    "h1": "Summarize PDF and Extract Key Takeaways",
    "tagline": "Generate executive summaries and key bullet points from long documents directly in your browser.",
    "seoTitle": "Summarize PDF Online and Extract Key Points | BreadPDF",
    "seoDescription": "Extract the most relevant points and sentences from any PDF without sending your document to the cloud or requiring paid accounts.",
    "ctaLabel": "Generate summary",
    "keywords": [
      "summarize pdf",
      "pdf summary",
      "key points pdf",
      "synthesize pdf"
    ],
    "howItWorks": [
      "Upload the PDF document you want to summarize.",
      "Select summary length (bullet points, short overview, or executive summary).",
      "Download your clean synthesized text summary."
    ],
    "faq": [
      {
        "q": "Is the summarization private?",
        "a": "Yes. The linguistic scoring and term frequency algorithm runs 100% locally in your browser."
      }
    ],
    "options": {
      "length": {
        "label": "Summary format",
        "choices": {
          "bullets": "Key highlighted takeaways (Bullet points)",
          "short": "Short summary (3 key ideas)",
          "medium": "Executive summary (5 key ideas)"
        }
      }
    }
  },

  "extraer-datos": {
    "slug": "extract-pdf-data",
    "name": "Extract data",
    "h1": "Extract Structured Data from PDF Documents",
    "tagline": "Automatically detect and extract emails, phone numbers, dates, and currency amounts.",
    "seoTitle": "Extract Structured Data from PDF Online for Free | JSON & CSV BreadPDF",
    "seoDescription": "Extract structured information like emails, amounts, dates, and phone numbers directly in JSON or CSV format.",
    "ctaLabel": "Extract fields",
    "keywords": [
      "extract pdf data",
      "invoice pdf extraction",
      "structured pdf data",
      "pdf to json"
    ],
    "howItWorks": [
      "Upload your PDF document, invoice, or form.",
      "Choose output format: JSON or CSV.",
      "Download clean structured data ready to import into databases or spreadsheets."
    ],
    "faq": [
      {
        "q": "What fields are detected automatically?",
        "a": "Email addresses, telephone numbers, dates in various notations, and monetary figures (EUR, USD)."
      }
    ],
    "options": {
      "format": {
        "label": "Export format",
        "choices": {
          "json": "Structured JSON (Recommended for developers)",
          "csv": "Delimited CSV (Recommended for spreadsheets)"
        }
      }
    }
  },

  "pdf-a-powerpoint": {
    "slug": "pdf-to-powerpoint",
    "name": "PDF to PowerPoint",
    "h1": "Convert PDF to PowerPoint Slides",
    "tagline": "Convert each page of your PDF into a .pptx slide in 16:9 widescreen format.",
    "seoTitle": "Convert PDF to PowerPoint (.pptx) Online for Free | BreadPDF",
    "seoDescription": "Transform PDF presentations into PowerPoint (.pptx) slides ready to present and edit in Microsoft PowerPoint or Google Slides.",
    "ctaLabel": "Convert to PowerPoint",
    "keywords": [
      "pdf to powerpoint",
      "pdf to pptx",
      "convert slides pdf"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "The engine generates high-definition vector widescreen slides.",
      "Download your presentation file (.pptx) ready to project."
    ],
    "faq": [
      {
        "q": "Is it compatible with PowerPoint and Google Slides?",
        "a": "Yes. It creates standard Office Open XML .pptx files with full application compatibility."
      }
    ]
  },

  "qr-pdf": {
    "slug": "qr-to-pdf",
    "name": "Generate QR to PDF",
    "h1": "Create QR Code for a PDF Online",
    "tagline": "Generate static high-resolution QR codes and download them formatted in print-ready PDF.",
    "seoTitle": "Create QR Code for PDF Online | BreadPDF",
    "seoDescription": "Generate static QR codes for links, menus, or text and download them in a print-ready A4 PDF or transparent PNG.",
    "ctaLabel": "Generate QR Code",
    "keywords": [
      "qr to pdf",
      "generate qr code pdf",
      "print qr code",
      "static qr code"
    ],
    "howItWorks": [
      "Enter the URL, text, or link you want to encode.",
      "Assign an optional title for the printed sheet.",
      "Download your A4-formatted PDF along with individual high-res PNG image."
    ],
    "faq": [
      {
        "q": "Does the QR code expire or require a subscription?",
        "a": "No. As a direct static QR code with no intermediary servers, it never expires and works permanently for free."
      }
    ],
    "options": {
      "text": {
        "label": "QR code content or URL",
        "placeholder": "https://your-site.com or text..."
      },
      "title": {
        "label": "Title on printed PDF sheet",
        "placeholder": "e.g. Restaurant Menu, Wi-Fi Network..."
      }
    }
  },

  "censurar-pdf": {
    "slug": "redact-pdf",
    "name": "Redact PDF",
    "h1": "Redact PDF and Black Out Confidential Data",
    "tagline": "Visually obscure text, names, IDs, or sensitive figures with permanent opaque blocks.",
    "seoTitle": "Redact PDF Online and Black Out Confidential Info | BreadPDF",
    "seoDescription": "Black out or white out confidential text, IDs, and figures in your PDF file with 100% browser-based privacy.",
    "ctaLabel": "Redact document",
    "keywords": [
      "redact pdf",
      "black out pdf",
      "hide confidential pdf data",
      "censor pdf"
    ],
    "howItWorks": [
      "Upload the PDF document containing confidential data.",
      "Enter words, IDs, names, or numbers to obscure separated by commas.",
      "Download your PDF with permanently overlaid redaction blocks."
    ],
    "faq": [
      {
        "q": "Can I choose the redaction block color?",
        "a": "Yes. You can select 'Black block' (the official legal redaction style) or 'White block' for subtle deletions."
      }
    ],
    "options": {
      "terms": {
        "label": "Words, names, or numbers to redact (comma-separated)",
        "placeholder": "e.g. Confidential, 12345678Z, Smith"
      },
      "color": {
        "label": "Redaction block color",
        "choices": {
          "black": "Black block (Official redaction standard)",
          "white": "White block (Clean deletion)"
        }
      }
    }
  },

  "recortar-pdf": {
    "slug": "crop-pdf",
    "name": "Crop PDF",
    "h1": "Crop PDF Page Margins",
    "tagline": "Trim excess blank margins and adjust the viewport frame across all pages.",
    "seoTitle": "Crop PDF Margins Online for Free | BreadPDF",
    "seoDescription": "Trim unnecessary white margins and adjust the viewing crop box of your PDF documents with high accuracy in your browser.",
    "ctaLabel": "Crop PDF",
    "keywords": [
      "crop pdf",
      "trim pdf margins",
      "remove white margins pdf"
    ],
    "howItWorks": [
      "Upload the PDF you want to crop.",
      "Select margin millimeters to trim from the outer edges.",
      "Download the neatly framed PDF."
    ],
    "faq": [
      {
        "q": "Does this shrink font sizes?",
        "a": "No. Content retains its original vector dimensions; only empty boundary whitespace is cropped."
      }
    ],
    "options": {
      "margin": {
        "label": "Margin to trim from edges"
      }
    }
  },

  "pdf-a-markdown": {
    "slug": "pdf-to-markdown",
    "name": "PDF to Markdown",
    "h1": "Convert PDF to Markdown (.md)",
    "tagline": "Transform your documents into clean structured Markdown for ChatGPT, Claude, and Notion.",
    "seoTitle": "Convert PDF to Markdown Online for Free (.md) | BreadPDF",
    "seoDescription": "Convert PDFs into structured Markdown files with headings, lists, and clean paragraphs ready for AI prompts or Obsidian notes.",
    "ctaLabel": "Convert to Markdown",
    "keywords": [
      "pdf to markdown",
      "pdf to md",
      "convert pdf obsidian",
      "pdf for chatgpt"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "The parser detects headings, lists, and paragraph hierarchies.",
      "Download your .md file ready for copy-pasting into your LLM or knowledge base."
    ],
    "faq": [
      {
        "q": "Is this ideal for AI prompts?",
        "a": "Yes. Markdown provides optimal context structure for ChatGPT, Claude, or Gemini without garbage characters."
      }
    ]
  },

  "pdf-a-pdfa": {
    "slug": "pdf-to-pdfa",
    "name": "PDF to PDF/A",
    "h1": "Convert PDF to PDF/A for Long-Term Archiving",
    "tagline": "Standardize your PDF under ISO 19005-1 for legal compliance and public administration filings.",
    "seoTitle": "Convert PDF to PDF/A Online for Free | ISO Standard BreadPDF",
    "seoDescription": "Transform your documents into the standard PDF/A long-term preservation format required by tax authorities, courts, and official filings.",
    "ctaLabel": "Convert to PDF/A",
    "keywords": [
      "pdf to pdfa",
      "convert pdf/a",
      "iso 19005-1",
      "archive pdf"
    ],
    "howItWorks": [
      "Upload the PDF file you need to submit or archive.",
      "The engine injects ISO metadata and neutralizes dynamic dependencies.",
      "Download your certified PDF/A document."
    ],
    "faq": [
      {
        "q": "Is it accepted by government and tax authorities?",
        "a": "Yes. It adheres to the closed-format and long-term archiving standards mandated by public administrations."
      }
    ]
  },

  "excel-a-pdf": {
    "slug": "excel-to-pdf",
    "name": "Excel to PDF",
    "h1": "Convert Excel to PDF Online for Free",
    "tagline": "Convert XLSX and XLS spreadsheets into print-ready landscape PDF tables.",
    "seoTitle": "Convert Excel to PDF Online for Free | BreadPDF",
    "seoDescription": "Convert your Excel spreadsheets (.xlsx, .xls) into organized, beautifully laid out PDF documents with 100% client-side privacy.",
    "ctaLabel": "Convert to PDF",
    "keywords": [
      "excel to pdf",
      "convert xlsx to pdf",
      "spreadsheet to pdf"
    ],
    "howItWorks": [
      "Upload your Excel workbook (.xlsx or .xls).",
      "The engine parses every sheet and formats tables in landscape A4 layout.",
      "Download your structured PDF document ready to share or print."
    ],
    "faq": [
      {
        "q": "Are multiple Excel sheets preserved?",
        "a": "Yes. Every worksheet tab is rendered with its respective title and tabular structure."
      }
    ]
  },

};

export const TOOL_TEXT: Record<Exclude<Locale, "es">, Record<string, ToolText>> = {
  ca: caTools,
  en: enTools,
};
