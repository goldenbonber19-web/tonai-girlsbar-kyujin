import Link from "next/link";

const GUIDES = [
  {
    emoji: "🌸",
    title: "ガールズバーとキャバクラの違い",
    body: "接待スタイルや時給の仕組みを未経験向けにわかりやすく整理しました。",
    href: "/blog/girlsbar-vs-kyabakura",
  },
  {
    emoji: "📋",
    title: "未経験求人の選び方",
    body: "初めての方がお店選びで見るべきポイントをステップごとに解説。",
    href: "/blog/beginner-guide",
  },
  {
    emoji: "✅",
    title: "体験入店のチェックポイント",
    body: "体入前・体入中・体入後にそれぞれ確認すべきことをリスト化。",
    href: "/blog/taiken-checklist",
  },
  {
    emoji: "💪",
    title: "続けやすい店の見分け方",
    body: "シフト・ノルマ・罰金規定など、長く働くために見るべき条件を解説。",
    href: "/blog/long-lasting-shop",
  },
];

export function BeginnerSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
          初めての方へ
        </div>
        <h2 className="section-title">安心して始めるためのガイド</h2>
        <p className="section-subtitle">
          「怖そう」「何をするの？」という不安に、根拠のある情報でお答えします
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="group flex gap-4 bg-white rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="text-3xl flex-shrink-0">{g.emoji}</span>
            <div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-pink-500 transition-colors mb-1">
                {g.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">{g.body}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/blog"
          className="text-sm text-pink-500 hover:text-pink-600 font-medium"
        >
          初心者ガイドをもっと見る →
        </Link>
      </div>
    </section>
  );
}
