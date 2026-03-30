import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: "/" },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: item.href } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="py-3 px-4 max-w-6xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
          <li>
            <Link href="/" className="hover:text-pink-500 transition-colors">
              トップ
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <span>/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-pink-500 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
