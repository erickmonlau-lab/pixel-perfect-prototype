import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./auth-context";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

const FAVORITES_STORAGE_PREFIX = "breadpdf_favorites_";
const GUEST_STORAGE_KEY = `${FAVORITES_STORAGE_PREFIX}guest`;
const DEFAULT_FAVORITES = ["comprimir-pdf", "unir-pdf", "dividir-pdf"];

function getGuestFavorites(): string[] {
  if (typeof window === "undefined") return DEFAULT_FAVORITES;
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_FAVORITES;
  } catch {
    return DEFAULT_FAVORITES;
  }
}

export function useFavorites() {
  const { user } = useAuth();
  const storageKey = user ? `${FAVORITES_STORAGE_PREFIX}${user.id}` : GUEST_STORAGE_KEY;

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return DEFAULT_FAVORITES;
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : (user ? [] : DEFAULT_FAVORITES);
    } catch {
      return DEFAULT_FAVORITES;
    }
  });

  // Carga y fusión inteligente cuando hay usuario autenticado
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    async function syncAndLoadFavorites() {
      if (!user) {
        // Modo invitado: cargar de localStorage guest
        const guestList = getGuestFavorites();
        if (isMounted) setFavorites(guestList);
        return;
      }

      // 1. Cargar favoritos locales existentes del usuario y del invitado para merge
      const guestList = getGuestFavorites();
      let userLocalList: string[] = [];
      try {
        const raw = localStorage.getItem(storageKey);
        userLocalList = raw ? JSON.parse(raw) : [];
      } catch {
        userLocalList = [];
      }

      // Merge sin duplicados: favoritos locales del usuario + favoritos de guest
      const mergedSet = new Set<string>([...userLocalList, ...guestList]);

      // 2. Si Supabase está conectado, sincronizar con public.user_favorites
      if (isSupabaseConfigured) {
        try {
          const supabase = await getSupabase();
          if (supabase) {
            const { data: remoteRows, error } = await supabase
              .from("user_favorites")
              .select("tool_id")
              .eq("user_id", user.id);

            if (!error && remoteRows) {
              remoteRows.forEach((r) => mergedSet.add(r.tool_id));
            }

            // Persistir los locales combinados a la base de datos Supabase
            const allMerged = Array.from(mergedSet);
            if (allMerged.length > 0) {
              const rowsToInsert = allMerged.map((tool_id) => ({
                user_id: user.id,
                tool_id,
              }));
              await supabase.from("user_favorites").upsert(rowsToInsert, { onConflict: "user_id,tool_id" });
            }
          }
        } catch (e) {
          console.error("Error syncing favorites with Supabase", e);
        }
      }

      const finalList = Array.from(mergedSet).length > 0 ? Array.from(mergedSet) : DEFAULT_FAVORITES;
      if (isMounted) {
        setFavorites(finalList);
        try {
          localStorage.setItem(storageKey, JSON.stringify(finalList));
        } catch (e) {
          // ignore
        }
      }
    }

    syncAndLoadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user?.id, storageKey]);

  const toggleFavorite = useCallback(
    async (canonicalSlug: string) => {
      setFavorites((prev) => {
        const exists = prev.includes(canonicalSlug);
        const next = exists
          ? prev.filter((slug) => slug !== canonicalSlug)
          : [...prev, canonicalSlug];

        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.error("Error saving favorites locally", e);
        }

        // Si está autenticado y Supabase está disponible, persistir en DB
        if (user && isSupabaseConfigured) {
          getSupabase().then((supabase) => {
            if (!supabase) return;
            if (exists) {
              supabase
                .from("user_favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("tool_id", canonicalSlug)
                .then();
            } else {
              supabase
                .from("user_favorites")
                .insert({ user_id: user.id, tool_id: canonicalSlug })
                .then();
            }
          });
        }

        return next;
      });
    },
    [user, storageKey]
  );

  const isFavorite = useCallback(
    (canonicalSlug: string) => {
      return favorites.includes(canonicalSlug);
    },
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
