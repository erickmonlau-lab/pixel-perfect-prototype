import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, LoginPayload, RegisterPayload } from "./types";
import {
  fetchCurrentSession,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "./auth-store";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload, locale?: string) => Promise<{ user: User; requiresVerification: boolean }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
  refreshSession: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async (): Promise<User | null> => {
    try {
      const activeUser = await fetchCurrentSession();
      setUser(activeUser);
      return activeUser;
    } catch (e) {
      console.error("Failed to restore session", e);
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    let unsubscribeFn: (() => void) | null = null;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const runDeferredRefresh = () => {
      if (!isSubscribed) return;
      refreshSession();

      // Si Supabase está configurado, escuchar cambios de estado de autenticación en tiempo real
      if (isSupabaseConfigured) {
        getSupabase().then((supabase) => {
          if (!supabase || !isSubscribed) return;
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "TOKEN_REFRESHED") {
              await refreshSession();
            } else if (event === "SIGNED_OUT") {
              setUser(null);
              setIsLoading(false);
            }
          });
          unsubscribeFn = () => authListener.subscription.unsubscribe();
        });
      }
    };

    // Aplazar la verificación fuera del critical path del primer render (LCP/FCP)
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(runDeferredRefresh, { timeout: 3500 });
    } else {
      timeoutId = setTimeout(runDeferredRefresh, 1500);
    }

    return () => {
      isSubscribed = false;
      if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (unsubscribeFn) unsubscribeFn();
    };
  }, [refreshSession]);

  const handleLogin = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await loginUser(payload);
      setUser(res);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (payload: RegisterPayload, locale: string = "es") => {
    setIsLoading(true);
    try {
      const res = await registerUser(payload, locale);
      if (!res.requiresVerification) {
        setUser(res.user);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    const res = await updateUserProfile(updates);
    setUser(res);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
