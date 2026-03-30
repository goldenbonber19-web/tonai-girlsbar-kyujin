import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `初心者ガイド・お役立ち情報｜${SITE_NAME}`,
  description:
    "ガールズバーで働くための初心者ガイド。未経験の方向けに、求人の探し方・体入の流れ・エリア別傾向など役立つ情報を掲載。",
};

const CATEGORY_COLORS: Record<string, string> = {
  初心者向け: "bg-pink-50 text-pink-600",
  条件別: "bg-purple-50 text-purple-600",
  エリア別: "bg-blue-50 text-blue-600",
  基礎知識: "bg-amber-50 text-amber-700",
  対象者別: "bg-emerald-50 text-emerald-700",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <Breadcrumb items={[{ label: "初心者ガイド" }]} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          初心者ガイド・お役立ち情報
        </h1>
        <p className="text-sm text-gray-400 mb-8">全{posts.length}記事</p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="badge bg-gray-800 text-white">すべて</span>
          {categories.map((cat) => (
            <span key={cat} className={`badge ${CATEGORY_COLORS[cat] ?? "badge-gray"}`}>
              {cat}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className={`badge text-xs ${CATEGORY_COLORS[post.category] ?? "badge-gray"}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-300">{post.publishedAt}</span>
              </div>
              <h2 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-pink-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {post.intro}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-gray-300">#{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
