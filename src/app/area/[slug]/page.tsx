import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ShopListClient } from "@/components/shop/ShopListClient";
import { LineCTA } from "@/components/ui/LineCTA";
import { getAllShops, filterByArea } from "@/lib/shops";
import { AREAS, SITE_NAME } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = AREAS.find((a) => a.slug === params.slug);
  if (!area) return {};
  return {
    title: `${area.name}のガールズバー求人｜${SITE_NAME}`,
    description: `${area.name}エリアのガールズバー求人一覧。未経験歓迎・日払い・私服OKなど条件で比較。`,
  };
}

export default async function AreaPage({ params }: Props) {
  const area = AREAS.find((a) => a.slug === params.slug);
  if (!area) notFound();

  const allShops = await getAllShops();
  const shops = filterByArea(allShops, params.slug);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "求人一覧", href: "/shops" },
          { label: `${area.name}のガールズバー求人` },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {area.name}のガールズバー求人
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {shops.length}件掲載中 ／ 条件・エリアで絞り込みできます
        </p>
      </div>

      <ShopListClient shops={shops} initialArea={params.slug} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <LineCTA
          title={`${area.name}のお店についてLINEで相談`}
          subtitle="エリア・条件・雰囲気など気軽に質問OK"
        />
      </div>
    </>
  );
}
