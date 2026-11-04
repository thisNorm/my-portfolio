"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Box,
  BriefcaseBusiness,
  Database,
  FileText,
  ExternalLink,
  Home,
  Layers3,
  Mail,
  Menu,
  ServerCog,
  Users,
  Workflow,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import {
  appliedLearning,
  awards,
  calculateExperienceYears,
  experiences,
  principles,
  projects,
  skills,
  type Project,
} from "./portfolioData";

export default function PortfolioHome() {
  const [projectPage, setProjectPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visitors, setVisitors] = useState({ total: 0, today: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const experienceYears = useMemo(() => calculateExperienceYears(experiences), []);
  const pageSize = 3;
  const pageCount = Math.ceil(projects.length / pageSize);
  const visibleProjects = projects.slice(projectPage * pageSize, projectPage * pageSize + pageSize);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    window.setTimeout(() => projectTriggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    // KST date, matching the server's daily reset in app/api/visit/route.ts.
    const kstDate = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const key = `portfolio-visit-${kstDate}`;
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
    const dialog = modalCloseRef.current?.closest<HTMLElement>('[role="dialog"]');
    modalCloseRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProject();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [closeProject, selectedProject]);

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
    { value: "E2E", label: "구현 범위", note: "Device → Edge → Service" },
    { value: "Edge", label: "현장·폐쇄망 운영", note: "Linux · Docker · Network" },
    { value: "5", label: "수상 경력", note: "프로젝트 외부 평가" },
  ];

  return (
    <main className="portfolio-shell">
      <aside className="sidebar" aria-hidden={selectedProject ? true : undefined} inert={selectedProject ? true : undefined}>
        <a href="#home" className="side-logo">thisnorm<span>.</span></a>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-label={mobileNavOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileNavOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav id="primary-navigation" className={`side-nav ${mobileNavOpen ? "mobile-open" : ""}`} aria-label="주요 메뉴">
          <a className={activeSection === "home" ? "active" : ""} href="#home" onClick={() => setMobileNavOpen(false)}><Home size={17} />Home</a>
          <a className={activeSection === "experience" ? "active" : ""} href="#experience" onClick={() => setMobileNavOpen(false)}><BriefcaseBusiness size={17} />Experience</a>
          <a className={activeSection === "projects" ? "active" : ""} href="#projects" onClick={() => setMobileNavOpen(false)}><Box size={17} />Projects</a>
          <a className={activeSection === "learning" ? "active" : ""} href="#learning" onClick={() => setMobileNavOpen(false)}><FileText size={17} />Education</a>
          <a className={activeSection === "skills" ? "active" : ""} href="#skills" onClick={() => setMobileNavOpen(false)}><Layers3 size={17} />Skills</a>
        </nav>
        <div className="side-bottom">
          <a className="contact-link" href="mailto:invako@naver.com"><Mail size={16} />Contact</a>
          <div className="social-row"><a href="https://github.com/thisNorm" target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink size={17} /></a></div>
          <p>© {new Date().getFullYear()} thisnorm.<br />All rights reserved.</p>
        </div>
      </aside>

      <div className="page-content" aria-hidden={selectedProject ? true : undefined} inert={selectedProject ? true : undefined}>
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
              <div className="featured-list">
                {visibleProjects.map((project) => (
                  <button
                    type="button"
                    className="featured-card"
                    key={project.title}
                    onClick={(event) => {
                      projectTriggerRef.current = event.currentTarget;
                      setSelectedProject(project);
                    }}
                  >
                    <div className={`featured-thumb ${project.thumbnailFit === "contain" ? "contain" : ""}`}>
                      {project.thumbnail ? (
                        <Image src={project.thumbnail} alt={`${project.title} 프로젝트 화면`} fill sizes="150px" />
                      ) : (
                        <project.icon size={31} />
                      )}
                    </div>
                    <div className="featured-copy">
                      <span className="project-type">{project.type}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <b>{project.result}</b>
                      <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                    <ArrowRight className="card-arrow" size={18} />
                  </button>
                ))}
              </div>
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

      {selectedProject && (
        <ProjectModal project={selectedProject} closeRef={modalCloseRef} onClose={closeProject} />
      )}
    </main>
  );
}
