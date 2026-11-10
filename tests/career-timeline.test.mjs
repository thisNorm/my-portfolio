import assert from "node:assert/strict";
import test from "node:test";
import { getCareerTimeline } from "../app/lib/career.ts";

const periods = [
  { kind: "work", startMonth: "2026-06", endMonth: null },
  { kind: "training", startMonth: "2026-01", endMonth: "2026-02" },
];

test("career separates work and training and leaves the months between them empty", () => {
  const timeline = getCareerTimeline(periods, new Date("2026-11-10T03:00:00Z"));
  assert.equal(timeline.firstMonth, "2026-01");
  assert.equal(timeline.asOfMonth, "2026-11");
  assert.equal(timeline.columns, 10);
  assert.deepEqual(timeline.totals, { work: 5, training: 2 });
  assert.deepEqual(timeline.ranges, [
    { kind: "work", start: 6, end: 11 },
    { kind: "training", start: 1, end: 3 },
  ]);
});

test("ongoing work increases at the start of a month in Seoul", () => {
  const before = getCareerTimeline(periods, new Date("2026-10-31T14:59:59Z"));
  const after = getCareerTimeline(periods, new Date("2026-10-31T15:00:00Z"));
  assert.equal(before.totals.work, 4);
  assert.equal(after.totals.work, 5);
  assert.equal(after.totals.training, 2);
});
