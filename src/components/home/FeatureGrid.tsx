import Link from "next/link";
import { FEATURES } from "@/lib/constants";

export function FeatureGrid() {
  return (
    <section className="bg-gradient-to-b from-pink-50/50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title">条件から探す</h2>
          <p className="section-subtitle">重視したい条件でかんたんに絞り込み</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {FEATURES.map((f) => (
            <Link
              key={f.slug}
              href={`/feature/${f.slug}`}
              className="group flex flex-col items-center gap-2 bg-white hover:bg-pink-50 rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-xs font-bold text-gray-700 group-hover:text-pink-500 transition-colors leading-tight">
                {f.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
