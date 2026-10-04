import type { ToolText } from "./translations";

const tools: Record<string, ToolText> = {
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
        a: "No. Tota la compressió i anàlisi de pàgines es processa localment a la memòria del teu navegador mitjançant JavaScript. Els teus documents confidencials mai no viatgen per internet.",
      },
    ],
    options: {
      level: {
        label: "Nivell de compressió",
        help: "Sense pèrdua conserva el text seleccionable; la resta rasteritza les pàgines.",
        choices: {
          balanced: "Equilibrat — recomanat",
          target_2mb: "Objectiu ≤ 2 MB (CV, InfoJobs, portals)",
          target_5mb: "Objectiu ≤ 5 MB (Moodle, Campus Virtual)",
          target_10mb: "Objectiu ≤ 10 MB (LexNET, seus judicials)",
          lossless: "Sense pèrdua — reestructura sense rasteritzar",
          light: "Lleuger — màxima nitidesa visual",
          strong: "Màxim — reducció extrema",
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
        a: "No. La unió de PDF es realitza 100% de manera local al teu navegador mitjançant JavaScript. Els fitxers mai no viatgen per internet ni s'allotgen al núvol.",
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
        a: "No. L'empaquetament d'imatges a PDF es realitza al 100% de manera local al teu navegador mitjançant JavaScript. Les teves fotos privades mai no abandonen el teu ordinador o telèfon.",
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
        a: "Sí. Tot el procés s'executa 100% de manera local al teu dispositiu mitjançant JavaScript. El teu document mai no s'envia a la xarxa ni a servidors de tercers.",
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
        a: "Sí. L'extracció té lloc íntegrament dins del teu navegador amb JavaScript. Cap document viatja per la xarxa ni s'allotja a servidors externs.",
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
        a: "No. L'anàlisi del fitxer .docx i la generació del PDF tenen lloc 100% de manera local al teu navegador mitjançant llibreries JavaScript de client. Cap text viatja per la xarxa.",
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
        a: "No. La reordenació s'executa al 100% de manera local al teu navegador mitjançant JavaScript. La teva informació roman privada al teu dispositiu.",
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
        a: "No. La combinació i inserció de pàgines es produeix al teu navegador sense pujades al núvol.",
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
    "seoTitle": "Signar PDF en línia gratis amb la teva signatura manuscrita | BreadPDF",
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



export default tools;
