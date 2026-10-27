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
    <article className="mx-auto max-w-[860px] px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Header */}
      <GuideHero
        locale={locale}
        guide={guide}
        badgeIcon={<ShoppingBag className="size-4 text-white" />}
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
            ? "Ultralight images that accelerate Largest Contentful Paint (LCP)"
            : "Imágenes ultraligeras que aceleran el Largest Contentful Paint (LCP)"
        }
        description={
          isCa
            ? "En botigues electròniques com WooCommerce, Shopify o PrestaShop, el 70% del pes transferit a la primera càrrega prové de les imatges. Reduir els octets dels elements visuals de la portada redueix directament el temps de càrrega interactiu i millora la ràtio de conversió mòbil."
            : isEn
            ? "In e-commerce stores running on WooCommerce, Shopify, or Magento, over 70% of transferred page weight originates from image assets. Trimming the byte weight of hero banners directly improves interactive load times and mobile conversion rates."
            : "En tiendas electrónicas con catálogos visuales extensos, más del 70% del peso transferido en la primera carga proviene de las imágenes. Reducir los octetos de los elementos gráficos de portada disminuye directamente los tiempos de renderizado y mejora la tasa de conversión en móviles."
        }
      />

      {/* Body Content */}
      <div className="mt-12 space-y-10 text-[16.5px] sm:text-[17.5px] leading-relaxed text-slate-800">
        {/* Section 1: Technical comparison table */}
        <section aria-labelledby="comparison-table">
          <h2 id="comparison-table" className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
            {isCa
              ? "Comparativa directa: JPG, PNG i WebP"
              : isEn
              ? "Direct Comparison: JPG vs PNG vs WebP"
              : "Comparativa directa: JPG, PNG y WebP"}
          </h2>
          <p className="mt-3 text-slate-700">
            {isCa
              ? "Cap d'aquests formats és 'el millor' en termes absoluts. Cadascun va ser concebut per a necessitats tècniques diferents:"
              : isEn
              ? "None of these formats is universally superior. Each was engineered to solve distinct technical requirements:"
              : "Ninguno de estos formatos es 'el mejor' en términos absolutos. Cada uno fue concebido para necesidades técnicas diferentes:"}
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12]">
            <table className="min-w-full divide-y-2 divide-[#0F0F12] text-left text-[14.5px]">
              <thead className="bg-[#EDEDF0] text-[#0F0F12] font-black uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">{isCa ? "Format" : isEn ? "Format" : "Formato"}</th>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">{isCa ? "Avantatge principal" : isEn ? "Key Strength" : "Ventaja principal"}</th>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">{isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}</th>
                  <th className="px-5 py-3.5">{isCa ? "Ús recomanat" : isEn ? "Typical Use Case" : "Uso habitual"}</th>
                </tr>
              </thead>
              <tbody className="divide-y border-[#0F0F12] text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-black text-[#0F0F12] border-r border-slate-200">JPG</td>
                  <td className="px-5 py-3.5 border-r border-slate-200">{isCa ? "Compatibilitat universal absoluta" : isEn ? "Universal legacy compatibility" : "Compatibilidad universal absoluta"}</td>
                  <td className="px-5 py-3.5 text-[13.5px] border-r border-slate-200">{isCa ? "No suporta transparència (canal alfa)" : isEn ? "No alpha transparency support" : "No soporta transparencia (canal alfa)"}</td>
                  <td className="px-5 py-3.5 text-[13.5px]">{isCa ? "Fotos de producte sobre fons blanc sòlid" : isEn ? "Product photos with solid backgrounds" : "Fotos de producto sobre fondo blanco sólido"}</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-black text-[#0F0F12] border-r border-slate-200">PNG</td>
                  <td className="px-5 py-3.5 border-r border-slate-200">{isCa ? "Transparència nítida sense pèrdua (Lossless)" : isEn ? "Lossless alpha channel support" : "Transparencia nítida sin pérdida (Lossless)"}</td>
                  <td className="px-5 py-3.5 text-[13.5px] border-r border-slate-200">{isCa ? "Pes molt elevat en fotos d'alta resolució" : isEn ? "Very heavy byte size on complex photos" : "Peso muy elevado en fotos de alta resolución"}</td>
                  <td className="px-5 py-3.5 text-[13.5px]">{isCa ? "Logos vectoritzats i gràfics d'interfície" : isEn ? "Logos, badges, and interface assets" : "Logos vectorizados y gráficos de interfaz"}</td>
                </tr>
                <tr className="bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors">
                  <td className="px-5 py-3.5 font-black text-[#2563EB] border-r border-blue-200">WebP</td>
                  <td className="px-5 py-3.5 font-bold text-[#0F0F12] border-r border-blue-200">
                    {isCa ? "Compressió predictiva moderna + transparència" : isEn ? "Modern predictive compression + alpha" : "Compresión predictiva moderna + transparencia"}
                  </td>
                  <td className="px-5 py-3.5 text-[13.5px] text-slate-700 border-r border-blue-200">
                    {isCa ? "Eines antigues d'edició poden no obrir-lo" : isEn ? "Older desktop image editors lack native import" : "Herramientas antiguas de edición pueden no abrirlo"}
                  </td>
                  <td className="px-5 py-3.5 text-[13.5px] text-[#0F0F12] font-bold">
                    {isCa ? "Catàleg mòbil, siluetes i banners" : isEn ? "Mobile catalogs, cutouts, and banners" : "Catálogo móvil, siluetas y banners"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: When to use each */}
        <section className="mt-12" aria-labelledby="when-to-use">
          <h2 id="when-to-use" className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
            {isCa ? "Criteris d'elecció segons el tipus d'imatge" : isEn ? "Choosing the Right Format by Asset Type" : "Criterios de elección según el tipo de imagen"}
          </h2>

          <div className="mt-6 space-y-4 text-[15px]">
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] text-[13px] font-black shadow-[1px_1px_0_#0F0F12]">JPG</span>
                {isCa ? "¿Quan continua sent adequat el format JPG?" : isEn ? "When is JPG Still the Sensible Choice?" : "¿Cuándo sigue siendo adecuado el formato JPG?"}
              </h3>
              <p className="mt-3 text-slate-700 font-normal leading-relaxed text-[16px]">
                {isCa
                  ? "El format JPEG destaca en fotografies de producte amb molta informació cromàtica. Si les teves fotos ja estan guardades a 1500 px d'amplada amb un pes de 150-250 KB, reconvertir-les no aportarà una millora dràstica en la percepció de l'usuari."
                  : isEn
                  ? "JPEG shines on rich product photography featuring complex color tones. If source images are already scaled to 1500px at 150–250 KB, batch re-encoding may produce negligible perceptual gains."
                  : "El formato JPEG destaca en fotografías de producto con mucha información cromática. Si tus fotos ya están guardadas a 1500 px de ancho con un peso de 150-250 KB, reconvertirlas no aportará una mejora drástica en la percepción del usuario."}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] text-[13px] font-black shadow-[1px_1px_0_#0F0F12]">PNG</span>
                {isCa ? "¿Quan és necessari mantenir el format PNG?" : isEn ? "When Does PNG Remain Essential?" : "¿Cuándo es necesario mantener el formato PNG?"}
              </h3>
              <p className="mt-3 text-slate-700 font-normal leading-relaxed text-[16px]">
                {isCa
                  ? "PNG és la referència quan cal conservar fons transparents en logotips vectorials exportats a ràster o esquemes amb vores dures d'alt contrast sense halos de compressió."
                  : isEn
                  ? "PNG is essential for logos, UI badges, and line art where razor-sharp contrast edges must remain crisp without lossy compression artifacts."
                  : "PNG es la referencia cuando se requiere conservar fondos transparentes en logotipos vectoriales exportados a ráster o esquemas con bordes duros de alto contraste sin halos de compresión."}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#EFF6FF] p-6 shadow-[3px_3px_0_#2563EB]">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] text-white text-[13px] font-black shadow-[1px_1px_0_#0F0F12]">WebP</span>
                {isCa ? "¿Quan té sentit migrar a WebP?" : isEn ? "When Does Migrating to WebP Make Technical Sense?" : "¿Cuándo tiene sentido migrar a WebP?"}
              </h3>
              <p className="mt-3 text-slate-800 font-medium leading-relaxed text-[16px]">
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
        <section className="mt-12" aria-labelledby="step-workflow">
          <h2 id="step-workflow" className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
            {isCa ? "Com optimitzar una imatge per a ecommerce pas a pas" : isEn ? "Step-by-Step Ecommerce Image Optimization Workflow" : "Cómo optimizar una imagen para ecommerce paso a paso"}
          </h2>

          <div className="mt-6 space-y-4">
            <GuideStep
              stepNumber={1}
              title={isCa ? "Parteix del màster d'alta resolució" : isEn ? "Start from the uncompressed master" : "Parte del máster de alta resolución"}
            >
              <p>
                {isCa
                  ? "Conserva sempre l'arxiu mestre original (PNG de 24 bits o TIFF sense pèrdua). Mai apliquis compressió WebP sobre una imatge JPEG que ja hagi patit compressions prèvies, ja que s'acumularien artefactes visuals de blocs."
                  : isEn
                  ? "Retain original production masters (24-bit PNG or uncompressed TIFF). Avoid encoding WebP from already compressed lossy JPEGs to prevent compounding macroblocking compression artifacts."
                  : "Conserva siempre el archivo maestro original (PNG de 24 bits o TIFF sin pérdida). Nunca apliques compresión WebP sobre una imagen JPEG que ya haya sufrido compresiones previas, puesto que se acumularían artefactos visuales de bloques."}
              </p>
            </GuideStep>

            <GuideStep
              stepNumber={2}
              title={isCa ? "Escala les dimensions al renderitzat màxim" : isEn ? "Scale pixel dimensions to maximum viewport bounds" : "Escala las dimensiones al renderizado máximo"}
            >
              <p>
                {isCa
                  ? "Una imatge de 4000 px que es mostrarà a un màxim de 800 px a la fitxa de producte malgasta ample de banda inútilment. Redueix les dimensions al doble de la mida de renderitzat (per exemple, 1600 px per a pantalles Retina) abans de codificar."
                  : isEn
                  ? "A 4000px asset rendered inside an 800px product card wastes mobile bandwidth. Downscale width to twice the physical render footprint (e.g., 1600px for HiDPI/Retina screens) prior to compression."
                  : "Una imagen de 4000 px que se mostrará a un máximo de 800 px en la ficha de producto malgasta ancho de banda inútilmente. Reduce las dimensiones al doble del tamaño de renderizado (por ejemplo, 1600 px para pantallas Retina) antes de codificar."}
              </p>
            </GuideStep>

            <GuideStep
              stepNumber={3}
              title={isCa ? "Converteix a WebP amb control de qualitat" : isEn ? "Convert to WebP with fine quality tuning" : "Convierte a WebP con control de calidad"}
            >
              <p>
                {isCa
                  ? "Utilitza una eina de conversió local en navegador per processar els lots d'imatges sense haver de pujar catàlegs confidencials a servidors de tercers."
                  : isEn
                  ? "Employ a client-side browser conversion tool to process batch catalog assets without uploading confidential product photography to third-party cloud infrastructure."
                  : "Utiliza una herramienta de conversión local en navegador para procesar los lotes de imágenes sin tener que subir catálogos confidenciales a servidores de terceros."}
              </p>
            </GuideStep>
          </div>

          {/* Action CTA Box */}
          <div className="mt-8">
            <GuideCTA
              toolHref={toolPath(locale, "imagen-a-webp")}
              buttonText={isCa ? "Convertir imatges a WebP ara" : isEn ? "Convert Images to WebP Now" : "Convertir imágenes a WebP ahora"}
              helperText={
                isCa
                  ? "Eina 100% al navegador: processament per lots, suport de transparència i descàrrega immediata sense pujades a servidors."
                  : isEn
                  ? "100% in-browser utility: batch conversion, alpha transparency support, zero server uploads."
                  : "Herramienta 100% en navegador: procesamiento por lotes, soporte de transparencia y descarga inmediata sin subidas a servidores."
              }
            />
          </div>
        </section>

        {/* Section 4: Web architecture implementation */}
        <section className="mt-12" aria-labelledby="html-implementation">
          <h2 id="html-implementation" className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
            {isCa ? "Implementació tècnica: l'etiqueta <picture> amb reserva automàtica" : isEn ? "Technical Implementation: <picture> Tag Fallbacks" : "Implementación técnica: la etiqueta <picture> con reserva automática"}
          </h2>
          <p className="mt-3 text-slate-700">
            {isCa
              ? "Tot i que més del 97% dels navegadors actuals suporten WebP de forma nativa, la bona pràctica en ecommerce consisteix a servir WebP com a primera opció i oferir un JPG com a alternativa transparent mitjançant l'element estàndard HTML5:"
              : isEn
              ? "While over 97% of modern browsers natively parse WebP, robust web engineering recommends serving WebP primarily with automatic JPG/PNG fallback via standard HTML5 markup:"
              : "Aunque más del 97% de los navegadores actuales soportan WebP de forma nativa, la buena práctica en ecommerce consiste en servir WebP como primera opción y ofrecer un JPG como alternativa transparente mediante el elemento estándar HTML5:"}
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border-2 border-[#0F0F12] bg-[#0F0F12] p-5 text-slate-100 shadow-[4px_4px_0_#0F0F12]">
            <pre className="font-mono text-[13.5px] leading-relaxed">
{`<picture>
  <source srcset="product-photo.webp" type="image/webp" />
  <source srcset="product-photo.jpg" type="image/jpeg" />
  <img
    src="product-photo.jpg"
    alt="Zapatilla deportiva modelo Atlas"
    width="800"
    height="800"
    loading="lazy"
    decoding="async"
  />
</picture>`}
            </pre>
          </div>
          <p className="mt-3 text-[14.5px] text-slate-600">
            {isCa
              ? "Aquest patró garanteix que navegadors antics rebin automàticament el JPG sense necessitat de scripts addicionals ni redireccions de servidor."
              : isEn
              ? "This standard pattern ensures legacy user agents automatically load the fallback JPEG without external script overhead or server redirects."
              : "Este patrón garantiza que navegadores antiguos reciban automáticamente el JPG sin necesidad de scripts adicionales ni redirecciones de servidor."}
          </p>
        </section>
      </div>

      {/* FAQs */}
      <GuideFAQ
        title={
          isCa
            ? "Preguntes freqüents sobre formats d'imatge web"
            : isEn
            ? "Frequently Asked Questions: Web Image Formats"
            : "Preguntas frecuentes sobre formatos de imagen web"
        }
        faqs={faqs}
      />

      {/* Official Technical Sources */}
      <GuideFooterSources
        title={
          isCa
            ? "Documentació tècnica i referències oficials"
            : isEn
            ? "Technical Documentation & Official References"
            : "Documentación técnica y referencias oficiales"
        }
      >
        <ul className="space-y-2.5 list-none pl-0">
          <li className="flex items-start gap-2.5">
            <span className="size-2 rounded-full bg-[#EC3C2D] mt-2 shrink-0" />
            <span>
              <strong>Google Developers:</strong>{" "}
              <a
                href="https://developers.google.com/speed/webp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                An Overview of WebP and Its Compression Techniques
                <ExternalLink className="size-3.5 inline" />
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="size-2 rounded-full bg-[#EC3C2D] mt-2 shrink-0" />
            <span>
              <strong>MDN Web Docs:</strong>{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Image File Type and Format Guide
                <ExternalLink className="size-3.5 inline" />
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="size-2 rounded-full bg-[#EC3C2D] mt-2 shrink-0" />
            <span>
              <strong>W3C Recommendation:</strong>{" "}
              <a
                href="https://www.w3.org/TR/html52/semantics-embedded-content.html#the-picture-element"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                The HTML5 &lt;picture&gt; Element Specification
                <ExternalLink className="size-3.5 inline" />
              </a>
            </span>
          </li>
        </ul>
      </GuideFooterSources>
    </article>
  );
}
