import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://thisnorm.dev"),
  title: "Dev.Name | Backend Developer Portfolio", // 님 이름으로 변경
  description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오입니다.",
  openGraph: {
    title: "Dev.Name | Backend Developer Portfolio",
    description: "진인사대천명. 압도적인 노력으로 결과를 만드는 백엔드 개발자 포트폴리오입니다.",
    url: "/",
    siteName: "Dev.Gyubeom Portfolio",
    images: [
      {
        url: "/og-image.png", // public 폴더에 1200x630 크기의 멋진 이미지(og-image.png)를 넣어두세요!
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
    <html lang="ko" className="!scroll-smooth"> {/* 스크롤 부드럽게 */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}