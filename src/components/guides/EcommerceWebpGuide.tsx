import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  FileImage,
  Image as ImageIcon,
  Images,
  ShoppingBag,
} from "lucide-react";
import { BRAND_ASSETS } from "@/lib/brand";
import type { Locale } from "@/lib/i18n/config";
import { type GuideDefinition } from "@/lib/guides/registry";
import { toolPath } from "@/lib/i18n/routing";
import {
  GuideHero,
  GuideStep,
  GuideCTA,
  GuideFAQ,
  GuideFooterSources,
} from "@/components/guides/editorial/GuideEditorial";
import "./EcommerceWebpGuide.css";

interface GuideArticleProps {
  locale: Locale;
  guide: GuideDefinition;
}

function WebpCompressionDiagram({ locale }: { locale: Locale }) {
  const isCa = locale === "ca";
  const isEn = locale === "en";
  const originalSize = isEn ? "1.8 MB" : "1,8 MB";
  const copy = {
    original: "ORIGINAL",
    optimized: isCa ? "OPTIMITZAT" : isEn ? "OPTIMIZED" : "OPTIMIZADO",
    standard: isCa
      ? "Fotografia o gràfic estàndard"
      : isEn
        ? "Standard photo or graphic"
        : "Fotografía o gráfico estándar",
    optimizedDescription: isCa
      ? "Imatge optimitzada per al web"
      : isEn
        ? "Image optimized for the web"
        : "Imagen optimizada para web",
    heavier: isCa ? "Fitxer de més pes" : isEn ? "Larger file size" : "Mayor peso de archivo",
    lighter: isCa
      ? "Menys pes per descarregar"
      : isEn
        ? "Less data to download"
        : "Menos peso para descargar",
    fileSize: isCa ? "Mida del fitxer" : isEn ? "File size" : "Tamaño del archivo",
    caption: isCa
      ? "Exemple comparatiu del pes d'una imatge original i la seva versió WebP."
      : isEn
        ? "Example comparison of an original image and its WebP version."
        : "Ejemplo comparativo del peso de una imagen original y su versión WebP.",
  };

  return (
    <figure className="webp-comparison" aria-label={copy.caption}>
      <div className="webp-comparison__panels">
        <section className="webp-comparison__panel" aria-label={copy.original}>
          <span className="webp-comparison__eyebrow webp-comparison__eyebrow--original">
            {copy.original}
          </span>
          <h3>JPG / PNG</h3>
          <p>{copy.standard}</p>
          <div className="webp-comparison__metric" aria-label={`${copy.fileSize}: ${originalSize}`}>
            <ImageIcon className="webp-comparison__file-icon" aria-hidden="true" />
            <span className="sr-only">{copy.fileSize}</span>
            <strong>{originalSize}</strong>
          </div>
          <p className="webp-comparison__note">{copy.heavier}</p>
        </section>

        <div className="webp-comparison__transition" aria-hidden="true">
          <ArrowRight className="webp-comparison__arrow--desktop" />
          <ArrowDown className="webp-comparison__arrow--mobile" />
        </div>

        <section
          className="webp-comparison__panel webp-comparison__panel--optimized"
          aria-label="WebP"
        >
          <span className="webp-comparison__eyebrow webp-comparison__eyebrow--optimized">
            {copy.optimized}
          </span>
          <h3>WebP</h3>
          <p>{copy.optimizedDescription}</p>
          <div className="webp-comparison__metric" aria-label={`${copy.fileSize}: 320 KB`}>
            <FileImage className="webp-comparison__file-icon" aria-hidden="true" />
            <span className="sr-only">{copy.fileSize}</span>
            <strong>320 KB</strong>
          </div>
          <p className="webp-comparison__note">{copy.lighter}</p>
        </section>
      </div>
      <figcaption className="webp-comparison__caption">{copy.caption}</figcaption>
    </figure>
  );
}

function WebpFormatsIllustration({ locale }: { locale: Locale }) {
  const isCa = locale === "ca";
  const isEn = locale === "en";
  const label = isCa
    ? "Formats d'imatge JPG, PNG i WebP"
    : isEn
      ? "JPG, PNG, and WebP image formats"
      : "Formatos de imagen JPG, PNG y WebP";

  return (
    <div className="webp-hero-visual" role="img" aria-label={label}>
      <div className="webp-hero-visual__formats" aria-hidden="true">
        <div className="webp-hero-visual__format">
          <ImageIcon />
          <strong>JPG</strong>
        </div>
        <div className="webp-hero-visual__format">
          <Images />
          <strong>PNG</strong>
        </div>
        <div className="webp-hero-visual__format webp-hero-visual__format--webp">
          <FileImage />
          <strong>WebP</strong>
        </div>
      </div>
      <div className="webp-hero-visual__mascot" aria-hidden="true">
        <img
          src={BRAND_ASSETS.mascots.run}
          alt=""
          width={150}
          height={150}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

function WebpQuickCriteria({ locale }: { locale: Locale }) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const title = isCa
    ? "Criteri ràpid de format"
    : isEn
      ? "Quick format guide"
      : "Criterio rápido de formato";

  const items = [
    {
      format: "JPG",
      description: isCa
        ? "Fotografies sobre fons opac."
        : isEn
          ? "Photographs on opaque backgrounds."
          : "Fotografías sobre fondos opacos.",
      icon: <ImageIcon aria-hidden="true" />,
    },
    {
      format: "PNG",
      description: isCa
        ? "Transparència i gràfics sense pèrdua."
        : isEn
          ? "Transparency and lossless graphics."
          : "Transparencia y gráficos sin pérdida.",
      icon: <Images aria-hidden="true" />,
    },
    {
      format: "WebP",
      description: isCa
        ? "Menys pes per a imatges web."
        : isEn
          ? "Smaller files for web images."
          : "Menos peso para imágenes web.",
      icon: <FileImage aria-hidden="true" />,
    },
  ];

  return (
    <section className="webp-quick-criteria" aria-labelledby="webp-quick-criteria-title">
      <div className="webp-quick-criteria__heading">
        <span className="webp-quick-criteria__mark" aria-hidden="true">
          <Images />
        </span>
        <h2 id="webp-quick-criteria-title">{title}</h2>
      </div>
      <div className="webp-quick-criteria__items">
        {items.map((item) => (
          <article className="webp-quick-criteria__item" key={item.format}>
            <span className="webp-quick-criteria__icon">{item.icon}</span>
            <div>
              <h3>{item.format}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EcommerceWebpGuide({ locale, guide }: GuideArticleProps) {
  const isCa = locale === "ca";
  const isEn = locale === "en";

  const faqs = guide.faqs[locale] || guide.faqs.es;

  return (
    <article className="guide-article guide-article--webp mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
        visual={<WebpFormatsIllustration locale={locale} />}
      />

      <WebpQuickCriteria locale={locale} />

      <section className="webp-comparison-section" aria-labelledby="webp-comparison-title">
        <h2 id="webp-comparison-title">
          {isCa
            ? "Comparativa visual: JPG / PNG vs. WebP"
            : isEn
              ? "Visual comparison: JPG / PNG vs. WebP"
              : "Comparativa visual: JPG / PNG vs. WebP"}
        </h2>
        <p>
          {isCa
            ? "Una mateixa imatge pot ocupar menys espai en WebP; el resultat depèn de l'original i dels ajustos de compressió."
            : isEn
              ? "The same image can use less space as WebP; results depend on the source and compression settings."
              : "La misma imagen puede ocupar menos en WebP; el resultado depende del original y de los ajustes de compresión."}
        </p>
      </section>

      <WebpCompressionDiagram locale={locale} />

      <aside className="webp-lcp-recommendation">
        <img
          src={BRAND_ASSETS.mascots.run}
          alt=""
          aria-hidden="true"
          width={120}
          height={120}
          loading="lazy"
          decoding="async"
        />
        <div className="webp-lcp-recommendation__content">
          <p className="webp-lcp-recommendation__eyebrow">
            {isCa
              ? "Velocitat i Core Web Vitals"
              : isEn
                ? "Speed & Core Web Vitals"
                : "Velocidad y Core Web Vitals"}
          </p>
          <h2>
            {isCa
              ? "Imatges ultralleugeres que poden ajudar a millorar el Largest Contentful Paint (LCP)"
              : isEn
                ? "Ultralight images that can help improve Largest Contentful Paint (LCP)"
                : "Imágenes ultraligeras que pueden ayudar a mejorar el Largest Contentful Paint (LCP)"}
          </h2>
          <p className="webp-lcp-recommendation__description">
            {isCa
              ? "Optimitzar les imatges principals redueix les dades que la botiga ha de descarregar. El LCP també depèn de les dimensions, la prioritat de càrrega i el servidor o CDN."
              : isEn
                ? "Optimizing key images reduces the data a store needs to download. LCP also depends on image dimensions, loading priority, and the server or CDN."
                : "Optimizar las imágenes principales reduce los datos que la tienda debe descargar. El LCP también depende de sus dimensiones, la prioridad de carga y el servidor o CDN."}
          </p>
        </div>
      </aside>

      {/* Body Content */}
      <div className="mt-12 space-y-10 text-[16.5px] sm:text-[17.5px] leading-relaxed text-slate-800">
        {/* Section 1: Technical comparison table */}
        <section aria-labelledby="comparison-table">
          <h2
            id="comparison-table"
            className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight"
          >
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

          <div className="guide-table-wrap guide-table-wrap--stacked">
            <table className="guide-table guide-table--stacked">
              <thead className="bg-[#EDEDF0] text-[#0F0F12] font-black uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">
                    {isCa ? "Format" : isEn ? "Format" : "Formato"}
                  </th>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">
                    {isCa ? "Avantatge principal" : isEn ? "Key Strength" : "Ventaja principal"}
                  </th>
                  <th className="px-5 py-3.5 border-r border-[#0F0F12]">
                    {isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}
                  </th>
                  <th className="px-5 py-3.5">
                    {isCa ? "Ús recomanat" : isEn ? "Typical Use Case" : "Uso habitual"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-[#0F0F12] text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <th
                    scope="row"
                    data-label={isCa ? "Format" : isEn ? "Format" : "Formato"}
                    className="px-5 py-3.5 font-black text-[#0F0F12] border-r border-slate-200"
                  >
                    JPG
                  </th>
                  <td
                    data-label={
                      isCa ? "Avantatge principal" : isEn ? "Key strength" : "Ventaja principal"
                    }
                    className="px-5 py-3.5 border-r border-slate-200"
                  >
                    {isCa
                      ? "Compatibilitat universal absoluta"
                      : isEn
                        ? "Universal legacy compatibility"
                        : "Compatibilidad universal absoluta"}
                  </td>
                  <td
                    data-label={isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}
                    className="px-5 py-3.5 text-[13.5px] border-r border-slate-200"
                  >
                    {isCa
                      ? "No suporta transparència (canal alfa)"
                      : isEn
                        ? "No alpha transparency support"
                        : "No soporta transparencia (canal alfa)"}
                  </td>
                  <td
                    data-label={isCa ? "Ús recomanat" : isEn ? "Typical use" : "Uso habitual"}
                    className="px-5 py-3.5 text-[13.5px]"
                  >
                    {isCa
                      ? "Fotos de producte sobre fons blanc sòlid"
                      : isEn
                        ? "Product photos with solid backgrounds"
                        : "Fotos de producto sobre fondo blanco sólido"}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <th
                    scope="row"
                    data-label={isCa ? "Format" : isEn ? "Format" : "Formato"}
                    className="px-5 py-3.5 font-black text-[#0F0F12] border-r border-slate-200"
                  >
                    PNG
                  </th>
                  <td
                    data-label={
                      isCa ? "Avantatge principal" : isEn ? "Key strength" : "Ventaja principal"
                    }
                    className="px-5 py-3.5 border-r border-slate-200"
                  >
                    {isCa
                      ? "Transparència nítida sense pèrdua (Lossless)"
                      : isEn
                        ? "Lossless alpha channel support"
                        : "Transparencia nítida sin pérdida (Lossless)"}
                  </td>
                  <td
                    data-label={isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}
                    className="px-5 py-3.5 text-[13.5px] border-r border-slate-200"
                  >
                    {isCa
                      ? "Pes molt elevat en fotos d'alta resolució"
                      : isEn
                        ? "Very heavy byte size on complex photos"
                        : "Peso muy elevado en fotos de alta resolución"}
                  </td>
                  <td
                    data-label={isCa ? "Ús recomanat" : isEn ? "Typical use" : "Uso habitual"}
                    className="px-5 py-3.5 text-[13.5px]"
                  >
                    {isCa
                      ? "Logos vectoritzats i gràfics d'interfície"
                      : isEn
                        ? "Logos, badges, and interface assets"
                        : "Logos vectorizados y gráficos de interfaz"}
                  </td>
                </tr>
                <tr className="guide-table__featured">
                  <th
                    scope="row"
                    data-label={isCa ? "Format" : isEn ? "Format" : "Formato"}
                    className="px-5 py-3.5 font-black text-[#F13B32]"
                  >
                    WebP
                  </th>
                  <td
                    data-label={
                      isCa ? "Avantatge principal" : isEn ? "Key strength" : "Ventaja principal"
                    }
                    className="px-5 py-3.5 font-bold text-[#171717]"
                  >
                    {isCa
                      ? "Compressió predictiva moderna + transparència"
                      : isEn
                        ? "Modern predictive compression + alpha"
                        : "Compresión predictiva moderna + transparencia"}
                  </td>
                  <td
                    data-label={isCa ? "Limitació" : isEn ? "Limitation" : "Limitación"}
                    className="px-5 py-3.5 text-[14px] text-slate-700"
                  >
                    {isCa
                      ? "Eines antigues d'edició poden no obrir-lo"
                      : isEn
                        ? "Older desktop image editors lack native import"
                        : "Herramientas antiguas de edición pueden no abrirlo"}
                  </td>
                  <td
                    data-label={isCa ? "Ús recomanat" : isEn ? "Typical use" : "Uso habitual"}
                    className="px-5 py-3.5 text-[13.5px] text-[#0F0F12] font-bold"
                  >
                    {isCa
                      ? "Catàleg mòbil, siluetes i banners"
                      : isEn
                        ? "Mobile catalogs, cutouts, and banners"
                        : "Catálogo móvil, siluetas y banners"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: When to use each */}
        <section className="mt-12" aria-labelledby="when-to-use">
          <h2
            id="when-to-use"
            className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight"
          >
            {isCa
              ? "Criteris d'elecció segons el tipus d'imatge"
              : isEn
                ? "Choosing the Right Format by Asset Type"
                : "Criterios de elección según el tipo de imagen"}
          </h2>

          <div className="guide-choice-list mt-5 text-[15px]">
            <div className="guide-choice">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="guide-choice__icon" aria-hidden="true">
                  <ImageIcon className="size-5" />
                </span>
                {isCa
                  ? "¿Quan continua sent adequat el format JPG?"
                  : isEn
                    ? "When is JPG Still the Sensible Choice?"
                    : "¿Cuándo sigue siendo adecuado el formato JPG?"}
              </h3>
              <p className="mt-3 text-slate-700 font-normal leading-relaxed text-[16px]">
                {isCa
                  ? "El format JPEG destaca en fotografies de producte amb molta informació cromàtica. Si les fotos ja tenen unes dimensions adequades i estan ben comprimides, reconvertir-les pot no aportar una millora perceptible."
                  : isEn
                    ? "JPEG shines on rich product photography featuring complex color tones. If source images are already appropriately sized and compressed, re-encoding may produce negligible perceptual gains."
                    : "El formato JPEG destaca en fotografías de producto con mucha información cromática. Si las fotos ya tienen dimensiones adecuadas y están bien comprimidas, reconvertirlas puede no aportar una mejora perceptible."}
              </p>
            </div>

            <div className="guide-choice">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="guide-choice__icon" aria-hidden="true">
                  <Images className="size-5" />
                </span>
                {isCa
                  ? "¿Quan és necessari mantenir el format PNG?"
                  : isEn
                    ? "When Does PNG Remain Essential?"
                    : "¿Cuándo es necesario mantener el formato PNG?"}
              </h3>
              <p className="mt-3 text-slate-700 font-normal leading-relaxed text-[16px]">
                {isCa
                  ? "PNG és la referència quan cal conservar fons transparents en logotips vectorials exportats a ràster o esquemes amb vores dures d'alt contrast sense halos de compressió."
                  : isEn
                    ? "PNG is essential for logos, UI badges, and line art where razor-sharp contrast edges must remain crisp without lossy compression artifacts."
                    : "PNG es la referencia cuando se requiere conservar fondos transparentes en logotipos vectoriales exportados a ráster o esquemas con bordes duros de alto contraste sin halos de compresión."}
              </p>
            </div>

            <div className="guide-choice guide-choice--featured">
              <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] flex items-center gap-2.5">
                <span className="guide-choice__icon" aria-hidden="true">
                  <FileImage className="size-5" />
                </span>
                {isCa
                  ? "¿Quan té sentit migrar a WebP?"
                  : isEn
                    ? "When Does Migrating to WebP Make Technical Sense?"
                    : "¿Cuándo tiene sentido migrar a WebP?"}
              </h3>
              <p className="mt-3 text-slate-800 font-medium leading-relaxed text-[16px]">
                {isCa
                  ? "WebP és especialment rendible en imatges de producte retallades amb fons transparent i en catàlegs mòbils amb moltes imatges, on importa el pes total descarregat."
                  : isEn
                    ? "WebP proves most beneficial for isolated product cutouts with transparent backgrounds and dense catalog grids where the total mobile image payload matters."
                    : "WebP es especialmente rentable en imágenes de producto recortadas con fondo transparente y en catálogos móviles con muchas imágenes, donde importa el peso total descargado."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Optimization workflow with CTA */}
        <section className="mt-12" aria-labelledby="step-workflow">
          <h2
            id="step-workflow"
            className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight"
          >
            {isCa
              ? "Com optimitzar una imatge per a ecommerce pas a pas"
              : isEn
                ? "Step-by-Step Ecommerce Image Optimization Workflow"
                : "Cómo optimizar una imagen para ecommerce paso a paso"}
          </h2>

          <div className="mt-6 space-y-4">
            <GuideStep
              stepNumber={1}
              title={
                isCa
                  ? "Parteix del màster d'alta resolució"
                  : isEn
                    ? "Start from the uncompressed master"
                    : "Parte del máster de alta resolución"
              }
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
              title={
                isCa
                  ? "Escala les dimensions al renderitzat màxim"
                  : isEn
                    ? "Scale pixel dimensions to maximum viewport bounds"
                    : "Escala las dimensiones al renderizado máximo"
              }
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
              title={
                isCa
                  ? "Converteix a WebP amb control de qualitat"
                  : isEn
                    ? "Convert to WebP with fine quality tuning"
                    : "Convierte a WebP con control de calidad"
              }
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
              buttonText={
                isCa
                  ? "Convertir imatges a WebP ara"
                  : isEn
                    ? "Convert Images to WebP Now"
                    : "Convertir imágenes a WebP ahora"
              }
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
          <h2
            id="html-implementation"
            className="text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight"
          >
            {isCa
              ? "Implementació tècnica: l'etiqueta <picture> amb reserva automàtica"
              : isEn
                ? "For Developers: Serve WebP with a JPG Fallback"
                : "Para desarrolladores: servir WebP con una alternativa JPG"}
          </h2>
          <p className="mt-3 text-slate-700">
            {isCa
              ? "L'element estàndard <picture> permet oferir WebP i mantenir una imatge JPG de reserva per als navegadors que no admetin aquest format. És útil quan controles directament el marcatge de les imatges:"
              : isEn
                ? "The standard <picture> element lets you offer WebP while keeping a JPG fallback for browsers that do not support that format. It is useful when you control the image markup directly:"
                : "El elemento estándar <picture> permite ofrecer WebP y mantener una imagen JPG de reserva para los navegadores que no admitan este formato. Es útil cuando controlas directamente el marcado de las imágenes:"}
          </p>

          <details className="guide-code-advanced">
            <summary aria-controls="webp-picture-code">
              <span>
                {isCa ? "Veure exemple HTML" : isEn ? "View HTML example" : "Ver ejemplo HTML"}
              </span>
              <ChevronDown className="size-5 shrink-0" aria-hidden="true" />
            </summary>
            <div className="guide-code-block" id="webp-picture-code">
              <pre className="guide-code">
                <code>
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
                </code>
              </pre>
            </div>
            <p className="guide-code-advanced__note">
              {isCa
                ? "El navegador selecciona la primera font compatible i conserva el JPG com a alternativa."
                : isEn
                  ? "The browser selects the first supported source and keeps the JPG as a fallback."
                  : "El navegador selecciona la primera fuente compatible y conserva el JPG como alternativa."}
            </p>
          </details>
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
        sources={[
          {
            organization: "Google Developers",
            title: "An Overview of WebP and Its Compression Techniques",
            href: "https://developers.google.com/speed/webp",
          },
          {
            organization: "MDN Web Docs",
            title: "Image File Type and Format Guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types",
          },
          {
            organization: "W3C Recommendation",
            title: "The HTML5 <picture> Element Specification",
            href: "https://www.w3.org/TR/html52/semantics-embedded-content.html#the-picture-element",
          },
        ]}
      />
    </article>
  );
}
