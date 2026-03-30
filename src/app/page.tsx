import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CounterSection } from "@/components/home/CounterSection";
import { AreaGrid } from "@/components/home/AreaGrid";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { BeginnerSection } from "@/components/home/BeginnerSection";
import { FeaturedShops } from "@/components/home/FeaturedShops";
import { SiteFAQ } from "@/components/home/SiteFAQ";
import { UpdateFeed } from "@/components/home/UpdateFeed";
import { LineCTA } from "@/components/ui/LineCTA";
import { getAllShops } from "@/lib/shops";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import meta from "@/data/meta.json";

export const metadata: Metadata = {
  title: `${SITE_NAME}｜未経験・日払い・私服OKで比較`,
  description: SITE_DESCRIPTION,
};

export default async function HomePage() {
  const shops = await getAllShops();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            url: "https://tonai-girlsbar-kyujin.pages.dev",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://tonai-girlsbar-kyujin.pages.dev/shops?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <HeroSection />
      <CounterSection meta={meta} />
      <AreaGrid areaStats={meta.areaStats} />
      <FeatureGrid />
      <FeaturedShops shops={shops} />
      <UpdateFeed shops={shops} />
      <BeginnerSection />
      <SiteFAQ />

      {/* フッターCTA */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <LineCTA
          title="まずは相談だけでもOK"
          subtitle="自分に合うお店を一緒に探しましょう。未経験・学生・Wワーク歓迎"
        />
      </div>
    </>
  );
}
