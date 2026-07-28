import type { Metadata } from "next";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Braces,
  Database,
  Github,
  Mail,
  Network,
  ServerCog,
  Sparkles,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "황규범 | Backend Engineer · AI Systems & Automation",
  description:
    "백엔드와 인프라 경험을 기반으로 AI 에이전트, 자동화 워크플로우, 엣지 시스템을 실제 서비스에 연결하는 엔지니어 황규범의 포트폴리오입니다.",
  alternates: { canonical: "/" },
};

const experiences = [
  {
    period: "2026.06 — PRESENT",
    company: "Infovally Korea",
    role: "Backend Engineer",
    summary:
      "스마트팜 현장의 장치 연결, 엣지 서버 운영, 데이터 수집·전송 흐름을 개발하고 있습니다.",
    points: ["Edge server & device integration", "Node.js backend", "Linux · Docker · Network"],
  },
  {
    period: "2026.01 — 2026.02",
    company: "ETRI Autonomous IoT Lab",
    role: "Research Trainee",
    summary:
      "폐쇄망 영상 AI 관제 환경에서 실시간 추론 결과 처리와 Redis 기반 데이터 파이프라인을 구현했습니다.",
    points: ["YOLOv8 pipeline", "Redis queue", "Real-time monitoring"],
  },
];

const projects = [
  {
    label: "ON-DEVICE AI",
    title: "DeepVoice Shield",
    description:
      "딥보이스 탐지를 모바일 환경에 맞게 경량화하고, 실시간 음성 처리 파이프라인과 애플리케이션을 연결했습니다.",
    result: "약 91% 모델 경량화",
    stack: ["ONNX", "TFLite", "FastAPI", "Android"],
    icon: BrainCircuit,
  },
  {
    label: "AI AUTOMATION",
    title: "Content Agent",
    description:
      "콘텐츠 조사부터 생성, 검수, 배포까지 반복 작업을 에이전트와 워크플로우로 구성한 자동화 프로젝트입니다.",
    result: "End-to-end workflow",
    stack: ["Agent", "Workflow", "RAG", "Evaluation"],
    icon: Workflow,
  },
  {
    label: "AI MONITORING",
    title: "AegisView · Lab Guardian",
    description:
      "폐쇄망 환경의 영상 AI 추론 결과를 수집하고 관제 화면까지 전달하는 실시간 모니터링 시스템입니다.",
    result: "Real-time pipeline",
    stack: ["YOLOv8", "Redis", "WebSocket", "Docker"],
    icon: Network,
  },
  {
    label: "AEO · GEO",
    title: "SiteOps Radar",
    description:
      "생성형 검색 환경에서 브랜드 노출과 인용 흐름을 관찰하고 개선 기회를 찾기 위한 분석 실험입니다.",
    result: "Search visibility analysis",
    stack: ["AEO", "GEO", "Automation", "Analytics"],
    icon: Sparkles,
  },
];

const focusAreas = [
  { title: "Agentic Systems", text: "도구 호출, 메모리, 권한, 평가를 갖춘 실행 가능한 에이전트", icon: Bot },
  { title: "Workflow Automation", text: "반복 가능한 상태 흐름, 재시도, 승인, 실패 복구를 포함한 자동화", icon: Workflow },
  { title: "Backend & Data", text: "API, 큐, 데이터베이스, 실시간 통신을 연결하는 서비스 기반", icon: Database },
  { title: "Infra & Edge", text: "Linux, Docker, 네트워크, 장치 환경에서 안정적으로 동작하는 시스템", icon: ServerCog },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="황규범 포트폴리오 홈">
          <span className="brand-mark">HN</span>
          <span className="brand-copy"><strong>HWANG GYUBEOM</strong><small>BACKEND · AI SYSTEMS</small></span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#focus">Focus</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <p className="eyebrow">BACKEND ENGINEER · AI SYSTEMS & AUTOMATION</p>
          <h1>AI가 실제 업무를 수행하도록,<br /><span>시스템과 자동화를 설계합니다.</span></h1>
          <p className="hero-description">
            백엔드와 인프라 경험을 기반으로 에이전트, 워크플로우, 데이터와 도구를 연결합니다.
            불확실한 AI를 실제 환경에서 반복 가능하고 측정 가능한 시스템으로 만드는 데 관심이 있습니다.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">Selected work <ArrowUpRight size={18} /></a>
            <a className="secondary-button" href="https://github.com/thisNorm" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
          </div>
          <div className="hero-metrics" aria-label="핵심 역량">
            <div><strong>Backend</strong><span>API · Realtime · Data</span></div>
            <div><strong>Automation</strong><span>Agent · Workflow · RAG</span></div>
            <div><strong>Edge</strong><span>Linux · Docker · Device</span></div>
          </div>
        </div>

        <div className="system-map" aria-label="AI 시스템 구조 시각화">
          <div className="map-orbit orbit-one" />
          <div className="map-orbit orbit-two" />
          <div className="map-node node-agent"><Bot size={26} /><span>Agent</span></div>
          <div className="map-node node-workflow"><Workflow size={26} /><span>Workflow</span></div>
          <div className="map-node node-api"><Braces size={26} /><span>API & Tools</span></div>
          <div className="map-node node-infra"><ServerCog size={26} /><span>Infra & Edge</span></div>
          <div className="map-core"><BrainCircuit size={34} /><strong>AI SYSTEM</strong><small>observe · decide · act</small></div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-heading">
          <p className="section-kicker">01 / EXPERIENCE</p>
          <h2>현장에서 시스템을<br />운영하며 쌓은 경험</h2>
          <p>회사와 연구 환경에서 장치, 데이터, AI 추론, 백엔드가 연결되는 지점을 다뤘습니다.</p>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={item.company}>
              <span className="timeline-dot" />
              <p className="timeline-period">{item.period}</p>
              <div>
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
                <p className="timeline-summary">{item.summary}</p>
                <div className="chip-row">{item.points.map((point) => <span key={point}>{point}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt" id="projects">
        <div className="section-heading horizontal">
          <div><p className="section-kicker">02 / SELECTED SYSTEMS</p><h2>기술보다 문제와<br />운영 결과를 보여줍니다.</h2></div>
          <p>모델 연구보다는 AI가 실제 서비스와 업무 흐름 안에서 작동하도록 만드는 프로젝트에 집중합니다.</p>
        </div>
        <div className="project-grid">
          {projects.map(({ icon: Icon, ...project }) => (
            <article className="project-card" key={project.title}>
              <div className="project-icon"><Icon size={24} /></div>
              <p className="project-label">{project.label}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong className="project-result">{project.result}</strong>
              <div className="chip-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="focus">
        <div className="section-heading">
          <p className="section-kicker">03 / ENGINEERING FOCUS</p>
          <h2>관심은 넓게,<br />문제의식은 하나로</h2>
          <p>AI가 사람 대신 신뢰할 수 있는 방식으로 업무를 완수하도록 만드는 전체 시스템에 관심이 있습니다.</p>
        </div>
        <div className="focus-grid">
          {focusAreas.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span className="focus-number">0{index + 1}</span>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-kicker">04 / CONTACT</p>
        <h2>실제 문제를 해결하는<br />AI 시스템을 함께 만듭니다.</h2>
        <p>Backend · AI Systems · Automation</p>
        <div className="hero-actions center">
          <a className="primary-button" href="mailto:invako@naver.com"><Mail size={18} /> Contact</a>
          <a className="secondary-button light" href="https://github.com/thisNorm" target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
        </div>
      </section>

      <footer><span>© {new Date().getFullYear()} Hwang Gyubeom</span><span>Built with Next.js</span></footer>
    </main>
  );
}
