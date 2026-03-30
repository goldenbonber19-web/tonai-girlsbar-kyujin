import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ShopListClient } from "@/components/shop/ShopListClient";
import { getAllShops } from "@/lib/shops";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `東京 ガールズバー求人一覧｜${SITE_NAME}`,
  description:
    "東京都内のガールズバー求人一覧。未経験歓迎・日払いOK・私服OK・ノルマなしなど条件で絞り込み。エリア・時給・信頼度で比較できます。",
};

export default async function ShopsPage() {
  const shops = await getAllShops();

  return (
    <>
      <Breadcrumb items={[{ label: "求人一覧" }]} />
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          東京 ガールズバー求人一覧
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          全{shops.length}件 ／ 条件・エリアで絞り込みできます
        </p>
      </div>
      <ShopListClient shops={shops} />
    </>
  );
}
