import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  User as UserIcon,
  Star,
  Settings,
  Bell,
  Shield,
  LogOut,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Globe,
  Sliders,
  FileText,
} from "lucide-react";
import { PremiumCrownIcon } from "@/components/site/PremiumCrownIcon";
import { useAuth } from "@/lib/auth/auth-context";
import { useFavorites } from "@/lib/auth/favorites-store";
import { useLocale } from "@/lib/i18n/context";
import { GuideMascot } from "@/components/guides/editorial/GuideEditorial";
import { ToolCatalogCard } from "@/components/site/ToolCatalogCard";
import {
  HOME_ROUTE,
  SECTION_ROUTE,
  homeParams,
  premiumParams,
  catalogParams,
  toolParams,
  DETAIL_ROUTE,
} from "@/lib/i18n/routing";
import { BRAND_WORDMARK } from "@/lib/brand";
import { Breadcrumb } from "@/components/site/Breadcrumb";

type TabKey = "resumen" | "favoritos" | "preferencias" | "comunicaciones" | "seguridad" | "premium";

export function AccountDashboard() {
  const { locale, tools, t } = useLocale();
  const { user, logout, updateProfile } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  // Lee tab desde URL si está presente
  const getInitialTab = (): TabKey => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabKey;
      if (
        tabParam &&
        ["resumen", "favoritos", "preferencias", "comunicaciones", "seguridad", "premium"].includes(tabParam)
      ) {
        return tabParam;
      }
    }
    return "resumen";
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Escuchar cambios de URL o popstate
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabKey;
      if (
        tabParam &&
        ["resumen", "favoritos", "preferencias", "comunicaciones", "seguridad", "premium"].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "resumen") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const { isLoading } = useAuth();

  // Estados de perfil y preferencias
  const [profileName, setProfileName] = useState(user?.name ?? "");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(user?.newsletterSubscribed ?? false);
  const [preferredLang, setPreferredLang] = useState(user?.preferredLocale ?? locale);
  const [localProcessingNotice, setLocalProcessingNotice] = useState(true);

  // Redirigir a login si no hay sesión activa en servidor tras finalizar la carga
  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: `/${locale}/login` as any });
    }
  }, [isLoading, user, locale, navigate]);

  // Sincronizar estados locales cuando cambia el usuario autenticado
  useEffect(() => {
    if (user) {
      setProfileName(user.name ?? "");
      setNewsletterSubscribed(user.newsletterSubscribed ?? false);
      setPreferredLang(user.preferredLocale ?? locale);
    }
  }, [user, locale]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl py-24 px-5 text-center">
        <div className="inline-block size-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#EC3C2D]" />
        <p className="mt-4 text-[15px] font-semibold text-slate-600">Verificando sesión segura...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl py-20 px-5 text-center">
        <GuideMascot variant="think" className="mx-auto h-36 w-auto" />
        <h1 className="mt-6 text-2xl font-black text-[#0F172A]">Sesión requerida</h1>
        <p className="mt-2 text-slate-600">Debes iniciar sesión para acceder a tu panel de cuenta.</p>
        <Link
          to={`/${locale}/login` as any}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] px-6 py-3 font-bold text-white shadow-sm hover:bg-[#d53224]"
        >
          <span>Iniciar sesión</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  // Filtrar las herramientas favoritas actuales de las 50 oficiales
  const favoriteTools = tools.filter((tool) => favorites.includes(tool.canonicalSlug));

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: profileName.trim() || user.name,
      newsletterSubscribed,
      preferredLocale: preferredLang,
    });
    setSaveSuccess("Datos de cuenta y preferencias guardados correctamente.");
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate({ to: HOME_ROUTE, params: homeParams(locale) });
  };

  const tabLabels: Record<TabKey, Record<string, string>> = {
    resumen: { es: "Resumen", ca: "Resum", en: "Overview" },
    favoritos: { es: "Mis favoritos", ca: "Els meus preferits", en: "My favorites" },
    preferencias: { es: "Preferencias", ca: "Preferències", en: "Preferences" },
    comunicaciones: { es: "Comunicaciones", ca: "Comunicacions", en: "Communications" },
    seguridad: { es: "Seguridad", ca: "Seguretat", en: "Security" },
    premium: { es: "Estado Premium", ca: "Estat Premium", en: "Premium Status" },
  };

  const accountLabel = locale === "ca" ? "El meu compte" : locale === "en" ? "My account" : "Mi cuenta";

  const breadcrumbItems = [
    {
      label: accountLabel,
      to: activeTab !== "resumen" ? SECTION_ROUTE : undefined,
      params: activeTab !== "resumen" ? { lang: locale, section: "cuenta" } : undefined,
      search: activeTab !== "resumen" ? { tab: "resumen" } : undefined,
    },
    ...(activeTab !== "resumen"
      ? [
          {
            label: tabLabels[activeTab]?.[locale] || tabLabels[activeTab]?.["es"] || activeTab,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* Breadcrumb contextual para volver a Inicio / Mi cuenta */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Cabecera del Dashboard */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="size-14 sm:size-16 rounded-full object-cover border border-slate-200 shadow-xs"
              />
            ) : (
              <div className="flex size-14 sm:size-16 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-xs">
                <UserIcon className="size-7 sm:size-8 text-white" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  Hola, {user.name}
                </h1>
                {user.isPremium ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EC3C2D] text-white px-3 py-0.5 text-[12px] font-black uppercase tracking-wider shadow-2xs animate-premium-badge">
                    <PremiumCrownIcon className="size-3.5 text-white" />
                    <span>Plan Premium</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-[12px] font-extrabold uppercase tracking-wider text-[#0F172A]">
                    <PremiumCrownIcon className="size-3.5 text-slate-500" />
                    <span>Plan Gratuito</span>
                  </span>
                )}
              </div>
              <p className="text-[14px] text-slate-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={SECTION_ROUTE}
              params={premiumParams(locale)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] hover:bg-[#d53224] px-4 py-2.5 text-[14px] font-bold text-white shadow-xs transition-all"
            >
              <PremiumCrownIcon className="size-4 text-white" />
              <span>Explorar Premium</span>
            </Link>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-all shadow-2xs cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL: SIDEBAR + PANELES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BARRA LATERAL DE NAVEGACIÓN */}
          <aside className="lg:col-span-3 space-y-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <button
              type="button"
              onClick={() => handleTabChange("resumen")}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "resumen"
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <Sliders className="size-4.5 shrink-0" />
              <span>Resumen</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("favoritos")}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "favoritos"
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                  <Star className="size-3 fill-white text-white" />
                </span>
                <span>Mis Favoritos</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[12px] font-black ${
                  activeTab === "favoritos" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {favoriteTools.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("preferencias")}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "preferencias"
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <Settings className="size-4.5 shrink-0" />
              <span>Preferencias</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("comunicaciones")}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "comunicaciones"
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <Bell className="size-4.5 shrink-0" />
              <span>Comunicaciones</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("seguridad")}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                activeTab === "seguridad"
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <Shield className="size-4.5 shrink-0" />
              <span>Seguridad</span>
            </button>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleTabChange("premium")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-bold transition-all cursor-pointer ${
                  activeTab === "premium" || user.isPremium
                    ? "bg-[#EC3C2D] text-white shadow-xs"
                    : "text-[#EC3C2D] bg-[#FFF5F2] hover:bg-[#FFEAE4] border border-[#FCD9CE]"
                }`}
              >
                <PremiumCrownIcon className={`size-4.5 shrink-0 ${activeTab === "premium" || user.isPremium ? "text-white" : "text-[#EC3C2D]"}`} />
                <span>Estado Premium</span>
              </button>
            </div>
          </aside>

          {/* CONTENIDO DEL PANEL */}
          <main className="lg:col-span-9 space-y-6">
            {saveSuccess && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-800 text-[14.5px] flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                <span>{saveSuccess}</span>
              </div>
            )}

            {/* TAB: RESUMEN */}
            {activeTab === "resumen" && (
              <div className="space-y-6">
                {/* Banner de Bienvenida con Mascota */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EC3C2D] px-3.5 py-1 text-[12px] font-black uppercase tracking-wider text-white shadow-xs">
                      <span className="size-1.5 rounded-full bg-white shrink-0" />
                      Cuenta Activa
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                      Tu espacio personal en BreadPDF
                    </h2>
                    <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                      Todas tus herramientas PDF favoritas, ajustes y configuración de cuenta en un único panel ligero y privado.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleTabChange("favoritos")}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4.5 py-2.5 text-[14px] font-bold text-white hover:bg-slate-800 cursor-pointer"
                      >
                        <span className="flex size-4.5 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                          <Star className="size-2.5 fill-white text-white" />
                        </span>
                        <span>Ver mis favoritos ({favoriteTools.length})</span>
                      </button>
                      <Link
                        to={SECTION_ROUTE}
                        params={catalogParams(locale)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4.5 py-2.5 text-[14px] font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <span>Explorar las 50 herramientas</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <GuideMascot variant="celebrate" className="h-40 w-auto object-contain" />
                  </div>
                </div>

                {/* Grid de Estado: Plan Actual + Privacidad Garantizada */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12.5px] font-black uppercase tracking-wider text-slate-500">
                          Nivel de Plan
                        </span>
                        {user.isPremium ? (
                          <span className="rounded-full bg-[#EC3C2D] text-white px-3 py-0.5 text-[11px] font-black uppercase tracking-wider shadow-2xs animate-premium-badge">
                            Premium
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-[11px] font-extrabold uppercase text-[#0F172A]">
                            Gratuito
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl font-black text-[#0F172A]">
                        Uso Completo de 50 Herramientas
                      </h3>
                      <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                        Tienes acceso sin coste y sin límites a todas las herramientas estándar de conversión, compresión y edición directa.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleTabChange("premium")}
                        className="text-[14px] font-bold text-[#EC3C2D] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Descubre las ventajas de Premium</span>
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12.5px] font-black uppercase tracking-wider text-slate-500">
                          Privacidad y Datos
                        </span>
                        <span className="rounded-full bg-[#0F172A] text-white px-3 py-0.5 text-[11px] font-black uppercase tracking-wider shadow-xs">
                          En tu dispositivo
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-black text-[#0F172A]">
                        Procesamiento local de documentos
                      </h3>
                      <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
                        Tus archivos PDF se procesan en tu navegador sin subirse a la nube. Tu cuenta almacena únicamente tus preferencias, favoritos y datos de acceso.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Link
                        to={SECTION_ROUTE}
                        params={catalogParams(locale)}
                        className="text-[14px] font-bold text-slate-700 hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>Abrir catálogo de herramientas</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAVORITOS */}
            {activeTab === "favoritos" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                          <Star className="size-4 fill-white text-white" />
                        </span>
                        <span>Mis Herramientas Favoritas</span>
                      </h2>
                      <p className="mt-1 text-[15px] text-slate-600">
                        Acceso directo y prioritario a las utilidades que usas habitualmente.
                      </p>
                    </div>

                    <Link
                      to={SECTION_ROUTE}
                      params={catalogParams(locale)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-[14px] font-bold text-slate-800 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <span>Añadir más</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>

                  {favoriteTools.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteTools.map((tool) => (
                        <ToolCatalogCard key={tool.slug} tool={tool} compact={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 rounded-2xl border border-slate-200 p-8 sm:p-10 text-center bg-white shadow-2xs">
                      <GuideMascot variant="think" className="mx-auto h-28 w-auto mb-4" />
                      <h3 className="text-[18px] font-black text-[#0F172A]">
                        Aún no tienes herramientas favoritas
                      </h3>
                      <p className="mt-1.5 text-[15px] text-slate-600 max-w-md mx-auto leading-relaxed">
                        Marca la estrella de una herramienta para tenerla siempre a mano.
                      </p>
                      <Link
                        to={SECTION_ROUTE}
                        params={catalogParams(locale)}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EC3C2D] px-6 py-3 text-[14.5px] font-bold text-white shadow-xs hover:bg-[#d53224] transition-all"
                      >
                        <span>Explorar herramientas →</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: PREFERENCIAS */}
            {activeTab === "preferencias" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  Preferencias de Usuario
                </h2>
                <p className="mt-1 text-[15px] text-slate-600">
                  Personaliza cómo interactúas con BreadPDF y las opciones de procesamiento por defecto.
                </p>

                <form onSubmit={handleSavePreferences} className="mt-8 space-y-6 max-w-xl">
                  <div>
                    <label className="block text-[14px] font-bold text-slate-800 mb-1.5">
                      Nombre o apodo
                    </label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Tu nombre en BreadPDF"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0F172A] font-semibold outline-none focus:border-[#EC3C2D] focus:ring-2 focus:ring-[#EC3C2D]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-slate-800 mb-1.5">
                      Idioma preferido
                    </label>
                    <select
                      value={preferredLang}
                      onChange={(e) => setPreferredLang(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0F172A] font-semibold outline-none focus:border-[#EC3C2D] focus:ring-2 focus:ring-[#EC3C2D]/20"
                    >
                      <option value="es">Español (ES)</option>
                      <option value="ca">Català (CA)</option>
                      <option value="en">English (EN)</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <label className="flex items-start gap-3.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localProcessingNotice}
                        onChange={(e) => setLocalProcessingNotice(e.target.checked)}
                        className="mt-1 size-5 rounded border-slate-300 text-[#EC3C2D] focus:ring-[#EC3C2D] cursor-pointer"
                      />
                      <div>
                        <span className="text-[14.5px] font-bold text-slate-800 block">
                          Recordar preferencia de procesamiento local en navegador
                        </span>
                        <span className="text-[13.5px] text-slate-500 leading-normal block mt-0.5">
                          Prioriza siempre la ejecución directa mediante WebAssembly en tu equipo sin transferencias externas.
                        </span>
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-[#0F172A] px-6 py-3 text-[14.5px] font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Guardar preferencias
                  </button>
                </form>
              </div>
            )}

            {/* TAB: COMUNICACIONES */}
            {activeTab === "comunicaciones" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  Comunicaciones y Novedades
                </h2>
                <p className="mt-1 text-[15px] text-slate-600">
                  Controla cómo nos comunicamos contigo. Sin spam ni mensajes invasivos.
                </p>

                <form onSubmit={handleSavePreferences} className="mt-8 space-y-6 max-w-xl">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                    <label className="flex items-start gap-3.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterSubscribed}
                        onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                        className="mt-1 size-5 rounded border-slate-300 text-[#EC3C2D] focus:ring-[#EC3C2D] cursor-pointer"
                      />
                      <div>
                        <span className="text-[15px] font-bold text-slate-800 block">
                          Boletín de novedades y actualizaciones de BreadPDF
                        </span>
                        <span className="text-[13.5px] text-slate-500 leading-normal block mt-1">
                          Recibe emails ocasionales cuando publiquemos nuevas herramientas PDF, mejoras importantes de rendimiento o guías prácticas de productividad.
                        </span>
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-[#0F172A] px-6 py-3 text-[14.5px] font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Actualizar suscripción
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SEGURIDAD */}
            {activeTab === "seguridad" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                  Seguridad de la Cuenta
                </h2>
                <p className="mt-1 text-[15px] text-slate-600">
                  Gestiona las credenciales de acceso a tu cuenta de BreadPDF.
                </p>

                <div className="mt-8 space-y-6 max-w-xl">
                  <div>
                    <label className="block text-[13.5px] font-bold text-slate-600 mb-1">
                      Correo electrónico principal
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.email}
                      className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-[15px] text-slate-700 font-semibold cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-[16px] font-bold text-slate-800">
                      Cambiar contraseña
                    </h3>
                    <p className="text-[13.5px] text-slate-500 mt-1 mb-3">
                      Enviaremos un enlace seguro a tu correo electrónico para que puedas definir una nueva contraseña de acceso.
                    </p>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                      <p className="text-[13px] text-slate-600 font-medium">
                        Al pulsar el botón recibirás un enlace de restablecimiento con validez temporal en tu bandeja de entrada o spam.
                      </p>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const { requestPasswordReset } = await import("@/lib/auth/auth-store");
                            await requestPasswordReset(user.email, locale);
                            setSaveSuccess("Se ha enviado un enlace de restablecimiento seguro a tu correo electrónico.");
                          } catch (err: any) {
                            alert(err.message || "Error al solicitar el restablecimiento.");
                          }
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-[#0F172A] px-5 py-2.5 text-[13.5px] font-bold text-white hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                      >
                        Enviar enlace para cambiar contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PREMIUM */}
            {activeTab === "premium" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    {user.isPremium ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EC3C2D] text-white px-3.5 py-1 text-[12.5px] font-black uppercase tracking-wider shadow-2xs">
                        <PremiumCrownIcon className="size-3.5 text-white" />
                        Plan Activo: Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-slate-200 text-[#0F172A] px-3.5 py-1 text-[12.5px] font-extrabold uppercase tracking-wider shadow-2xs">
                        <PremiumCrownIcon className="size-3.5 text-[#0F172A]" />
                        Plan Actual: Gratuito
                      </span>
                    )}
                    <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                      Potencia tu trabajo con BreadPDF Premium
                    </h2>
                    <p className="mt-2 text-[15px] text-slate-600 max-w-xl leading-relaxed">
                      El plan gratuito incluye las 50 herramientas sin límites de documentos. Con Premium desbloqueas procesamiento en lote masivo, alta velocidad sin esperas y cero publicidad.
                    </p>
                  </div>

                  <GuideMascot variant="run" className="h-32 w-auto shrink-0" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                  <h3 className="text-[17px] font-black text-[#0F172A] mb-4">
                    Comparativa directa
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white p-4 border border-slate-200">
                      <span className="text-[13px] font-black uppercase text-slate-500">Plan Gratis</span>
                      <ul className="mt-3 space-y-2 text-[13.5px] text-slate-600">
                        <li className="flex items-center gap-2">✓ Las 50 herramientas PDF disponibles</li>
                        <li className="flex items-center gap-2">✓ Procesamiento 100% privado en navegador</li>
                        <li className="flex items-center gap-2">✓ Sin registro obligatorio</li>
                      </ul>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-[#EC3C2D]/30 shadow-2xs">
                      <span className="text-[13px] font-black uppercase text-[#EC3C2D]">Plan Premium</span>
                      <ul className="mt-3 space-y-2 text-[13.5px] text-slate-800 font-medium">
                        <li className="flex items-center gap-2">✓ 100% libre de anuncios</li>
                        <li className="flex items-center gap-2">✓ Lotes múltiples simultáneos</li>
                        <li className="flex items-center gap-2">✓ Motores OCR y modelos avanzados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={SECTION_ROUTE}
                    params={premiumParams(locale)}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#EC3C2D] px-6 py-3.5 text-[15px] font-bold text-white shadow-sm hover:bg-[#d53224] transition-all"
                  >
                    <span>Ver todos los detalles de BreadPDF Premium</span>
                    <ArrowRight className="size-4.5" />
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
