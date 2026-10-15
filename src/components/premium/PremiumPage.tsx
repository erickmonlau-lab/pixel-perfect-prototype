import * as React from 'react';
import {
  Check,
  Zap,
  Layers,
  ArrowRight,
  Clock,
  ChevronDown,
  Users,
  FileText,
  FileCheck,
  Shield,
  Star,
} from 'lucide-react';
import { PremiumCrownIcon } from '@/components/site/PremiumCrownIcon';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth/auth-context';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import { BRAND_ASSETS } from '@/lib/brand';
import { Breadcrumb } from '@/components/site/Breadcrumb';

// ============================================================
// ICONOGRAFÍA SÓLIDA CANÓNICA (Acción pura, alto contraste, sin opacidades bajas)
// ============================================================

/** 1. Sin anuncios: Rayo con indicador de bloqueo limpio */
function NoAdsActionIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />
    </svg>
  );
}

/** 2. Lotes: Documentos apilados simultáneos */
function BatchActionIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="12" height="15" x="2" y="3" rx="2.5" />
      <path d="M7 19h11a2.5 2.5 0 0 0 2.5-2.5V7" />
      <path d="M11 22h9a2.5 2.5 0 0 0 2.5-2.5V11" />
    </svg>
  );
}

/** 3. Funciones avanzadas: Ajustes precisos / configuración pro */
function AdvancedToolsIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/** 4. Soporte prioritario: Auriculares profesionales con micro */
function PrioritySupportIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

type BillingInterval = 'monthly' | 'yearly';

export function PremiumPage() {
  const { locale } = useLocale();
  const { user } = useAuth();
  const currentLocale = locale === 'ca' || locale === 'en' ? locale : 'es';

  // Toggle de facturación (preparado para Stripe sin afirmaciones falsas de ahorro antes de precios reales)
  const [billingInterval, setBillingInterval] = React.useState<BillingInterval>('yearly');
  // Acordeón FAQ
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  React.useEffect(() => {
    trackMonetizationEvent({
      type: 'premium_view',
      locale: currentLocale,
    });
  }, [currentLocale]);

  const copy = {
    es: {
      heroBadge: 'BREADPDF PREMIUM',
      heroTitle: 'Productividad PDF profesional, sin interrupciones.',
      heroSubtitle:
        'Para quienes trabajan con documentos de forma intensiva y buscan una experiencia sin anuncios, procesamiento por lotes y funciones avanzadas.',
      ctaPrimary: 'Ver planes',
      ctaSecondary: 'Ver qué incluye',
      heroTrustPill:
        '51 herramientas · Sin tarjeta obligatoria · Procesamiento local cuando la herramienta lo permite',
      heroPillAds: 'Sin anuncios',
      heroPillBatch: 'Procesamiento por lotes',

      // Estado de usuario autenticado
      userStatusFree: 'Tu plan actual: Gratuito',
      userStatusPremium: 'Tu plan actual: BreadPDF Premium Activo',

      // Beneficios (4 tarjetas: 1 roja, 1 navy, 1 crema, 1 blanca con acento)
      benefitsTitle: 'Pensado para trabajar más y esperar menos',
      benefitsSubtitle:
        'Cuatro ventajas diseñadas para el trabajo diario con documentos de alto volumen.',
      benefits: [
        {
          id: 'no-ads',
          Icon: NoAdsActionIcon,
          title: 'SIN ANUNCIOS',
          desc: 'Trabaja sin distracciones ni interrupciones visuales. Interfaz 100% limpia y centrada en tus documentos.',
          badge: 'DISPONIBLE',
          theme: {
            cardBg: 'bg-brand-pdf',
            cardBorder: 'border-brand-pdf',
            titleColor: 'text-white',
            descColor: 'text-white/95',
            iconBox: 'bg-white text-brand-pdf',
            badgeBg: 'bg-white text-brand-pdf font-black',
          },
        },
        {
          id: 'batch',
          Icon: BatchActionIcon,
          title: 'PROCESAMIENTO POR LOTES',
          desc: 'Ahorra tiempo procesando decenas de PDFs simultáneamente en una sola ejecución sin repetir pasos.',
          badge: 'PRÓXIMAMENTE',
          theme: {
            cardBg: 'bg-[#0F172A]',
            cardBorder: 'border-[#1E293B]',
            titleColor: 'text-white',
            descColor: 'text-slate-300',
            iconBox: 'bg-brand-pdf text-white',
            badgeBg: 'bg-white text-[#0F172A] font-black',
          },
        },
        {
          id: 'advanced',
          Icon: AdvancedToolsIcon,
          title: 'FUNCIONES AVANZADAS',
          desc: 'Parámetros pro, máxima resolución de renderizado y flujos de ejecución avanzados con un solo clic.',
          badge: 'PRÓXIMAMENTE',
          theme: {
            cardBg: 'bg-[#FDF6ED]',
            cardBorder: 'border-[#F6DFC8]',
            titleColor: 'text-[#421A0F]',
            descColor: 'text-[#693322]',
            iconBox: 'bg-[#592316] text-white',
            badgeBg: 'bg-[#592316] text-white font-black',
          },
        },
        {
          id: 'support',
          Icon: PrioritySupportIcon,
          title: 'SOPORTE PRIORITARIO',
          desc: 'Canal de asistencia directo con el equipo técnico de BreadPDF para resolver incidencias y consultas.',
          badge: 'DISPONIBLE',
          theme: {
            cardBg: 'bg-white',
            cardBorder: 'border-slate-300 shadow-sm border-t-4 border-t-brand-pdf',
            titleColor: 'text-[#0F172A]',
            descColor: 'text-slate-600',
            iconBox: 'bg-[#EC3C2D] text-white',
            badgeBg: 'bg-slate-900 text-white font-black',
          },
        },
      ],

      // Qué cambia con Premium
      workflowTitle: 'Todo lo que cambia cuando pasas a Premium',
      workflowSubtitle:
        'BreadPDF sigue siendo útil gratis. Premium desbloquea una experiencia optimizada para trabajo intensivo.',
      freeColumnTitle: 'Gratis',
      freeColumnSub: 'Tareas individuales y experiencia estándar',
      freeItem1: 'Una tarea tras otra de forma secuencial',
      freeItem2: 'Gestión manual de cada archivo PDF',
      freeItem3: 'Espacios publicitarios estándar en la interfaz',
      premiumColumnTitle: 'Premium',
      premiumColumnSub: 'Trabajo intensivo, sin anuncios, lotes y funciones avanzadas',
      premiumItem1: 'Múltiples PDFs en una sola pasada',
      premiumItem2: 'Entorno 100% libre de anuncios comerciales',
      premiumItem3: 'Procesamiento en lote y soporte preferente',

      flowLabelPipeline: 'Pipeline de trabajo BreadPDF',
      flowStep1Title: 'Varios PDFs cargados',
      flowStep1Desc: 'Selección simultánea de documentos para la tarea',
      flowStep2Title: 'Cola de procesamiento',
      flowStep2Desc: 'Organización secuencial automática en tu navegador',
      flowStep3Title: 'Procesamiento por lotes',
      flowStep3Desc: 'Compresión o conversión coordinada en un único clic',
      flowStep4Title: 'Resultados listos',
      flowStep4Desc: 'Descarga inmediata de los archivos generados',
      flowBadgeAvailable: 'DISPONIBLE',
      flowBadgeUpcoming: 'PRÓXIMAMENTE',

      // Pricing
      pricingTitle: 'Elige cómo quieres trabajar con BreadPDF',
      pricingSubtitle:
        'Transparente y sin sorpresas. Lo básico no se oculta tras un paywall; Premium está pensado para uso frecuente.',
      monthlyLabel: 'Mensual',
      yearlyLabel: 'Anual',
      popularBadge: 'RECOMENDADO',
      teamBadge: 'EMPRESAS',
      ctaFree: 'Empezar gratis',
      ctaPremiumSoon: 'Próximamente',
      ctaTeamSoon: 'Consultar para equipos',
      comingSoonBadge: 'PRÓXIMAMENTE',
      comingSoonNote: 'Pasarela de pagos Stripe en preparación técnica',
      freePrice: '0 €',
      freePeriod: 'para siempre',

      plans: {
        free: {
          name: 'Free',
          tagline: '51 herramientas esenciales para uso cotidiano.',
          features: [
            { text: '51 herramientas PDF completas', included: true },
            { text: 'Uso gratuito sin tarjeta obligatoria', included: true },
            { text: 'Procesamiento local cuando la herramienta lo permite', included: true },
            { text: 'Cuenta opcional y favoritos guardados', included: true },
            { text: 'Sin anuncios', included: false },
            { text: 'Procesamiento por lotes', included: false, isComingSoon: true },
            { text: 'Soporte prioritario', included: false },
          ],
        },
        premium: {
          name: 'Premium',
          tagline: 'Para profesionales y personas que usan PDF intensivamente.',
          features: [
            { text: 'Todo lo incluido en Free', included: true },
            { text: 'Experiencia 100% sin anuncios', included: true },
            { text: 'Procesamiento por lotes', included: true, isComingSoon: true },
            { text: 'Funciones avanzadas de exportación', included: true, isComingSoon: true },
            { text: 'Soporte prioritario por email', included: true },
            { text: 'Futuras automatizaciones y workflows', included: true, isComingSoon: true },
            { text: 'Futuras capacidades de inteligencia documental', included: true, isComingSoon: true },
          ],
        },
        team: {
          name: 'Teams',
          tagline: 'Para despachos, estudios y organizaciones con varios miembros.',
          features: [
            { text: 'Todo lo incluido en BreadPDF Premium', included: true },
            { text: 'Espacio de trabajo compartido', included: true, isComingSoon: true },
            { text: 'Gestión de miembros y roles', included: true, isComingSoon: true },
            { text: 'Facturación centralizada a nombre de empresa', included: true },
            { text: 'Soporte prioritario para equipos', included: true },
            { text: 'Futuras funciones empresariales (SSO)', included: true, isComingSoon: true },
          ],
        },
      },

      // FAQ
      faqTitle: 'Preguntas frecuentes sobre BreadPDF Premium',
      faqSubtitle:
        'Información transparente sobre licencias, procesamiento de documentos y planes comerciales.',
      faqs: [
        {
          q: '¿BreadPDF seguirá siendo gratuito?',
          a: 'Sí. Las 51 herramientas actuales siguen y seguirán siendo gratuitas. Nuestra filosofía es que las funciones esenciales nunca se ocultan detrás de un paywall.',
        },
        {
          q: '¿Qué incluye Premium?',
          a: 'Premium ofrece una experiencia limpia y profesional sin anuncios, procesamiento de múltiples archivos por lotes, funciones avanzadas de rendimiento y soporte prioritario.',
        },
        {
          q: '¿Por qué pagar Premium si las herramientas básicas son gratis?',
          a: 'Para usuarios puntuales, la versión gratuita es suficiente. Premium está diseñado para personas que manejan un volumen alto de documentos y quieren ganar comodidad procesando en bloque y trabajando sin publicidad.',
        },
        {
          q: '¿Hay anuncios en Premium?',
          a: 'No. En cuanto inicias sesión con una cuenta Premium, todos los anuncios quedan completamente eliminados de todas las herramientas.',
        },
        {
          q: '¿Puedo procesar varios archivos a la vez?',
          a: 'El procesamiento por lotes es la característica central que estamos preparando para Premium: permitirá cargar múltiples PDFs y aplicar la misma operación de forma coordinada.',
        },
        {
          q: '¿Mis documentos siguen procesándose localmente?',
          a: 'Sí. Siempre que la herramienta técnicamente lo permite, el procesamiento se ejecuta directamente en la memoria de tu navegador, sin enviar tus documentos a servidores externos.',
        },
        {
          q: '¿Cuándo estará disponible Premium y cómo funcionará el cobro?',
          a: 'Estamos completando las pruebas de conexión con Stripe. Cuando se habilite, admitirá tarjeta de crédito/débito con facturación periódica transparente cancelable en cualquier momento.',
        },
        {
          q: '¿Habrá planes para empresas y despachos?',
          a: 'Sí. El plan Teams permitirá crear un espacio compartido, gestionar miembros del despacho y recibir una única factura fiscal desglosada.',
        },
      ],

      // Final CTA
      finalCtaBadge: 'BREADPDF PREMIUM',
      finalCtaTitle: 'Trabaja con BreadPDF sin interrupciones.',
      finalCtaSubtitle:
        'Acelera tu ritmo diario con una suite rápida, respetuosa con tus documentos y sin interrupciones.',
      finalCtaButton: 'Explorar planes',
    },
    ca: {
      heroBadge: 'BREADPDF PREMIUM',
      heroTitle: 'Productivitat PDF professional, sense interrupcions.',
      heroSubtitle:
        'Per a qui treballa amb documents de forma intensiva i busca una experiència sense anuncis, processament per lots i funcions avançades.',
      ctaPrimary: 'Veure plans',
      ctaSecondary: 'Veure què inclou',
      heroTrustPill:
        '51 eines · Sense targeta obligatòria · Processament local quan l’eina ho permet',
      heroPillAds: 'Sense anuncis',
      heroPillBatch: 'Processament per lots',

      userStatusFree: 'El teu pla actual: Gratuït',
      userStatusPremium: 'El teu pla actual: BreadPDF Premium Actiu',

      benefitsTitle: 'Pensat per treballar més i esperar menys',
      benefitsSubtitle:
        'Quatre avantatges dissenyats per a la feina diària amb documents d’alt volum.',
      benefits: [
        {
          id: 'no-ads',
          Icon: NoAdsActionIcon,
          title: 'SENSE ANUNCIS',
          desc: 'Treballa sense distraccions ni interrupcions visuals. Interfície 100% neta i centrada en els teus documents.',
          badge: 'DISPONIBLE',
          theme: {
            cardBg: 'bg-brand-pdf',
            cardBorder: 'border-brand-pdf',
            titleColor: 'text-white',
            descColor: 'text-white/95',
            iconBox: 'bg-white text-brand-pdf',
            badgeBg: 'bg-white text-brand-pdf font-black',
          },
        },
        {
          id: 'batch',
          Icon: BatchActionIcon,
          title: 'PROCESSAMENT PER LOTS',
          desc: 'Estalvia temps processant desenes de PDFs alhora en una sola execució sense repetir tasques.',
          badge: 'PROPERAMENT',
          theme: {
            cardBg: 'bg-[#0F172A]',
            cardBorder: 'border-[#1E293B]',
            titleColor: 'text-white',
            descColor: 'text-slate-300',
            iconBox: 'bg-brand-pdf text-white',
            badgeBg: 'bg-white text-[#0F172A] font-black',
          },
        },
        {
          id: 'advanced',
          Icon: AdvancedToolsIcon,
          title: 'FUNCIONS AVANÇADES',
          desc: 'Paràmetres pro, màxima resolució de renderització i fluxos avançats amb un sol clic.',
          badge: 'PROPERAMENT',
          theme: {
            cardBg: 'bg-[#FDF6ED]',
            cardBorder: 'border-[#F6DFC8]',
            titleColor: 'text-[#421A0F]',
            descColor: 'text-[#693322]',
            iconBox: 'bg-[#592316] text-white',
            badgeBg: 'bg-[#592316] text-white font-black',
          },
        },
        {
          id: 'support',
          Icon: PrioritySupportIcon,
          title: 'SUPORT PRIORITARI',
          desc: 'Canal d’atenció directa amb l’equip tècnic de BreadPDF per resoldre incidències i consultes.',
          badge: 'DISPONIBLE',
          theme: {
            cardBg: 'bg-white',
            cardBorder: 'border-slate-300 shadow-sm border-t-4 border-t-brand-pdf',
            titleColor: 'text-[#0F172A]',
            descColor: 'text-slate-600',
            iconBox: 'bg-[#EC3C2D] text-white',
            badgeBg: 'bg-slate-900 text-white font-black',
          },
        },
      ],

      workflowTitle: 'Tot allò que canvia quan passes a Premium',
      workflowSubtitle:
        'BreadPDF continua sent útil de franc. Premium desbloqueja una experiència optimitzada per a ús intensiu.',
      freeColumnTitle: 'Gratis',
      freeColumnSub: 'Tasques individuals i experiència estàndard',
      freeItem1: 'Una tasca rere l’altra de forma seqüencial',
      freeItem2: 'Gestió manual de cada fitxer PDF',
      freeItem3: 'Espais publicitaris ordinaris a la interfície',
      premiumColumnTitle: 'Premium',
      premiumColumnSub: 'Treball intensiu, sense anuncis, lots i funcions avançades',
      premiumItem1: 'Múltiples PDFs en una sola acció',
      premiumItem2: 'Entorn 100% lliure d’anuncis comercials',
      premiumItem3: 'Processament per lots i suport preferent',

      flowLabelPipeline: 'Pipeline de treball BreadPDF',
      flowStep1Title: 'Diversos PDFs carregats',
      flowStep1Desc: 'Selecció simultània de documents per a l’operació',
      flowStep2Title: 'Cua de processament',
      flowStep2Desc: 'Organització seqüencial automàtica al teu navegador',
      flowStep3Title: 'Processament per lots',
      flowStep3Desc: 'Compressió o conversió coordinada amb un sol clic',
      flowStep4Title: 'Resultats a punt',
      flowStep4Desc: 'Descàrrega immediata dels fitxers resultants',
      flowBadgeAvailable: 'DISPONIBLE',
      flowBadgeUpcoming: 'PROPERAMENT',

      pricingTitle: 'Tria com vols treballar amb BreadPDF',
      pricingSubtitle:
        'Transparent i sense sorpreses. El bàsic no s’amaga darrere un paywall; Premium està pensat per a ús freqüent.',
      monthlyLabel: 'Mensual',
      yearlyLabel: 'Anual',
      popularBadge: 'RECOMANAT',
      teamBadge: 'EMPRESES',
      ctaFree: 'Començar de franc',
      ctaPremiumSoon: 'Properament',
      ctaTeamSoon: 'Consultar per equips',
      comingSoonBadge: 'PROPERAMENT',
      comingSoonNote: 'Passarel·la de pagaments Stripe en preparació tècnica',
      freePrice: '0 €',
      freePeriod: 'per sempre',

      plans: {
        free: {
          name: 'Free',
          tagline: '51 eines essencials per a l’ús quotidià.',
          features: [
            { text: '51 eines PDF completes', included: true },
            { text: 'Ús gratuït sense targeta obligatòria', included: true },
            { text: 'Processament local quan l’eina ho permet', included: true },
            { text: 'Compte opcional i favorits desats', included: true },
            { text: 'Sense anuncis', included: false },
            { text: 'Processament per lots', included: false, isComingSoon: true },
            { text: 'Suport prioritari', included: false },
          ],
        },
        premium: {
          name: 'Premium',
          tagline: 'Per a professionals i persones que utilitzen PDF intensivament.',
          features: [
            { text: 'Tot allò inclòs a Free', included: true },
            { text: 'Experiència 100% sense anuncis', included: true },
            { text: 'Processament per lots', included: true, isComingSoon: true },
            { text: 'Funcions avançades d’exportació', included: true, isComingSoon: true },
            { text: 'Suport prioritari per correu', included: true },
            { text: 'Futures automatitzacions i workflows', included: true, isComingSoon: true },
            { text: 'Futures capacitats d’intel·ligència documental', included: true, isComingSoon: true },
          ],
        },
        team: {
          name: 'Teams',
          tagline: 'Per a despatxos, estudis i organitzacions amb diversos membres.',
          features: [
            { text: 'Tot allò inclòs a BreadPDF Premium', included: true },
            { text: 'Espai de treball compartit', included: true, isComingSoon: true },
            { text: 'Gestió de membres i rols', included: true, isComingSoon: true },
            { text: 'Facturació centralitzada a nom d’empresa', included: true },
            { text: 'Suport prioritari per a equips', included: true },
            { text: 'Futures funcions empresarials (SSO)', included: true, isComingSoon: true },
          ],
        },
      },

      faqTitle: 'Preguntes freqüents sobre BreadPDF Premium',
      faqSubtitle:
        'Informació transparent sobre llicències, processament de documents i plans comercials.',
      faqs: [
        {
          q: 'BreadPDF continuarà sent gratuït?',
          a: 'Sí. Totes les 51 eines actuals continuen i continuaran sent gratuïtes. La nostra filosofia és no amagar les funcions essencials darrere cap paywall.',
        },
        {
          q: 'Què inclou Premium?',
          a: 'Premium ofereix un entorn net sense anuncis, processament per lots per a múltiples fitxers alhora, funcions avançades de rendiment i suport prioritari.',
        },
        {
          q: 'Per què pagar Premium si les eines bàsiques són gratis?',
          a: 'Per a ús esporàdic, la versió gratuïta és suficient. Premium està dissenyat per a persones que gestionen un volum intensiu de fitxers i volen guanyar comoditat.',
        },
        {
          q: 'Hi ha anuncis a Premium?',
          a: 'No. En iniciar sessió amb compte Premium, tots els anuncis queden eliminats de la plataforma.',
        },
        {
          q: 'Puc processar diversos fitxers alhora?',
          a: 'El processament per lots és la funció clau de Premium: permetrà seleccionar múltiples PDFs i aplicar la mateixa operació coordinadament.',
        },
        {
          q: 'Els meus documents continuen processant-se localment?',
          a: 'Sí. Sempre que l’eina ho permet tècnicament, el processament es fa directament a la memòria del navegador sense enviar fitxers a servidors externs.',
        },
        {
          q: 'Quan estarà disponible i com es pagarà?',
          a: 'Estem acabant les proves d’integració amb Stripe. Quan s’activi, admetrà targeta amb cobrament periòdic i cancel·lació en qualsevol moment.',
        },
        {
          q: 'Hi haurà plans per a empreses i despatxos?',
          a: 'Sí. El pla Teams permetrà crear un espai comú, gestionar accessos d’equip i rebre una factura unificada.',
        },
      ],

      finalCtaBadge: 'BREADPDF PREMIUM',
      finalCtaTitle: 'Treballa amb BreadPDF sense interrupcions.',
      finalCtaSubtitle:
        'Accelera el teu ritme diari amb una suite ràpida, respectuosa amb els teus documents i sense interrupcions.',
      finalCtaButton: 'Explorar plans',
    },
    en: {
      heroBadge: 'BREADPDF PREMIUM',
      heroTitle: 'Professional PDF productivity, without interruptions.',
      heroSubtitle:
        'For users who work intensively with documents and seek an ad-free experience, batch processing, and advanced features.',
      ctaPrimary: 'View plans',
      ctaSecondary: 'See what is included',
      heroTrustPill:
        '51 tools · No credit card required · In-browser processing whenever possible',
      heroPillAds: 'Ad-free',
      heroPillBatch: 'Batch processing',

      userStatusFree: 'Your current plan: Free',
      userStatusPremium: 'Your current plan: BreadPDF Premium Active',

      benefitsTitle: 'Built to do more and wait less',
      benefitsSubtitle:
        'Four key advantages tailored for high-frequency daily document work.',
      benefits: [
        {
          id: 'no-ads',
          Icon: NoAdsActionIcon,
          title: 'AD-FREE EXPERIENCE',
          desc: 'Work without commercial distractions or banners. A 100% clean interface focused solely on your documents.',
          badge: 'AVAILABLE',
          theme: {
            cardBg: 'bg-brand-pdf',
            cardBorder: 'border-brand-pdf',
            titleColor: 'text-white',
            descColor: 'text-white/95',
            iconBox: 'bg-white text-brand-pdf',
            badgeBg: 'bg-white text-brand-pdf font-black',
          },
        },
        {
          id: 'batch',
          Icon: BatchActionIcon,
          title: 'BATCH PROCESSING',
          desc: 'Save hours by processing dozens of PDFs concurrently in a single automated pass without repeating manual steps.',
          badge: 'COMING SOON',
          theme: {
            cardBg: 'bg-[#0F172A]',
            cardBorder: 'border-[#1E293B]',
            titleColor: 'text-white',
            descColor: 'text-slate-300',
            iconBox: 'bg-brand-pdf text-white',
            badgeBg: 'bg-white text-[#0F172A] font-black',
          },
        },
        {
          id: 'advanced',
          Icon: AdvancedToolsIcon,
          title: 'ADVANCED FEATURES',
          desc: 'Calibrated pro settings, maximum render fidelity, and advanced multi-task pipelines with a single click.',
          badge: 'COMING SOON',
          theme: {
            cardBg: 'bg-[#FDF6ED]',
            cardBorder: 'border-[#F6DFC8]',
            titleColor: 'text-[#421A0F]',
            descColor: 'text-[#693322]',
            iconBox: 'bg-[#592316] text-white',
            badgeBg: 'bg-[#592316] text-white font-black',
          },
        },
        {
          id: 'support',
          Icon: PrioritySupportIcon,
          title: 'PRIORITY SUPPORT',
          desc: 'Direct communication channel with the BreadPDF core technical team to resolve queries and technical issues.',
          badge: 'AVAILABLE',
          theme: {
            cardBg: 'bg-white',
            cardBorder: 'border-slate-300 shadow-sm border-t-4 border-t-brand-pdf',
            titleColor: 'text-[#0F172A]',
            descColor: 'text-slate-600',
            iconBox: 'bg-[#EC3C2D] text-white',
            badgeBg: 'bg-slate-900 text-white font-black',
          },
        },
      ],

      workflowTitle: 'What changes when you upgrade to Premium',
      workflowSubtitle:
        'BreadPDF remains free and useful. Premium unlocks a streamlined workspace tailored for intensive work.',
      freeColumnTitle: 'Free',
      freeColumnSub: 'Single tasks and standard experience',
      freeItem1: 'One task at a time sequentially',
      freeItem2: 'Manual handling for each individual file',
      freeItem3: 'Standard ad placements across tools',
      premiumColumnTitle: 'Premium',
      premiumColumnSub: 'Intensive work, zero ads, batch operations, and pro settings',
      premiumItem1: 'Multiple PDFs handled in one run',
      premiumItem2: '100% ad-free and distraction-free workspace',
      premiumItem3: 'Concurrent batch engine and priority support',

      flowLabelPipeline: 'BreadPDF Work Pipeline',
      flowStep1Title: 'Multiple PDFs loaded',
      flowStep1Desc: 'Simultaneous file selection for the operation',
      flowStep2Title: 'Processing queue',
      flowStep2Desc: 'Automated sequential arrangement in your browser',
      flowStep3Title: 'Batch execution',
      flowStep3Desc: 'Coordinated compression or conversion in a single click',
      flowStep4Title: 'Results ready',
      flowStep4Desc: 'Instant download of generated documents',
      flowBadgeAvailable: 'AVAILABLE',
      flowBadgeUpcoming: 'COMING SOON',

      pricingTitle: 'Choose how you want to work with BreadPDF',
      pricingSubtitle:
        'Clear terms with zero hidden friction. Essentials remain free; Premium is designed for recurring, high-volume work.',
      monthlyLabel: 'Monthly',
      yearlyLabel: 'Yearly',
      popularBadge: 'RECOMMENDED',
      teamBadge: 'TEAMS',
      ctaFree: 'Start for free',
      ctaPremiumSoon: 'Coming soon',
      ctaTeamSoon: 'Contact for teams',
      comingSoonBadge: 'COMING SOON',
      comingSoonNote: 'Stripe billing gateway under technical preparation',
      freePrice: '€0',
      freePeriod: 'forever',

      plans: {
        free: {
          name: 'Free',
          tagline: '51 essential PDF tools for everyday tasks.',
          features: [
            { text: '51 complete PDF tools', included: true },
            { text: 'Free forever with no card required', included: true },
            { text: 'In-browser processing whenever possible', included: true },
            { text: 'Optional account with saved favorites', included: true },
            { text: 'Ad-free experience', included: false },
            { text: 'Batch processing', included: false, isComingSoon: true },
            { text: 'Priority support', included: false },
          ],
        },
        premium: {
          name: 'Premium',
          tagline: 'For professionals and power users working intensively with PDFs.',
          features: [
            { text: 'Everything included in Free', included: true },
            { text: '100% ad-free experience', included: true },
            { text: 'Batch processing', included: true, isComingSoon: true },
            { text: 'Advanced export features', included: true, isComingSoon: true },
            { text: 'Priority email support', included: true },
            { text: 'Future automated workflows & chaining', included: true, isComingSoon: true },
            { text: 'Future document intelligence capabilities', included: true, isComingSoon: true },
          ],
        },
        team: {
          name: 'Teams',
          tagline: 'For agencies, legal studios, and offices with multiple members.',
          features: [
            { text: 'Everything included in BreadPDF Premium', included: true },
            { text: 'Shared team workspace', included: true, isComingSoon: true },
            { text: 'Member seat & role management', included: true, isComingSoon: true },
            { text: 'Centralized company billing & invoice', included: true },
            { text: 'Priority team support', included: true },
            { text: 'Future enterprise capabilities (SSO)', included: true, isComingSoon: true },
          ],
        },
      },

      faqTitle: 'Frequently asked questions about BreadPDF Premium',
      faqSubtitle:
        'Transparent details regarding plans, document processing, and commercial availability.',
      faqs: [
        {
          q: 'Will BreadPDF remain free to use?',
          a: 'Yes. All 51 existing tools are and will remain free. Our core philosophy is that essential utilities are never gated behind a paywall.',
        },
        {
          q: 'What does BreadPDF Premium offer?',
          a: 'Premium provides a clean ad-free environment, batch operations for multiple files at once, pro configuration options, and priority support.',
        },
        {
          q: 'Why should I pay for Premium if the tools are free?',
          a: 'For occasional tasks, the free plan is all you need. Premium is crafted for people handling high volumes of PDFs who need batching speed and an uncluttered workflow.',
        },
        {
          q: 'Are there ads in Premium?',
          a: 'None. Once you log in with a Premium account, advertising is disabled across all 51 tools.',
        },
        {
          q: 'Can I process multiple files at once?',
          a: 'Batch processing is the core feature being rolled out for Premium: it will enable you to load batches of PDFs and run operations simultaneously.',
        },
        {
          q: 'Are my documents still processed locally?',
          a: 'Yes. Whenever technically possible, processing runs directly inside your browser memory without uploading your documents to external servers.',
        },
        {
          q: 'When will Premium launch and which payment methods will be accepted?',
          a: 'We are completing final tests with Stripe. At launch, it will accept credit/debit cards with transparent subscription billing cancelable at any time.',
        },
        {
          q: 'Will there be plans for teams and businesses?',
          a: 'Yes. The Teams tier will support member seats, shared company workspaces, and consolidated corporate invoicing.',
        },
      ],

      finalCtaBadge: 'BREADPDF PREMIUM',
      finalCtaTitle: 'Work with BreadPDF without interruptions.',
      finalCtaSubtitle:
        'Power your daily rhythm with a fast, private, and honest PDF toolkit crafted for serious work.',
      finalCtaButton: 'Explore plans',
    },
  }[currentLocale];

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBenefits = () => {
    const el = document.getElementById('benefits');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-foreground font-sans selection:bg-[#EC3C2D]/15 selection:text-[#EC3C2D]">
      {/* ============================================================
          1. HERO COMERCIAL PREMIUM: 2 Columnas, Mascota Integrada, Fondo Controlado
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-slate-200/90 bg-white py-12 sm:py-16 lg:py-20">
        {/* Iluminación perimetral suave: rojo sutil a la izquierda, navy tenue a la derecha */}
        <div
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 size-96 rounded-full bg-[#EC3C2D]/6 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 size-96 rounded-full bg-[#0F172A]/5 blur-[110px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <Breadcrumb items={[{ label: 'Premium' }]} />
            {user && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-[12px] font-bold text-slate-700 border border-slate-200">
                {user.isPremium ? (
                  <>
                    <PremiumCrownIcon className="size-3.5 text-brand-pdf" />
                    <span>{copy.userStatusPremium}</span>
                  </>
                ) : (
                  <>
                    <span className="size-2 rounded-full bg-slate-400" />
                    <span>{copy.userStatusFree}</span>
                  </>
                )}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Columna Izquierda: Mensaje y CTA */}
            <div className="lg:col-span-7 text-left">
              {/* Badge oficial con corona */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-pdf px-4 py-1.5 text-[11.5px] sm:text-[12px] font-black uppercase tracking-widest text-white shadow-xs mb-5">
                <PremiumCrownIcon className="size-3.5 text-white" />
                <span>{copy.heroBadge}</span>
              </div>

              {/* H1 Comercial */}
              <h1 className="text-[2.6rem] sm:text-[3.3rem] lg:text-[3.85rem] font-black tracking-[-0.035em] text-[#0F172A] leading-[1.07]">
                {copy.heroTitle}
              </h1>

              {/* Subtítulo */}
              <p className="mt-4 max-w-2xl text-[16.5px] sm:text-[18.5px] leading-[1.55] text-slate-600 font-normal">
                {copy.heroSubtitle}
              </p>

              {/* Botones de acción */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5">
                <Button
                  size="lg"
                  onClick={scrollToPricing}
                  className="h-13 sm:h-14 px-8 rounded-2xl bg-brand-pdf text-white hover:bg-[#D93426] font-extrabold text-[16px] shadow-[0_8px_24px_rgba(236,60,45,0.32)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight className="size-5 ml-2 stroke-[2.5]" />
                </Button>

                <button
                  type="button"
                  onClick={scrollToBenefits}
                  className="group inline-flex items-center justify-center gap-1.5 py-3 px-2 text-[15px] font-bold text-slate-700 hover:text-brand-pdf transition-colors cursor-pointer"
                >
                  <span>{copy.ctaSecondary}</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </button>
              </div>

              {/* Línea de Confianza (Claims honestos) */}
              <div className="mt-7 flex items-center gap-2.5 text-xs sm:text-[13.5px] font-semibold text-slate-500">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xs">
                  <Check className="size-3 stroke-[3]" />
                </span>
                <span>{copy.heroTrustPill}</span>
              </div>
            </div>

            {/* Columna Derecha: Mascota BreadPDF integrada (run) sin marco blanco */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative flex items-center justify-center select-none pointer-events-none">
                <img
                  src={BRAND_ASSETS.mascots.run}
                  alt="BreadPDF Premium Mascot"
                  width={429}
                  height={422}
                  className="relative z-10 w-auto h-[230px] sm:h-[280px] lg:h-[330px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105"
                  loading="eager"
                  decoding="async"
                />

                {/* Tarjeta flotante izquierda sólida: Sin anuncios */}
                <div className="absolute -left-3 sm:-left-6 top-10 z-20 hidden sm:flex items-center gap-2 rounded-2xl bg-white border border-slate-200/90 px-3.5 py-2 shadow-md">
                  <span className="flex size-7 items-center justify-center rounded-xl bg-brand-pdf text-white">
                    <NoAdsActionIcon className="size-4" />
                  </span>
                  <span className="text-[12.5px] font-black text-[#0F172A] tracking-tight">
                    {copy.heroPillAds}
                  </span>
                </div>

                {/* Tarjeta flotante derecha sólida: Procesamiento por lotes */}
                <div className="absolute -right-2 sm:-right-6 bottom-8 z-20 hidden sm:flex items-center gap-2 rounded-2xl bg-slate-900 text-white border border-slate-800 px-3.5 py-2 shadow-md">
                  <span className="flex size-7 items-center justify-center rounded-xl bg-brand-pdf text-white">
                    <BatchActionIcon className="size-4" />
                  </span>
                  <span className="text-[12px] font-bold tracking-tight">
                    {copy.heroPillBatch}
                  </span>
                </div>
              </div>

              {/* Pastilla inferior unificada para tablet/móvil */}
              <div className="mt-4 flex sm:hidden items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 shadow-sm text-[12px] font-bold">
                <span className="size-2 rounded-full bg-brand-pdf" />
                <span>{copy.heroPillAds} · {copy.heroPillBatch}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. SECCIÓN BENEFICIOS: 4 Tarjetas Sólidas, Opacas, Alto Contraste
          (1 roja, 1 navy, 1 crema, 1 blanca con acento)
          ============================================================ */}
      <section id="benefits" className="border-b border-slate-200/90 py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-11">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A]">
              {copy.benefitsTitle}
            </h2>
            <p className="mt-2.5 text-[15.5px] sm:text-[17px] text-slate-600 leading-relaxed font-normal">
              {copy.benefitsSubtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {copy.benefits.map((b) => {
              const Icon = b.Icon;
              const theme = b.theme;
              return (
                <div
                  key={b.id}
                  className={`rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${theme.cardBg} ${theme.cardBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`inline-flex size-13 items-center justify-center rounded-2xl shadow-xs ${theme.iconBox}`}
                      >
                        <Icon className="size-7 stroke-[2.3]" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${theme.badgeBg}`}
                      >
                        {b.badge}
                      </span>
                    </div>
                    <h3 className={`text-[19px] font-black tracking-tight mb-2.5 ${theme.titleColor}`}>
                      {b.title}
                    </h3>
                    <p className={`text-[14.5px] leading-relaxed font-normal ${theme.descColor}`}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. SECCIÓN 'QUÉ CAMBIA CON PREMIUM': Visual Pipeline de Productividad
          ============================================================ */}
      <section className="border-b border-slate-200/90 py-14 sm:py-20 bg-[#FAFBFD]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Columna Izquierda: Explicación de cambio */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-4">
                <Layers className="size-3 text-brand-pdf" />
                <span>FLUIDEZ DOCUMENTAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] leading-tight">
                {copy.workflowTitle}
              </h2>
              <p className="mt-3.5 text-[15.5px] sm:text-[16.5px] text-slate-600 leading-relaxed font-normal">
                {copy.workflowSubtitle}
              </p>

              {/* Lista comparativa limpia */}
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200 p-4.5 shadow-xs">
                  <div className="flex items-center gap-2 text-[14px] font-black text-slate-600 uppercase tracking-wide">
                    <span className="size-2 rounded-full bg-slate-400" />
                    <span>{copy.freeColumnTitle} · {copy.freeColumnSub}</span>
                  </div>
                  <ul className="mt-2.5 space-y-1 text-[13.5px] text-slate-600">
                    <li>• {copy.freeItem1}</li>
                    <li>• {copy.freeItem2}</li>
                    <li>• {copy.freeItem3}</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white border-2 border-brand-pdf p-4.5 shadow-xs">
                  <div className="flex items-center gap-2 text-[14px] font-black text-brand-pdf uppercase tracking-wide">
                    <PremiumCrownIcon className="size-3.5 text-brand-pdf" />
                    <span>{copy.premiumColumnTitle} · {copy.premiumColumnSub}</span>
                  </div>
                  <ul className="mt-2.5 space-y-1 text-[13.5px] text-[#0F172A] font-semibold">
                    <li>✓ {copy.premiumItem1}</li>
                    <li>✓ {copy.premiumItem2}</li>
                    <li>✓ {copy.premiumItem3}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Columna Derecha: UI Visual del Pipeline (Fidedigna a BreadPDF) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-brand-pdf text-white font-black text-sm">
                      PDF
                    </span>
                    <div>
                      <div className="text-[14.5px] font-black text-[#0F172A]">
                        {copy.flowLabelPipeline}
                      </div>
                      <div className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {copy.flowBadgeAvailable}: Sin anuncios
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10.5px] font-black uppercase text-slate-600 border border-slate-200">
                    {copy.flowBadgeUpcoming}
                  </span>
                </div>

                {/* Pasos del pipeline gráfico */}
                <div className="mt-6 space-y-3.5">
                  {/* Paso 1: Varios PDFs */}
                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 sm:p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 font-black text-slate-800 text-sm shadow-2xs">
                      1
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#0F172A]">{copy.flowStep1Title}</div>
                      <div className="text-[12px] text-slate-500 truncate">{copy.flowStep1Desc}</div>
                    </div>
                    <FileText className="size-5 text-slate-400 shrink-0" />
                  </div>

                  <div className="flex justify-center -my-2">
                    <span className="text-slate-300 font-black text-xs">↓</span>
                  </div>

                  {/* Paso 2: Cola de procesamiento */}
                  <div className="flex items-center gap-4 rounded-2xl bg-[#FFFBF0] border border-[#FDE6B0] p-3.5 sm:p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#D97706] font-black text-white text-sm shadow-2xs">
                      2
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#0F172A]">{copy.flowStep2Title}</div>
                      <div className="text-[12px] text-[#92400E] truncate">{copy.flowStep2Desc}</div>
                    </div>
                    <Layers className="size-5 text-[#D97706] shrink-0" />
                  </div>

                  <div className="flex justify-center -my-2">
                    <span className="text-slate-300 font-black text-xs">↓</span>
                  </div>

                  {/* Paso 3: Procesamiento por lotes */}
                  <div className="flex items-center gap-4 rounded-2xl bg-[#FFF6F5] border border-[#FFD9D5] p-3.5 sm:p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-pdf font-black text-white text-sm shadow-2xs">
                      3
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#0F172A]">{copy.flowStep3Title}</div>
                      <div className="text-[12px] text-[#A82B20] truncate">{copy.flowStep3Desc}</div>
                    </div>
                    <BatchActionIcon className="size-5 text-brand-pdf shrink-0" />
                  </div>

                  <div className="flex justify-center -my-2">
                    <span className="text-slate-300 font-black text-xs">↓</span>
                  </div>

                  {/* Paso 4: Resultados listos */}
                  <div className="flex items-center gap-4 rounded-2xl bg-[#0F172A] text-white p-3.5 sm:p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 font-black text-white text-sm shadow-2xs">
                      4
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-white">{copy.flowStep4Title}</div>
                      <div className="text-[12px] text-slate-300 truncate">{copy.flowStep4Desc}</div>
                    </div>
                    <FileCheck className="size-5 text-emerald-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. SECCIÓN PRICING: Toggle Mensual/Anual, 3 Niveles Preparados para Stripe
          ============================================================ */}
      <section id="pricing" className="border-b border-slate-200/90 py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-[#0F172A]">
              {copy.pricingTitle}
            </h2>
            <p className="mt-2.5 text-[15.5px] sm:text-[17px] text-slate-600 leading-relaxed font-normal">
              {copy.pricingSubtitle}
            </p>

            {/* Toggle Mensual / Anual (sin claims ficticios de ahorro) */}
            <div className="mt-8 inline-flex items-center gap-1 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingInterval('monthly')}
                className={`rounded-xl px-5 py-2 text-[13.5px] font-extrabold transition-all cursor-pointer ${
                  billingInterval === 'monthly'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {copy.monthlyLabel}
              </button>
              <button
                type="button"
                onClick={() => setBillingInterval('yearly')}
                className={`rounded-xl px-5 py-2 text-[13.5px] font-extrabold transition-all cursor-pointer ${
                  billingInterval === 'yearly'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {copy.yearlyLabel}
              </button>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-3 items-stretch max-w-6xl mx-auto">
            {/* PLAN 1: FREE */}
            <div className="relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 border border-slate-200/90 bg-white shadow-sm transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[23px] font-black text-[#0F172A] tracking-tight">
                    {copy.plans.free.name}
                  </h3>
                  <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide border border-emerald-200">
                    GRATIS
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-slate-500 min-h-[40px] leading-snug font-normal">
                  {copy.plans.free.tagline}
                </p>

                <div className="mt-5 mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-2">
                  <span className="text-[2.7rem] font-black text-[#0F172A] tracking-tight">
                    {copy.freePrice}
                  </span>
                  <span className="text-[14px] font-bold text-slate-500">/{copy.freePeriod}</span>
                </div>

                <ul className="space-y-3 text-[14px]">
                  {copy.plans.free.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`size-4.5 shrink-0 mt-0.5 ${
                          f.included ? 'text-emerald-600 stroke-[2.8]' : 'text-slate-300'
                        }`}
                      />
                      <span
                        className={
                          f.included
                            ? 'text-slate-800 font-semibold'
                            : 'text-slate-400 line-through font-normal'
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 rounded-xl font-extrabold border-slate-300 text-slate-800 hover:bg-slate-50 text-[15px] cursor-pointer"
                >
                  <a href={`/${currentLocale}`}>{copy.ctaFree}</a>
                </Button>
              </div>
            </div>

            {/* PLAN 2: PREMIUM (PROTAGONISTA) */}
            <div className="relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 border-2 border-brand-pdf bg-white shadow-[0_16px_40px_rgba(236,60,45,0.14)] lg:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-pdf px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-xs flex items-center gap-1.5">
                <PremiumCrownIcon className="size-3 text-white" />
                <span>{copy.popularBadge}</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[23px] font-black text-[#0F172A] tracking-tight">
                      {copy.plans.premium.name}
                    </h3>
                    <PremiumCrownIcon className="size-4 text-brand-pdf" />
                  </div>
                  <span className="rounded-md bg-red-50 text-brand-pdf px-2.5 py-1 text-[11px] font-black uppercase tracking-wide border border-red-100">
                    PRO
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-slate-500 min-h-[40px] leading-snug font-normal">
                  {copy.plans.premium.tagline}
                </p>

                <div className="mt-5 mb-6 pb-6 border-b border-slate-100 space-y-1.5">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-brand-pdf/10 text-brand-pdf font-black px-3.5 py-1.5 text-[15px]">
                    <span className="size-2 rounded-full bg-brand-pdf animate-pulse" />
                    <span>{copy.ctaPremiumSoon}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium">{copy.comingSoonNote}</p>
                </div>

                <ul className="space-y-3 text-[14px]">
                  {copy.plans.premium.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-4.5 shrink-0 mt-0.5 text-brand-pdf stroke-[2.8]" />
                      <span className="text-slate-800 font-semibold">
                        {f.text}
                        {f.isComingSoon && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                            Pronto
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Button
                  disabled
                  className="w-full h-12 rounded-xl font-black bg-brand-pdf text-white cursor-not-allowed opacity-95 text-[15px] shadow-sm flex items-center justify-center gap-2"
                >
                  <Clock className="size-4" />
                  <span>{copy.ctaPremiumSoon}</span>
                </Button>
              </div>
            </div>

            {/* PLAN 3: TEAMS */}
            <div className="relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 border border-slate-200/90 bg-white shadow-sm transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[23px] font-black text-[#0F172A] tracking-tight">
                    {copy.plans.team.name}
                  </h3>
                  <span className="rounded-md bg-slate-100 text-slate-700 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide border border-slate-200">
                    {copy.teamBadge}
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-slate-500 min-h-[40px] leading-snug font-normal">
                  {copy.plans.team.tagline}
                </p>

                <div className="mt-5 mb-6 pb-6 border-b border-slate-100 space-y-1.5">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 text-slate-800 font-black px-3.5 py-1.5 text-[15px]">
                    <span className="size-2 rounded-full bg-slate-600" />
                    <span>{copy.ctaTeamSoon}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium">{copy.comingSoonNote}</p>
                </div>

                <ul className="space-y-3 text-[14px]">
                  {copy.plans.team.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-4.5 shrink-0 mt-0.5 text-slate-800 stroke-[2.8]" />
                      <span className="text-slate-800 font-semibold">
                        {f.text}
                        {f.isComingSoon && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                            Pronto
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Button
                  disabled
                  variant="outline"
                  className="w-full h-12 rounded-xl font-bold border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed text-[15px] flex items-center justify-center gap-2"
                >
                  <Users className="size-4" />
                  <span>{copy.ctaTeamSoon}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. FAQ SECTION: 8 Preguntas Clave y Honestas
          ============================================================ */}
      <section className="py-14 sm:py-18 bg-[#FAFBFD] border-b border-slate-200/90">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A]">
              {copy.faqTitle}
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] text-slate-600 font-normal">
              {copy.faqSubtitle}
            </p>
          </div>

          <div className="space-y-3">
            {copy.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-brand-pdf/40 bg-[#FFF5F4] shadow-xs'
                      : 'border-slate-200/90 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-5.5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pdf/30 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors ${
                          isOpen
                            ? 'bg-brand-pdf text-white shadow-2xs'
                            : 'bg-[#FEECEB] text-brand-pdf'
                        }`}
                      >
                        ?
                      </span>
                      <h3 className="text-[16px] sm:text-[17.5px] font-extrabold text-[#0F172A] leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`size-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-pdf' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-5.5 pb-5 pt-1 text-[15px] sm:text-[15.5px] text-slate-700 leading-relaxed pl-16">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. FINAL CTA SECTION: Fondo Navy Sólido + Mascota Celebrando
          ============================================================ */}
      <section className="py-14 sm:py-18 bg-[#0F172A] text-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="rounded-3xl bg-[#1E293B] border border-slate-700/80 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
            <div className="max-w-xl text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pdf px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white mb-4">
                <PremiumCrownIcon className="size-3 text-white" />
                <span>{copy.finalCtaBadge}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black tracking-tight text-white leading-tight">
                {copy.finalCtaTitle}
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16.5px] text-slate-300 leading-relaxed font-normal">
                {copy.finalCtaSubtitle}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={scrollToPricing}
                  className="h-13 px-8 rounded-2xl bg-brand-pdf text-white hover:bg-[#D93426] font-extrabold text-[15.5px] shadow-[0_8px_24px_rgba(236,60,45,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{copy.finalCtaButton}</span>
                  <ArrowRight className="size-4.5 ml-2 stroke-[2.5]" />
                </Button>
              </div>
            </div>

            {/* Mascota Celebrando (celebrate): Alegre, integrada, sin caja blanca */}
            <div className="shrink-0 select-none pointer-events-none">
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt="BreadPDF Celebrating Mascot"
                width={260}
                height={260}
                className="w-auto h-[180px] sm:h-[220px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
