export interface ApiKey {
  id: string;
  name: string;
  prefix: string; // e.g. 'bpdf_live_...'
  createdAt: string;
  lastUsedAt?: string | null;
  rateLimitPerMinute: number;
}

export interface ApiUsageRecord {
  month: string; // '2026-09'
  requestsTotal: number;
  creditsUsed: number;
  creditsAvailable: number;
}
