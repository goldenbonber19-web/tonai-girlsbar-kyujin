"use client";

import type React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { formatWage } from "@/lib/shops";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { LINE_URL, FEATURES } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";
import type { ShopIndex } from "@/types";

function CompareContent() {
  const params = useSearchParams();
  const slugs = params.get("shops")?.split(",").filter(Boolean) ?? [];
  const [shops, setShops] = useState<ShopIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) { setLoading(false); return; }
    import("@/data/shops/index.json")
      .then((m) => {
        const all = m.default as ShopIndex[];
        setShops(all.filter((s) => slugs.includes(s.slug)));
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm py-8 text-center">読み込み中...</p>;
  }

  if (shops.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">比較する店舗が選択されていません</p>
        <Link href="/shops" className="btn-primary inline-flex">
          求人一覧に戻る
        </Link>
      </div>
    );
  }

  const rows: { label: string; render: (s: ShopIndex) => React.ReactNode }[] = [
    { label: "エリア", render: (s) => s.area },
    { label: "最寄駅", render: (s) => s.station },
    { label: "時給目安", render: (s) => <span className="font-bold text-pink-600">{formatWage(s.hourlyWageMin, s.hourlyWageMax)}</span> },
    { label: "情報ランク", render: (s) => <TrustBadge rank={s.trustRank} /> },
    ...FEATURES.map((f) => ({
      label: f.name,
      render: (s: ShopIndex) => {
        const val = (s as Record<string, unknown>)[f.field] as boolean | null;
        if (val === true) return <span className="text-pink-500 font-bold text-lg">✓</span>;
        if (val === false) return <span className="text-gray-300">✗</span>;
        return <span className="text-gray-300 text-xs">要確認</span>;
      },
    })),
    { label: "情報確認日", render: (s) => <span className="text-xs text-gray-400">{s.verifiedAt}</span> },
  ];

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full min-w-[480px]">
        <thead>
          <tr className="border-b border-pink-100">
            <th className="text-left text-xs text-gray-400 font-medium py-3 pr-4 w-28 pl-2">
              比較項目
            </th>
            {shops.map((s) => (
              <th key={s.slug} className="text-center py-3 px-3 min-w-[130px]">
                <Link
                  href={`/shops/${s.slug}`}
                  className="font-bold text-gray-800 text-sm hover:text-pink-500 transition-colors block leading-snug"
                >
                  {s.name}
                </Link>
                <span className="text-xs text-gray-400 font-normal">{s.area}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, render }) => (
            <tr key={label} className="border-t border-gray-100 hover:bg-pink-50/30 transition-colors">
              <td className="text-xs text-gray-500 py-3 pr-4 pl-2 font-medium">{label}</td>
              {shops.map((s) => (
                <td key={s.slug} className="text-center py-3 px-3 text-sm text-gray-700">
                  {render(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-pink-100">
            <td className="py-4 pl-2 text-xs text-gray-400">応募</td>
            {shops.map((s) => (
              <td key={s.slug} className="py-4 px-2">
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/shops/${s.slug}`}
                    className="block text-center py-2 rounded-xl border border-pink-200 text-pink-500 text-xs font-medium hover:bg-pink-50 transition-colors"
                  >
                    詳細
                  </Link>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-[#06C755] text-white text-xs font-bold hover:bg-[#04a846] transition-colors"
                  >
                    <LineIcon size={13} />
                    LINE応募
                  </a>
                </div>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-800 mb-2">店舗比較</h1>
      <p className="text-xs text-gray-400 mb-6">
        最大4店舗を並べて条件を比較できます。求人一覧ページで「比較リストに追加」してください。
      </p>
      <div className="bg-white rounded-3xl p-6 shadow-card mb-4">
        <Suspense fallback={<p className="text-gray-400 text-sm py-8 text-center">読み込み中...</p>}>
          <CompareContent />
        </Suspense>
      </div>
      <p className="text-xs text-gray-300 text-center">
        ※ 比較情報は掲載時点のものです。応募前に各店舗に直接確認してください。
      </p>
    </div>
  );
}
