import type { ShopIndex } from "@/types";

interface UpdateFeedProps {
  shops: ShopIndex[];
  limit?: number;
}

export function UpdateFeed({ shops, limit = 5 }: UpdateFeedProps) {
  // verifiedAt 降順で最新N件
  const recent = [...shops]
    .sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime())
    .slice(0, limit);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
        最近の更新
      </h2>
      <div className="space-y-2">
        {recent.map((shop) => (
          <div
            key={shop.slug}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
          >
            <span className="text-xs text-gray-300 flex-shrink-0 w-20">
              {shop.verifiedAt}
            </span>
            <span className="text-xs text-pink-400 flex-shrink-0 badge-pink">
              {shop.area}
            </span>
            <span className="text-sm font-medium text-gray-700 truncate">
              {shop.name}
            </span>
            <span className="ml-auto text-xs text-gray-300 flex-shrink-0">
              情報確認
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
