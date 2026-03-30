"use client";

import Link from "next/link";
import { useShopStore } from "@/lib/store";
import { formatWage } from "@/lib/shops";
import { LINE_URL } from "@/lib/constants";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { ConditionBadge } from "@/components/ui/ConditionBadge";
import { LineIcon } from "@/components/ui/LineIcon";
import type { ShopIndex } from "@/types";

interface ShopCardProps {
  shop: ShopIndex;
}

export function ShopCard({ shop }: ShopCardProps) {
  const { toggleFavorite, isFavorite, addToCompare, isInCompare } = useShopStore();
  const fav = isFavorite(shop.slug);
  const inCompare = isInCompare(shop.slug);

  const handleCompare = () => {
    const ok = addToCompare(shop.slug);
    if (!ok) alert("比較できるのは最大4店舗までです");
  };

  return (
    <article className="shop-card flex flex-col gap-3">
      {/* ヘッダー行 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="badge-pink">{shop.area}</span>
            <TrustBadge rank={shop.trustRank} />
          </div>
          <Link href={`/shops/${shop.slug}`} className="group">
            <h2 className="font-bold text-gray-800 text-base leading-snug group-hover:text-pink-500 transition-colors line-clamp-1">
              {shop.name}
            </h2>
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">
            {shop.station} ／ {shop.category}
          </p>
        </div>
        {/* お気に入りボタン */}
        <button
          onClick={() => toggleFavorite(shop.slug)}
          className="p-1.5 rounded-full hover:bg-pink-50 transition-colors flex-shrink-0"
          aria-label={fav ? "お気に入り解除" : "お気に入り追加"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={fav ? "#E8437F" : "none"}
            stroke={fav ? "#E8437F" : "#d1d5db"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* 時給 */}
      <div className="bg-pink-50 rounded-2xl px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs text-pink-400 font-medium">時給目安</span>
        <span className="font-bold text-pink-600 text-lg">
          {formatWage(shop.hourlyWageMin, shop.hourlyWageMax)}
        </span>
      </div>

      {/* 条件バッジ群 */}
      <div className="flex flex-wrap gap-1.5">
        <ConditionBadge value={shop.isExperienceOk} trueLabel="未経験歓迎" />
        <ConditionBadge value={shop.isDailyPay} trueLabel="日払いOK" />
        <ConditionBadge value={shop.isPrivateClothes} trueLabel="私服OK" />
        <ConditionBadge value={shop.isNoNorma} trueLabel="ノルマなし" />
        <ConditionBadge value={shop.hasEscort} trueLabel="送りあり" />
        <ConditionBadge value={shop.isStudentOk} trueLabel="学生歓迎" />
      </div>

      {/* 情報確認日 */}
      <p className="text-xs text-gray-300">
        情報確認日: {shop.verifiedAt}
      </p>

      {/* アクションボタン */}
      <div className="flex gap-2 mt-1">
        <Link
          href={`/shops/${shop.slug}`}
          className="flex-1 text-center py-2.5 rounded-xl border border-pink-200 text-pink-500 text-sm font-medium hover:bg-pink-50 transition-colors"
        >
          詳細を見る
        </Link>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#06C755] text-white text-sm font-bold hover:bg-[#04a846] transition-colors"
        >
          <LineIcon size={14} />
          LINE応募
        </a>
      </div>

      {/* 比較ボタン */}
      <button
        onClick={handleCompare}
        className={`text-xs text-center py-1.5 rounded-lg transition-colors ${
          inCompare
            ? "bg-pink-100 text-pink-600 font-medium"
            : "text-gray-400 hover:bg-gray-50"
        }`}
      >
        {inCompare ? "✓ 比較リストに追加済み" : "+ 比較リストに追加"}
      </button>
    </article>
  );
}
