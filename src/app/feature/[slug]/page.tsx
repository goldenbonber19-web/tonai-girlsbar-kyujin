import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ShopListClient } from "@/components/shop/ShopListClient";
import { LineCTA } from "@/components/ui/LineCTA";
import { getAllShops } from "@/lib/shops";
import { FEATURES, SITE_NAME } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const feature = FEATURES.find((f) => f.slug === params.slug);
  if (!feature) return {};
  return {
    title: `東京 ガールズバー ${feature.name}の求人｜${SITE_NAME}`,
    description: `東京都内で${feature.name}のガールズバー求人一覧。エリア・時給・雰囲気で比較。`,
  };
}

export default async function FeaturePage({ params }: Props) {
  const feature = FEATURES.find((f) => f.slug === params.slug);
  if (!feature) notFound();

  const allShops = await getAllShops();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "求人一覧", href: "/shops" },
          { label: `${feature.name}の求人` },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{feature.emoji}</span>
          <h1 className="text-2xl font-bold text-gray-800">
            東京 ガールズバー {feature.name}の求人
          </h1>
        </div>
        <p className="text-sm text-gray-400">
          全{allShops.length}件中から「{feature.name}」で絞り込みできます
        </p>
      </div>

      <ShopListClient shops={allShops} initialFeature={feature.field} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <LineCTA
          title={`${feature.name}のお店をLINEで確認`}
          subtitle="条件・エリアの希望を伝えるだけ。まず相談だけでもOK"
        />
      </div>
    </>
  );
}
