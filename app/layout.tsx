import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://www.thisnorm.dev";
const siteTitle = "황규범 | Backend Engineer · AI Systems & Automation";
const siteDescription =
  "백엔드와 인프라 경험을 기반으로 AI 에이전트, 자동화 워크플로우, 엣지 시스템을 실제 서비스에 연결하는 엔지니어 황규범의 포트폴리오입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Dev.Gyubeom",
  },

  description: siteDescription,

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
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

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allowLocalhost = process.env.NODE_ENV !== "production";

  return (
    <html lang="ko" className="!scroll-smooth">
      <body className={inter.className}>
        {/* ✅ 기존 <script defer ...>와 동일 목적: 분석 스크립트 주입 */}
        <Script
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
          data-website-id="dfid_imYAo3bEEKiebmZtk7qQ1"
          data-domain="thisnorm.dev"
          data-allow-localhost={allowLocalhost ? "true" : "false"}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
