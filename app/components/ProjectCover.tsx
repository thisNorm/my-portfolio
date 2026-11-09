import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "./portfolioData";

const mapRoads = "M-30 300L190 380L480 242M-20 128L230 214L470 96M85-30L-12 142L118 195L10 418M313-30L180 139L305 187L215 478M482 210L329 286L421 334";
const pinRoute = "M88 210Q196 99 302 220Q324 281 206 315";

export default function ProjectCover({ project }: { project: Project }) {
  const coverId = project.id === "harnessvault" ? "harness" : project.id === "aegisview" ? "aegis" : project.id;
  const primaryImage = project.media?.[0];
  if (primaryImage && (project.id === "finance" || project.id === "tailscale" || project.id === "pinmate" || project.id === "facegate")) {
    const mediaCoverId = project.id === "facegate" ? "terminal" : coverId;
    return <figure className={`project-cover cover-${mediaCoverId} has-product-media`}>
      <Image src={primaryImage.src} alt={primaryImage.alt} width={primaryImage.width} height={primaryImage.height} sizes={`(max-width: 720px) calc(100vw - 46px), ${project.id === "finance" ? "55vw" : project.id === "tailscale" ? "50vw" : "44vw"}`} />
      <figcaption>{project.coverCaption}</figcaption>
    </figure>;
  }
  let artwork: ReactNode;

  switch (project.id) {
    case "finance":
      artwork = <Image src="/portfolio/finance-art.png" alt="흩어진 종이 자료가 하나의 정돈된 묶음으로 모이는 개념 그래픽" width={1466} height={1073} sizes="(max-width: 600px) calc(100vw - 46px), (max-width: 1050px) 50vw, 55vw" />;
      break;
    case "facegate": {
      const metric = project.metric;
      const [label, ...mode] = metric?.label.split(" · ") ?? [];
      artwork = metric && <>
        <div className="metric-label"><span>{label}</span><span>{mode.join(" · ")}</span></div>
        <div className="metric-main"><strong>{metric.after}</strong><span>{metric.unit}</span></div>
        <div className="metric-comparison"><span>CPU {metric.before}{metric.unit}</span><span aria-hidden="true">→</span><b>NPU {metric.after}{metric.unit}</b></div>
      </>;
      break;
    }
    case "autoci":
      artwork = <>
        <svg className="ci-art" viewBox="0 0 740 460" fill="none" aria-hidden="true">
          <path d="M32 320H216Q260 320 260 276V224Q260 182 302 182H474Q522 182 522 230V262Q522 305 565 305H704" stroke="#8794a5" strokeWidth="3" />
          <path d="M75 333L225 388L462 298L312 243Z" fill="#152232" stroke="#4b5b71" />
          <path d="M75 310L225 365L462 275L312 220Z" fill="#1c2b3e" stroke="#7d8da0" />
          <path d="M388 211L555 270L703 216L536 157Z" fill="#1a2737" stroke="#65768c" />
          <path d="M388 185L555 244L703 190L536 131Z" fill="#233247" stroke="#92a0b1" />
          <g className="pm-ci-scene">
            <path d="M348 122L369 114L442 140L421 148Z M348 122L360 126V250L348 246Z" fill="#26364a" stroke="#8996a7" strokeWidth="1.5" />
            <g className="pm-ci-packet" transform="translate(178 -38)">
              <g transform="translate(384 202) scale(.52) translate(-384 -202)">
                <path className="pm-ci-sheet-front" d="M318 112L426 151V281L318 242Z" fill="#e0e5e9" stroke="#e0e5e9" />
                <path className="pm-ci-sheet-side" d="M426 151L451 142V272L426 281Z" fill="#a4b1c0" stroke="#c1cbd6" />
                <path className="pm-ci-sheet-top" d="M318 112L343 103L451 142L426 151Z" fill="#f0f2f4" />
                <path className="pm-ci-sheet-lines" d="M340 160L404 183M340 181L404 204M340 202L389 219" stroke="#607187" strokeWidth="3" />
              </g>
            </g>
            <path d="M421 148L433 144V263L421 268Z M348 246L421 273L433 269" fill="#27384c" stroke="#a2adbb" strokeWidth="1.5" />
            <path className="pm-ci-gate-arm" d="M358 181L421 204" stroke="#e9e5dd" strokeWidth="5" />
          </g>
          <path d="M570 285H635Q674 285 674 324V366Q674 399 636 399H217" stroke="#596c84" strokeWidth="2" strokeDasharray="5 7" />
        </svg>
        <div className="ci-caption"><span>생성</span><strong>실행·검증</strong><span>통과한 설정만</span></div>
      </>;
      break;
    case "harnessvault":
      artwork = <>
        <div className="harness-word">한 사람의 도구를,<br />함께 쓰는 자산으로.</div>
        <Image src="/portfolio/harnessvault-dev.png" alt="HarnessVault 자산 목록의 실제 개발 화면 일부, 테스트 데이터" width={1280} height={900} sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 1050px) 50vw, 36vw" />
      </>;
      break;
    case "aegisview":
      artwork = <Image src="/portfolio/aegisview.png" alt="CCTV와 로봇 관제 및 이벤트 저장을 보여주는 실제 개발 데모" width={3838} height={2085} sizes="(max-width: 720px) calc(100vw - 46px), 55vw" />;
      break;
    case "pinmate":
      artwork = <svg className="map-art" viewBox="0 0 430 460" aria-hidden="true">
        <path d={mapRoads} fill="none" stroke="#34465e" strokeWidth="33" />
        <path d={mapRoads} fill="none" stroke="#738096" strokeWidth="1" />
        <path d={pinRoute} fill="none" stroke="#c5ccd5" strokeWidth="2" strokeDasharray="4 7" />
        <path className="pm-pin-route" d={pinRoute} fill="none" stroke="#ede9e1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset="0" />
        <g fill="#e5e9ed">
          <path d="M88 175c-21 0-36 15-36 34 0 25 36 53 36 53s36-28 36-53c0-19-15-34-36-34Z" />
          <path d="M302 183c-21 0-36 15-36 34 0 25 36 53 36 53s36-28 36-53c0-19-15-34-36-34Z" />
          <path d="M206 277c-21 0-36 15-36 34 0 25 36 53 36 53s36-28 36-53c0-19-15-34-36-34Z" />
        </g>
        <g fill="#152235"><circle cx="88" cy="208" r="10" /><circle cx="302" cy="216" r="10" /><circle cx="206" cy="310" r="10" /></g>
      </svg>;
      break;
    case "content":
      artwork = <>
        <div className="draft-sheet"><span>노션 초안</span><div className="draft-lines" aria-hidden="true"><i /><i /><i /><i /></div><strong>초안에서<br />발행까지.</strong></div>
        <div className="publish-line"><span>각색</span><span>썸네일</span><span>발행</span></div>
      </>;
      break;
    case "sns":
      artwork = <>
        <div className="speech-outline" aria-hidden="true" />
        <p>대화는<br /><span>언제</span><br />멈출까.</p>
      </>;
      break;
    case "deepvoice":
      artwork = <>
        <svg className="voice-art" viewBox="0 0 900 260" fill="none" aria-hidden="true">
          <path d="M0 132H110L128 112L145 154L163 87L182 179L204 52L223 208L245 23L267 237L289 52L311 207L333 90L355 172L376 111L396 148L415 123H490L509 109L527 158L545 85L565 181L586 45L608 219L630 75L650 185L670 103L691 158L711 120L730 136H900" stroke="#c8d1dd" strokeWidth="2" />
          <path d="M0 132H100L122 128L142 139L163 121L183 145L206 114L227 151L247 103L268 161L290 114L312 152L333 124L355 144L376 128H900" stroke="#687b94" strokeWidth="1" />
        </svg>
        <p>통화 중의 목소리를,<br />휴대폰 안에서.</p>
      </>;
      break;
  }

  return <figure className={`project-cover cover-${coverId}`}>{artwork}<figcaption>{project.coverCaption}</figcaption></figure>;
}
