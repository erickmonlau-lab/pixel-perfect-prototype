import type { User, RegisterPayload, LoginPayload } from "./types";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * BreadPDF Auth API Service
 * 
 * Sincronización híbrida:
 * 1. Si Supabase está configurado (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY):
 *    - Utiliza Supabase Auth + tabla public.profiles + public.user_favorites con RLS.
 * 2. Si se ejecuta en modo local o servidor sin Supabase:
 *    - Utiliza los endpoints seguros /api/auth/* con cookie HttpOnly y PBKDF2.
 * 
 * En AMBOS casos:
 * - Cero passwords en localStorage.
 * - Cero manipulación de roles/isPremium desde cliente.
 * - Sesiones reales y protegidas.
 */

const LEGACY_AUTH_STORAGE_KEY = "breadpdf_auth_session";
const LEGACY_USERS_STORAGE_KEY = "breadpdf_users_db";

export function purgeLegacyInsecureStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LEGACY_USERS_STORAGE_KEY);
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  } catch (e) {
    // Ignore storage errors in sandboxed environments
  }
}

export async function fetchCurrentSession(): Promise<User | null> {
  purgeLegacyInsecureStorage();

  if (isSupabaseConfigured) {
    try {
      const supabase = await getSupabase();
      if (supabase) {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session?.user) return null;

        const user = session.user;
        // Consultar perfil en public.profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, avatar_url, preferred_locale, newsletter_subscribed")
          .eq("id", user.id)
          .maybeSingle();

        return {
          id: user.id,
          email: user.email || "",
          name: profile?.name || user.user_metadata?["name"] || user.email?.split("@")[0] || "Usuario",
          avatarUrl: profile?.avatar_url || user.user_metadata?["avatar_url"],
          preferredLocale: profile?.preferred_locale || user.user_metadata?["preferred_locale"] || "es",
          newsletterSubscribed: profile?.newsletter_subscribed ?? !!user.user_metadata?["newsletter_subscribed"],
          emailVerified: Boolean(user.email_confirmed_at),
          isPremium: false,
          createdAt: user.created_at,
          lastLoginAt: user.last_sign_in_at || user.created_at,
        };
      }
    } catch (err) {
      console.error("Error fetching Supabase session", err);
      return null;
    }
  }

  // Fallback a servidor HTTP seguro
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch (err) {
    console.error("Error fetching session from server", err);
    return null;
  }
}

import { getEmailConfirmRedirectUrl, getPasswordResetRedirectUrl } from "./auth-redirects";

export class AuthErrorWithCode extends Error {
  code?: string | undefined;
  isUnconfirmed?: boolean | undefined;

  constructor(message: string, code?: string, isUnconfirmed?: boolean) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.isUnconfirmed = isUnconfirmed;
  }
}

export async function loginUser(payload: LoginPayload): Promise<User> {
  purgeLegacyInsecureStorage();

  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email.trim(),
        password: payload.password,
      });

      if (error || !data.user) {
        const msg = error?.message || "Credenciales incorrectas. Por favor, revísalas.";
        const isUnconfirmed =
          msg.toLowerCase().includes("email not confirmed") ||
          (error as any)?.code === "email_not_confirmed";

        throw new AuthErrorWithCode(msg, (error as any)?.code, isUnconfirmed);
      }

      const user = data.user;
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, avatar_url, preferred_locale, newsletter_subscribed")
        .eq("id", user.id)
        .maybeSingle();

      return {
        id: user.id,
        email: user.email || "",
        name: profile?.name || user.user_metadata?["name"] || user.email?.split("@")[0] || "Usuario",
        avatarUrl: profile?.avatar_url || user.user_metadata?["avatar_url"],
        preferredLocale: profile?.preferred_locale || user.user_metadata?["preferred_locale"] || "es",
        newsletterSubscribed: profile?.newsletter_subscribed ?? !!user.user_metadata?["newsletter_subscribed"],
        emailVerified: Boolean(user.email_confirmed_at),
        isPremium: false,
        createdAt: user.created_at,
        lastLoginAt: user.last_sign_in_at || user.created_at,
      };
    }
  }

  // Fallback a servidor HTTP seguro
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new AuthErrorWithCode(data.error || "Credenciales incorrectas.");
  }

  return data.user;
}

export async function registerUser(payload: RegisterPayload, locale: string = "es"): Promise<{ user: User; requiresVerification: boolean }> {
  purgeLegacyInsecureStorage();

  if (!payload.password || payload.password.length < 8) {
    throw new AuthErrorWithCode("La contraseña debe tener al menos 8 caracteres.");
  }

  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const emailRedirectTo = getEmailConfirmRedirectUrl(locale);

      const { data, error } = await supabase.auth.signUp({
        email: payload.email.trim(),
        password: payload.password,
        options: {
          emailRedirectTo,
          data: {
            name: payload.name.trim(),
            preferred_locale: locale,
            newsletter_subscribed: !!payload.newsletterSubscribed,
          },
        },
      });

      if (error || !data.user) {
        throw new AuthErrorWithCode(error?.message || "No se pudo completar el registro.", (error as any)?.code);
      }

      const user = data.user;
      const requiresVerification = !user.email_confirmed_at;

      return {
        user: {
          id: user.id,
          email: user.email || "",
          name: payload.name.trim(),
          avatarUrl: undefined,
          preferredLocale: locale,
          newsletterSubscribed: !!payload.newsletterSubscribed,
          emailVerified: Boolean(user.email_confirmed_at),
          isPremium: false,
          createdAt: user.created_at,
          lastLoginAt: user.created_at,
        },
        requiresVerification,
      };
    }
  }

  // Fallback a servidor HTTP seguro
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new AuthErrorWithCode(data.error || "No se pudo completar el registro.");
  }

  return { user: data.user, requiresVerification: false };
}

/**
 * Reenvía el correo de confirmación de registro
 */
export async function resendConfirmationEmail(email: string, locale: string = "es"): Promise<{ success: boolean; message?: string }> {
  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const emailRedirectTo = getEmailConfirmRedirectUrl(locale);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("rate limit") || (error as any).status === 429) {
          throw new AuthErrorWithCode("Demasiados intentos recientes. Por favor espera un momento antes de solicitar otro reenvío.", "over_rate_limit");
        }
        throw new AuthErrorWithCode(error.message, (error as any)?.code);
      }

      return { success: true };
    }
  }

  return { success: true, message: "Enviado si el sistema de correo está habilitado." };
}

/**
 * Solicita recuperación de contraseña mediante Supabase Auth
 * Implementa comportamiento neutral antienumeración
 */
export async function requestPasswordReset(email: string, locale: string = "es"): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const redirectTo = getPasswordResetRedirectUrl(locale);

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo,
        });

        if (error) {
          if (error.message.toLowerCase().includes("rate limit") || (error as any).status === 429) {
            throw new AuthErrorWithCode("Demasiadas solicitudes recientes. Por favor espera antes de intentarlo nuevamente.", "over_rate_limit");
          }
          // En cualquier otro caso o error interno no exponemos existencia de cuenta
          console.warn("Notice during password reset request:", error.message);
        }
      } catch (err: any) {
        if (err instanceof AuthErrorWithCode && err.code === "over_rate_limit") {
          throw err;
        }
        console.warn("Handled reset error:", err);
      }

      return {
        success: true,
        message: "Si existe una cuenta asociada a este correo, recibirás un enlace de recuperación seguro en unos instantes.",
      };
    }
  }

  return {
    success: true,
    message: "Si existe una cuenta asociada a este correo, recibirás instrucciones de recuperación.",
  };
}

/**
 * Actualiza la contraseña del usuario actualmente autenticado (en sesión de recuperación)
 */
export async function resetUserPassword(newPassword: string): Promise<void> {
  if (newPassword.length < 8) {
    throw new AuthErrorWithCode("La nueva contraseña debe tener al menos 8 caracteres.");
  }

  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new AuthErrorWithCode(error.message, (error as any)?.code);
      }
      return;
    }
  }

  throw new AuthErrorWithCode("La actualización de contraseña requiere conexión con el servicio de autenticación.");
}

export async function updateUserProfile(updates: Partial<User>): Promise<User> {
  if (isSupabaseConfigured) {
    const supabase = await getSupabase();
    if (supabase) {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !user) {
        throw new Error("No hay una sesión activa en Supabase.");
      }

      const profileUpdates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.name !== undefined) profileUpdates["name"] = updates.name.trim();
      if (updates.avatarUrl !== undefined) profileUpdates["avatar_url"] = updates.avatarUrl;
      if (updates.preferredLocale !== undefined) profileUpdates["preferred_locale"] = updates.preferredLocale;
      if (updates.newsletterSubscribed !== undefined) profileUpdates["newsletter_subscribed"] = updates.newsletterSubscribed;

      const { error: updateErr } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", user.id);

      if (updateErr) {
        // Si el perfil no existía aún, realizar upsert
        await supabase.from("profiles").upsert({
          id: user.id,
          name: updates.name || user.user_metadata?["name"] || "Usuario",
          preferred_locale: updates.preferredLocale || "es",
          newsletter_subscribed: !!updates.newsletterSubscribed,
          ...profileUpdates,
        });
      }

      // Actualizar metadata de auth
      await supabase.auth.updateUser({
        data: {
          name: updates.name,
          preferred_locale: updates.preferredLocale,
          newsletter_subscribed: updates.newsletterSubscribed,
        },
      });

      return {
        id: user.id,
        email: user.email || "",
        name: updates.name ?? user.user_metadata?["name"] ?? "Usuario",
        avatarUrl: updates.avatarUrl ?? user.user_metadata?["avatar_url"],
        preferredLocale: updates.preferredLocale ?? "es",
        newsletterSubscribed: updates.newsletterSubscribed ?? false,
        emailVerified: Boolean(user.email_confirmed_at),
        isPremium: false,
        createdAt: user.created_at,
        lastLoginAt: user.last_sign_in_at || user.created_at,
      };
    }
  }

  // Fallback a servidor HTTP seguro
  const res = await fetch("/api/auth/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
    credentials: "same-origin",
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Error al actualizar el perfil.");
  }

  return data.user;
}

export async function logoutUser(): Promise<void> {
  purgeLegacyInsecureStorage();

  if (isSupabaseConfigured) {
    try {
      const supabase = await getSupabase();
      if (supabase) {
        await supabase.auth.signOut();
        return;
      }
    } catch (err) {
      console.error("Error signing out from Supabase", err);
    }
  }

  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch (err) {
    console.error("Error during server logout", err);
  }
}
