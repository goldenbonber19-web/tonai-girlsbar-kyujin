import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `利用規約｜${SITE_NAME}`,
  description: `${SITE_NAME}の利用規約です。`,
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "利用規約" }]} />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">利用規約</h1>
        <p className="text-xs text-gray-400">最終更新日: 2025年1月16日</p>

        {[
          {
            title: "利用目的",
            body: `${SITE_NAME}（以下「当サイト」）は、東京都内のガールズバー求人情報を提供する情報提供サイトです。当サイトは求人の仲介・斡旋を行うものではありません。`,
          },
          {
            title: "情報の正確性",
            body: "当サイトは掲載情報の正確性・完全性・最新性を保証しません。掲載情報は情報確認日時点のものであり、変更になる場合があります。応募・体験入店を行う前に必ず各店舗に直接確認してください。",
          },
          {
            title: "禁止事項",
            body: "当サイトの利用者は以下の行為を行ってはなりません。\n・当サイトのコンテンツを無断で転載・複製・改変すること\n・当サイトのシステムに過大な負荷をかける行為\n・その他、当サイトの運営を妨げる行為",
          },
          {
            title: "免責事項",
            body: "当サイトの情報を利用したことに起因するいかなる損害についても、当サイト運営者は責任を負いかねます。最終的な判断は利用者ご自身の責任において行ってください。",
          },
          {
            title: "リンクについて",
            body: "当サイトから外部サイトへのリンクは参考情報として提供しています。リンク先のコンテンツ・運営について当サイトは責任を負いません。",
          },
          {
            title: "規約の変更",
            body: "当サイトは、必要に応じて本規約を変更することがあります。変更後の規約は当ページに掲載します。",
          },
        ].map(({ title, body }) => (
          <section key={title} className="bg-white rounded-2xl p-5 shadow-card">
            <h2 className="font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
