import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  ShieldCheck,
} from "lucide-react";
import { PremiumCrownIcon } from "@/components/site/PremiumCrownIcon";
import { GuideMascot } from "@/components/guides/editorial/GuideEditorial";
import { useAuth } from "@/lib/auth/auth-context";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/context";
import {
  HOME_ROUTE,
  SECTION_ROUTE,
  homeParams,
  catalogParams,
} from "@/lib/i18n/routing";

interface AuthSplitLayoutProps {
  initialMode?: "login" | "register" | "forgotPassword";
}

const AUTH_COPY = {
  es: {
    backHome: "Volver a BreadPDF",
    skipPrompt: "¿Solo necesitas procesar un archivo?",
    skipCta: "Usar herramientas sin cuenta",
    tabLogin: "Iniciar sesión",
    tabRegister: "Crear cuenta",
    backToLogin: "Volver a Iniciar sesión",
    loginH1: "Bienvenido a BreadPDF",
    loginSub: "Accede para gestionar tus favoritos, preferencias y configuración.",
    registerH1: "Crea tu cuenta BreadPDF",
    registerSub: "Guarda tus herramientas favoritas y sincroniza tus ajustes personales.",
    forgotH1: "Recuperar contraseña",
    forgotSub: "Introduce tu correo para recibir un enlace de recuperación seguro.",
    verifyH1: "Revisa tu correo",
    verifySub: "Hemos enviado un enlace de confirmación a tu dirección de email.",
    updateH1: "Crear nueva contraseña",
    updateSub: "Introduce tu nueva contraseña segura para acceder a BreadPDF.",
    unconfirmedNotice: "Tu correo electrónico aún no ha sido verificado. Para acceder a tu cuenta necesitas confirmar tu email.",
    unconfirmedCta: "Reenviar enlace de confirmación",
    unconfirmedSending: "Reenviando confirmación...",
    resendSuccess: "Enlace de confirmación reenviado con éxito. Revisa tu bandeja de entrada o spam.",
    resendCooldown: "Podrás solicitar otro reenvío en",
    spamNotice: "¿No lo encuentras? Revisa tu carpeta de correo no deseado o spam.",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    newPasswordLabel: "Nueva contraseña",
    confirmPasswordLabel: "Confirmar nueva contraseña",
    passwordsMismatch: "Las contraseñas no coinciden.",
    passwordForgot: "¿Olvidaste tu contraseña?",
    nameLabel: "Nombre o apodo",
    passwordMin: "Contraseña (mínimo 8 caracteres)",
    newsletter: "Quiero recibir novedades, nuevas herramientas y consejos de BreadPDF.",
    ctaLogin: "Acceder a mi cuenta",
    ctaLoggingIn: "Iniciando sesión...",
    ctaRegister: "Crear cuenta gratuita",
    ctaRegistering: "Creando cuenta...",
    ctaForgot: "Enviar enlace de recuperación",
    ctaSending: "Enviando instrucciones...",
    ctaUpdatePassword: "Guardar nueva contraseña",
    ctaUpdating: "Actualizando contraseña...",
    passwordUpdatedSuccess: "¡Contraseña actualizada con éxito! Redirigiendo a BreadPDF...",
    noAccount: "¿No tienes cuenta?",
    haveAccount: "¿Ya tienes cuenta?",
    localPrivacy: "Procesamiento local en el navegador cuando la herramienta lo permite.",
    rightBadge: "Tus herramientas, más personales",
    rightH2Login: "Todo BreadPDF a tu alcance.",
    rightH2Register: "Sincroniza tus herramientas habituales.",
    rightH2Verify: "Un último paso para empezar.",
    rightH2Update: "Acceso seguro protegido.",
    rightSub: "Guarda tus herramientas favoritas y tus preferencias para tenerlas siempre a mano.",
    benefit1: "Herramientas favoritas siempre a mano",
    benefit2: "Preferencias de idioma sincronizadas",
    benefit3: "Acceso rápido a tu cuenta",
    mascotCaptionLogin: "Listo para resolver tus PDFs",
    mascotCaptionRegister: "¡Bienvenido al equipo BreadPDF!",
    mascotCaptionVerify: "Comprobando tu correo seguro",
    mascotCaptionUpdate: "Protegiendo tu cuenta BreadPDF",
    bottomNote: "Las 50 herramientas siguen disponibles sin cuenta.",
    viewTools: "Ver herramientas →",
  },
  ca: {
    backHome: "Tornar a BreadPDF",
    skipPrompt: "Només necessites processar un fitxer?",
    skipCta: "Utilitzar eines sense compte",
    tabLogin: "Iniciar sessió",
    tabRegister: "Crear compte",
    backToLogin: "Tornar a Iniciar sessió",
    loginH1: "Benvingut a BreadPDF",
    loginSub: "Accedeix per gestionar els teus preferits, preferències i configuració.",
    registerH1: "Crea el teu compte BreadPDF",
    registerSub: "Desa les teves eines preferides i sincronitza els teus ajustos personals.",
    forgotH1: "Recuperar contrasenya",
    forgotSub: "Introdueix el teu correu per rebre un enllaç de recuperació segur.",
    verifyH1: "Revisa el teu correu",
    verifySub: "Hem enviat un enllaç de confirmació a la teva adreça electrònica.",
    updateH1: "Crear nova contrasenya",
    updateSub: "Introdueix la teva nova contrasenya segura per accedir a BreadPDF.",
    unconfirmedNotice: "El teu correu electrònic encara no ha estat verificat. Per accedir al teu compte cal confirmar-lo.",
    unconfirmedCta: "Reenviar enllaç de confirmació",
    unconfirmedSending: "Reenviant confirmació...",
    resendSuccess: "Enllaç de confirmació reenviat amb èxit. Revisa la teva safata d'entrada o spam.",
    resendCooldown: "Podràs sol·licitar un altre reenviament en",
    spamNotice: "No el trobes? Revisa la carpeta de correu brossa o spam.",
    emailLabel: "Correu electrònic",
    passwordLabel: "Contrasenya",
    newPasswordLabel: "Nova contrasenya",
    confirmPasswordLabel: "Confirmar nova contrasenya",
    passwordsMismatch: "Les contrasenyes no coincideixen.",
    passwordForgot: "Has oblidat la contrasenya?",
    nameLabel: "Nom o sobrenom",
    passwordMin: "Contrasenya (mínim 8 caràcters)",
    newsletter: "Vull rebre novetats, noves eines i consells de BreadPDF.",
    ctaLogin: "Accedir al meu compte",
    ctaLoggingIn: "Iniciant sessió...",
    ctaRegister: "Crear compte gratuït",
    ctaRegistering: "Creant compte...",
    ctaForgot: "Enviar enllaç de recuperació",
    ctaSending: "Enviant instruccions...",
    ctaUpdatePassword: "Desar nova contrasenya",
    ctaUpdating: "Actualitzant contrasenya...",
    passwordUpdatedSuccess: "Contrasenya actualitzada amb èxit! Redirigint a BreadPDF...",
    noAccount: "No tens compte?",
    haveAccount: "Ja tens compte?",
    localPrivacy: "Processament local al navegador quan l'eina ho permet.",
    rightBadge: "Les teves eines, més personals",
    rightH2Login: "Tot BreadPDF al teu abast.",
    rightH2Register: "Sincronitza les teves eines habituals.",
    rightH2Verify: "Un darrer pas per començar.",
    rightH2Update: "Accés segur protegit.",
    rightSub: "Desa les teves eines preferides i preferències per tenir-les sempre a mà.",
    benefit1: "Eines preferides sempre a mà",
    benefit2: "Preferències d'idioma sincronitzades",
    benefit3: "Accés ràpid al teu compte",
    mascotCaptionLogin: "A punt per resoldre els teus PDFs",
    mascotCaptionRegister: "Benvingut a l'equip BreadPDF!",
    mascotCaptionVerify: "Comprovant el teu correu segur",
    mascotCaptionUpdate: "Protegint el teu compte BreadPDF",
    bottomNote: "Les 50 eines continuen disponibles sense compte.",
    viewTools: "Veure eines →",
  },
  en: {
    backHome: "Back to BreadPDF",
    skipPrompt: "Just need to process a file?",
    skipCta: "Use tools without an account",
    tabLogin: "Log in",
    tabRegister: "Create account",
    backToLogin: "Back to Log in",
    loginH1: "Welcome to BreadPDF",
    loginSub: "Sign in to manage your favorites, preferences, and account settings.",
    registerH1: "Create your BreadPDF account",
    registerSub: "Save your favorite tools and sync your personalized workflow.",
    forgotH1: "Reset password",
    forgotSub: "Enter your email to receive secure password recovery instructions.",
    verifyH1: "Check your inbox",
    verifySub: "We have sent a verification link to your email address.",
    updateH1: "Create new password",
    updateSub: "Enter your new secure password to access BreadPDF.",
    unconfirmedNotice: "Your email has not been verified yet. Please confirm your email address to log in.",
    unconfirmedCta: "Resend confirmation email",
    unconfirmedSending: "Resending confirmation...",
    resendSuccess: "Confirmation link resent successfully. Check your inbox or spam folder.",
    resendCooldown: "You can request another link in",
    spamNotice: "Can't find it? Check your spam or junk folder.",
    emailLabel: "Email address",
    passwordLabel: "Password",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm new password",
    passwordsMismatch: "Passwords do not match.",
    passwordForgot: "Forgot password?",
    nameLabel: "Name or nickname",
    passwordMin: "Password (minimum 8 characters)",
    newsletter: "I want to receive product updates, new tools, and tips from BreadPDF.",
    ctaLogin: "Sign in to my account",
    ctaLoggingIn: "Signing in...",
    ctaRegister: "Create free account",
    ctaRegistering: "Creating account...",
    ctaForgot: "Send recovery link",
    ctaSending: "Sending instructions...",
    ctaUpdatePassword: "Save new password",
    ctaUpdating: "Updating password...",
    passwordUpdatedSuccess: "Password updated successfully! Redirecting to BreadPDF...",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    localPrivacy: "Local browser processing when supported by the tool.",
    rightBadge: "Your tools, more personal",
    rightH2Login: "All of BreadPDF at your fingertips.",
    rightH2Register: "Keep your frequent tools in sync.",
    rightH2Verify: "One final step to get started.",
    rightH2Update: "Protected secure access.",
    rightSub: "Save your favorite tools and settings so they're always right where you need them.",
    benefit1: "Favorite tools always close at hand",
    benefit2: "Synced language and privacy settings",
    benefit3: "Quick access to your account",
    mascotCaptionLogin: "Ready to solve your PDF tasks",
    mascotCaptionRegister: "Welcome to the BreadPDF team!",
    mascotCaptionVerify: "Verifying your secure email",
    mascotCaptionUpdate: "Securing your BreadPDF account",
    bottomNote: "All 50 tools remain accessible without an account.",
    viewTools: "Explore tools →",
  },
} as const;

export function AuthSplitLayout({ initialMode = "login" }: AuthSplitLayoutProps) {
  const { locale } = useLocale();
  const copy = AUTH_COPY[locale as keyof typeof AUTH_COPY] || AUTH_COPY.es;
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register" | "forgotPassword" | "verifyEmail" | "updatePassword">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regNewsletter, setRegNewsletter] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");

  // Estado para usuario no confirmado (login bloqueado con opción a reenvío)
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Email guardado para pantalla de verificación
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  // Estados para modo updatePassword
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Detectar modo updatePassword reactivamente con Supabase onAuthStateChange
  React.useEffect(() => {
    if (isSupabaseConfigured) {
      let isSubscribed = true;
      let unsubscribeFn: (() => void) | null = null;
      getSupabase().then((supabase) => {
        if (!supabase || !isSubscribed) return;
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY") {
            setMode("updatePassword");
          }
        });
        unsubscribeFn = () => subscription.unsubscribe();
      });
      return () => {
        isSubscribed = false;
        if (unsubscribeFn) unsubscribeFn();
      };
    }
  }, []);

  // Detectar modo updatePassword si la URL tiene fragmento/parámetro de recovery (callback fallback)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);
      if (
        hash.includes("type=recovery") ||
        searchParams.get("mode") === "updatePassword" ||
        searchParams.get("type") === "recovery"
      ) {
        setMode("updatePassword");
      }
    }
  }, []);

  // Temporizador para el cooldown de reenvío
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setUnconfirmedEmail(null);
    setIsSubmitting(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      navigate({ to: `/${locale}` });
    } catch (err: any) {
      if (err.isUnconfirmed || err.message?.toLowerCase().includes("email not confirmed")) {
        setRegisteredEmail(loginEmail);
        setUnconfirmedEmail(loginEmail);
        setMode("verifyEmail");
        setResendCooldown(60);
      } else {
        setErrorMessage(err.message || "Error al iniciar sesión.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      const res = await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        newsletterSubscribed: regNewsletter,
      }, locale);

      if (res.requiresVerification) {
        setRegisteredEmail(regEmail);
        setMode("verifyEmail");
        setResendCooldown(60);
      } else {
        setSuccessMessage(
          locale === "ca"
            ? "Compte creat correctament. Benvingut a BreadPDF!"
            : locale === "en"
            ? "Account created successfully. Welcome to BreadPDF!"
            : "Cuenta creada correctamente. ¡Bienvenido a BreadPDF!"
        );
        setTimeout(() => {
          navigate({ to: `/${locale}` });
        }, 700);
      }
    } catch (err: any) {
      if (err.message?.toLowerCase().includes("rate limit") || err.code === "over_email_send_rate_limit") {
        setErrorMessage(
          locale === "ca"
            ? "Massa peticions de correu recents. Si us plau, espera un moment abans de tornar-ho a provar."
            : locale === "en"
            ? "Too many email requests recently. Please wait a moment before trying again."
            : "Demasiadas peticiones de correo recientes. Por favor espera un momento antes de volver a intentarlo."
        );
      } else {
        setErrorMessage(err.message || "Error al crear la cuenta.");
      }
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async (targetEmail: string) => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setErrorMessage(null);
    try {
      const { resendConfirmationEmail } = await import("@/lib/auth/auth-store");
      await resendConfirmationEmail(targetEmail, locale);
      setSuccessMessage(copy.resendSuccess);
      setResendCooldown(60);
    } catch (err: any) {
      setErrorMessage(err.message || "Error al reenviar la confirmación.");
    } finally {
      setIsResending(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      const { requestPasswordReset } = await import("@/lib/auth/auth-store");
      const res = await requestPasswordReset(forgotEmail, locale);
      setSuccessMessage(
        locale === "ca"
          ? "Si existeix un compte associat a aquest correu, rebràs un enllaç de recuperació segur en uns instants."
          : locale === "en"
          ? "If an account exists with this email, you will receive a secure recovery link shortly."
          : res.message
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Ocurrió un error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage(copy.passwordsMismatch);
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage(copy.passwordMin);
      return;
    }

    setIsSubmitting(true);
    try {
      const { resetUserPassword } = await import("@/lib/auth/auth-store");
      await resetUserPassword(newPassword);
      setSuccessMessage(copy.passwordUpdatedSuccess);
      setTimeout(() => {
        navigate({ to: `/${locale}` });
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || "Error al actualizar la contraseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      {/* Microanimación sutil del personaje */}
      <style>{`
        @keyframes breadPdfFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-mascot-float {
          animation: breadPdfFloat 4.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-mascot-float {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[960px]">
        {/* BARRA SUPERIOR: SALIDA VISIBLE Y RUTAS REALES */}
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            className="group inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-bold text-[#0F172A] hover:text-[#EC3C2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC3C2D]/30"
          >
            <ArrowLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-1 text-[#0F172A] group-hover:text-[#EC3C2D]" />
            <span>{copy.backHome}</span>
          </Link>

          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            className="inline-flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>{copy.skipPrompt}</span>
            <span className="font-bold text-[#EC3C2D] hover:underline inline-flex items-center gap-0.5">
              <span>{copy.skipCta}</span>
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] grid grid-cols-1 lg:grid-cols-12">
          {/* COLUMNA IZQUIERDA: FORMULARIO CENTRADO Y NÍTIDO */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-9 flex flex-col justify-between">
            <div>
              {/* Selector de Pestañas o botón Volver */}
              <div className="flex items-center justify-between mb-5">
                {mode === "login" || mode === "register" ? (
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setUnconfirmedEmail(null);
                      }}
                      className={`cursor-pointer rounded-lg px-4 py-1.5 text-[13.5px] sm:text-[14px] font-bold transition-all ${
                        mode === "login"
                          ? "bg-white text-[#0F172A] shadow-xs"
                          : "text-slate-600 hover:text-[#0F172A]"
                      }`}
                    >
                      {copy.tabLogin}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setUnconfirmedEmail(null);
                      }}
                      className={`cursor-pointer rounded-lg px-4 py-1.5 text-[13.5px] sm:text-[14px] font-bold transition-all ${
                        mode === "register"
                          ? "bg-white text-[#0F172A] shadow-xs"
                          : "text-slate-600 hover:text-[#0F172A]"
                      }`}
                    >
                      {copy.tabRegister}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage(null);
                      setSuccessMessage(null);
                      setUnconfirmedEmail(null);
                    }}
                    className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                    <span>{copy.backToLogin}</span>
                  </button>
                )}
              </div>

              {/* Título H1 compacto y subtítulo directo */}
              <div className="transition-all duration-300">
                <h1 className="text-[25px] sm:text-[27px] font-black text-[#0F172A] tracking-tight leading-tight">
                  {mode === "login" && copy.loginH1}
                  {mode === "register" && copy.registerH1}
                  {mode === "forgotPassword" && copy.forgotH1}
                  {mode === "verifyEmail" && copy.verifyH1}
                  {mode === "updatePassword" && copy.updateH1}
                </h1>
                <p className="mt-1 text-[14px] sm:text-[14.5px] leading-relaxed text-slate-600 font-normal">
                  {mode === "login" && copy.loginSub}
                  {mode === "register" && copy.registerSub}
                  {mode === "forgotPassword" && copy.forgotSub}
                  {mode === "verifyEmail" && copy.verifySub}
                  {mode === "updatePassword" && copy.updateSub}
                </p>
              </div>

              {/* Mensajes de Alerta */}
              {errorMessage && (
                <div className="mt-3.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-[13.5px] font-semibold text-red-700">
                  <p>{errorMessage}</p>
                  {/* Botón de reenvío integrado si el usuario no está confirmado */}
                  {unconfirmedEmail && (
                    <div className="mt-2.5 pt-2.5 border-t border-red-200/80 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleResendConfirmation(unconfirmedEmail)}
                        disabled={isResending || resendCooldown > 0}
                        className="text-[13px] font-bold text-[#EC3C2D] hover:underline cursor-pointer disabled:opacity-60 text-left"
                      >
                        {isResending
                          ? copy.unconfirmedSending
                          : resendCooldown > 0
                          ? `${copy.resendCooldown} ${resendCooldown}s`
                          : `→ ${copy.unconfirmedCta}`}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {successMessage && (
                <div className="mt-3.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-[13.5px] font-semibold text-emerald-800">
                  {successMessage}
                </div>
              )}

              {/* ===================== MODO LOGIN ===================== */}
              {mode === "login" && (
                <form onSubmit={handleLoginSubmit} className="mt-4.5 space-y-3.5">
                  <div>
                    <label className="block text-[13.5px] font-bold text-slate-700 mb-1">
                      {copy.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10.5 pr-4 py-2.5 sm:py-3 text-[15px] text-[#0F172A] outline-none transition-all focus:border-[#EC3C2D] focus:ring-2 focus:ring-[#EC3C2D]/20 font-medium placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[13.5px] font-bold text-slate-700">
                        {copy.passwordLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgotPassword");
                          setErrorMessage(null);
                          setSuccessMessage(null);
                          setUnconfirmedEmail(null);
                        }}
                        className="text-[13.5px] sm:text-[14px] font-bold text-[#EC3C2D] hover:underline cursor-pointer"
                      >
                        {copy.passwordForgot}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10.5 pr-10.5 py-2.5 sm:py-3 text-[15px] text-[#0F172A] outline-none transition-all focus:border-[#EC3C2D] focus:ring-2 focus:ring-[#EC3C2D]/20 font-medium placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                      >
                        {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1.5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EC3C2D] py-3 sm:py-3.5 text-[15.5px] font-bold text-white shadow-xs hover:bg-[#d53224] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      copy.ctaLoggingIn
                    ) : (
                      <>
                        <span>{copy.ctaLogin}</span>
                        <ArrowRight className="size-4.5" />
                      </>
                    )}
                  </button>

                  <div className="pt-1.5 text-center">
                    <p className="text-[14px] text-slate-600 font-medium">
                      {copy.noAccount}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("register");
                          setErrorMessage(null);
                          setSuccessMessage(null);
                          setUnconfirmedEmail(null);
                        }}
                        className="font-bold text-[#EC3C2D] hover:underline cursor-pointer"
                      >
                        {copy.tabRegister}
                      </button>
                    </p>
                  </div>
                </form>
              )}

            </div>

            {/* Aviso de privacidad limpio debajo del formulario (PUNTO 4 Y 5) */}
            <div className="mt-6 border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2">
              <p className="text-[12.5px] sm:text-[13px] text-slate-600 flex items-center gap-2 font-medium">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#0F172A] text-white shrink-0 shadow-2xs">
                  <ShieldCheck className="size-3.5 text-white stroke-[2.5]" />
                </span>
                <span>{copy.localPrivacy}</span>
              </p>
              <Link
                to={SECTION_ROUTE}
                params={catalogParams(locale)}
                className="text-[12.5px] sm:text-[13px] font-bold text-slate-600 hover:text-[#EC3C2D] transition-colors shrink-0"
              >
                {copy.viewTools}
              </Link>
            </div>
          </div>

          {/* ============================================================
              COLUMNA DERECHA: MASCOTA + BRANDING LIMPIO Y DIRECTO
              (PUNTOS 1, 2, 3, 6, 7, 8, 9, 10, 17)
              Un único fondo sólido coral `#FFF5F2`. CERO mini-cards.
              ============================================================ */}
          <div className="lg:col-span-5 bg-[#FFF5F2] border-t lg:border-t-0 lg:border-l border-[#FCE7E1] p-6 sm:p-7 md:p-8 flex flex-col justify-between">
            <div>
              {/* Badge sólido de la marca */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#FCD9CE] px-3.5 py-1 text-[11.5px] font-black uppercase tracking-wider text-[#EC3C2D] shadow-2xs">
                <PremiumCrownIcon className="size-3.5 text-[#EC3C2D]" />
                <span>{copy.rightBadge}</span>
              </div>

              {/* Título y frase breve */}
              <h2 className="mt-3 text-[19px] sm:text-[21px] font-black leading-snug tracking-tight text-[#0F172A]">
                {mode === "register" && copy.rightH2Register}
                {mode === "verifyEmail" && copy.rightH2Verify}
                {mode === "updatePassword" && copy.rightH2Update}
                {(mode === "login" || mode === "forgotPassword") && copy.rightH2Login}
              </h2>

              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700 font-normal">
                {copy.rightSub}
              </p>
            </div>

            {/* MASCOTA PROTAGONISTA */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="animate-mascot-float">
                <GuideMascot
                  variant={mode === "register" ? "celebrate" : mode === "verifyEmail" ? "run" : "think"}
                  priority={true}
                  alt="Mascota oficial de BreadPDF"
                  className="h-48 sm:h-56 md:h-60 w-auto object-contain select-none pointer-events-none drop-shadow-[0_14px_28px_rgba(236,60,45,0.15)] transition-all duration-300"
                />
              </div>
              <p className="mt-2 text-[12.5px] font-bold text-slate-500 text-center">
                {mode === "register" && copy.mascotCaptionRegister}
                {mode === "verifyEmail" && copy.mascotCaptionVerify}
                {mode === "updatePassword" && copy.mascotCaptionUpdate}
                {(mode === "login" || mode === "forgotPassword") && copy.mascotCaptionLogin}
              </p>
            </div>

            {/* LISTA VISUAL UNIFICADA: Los 3 con círculo ROJO BREADPDF SÓLIDO + check BLANCO (PUNTO 3) */}
            <div className="space-y-2 pt-1 border-t border-[#FCD9CE]/60">
              <div className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-semibold text-slate-800">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EC3C2D] text-white shadow-2xs">
                  <Check className="size-3 stroke-[3]" />
                </span>
                <span>{copy.benefit1}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-semibold text-slate-800">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EC3C2D] text-white shadow-2xs">
                  <Check className="size-3 stroke-[3]" />
                </span>
                <span>{copy.benefit2}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] font-semibold text-slate-800">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EC3C2D] text-white shadow-2xs">
                  <Check className="size-3 stroke-[3]" />
                </span>
                <span>{copy.benefit3}</span>
              </div>

              {/* Texto inferior limpio SIN CARD (PUNTO 6) */}
              <p className="text-[12px] text-slate-500 pt-2 font-medium">
                {copy.bottomNote}
              </p>
            </div>
          </div>
        </div>

        {/* Enlace móvil complementario (PUNTO 19) */}
        <div className="mt-5 text-center lg:hidden">
          <Link
            to={HOME_ROUTE}
            params={homeParams(locale)}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-slate-600 hover:text-[#EC3C2D]"
          >
            <ArrowLeft className="size-4" />
            <span>{copy.backHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
