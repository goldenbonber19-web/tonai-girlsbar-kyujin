"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShopStore } from "@/lib/store";
import type { ShopIndex } from "@/types";

interface RecentlyViewedProps {
  allShops: ShopIndex[];
}

export function RecentlyViewed({ allShops }: RecentlyViewedProps) {
  const { recentlyViewed } = useShopStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted || recentlyViewed.length === 0) return null;

  const shops = recentlyViewed
    .map((slug) => allShops.find((s) => s.slug === slug))
    .filter(Boolean) as ShopIndex[];

  if (shops.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-base font-bold text-gray-700 mb-4">最近見た求人</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {shops.map((shop) => (
          <Link
            key={shop.slug}
            href={`/shops/${shop.slug}`}
            className="flex-shrink-0 bg-white rounded-2xl p-3 shadow-card hover:shadow-card-hover transition-all min-w-[160px] max-w-[180px]"
          >
            <p className="text-xs font-bold text-gray-800 line-clamp-2 mb-1">
              {shop.name}
            </p>
            <p className="text-xs text-gray-400">{shop.area}</p>
            {shop.hourlyWageMin && (
              <p className="text-xs text-pink-500 font-medium mt-1">
                {shop.hourlyWageMin.toLocaleString()}円〜
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
