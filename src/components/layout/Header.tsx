"use client";

import Link from "next/link";
import { useState } from "react";
import { LINE_URL, SITE_NAME } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-pink-500 leading-tight">
              {SITE_NAME}
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/shops" className="hover:text-pink-500 transition-colors">
              求人一覧
            </Link>
            <Link href="/area/shinjuku" className="hover:text-pink-500 transition-colors">
              エリアから探す
            </Link>
            <Link href="/blog" className="hover:text-pink-500 transition-colors">
              初心者ガイド
            </Link>
            <Link href="/about" className="hover:text-pink-500 transition-colors">
              このサイトについて
            </Link>
          </nav>

          {/* LINE応募ボタン */}
          <div className="flex items-center gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line-sm hidden sm:inline-flex"
            >
              <LineIcon />
              <span>LINE相談</span>
            </a>

            {/* ハンバーガー */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-pink-50"
              aria-label="メニューを開く"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {menuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white">
          <nav className="px-4 py-4 space-y-3 text-sm font-medium text-gray-700">
            <Link
              href="/shops"
              className="block py-2 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              求人一覧
            </Link>
            <Link
              href="/area/shinjuku"
              className="block py-2 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              エリアから探す
            </Link>
            <Link
              href="/blog"
              className="block py-2 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              初心者ガイド
            </Link>
            <Link
              href="/about"
              className="block py-2 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              このサイトについて
            </Link>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line w-full mt-2"
              onClick={() => setMenuOpen(false)}
            >
              <LineIcon />
              LINEで無料相談する
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
