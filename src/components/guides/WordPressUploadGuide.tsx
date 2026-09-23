import { Link } from "@tanstack/react-router";
import {
  FileDown,
  Image as ImageIcon,
  ShoppingBag,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { type GuideDefinition } from "@/lib/guides/registry";
import { toolPath } from "@/lib/i18n/routing";
import {
  GuideHero,
  GuideInfographic,
  GuideStep,
  GuideCTA,
  GuideMascotCallout,
  GuideFAQ,
  GuideFooterSources,
} from "@/components/guides/editorial/GuideEditorial";

interface GuideArticleProps {
  locale: Locale;
  guide: GuideDefinition;
}

export function WordPressUploadGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[880px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<ShoppingBag className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Ecommerce & Infraestructura Web"
            : isEn
            ? "Ecommerce & Web Infrastructure"
            : "Ecommerce & Infraestructura Web"
        }
        subtitle={
          isCa
            ? "Quan WordPress o WooCommerce rebutgen una pujada, el límit efectiu sol dependre de directives de PHP, del servidor web, del tallafocs (WAF) o del reescalat d'imatges. Aprèn a diagnosticar el coll d'ampolla i optimitzar arxius sense tocar el servidor."
            : isEn
            ? "When WordPress or WooCommerce rejects an upload, limits are governed by PHP directives, web server limits, firewalls (WAF), or image processing bottlenecks. Learn to diagnose the root cause and optimize files locally."
            : "Cuando WordPress o WooCommerce rechazan una subida, el límite efectivo suele depender de directivas de PHP, del servidor web, del firewall (WAF) o del reescalado de imágenes. Aprende a diagnosticar el cuello de botella y optimizar archivos."
        }
        notice={{
          variant: "brand",
          title:
            isCa
              ? "Diagnòstic ràpid en 2 passos"
              : isEn
              ? "Quick 2-Step Diagnostic"
              : "Diagnóstico rápido en 2 pasos",
          description:
            isCa
              ? "1. Si el fitxer pesa desenes de MB: comprimeix el PDF o passa fotos a WebP per evitar caigudes de memòria PHP. 2. Si un fitxer petit (< 500 KB) també falla: revisa permisos a wp-content/uploads o talls de Cloudflare/WAF."
              : isEn
              ? "1. If the file is heavy (>10 MB): compress PDF or convert photos to WebP to bypass PHP memory exhaustion. 2. If tiny files (<500 KB) also fail: inspect uploads directory permissions or WAF security rules."
              : "1. Si el archivo pesa decenas de MB: comprime el PDF o pasa fotos a WebP para evitar sobrecargar la memoria PHP. 2. Si un archivo pequeño (< 500 KB) también falla: revisa permisos en uploads o cortes del firewall.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/subir-archivos-grandes-wordpress-woocommerce.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "Solucionar subida de archivos en WordPress"}
        caption={
          isCa
            ? "Diagrama metodològic: diagnòstic per capes (PHP, servidor web, WAF) i selecció de via de solució."
            : isEn
            ? "Methodological diagram: multi-layer diagnosis (PHP, web server, WAF) and targeted resolution path."
            : "Diagrama metodológico: diagnóstico por capas (PHP, servidor web, WAF) y selección de vía de solución."
        }
      />

      {/* Mascota Corriendo (Rendimiento / Velocidad de carga / Solución rápida) */}
      <GuideMascotCallout
        variant="run"
        background="red"
        badge={isCa ? "Rendiment & Allotjament Web" : isEn ? "Hosting & Performance" : "Rendimiento & Hosting"}
        title={
          isCa
            ? "Optimitza els teus arxius abans de pujar per no saturar el servidor"
            : isEn
            ? "Optimize your assets client-side before uploading to spare your server"
            : "Optimiza tus archivos antes de subir para no saturar el servidor"
        }
        description={
          isCa
            ? "Pujar arxius WebP i PDFs comprimits evita errors de 'memory_limit' en allotjaments compartits i manté la teva botiga WooCommerce volant."
            : isEn
            ? "Uploading pre-compressed WebP and optimized PDFs prevents PHP memory exhaustion on shared hosting, keeping your store fast."
            : "Subir archivos WebP y PDFs comprimidos evita errores de 'memory_limit' en alojamientos compartidos y mantiene tu tienda WooCommerce rápida."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section: Directivas PHP */}
        <section aria-labelledby="php-directives">
          <h2 id="php-directives" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Les 3 directives clau de PHP que limiten les pujades" : isEn ? "The 3 Critical PHP Directives Governing Uploads" : "Las 3 directivas clave de PHP que limitan las subidas"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "A diferència del que molts usuaris creuen, WordPress no imposa un límit rígid pel seu compte: depèn de la configuració de PHP al hosting:"
              : isEn
              ? "Contrary to popular belief, WordPress does not arbitrarily restrict files itself: upload ceilings are dictated by PHP runtime directives:"
              : "A diferencia de lo que muchos usuarios creen, WordPress no impone un límite rígido por su cuenta: depende de la configuración de PHP en el hosting:"}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 text-[14.5px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#EC3C2D]">DIRECTIVA 1</span>
              <h3 className="font-mono font-bold text-[#0F172A] mt-1">upload_max_filesize</h3>
              <p className="text-slate-600 text-[13px] mt-1">El pes individual màxim permès per a un sol fitxer.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#EC3C2D]">DIRECTIVA 2</span>
              <h3 className="font-mono font-bold text-[#0F172A] mt-1">post_max_size</h3>
              <p className="text-slate-600 text-[13px] mt-1">La mida màxima de tota la petició HTTP POST conjunta.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#EC3C2D]">DIRECTIVA 3</span>
              <h3 className="font-mono font-bold text-[#0F172A] mt-1">memory_limit</h3>
              <p className="text-slate-600 text-[13px] mt-1">Memòria RAM assignada a PHP per processar i reescalar fotos.</p>
            </div>
          </div>
        </section>

        {/* Section: Soluciones rápidas */}
        <section className="mt-10" aria-labelledby="quick-solutions">
          <h2 id="quick-solutions" className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {isCa ? "Com resoldre l'error optimitzant els fitxers" : isEn ? "How to Resolve Upload Errors by Optimizing Assets" : "Cómo resolver el error optimizando los archivos"}
          </h2>

          <div className="mt-5 space-y-4">
            {/* Red CTA: Comprimir PDF */}
            <GuideCTA
              to={toolPath(locale, "comprimir-pdf")}
              eyebrow={isCa ? "Catàlegs i Dossiers" : isEn ? "Catalogs & Manuals" : "Catálogos y Dossieres"}
              title={isCa ? "Comprimir catàleg PDF a BreadPDF" : isEn ? "Compress PDF Catalog on BreadPDF" : "Comprimir catálogo PDF en BreadPDF"}
              description={
                isCa
                  ? "Redueix manuals i catàlegs de 30 o 40 MB a menys de 5 MB directament al teu navegador sense pèrdua de text."
                  : isEn
                  ? "Shrink wholesale catalogs from 30–40 MB down below 5 MB locally without losing text fidelity."
                  : "Reduce manuales y catálogos de 30 o 40 MB a menos de 5 MB directamente en tu navegador sin perder nitidez de texto."
              }
              buttonText={isCa ? "Comprimir PDF ara" : isEn ? "Compress PDF now" : "Comprimir PDF ahora"}
              icon={<FileDown className="size-4" />}
              variant="solid-red"
            />

            {/* Red CTA: Imagen a WebP */}
            <GuideCTA
              to={toolPath(locale, "imagen-a-webp")}
              eyebrow={isCa ? "Fotos de Producte" : isEn ? "Product Photos" : "Fotos de Producto"}
              title={isCa ? "Convertir Imatges a WebP a BreadPDF" : isEn ? "Convert Images to WebP on BreadPDF" : "Convertir Imágenes a WebP en BreadPDF"}
              description={
                isCa
                  ? "Transforma fotos pesades de càmera a WebP per estalviar fins a un 75% d'espai i evitar errors de memòria PHP."
                  : isEn
                  ? "Convert heavy camera JPGs to WebP to slash byte size by up to 75% and prevent PHP memory crashes."
                  : "Transforma fotos pesadas de cámara a WebP para ahorrar hasta un 75% de espacio y evitar errores de memoria PHP."
              }
              buttonText={isCa ? "Convertir a WebP ara" : isEn ? "Convert to WebP now" : "Convertir a WebP ahora"}
              icon={<ImageIcon className="size-4" />}
              variant="solid-card"
            />
          </div>
        </section>

        {/* Section: Matriz de actuación */}
        <section className="mt-10" aria-labelledby="ecommerce-table">
          <h2 id="ecommerce-table" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Matriu d'actuació en botigues online" : isEn ? "Action Matrix for Online Stores" : "Matriz de actuación en tiendas online"}
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-[14.5px]">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">{isCa ? "Problema detectat" : isEn ? "Symptom" : "Problema detectado"}</th>
                  <th className="p-3.5">{isCa ? "Primera comprovació" : isEn ? "Initial Check" : "Primera comprobación"}</th>
                  <th className="p-3.5">{isCa ? "Acció recomanada" : isEn ? "Recommended Action" : "Acción recomendada"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3.5 font-semibold text-slate-900">{isCa ? "Imatge de producte molt pesada (> 5 MB)" : isEn ? "Heavy product photo (> 5 MB)" : "Imagen de producto muy pesada (> 5 MB)"}</td>
                  <td className="p-3.5">{isCa ? "Comprovar píxels i format" : isEn ? "Inspect pixel canvas and format" : "Comprobar píxeles y formato"}</td>
                  <td className="p-3.5 text-[#EC3C2D] font-semibold">
                    <Link to={toolPath(locale, "imagen-a-webp")}>{isCa ? "Convertir a WebP a BreadPDF" : isEn ? "Convert to WebP in BreadPDF" : "Convertir a WebP en BreadPDF"}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-900">{isCa ? "Catàleg comercial en PDF rebutjat" : isEn ? "PDF catalog rejected by server" : "Catálogo comercial en PDF rechazado"}</td>
                  <td className="p-3.5">{isCa ? "Verificar límit a Salut del lloc" : isEn ? "Check ceiling in Site Health" : "Verificar límite en Salud del sitio"}</td>
                  <td className="p-3.5 text-[#EC3C2D] font-semibold">
                    <Link to={toolPath(locale, "comprimir-pdf")}>{isCa ? "Comprimir PDF a BreadPDF" : isEn ? "Compress PDF in BreadPDF" : "Comprimir PDF en BreadPDF"}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-900">{isCa ? "Límit de PHP massa reduït (< 8 MB)" : isEn ? "PHP upload limit too low (< 8 MB)" : "Límite de PHP muy bajo (< 8 MB)"}</td>
                  <td className="p-3.5">{isCa ? "Panell de gestió de hosting" : isEn ? "Hosting control panel (cPanel/Plesk)" : "Panel de gestión de hosting"}</td>
                  <td className="p-3.5">{isCa ? "Demanar augment a suport de hosting" : isEn ? "Request PHP limit increase from host" : "Pedir aumento a soporte de hosting"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre pujades a WordPress i WooCommerce" : isEn ? "Frequently Asked Questions" : "Preguntas frecuentes sobre subidas a WordPress y WooCommerce"}
          faqs={faqs}
        />

        {/* Sources */}
        <GuideFooterSources
          title={isCa ? "Fonts oficials i documentació tècnica" : isEn ? "Official Primary Documentation" : "Fuentes oficiales y documentación técnica"}
        >
          <ul className="space-y-1.5 list-none pl-0">
            <li><strong>WordPress Developer Resources:</strong> Advanced Administration Handbook — Modifying PHP Settings.</li>
            <li><strong>WooCommerce Documentation:</strong> Digital/Downloadable Product Handling and File Limits.</li>
            <li><strong>PHP Manual:</strong> Core php.ini directives handling file uploads and memory allocation.</li>
          </ul>
        </GuideFooterSources>
      </div>
    </article>
  );
}
