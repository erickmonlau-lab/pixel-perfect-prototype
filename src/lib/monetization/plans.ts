import type { PlanDefinition } from './types';

export const BREADPDF_PLANS: PlanDefinition[] = [
  {
    id: 'free',
    name: { es: 'Gratis', ca: 'Gratis', en: 'Free' },
    tagline: {
      es: 'Todo lo esencial para trabajar con documentos PDF a diario.',
      ca: 'Tot allò essencial per treballar amb documents PDF diàriament.',
      en: 'All essentials for everyday PDF document tasks.',
    },
    status: 'active',
    features: [
      {
        label: {
          es: 'Acceso a las 51 herramientas PDF',
          ca: 'Accés a les 51 eines PDF',
          en: 'Access to all 51 PDF tools',
        },
        included: true,
      },
      {
        label: {
          es: 'Procesamiento client-side seguro y privado',
          ca: 'Processament client-side segur i privat',
          en: 'Secure and private client-side processing',
        },
        included: true,
      },
      {
        label: {
          es: 'Sin registro ni tarjeta requerida',
          ca: 'Sense registre ni targeta requerida',
          en: 'No account or credit card required',
        },
        included: true,
      },
      {
        key: 'no_ads',
        label: {
          es: 'Experiencia 100% libre de anuncios',
          ca: 'Experiència 100% lliure d\'anuncis',
          en: '100% ad-free experience',
        },
        included: false,
      },
      {
        key: 'batch_processing',
        label: {
          es: 'Procesamiento por lotes avanzado',
          ca: 'Processament per lots avançat',
          en: 'Advanced batch processing',
        },
        included: false,
        isComingSoon: true,
      },
      {
        key: 'ai_advanced',
        label: {
          es: 'Herramientas de IA avanzada para documentos',
          ca: 'Eines d\'IA avançada per a documents',
          en: 'Advanced AI document intelligence',
        },
        included: false,
        isComingSoon: true,
      },
    ],
  },
  {
    id: 'premium',
    name: { es: 'Premium', ca: 'Premium', en: 'Premium' },
    tagline: {
      es: 'Para profesionales y personas que usan PDF intensivamente.',
      ca: 'Per a professionals i persones que utilitzen PDF intensivament.',
      en: 'For professionals and power users working intensively with PDFs.',
    },
    badge: { es: 'Más popular', ca: 'Més popular', en: 'Most popular' },
    isPopular: true,
    status: 'coming_soon',
    features: [
      {
        label: {
          es: 'Acceso a las 51 herramientas PDF',
          ca: 'Accés a les 51 eines PDF',
          en: 'Access to all 51 PDF tools',
        },
        included: true,
      },
      {
        key: 'no_ads',
        label: {
          es: 'Experiencia limpia y profesional sin anuncios',
          ca: 'Experiència neta i professional sense anuncis',
          en: 'Clean and professional ad-free experience',
        },
        included: true,
      },
      {
        key: 'batch_processing',
        label: {
          es: 'Procesamiento por lotes multitarea',
          ca: 'Processament per lots multitasca',
          en: 'Multi-file batch processing',
        },
        included: true,
        isComingSoon: true,
      },
      {
        key: 'priority_processing',
        label: {
          es: 'Rendimiento y procesamiento prioritario',
          ca: 'Rendiment i processament prioritari',
          en: 'High performance priority processing',
        },
        included: true,
      },
      {
        key: 'ai_advanced',
        label: {
          es: 'IA avanzada para resumen y extracción',
          ca: 'IA avançada per a resum i extracció',
          en: 'Advanced AI document summarization & extraction',
        },
        included: true,
        isComingSoon: true,
      },
      {
        key: 'workflows',
        label: {
          es: 'Workflows encadenados de documentos',
          ca: 'Workflows encadenats de documents',
          en: 'Chained document workflows',
        },
        included: true,
        isComingSoon: true,
      },
    ],
  },
  {
    id: 'team',
    name: { es: 'Equipos', ca: 'Equips', en: 'Teams' },
    tagline: {
      es: 'Para despachos, agencias y empresas con varios usuarios.',
      ca: 'Per a despatxos, agències i empreses amb diversos usuaris.',
      en: 'For studios, offices and agencies with collaborative workspaces.',
    },
    status: 'coming_soon',
    features: [
      {
        label: {
          es: 'Todo lo incluido en BreadPDF Premium',
          ca: 'Tot allò inclòs a BreadPDF Premium',
          en: 'Everything included in BreadPDF Premium',
        },
        included: true,
      },
      {
        key: 'team_workspaces',
        label: {
          es: 'Espacio de trabajo compartido y roles de miembros',
          ca: 'Espai de treball compartit i rols de membres',
          en: 'Shared team workspace and member roles',
        },
        included: true,
        isComingSoon: true,
      },
      {
        label: {
          es: 'Facturación centralizada con factura desglosada',
          ca: 'Facturació centralitzada amb factura desglossada',
          en: 'Centralized billing and company invoicing',
        },
        included: true,
      },
      {
        label: {
          es: 'Soporte prioritario para empresas',
          ca: 'Suport prioritari per a empreses',
          en: 'Priority business support',
        },
        included: true,
      },
    ],
  },
];
