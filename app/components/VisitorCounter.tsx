// app/components/VisitorCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [counts, setCounts] = useState({ today: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 API 호출 (카운트 증가 및 데이터 가져오기)
    const updateVisitorCount = async () => {
      try {
        const res = await fetch("/api/visit", { method: "POST" });
        const data = await res.json();
        if (data.today !== undefined) {
          setCounts({ today: data.today, total: data.total });
        }
      } catch (error) {
        console.error("Visitor count error:", error);
      } finally {
        setLoading(false);
      }
    };

    updateVisitorCount();
  }, []);

  if (loading) return null; // 로딩 중엔 숨김 (또는 스켈레톤 처리)

  return (
    <div className="fixed top-4 left-6 z-50 flex items-center gap-3 text-[10px] md:text-xs font-mono text-slate-500/80 bg-slate-950/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-slate-800/50 hover:bg-slate-900/80 transition-colors cursor-default">
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Today: <span className="text-slate-300 font-semibold">{counts.today}</span>
      </span>
      <span className="w-px h-3 bg-slate-700"></span>
      <span>
        Total: <span className="text-slate-300 font-semibold">{counts.total}</span>
      </span>
    </div>
  );
}