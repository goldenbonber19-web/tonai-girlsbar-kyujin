import { TRUST_RANK_LABELS } from "@/lib/constants";
import type { TrustRank } from "@/types";

interface TrustBadgeProps {
  rank: TrustRank;
  showDescription?: boolean;
}

export function TrustBadge({ rank, showDescription = false }: TrustBadgeProps) {
  const info = TRUST_RANK_LABELS[rank];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${info.color}`}
        title={info.description}
      >
        情報ランク {info.label}
      </span>
      {showDescription && (
        <span className="text-xs text-gray-400">{info.description}</span>
      )}
    </span>
  );
}
