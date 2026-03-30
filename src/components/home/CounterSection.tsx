import type { SiteMeta } from "@/types";

interface CounterSectionProps {
  meta: SiteMeta;
}

export function CounterSection({ meta }: CounterSectionProps) {
  const lastUpdated = new Date(meta.lastUpdated);
  const formattedDate = `${lastUpdated.getMonth() + 1}/${lastUpdated.getDate()} ${lastUpdated.getHours()}:${String(lastUpdated.getMinutes()).padStart(2, "0")}`;

  const stats = [
    { label: "累計掲載店舗", value: meta.totalShops, unit: "件", highlight: true },
    { label: "今週の追加", value: meta.weekAdded, unit: "件", highlight: false },
    { label: "本日更新", value: meta.todayUpdated, unit: "件", highlight: false },
  ];

  return (
    <section className="bg-white py-8 border-y border-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 最終更新 */}
        <p className="text-center text-xs text-gray-400 mb-4">
          最終更新: {formattedDate}
        </p>

        {/* 数字カード群 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`text-center rounded-2xl py-4 px-2 ${
                s.highlight
                  ? "bg-pink-500 text-white shadow-cta"
                  : "bg-pink-50 text-gray-700"
              }`}
            >
              <div
                className={`text-2xl sm:text-3xl font-bold ${
                  s.highlight ? "text-white" : "text-pink-500"
                }`}
              >
                {s.value.toLocaleString()}
                <span className="text-base font-normal ml-0.5">{s.unit}</span>
              </div>
              <div
                className={`text-xs mt-1 ${
                  s.highlight ? "text-pink-100" : "text-gray-500"
                }`}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* エリア別掲載数 */}
        <div>
          <p className="text-xs font-medium text-gray-400 mb-2 text-center">
            エリア別掲載数
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {meta.areaStats.map((a) => (
              <div
                key={a.slug}
                className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs"
              >
                <span className="text-gray-600">{a.area}</span>
                <span className="font-bold text-pink-500">{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
