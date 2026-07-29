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

export async function GET() {
  try {
    const visitor = await writeClient.fetch<VisitorDocument | null>(
      `*[_type == "visitor"][0]`,
    );
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const todayStr = kstDate.toISOString().split("T")[0];

    return NextResponse.json({
      today: visitor?.lastUpdated === todayStr ? (visitor?.today ?? 0) : 0,
      total: visitor?.total ?? 0,
    });
  } catch (error) {
    console.error("Visitor Read Error:", error);
    return NextResponse.json({ today: 0, total: 0 });
  }
}

export async function POST() {
  try {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    const todayStr = kstDate.toISOString().split("T")[0];

    const visitor = await writeClient.fetch<VisitorDocument | null>(
      `*[_type == "visitor"][0]`,
    );

    let docId = visitor?._id;
    const currentTotal = visitor?.total ?? 0;
    const currentToday = visitor?.today ?? 0;
    const lastUpdated = visitor?.lastUpdated ?? "";

    if (!visitor) {
      const newDocument = await writeClient.create({
        _type: "visitor",
        total: 0,
        today: 0,
        lastUpdated: todayStr,
      });
      docId = newDocument._id;
    }

    if (!docId) {
      throw new Error("Visitor document ID is unavailable");
    }

    let newToday = currentToday + 1;
    const newTotal = currentTotal + 1;

    if (lastUpdated !== todayStr) {
      newToday = 1;
    }

    await writeClient
      .patch(docId)
      .set({
        total: newTotal,
        today: newToday,
        lastUpdated: todayStr,
      })
      .commit();

    return NextResponse.json({
      today: newToday,
      total: newTotal,
    });
  } catch (error) {
    console.error("Visitor Update Error:", error);
    return NextResponse.json(
      { message: "Error updating count" },
      { status: 500 },
    );
  }
}