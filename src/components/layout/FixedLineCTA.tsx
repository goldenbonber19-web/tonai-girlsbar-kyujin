"use client";

import { LINE_URL } from "@/lib/constants";
import { LineIcon } from "@/components/ui/LineIcon";

export function FixedLineCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-pink-100 shadow-[0_-4px_16px_rgba(232,67,127,0.12)] px-4 py-3">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-line w-full max-w-md mx-auto flex"
      >
        <LineIcon size={20} />
        <span>まずはLINEで相談する（無料）</span>
      </a>
    </div>
  );
}
