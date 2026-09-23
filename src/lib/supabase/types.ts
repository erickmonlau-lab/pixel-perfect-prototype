/**
 * BreadPDF Profile Model for Supabase
 * Directly mapped to public.profiles
 */

export interface Profile {
  id: string; // references auth.users(id)
  name: string;
  avatar_url: string | null;
  preferred_locale: string;
  newsletter_subscribed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserFavoriteRecord {
  user_id: string;
  tool_id: string;
  created_at: string;
}
