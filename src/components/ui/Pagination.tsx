"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="ページネーション" className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-pink-50 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="前のページ"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`min-w-[36px] h-9 rounded-xl text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-pink-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
            }`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-pink-50 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="次のページ"
      >
        ›
      </button>
    </nav>
  );
}
