"use client";

import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [visitors, setVisitors] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    // KST date, matching the server's daily reset in app/api/visit/route.ts.
    const kstDate = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const key = `portfolio-visit-${kstDate}`;
    const method = sessionStorage.getItem(key) ? "GET" : "POST";
    fetch("/api/visit", { method })
      .then((response) => response.json())
      .then((data: { total?: number; today?: number }) => {
        setVisitors({ total: data.total ?? 0, today: data.today ?? 0 });
        if (method === "POST") sessionStorage.setItem(key, "1");
      })
      .catch(() => undefined);
  }, []);

  if (visitors == null) return null;
  return (
    <span className="mono">
      오늘 {visitors.today.toLocaleString()} / 전체 {visitors.total.toLocaleString()}
    </span>
  );
}
