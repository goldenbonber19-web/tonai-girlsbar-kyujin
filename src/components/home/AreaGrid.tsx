import Link from "next/link";
import { AREAS } from "@/lib/constants";
import type { AreaStat } from "@/types";

const AREA_EMOJIS: Record<string, string> = {
  shinjuku: "🌃",
  shibuya: "✨",
  ikebukuro: "🎡",
  ueno: "🌸",
  akihabara: "⚡",
  kanda: "🏙️",
  shimbashi: "🍻",
  roppongi: "🌟",
  akasaka: "💎",
  ginza: "🛍️",
  kamata: "🌆",
  machida: "🌿",
  tachikawa: "🏢",
  kichijoji: "🌳",
  other: "📍",
};

interface AreaGridProps {
  areaStats: AreaStat[];
}

export function AreaGrid({ areaStats }: AreaGridProps) {
  const statMap = Object.fromEntries(areaStats.map((a) => [a.slug, a.count]));

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="section-title">エリアから探す</h2>
        <p className="section-subtitle">気になるエリアのガールズバー求人をチェック</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {AREAS.map((area) => {
          const count = statMap[area.slug] ?? 0;
          return (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group flex flex-col items-center gap-1.5 bg-white hover:bg-pink-50 rounded-2xl p-3 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-2xl">{AREA_EMOJIS[area.slug]}</span>
              <span className="text-xs font-bold text-gray-700 group-hover:text-pink-500 transition-colors text-center leading-tight">
                {area.short}
              </span>
              {count > 0 && (
                <span className="text-xs text-pink-400 font-medium">{count}件</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
