import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * BreadPDF Supabase Client Configuration
 * 
 * Public / Anonymous access keys for browser & SSR queries.
 * Safe for client exposure (Row Level Security protects all tables).
 * 
 * Dynamic loading: The heavy @supabase/supabase-js library (~223 KB)
 * is loaded lazily on demand so anonymous visitors and initial SSR renders
 * do not suffer JS bundle bloat on the critical rendering path.
 */

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SUPABASE_URL"]) ||
  (typeof process !== "undefined" && process.env?.["VITE_SUPABASE_URL"]) ||
  "";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SUPABASE_ANON_KEY"]) ||
  (typeof process !== "undefined" && process.env?.["VITE_SUPABASE_ANON_KEY"]) ||
  "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let _supabaseInstance: SupabaseClient | null = null;
let _supabasePromise: Promise<SupabaseClient | null> | null = null;

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  if (_supabaseInstance) return _supabaseInstance;
  if (_supabasePromise) return _supabasePromise;

  _supabasePromise = (async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      _supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
      return _supabaseInstance;
    } catch (err) {
      console.error("Failed to dynamically initialize Supabase client", err);
      return null;
    } finally {
      _supabasePromise = null;
    }
  })();

  return _supabasePromise;
}
