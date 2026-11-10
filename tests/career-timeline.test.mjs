import assert from "node:assert/strict";
import test from "node:test";
import { getCareerTenure } from "../app/lib/career.ts";

const periods = [
  { kind: "work", startMonth: "2026-06", endMonth: null },
  { kind: "training", startMonth: "2026-01", endMonth: "2026-02" },
];

test("total tenure adds work and training without counting the gap between them", () => {
  const tenure = getCareerTenure(periods, new Date("2026-11-10T03:00:00Z"));
  assert.equal(tenure.asOfMonth, "2026-11");
  assert.deepEqual(tenure.totals, { work: 5, training: 2 });
  assert.equal(tenure.totalMonths, 7);
});

test("ongoing work increases at the start of a month in Seoul", () => {
  const before = getCareerTenure(periods, new Date("2026-10-31T14:59:59Z"));
  const after = getCareerTenure(periods, new Date("2026-10-31T15:00:00Z"));
  assert.equal(before.totals.work, 4);
  assert.equal(after.totals.work, 5);
  assert.equal(after.totals.training, 2);
  assert.equal(before.totalMonths, 6);
  assert.equal(after.totalMonths, 7);
});
