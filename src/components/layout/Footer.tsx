import Link from "next/link";
import { SITE_NAME, LINE_URL } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      {/* LINE CTA セクション */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-bold text-gray-800 mb-2">
            自分に合うお店をLINEで確認
          </p>
          <p className="text-sm text-gray-500 mb-5">
            未経験・学生・Wワーク、まずは相談だけでもOK
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line inline-flex"
          >
            <LineIcon size={20} />
            <span>LINEで無料相談する</span>
          </a>
        </div>
      </div>

      {/* リンク */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="font-bold text-sm text-gray-700 mb-3">求人を探す</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/shops" className="hover:text-pink-500">求人一覧</Link></li>
              <li><Link href="/feature/experience-ok" className="hover:text-pink-500">未経験歓迎</Link></li>
              <li><Link href="/feature/daily-pay" className="hover:text-pink-500">日払いOK</Link></li>
              <li><Link href="/feature/private-clothes" className="hover:text-pink-500">私服OK</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-700 mb-3">エリアから探す</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/area/shinjuku" className="hover:text-pink-500">新宿・歌舞伎町</Link></li>
              <li><Link href="/area/shibuya" className="hover:text-pink-500">渋谷</Link></li>
              <li><Link href="/area/ikebukuro" className="hover:text-pink-500">池袋</Link></li>
              <li><Link href="/area/roppongi" className="hover:text-pink-500">六本木</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-700 mb-3">初心者ガイド</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/blog/girlsbar-vs-kyabakura" className="hover:text-pink-500">ガルバとキャバの違い</Link></li>
              <li><Link href="/blog/taiken-checklist" className="hover:text-pink-500">体入チェックリスト</Link></li>
              <li><Link href="/blog/beginner-guide" className="hover:text-pink-500">未経験の選び方</Link></li>
              <li><Link href="/blog" className="hover:text-pink-500">記事一覧</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-700 mb-3">サイト情報</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-pink-500">このサイトについて</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-500">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500">利用規約</Link></li>
            </ul>
          </div>
        </div>

        {/* 免責 */}
        <div className="border-t border-gray-200 pt-6 text-xs text-gray-400 space-y-2">
          <p>
            ※ 掲載情報は情報確認日時点のものです。条件は変更になる場合があるため、応募前に必ず各店舗に直接ご確認ください。
          </p>
          <p>
            ※ 当サイトは求職者向けの情報提供を目的としています。掲載内容に関するお問い合わせはLINEよりお願いします。
          </p>
          <p className="pt-2">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
