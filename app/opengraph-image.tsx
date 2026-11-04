import { ImageResponse } from "next/og";
import { siteDescription, siteName, siteRole, siteUrl } from "./site";

export const alt = `${siteName} — ${siteRole}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori has no Hangul glyphs by default; fetch a Noto Sans KR subset with only the characters drawn.
async function loadFont(text: string, weight: 400 | 700) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Noto Sans KR font URL not found in Google Fonts response");
  return fetch(url).then((response) => response.arrayBuffer());
}

export default async function OpengraphImage() {
  const host = new URL(siteUrl).host;
  const [regular, bold] = await Promise.all([
    loadFont(`${siteDescription}${host}`, 400),
    loadFont(`${siteName}${siteRole}`, 700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#fff",
          fontFamily: "Noto Sans KR",
          background:
            "radial-gradient(circle at 78% 18%, rgba(58,112,255,.28), transparent 34%), linear-gradient(135deg,#07111f 0%,#0a1422 54%,#0b1728 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#54d589", fontSize: 28, fontWeight: 700 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#42c977" }} />
            {siteRole}
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              backgroundImage: "linear-gradient(90deg,#56b3ff,#aa72ff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {siteName}
          </div>
          <div style={{ marginTop: 28, maxWidth: 940, fontSize: 32, lineHeight: 1.55, color: "#aebdce" }}>
            {siteDescription}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#7f8ea3" }}>{host}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
        { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
