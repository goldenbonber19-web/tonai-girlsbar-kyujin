interface ConditionBadgeProps {
  value: boolean | null;
  trueLabel: string;
  falseLabel?: string;
  size?: "sm" | "md";
}

export function ConditionBadge({
  value,
  trueLabel,
  falseLabel,
  size = "sm",
}: ConditionBadgeProps) {
  const base =
    size === "sm"
      ? "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      : "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";

  if (value === true) {
    return <span className={`${base} bg-pink-50 text-pink-600`}>{trueLabel}</span>;
  }
  if (value === false && falseLabel) {
    return <span className={`${base} bg-gray-100 text-gray-400`}>{falseLabel}</span>;
  }
  return <span className={`${base} bg-gray-50 text-gray-300`}>要確認</span>;
}
