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

export function getCareerTimeline(periods: CareerPeriod[], now: Date) {
  const parts = seoulCalendarMonth.formatToParts(now);
  const year = parts.find((part) => part.type === "year")!.value;
  const month = parts.find((part) => part.type === "month")!.value;
  const asOfMonth = year + "-" + month;
  const asOf = monthIndex(asOfMonth);
  const firstMonth = periods.map((period) => period.startMonth).sort()[0] ?? asOfMonth;
  const first = monthIndex(firstMonth);
  const totals = { work: 0, training: 0 };
  let columns = Math.max(1, asOf - first);

  const ranges = periods.map((period) => {
    const from = monthIndex(period.startMonth);
    // Completed roles include their last recorded month; ongoing work is approximate.
    const to = period.endMonth ? monthIndex(period.endMonth) + 1 : asOf;
    const months = Math.max(0, to - from);
    const start = from - first + 1;
    const end = start + months;
    totals[period.kind] += months;
    columns = Math.max(columns, end - 1);
    return { kind: period.kind, start, end };
  });

  return { asOfMonth, firstMonth, columns, ranges, totals };
}

export function formatCareerMonths(months: number) {
  if (months === 0) return "1개월 미만";
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  return [years ? years + "년" : "", remaining ? remaining + "개월" : ""].filter(Boolean).join(" ");
}
