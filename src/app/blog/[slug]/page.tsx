import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LineCTA } from "@/components/ui/LineCTA";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.metaTitle}｜${SITE_NAME}`,
    description: post.metaDescription,
    openGraph: { title: post.metaTitle, description: post.metaDescription },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "初心者ガイド", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 py-6">
        {/* ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-pink">{post.category}</span>
            <span className="text-xs text-gray-300">{post.publishedAt} 公開</span>
            {post.updatedAt !== post.publishedAt && (
              <span className="text-xs text-gray-300">
                {post.updatedAt} 更新
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed bg-pink-50 rounded-2xl p-4">
            {post.intro}
          </p>
        </header>

        {/* 目次 */}
        <nav className="bg-gray-50 rounded-2xl p-5 mb-8">
          <p className="text-sm font-bold text-gray-700 mb-3">目次</p>
          <ol className="space-y-1.5">
            {post.sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-sm text-pink-500 hover:text-pink-600 flex gap-2"
                >
                  <span className="text-pink-300 flex-shrink-0">{i + 1}.</span>
                  {s.heading}
                </a>
              </li>
            ))}
            {post.faq.length > 0 && (
              <li>
                <a
                  href="#faq"
                  className="text-sm text-pink-500 hover:text-pink-600 flex gap-2"
                >
                  <span className="text-pink-300 flex-shrink-0">Q&A</span>
                  よくある質問
                </a>
              </li>
            )}
          </ol>
        </nav>

        {/* 本文セクション */}
        <div className="space-y-10 mb-10">
          {post.sections.map((section, i) => (
            <section key={i} id={`section-${i}`}>
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-pink-100">
                {section.heading}
              </h2>
              <div className="text-sm text-gray-600 leading-loose space-y-3">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* LINE CTA（記事中間） */}
        <LineCTA className="mb-10" />

        {/* FAQ */}
        {post.faq.length > 0 && (
          <section id="faq" className="mb-10">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              よくある質問
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl shadow-card overflow-hidden group"
                >
                  <summary className="px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm flex items-start gap-3 list-none">
                    <span className="text-pink-400 font-bold flex-shrink-0">Q</span>
                    {item.question}
                  </summary>
                  <div className="px-5 pb-4 pt-1 border-t border-pink-50">
                    <p className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="text-emerald-500 font-bold flex-shrink-0">A</span>
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 関連リンク */}
        {(post.relatedAreas?.length || post.relatedFeatures?.length) && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-gray-700 mb-3">
              関連する求人を探す
            </h2>
            <div className="flex flex-wrap gap-2">
              {post.relatedAreas?.map((slug) => (
                <Link
                  key={slug}
                  href={`/area/${slug}`}
                  className="badge-pink hover:bg-pink-100 transition-colors"
                >
                  このエリアの求人を見る
                </Link>
              ))}
              {post.relatedFeatures?.map((slug) => (
                <Link
                  key={slug}
                  href={`/feature/${slug}`}
                  className="badge bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  この条件の求人を見る
                </Link>
              ))}
              <Link
                href="/shops"
                className="badge bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                全求人一覧を見る
              </Link>
            </div>
          </section>
        )}

        {/* 記事末CTA */}
        <LineCTA
          title="気になるお店をLINEで相談"
          subtitle="記事を読んで疑問が残ったらLINEで気軽に質問を"
        />

        {/* 関連記事 */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-base font-bold text-gray-700 mb-4">
              関連記事
            </h2>
            <div className="space-y-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex gap-3 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <span className="badge-pink text-xs flex-shrink-0 self-start mt-0.5">
                    {p.category}
                  </span>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-colors line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 免責 */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-300 space-y-1">
          <p>※ 本記事は情報提供を目的としており、特定の店舗・サービスを推奨するものではありません。</p>
          <p>※ 掲載情報は記事公開時点のものです。最新情報は各店舗に直接ご確認ください。</p>
        </div>
      </article>
    </>
  );
}
