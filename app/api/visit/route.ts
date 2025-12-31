import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// ✨ 핵심 1: 캐싱 방지 (이게 없으면 카운트가 안 올라갑니다)
export const dynamic = "force-dynamic";

// 쓰기 권한 클라이언트
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터 필수
  token: process.env.SANITY_API_TOKEN,
});

export async function POST() {
  try {
    const now = new Date();
    // 한국 시간(KST) 계산
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    const todayStr = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD

    // 1. 문서 가져오기 (없으면 null)
    const visitor = await writeClient.fetch(`*[_type == "visitor"][0]`);

    // ✨ 핵심 2: 문서가 없으면 새로 만들기 (초기 세팅 자동화)
    let docId = visitor?._id;
    let currentTotal = visitor?.total || 0;
    let currentToday = visitor?.today || 0;
    let lastUpdated = visitor?.lastUpdated || "";

    if (!visitor) {
      console.log("Visitor document not found. Creating new one...");
      const newDoc = await writeClient.create({
        _type: "visitor",
        total: 0,
        today: 0,
        lastUpdated: todayStr,
      });
      docId = newDoc._id;
    }

    // 2. 날짜 비교 및 카운트 계산
    let newToday = currentToday + 1;
    let newTotal = currentTotal + 1;

    if (lastUpdated !== todayStr) {
      // 날짜가 바뀌었으면 Today 초기화
      newToday = 1;
      console.log("Date changed. Resetting today count.");
    }

    // 3. 업데이트 (Patch)
    await writeClient
      .patch(docId)
      .set({
        total: newTotal,
        today: newToday,
        lastUpdated: todayStr,
      })
      .commit();

    console.log(`Updated Visitor: Today(${newToday}), Total(${newTotal})`);

    return NextResponse.json({
      today: newToday,
      total: newTotal,
    });

  } catch (error) {
    console.error("Visitor Update Error:", error);
    return NextResponse.json(
      { message: "Error updating count" }, 
      { status: 500 }
    );
  }
}