"use client";

import { AREAS, FEATURES, SORT_OPTIONS } from "@/lib/constants";
import type { ShopFilter } from "@/types";

interface ShopFilterPanelProps {
  filter: Partial<ShopFilter>;
  onChange: (next: Partial<ShopFilter>) => void;
  totalCount: number;
  filteredCount: number;
}

export function ShopFilterPanel({
  filter,
  onChange,
  totalCount,
  filteredCount,
}: ShopFilterPanelProps) {
  const toggle = (key: keyof ShopFilter) => {
    onChange({ ...filter, [key]: !filter[key as keyof typeof filter] });
  };

  return (
    <aside className="bg-white rounded-3xl shadow-card p-5 space-y-5">
      {/* 件数表示 */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-pink-500">{filteredCount}</span>
        <span className="text-sm text-gray-400">/ {totalCount}件</span>
      </div>

      {/* キーワード */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          キーワード検索
        </label>
        <input
          type="search"
          placeholder="店舗名・エリアなど"
          value={filter.keyword ?? ""}
          onChange={(e) => onChange({ ...filter, keyword: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      {/* エリア */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          エリア
        </label>
        <select
          value={filter.area ?? ""}
          onChange={(e) => onChange({ ...filter, area: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white"
        >
          <option value="">すべてのエリア</option>
          {AREAS.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* 条件チェック */}
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2">条件で絞り込む</p>
        <div className="flex flex-col gap-2">
          {FEATURES.map((f) => (
            <label
              key={f.slug}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={!!filter[f.field as keyof ShopFilter]}
                onChange={() => toggle(f.field as keyof ShopFilter)}
                className="w-4 h-4 accent-pink-500 rounded"
              />
              <span className="text-sm text-gray-600 group-hover:text-pink-500 transition-colors">
                {f.emoji} {f.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ソート */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          並び替え
        </label>
        <select
          value={filter.sortBy ?? "newest"}
          onChange={(e) =>
            onChange({ ...filter, sortBy: e.target.value as ShopFilter["sortBy"] })
          }
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* リセット */}
      <button
        onClick={() => onChange({})}
        className="w-full py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-50 transition-colors"
      >
        絞り込みをリセット
      </button>
    </aside>
  );
}
