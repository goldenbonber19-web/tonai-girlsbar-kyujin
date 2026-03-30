/**
 * scripts/generate-shops.ts
 * 実データ投入前の開発・テスト用ダミーデータ生成スクリプト
 * 実行: npx ts-node --project tsconfig.json scripts/generate-shops.ts
 */

import * as fs from "fs";
import * as path from "path";

const AREAS = [
  "新宿", "歌舞伎町", "渋谷", "池袋", "上野", "御徒町",
  "秋葉原", "神田", "新橋", "六本木", "赤坂", "銀座",
  "蒲田", "町田", "立川", "吉祥寺", "恵比寿", "中目黒",
  "下北沢", "荻窪",
];

const STATIONS: Record<string, string[]> = {
  新宿: ["新宿駅", "新宿三丁目駅"],
  歌舞伎町: ["新宿駅"],
  渋谷: ["渋谷駅"],
  池袋: ["池袋駅"],
  上野: ["上野駅"],
  御徒町: ["御徒町駅"],
  秋葉原: ["秋葉原駅"],
  神田: ["神田駅"],
  新橋: ["新橋駅"],
  六本木: ["六本木駅"],
  赤坂: ["赤坂駅", "赤坂見附駅"],
  銀座: ["銀座駅", "銀座一丁目駅"],
  蒲田: ["蒲田駅"],
  町田: ["町田駅"],
  立川: ["立川駅"],
  吉祥寺: ["吉祥寺駅"],
  恵比寿: ["恵比寿駅"],
  中目黒: ["中目黒駅"],
  下北沢: ["下北沢駅"],
  荻窪: ["荻窪駅"],
};

const NAME_PREFIXES = ["Girls Bar", "Bar", "Lounge", "Cafe Bar", "Girls Cafe", "Club Bar"];
const NAME_SUFFIXES = [
  "SAKURA", "LUNA", "FLEUR", "STAR", "MOON", "PEARL", "ROSE", "LILY",
  "ANGE", "BELLE", "CIEL", "LUMIERE", "AMOUR", "COEUR", "EDEN", "VENUS",
  "FLORA", "AURORA", "NOVA", "STELLA", "AURORA", "CITRUS", "MINT",
  "JASMINE", "IRIS", "DAISY", "VIOLET", "AMBER", "CORAL", "CRYSTAL",
];

const TRUST_RANKS: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
const TRUST_WEIGHTS = [0.05, 0.25, 0.50, 0.20];

function weightedRandom<T>(items: T[], weights: number[]): T {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) return items[i];
  }
  return items[items.length - 1];
}

function randomBoolOrNull(trueProb: number, falseProb: number): boolean | null {
  const r = Math.random();
  if (r < trueProb) return true;
  if (r < trueProb + falseProb) return false;
  return null;
}

function generateSlug(name: string, area: string, id: number): string {
  const normalized = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
  const areaRoman = area
    .replace(/[ぁ-ん]/g, "")
    .replace(/[ァ-ン]/g, "")
    .replace(/[一-龯]/g, "")
    .toLowerCase() || `area${id % 20}`;
  return `${normalized}-${areaRoman}-${String(id).padStart(4, "0")}`;
}

function randomDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  return d.toISOString().slice(0, 10);
}

function generateShop(id: number) {
  const area = AREAS[id % AREAS.length];
  const stations = STATIONS[area] ?? [`${area}駅`];
  const station = stations[Math.floor(Math.random() * stations.length)];
  const prefix = NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)];
  const suffix = NAME_SUFFIXES[(id * 7 + 13) % NAME_SUFFIXES.length];
  const name = `${prefix} ${suffix}`;
  const trustRank = weightedRandom(TRUST_RANKS, TRUST_WEIGHTS);

  const wageMin = 1000 + Math.floor(Math.random() * 8) * 100;
  const wageMax = wageMin + Math.floor(Math.random() * 8) * 100;

  return {
    id: String(id + 100).padStart(4, "0"),
    slug: generateSlug(name, area, id),
    name,
    area,
    station,
    category: "ガールズバー",
    hourlyWageMin: wageMin,
    hourlyWageMax: wageMax,
    isExperienceOk: randomBoolOrNull(0.6, 0.1),
    isDailyPay: randomBoolOrNull(0.5, 0.1),
    isPrivateClothes: randomBoolOrNull(0.55, 0.15),
    isNoNorma: randomBoolOrNull(0.5, 0.1),
    hasEscort: randomBoolOrNull(0.4, 0.1),
    isStudentOk: randomBoolOrNull(0.45, 0.05),
    isDualWork: randomBoolOrNull(0.5, 0.05),
    isLastTrainOk: randomBoolOrNull(0.35, 0.15),
    isShortTimeOk: randomBoolOrNull(0.4, 0.1),
    hasUniform: randomBoolOrNull(0.3, 0.3),
    trustRank,
    verifiedAt: randomDate(90),
    sourceUrl: "https://chocolat.work/tokyo/biz_2/",
  };
}

function main() {
  const COUNT = 2000;
  // 既存の30件を読み込んで先頭に配置
  const existing = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../src/data/shops/index.json"),
      "utf-8"
    )
  );

  const generated = Array.from({ length: COUNT - existing.length }, (_, i) =>
    generateShop(i + existing.length)
  );

  const all = [...existing, ...generated];

  fs.writeFileSync(
    path.join(__dirname, "../src/data/shops/index.json"),
    JSON.stringify(all, null, 2),
    "utf-8"
  );

  // meta.json を更新
  const areaMap: Record<string, number> = {};
  for (const shop of all) {
    areaMap[shop.area] = (areaMap[shop.area] ?? 0) + 1;
  }

  const areaSlugMap: Record<string, string> = {
    新宿: "shinjuku", 歌舞伎町: "shinjuku", 渋谷: "shibuya", 池袋: "ikebukuro",
    上野: "ueno", 御徒町: "ueno", 秋葉原: "akihabara", 神田: "kanda",
    新橋: "shimbashi", 六本木: "roppongi", 赤坂: "akasaka", 銀座: "ginza",
    蒲田: "kamata", 町田: "machida", 立川: "tachikawa", 吉祥寺: "kichijoji",
  };

  const areaStats = Object.entries(areaMap).map(([area, count]) => ({
    area,
    count,
    slug: areaSlugMap[area] ?? "other",
  }));

  const meta = {
    totalShops: all.length,
    todayUpdated: Math.floor(Math.random() * 10) + 1,
    weekAdded: Math.floor(Math.random() * 30) + 10,
    lastUpdated: new Date().toISOString(),
    areaStats,
  };

  fs.writeFileSync(
    path.join(__dirname, "../src/data/meta.json"),
    JSON.stringify(meta, null, 2),
    "utf-8"
  );

  console.log(`✅ Generated ${all.length} shops`);
  console.log(`✅ Updated meta.json`);
}

main();
