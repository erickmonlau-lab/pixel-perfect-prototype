import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/components/guides/editorial/GuideEditorial.tsx');
let c = fs.readFileSync(p, 'utf8');

// Normalize CRLF
const isCRLF = c.includes('\r\n');
if (isCRLF) c = c.replace(/\r\n/g, '\n');

// 1. Replace CATEGORY_ACCENTS with strict monochromatic/brand accents
const oldCatAccents = `export const CATEGORY_ACCENTS: Record<
  GuideCategory,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconText: string;
  }
> = {
  educacion: {
    badgeBg: "bg-[#059669]",
    badgeText: "text-white",
    badgeBorder: "border-[#059669]",
    iconText: "text-white",
  },
  ecommerce: {
    badgeBg: "bg-[#2563EB]",
    badgeText: "text-white",
    badgeBorder: "border-[#2563EB]",
    iconText: "text-white",
  },
  empresas: {
    badgeBg: "bg-[#7C3AED]",
    badgeText: "text-white",
    badgeBorder: "border-[#7C3AED]",
    iconText: "text-white",
  },
  tecnica: {
    badgeBg: "bg-[#0284C7]",
    badgeText: "text-white",
    badgeBorder: "border-[#0284C7]",
    iconText: "text-white",
  },
};`;

const newCatAccents = `export const CATEGORY_ACCENTS: Record<
  GuideCategory,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconText: string;
  }
> = {
  educacion: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  ecommerce: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  empresas: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
  tecnica: {
    badgeBg: "bg-[#0F0F12]",
    badgeText: "text-white",
    badgeBorder: "border-[#0F0F12]",
    iconText: "text-[#EC3C2D]",
  },
};`;

c = c.replace(oldCatAccents, newCatAccents);

// 2. GuideHero overhaul: neo-brutalist header, display clamp title, high contrast notice
const oldHeroReturn = `    <header className="border-b border-slate-200 pb-8 sm:pb-10">
      {/* Breadcrumb contextual para volver a Inicio / Guías */}
      <Breadcrumb
        items={[
          {
            label: guidesLabel,
            to: SECTION_ROUTE,
            params: guidesHubParams(locale),
          },
          {
            label: guideTitle,
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold">
        <span
          className={\`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[13px] font-black shadow-xs \${catAccent.badgeBg} \${catAccent.badgeText}\`}
        >
          {badgeIcon && <span className={catAccent.iconText}>{badgeIcon}</span>}
          {badgeLabel}
        </span>
        <span className="text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold text-[14px]">
          <Clock className="size-4 text-slate-500" />
          {guide.readingTimeMinutes}{" "}
          {isCa ? "min de lectura" : isEn ? "min read" : "min de lectura"}
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600 font-semibold text-[14px]">
          {isCa
            ? "Actualitzat: Setembre 2026"
            : isEn
            ? "Updated: September 2026"
            : "Actualizado: Septiembre 2026"}
        </span>
      </div>

      <h1 className="text-display mt-5 text-[2.25rem] sm:text-[3.25rem] font-black tracking-[-0.025em] text-[#0F172A] leading-[1.12]">
        {guide.title[locale] || guide.title.es}
      </h1>

      <p className="mt-4 text-[17px] sm:text-[18.5px] leading-relaxed text-slate-700 font-normal">
        {subtitle}
      </p>

      {notice && (
        <div
          className={\`mt-6 rounded-2xl p-6 sm:p-7 shadow-sm border \${
            notice.variant === "coral"
              ? "bg-[#FEECEB] border-[#FDCAC7] text-[#0F172A]"
              : notice.variant === "brand"
              ? "bg-[#EC3C2D] border-transparent text-white"
              : notice.variant === "category"
              ? "bg-[#059669] border-transparent text-white"
              : "bg-[#0F172A] border-transparent text-white"
          }\`}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5 size-12 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#FDCAC7]/40">
              <ShieldCheck className="size-6 text-[#EC3C2D]" />
            </div>
            <div>
              <strong
                className={\`block font-black text-[18px] sm:text-[20px] tracking-tight leading-snug \${
                  notice.variant === "coral" ? "text-[#0F172A]" : "text-white"
                }\`}
              >
                {notice.title}
              </strong>
              <p
                className={\`mt-2 leading-relaxed text-[15.5px] sm:text-[16px] font-medium \${
                  notice.variant === "coral" ? "text-slate-800" : "text-white"
                }\`}
              >
                {notice.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>`;

const newHeroReturn = `    <header className="border-b-2 border-[#0F0F12] pb-10 sm:pb-12">
      {/* Breadcrumb contextual para volver a Inicio / Guías */}
      <Breadcrumb
        items={[
          {
            label: guidesLabel,
            to: SECTION_ROUTE,
            params: guidesHubParams(locale),
          },
          {
            label: guideTitle,
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold mt-4">
        <span
          className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black tracking-wider text-white shadow-[2px_2px_0_#0F0F12] uppercase"
        >
          {badgeIcon && <span className="text-[#EC3C2D]">{badgeIcon}</span>}
          {badgeLabel}
        </span>
        <span className="text-slate-400 font-bold">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-700 font-bold text-[14px]">
          <Clock className="size-4 text-slate-600" />
          {guide.readingTimeMinutes}{" "}
          {isCa ? "min de lectura" : isEn ? "min read" : "min de lectura"}
        </span>
        <span className="text-slate-400 font-bold">•</span>
        <span className="text-slate-700 font-bold text-[14px]">
          {isCa
            ? "Actualitzat: Setembre 2026"
            : isEn
            ? "Updated: September 2026"
            : "Actualizado: Septiembre 2026"}
        </span>
      </div>

      <h1 className="text-display mt-6 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-black tracking-[-0.035em] text-[#0F0F12] leading-[1.08] max-w-5xl">
        {guide.title[locale] || guide.title.es}
      </h1>

      <p className="mt-5 text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-medium max-w-4xl">
        {subtitle}
      </p>

      {notice && (
        <div className="mt-8 rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12]">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5 size-12 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] flex items-center justify-center text-white shadow-[2px_2px_0_#0F0F12]">
              <ShieldCheck className="size-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <strong className="block font-black text-[20px] sm:text-[22px] tracking-tight leading-snug text-[#0F0F12]">
                {notice.title}
              </strong>
              <p className="mt-2.5 leading-relaxed text-[16px] sm:text-[17px] font-normal text-slate-700">
                {notice.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>`;

c = c.replace(oldHeroReturn, newHeroReturn);

// 3. GuideInfographic with resilient SVG fallback
const oldInfographic = `export function GuideInfographic({ src, alt, caption, borderless = false }: GuideInfographicProps) {
  return (
    <figure className={\`my-8 overflow-hidden \${borderless ? "bg-transparent shadow-none" : "rounded-2xl bg-white shadow-sm"}\`}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={480}
        className="w-full h-auto object-contain block"
        loading="eager"
      />
      {caption && (
        <figcaption className="bg-slate-50 px-5 py-3 text-center text-[14px] text-slate-600 border-t border-slate-100 font-medium leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}`;

const newInfographic = `export function GuideInfographic({ src, alt, caption, borderless = false }: GuideInfographicProps) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12]">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={1200}
          height={480}
          className="w-full h-auto object-contain block bg-white"
          loading="eager"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Diagrama metodológico de decisión interactivo SVG / Neo-brutalista */
        <div className="p-8 sm:p-10 bg-[#EDEDF0] border-b-2 border-[#0F0F12]">
          <div className="mx-auto max-w-2xl text-center mb-7">
            <span className="inline-block px-3.5 py-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#0F0F12]">
              DIAGRAMA METODOLÓGICO DE DECISIÓN
            </span>
            <h4 className="mt-3 text-2xl sm:text-3xl font-black text-[#0F0F12] tracking-tight">
              Resolución de límites de subida en campus virtual
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">1</span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">Entrega de un solo archivo</h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la tarea solo autoriza 1 adjunto, aplica <strong>Comprimir PDF</strong> preservando la memoria unificada del trabajo y la nitidez de tipografías.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white flex items-center justify-center font-black text-sm shadow-[1px_1px_0_#0F0F12]">2</span>
                <h5 className="font-black text-[18px] text-[#0F0F12]">Se admiten múltiples adjuntos</h5>
              </div>
              <p className="text-[15.5px] text-slate-700 leading-relaxed font-normal">
                Si la plataforma acepta varios documentos, aplica <strong>Dividir PDF por tamaño</strong> generando tomos numerados de 5 a 10 MB.
              </p>
            </div>
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="bg-[#EDEDF0] px-5 py-3.5 text-center text-[14px] text-slate-800 border-t-2 border-[#0F0F12] font-bold leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}`;

c = c.replace(oldInfographic, newInfographic);

// 4. Overhaul GuideStep to neo-brutalism
const oldStep = `export function GuideStep({
  stepNumber,
  title,
  children,
  action,
}: GuideStepProps) {
  const formattedNumber = String(stepNumber).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3.5 mb-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#0F172A] text-[15px] font-black text-white shrink-0 shadow-xs">
          {formattedNumber}
        </span>
        <h3 className="text-[19px] sm:text-[21px] font-black text-[#0F172A] tracking-tight">
          {title}
        </h3>
      </div>
      <div className="mt-2 text-[15.5px] sm:text-[16px] leading-relaxed text-slate-700 pl-0 sm:pl-12">
        {children}
      </div>
      {action && <div className="mt-4 pt-1 pl-0 sm:pl-12">{action}</div>}
    </div>
  );
}`;

const newStep = `export function GuideStep({
  stepNumber,
  title,
  children,
  action,
}: GuideStepProps) {
  const formattedNumber = String(stepNumber).padStart(2, "0");

  return (
    <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] my-6">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex size-10 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-[16px] font-black text-white shrink-0 shadow-[2px_2px_0_#0F0F12]">
          {formattedNumber}
        </span>
        <h3 className="text-[21px] sm:text-[24px] font-black text-[#0F0F12] tracking-tight">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-[16.5px] sm:text-[17.5px] leading-relaxed text-slate-800 pl-0 sm:pl-14 font-normal">
        {children}
      </div>
      {action && <div className="mt-5 pt-1 pl-0 sm:pl-14">{action}</div>}
    </div>
  );
}`;

c = c.replace(oldStep, newStep);

// 5. Overhaul GuideCTA to strict neo-brutalist solid red CTA
const oldCTA = `export function GuideCTA({
  to,
  eyebrow,
  title,
  description,
  buttonText,
  icon,
  variant = "solid-red",
}: GuideCTAProps) {
  if (variant === "solid-red") {
    return (
      <div className="my-8 rounded-2xl bg-[#EC3C2D] text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            {eyebrow && (
              <span className="inline-block text-[12px] font-black uppercase tracking-wider text-[#EC3C2D] bg-white px-2.5 py-0.5 rounded-md mb-2 shadow-xs">
                {eyebrow}
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/95">
              {description}
            </p>
          </div>
          <Link
            to={to}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-[#EC3C2D] hover:bg-slate-50 px-6 py-3.5 text-[15.5px] font-black shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            {icon}
            <span>{buttonText}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="max-w-xl">
          {eyebrow && (
            <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-[#EC3C2D] bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100 mb-2">
              {eyebrow}
            </span>
          )}
          <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] hover:bg-[#D43426] text-white px-5 py-3 text-[15px] font-bold shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
        >
          {icon}
          <span>{buttonText}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}`;

const newCTA = `export function GuideCTA({
  to,
  eyebrow,
  title,
  description,
  buttonText,
  icon,
}: GuideCTAProps) {
  return (
    <div className="my-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white p-8 sm:p-9 shadow-[4px_4px_0_#0F0F12]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          {eyebrow && (
            <span className="inline-block text-[12px] font-black uppercase tracking-wider text-[#0F0F12] bg-white border-2 border-[#0F0F12] px-3 py-1 rounded-lg mb-3 shadow-[2px_2px_0_#0F0F12]">
              {eyebrow}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-[16px] sm:text-[17px] leading-relaxed text-white/95 font-medium">
            {description}
          </p>
        </div>
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] hover:bg-[#EDEDF0] min-h-[50px] px-7 py-3.5 text-[16px] font-black shadow-[4px_4px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12]"
        >
          {icon}
          <span>{buttonText}</span>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}`;

c = c.replace(oldCTA, newCTA);

// 6. Overhaul GuideMascotCallout to strict neo-brutalism
const oldMascotCallout = `export function GuideMascotCallout({
  variant,
  title,
  description,
  children,
  alt = "Mascota oficial de BreadPDF",
  badge,
  background = "red",
}: GuideMascotCalloutProps) {
  const imgSrc = BRAND_ASSETS.mascots[variant];

  if (background === "coral") {
    return (
      <div className="my-8 rounded-2xl bg-[#FEECEB] border border-[#FDCAC7] text-[#0F172A] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={140}
              height={140}
              className="h-28 w-28 sm:h-32 sm:w-32 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[12px] font-black uppercase tracking-wider text-white bg-[#EC3C2D] px-3 py-1 rounded-full mb-2.5 shadow-xs">
                {badge}
              </span>
            )}
            <h4 className="text-[20px] sm:text-[22px] font-black text-[#0F172A] tracking-tight">
              {title}
            </h4>
            <p className="mt-2 text-[15.5px] sm:text-[16px] leading-relaxed text-slate-800 font-medium">
              {description}
            </p>
            {children && <div className="mt-3.5">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (background === "red") {
    return (
      <div className="my-8 rounded-2xl bg-[#EC3C2D] text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={128}
              height={128}
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[11.5px] font-black uppercase tracking-wider text-[#EC3C2D] bg-white px-2.5 py-0.5 rounded-full mb-2 shadow-xs">
                {badge}
              </span>
            )}
            <h4 className="text-[18px] sm:text-[20px] font-black text-white tracking-tight">
              {title}
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/95">
              {description}
            </p>
            {children && <div className="mt-3">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (background === "navy") {
    return (
      <div className="my-8 rounded-2xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={alt}
              width={128}
              height={128}
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            {badge && (
              <span className="inline-block text-[11.5px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-0.5 rounded-full mb-2">
                {badge}
              </span>
            )}
            <h4 className="text-[18px] sm:text-[20px] font-black text-white tracking-tight">
              {title}
            </h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">
              {description}
            </p>
            {children && <div className="mt-3">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="shrink-0 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={alt}
            width={128}
            height={128}
            className="h-24 w-24 sm:h-28 sm:w-28 object-contain select-none pointer-events-none drop-shadow-sm"
            loading="lazy"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          {badge && (
            <span className="inline-block text-[11.5px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full mb-2">
              {badge}
            </span>
          )}
          <h4 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
            {title}
          </h4>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
            {description}
          </p>
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </div>
  );
}`;

const newMascotCallout = `export function GuideMascotCallout({
  variant,
  title,
  description,
  children,
  alt = "Mascota oficial de BreadPDF",
  badge,
  background = "red",
}: GuideMascotCalloutProps) {
  const imgSrc = BRAND_ASSETS.mascots[variant];
  const isRed = background === "red" || background === "coral";
  const bgClasses = isRed
    ? "bg-[#EC3C2D] text-white"
    : background === "navy"
    ? "bg-[#0F0F12] text-white"
    : "bg-white text-[#0F0F12]";

  return (
    <div className={\`my-10 rounded-2xl border-2 border-[#0F0F12] \${bgClasses} p-7 sm:p-9 shadow-[4px_4px_0_#0F0F12]\`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <div className="shrink-0 flex items-center justify-center size-24 sm:size-28 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] shadow-[2px_2px_0_#0F0F12] p-2">
          <img
            src={imgSrc}
            alt={alt}
            width={100}
            height={100}
            className="size-20 sm:size-24 object-contain select-none pointer-events-none drop-shadow-xs"
            loading="lazy"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          {badge && (
            <span className={\`inline-block text-[12px] font-black uppercase tracking-wider border-2 border-[#0F0F12] px-3 py-1 rounded-lg mb-3 shadow-[2px_2px_0_#0F0F12] \${
              isRed || background === "navy" ? "bg-white text-[#0F0F12]" : "bg-[#0F0F12] text-white"
            }\`}>
              {badge}
            </span>
          )}
          <h4 className="text-[22px] sm:text-[25px] font-black tracking-tight leading-snug">
            {title}
          </h4>
          <p className={\`mt-2.5 text-[16px] sm:text-[17px] leading-relaxed font-normal \${
            isRed ? "text-white/95" : background === "navy" ? "text-slate-300" : "text-slate-700"
          }\`}>
            {description}
          </p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}`;

c = c.replace(oldMascotCallout, newMascotCallout);

// 7. Overhaul GuideFAQ & GuideFooterSources
const oldFaq = `export function GuideFAQ({ title, faqs }: GuideFAQProps) {
  return (
    <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="faq-section-title">
      <h2
        id="faq-section-title"
        className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5"
      >
        <HelpCircle className="size-6 text-[#EC3C2D]" />
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-slate-300"
          >
            <summary className="flex cursor-pointer items-center justify-between text-[16px] font-bold text-slate-900 select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/40 rounded-lg">
              <span className="pr-4">{faq.q}</span>
              <span className="shrink-0 rounded-full p-1 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 group-open:rotate-180">
                <ArrowRight className="size-4 rotate-90" />
              </span>
            </summary>
            <div className="mt-3.5 border-t border-slate-100 pt-3.5 text-[15px] leading-relaxed text-slate-600">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}`;

const newFaq = `export function GuideFAQ({ title, faqs }: GuideFAQProps) {
  return (
    <section className="mt-16 border-t-2 border-[#0F0F12] pt-12" aria-labelledby="faq-section-title">
      <h2
        id="faq-section-title"
        className="text-[26px] sm:text-[32px] font-black text-[#0F0F12] tracking-tight flex items-center gap-3"
      >
        <span className="size-9 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white flex items-center justify-center shadow-[2px_2px_0_#0F0F12] shrink-0">
          <HelpCircle className="size-5 text-white" />
        </span>
        <span>{title}</span>
      </h2>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-6 shadow-[3px_3px_0_#0F0F12] transition-all"
          >
            <summary className="flex cursor-pointer items-center justify-between text-[17px] sm:text-[18px] font-black text-[#0F0F12] select-none list-none [&::-webkit-details-marker]:hidden">
              <span className="pr-4 leading-snug">{faq.q}</span>
              <span className="shrink-0 rounded-lg border-2 border-[#0F0F12] p-1.5 bg-[#EDEDF0] text-[#0F0F12] group-open:rotate-180 transition-transform shadow-[1px_1px_0_#0F0F12]">
                <ArrowRight className="size-4 rotate-90" />
              </span>
            </summary>
            <div className="mt-4 border-t-2 border-[#0F0F12]/10 pt-4 text-[16px] sm:text-[16.5px] leading-relaxed text-slate-700 font-normal">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}`;

c = c.replace(oldFaq, newFaq);

const oldFooterSources = `export function GuideFooterSources({ title, children }: GuideFooterSourcesProps) {
  return (
    <footer className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-9 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-xs">
          <BookOpen className="size-4.5 text-white" />
        </div>
        <h4 className="font-black text-[#0F172A] text-[17px] sm:text-[18px] tracking-tight">
          {title}
        </h4>
      </div>
      <div className="text-slate-700 leading-relaxed text-[15px] sm:text-[15.5px] space-y-2.5 pl-0 sm:pl-12">
        {children}
      </div>
    </footer>
  );
}`;

const newFooterSources = `export function GuideFooterSources({ title, children }: GuideFooterSourcesProps) {
  return (
    <footer className="mt-14 rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12]">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0_#0F0F12]">
          <BookOpen className="size-5 text-white" />
        </div>
        <h4 className="font-black text-[#0F0F12] text-[19px] sm:text-[21px] tracking-tight">
          {title}
        </h4>
      </div>
      <div className="text-slate-700 leading-relaxed text-[15.5px] sm:text-[16.5px] space-y-3 pl-0 sm:pl-13 font-normal">
        {children}
      </div>
    </footer>
  );
}`;

c = c.replace(oldFooterSources, newFooterSources);

fs.writeFileSync(p, isCRLF ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('Successfully updated GuideEditorial.tsx!');
