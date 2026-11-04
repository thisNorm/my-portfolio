import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const dynamic = "force-dynamic";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type VisitorDocument = {
  _id: string;
  total?: number;
  today?: number;
  lastUpdated?: string;
};

// KST calendar date (YYYY-MM-DD); the client uses the same rule for its dedupe key.
const kstToday = () =>
  new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

export async function GET() {
  try {
    const visitor = await writeClient.fetch<VisitorDocument | null>(
      `*[_type == "visitor"][0]`,
    );

    return NextResponse.json({
      today: visitor?.lastUpdated === kstToday() ? (visitor?.today ?? 0) : 0,
      total: visitor?.total ?? 0,
    });
  } catch (error) {
    console.error("Visitor Read Error:", error);
    return NextResponse.json({ today: 0, total: 0 });
  }
}

export async function POST() {
  try {
    const todayStr = kstToday();

    let visitor = await writeClient.fetch<VisitorDocument | null>(
      `*[_type == "visitor"][0]`,
    );

    if (!visitor) {
      visitor = await writeClient.create({
        _type: "visitor",
        total: 0,
        today: 0,
        lastUpdated: todayStr,
      });
    }

    // inc() is applied server-side, so concurrent visits are not lost.
    // shortcut: at the KST day boundary concurrent resets can drop a few "today" counts; total stays exact.
    const patch = writeClient
      .patch(visitor._id)
      .setIfMissing({ total: 0, today: 0 })
      .inc({ total: 1 });
    const updated = await (visitor.lastUpdated === todayStr
      ? patch.inc({ today: 1 })
      : patch.set({ today: 1, lastUpdated: todayStr })
    ).commit<VisitorDocument>();

    return NextResponse.json({
      today: updated.today ?? 0,
      total: updated.total ?? 0,
    });
  } catch (error) {
    console.error("Visitor Update Error:", error);
    return NextResponse.json(
      { message: "Error updating count" },
      { status: 500 },
    );
  }
}
