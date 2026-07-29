import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Box,
  BriefcaseBusiness,
  Database,
  Github,
  Home,
  Layers3,
  Mail,
  Network,
  PenLine,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "황규범 | Backend Engineer · AI Systems & Automation",
  description:
    "백엔드와 인프라 경험을 기반으로 AI 에이전트, 자동화 워크플로우, 엣지 시스템을 실제 서비스에 연결하는 엔지니어 황규범의 포트폴리오입니다.",
};

const experiences = [
  {
    period: "2026.06 — Present",
    company: "Infovally Korea",
    role: "Backend Engineer",
    description: [
      "스마트팜 현장의 장치 연결과 엣지 서버 운영",
      "Node.js 기반 데이터 수집·전송 백엔드 개발",
      "Linux · Docker · Network 환경 표준화",
    ],
    stack: ["Node.js", "TypeScript", "Docker"],
  },
  {
    period: "2026.01 — 2026.02",
    company: "ETRI Autonomous IoT Lab",
    role: "Research Trainee",
    description: [
      "폐쇄망 영상 AI 관제 시스템 개발",
      "YOLOv8 추론 결과 실시간 처리",
      "Redis 기반 비동기 데이터 파이프라인 구현",
    ],
    stack: ["Python", "YOLOv8", "Redis"],
  },
];

const projects = [
  {
    type: "AI / ON-DEVICE",
    title: "DeepVoice Shield",
    description: "실시간 딥보이스 탐지 모델을 모바일 환경에 맞게 경량화하고 서비스 파이프라인에 연결했습니다.",
    result: "약 91% 모델 경량화",
    stack: ["ONNX", "TFLite", "FastAPI"],
    icon: ShieldCheck,
  },
  {
    type: "AI AUTOMATION",
    title: "Content Agent",
    description: "콘텐츠 조사·생성·검수·배포 단계를 에이전트와 워크플로우로 구성했습니다.",
    result: "End-to-end workflow",
    stack: ["Agent", "RAG", "Evaluation"],
    icon: Workflow,
  },
  {
    type: "AI MONITORING",
    title: "AegisView · Lab Guardian",
    description: "폐쇄망 영상 AI 환경에서 추론 결과를 수집하고 관제 화면까지 전달하는 시스템입니다.",
    result: "Real-time pipeline",
    stack: ["YOLOv8", "Redis", "WebSocket"],
    icon: Network,
  },
];

const metrics = [
  { value: "2+", label: "년 개발 경험", note: "Backend · AI Systems" },
  { value: "4", label: "주요 시스템", note: "운영·자동화 중심" },
  { value: "91%↓", label: "모델 경량화", note: "DeepVoice Shield" },
  { value: "Edge", label: "현장 시스템", note: "Linux · Docker · Device" },
  { value: "Agent", label: "자동화 관심", note: "Workflow · RAG · Tools" },
  { value: "∞", label: "학습과 개선", note: "Build · Measure · Iterate" },
];

const skills = [
  ["Languages", ["TypeScript", "Python", "JavaScript"]],
  ["Backend", ["Node.js", "NestJS", "FastAPI", "REST API"]],
  ["Data & Realtime", ["Redis", "PostgreSQL", "SQLite", "WebSocket", "MQTT"]],
  ["Infra & Edge", ["Linux", "Docker", "Network", "Device Integration"]],
  ["AI Systems", ["ONNX", "TFLite", "YOLOv8", "RAG", "Agent Workflow"]],
] as const;

const principles = [
  { title: "문제 중심 설계", text: "기술보다 먼저 제약과 실패 조건을 정의합니다.", icon: Sparkles },
  { title: "단순하고 견고하게", text: "명확한 구조와 예측 가능한 흐름을 만듭니다.", icon: Layers3 },
  { title: "데이터로 개선", text: "측정 가능한 결과를 기준으로 반복 개선합니다.", icon: Database },
  { title: "협업과 기록", text: "문서와 투명한 커뮤니케이션으로 맥락을 남깁니다.", icon: PenLine },
];

export default function HomePage() {
  return (
    <main className="portfolio-shell">
      <aside className="sidebar">
        <a href="#home" className="side-logo">thisnorm<span>.</span></a>
        <nav className="side-nav" aria-label="주요 메뉴">
          <a className="active" href="#home"><Home size={17} />Home</a>
          <a href="#experience"><BriefcaseBusiness size={17} />Experience</a>
          <a href="#projects"><Box size={17} />Projects</a>
          <a href="#automation"><Workflow size={17} />Automation</a>
          <a href="#skills"><Layers3 size={17} />Tech Stack</a>
          <a href="#writing"><PenLine size={17} />Writing</a>
          <a href="#about"><Sparkles size={17} />About</a>
        </nav>
        <div className="side-bottom">
          <a className="contact-link" href="mailto:invako@naver.com"><Mail size={16} />Let&apos;s Connect</a>
          <div className="social-row">
            <a href="https://github.com/thisNorm" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          </div>
          <p>© {new Date().getFullYear()} thisnorm.<br />All rights reserved.</p>
        </div>
      </aside>

      <div className="page-content">
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="hero-kicker"><span />Backend Engineer · AI Systems & Automation</p>
            <h1>AI가 실제 업무를 수행하도록,<br /><em>시스템과 자동화</em>를 설계합니다.</h1>
            <p className="hero-text">백엔드와 인프라 경험을 기반으로 에이전트, 워크플로우, 데이터와 도구를 연결합니다.<br />복잡한 현장부터 비즈니스 가치까지, 끝까지 책임지는 엔지니어입니다.</p>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">주요 프로젝트 보기 <ArrowRight size={17} /></a>
              <a className="button ghost" href="mailto:invako@naver.com">이력서 요청 <ArrowRight size={17} /></a>
            </div>
          </div>

          <div className="hero-visual" aria-label="AI 시스템 레이어 구조">
            <div className="system-stage">
              <div className="layer layer-top"><Bot size={31} /><b>AI</b></div>
              <div className="layer layer-mid"><Workflow size={28} /></div>
              <div className="layer layer-bottom"><Database size={27} /></div>
              <div className="connector c1" /><div className="connector c2" /><div className="connector c3" />
            </div>
            <div className="visual-label label-agent"><Bot size={19} /><div><b>Agent</b><span>Plan · Action · Tools</span></div></div>
            <div className="visual-label label-workflow"><Workflow size={19} /><div><b>Workflow</b><span>Orchestrate · Automate</span></div></div>
            <div className="visual-label label-data"><Database size={19} /><div><b>Data & API</b><span>Stream · Store · Serve</span></div></div>
            <div className="visual-label label-infra"><ServerCog size={19} /><div><b>Infra & Edge</b><span>Cloud · Edge · Monitor</span></div></div>
          </div>

          <div className="metric-panel">
            {metrics.map((metric) => (
              <div className="metric-item" key={metric.label}>
                <strong>{metric.value}</strong>
                <b>{metric.label}</b>
                <span>{metric.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section" id="experience">
          <div className="content-grid top-grid">
            <section className="panel experience-panel">
              <div className="panel-heading"><h2>Experience<span>.</span></h2><a href="#about">전체 경력 보기 <ArrowRight size={15} /></a></div>
              <div className="timeline-list">
                {experiences.map((item) => (
                  <article className="experience-item" key={item.company}>
                    <div className="timeline-mark"><span /></div>
                    <div className="experience-content">
                      <div className="experience-top"><div><h3>{item.company}</h3><p>{item.role}</p></div><time>{item.period}</time></div>
                      <ul>{item.description.map((line) => <li key={line}>{line}</li>)}</ul>
                      <div className="tags">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel project-panel" id="projects">
              <div className="panel-heading"><h2>Featured Projects<span>.</span></h2><a href="https://github.com/thisNorm" target="_blank" rel="noreferrer">모든 프로젝트 보기 <ArrowRight size={15} /></a></div>
              <div className="featured-list">
                {projects.map(({ icon: Icon, ...project }) => (
                  <article className="featured-card" key={project.title}>
                    <div className="featured-thumb"><Icon size={31} /></div>
                    <div className="featured-copy"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><b>{project.result}</b><div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                    <ArrowRight className="card-arrow" size={18} />
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="content-grid bottom-grid">
            <section className="panel skill-panel" id="skills">
              <div className="panel-heading"><h2>Tech Stack<span>.</span></h2></div>
              <div className="skill-list">
                {skills.map(([label, items]) => <div className="skill-row" key={label}><strong>{label}</strong><div className="tags">{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
              </div>
            </section>
            <section className="panel principle-panel" id="automation">
              <div className="panel-heading"><h2>Engineering Principles<span>.</span></h2></div>
              <div className="principle-grid">
                {principles.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} /><div><h3>{title}</h3><p>{text}</p></div></article>)}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
