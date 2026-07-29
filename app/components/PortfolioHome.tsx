"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Box,
  BriefcaseBusiness,
  Database,
  Eye,
  FileText,
  Github,
  Home,
  Layers3,
  Mail,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Experience = {
  start: string;
  end: string | "present";
  period: string;
  company: string;
  role: string;
  description: string[];
  stack: string[];
};

type Project = {
  type: string;
  title: string;
  description: string;
  result: string;
  motivation: string;
  challenge: string;
  lesson: string;
  stack: string[];
  origin?: string;
  achievement?: string;
  icon: typeof ShieldCheck;
};

const experiences: Experience[] = [
  {
    start: "2026-06",
    end: "present",
    period: "2026.06 — Present",
    company: "Infovally Korea",
    role: "Backend Engineer",
    description: [
      "스마트팜 엣지 서버와 데이터 파이프라인 아키텍처 설계·개발",
      "Redis와 프록시 모듈을 활용한 엣지–클라우드 데이터 유실 방지",
      "현장 네트워크·PC·디바이스 연동과 장애 진단",
    ],
    stack: ["Node.js", "TypeScript", "Docker"],
  },
  {
    start: "2026-01",
    end: "2026-02",
    period: "2026.01 — 2026.02",
    company: "ETRI Autonomous IoT Lab",
    role: "Research Trainee",
    description: [
      "CCTV와 이동형 로봇을 통합한 폐쇄망 AI 관제 시스템 설계",
      "Redis Queue·DLQ 기반 비동기 이벤트 처리와 장애 복구",
      "스트리밍·객체 탐지·원격 제어·이벤트 저장 파이프라인 통합",
    ],
    stack: ["Python", "YOLOv8", "Redis"],
  },
];

const projects: Project[] = [
  {
    type: "AI / ON-DEVICE",
    title: "DeepVoice Shield",
    description: "팀원들과 1년 동안 완성한 실시간 딥보이스 탐지 서비스입니다.",
    result: "약 91% 모델 경량화 · 다수 수상",
    motivation: "처음으로 장기간 팀과 함께 제품을 끝까지 완성한 프로젝트였습니다. 모델, 모바일, 서버를 하나의 서비스로 연결하는 전 과정을 경험하고 싶었습니다.",
    challenge: "실시간 음성 처리와 온디바이스 추론을 동시에 만족해야 했고, 제한된 모바일 자원 안에서 모델 크기와 속도를 줄이는 일이 핵심이었습니다.",
    lesson: "모델 정확도만큼 배포 환경의 지연, 메모리, 통신 구조가 중요하다는 점을 배웠습니다. 수상 성과보다 팀이 1년간 제품을 완주했다는 경험이 가장 크게 남았습니다.",
    stack: ["ONNX", "TFLite", "FastAPI", "Android"],
    origin: "메타버스 융합SW 교육",
    achievement: "1년 팀 프로젝트 · 다수 수상",
    icon: ShieldCheck,
  },
  {
    type: "PERSONAL AUTOMATION",
    title: "Content Agent",
    description: "노션 링크 하나로 썸네일부터 SNS 게시물까지 만드는 개인 콘텐츠 자동화입니다.",
    result: "Notion → 콘텐츠 변환 → 배포",
    motivation: "수업 내용을 노션에 정리한 뒤 SEO를 위해 다시 SNS용으로 작성하는 과정이 번거로워 꾸준히 하지 못했습니다. 당장 겪는 반복 작업을 자동화하고 싶었습니다.",
    challenge: "요약, 채널별 문체 변환, 썸네일 생성, 검수와 게시를 하나의 흐름으로 묶되 결과가 매번 지나치게 달라지지 않도록 만드는 일이 필요했습니다.",
    lesson: "B2B 제품보다 개인 생산성을 높이는 작은 서비스도 충분한 가치가 있었습니다. 향후에는 녹음 내용을 Clova 등으로 전사한 뒤 정리와 게시까지 이어지는 흐름으로 확장할 수 있다고 봤습니다.",
    stack: ["Agent", "RAG", "Notion", "Workflow"],
    origin: "AI를 활용한 CI/CD 자동화 교육",
    icon: Workflow,
  },
  {
    type: "VISION AI",
    title: "Lab Guardian",
    description: "ETRI에서 접한 영상·센서 소재로 만든 실시간 객체 관제 실험입니다.",
    result: "폐쇄망 실시간 관제 파이프라인",
    motivation: "연구실에서 접할 수 있는 카메라, 객체 탐지, 폐쇄망 환경을 한 시스템으로 연결해 보고 싶어 시작했습니다.",
    challenge: "객체가 겹치면 트래킹 번호가 바뀌고, 스트림 수가 늘어날수록 추론과 전송 자원이 급격히 증가했습니다.",
    lesson: "영상 AI는 모델 정확도만으로 끝나지 않습니다. ID 안정성, 스트림 수, GPU·CPU 사용량, 프레임 드롭과 관제 지연을 함께 설계해야 실제 운영이 가능하다는 점을 확인했습니다.",
    stack: ["YOLOv8", "Redis", "WebSocket", "Docker"],
    icon: Network,
  },
  {
    type: "AEO / GEO",
    title: "SiteOps Radar",
    description: "AI 검색 시대의 사이트 노출과 인용을 관찰하는 AEO·GEO 분석 실험입니다.",
    result: "검색 가시성 측정 워크플로우",
    motivation: "여러 사이트를 만들며 SEO의 중요성을 체감하던 중 AEO와 GEO라는 개념이 대두되어 실제 프로젝트에 녹여 보고 싶었습니다.",
    challenge: "플랫폼마다 답변과 인용이 달라지고, 같은 질문도 결과가 자주 바뀌어 일관된 평가 기준을 만들기 어려웠습니다.",
    lesson: "현재 AEO·GEO는 정답이 굳어진 분야라기보다 반복 측정과 실험이 필요한 초기 개념에 가깝다고 느꼈습니다. 단발성 최적화보다 질문 세트와 변화를 계속 추적하는 체계가 중요했습니다.",
    stack: ["AEO", "GEO", "Analytics", "Automation"],
    icon: Sparkles,
  },
  {
    type: "GRAPHQL / DATA",
    title: "Combat Power Analyzer",
    description: "여러 테이블의 필요한 정보만 조합해 조회하는 GraphQL 기반 분석 프로젝트입니다.",
    result: "필요 데이터 중심의 유연한 조회",
    motivation: "실무에서 MQTT, HTTP, REST API, MCP 등 다양한 프로토콜을 다루던 중 GraphQL 도입이 늘어난다는 이야기를 듣고 직접 장단점을 확인하고 싶었습니다.",
    challenge: "스키마를 잘못 설계하면 클라이언트는 편해져도 서버 쿼리 비용과 권한 관리가 복잡해질 수 있었습니다.",
    lesson: "상황에 맞게 사용하면 여러 테이블에서 필요한 필드만 가져오기에 유용했습니다. 모든 API를 대체하기보다 복잡한 조회 요구가 잦은 화면과 분석 도메인에 선택적으로 적용하는 편이 적합했습니다.",
    stack: ["GraphQL", "API", "Database", "Analytics"],
    icon: Database,
  },
  {
    type: "MULTI-AGENT",
    title: "AgentOffice",
    description: "여러 AI 에이전트를 역할별 팀으로 구성해 실제 업무를 수행시키는 실험입니다.",
    result: "Role-based multi-agent workflow",
    motivation: "멀티에이전트를 팀처럼 구성해 실무와 사이드 프로젝트에 활용하는 사례가 주목받아 실제로 어느 수준까지 가능한지 확인하고 싶었습니다.",
    challenge: "에이전트 수가 늘수록 비용과 대화량이 커지고, 낮은 성능의 모델에서는 역할 분담과 기억 유지가 쉽게 무너졌습니다.",
    lesson: "충분한 모델 성능과 예산이 있다면 결과가 좋아질 수 있지만, 개인 환경에서는 좋은 로컬 LLM과 장기 기억 구조를 꾸준히 키우는 방식이 현실적이었습니다. Obsidian이나 NotebookLM처럼 지식을 축적하면 사이드잡을 돕는 개인 팀으로 발전할 가능성을 봤습니다.",
    stack: ["Multi-agent", "Memory", "Tools", "Local LLM"],
    icon: Bot,
  },
  {
    type: "AIR-GAPPED DEVOPS",
    title: "Air-gapped AutoCI",
    description: "클라우드 AI를 쓸 수 없는 폐쇄망에서도 CI/CD 자동화를 시도한 프로젝트입니다.",
    result: "Sandbox → Smoke test → GitLab Runner",
    motivation: "AI 기반 CI/CD 자동화를 배운 뒤, 정작 ETRI 같은 폐쇄망에서는 클라우드 AI를 사용할 수 없어 기존 방식이 무의미하다는 문제에서 출발했습니다.",
    challenge: "로컬 LLM, GitLab, Docker가 허용되어야 했고 Gemma 계열 모델은 YAML을 안정적으로 생성하지 못했습니다. 네트워크가 제한된 Docker 샌드박스에서 생성 결과를 검증하는 과정도 복잡했습니다.",
    lesson: "여러 YAML 예제를 활용한 미세조정이나 더 강한 로컬 모델이 필요했습니다. 생성 결과를 바로 적용하지 않고 격리 환경에서 실행한 뒤 smoke test를 통과한 경우에만 Runner로 넘기는 안전장치가 핵심이었습니다.",
    stack: ["Local LLM", "GitLab CI", "Docker", "Sandbox"],
    origin: "AI를 활용한 CI/CD 자동화 교육",
    icon: ServerCog,
  },
  {
    type: "COMPUTER VISION",
    title: "Glare Removal",
    description: "반사광이 강한 영상에서 시인성을 높이기 위한 제거·복원 실험입니다.",
    result: "한계를 확인한 탐색 프로젝트",
    motivation: "현장 영상에서 반사광이 객체 인식과 관찰을 방해하는 문제를 해결할 수 있는지 궁금했습니다.",
    challenge: "광원, 재질, 카메라 각도에 따라 반사가 달라 일관된 제거가 어려웠고, 제거 과정에서 원본 정보까지 손상되는 문제가 있었습니다.",
    lesson: "범용 후처리만으로 해결하기 어렵다는 결론에 가까웠습니다. 데이터 수집 조건과 편광 필터 같은 하드웨어, 목적에 맞는 학습 데이터까지 함께 고려해야 하는 문제였습니다.",
    stack: ["OpenCV", "Image Processing", "Vision AI"],
    origin: "OpenCV Zoo 기반 머신러닝·딥러닝 영상분석 교육",
    achievement: "교육 연계 프로젝트 수상",
    icon: Eye,
  },
];

const appliedLearning = [
  {
    title: "메타버스 융합SW 교육",
    status: "수료",
    description: "음성 AI, 모바일, 백엔드를 연결하는 장기 팀 프로젝트로 확장했습니다.",
    projects: ["DeepVoice Shield"],
    outcome: "1년 팀 프로젝트 · 다수 수상",
  },
  {
    title: "ESG 일경험 교육",
    status: "수료",
    description: "업무 환경과 사회적 가치 관점에서 문제를 정의하고 협업하는 경험을 쌓았습니다.",
    projects: [],
    outcome: "실무형 협업 경험",
  },
  {
    title: "OpenCV Zoo 기반 머신러닝·딥러닝 영상분석 교육",
    status: "수료",
    description: "영상 전처리와 모델 활용을 학습한 뒤 반사광 제거 문제를 직접 실험했습니다.",
    projects: ["Glare Removal"],
    outcome: "교육 연계 프로젝트 수상",
  },
  {
    title: "AI를 활용한 CI/CD 자동화 교육",
    status: "수료",
    description: "배운 자동화 사례를 개인 생산성과 폐쇄망 DevOps 문제에 각각 적용했습니다.",
    projects: ["Content Agent", "Air-gapped AutoCI"],
    outcome: "개인 자동화 · 폐쇄망 자동화",
  },
];

const awards = [
  { title: "총장상", organization: "홍익대학교", date: "2026.01", note: "교내외 기술 성과를 통한 학교 명예 기여" },
  { title: "대상", organization: "디지털 바이오헬스 종합설계 경진대회", date: "2025.12", note: "DeepVoice Shield" },
  { title: "대상", organization: "충청권 ICT 이노베이션스퀘어 S/W 개발 분과", date: "2025.11", note: "DeepVoice Shield" },
  { title: "우수상", organization: "지역혁신 인재양성 연합 페스티벌", date: "2025.11", note: "DeepVoice Shield" },
  { title: "최우수상", organization: "OpenCV Zoo 영상분석 실무 프로젝트", date: "2025.09", note: "Glare Removal" },
];

const skills = [
  ["Languages", ["TypeScript", "Python", "JavaScript"]],
  ["Backend", ["Node.js", "NestJS", "FastAPI", "REST API"]],
  ["Data & Realtime", ["Redis", "PostgreSQL", "SQLite", "WebSocket", "MQTT"]],
  ["Infra & Edge", ["Linux", "Docker", "Network", "Device Integration"]],
  ["AI Systems", ["ONNX", "TFLite", "YOLOv8", "RAG", "Agent Workflow"]],
] as const;

const principles = [
  { title: "문제 중심 설계", text: "유행한 기술을 그대로 좇기보다 실제 문제에 적용해 한계까지 확인합니다.", icon: Sparkles },
  { title: "작게 만들고 검증", text: "실험 가능한 크기로 구현하고 운영 조건에서 직접 확인합니다.", icon: Layers3 },
  { title: "실패도 결과로 기록", text: "잘되지 않은 이유와 다음 검증 가설까지 프로젝트의 결과로 남깁니다.", icon: Database },
  { title: "자동화에는 안전장치", text: "권한, 격리, 승인, 테스트를 통과한 작업만 실제 환경에 적용합니다.", icon: ShieldCheck },
];

function monthIndex(value: string) {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month;
}

function calculateExperienceYears(items: Experience[], now = new Date()) {
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const months = items.reduce((sum, item) => {
    const end = item.end === "present" ? currentMonth : item.end;
    const inclusiveOffset = item.end === "present" ? 0 : 1;
    return sum + Math.max(0, monthIndex(end) - monthIndex(item.start) + inclusiveOffset);
  }, 0);
  return (months / 10).toFixed(1);
}

export default function PortfolioHome() {
  const [projectPage, setProjectPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visitors, setVisitors] = useState({ total: 0, today: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const experienceYears = useMemo(() => calculateExperienceYears(experiences), []);
  const pageSize = 3;
  const pageCount = Math.ceil(projects.length / pageSize);
  const visibleProjects = projects.slice(projectPage * pageSize, projectPage * pageSize + pageSize);

  useEffect(() => {
    const key = `portfolio-visit-${new Date().toISOString().slice(0, 10)}`;
    const method = sessionStorage.getItem(key) ? "GET" : "POST";
    fetch("/api/visit", { method })
      .then((response) => response.json())
      .then((data: { total?: number; today?: number }) => {
        setVisitors({ total: data.total ?? 0, today: data.today ?? 0 });
        if (method === "POST") sessionStorage.setItem(key, "1");
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProject(null);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    const sectionIds = ["home", "experience", "projects", "learning", "skills"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const metrics = [
    { value: experienceYears, label: "년 개발 경험", note: "ETRI · Infovally Korea" },
    { value: String(projects.length), label: "프로젝트", note: "직접 만들고 검증한 결과" },
    { value: "91%↓", label: "모델 경량화", note: "DeepVoice Shield" },
    { value: "5", label: "수상 경력", note: "프로젝트 외부 평가" },
  ];

  return (
    <main className="portfolio-shell">
      <aside className="sidebar">
        <a href="#home" className="side-logo">thisnorm<span>.</span></a>
        <nav className="side-nav" aria-label="주요 메뉴">
          <a className={activeSection === "home" ? "active" : ""} href="#home"><Home size={17} />Home</a>
          <a className={activeSection === "experience" ? "active" : ""} href="#experience"><BriefcaseBusiness size={17} />Experience</a>
          <a className={activeSection === "projects" ? "active" : ""} href="#projects"><Box size={17} />Projects</a>
          <a className={activeSection === "learning" ? "active" : ""} href="#learning"><FileText size={17} />Education</a>
          <a className={activeSection === "skills" ? "active" : ""} href="#skills"><Layers3 size={17} />Skills</a>
        </nav>
        <div className="side-bottom">
          <a className="contact-link" href="mailto:invako@naver.com"><Mail size={16} />Contact</a>
          <div className="social-row"><a href="https://github.com/thisNorm" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></div>
          <p>© {new Date().getFullYear()} thisnorm.<br />All rights reserved.</p>
        </div>
      </aside>

      <div className="page-content">
        <section className="hero-section" id="home">
          <div className="visitor-counter" aria-label="방문자 통계">
            <Users size={17} />
            <div><span>오늘 <strong>{visitors.today.toLocaleString()}</strong></span><span>전체 <strong>{visitors.total.toLocaleString()}</strong></span></div>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker"><span />Backend Engineer · AI Systems & Automation</p>
            <h1>AI가 실제 업무를 수행하도록,<br /><span className="headline-line"><em>시스템과 자동화</em>를 설계합니다.</span></h1>
            <p className="hero-text">백엔드와 인프라 경험을 기반으로 에이전트, 워크플로우, 데이터와 도구를 연결합니다.<br />유행하는 핵심 기술을 직접 구현하고, 가능성과 한계를 운영 관점에서 기록합니다.</p>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">주요 프로젝트 보기 <ArrowRight size={17} /></a>
              <a className="button ghost" href="/resume.pdf" target="_blank" rel="noreferrer"><FileText size={16} />이력서 보기</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="AI 시스템 레이어 구조">
            <div className="system-stage"><div className="layer layer-top"><Bot size={31} /><b>AI</b></div><div className="layer layer-mid"><Workflow size={28} /></div><div className="layer layer-bottom"><Database size={27} /></div><div className="connector c1" /><div className="connector c2" /><div className="connector c3" /></div>
            <div className="visual-label label-agent"><Bot size={19} /><div><b>Agent</b><span>판단 · 도구 실행</span></div></div>
            <div className="visual-label label-workflow"><Workflow size={19} /><div><b>Workflow</b><span>순서 · 재시도 · 승인</span></div></div>
            <div className="visual-label label-data"><Database size={19} /><div><b>Data & API</b><span>수집 · 저장 · 전달</span></div></div>
            <div className="visual-label label-infra"><ServerCog size={19} /><div><b>Infra & Edge</b><span>배포 · 운영 · 관제</span></div></div>
          </div>

          <div className="metric-panel">{metrics.map((metric) => <div className="metric-item" key={metric.label}><strong>{metric.value}</strong><b>{metric.label}</b><span>{metric.note}</span></div>)}</div>
        </section>

        <section className="content-section" id="experience">
          <div className="content-grid top-grid">
            <section className="panel experience-panel">
              <div className="panel-heading"><h2>Experience<span>.</span></h2></div>
              <div className="timeline-list">{experiences.map((item) => <article className="experience-item" key={item.company}><div className="timeline-mark"><span /></div><div className="experience-content"><div className="experience-top"><div><h3>{item.company}</h3><p>{item.role}</p></div><time>{item.period}</time></div><ul>{item.description.map((line) => <li key={line}>{line}</li>)}</ul><div className="tags">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
            </section>

            <section className="panel project-panel" id="projects">
              <div className="panel-heading"><div><h2>Featured Projects<span>.</span></h2><p className="panel-subtitle">관심에서 시작해 직접 구현하며 확인한 가능성과 한계</p></div><a href="https://github.com/thisNorm" target="_blank" rel="noreferrer">GitHub <ArrowRight size={15} /></a></div>
              <div className="featured-list">{visibleProjects.map(({ icon: Icon, ...project }) => <button type="button" className="featured-card" key={project.title} onClick={() => setSelectedProject({ ...project, icon: Icon })}><div className="featured-thumb"><Icon size={31} /></div><div className="featured-copy"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><b>{project.result}</b><div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ArrowRight className="card-arrow" size={18} /></button>)}</div>
              <div className="project-pagination"><button type="button" aria-label="이전 프로젝트" onClick={() => setProjectPage((page) => Math.max(0, page - 1))} disabled={projectPage === 0}><ArrowLeft size={16} /></button><div>{Array.from({ length: pageCount }, (_, index) => <button type="button" aria-label={`${index + 1} 페이지`} className={index === projectPage ? "active" : ""} onClick={() => setProjectPage(index)} key={index}>{index + 1}</button>)}</div><button type="button" aria-label="다음 프로젝트" onClick={() => setProjectPage((page) => Math.min(pageCount - 1, page + 1))} disabled={projectPage === pageCount - 1}><ArrowRight size={16} /></button></div>
            </section>
          </div>

          <div className="content-grid bottom-grid" id="skills">
            <section className="panel skill-panel"><div className="panel-heading"><h2>Tech Stack<span>.</span></h2></div><div className="skill-list">{skills.map(([label, items]) => <div className="skill-row" key={label}><strong>{label}</strong><div className="tags">{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></section>
            <section className="panel principle-panel"><div className="panel-heading"><h2>Working Style<span>.</span></h2></div><div className="principle-grid">{principles.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
          </div>

          <section className="panel learning-panel" id="learning">
            <div className="panel-heading">
              <div>
                <h2>Education & Practice<span>.</span></h2>
                <p className="panel-subtitle">교육에서 배운 내용을 프로젝트로 이어간 기록</p>
              </div>
            </div>
            <div className="learning-grid">
              {appliedLearning.map((item) => (
                <article key={item.title}>
                  <div className="learning-top"><span>{item.status}</span><strong>{item.outcome}</strong></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.projects.length > 0 && <div className="tags">{item.projects.map((project) => <span key={project}>{project}</span>)}</div>}
                </article>
              ))}
            </div>
          </section>

          <section className="panel awards-panel" aria-labelledby="awards-heading">
            <div className="panel-heading">
              <div>
                <h2 id="awards-heading">Honors & Awards<span>.</span></h2>
                <p className="panel-subtitle">프로젝트 결과를 외부 평가로 검증받은 기록</p>
              </div>
            </div>
            <div className="awards-list">
              {awards.map((award) => (
                <article key={`${award.title}-${award.date}`}>
                  <div><strong>{award.title}</strong><h3>{award.organization}</h3><p>{award.note}</p></div>
                  <time>{award.date}</time>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>

      {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button className="modal-close" type="button" aria-label="닫기" onClick={() => setSelectedProject(null)}><X size={20} /></button><p className="project-type">{selectedProject.type}</p><h2 id="project-modal-title">{selectedProject.title}</h2><p className="modal-lead">{selectedProject.description}</p>{(selectedProject.origin || selectedProject.achievement) && <div className="project-proof">{selectedProject.origin && <span>연계 교육 · {selectedProject.origin}</span>}{selectedProject.achievement && <strong>{selectedProject.achievement}</strong>}</div>}<div className="modal-insights"><article><span>시작</span><h3>왜 만들었나</h3><p>{selectedProject.motivation}</p></article><article><span>과정</span><h3>어디서 어려웠나</h3><p>{selectedProject.challenge}</p></article><article><span>회고</span><h3>무엇을 배웠나</h3><p>{selectedProject.lesson}</p></article></div><div className="modal-footer"><strong>{selectedProject.result}</strong><div className="tags">{selectedProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div></section></div>}
    </main>
  );
}
