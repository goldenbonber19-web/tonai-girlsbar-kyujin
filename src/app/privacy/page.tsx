import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `プライバシーポリシー｜${SITE_NAME}`,
  description: `${SITE_NAME}のプライバシーポリシー。個人情報の取り扱いについて説明します。`,
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">プライバシーポリシー</h1>
        <p className="text-xs text-gray-400">最終更新日: 2025年1月16日</p>

        {[
          {
            title: "個人情報の収集について",
            body: "当サイトは、LINE相談をご利用いただいた場合にのみ、お問い合わせに必要な情報をLINEのプラットフォームを通じて取得します。当サイト自体が独自に個人情報を収集・保存することはありません。",
          },
          {
            title: "Cookieおよびローカルストレージについて",
            body: "当サイトはお気に入り機能・比較機能・最近見た店舗機能のために、お使いのブラウザのローカルストレージを使用します。これらの情報は当サイトのサーバーには送信されず、お使いのデバイス内にのみ保存されます。",
          },
          {
            title: "アクセス解析について",
            body: "当サイトでは、サービス向上のためにアクセス解析ツールを使用する場合があります。これによって収集されるデータは個人を特定しない統計情報です。",
          },
          {
            title: "第三者への情報提供",
            body: "当サイトは、法令に基づく場合を除き、利用者の情報を第三者に提供・開示することはありません。",
          },
          {
            title: "免責事項",
            body: "当サイトのコンテンツは情報提供を目的としており、特定のお店・サービスを推奨するものではありません。掲載情報の正確性・完全性を保証するものでもありません。",
          },
          {
            title: "プライバシーポリシーの変更",
            body: "当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは当ページに掲載します。",
          },
          {
            title: "お問い合わせ",
            body: "プライバシーに関するお問い合わせは、LINEよりご連絡ください。",
          },
        ].map(({ title, body }) => (
          <section key={title} className="bg-white rounded-2xl p-5 shadow-card">
            <h2 className="font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
