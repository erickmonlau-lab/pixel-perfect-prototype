import type { Locale } from "@/lib/i18n/config";

export interface WorkflowSuggestion {
  targetToolSlug: string;
  badge: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  cta: Record<Locale, string>;
}

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
};
