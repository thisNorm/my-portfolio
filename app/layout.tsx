import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.vercel.app"), // 배포 후 본인 도메인 입력
  title: "Dev.Gyubeom | Backend Developer Portfolio",
  description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오",
  icons: {
    icon: '/favicon.ico', // 파비콘 경로
  },
  openGraph: {
    title: "Dev.Gyubeom | Backend Developer Portfolio",
    description: "ESFP 리더형 개발자. 기술과 비즈니스를 연결합니다.",
    url: "/",
    siteName: "Dev.Gyubeom Portfolio",
    images: [
      {
        url: "/og-image.png", // public 폴더에 이미지 넣어두세요
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
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