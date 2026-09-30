/**
 * Google Tag Manager Integration and DataLayer Event Architecture
 * Container ID: GTM-M6D3R3JF
 *
 * Privacy guidelines:
 * - NO personal data, file names, or file contents are sent.
 * - Only tool slug and language are transmitted.
 */

export const GTM_CONTAINER_ID = "GTM-M6D3R3JF";

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export function pushGtmEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
  });
}

/**
 * Track page view events across SPA client route transitions.
 */
export function trackPageView(params: { path: string; language: string; title?: string }) {
  pushGtmEvent("page_view", {
    page_path: params.path,
    language: params.language,
    page_title: params.title || (typeof document !== "undefined" ? document.title : ""),
  });
}

/**
 * Track when a user selects or drops a file into a tool.
 * Does NOT track file names or sensitive content.
 */
export function trackFileSelected(params: { tool: string; language: string; fileCount?: number }) {
  pushGtmEvent("file_selected", {
    tool: params.tool,
    language: params.language,
    file_count: params.fileCount ?? 1,
  });
}

/**
 * Track when processing starts for a tool.
 */
export function trackProcessingStarted(params: {
  tool: string;
  language: string;
  compressionMode?: string;
}) {
  pushGtmEvent("processing_started", {
    tool: params.tool,
    language: params.language,
    ...(params.compressionMode ? { compression_mode: params.compressionMode } : {}),
  });
}

/**
 * Track when processing completes successfully.
 */
export function trackProcessingCompleted(params: {
  tool: string;
  language: string;
  outputCount?: number;
}) {
  pushGtmEvent("processing_completed", {
    tool: params.tool,
    language: params.language,
    output_count: params.outputCount ?? 1,
  });
}

/**
 * Track when the user clicks to download a processed file.
 */
export function trackDownloadClicked(params: { tool: string; language: string }) {
  pushGtmEvent("download_clicked", {
    tool: params.tool,
    language: params.language,
  });
}

/**
  * Track when the user clicks the 1-click continuation workflow button to chain tools.
  * Does NOT transmit file names, file contents or PII.
  */
export function trackWorkflowNextClicked(params: {
  fromTool: string;
  toTool: string;
  language: string;
}) {
  pushGtmEvent("workflow_next_clicked", {
    from_tool: params.fromTool,
    to_tool: params.toTool,
    language: params.language,
  });
}
