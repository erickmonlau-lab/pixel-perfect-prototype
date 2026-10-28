/**
 * Utility to notify search engines supporting the IndexNow protocol (Bing, Yandex, Naver, Seznam).
 *
 * IndexNow is an instant indexing protocol that notifies search engines immediately
 * when URLs are created, updated, or deleted. Note: submitting a URL does NOT guarantee
 * indexing or ranking; it only alerts search engines to crawl or recrawl the URL.
 *
 * Configuration requires an IndexNow API Key hosted at /{apiKey}.txt or sent in the payload.
 */

import { SITE_URL } from "./brand";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

export interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
}

/**
 * Submit URLs to the IndexNow protocol endpoint (api.indexnow.org).
 * Falls back gracefully if no API key is set in environment.
 */
export async function submitToIndexNow(
  urls: string[],
  options?: { apiKey?: string; keyLocation?: string }
): Promise<IndexNowResponse> {
  const host = new URL(SITE_URL).hostname;
  // Server-side only: the key must never be exposed as a VITE_* variable,
  // because Vite would inline it into the public client bundle.
  const apiKey =
    options?.apiKey ||
    (typeof process !== "undefined" ? process.env?.["INDEXNOW_API_KEY"] : undefined);

  if (!apiKey) {
    return {
      success: false,
      status: 400,
      message: "No IndexNow API Key provided in config or environment variables (INDEXNOW_API_KEY).",
    };
  }

  const payload: IndexNowPayload = {
    host,
    key: apiKey,
    ...(options?.keyLocation ? { keyLocation: options.keyLocation } : {}),
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      return {
        success: true,
        status: res.status,
        message: "URLs submitted successfully to IndexNow protocol.",
      };
    }

    return {
      success: false,
      status: res.status,
      message: `IndexNow responded with status ${res.status}: ${res.statusText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      message: `Failed to submit to IndexNow: ${err?.message || String(err)}`,
    };
  }
}
