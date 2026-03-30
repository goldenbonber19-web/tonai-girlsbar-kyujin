export const LINE_URL = "https://line.me/ti/p/gJNrcxnXz3";
export const SITE_NAME = "都内ガールズバー求人";
export const SITE_DESCRIPTION =
  "東京都内のガールズバー求人を、エリア・条件・雰囲気で比較。未経験歓迎・日払い・私服OKなど条件で絞り込み、LINEで簡単応募。";
export const SITE_URL = "https://tonai-girlsbar-kyujin.pages.dev";
export const ITEMS_PER_PAGE = 20;

export const AREAS = [
  { slug: "shinjuku", name: "新宿・歌舞伎町", short: "新宿" },
  { slug: "shibuya", name: "渋谷", short: "渋谷" },
  { slug: "ikebukuro", name: "池袋", short: "池袋" },
  { slug: "ueno", name: "上野・御徒町", short: "上野" },
  { slug: "akihabara", name: "秋葉原", short: "秋葉原" },
  { slug: "kanda", name: "神田", short: "神田" },
  { slug: "shimbashi", name: "新橋", short: "新橋" },
  { slug: "roppongi", name: "六本木・西麻布", short: "六本木" },
  { slug: "akasaka", name: "赤坂", short: "赤坂" },
  { slug: "ginza", name: "銀座", short: "銀座" },
  { slug: "kamata", name: "蒲田", short: "蒲田" },
  { slug: "machida", name: "町田", short: "町田" },
  { slug: "tachikawa", name: "立川", short: "立川" },
  { slug: "kichijoji", name: "吉祥寺", short: "吉祥寺" },
  { slug: "other", name: "その他エリア", short: "その他" },
] as const;

export const FEATURES = [
  { slug: "experience-ok", name: "未経験歓迎", emoji: "🌸", field: "isExperienceOk" },
  { slug: "daily-pay", name: "日払いOK", emoji: "💴", field: "isDailyPay" },
  { slug: "private-clothes", name: "私服OK", emoji: "👗", field: "isPrivateClothes" },
  { slug: "no-norma", name: "ノルマなし", emoji: "✨", field: "isNoNorma" },
  { slug: "escort", name: "送りあり", emoji: "🚗", field: "hasEscort" },
  { slug: "student-ok", name: "学生歓迎", emoji: "📚", field: "isStudentOk" },
  { slug: "dual-work", name: "Wワーク歓迎", emoji: "💼", field: "isDualWork" },
  { slug: "last-train-ok", name: "終電上がりOK", emoji: "🚃", field: "isLastTrainOk" },
  { slug: "short-time-ok", name: "短時間OK", emoji: "⏰", field: "isShortTimeOk" },
  { slug: "uniform", name: "制服あり", emoji: "👔", field: "hasUniform" },
] as const;

export const TRUST_RANK_LABELS: Record<string, { label: string; color: string; description: string }> = {
  A: {
    label: "A",
    color: "bg-emerald-100 text-emerald-800",
    description: "公式サイト・SNS・掲載元で情報が一致",
  },
  B: {
    label: "B",
    color: "bg-blue-100 text-blue-800",
    description: "公式サイトまたはSNS＋掲載元で確認",
  },
  C: {
    label: "C",
    color: "bg-amber-100 text-amber-800",
    description: "掲載元情報を中心に確認",
  },
  D: {
    label: "D",
    color: "bg-red-100 text-red-800",
    description: "情報不足・要再確認",
  },
};

export const SORT_OPTIONS = [
  { value: "newest", label: "新着順" },
  { value: "verifiedAt", label: "確認日順" },
  { value: "area", label: "エリア順" },
  { value: "hourlyWage", label: "時給帯順" },
] as const;
