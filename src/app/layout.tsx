import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FixedLineCTA } from "@/components/layout/FixedLineCTA";
import { StoreHydration } from "@/components/ui/StoreHydration";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜未経験歓迎・日払い・私服OKで比較`,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ガールズバー 求人",
    "東京 ガールズバー",
    "ガルバ 求人",
    "未経験歓迎",
    "日払い",
    "私服OK",
    "新宿",
    "渋谷",
    "池袋",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME}｜未経験歓迎・日払い・私服OKで比較`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <StoreHydration />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FixedLineCTA />
      </body>
    </html>
  );
}
