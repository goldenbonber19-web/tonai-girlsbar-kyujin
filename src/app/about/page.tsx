import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `このサイトについて｜${SITE_NAME}`,
  description: `${SITE_NAME}の運営方針・掲載基準・情報の信頼性についての説明ページです。`,
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "このサイトについて" }]} />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">{SITE_NAME}について</h1>

        {[
          {
            title: "サイトの目的",
            body: `${SITE_NAME}は、東京都内のガールズバー求人情報を、エリア・条件・信頼度で比較できるよう整理することを目的としています。\n\n求職者の方が「検索→比較→応募」をスムーズに行えること、および「怖い」「不安」という印象を持ちやすい初心者の方でも安心して求人情報にアクセスできることを重視しています。`,
          },
          {
            title: "掲載基準と情報の取り扱い",
            body: `当サイトは以下の基準で情報を掲載・管理しています。\n\n・実在が確認できる店舗のみ掲載\n・情報は複数のソースで検証し、信頼度ランク（A〜D）を付与して表示\n・未確認の情報は「要確認」と明記し、推測・誇張を行わない\n・他サイトの文言を転載せず、独自にまとめた情報のみ掲載\n・「どんな女の子が在籍」等の人物像の断定は行わない`,
          },
          {
            title: "情報の更新について",
            body: `掲載情報は情報確認日時点のものです。求人条件・時給・営業時間等は変更になる場合があります。応募前には必ず各店舗に直接ご確認ください。\n\n定期的な情報更新を行っていますが、すべての情報をリアルタイムで反映することは保証できません。`,
          },
          {
            title: "LINE相談について",
            body: `当サイトではLINEによる無料相談窓口を設けています。「どのお店が自分に合うか」「条件の詳細を確認したい」等のご相談を受け付けています。\n\nしつこい勧誘・強引な誘導は行いません。相談だけで終了しても問題ありません。`,
          },
          {
            title: "免責事項",
            body: `当サイトの情報を利用したことによる損害について、運営者は責任を負いかねます。最終的な判断は、利用者ご自身の責任のもとで行ってください。\n\n掲載情報に誤りを発見した場合は、LINEよりご連絡ください。`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="bg-white rounded-3xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
