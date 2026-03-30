import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { ConditionBadge } from "@/components/ui/ConditionBadge";
import { LineCTA } from "@/components/ui/LineCTA";
import { ShopDetailClient } from "@/components/shop/ShopDetailClient";
import { getAllShops, getShopDetail, formatWage } from "@/lib/shops";
import { LINE_URL, SITE_NAME, FEATURES } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const shops = await getAllShops();
  return shops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allShops = await getAllShops();
  const base = allShops.find((s) => s.slug === params.slug);
  if (!base) return {};
  return {
    title: `${base.name}（${base.area}）の求人情報｜${SITE_NAME}`,
    description: `${base.name}（${base.area}・${base.station}）のガールズバー求人情報。時給・勤務条件・雰囲気を確認。`,
  };
}

export default async function ShopDetailPage({ params }: Props) {
  const allShops = await getAllShops();
  const base = allShops.find((s) => s.slug === params.slug);
  if (!base) notFound();

  const detail = await getShopDetail(params.slug);
  const shop = detail ?? base;

  // 同エリア関連店舗（最大4件）
  const related = allShops
    .filter((s) => s.slug !== params.slug && s.area === base.area)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${shop.name} スタッフ募集`,
    hiringOrganization: { "@type": "Organization", name: shop.name },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: shop.area,
        addressRegion: "東京都",
        addressCountry: "JP",
      },
    },
    ...(base.hourlyWageMin
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "JPY",
            value: {
              "@type": "QuantitativeValue",
              minValue: base.hourlyWageMin,
              maxValue: base.hourlyWageMax ?? base.hourlyWageMin,
              unitText: "HOUR",
            },
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "求人一覧", href: "/shops" },
          { label: base.area, href: `/area/${base.area}` },
          { label: shop.name },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ヘッダーカード */}
        <header className="bg-white rounded-3xl p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-pink">{shop.area}</span>
            <TrustBadge rank={shop.trustRank} showDescription />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{shop.name}</h1>
          <p className="text-sm text-gray-500">{base.station} ／ {base.category}</p>
          {detail?.address && (
            <p className="text-xs text-gray-400 mt-1">📍 {detail.address}</p>
          )}

          {/* 時給 */}
          <div className="mt-4 bg-pink-50 rounded-2xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-pink-400 font-medium">時給目安</span>
            <span className="text-2xl font-bold text-pink-600">
              {formatWage(base.hourlyWageMin, base.hourlyWageMax)}
            </span>
          </div>

          {/* LINE応募ボタン */}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line w-full mt-4 flex"
          >
            <LineIcon size={20} />
            <span>この店舗についてLINEで聞く</span>
          </a>
        </header>

        {/* 求人情報まとめ */}
        <section className="bg-white rounded-3xl p-6 shadow-card">
          <h2 className="text-lg font-bold text-gray-800 mb-4">求人情報まとめ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.slug} className="flex items-center gap-2">
                <span className="text-xl">{f.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">{f.name}</p>
                  <ConditionBadge
                    value={(base as Record<string, unknown>)[f.field] as boolean | null}
                    trueLabel="あり"
                    falseLabel="なし"
                    size="md"
                  />
                </div>
              </div>
            ))}
          </div>
          {detail && (detail.workHoursStart || detail.shiftFlex) && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
              {detail.workHoursStart && (
                <div>
                  <p className="text-xs text-gray-400">勤務時間帯</p>
                  <p className="font-medium text-gray-700 mt-0.5">
                    {detail.workHoursStart} 〜 {detail.workHoursEnd}
                  </p>
                </div>
              )}
              {detail.shiftFlex && (
                <div>
                  <p className="text-xs text-gray-400">シフト自由度</p>
                  <p className="font-medium text-gray-700 mt-0.5">{detail.shiftFlex}</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 店舗説明 */}
        {detail?.description && (
          <section className="bg-white rounded-3xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-gray-800 mb-3">お店について</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{detail.description}</p>
          </section>
        )}

        {/* 雰囲気タグ */}
        {detail && detail.atmosphere.length > 0 && (
          <section className="bg-white rounded-3xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-gray-800 mb-1">お店の雰囲気</h2>
            <p className="text-xs text-gray-400 mb-3">
              ※ 掲載情報・求人文に根拠がある場合のみ記載
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.atmosphere.map((a) => (
                <span key={a} className="badge-pink">{a}</span>
              ))}
            </div>
          </section>
        )}

        {/* 向いている人 */}
        {detail && detail.suitableFor.length > 0 && (
          <section className="bg-white rounded-3xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              こんな方に向いているかも
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              ※ 求人条件から合理的に判断できる範囲のみ
            </p>
            <ul className="space-y-2">
              {detail.suitableFor.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-pink-400 flex-shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 注意点 */}
        {detail && detail.cautions.length > 0 && (
          <section className="bg-amber-50 rounded-3xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              ⚠️ 応募前に確認を
            </h2>
            <ul className="space-y-2">
              {detail.cautions.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="mt-0.5 flex-shrink-0">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* お気に入り・比較ボタン（クライアント） */}
        <ShopDetailClient slug={base.slug} shopName={shop.name} />

        {/* LINE CTA */}
        <LineCTA
          title={`${shop.name}について相談する`}
          subtitle="未経験でも大丈夫。不安なことは先にLINEで確認できます"
        />

        {/* 情報ソース */}
        <section className="bg-gray-50 rounded-3xl p-5 text-xs text-gray-400 space-y-1">
          <p className="font-medium text-gray-500 mb-2">情報ソースについて</p>
          {base.sourceUrl && (
            <p>
              掲載元:{" "}
              <a
                href={base.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline hover:text-pink-400"
              >
                {base.sourceUrl}
              </a>
            </p>
          )}
          {detail?.officialUrl && (
            <p>
              公式サイト:{" "}
              <a
                href={detail.officialUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline hover:text-pink-400"
              >
                {detail.officialUrl}
              </a>
            </p>
          )}
          <p>情報確認日: {base.verifiedAt}</p>
          <p className="mt-2 text-gray-300">
            ※ 掲載情報は確認日時点のものです。応募前に各店舗に直接ご確認ください。
          </p>
        </section>

        {/* 関連店舗 */}
        {related.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {base.area}の他の求人
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/shops/${s.slug}`}
                  className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.station}</p>
                  </div>
                  <span className="text-pink-500 text-sm font-bold flex-shrink-0">
                    {formatWage(s.hourlyWageMin, s.hourlyWageMax)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
