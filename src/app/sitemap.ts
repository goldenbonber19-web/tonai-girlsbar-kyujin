import type { MetadataRoute } from "next";
import { getAllShops } from "@/lib/shops";
import { getAllPosts } from "@/lib/blog";
import { AREAS, FEATURES, SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const shops = await getAllShops();
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,               lastModified: new Date(), priority: 1.0, changeFrequency: "daily" },
    { url: `${SITE_URL}/shops`,    lastModified: new Date(), priority: 0.9, changeFrequency: "daily" },
    { url: `${SITE_URL}/blog`,     lastModified: new Date(), priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`,    lastModified: new Date(), priority: 0.5, changeFrequency: "monthly" },
    { url: `${SITE_URL}/privacy`,  lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/terms`,    lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
  ];

  const shopPages: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${SITE_URL}/shops/${s.slug}`,
    lastModified: new Date(s.verifiedAt),
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const areaPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${SITE_URL}/area/${a.slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const featurePages: MetadataRoute.Sitemap = FEATURES.map((f) => ({
    url: `${SITE_URL}/feature/${f.slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticPages,
    ...shopPages,
    ...areaPages,
    ...featurePages,
    ...blogPages,
  ];
}
