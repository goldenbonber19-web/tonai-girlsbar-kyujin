"use client";

import { useEffect, useState } from "react";

interface CounterData {
  total: number;
  today: number;
}

// 本番: 環境変数 NEXT_PUBLIC_COUNTER_API_URL に Cloudflare Worker の URL を設定
const COUNTER_API = process.env.NEXT_PUBLIC_COUNTER_API_URL;

async function fetchCounter(): Promise<CounterData> {
  if (COUNTER_API) {
    try {
      const res = await fetch(COUNTER_API, { cache: "no-store" });
      if (res.ok) return res.json();
    } catch {
      // fallthrough to local mock
    }
  }
  // ローカル仮実装: localStorage ベース
  const stored = localStorage.getItem("visitor_data");
  const todayKey = new Date().toISOString().slice(0, 10);
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date !== todayKey) {
      const next = { total: data.total + 1, today: 1, date: todayKey };
      localStorage.setItem("visitor_data", JSON.stringify(next));
      return next;
    }
    const next = { total: data.total + 1, today: data.today + 1, date: todayKey };
    localStorage.setItem("visitor_data", JSON.stringify(next));
    return next;
  }
  const init = { total: 12480, today: 1, date: todayKey };
  localStorage.setItem("visitor_data", JSON.stringify(init));
  return init;
}

export function VisitorCounter() {
  const [data, setData] = useState<CounterData | null>(null);

  useEffect(() => {
    fetchCounter().then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
        <span>本日 <strong className="text-gray-700">{data.today.toLocaleString()}</strong> 人が閲覧中</span>
      </div>
      <span className="text-gray-200">|</span>
      <span>累計 <strong className="text-gray-700">{data.total.toLocaleString()}</strong> 人</span>
    </div>
  );
}
