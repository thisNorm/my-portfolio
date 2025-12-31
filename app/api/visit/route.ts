// app/api/visit/route.ts
import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

// 쓰기 권한이 있는 클라이언트 생성
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // 실시간 데이터이므로 CDN 끔
  token: process.env.SANITY_API_TOKEN, // .env.local에 추가해야 함
});

export async function POST() {
  try {
    // 1. 현재 날짜 구하기 (KST 기준)
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    const todayStr = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD

    // 2. 가장 최근 visitor 문서 가져오기
    const visitor = await writeClient.fetch(`*[_type == "visitor"][0]`);

    if (!visitor) {
      return NextResponse.json({ message: "Visitor document not found" }, { status: 404 });
    }

    let patchDoc;

    // 3. 날짜 비교 로직
    if (visitor.lastUpdated !== todayStr) {
      // 날짜가 바뀌었으면 Today 초기화
      patchDoc = {
        today: 1,
        total: (visitor.total || 0) + 1,
        lastUpdated: todayStr,
      };
    } else {
      // 같은 날이면 Today 증가
      patchDoc = {
        today: (visitor.today || 0) + 1,
        total: (visitor.total || 0) + 1,
      };
    }

    // 4. Sanity 업데이트
    await writeClient
      .patch(visitor._id)
      .set(patchDoc)
      .commit();

    return NextResponse.json({
      today: patchDoc.today,
      total: patchDoc.total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating count" }, { status: 500 });
  }
}