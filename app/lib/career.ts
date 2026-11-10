export type CareerPeriod = {
  kind: "work" | "training";
  startMonth: string;
  endMonth: string | null;
};

const seoulCalendarMonth = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
});

function monthIndex(month: string) {
  const [year, number] = month.split("-").map(Number);
  return year * 12 + number - 1;
}

export function getCareerTenure(periods: CareerPeriod[], now: Date) {
  const parts = seoulCalendarMonth.formatToParts(now);
  const year = parts.find((part) => part.type === "year")!.value;
  const month = parts.find((part) => part.type === "month")!.value;
  const asOfMonth = year + "-" + month;
  const asOf = monthIndex(asOfMonth);
  const totals = { work: 0, training: 0 };

  for (const period of periods) {
    const from = monthIndex(period.startMonth);
    // Completed roles include their last recorded month; ongoing work is approximate.
    const to = period.endMonth ? monthIndex(period.endMonth) + 1 : asOf;
    totals[period.kind] += Math.max(0, to - from);
  }

  return { asOfMonth, totals, totalMonths: totals.work + totals.training };
}

export function formatCareerMonths(months: number) {
  if (months === 0) return "1개월 미만";
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  return [years ? years + "년" : "", remaining ? remaining + "개월" : ""].filter(Boolean).join(" ");
}
