"use client";

import { useEffect } from "react";
import { useShopStore } from "@/lib/store";

interface ShopDetailClientProps {
  slug: string;
  shopName: string;
}

export function ShopDetailClient({ slug, shopName }: ShopDetailClientProps) {
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, addRecentlyViewed } =
    useShopStore();
  const fav = isFavorite(slug);
  const inCompare = isInCompare(slug);

  useEffect(() => {
    addRecentlyViewed(slug);
  }, [slug, addRecentlyViewed]);

  const handleCompare = () => {
    const ok = addToCompare(slug);
    if (!ok) alert("比較できるのは最大4店舗までです");
    else alert(`${shopName}を比較リストに追加しました`);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => toggleFavorite(slug)}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-medium text-sm transition-colors ${
          fav
            ? "border-pink-400 bg-pink-50 text-pink-600"
            : "border-gray-200 text-gray-500 hover:border-pink-200 hover:text-pink-400"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={fav ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {fav ? "お気に入り済み" : "お気に入りに追加"}
      </button>
      <button
        onClick={handleCompare}
        className={`flex-1 py-3 rounded-2xl border-2 font-medium text-sm transition-colors ${
          inCompare
            ? "border-blue-400 bg-blue-50 text-blue-600"
            : "border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-400"
        }`}
      >
        {inCompare ? "✓ 比較リストに追加済み" : "比較リストに追加"}
      </button>
    </div>
  );
}
