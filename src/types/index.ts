// 信頼度ランク
export type TrustRank = "A" | "B" | "C" | "D";

// 雰囲気タグ
export type AtmosphereTag =
  | "カジュアル系"
  | "落ち着き系"
  | "にぎやか系"
  | "初心者向け"
  | "学生向け"
  | "Wワーク向け"
  | "私服勤務しやすい";

// 一覧用（軽量）
export interface ShopIndex {
  id: string;
  slug: string;
  name: string;
  area: string;
  station: string;
  category: string;
  hourlyWageMin: number | null;
  hourlyWageMax: number | null;
  isExperienceOk: boolean | null;
  isDailyPay: boolean | null;
  isPrivateClothes: boolean | null;
  isNoNorma: boolean | null;
  hasEscort: boolean | null;
  isStudentOk: boolean | null;
  isDualWork: boolean | null;
  isLastTrainOk: boolean | null;
  isShortTimeOk: boolean | null;
  hasUniform: boolean | null;
  trustRank: TrustRank;
  verifiedAt: string; // ISO date string
  sourceUrl: string | null;
}

// 詳細用
export interface ShopDetail extends ShopIndex {
  officialUrl: string | null;
  snsUrl: string | null;
  address: string | null;
  workHoursStart: string | null;
  workHoursEnd: string | null;
  backPay: boolean | null;
  penalty: boolean | null;
  shiftFlex: "高" | "中" | "低" | null;
  atmosphere: AtmosphereTag[];
  suitableFor: string[];
  cautions: string[];
  description: string | null;
  updatedAt: string;
}

// ブログ記事
export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  intro: string;
  sections: BlogSection[];
  faq: FaqItem[];
  relatedAreas?: string[];
  relatedFeatures?: string[];
}

export interface BlogSection {
  heading: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// メタ情報
export interface SiteMeta {
  totalShops: number;
  todayUpdated: number;
  weekAdded: number;
  lastUpdated: string;
  areaStats: AreaStat[];
}

export interface AreaStat {
  area: string;
  count: number;
  slug: string;
}

// エリア定義
export interface AreaDefinition {
  slug: string;
  name: string;
  description: string;
}

// 条件フィルター
export interface ShopFilter {
  keyword: string;
  area: string;
  isExperienceOk: boolean;
  isDailyPay: boolean;
  isPrivateClothes: boolean;
  isNoNorma: boolean;
  hasEscort: boolean;
  isStudentOk: boolean;
  isDualWork: boolean;
  isLastTrainOk: boolean;
  isShortTimeOk: boolean;
  sortBy: SortKey;
}

export type SortKey = "newest" | "verifiedAt" | "area" | "hourlyWage";
