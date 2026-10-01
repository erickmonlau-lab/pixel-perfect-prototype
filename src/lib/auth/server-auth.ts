/**
 * BreadPDF Secure Server Auth Core
 * 
 * - Web Crypto API native (Node.js, Bun, Cloudflare Workers, Edge)
 * - PBKDF2 + SHA-256 + 100,000 iterations + Salt 16 bytes for passwords
 * - Cryptographic session token generation (32 bytes entropy)
 * - HMAC-SHA256 signed HttpOnly cookies
 * - In-memory persistent database store during worker lifecycle with automatic seed
 */

import type { User, RegisterPayload, LoginPayload } from "./types";

export interface StoredUser extends User {
  passwordHash: string | null; // null for pure OAuth users
  passwordSalt: string | null;
  authProvider: "email" | "google" | "hybrid";
  updatedAt: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

// Session TTL: 30 days
export const SESSION_COOKIE_NAME = "breadpdf_session";
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

// Secret key for cookie HMAC signing (Server-only)
const COOKIE_SIGNING_SECRET =
  (typeof process !== "undefined" && process.env?.["AUTH_SECRET"]) ||
  "breadpdf_secure_hmac_secret_production_seed_987428174129";

/**
 * In-memory persistence on the server environment.
 * Shared across server requests in the same runtime instance.
 */
class ServerAuthStore {
  private users: Map<string, StoredUser> = new Map(); // key: userId
  private usersByEmail: Map<string, string> = new Map(); // key: lowercase email -> userId
  private sessions: Map<string, SessionRecord> = new Map(); // key: sessionId

  public findUserById(id: string): StoredUser | null {
    return this.users.get(id) || null;
  }

  public findUserByEmail(email: string): StoredUser | null {
    const normalized = email.trim().toLowerCase();
    const userId = this.usersByEmail.get(normalized);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  public saveUser(user: StoredUser): StoredUser {
    this.users.set(user.id, user);
    this.usersByEmail.set(user.email.toLowerCase(), user.id);
    return user;
  }

  public createSession(userId: string): SessionRecord {
    const sessionId = generateSecureRandomHex(32);
    const now = Date.now();
    const session: SessionRecord = {
      id: sessionId,
      userId,
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  public getSession(sessionId: string): SessionRecord | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }
    return session;
  }

  public deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  public deleteUserSessions(userId: string): void {
    for (const [id, session] of this.sessions.entries()) {
      if (session.userId === userId) {
        this.sessions.delete(id);
      }
    }
  }

  public clearAll(): void {
    this.users.clear();
    this.usersByEmail.clear();
    this.sessions.clear();
  }
}

// Global server instance
export const serverAuthStore = new ServerAuthStore();

// ============================================================================
// Cryptographic Helpers (Native Web Crypto)
// ============================================================================

function generateSecureRandomHex(bytesLength: number): string {
  const bytes = new Uint8Array(bytesLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = generateSecureRandomHex(16);
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    256
  );

  const hash = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { hash, salt };
}

export async function verifyPassword(password: string, expectedHash: string, salt: string): Promise<boolean> {
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    256
  );

  const calculatedHash = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return calculatedHash === expectedHash;
}

// HMAC-SHA256 for Signed Cookies
async function signCookieValue(value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(COOKIE_SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  const signature = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${value}.${signature}`;
}

async function verifyCookieValue(signedValue: string): Promise<string | null> {
  const parts = signedValue.split(".");
  if (parts.length !== 2) return null;
  const [value, signature] = parts;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(COOKIE_SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigBytes = new Uint8Array(
    signature!.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(value!));
  return isValid ? (value ?? null) : null;
}

// ============================================================================
// Cookie Serialization & Extraction
// ============================================================================

export async function createSessionCookieHeader(sessionId: string, isSecure = false): Promise<string> {
  const signed = await signCookieValue(sessionId);
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  const secureFlag = isSecure ? " Secure;" : "";
  return `${SESSION_COOKIE_NAME}=${signed}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax;${secureFlag}`;
}

export function createClearSessionCookieHeader(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax;`;
}

export async function extractSessionIdFromHeader(cookieHeader: string | null): Promise<string | null> {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const target = cookies.find((c) => c.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!target) return null;
  const signedValue = target.substring(SESSION_COOKIE_NAME.length + 1);
  return await verifyCookieValue(signedValue);
}

// Safe User Projection (Never exposes passwordHash, salt, internal secrets)
export function sanitizeUser(user: StoredUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    emailVerified: user.emailVerified ?? false,
    isPremium: false, // In Phase 1, isPremium is strictly false / decoupled from entitlements
    newsletterSubscribed: !!user.newsletterSubscribed,
    preferredLocale: user.preferredLocale || "es",
    avatarUrl: user.avatarUrl,
  };
}

// ============================================================================
// Core Server Authentication Operations
// ============================================================================

export async function serverRegister(payload: RegisterPayload): Promise<{ user: User; session: SessionRecord }> {
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim().toLowerCase();
  const password = payload.password || "";

  if (!name) {
    throw new Error("Por favor, introduce tu nombre.");
  }
  if (!email || !email.includes("@")) {
    throw new Error("Por favor, introduce un correo electrónico válido.");
  }
  if (password.length < 8) {
    throw new Error("La contraseña debe contener un mínimo de 8 caracteres.");
  }

  const existing = serverAuthStore.findUserByEmail(email);
  if (existing) {
    throw new Error("Ya existe una cuenta con este correo electrónico.");
  }

  const { hash, salt } = await hashPassword(password);
  const nowIso = new Date().toISOString();

  const newUser: StoredUser = {
    id: "usr_" + generateSecureRandomHex(8),
    name,
    email,
    passwordHash: hash,
    passwordSalt: salt,
    authProvider: "email",
    emailVerified: false,
    isPremium: false,
    newsletterSubscribed: !!payload.newsletterSubscribed,
    preferredLocale: "es",
    createdAt: nowIso,
    updatedAt: nowIso,
    lastLoginAt: nowIso,
  };

  serverAuthStore.saveUser(newUser);
  const session = serverAuthStore.createSession(newUser.id);

  return {
    user: sanitizeUser(newUser),
    session,
  };
}

export async function serverLogin(payload: LoginPayload): Promise<{ user: User; session: SessionRecord }> {
  const email = (payload.email || "").trim().toLowerCase();
  const password = payload.password || "";

  if (!email || !password) {
    throw new Error("Por favor, introduce tu email y contraseña.");
  }

  const user = serverAuthStore.findUserByEmail(email);
  if (!user) {
    // Strict separation: Do NOT auto-register. Return clear error.
    throw new Error("No existe ninguna cuenta asociada a este correo electrónico.");
  }

  if (!user.passwordHash || !user.passwordSalt) {
    throw new Error("Esta cuenta inició sesión mediante un proveedor externo (Google).");
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash, user.passwordSalt);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta. Por favor, revísala.");
  }

  const nowIso = new Date().toISOString();
  user.lastLoginAt = nowIso;
  user.updatedAt = nowIso;
  serverAuthStore.saveUser(user);

  const session = serverAuthStore.createSession(user.id);

  return {
    user: sanitizeUser(user),
    session,
  };
}

export async function serverGetCurrentUser(cookieHeader: string | null): Promise<User | null> {
  const sessionId = await extractSessionIdFromHeader(cookieHeader);
  if (!sessionId) return null;

  const session = serverAuthStore.getSession(sessionId);
  if (!session) return null;

  const user = serverAuthStore.findUserById(session.userId);
  if (!user) return null;

  return sanitizeUser(user);
}

export async function serverLogout(cookieHeader: string | null): Promise<void> {
  const sessionId = await extractSessionIdFromHeader(cookieHeader);
  if (sessionId) {
    serverAuthStore.deleteSession(sessionId);
  }
}

export async function serverUpdateProfile(
  cookieHeader: string | null,
  updates: Partial<Pick<User, "name" | "avatarUrl" | "preferredLocale" | "newsletterSubscribed">>
): Promise<User> {
  const sessionId = await extractSessionIdFromHeader(cookieHeader);
  if (!sessionId) {
    throw new Error("No autorizado. Sesión no válida o expirada.");
  }

  const session = serverAuthStore.getSession(sessionId);
  if (!session) {
    throw new Error("No autorizado. Sesión no encontrada.");
  }

  const user = serverAuthStore.findUserById(session.userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  if (updates.name !== undefined) user.name = updates.name.trim();
  if (updates.avatarUrl !== undefined) user.avatarUrl = updates.avatarUrl;
  if (updates.preferredLocale !== undefined) user.preferredLocale = updates.preferredLocale;
  if (updates.newsletterSubscribed !== undefined) user.newsletterSubscribed = !!updates.newsletterSubscribed;

  user.updatedAt = new Date().toISOString();
  serverAuthStore.saveUser(user);

  return sanitizeUser(user);
}

export async function serverUpdatePassword(
  cookieHeader: string | null,
  currentPassword?: string,
  newPassword?: string
): Promise<void> {
  const sessionId = await extractSessionIdFromHeader(cookieHeader);
  if (!sessionId) {
    throw new Error("No autorizado. Sesión no válida o expirada.");
  }

  const session = serverAuthStore.getSession(sessionId);
  if (!session) {
    throw new Error("No autorizado. Sesión no encontrada.");
  }

  const user = serverAuthStore.findUserById(session.userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  if (!newPassword || newPassword.length < 8) {
    throw new Error("La nueva contraseña debe tener al menos 8 caracteres.");
  }

  // Si el usuario ya tiene contraseña previa configurada, verificarla si se proporciona
  if (user.passwordHash && user.passwordSalt && currentPassword) {
    const isValid = await verifyPassword(currentPassword, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      throw new Error("La contraseña actual no es correcta.");
    }
  }

  const { hash, salt } = await hashPassword(newPassword);
  user.passwordHash = hash;
  user.passwordSalt = salt;
  user.updatedAt = new Date().toISOString();
  serverAuthStore.saveUser(user);
}

