import type { ShopIndex, ShopDetail, ShopFilter, SortKey } from "@/types";
import allShopsData from "@/data/shops/index.json";

// 一覧データ（SSG時・サーバーサイド両用）
export async function getAllShops(): Promise<ShopIndex[]> {
  return allShopsData as ShopIndex[];
}

// 同期版（client component から直接呼べる）
export function getAllShopsSync(): ShopIndex[] {
  return allShopsData as ShopIndex[];
}

// 詳細データ（動的import でビルド時に解決）
export async function getShopDetail(slug: string): Promise<ShopDetail | null> {
  try {
    // Next.js SSG では require が使えるが、型安全のため dynamic import を使う
    const data = await import(`@/data/shops/detail/${slug}.json`).catch(() => null);
    if (!data) return null;
    return data.default as ShopDetail;
  } catch {
    return null;
  }
}

// エリア別に絞り込み
export function filterByArea(shops: ShopIndex[], areaSlug: string): ShopIndex[] {
  const areaNameMap: Record<string, string[]> = {
    shinjuku:   ["新宿", "歌舞伎町"],
    shibuya:    ["渋谷", "恵比寿", "中目黒"],
    ikebukuro:  ["池袋"],
    ueno:       ["上野", "御徒町"],
    akihabara:  ["秋葉原"],
    kanda:      ["神田"],
    shimbashi:  ["新橋"],
    roppongi:   ["六本木", "西麻布"],
    akasaka:    ["赤坂"],
    ginza:      ["銀座"],
    kamata:     ["蒲田"],
    machida:    ["町田"],
    tachikawa:  ["立川"],
    kichijoji:  ["吉祥寺"],
  };
  const names = areaNameMap[areaSlug];
  if (!names) return shops;
  return shops.filter((s) => names.some((n) => s.area.includes(n)));
}

// フィルタリング＆ソート
export function applyFilter(shops: ShopIndex[], filter: Partial<ShopFilter>): ShopIndex[] {
  let result = [...shops];

  if (filter.area)             result = filterByArea(result, filter.area);
  if (filter.isExperienceOk)   result = result.filter((s) => s.isExperienceOk === true);
  if (filter.isDailyPay)       result = result.filter((s) => s.isDailyPay === true);
  if (filter.isPrivateClothes) result = result.filter((s) => s.isPrivateClothes === true);
  if (filter.isNoNorma)        result = result.filter((s) => s.isNoNorma === true);
  if (filter.hasEscort)        result = result.filter((s) => s.hasEscort === true);
  if (filter.isStudentOk)      result = result.filter((s) => s.isStudentOk === true);
  if (filter.isDualWork)       result = result.filter((s) => s.isDualWork === true);
  if (filter.isLastTrainOk)    result = result.filter((s) => s.isLastTrainOk === true);
  if (filter.isShortTimeOk)    result = result.filter((s) => s.isShortTimeOk === true);

  if (filter.sortBy) result = sortShops(result, filter.sortBy);

  return result;
}

function sortShops(shops: ShopIndex[], sortBy: SortKey): ShopIndex[] {
  return [...shops].sort((a, b) => {
    switch (sortBy) {
      case "newest":
      case "verifiedAt":
        return new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime();
      case "area":
        return a.area.localeCompare(b.area, "ja");
      case "hourlyWage":
        return (b.hourlyWageMin ?? 0) - (a.hourlyWageMin ?? 0);
      default:
        return 0;
    }
  });
}

// 時給表示
export function formatWage(min: number | null, max: number | null): string {
  if (!min && !max) return "要確認";
  if (min && max && min !== max) return `${min.toLocaleString()}〜${max.toLocaleString()}円`;
  if (min) return `${min.toLocaleString()}円〜`;
  return `〜${max!.toLocaleString()}円`;
}

// スラッグ生成
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-ぁ-んァ-ン一-龯]/g, "")
    .substring(0, 80);
}
