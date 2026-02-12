import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://thisnorm.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ✅ 기존 타이틀 유지 + 페이지별 확장 가능하게만 변경
  title: {
    default: "Dev.Gyubeom | Backend Developer Portfolio",
    template: "%s | Dev.Gyubeom",
  },

  // ✅ 기존 설명 유지
  description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오",

  // ✅ 중복 URL 점수 분산 방지(추가)
  alternates: { canonical: "/" },

  // ✅ 기존 파비콘 유지
  icons: {
    icon: "/favicon.ico",
  },

  // ✅ OG는 기존 유지, url만 절대경로로 정리
  openGraph: {
    title: "Dev.Gyubeom | Backend Developer Portfolio",
    description: "ESFP 리더형 개발자. 기술과 비즈니스를 연결합니다.",
    url: siteUrl,
    siteName: "Dev.Gyubeom Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  // ✅ 공유/검색결과 품질용(추가)
  twitter: {
    card: "summary_large_image",
    title: "Dev.Gyubeom | Backend Developer Portfolio",
    description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="!scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}