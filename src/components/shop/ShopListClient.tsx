"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ShopCard } from "./ShopCard";
import { ShopFilterPanel } from "./ShopFilterPanel";
import { CompareBar } from "./CompareBar";
import { Pagination } from "@/components/ui/Pagination";
import { applyFilter } from "@/lib/shops";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type { ShopIndex, ShopFilter } from "@/types";

interface ShopListClientProps {
  shops: ShopIndex[];
  initialArea?: string;
  initialFeature?: string;
}

export function ShopListClient({ shops, initialArea, initialFeature }: ShopListClientProps) {
  const [filter, setFilter] = useState<Partial<ShopFilter>>({
    sortBy: "newest",
    area: initialArea ?? "",
    ...(initialFeature ? { [initialFeature]: true } : {}),
  });
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // Fuse.js によるキーワード検索
  const fuse = useMemo(
    () =>
      new Fuse(shops, {
        keys: ["name", "area", "station", "category"],
        threshold: 0.3,
      }),
    [shops]
  );

  const filtered = useMemo(() => {
    let result = shops;
    if (filter.keyword && filter.keyword.trim()) {
      result = fuse.search(filter.keyword).map((r) => r.item);
    }
    return applyFilter(result, filter);
  }, [shops, filter, fuse]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (next: Partial<ShopFilter>) => {
    setFilter(next);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* モバイル絞り込みトグル */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <p className="text-sm text-gray-500">
          <strong className="text-pink-500 text-lg">{filtered.length}</strong> 件
        </p>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-pink-200 text-pink-500 text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          絞り込み
        </button>
      </div>

      {/* モバイル絞り込みパネル */}
      {showFilter && (
        <div className="mb-4 md:hidden">
          <ShopFilterPanel
            filter={filter}
            onChange={handleFilterChange}
            totalCount={shops.length}
            filteredCount={filtered.length}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* デスクトップサイドバー */}
        <div className="hidden md:block">
          <div className="sticky top-20">
            <ShopFilterPanel
              filter={filter}
              onChange={handleFilterChange}
              totalCount={shops.length}
              filteredCount={filtered.length}
            />
          </div>
        </div>

        {/* 店舗グリッド */}
        <div>
          {paged.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-medium">条件に合う求人が見つかりませんでした</p>
              <p className="text-sm mt-1">絞り込みを変更してみてください</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paged.map((shop) => (
                <ShopCard key={shop.slug} shop={shop} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* 比較バー */}
      <CompareBar shops={shops} />
    </div>
  );
}
