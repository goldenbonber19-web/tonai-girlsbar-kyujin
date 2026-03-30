import { LINE_URL } from "@/lib/constants";
import { LineIcon } from "./LineIcon";

interface LineCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function LineCTA({
  title = "自分に合うお店をLINEで確認",
  subtitle = "未経験・学生・Wワーク、まずは相談だけでもOK",
  className = "",
}: LineCTAProps) {
  return (
    <div
      className={`bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 text-center ${className}`}
    >
      <div className="text-2xl mb-2">💬</div>
      <p className="font-bold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-line inline-flex"
      >
        <LineIcon size={20} />
        <span>LINEで無料相談する</span>
      </a>
      <p className="text-xs text-gray-400 mt-3">
        応募前の質問・不安な点も気軽にどうぞ
      </p>
    </div>
  );
}
