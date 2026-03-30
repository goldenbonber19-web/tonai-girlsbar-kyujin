const FAQS = [
  {
    q: "ガールズバーとキャバクラは何が違いますか？",
    a: "ガールズバーはカウンター越しの接客が基本で、お客様の席につくことは通常ありません。キャバクラはテーブル席でのお酌・会話が中心です。接触度合いや給与体系が異なります。",
  },
  {
    q: "未経験でも応募できますか？",
    a: "「未経験歓迎」と記載しているお店は多くあります。実際の受け入れ状況は店舗ごとに異なるため、応募前または体入時に直接確認することを推奨します。",
  },
  {
    q: "日払いとは何ですか？",
    a: "その日に働いた分の給与を当日〜翌日以内に受け取れる仕組みです。支払い方法（現金・振込）や時期はお店によって異なるため、応募時に確認しましょう。",
  },
  {
    q: "体験入店（体入）とは何ですか？",
    a: "正式採用の前に1〜2時間程度お店の雰囲気を体験できる仕組みです。体入報酬が出るお店が多く、体入後に入店しないことも可能です。",
  },
  {
    q: "このサイトのLINE相談は無料ですか？",
    a: "はい、無料です。しつこい勧誘は行いません。相談だけで終わっても問題ありません。",
  },
  {
    q: "掲載情報は正確ですか？",
    a: "情報確認日時点の内容を掲載していますが、条件は変更になる場合があります。信頼度ランク（A〜D）を表示し、未確認情報は「要確認」と明記しています。応募前に必ず各店舗に直接確認してください。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function SiteFAQ() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        よくある質問
      </h2>
      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <details
            key={i}
            className="bg-white rounded-2xl shadow-card overflow-hidden group"
          >
            <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm flex items-start gap-3 list-none select-none">
              <span className="text-pink-400 font-bold flex-shrink-0 text-base leading-5">
                Q
              </span>
              <span className="flex-1">{item.q}</span>
              <svg
                className="flex-shrink-0 w-4 h-4 text-gray-300 mt-0.5 transition-transform group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 border-t border-pink-50">
              <p className="text-sm text-gray-600 leading-relaxed flex gap-3">
                <span className="text-emerald-500 font-bold flex-shrink-0">
                  A
                </span>
                <span>{item.a}</span>
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
