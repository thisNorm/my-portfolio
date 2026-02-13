import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://thisnorm.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Dev.Gyubeom | Backend Developer Portfolio",
    template: "%s | Dev.Gyubeom",
  },

  description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오",

  // ✅ 전역 canonical은 빼는 게 안전함 (페이지별로 generateMetadata에서 지정)
  // alternates: { canonical: "/" },

  icons: {
    icon: "/favicon.ico",
  },

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

  twitter: {
    card: "summary_large_image",
    title: "Dev.Gyubeom | Backend Developer Portfolio",
    description:
      "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오",
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
      </body>
    </html>
  );
}
