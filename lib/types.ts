export type CatalystType =
  | "earnings"
  | "fda"
  | "regulatory"
  | "contract"
  | "product"
  | "macro"
  | "other";

export type Industry =
  | "ai_semis"
  | "energy"
  | "biotech"
  | "defense"
  | "fintech"
  | "consumer"
  | "crypto"
  | "other";

export type Risk = "low" | "medium" | "high";

export type MarketCapClass = "micro" | "small" | "mid" | "large" | "mega";

export type GuidanceTrajectory = "raised" | "maintained" | "lowered" | "none";

export type CatalystStatus = "upcoming" | "fired" | "cancelled";

export type Sentiment = "bullish" | "bearish" | "neutral";

export interface Catalyst {
  id: string;
  ticker: string;
  company: string;
  event: string;
  eventDate: string; // ISO date
  type: CatalystType;
  industry: Industry;
  risk: Risk;
  marketCapClass: MarketCapClass;
  marketCapUsd: number | null;
  upsideThesis: string;
  downsideThesis: string;
  note: string;
  optionsFlow: string | null;
  guidanceTrajectory: GuidanceTrajectory;
  sympathyTickers: string[];
  sourceUrl: string;
  confidenceScore: number; // 0-100
  status: CatalystStatus;
  outcomeSummary: string | null;
  outcomePriceChangePct: number | null;
}

export interface NewsItem {
  id: string;
  ticker: string;
  headline: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  summary: string;
  sentiment: Sentiment;
  industry: Industry;
  relevanceScore: number; // 0-100
}

export interface CatalystFilters {
  search?: string;
  ticker?: string;
  industries?: Industry[];
  types?: CatalystType[];
  risks?: Risk[];
  caps?: MarketCapClass[];
  guidance?: GuidanceTrajectory[];
  multiOnly?: boolean;
  watchedOnly?: boolean;
  status?: CatalystStatus;
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  ai_semis: "AI / Semis",
  energy: "Energy",
  biotech: "Biotech",
  defense: "Defense",
  fintech: "Fintech",
  consumer: "Consumer",
  crypto: "Crypto",
  other: "Other",
};

export const TYPE_LABELS: Record<CatalystType, string> = {
  earnings: "Earnings",
  fda: "FDA / PDUFA",
  regulatory: "Regulatory",
  contract: "Contract",
  product: "Product",
  macro: "Macro",
  other: "Other",
};

export const RISK_LABELS: Record<Risk, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

export const CAP_LABELS: Record<MarketCapClass, string> = {
  micro: "Micro",
  small: "Small",
  mid: "Mid",
  large: "Large",
  mega: "Mega",
};

export const GUIDANCE_LABELS: Record<GuidanceTrajectory, string> = {
  raised: "Raised guidance",
  maintained: "Held guidance",
  lowered: "Lowered guidance",
  none: "No guidance",
};
