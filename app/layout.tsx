import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteDescription, siteTitle, siteUrl } from "./site";

const sans = localFont({ src: "./fonts/PretendardVariable.woff2", display: "swap", weight: "45 920", variable: "--font-sans" });

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
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allowLocalhost = process.env.NODE_ENV !== "production";

  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#f4f2eb" />
      </head>
      <body className={`${sans.className} ${sans.variable}`}>
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
