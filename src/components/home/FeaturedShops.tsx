"use client";

import Link from "next/link";
import { ShopCard } from "@/components/shop/ShopCard";
import type { ShopIndex } from "@/types";

interface FeaturedShopsProps {
  shops: ShopIndex[];
}

export function FeaturedShops({ shops }: FeaturedShopsProps) {
  // 信頼度A>B>Cの順で最大6件
  const featured = [...shops]
    .sort((a, b) => {
      const rankOrder = { A: 0, B: 1, C: 2, D: 3 };
      return rankOrder[a.trustRank] - rankOrder[b.trustRank];
    })
    .slice(0, 6);

  return (
    <section className="bg-gradient-to-b from-white to-pink-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title">情報確認済みの求人</h2>
          <p className="section-subtitle text-xs text-gray-400 mt-1">
            ※ 情報量が多く確認が取れた店舗を優先表示しています（ランキングではありません）
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((shop) => (
            <ShopCard key={shop.slug} shop={shop} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shops"
            className="btn-primary inline-flex"
          >
            すべての求人を見る（{shops.length}件）→
          </Link>
        </div>
      </div>
    </section>
  );
}
