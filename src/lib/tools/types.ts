export type ToolCategory =
  | "organizar"
  | "convertir"
  | "optimizar"
  | "editar"
  | "seguridad"
  | "inteligencia";

export type ToolStatus = "live" | "pending";

export type OptionField =
  | {
      key: string;
      type: "select";
      label: string;
      help?: string;
      default: string;
      options: { value: string; label: string }[];
    }
  | {
      key: string;
      type: "text";
      label: string;
      help?: string;
      default: string;
      placeholder?: string;
    }
  | {
      key: string;
      type: "range";
      label: string;
      help?: string;
      default: number;
      min: number;
      max: number;
      step: number;
      unit?: string;
    };

export type OptionValues = Record<string, string | number>;

export type ToolOutput = {
  name: string;
  blob: Blob;
};

export type ToolRunResult = {
  outputs: ToolOutput[];
  /** Optional short factual note about the result, e.g. size reduction. */
  note?: string;
};

export type ToolRunContext = {
  onProgress: (ratio: number) => void;
};

export type ToolRunner = (
  files: File[],
  options: OptionValues,
  ctx: ToolRunContext,
) => Promise<ToolRunResult>;

export type ToolDefinition = {
  slug: string;
  name: string;
  h1: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  category: ToolCategory;
  icon: string;
  status: ToolStatus;
  /** Why the tool is not available yet (status === "pending"). */
  pendingReason?: string;
  accept: string;
  multiple: boolean;
  minFiles: number;
  ctaLabel: string;
  keywords: string[];
  howItWorks: string[];
  faq: { q: string; a: string }[];
  options?: OptionField[];
  run?: ToolRunner;
};
