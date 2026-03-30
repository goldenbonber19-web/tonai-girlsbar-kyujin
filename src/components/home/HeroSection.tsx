import Link from "next/link";
import { LINE_URL } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";
import { VisitorCounter } from "@/components/ui/VisitorCounter";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white pt-10 pb-14">
      {/* 背景装飾 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-40 -left-16 w-56 h-56 bg-rose-100 rounded-full opacity-30 blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* 訪問者カウンター */}
        <div className="flex justify-center mb-6">
          <VisitorCounter />
        </div>

        {/* メインコピー */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-block bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
            東京都内 掲載店舗数 30件（随時更新中）
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            自分のペースで働ける
            <br />
            <span className="text-gradient-pink">ガールズバー求人</span>を比較
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            未経験・学生・Wワーク歓迎のお店を、エリア・条件・雰囲気で比較できます。
            <br className="hidden sm:block" />
            怖い思いをしないためのチェックポイントも掲載。まずは気軽に見てみてください。
          </p>
        </div>

        {/* CTAボタン群 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line w-full sm:w-auto"
          >
            <LineIcon size={20} />
            <span>まずLINEで相談する（無料）</span>
          </a>
          <Link
            href="/shops"
            className="w-full sm:w-auto text-center py-4 px-6 rounded-2xl border-2 border-pink-200 text-pink-500 font-bold text-base hover:bg-pink-50 transition-colors"
          >
            求人一覧を見る →
          </Link>
        </div>

        {/* 安心ポイント */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          {[
            "相談無料",
            "未経験OK",
            "しつこい勧誘なし",
            "情報の根拠を明記",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span className="text-pink-300">✓</span>
              {t}
            </span>
          ))}
        </div>

        {/* 検索バー */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <form action="/shops">
              <input
                type="search"
                name="q"
                placeholder="エリア・駅名・条件で検索…"
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-pink-200 shadow-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-sm"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
