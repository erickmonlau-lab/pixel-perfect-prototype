import { Link } from "@tanstack/react-router";
import {
  Image as ImageIcon,
  ShoppingBag,
  ExternalLink,
  Layers,
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

export function EcommerceWebpGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="mx-auto max-w-[960px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<ShoppingBag className="size-4 text-slate-700" />}
        badgeLabel={
          isCa
            ? "Ecommerce & Rendiment Web"
            : isEn
            ? "Ecommerce & Web Performance"
            : "Ecommerce & Rendimiento Web"
        }
        subtitle={
          isCa
            ? "A l'hora de publicar imatges de producte, banners o logotips a una botiga online, escollir el format adequat entre WebP, JPG i PNG determina l'equilibri exacte entre nitidesa visual i velocitat de descàrrega en mòbils."
            : isEn
            ? "When publishing product galleries, hero banners, or brand assets in an online store, choosing between WebP, JPG, and PNG dictates the balance between visual fidelity and mobile load speeds."
            : "A la hora de publicar imágenes de producto, banners o logotipos en una tienda online, escoger el formato adecuado entre WebP, JPG y PNG determina el equilibrio exacto entre nitidez visual y velocidad de descarga en móviles."
        }
        notice={{
          variant: "brand",
          title:
            isCa
              ? "Criteri ràpid de format"
              : isEn
              ? "Quick Format Decision Rule"
              : "Criterio rápido de formato",
          description:
            isCa
              ? "• JPG: fotografies estàndard amb fons opac. • PNG: logotips i vectors que requereixen puresa estricta. • WebP: siluetes amb transparència i catàlegs mòbils on cada kilobyte compta."
              : isEn
              ? "• JPG: standard photos on solid backgrounds. • PNG: logos and graphics needing strict lossless purity. • WebP: transparent cutouts and dense mobile catalog grids."
              : "• JPG: fotografías estándar sobre fondos sólidos. • PNG: logotipos y gráficos que requieren pureza matemática. • WebP: siluetas recortadas con transparencia y catálogos móviles.",
        }}
      />

      {/* Editorial Infographic */}
      <GuideInfographic
        src="/webp-vs-jpg-png-ecommerce.svg"
        alt={guide.image?.alt[locale] || guide.image?.alt.es || "WebP vs JPG vs PNG"}
        caption={
          isCa
            ? "Diagrama tècnic: comparativa de compressió predictiva i reducció d'octets per a ús a la web."
            : isEn
            ? "Technical diagram: predictive compression comparison and byte savings for web deployment."
            : "Diagrama técnico: comparativa de compresión predictiva y reducción de octetos para uso en la web."
        }
      />

      {/* Mascota Corriendo (Velocidad web / Core Web Vitals / Rendimiento de tienda) */}
      <GuideMascotCallout
        variant="run"
        background="red"
        badge={isCa ? "Velocitat & Core Web Vitals" : isEn ? "PageSpeed & Core Web Vitals" : "Velocidad & Core Web Vitals"}
        title={
          isCa
            ? "Imatges ultralleugeres que acceleren el Largest Contentful Paint (LCP)"
            : isEn
            ? "Featherweight images accelerating your Largest Contentful Paint (LCP)"
            : "Imágenes ultraligeras que aceleran tu Largest Contentful Paint (LCP)"
        }
        description={
          isCa
            ? "Converteix fotos pesades de càmera a WebP en el teu propi ordinador. Estalvia fins a un 80% de pes sense perdre nitidesa i millora la taxa de conversió de la teva botiga."
            : isEn
            ? "Convert bulky camera photography to WebP locally in your browser. Slash file payload by up to 80% with zero blurriness, boosting mobile shopper conversion rates."
            : "Convierte fotos pesadas de cámara a WebP en tu propio equipo. Ahorra hasta un 80% de peso sin perder nitidez y mejora la tasa de conversión de tu tienda online."
        }
      />

      {/* Main Content Body */}
      <div className="prose prose-slate mt-8 max-w-none text-slate-700 leading-relaxed">
        {/* Section 1: Main differences table */}
        <section aria-labelledby="format-differences">
          <h2 id="format-differences" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Diferències principals entre WebP, JPG i PNG" : isEn ? "Core Differences: WebP, JPG, and PNG" : "Diferencias principales entre WebP, JPG y PNG"}
          </h2>
          <p className="mt-3 text-[16px]">
            {isCa
              ? "Cap d'aquests formats és 'el millor' en termes absoluts. Cadascun va ser concebut per a necessitats tècniques diferents:"
              : isEn
              ? "None of these formats is universally superior. Each was engineered to solve distinct technical requirements:"
              : "Ninguno de estos formatos es 'el mejor' en términos absolutos. Cada uno fue concebido para necesidades técnicas diferentes:"}
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-[14.5px]">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="px-5 py-3.5">{isCa ? "Format" : isEn ? "Format" : "Formato"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Avantatge principal" : isEn ? "Key Strength" : "Ventaja principal"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Ús recomanat" : isEn ? "Typical Use Case" : "Uso habitual"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="px-5 py-3 font-bold text-slate-900">JPG</td>
                  <td className="px-5 py-3">{isCa ? "Compatibilitat universal absoluta" : isEn ? "Universal legacy compatibility" : "Compatibilidad universal absoluta"}</td>
                  <td className="px-5 py-3 text-[13.5px]">{isCa ? "No suporta transparència (canal alfa)" : isEn ? "No alpha transparency support" : "No soporta transparencia (canal alfa)"}</td>
                  <td className="px-5 py-3 text-[13.5px]">{isCa ? "Fotos de producte sobre fons blanc sòlid" : isEn ? "Product photos with solid backgrounds" : "Fotos de producto sobre fondo blanco sólido"}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-bold text-slate-900">PNG</td>
                  <td className="px-5 py-3">{isCa ? "Transparència nítida sense pèrdua (Lossless)" : isEn ? "Lossless alpha channel support" : "Transparencia nítida sin pérdida (Lossless)"}</td>
                  <td className="px-5 py-3 text-[13.5px]">{isCa ? "Pes molt elevat en fotos d'alta resolució" : isEn ? "Very heavy byte size on complex photos" : "Peso muy elevado en fotos de alta resolución"}</td>
                  <td className="px-5 py-3 text-[13.5px]">{isCa ? "Logos vectoritzats i gràfics d'interfície" : isEn ? "Logos, badges, and interface assets" : "Logos vectorizados y gráficos de interfaz"}</td>
                </tr>
                <tr className="bg-emerald-50/60">
                  <td className="px-5 py-3 font-bold text-emerald-950">WebP</td>
                  <td className="px-5 py-3 font-medium text-emerald-900">
                    {isCa ? "Compressió predictiva moderna + transparència" : isEn ? "Modern predictive compression + alpha" : "Compresión predictiva moderna + transparencia"}
                  </td>
                  <td className="px-5 py-3 text-[13.5px] text-emerald-800">
                    {isCa ? "Eines antigues d'edició poden no obrir-lo" : isEn ? "Older desktop image editors lack native import" : "Herramientas antiguas de edición pueden no abrirlo"}
                  </td>
                  <td className="px-5 py-3 text-[13.5px] text-emerald-900 font-medium">
                    {isCa ? "Catàleg mòbil, siluetes i banners" : isEn ? "Mobile catalogs, cutouts, and banners" : "Catálogo móvil, siluetas y banners"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: When to use each */}
        <section className="mt-10" aria-labelledby="when-to-use">
          <h2 id="when-to-use" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Criteris d'elecció segons el tipus d'imatge" : isEn ? "Choosing the Right Format by Asset Type" : "Criterios de elección según el tipo de imagen"}
          </h2>

          <div className="mt-5 space-y-4 text-[15px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-[17px] font-bold text-slate-900 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-800 text-[12px] font-bold">JPG</span>
                {isCa ? "¿Quan continua sent adequat el format JPG?" : isEn ? "When is JPG Still the Sensible Choice?" : "¿Cuándo sigue siendo adecuado el formato JPG?"}
              </h3>
              <p className="mt-2 text-slate-600">
                {isCa
                  ? "El format JPEG destaca en fotografies de producte amb molta informació cromàtica. Si les teves fotos ja estan guardades a 1500 px d'amplada amb un pes de 150-250 KB, reconvertir-les no aportarà una millora dràstica en la percepció de l'usuari."
                  : isEn
                  ? "JPEG shines on rich product photography featuring complex color tones. If source images are already scaled to 1500px at 150–250 KB, batch re-encoding may produce negligible perceptual gains."
                  : "El formato JPEG destaca en fotografías de producto con mucha información cromática. Si tus fotos ya están guardadas a 1500 px de ancho con un peso de 150-250 KB, reconvertirlas no aportará una mejora drástica en la percepción del usuario."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-[17px] font-bold text-slate-900 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-800 text-[12px] font-bold">PNG</span>
                {isCa ? "¿Quan és necessari mantenir el format PNG?" : isEn ? "When Does PNG Remain Essential?" : "¿Cuándo es necesario mantener el formato PNG?"}
              </h3>
              <p className="mt-2 text-slate-600">
                {isCa
                  ? "PNG és la referència quan cal conservar fons transparents en logotips vectorials exportats a ràster o esquemes amb vores dures d'alt contrast sense halos de compressió."
                  : isEn
                  ? "PNG is essential for logos, UI badges, and line art where razor-sharp contrast edges must remain crisp without lossy compression artifacts."
                  : "PNG es la referencia cuando se requiere conservar fondos transparentes en logotipos vectoriales exportados a ráster o esquemas con bordes duros de alto contraste sin halos de compresión."}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
              <h3 className="text-[17px] font-bold text-emerald-950 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-[12px] font-bold">WebP</span>
                {isCa ? "¿Quan té sentit migrar a WebP?" : isEn ? "When Does Migrating to WebP Make Technical Sense?" : "¿Cuándo tiene sentido migrar a WebP?"}
              </h3>
              <p className="mt-2 text-slate-600">
                {isCa
                  ? "WebP és especialment rendible en dos escenaris: en imatges de producte retallades amb fons transparent (on substitueix fitxers PNG massius de 2-3 MB per versions de 200-400 KB) i en catàlegs mòbils amb desenes d'elements per pàgina."
                  : isEn
                  ? "WebP proves most beneficial in two distinct scenarios: isolated product cutouts with transparent backgrounds (slashing heavy 2–3 MB PNGs down to 200–400 KB) and dense catalog listing grids where aggregate mobile payload is paramount."
                  : "WebP es especialmente rentable en dos escenarios: en imágenes de producto recortadas con fondo transparente (donde sustituye archivos PNG masivos de 2-3 MB por versiones de 200-400 KB) y en catálogos móviles con decenas de elementos por página."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Optimization workflow with CTA */}
        <section className="mt-10" aria-labelledby="step-workflow">
          <h2 id="step-workflow" className="text-2xl font-bold text-slate-900 tracking-tight">
            {isCa ? "Com optimitzar una imatge per a ecommerce pas a pas" : isEn ? "Step-by-Step Ecommerce Image Optimization Workflow" : "Cómo optimizar una imagen para ecommerce paso a paso"}
          </h2>

          <div className="mt-5 space-y-4">
            <GuideStep
              stepNumber={1}
              title={isCa ? "Parteix del màster d'alta resolució" : isEn ? "Start from the uncompressed master" : "Parte del máster de alta resolución"}
            >
              <p>
                {isCa
                  ? "Fes les adaptacions sempre sobre el fitxer original, no sobre una versió ja comprimida repetidament."
                  : isEn
                  ? "Always perform resizing on the camera raw export or clean source master."
                  : "Haz las adaptaciones siempre sobre el archivo original, no sobre una versión ya comprimida repetidamente."}
              </p>
            </GuideStep>

            <GuideStep
              stepNumber={2}
              title={isCa ? "Reescala a la mida màxima de visualització" : isEn ? "Resize to realistic display dimensions" : "Reescala al tamaño máximo de visualización"}
            >
              <p>
                {isCa
                  ? "Si el tema de la teva botiga mostra les fotos a 1200 px amb funció de zoom, no pugis arxius de 5000 px."
                  : isEn
                  ? "If your theme container caps product galleries at 1200–1600 px for zoom, avoid uploading 5000 px images."
                  : "Si el tema de tu tienda muestra las fotos a 1200 px con función de zoom, no subas archivos de 5000 px."}
              </p>
            </GuideStep>

            {/* Central Tool CTA */}
            <GuideCTA
              to={toolPath(locale, "imagen-a-webp")}
              eyebrow={isCa ? "Eina Gratuïta al Navegador" : isEn ? "Client-Side Converter" : "Herramienta Gratuita en Navegador"}
              title={isCa ? "Convertir Imatge a WebP a BreadPDF" : isEn ? "Convert Image to WebP on BreadPDF" : "Convertir Imagen a WebP en BreadPDF"}
              description={
                isCa
                  ? "Converteix fotografies JPG i gràfics PNG a WebP ajustant el control de qualitat directament al dispositiu sense pujar a servidors."
                  : isEn
                  ? "Convert JPG photography and transparent PNGs to WebP with fine quality control entirely in your local browser."
                  : "Convierte fotografías JPG y gráficos PNG a WebP ajustando el control de calidad directamente en el dispositivo sin subir a servidores."
              }
              buttonText={isCa ? "Convertir a WebP ara" : isEn ? "Convert to WebP now" : "Convertir a WebP ahora"}
              icon={<ImageIcon className="size-4" />}
              variant="solid-red"
            />

            <GuideStep
              stepNumber={3}
              title={isCa ? "Comprova el fitxer generat abans de publicar" : isEn ? "Inspect rendered output before production" : "Comprueba el archivo generado antes de publicar"}
            >
              <p>
                {isCa
                  ? "Assegura't que el pes està preferentment per sota dels 250-300 KB per a heros de portada."
                  : isEn
                  ? "Verify that hero assets stay comfortably below the 250–300 KB ceiling."
                  : "Asegúrate de que el peso se mantiene preferentemente por debajo de los 250-300 KB para cabeceras."}
              </p>
            </GuideStep>
          </div>
        </section>

        {/* Section 4: Related Tools */}
        <section className="mt-10" aria-labelledby="related-tools">
          <h2 id="related-tools" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="size-5 text-slate-700" />
            {isCa ? "Eines relacionades d'imatge i documentació a BreadPDF" : isEn ? "Related BreadPDF Image and Document Tools" : "Herramientas relacionadas de imagen y documentación en BreadPDF"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-[14px]">
            <Link
              to={toolPath(locale, "imagen-a-webp")}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#EC3C2D]/40 hover:shadow-md"
            >
              <strong className="block font-bold text-slate-900">{isCa ? "Imatge a WebP" : isEn ? "Image to WebP" : "Imagen a WebP"}</strong>
              <span className="text-[12.5px] text-slate-500 mt-0.5 block">{isCa ? "Optimització de JPG i PNG per a web" : isEn ? "Web optimization for JPG & PNG" : "Optimización de JPG y PNG para web"}</span>
            </Link>
            <Link
              to={toolPath(locale, "pdf-a-webp")}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#EC3C2D]/40 hover:shadow-md"
            >
              <strong className="block font-bold text-slate-900">{isCa ? "PDF a WebP" : isEn ? "PDF to WebP" : "PDF a WebP"}</strong>
              <span className="text-[12.5px] text-slate-500 mt-0.5 block">{isCa ? "Pàgines de catàleg a imatges web" : isEn ? "Catalog pages to web images" : "Páginas de catálogo a imágenes web"}</span>
            </Link>
            <Link
              to={toolPath(locale, "jpg-a-pdf")}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#EC3C2D]/40 hover:shadow-md"
            >
              <strong className="block font-bold text-slate-900">{isCa ? "JPG a PDF" : isEn ? "JPG to PDF" : "JPG a PDF"}</strong>
              <span className="text-[12.5px] text-slate-500 mt-0.5 block">{isCa ? "Unificar fotos en dossier de producte" : isEn ? "Bundle product photos into a PDF" : "Unificar fotos en dossier de producto"}</span>
            </Link>
          </div>
        </section>

        {/* Section 5: FAQ Accordion */}
        <GuideFAQ
          title={isCa ? "Preguntes freqüents sobre formats d'imatge a ecommerce" : isEn ? "Frequently Asked Questions about Ecommerce Image Formats" : "Preguntas frecuentes sobre formatos de imagen en ecommerce"}
          faqs={faqs}
        />

        {/* Technical Sources */}
        <GuideFooterSources
          title={isCa ? "Fonts oficials i documentació tècnica de referència" : isEn ? "Official Sources & Technical Documentation" : "Fuentes oficiales y documentación técnica de referencia"}
        >
          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-center gap-1.5">
              <ExternalLink className="size-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>Shopify Help Center:</strong>{" "}
                <em>Uploading and managing product images</em> (
                <a
                  href="https://help.shopify.com/en/manual/online-store/images/uploading-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC3C2D] underline hover:opacity-80"
                >
                  help.shopify.com/en/manual/online-store/images/uploading-images
                </a>
                ).
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <ExternalLink className="size-3.5 text-slate-400 shrink-0" />
              <span>
                <strong>Google Web Developers:</strong>{" "}
                <em>Serve images in modern formats (WebP/AVIF) & Optimize LCP</em> (
                <a
                  href="https://web.dev/fast/#optimize-your-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC3C2D] underline hover:opacity-80"
                >
                  web.dev/fast/#optimize-your-images
                </a>
                ).
              </span>
            </li>
          </ul>
        </GuideFooterSources>
      </div>
    </article>
  );
}
