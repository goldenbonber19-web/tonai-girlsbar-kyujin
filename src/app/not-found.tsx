import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4">🌸</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        ページが見つかりません
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        お探しのページは移動または削除された可能性があります。
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary inline-flex">
          トップページへ
        </Link>
        <Link
          href="/shops"
          className="py-4 px-6 rounded-2xl border-2 border-pink-200 text-pink-500 font-bold text-base hover:bg-pink-50 transition-colors"
        >
          求人一覧を見る
        </Link>
      </div>
    </div>
  );
}
