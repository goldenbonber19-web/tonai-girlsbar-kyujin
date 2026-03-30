"use client";

import Link from "next/link";
import { useShopStore } from "@/lib/store";
import { formatWage } from "@/lib/shops";
import type { ShopIndex } from "@/types";

interface CompareBarProps {
  shops: ShopIndex[];
}

export function CompareBar({ shops }: CompareBarProps) {
  const { compareList, removeFromCompare, clearCompare } = useShopStore();
  const compareShops = compareList
    .map((slug) => shops.find((s) => s.slug === slug))
    .filter(Boolean) as ShopIndex[];

  if (compareShops.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-30 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_-4px_32px_rgba(0,0,0,0.12)] border border-pink-100 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-700">
            比較リスト ({compareShops.length}/4)
          </span>
          <button
            onClick={clearCompare}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            クリア
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {compareShops.map((shop) => (
            <div
              key={shop.slug}
              className="flex items-center gap-1.5 bg-pink-50 rounded-xl px-3 py-1.5 flex-shrink-0"
            >
              <span className="text-xs font-medium text-pink-700 max-w-[80px] truncate">
                {shop.name}
              </span>
              <button
                onClick={() => removeFromCompare(shop.slug)}
                className="text-pink-400 hover:text-pink-600 text-xs ml-1"
              >
                ×
              </button>
            </div>
          ))}
          {compareShops.length >= 2 && (
            <Link
              href={`/shops/compare?shops=${compareList.join(",")}`}
              className="flex-shrink-0 bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors"
            >
              比較する
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
