export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLoginAt?: string | undefined;
  emailVerified?: boolean;
  isPremium: boolean;
  newsletterSubscribed: boolean;
  preferredLocale: string;
  avatarUrl?: string | undefined;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  newsletterSubscribed?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}
