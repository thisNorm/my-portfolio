"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import ProjectCover from "./ProjectCover";
import { HeroScene, useProjectMotion } from "./PortfolioMotion";
import ThemeToggle from "./ThemeToggle";
import VisitorCount from "./VisitorCount";
import {
  activities, additionalProjects, awards, contact, education, featuredProjects, homeCopy, jobs, projects, skills, tools,
  type Project, type ProjectFilter,
} from "./portfolioData";

const filters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "automation", label: "자동화" },
  { value: "ai", label: "AI 적용" },
  { value: "service", label: "서비스" },
];

export default function PortfolioHome() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [toolIndex, setToolIndex] = useState(() => Math.max(0, tools.findIndex((tool) => tool.name === "OnlyDM")));
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const galleryRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const previousHashRef = useRef("#work");
  const dialogHashRef = useRef("");
  const mountedRef = useRef(false);
  const tool = tools[toolIndex];
  const visibleCount = featuredProjects.filter((project) => filter === "all" || project.filter === filter).length;

  useProjectMotion(galleryRef);

  const openProject = useCallback((project: Project, trigger: HTMLElement | null) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      const hash = window.location.hash;
      previousHashRef.current = hash.endsWith("-details") ? "#work" : hash || "#work";
      lastTriggerRef.current = trigger;
    }
    dialogHashRef.current = `#${project.id}-details`;
    setActiveProject(project);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${dialogHashRef.current}`);
  }, []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!activeProject || !dialog) return;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("is-modal-open");
  }, [activeProject]);

  const closeProject = useCallback(() => {
    if (!mountedRef.current || dialogRef.current?.open) return;
    document.body.classList.remove("is-modal-open");
    const restoreLocation = window.location.hash === dialogHashRef.current;
    if (restoreLocation) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${previousHashRef.current}`);
    }
    dialogHashRef.current = "";
    setActiveProject(null);
    if (restoreLocation) {
      const trigger = lastTriggerRef.current;
      if (trigger?.isConnected && !trigger.closest("[hidden]")) {
        trigger.focus({ preventScroll: true });
      } else {
        galleryRef.current?.querySelector<HTMLAnchorElement>(".project-tile:not([hidden]) .project-open")?.focus({ preventScroll: true });
      }
    }
    lastTriggerRef.current = null;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const dialog = dialogRef.current;
    let scrollFrame: number | undefined;
    const syncHash = () => {
      if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
      const hash = window.location.hash;
      const project = projects.find((item) => hash === `#${item.id}-details`);
      if (project) {
        if (!dialog?.open || dialogHashRef.current !== hash) {
          openProject(project, galleryRef.current?.querySelector<HTMLAnchorElement>(`[data-open="${project.id}"]`) ?? null);
        }
        return;
      }
      if (dialog?.open) dialog.close();
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      const target = id ? document.getElementById(id) : null;
      let details = target?.closest("details");
      let opened = false;
      while (details) {
        if (!details.open) {
          details.open = true;
          opened = true;
        }
        details = details.parentElement?.closest("details") ?? null;
      }
      if (opened) scrollFrame = window.requestAnimationFrame(() => target?.scrollIntoView());
    };
    const initialFrame = window.requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    return () => {
      mountedRef.current = false;
      window.removeEventListener("hashchange", syncHash);
      window.cancelAnimationFrame(initialFrame);
      if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
      document.body.classList.remove("is-modal-open");
      if (dialog?.open) dialog.close();
    };
  }, [openProject]);

  const handleProjectClick = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProject(project, event.currentTarget);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
  };

  return (
    <>
      <a className="skip" href="#work">만든 것들로 건너뛰기</a>
      <div className="shell">
        <header className="masthead">
          <a className="wordmark" href="#top" aria-label="thisnorm 처음으로">thisnorm<span>.</span></a>
          <div className="masthead-actions">
            <nav aria-label="주 메뉴"><a href="#work">만든 것들</a><a href="#about">소개</a><a href="#contact">연락</a></nav>
            <ThemeToggle />
          </div>
        </header>
        <main id="top">
          <section className="hero preview-section" data-chapter="intro" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="identity">{homeCopy.identity}</p>
              <h1 id="hero-title"><span className="hero-lead">{homeCopy.lead}</span><br /><span className="hero-outcome">{homeCopy.outcome}</span></h1>
              <p className="hero-description">{homeCopy.description.map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</p>
              <a className="hero-action" href="#work">{homeCopy.action} <span aria-hidden="true">↘</span></a>
            </div>
            <HeroScene />
          </section>
          <section className="work-section preview-section" id="projects" data-chapter="work" aria-labelledby="work-title">
            <span id="work" aria-hidden="true" />
            <header className="work-heading">
              <div><p className="eyebrow">{homeCopy.workEyebrow}</p><h2 id="work-title">{homeCopy.workTitle}</h2></div>
              <p className="work-hint">{homeCopy.workHint.split(" ").slice(0, 2).join(" ")}<br />{homeCopy.workHint.split(" ").slice(2).join(" ")}</p>
            </header>
            <div className="work-nav">
              <nav aria-label="프로젝트 분야">{filters.map((item) => <button key={item.value} type="button" data-filter={item.value} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}</nav>
              <p id="project-count" aria-live="polite">{visibleCount}개의 작업</p>
            </div>
            <div className={`project-gallery${filter === "all" ? "" : " is-filtered"}`} id="project-gallery" ref={galleryRef}>
              {featuredProjects.map((project) => {
                const tileId = project.id === "harnessvault" ? "harness" : project.id === "aegisview" ? "aegis" : project.id;
                return (
                  <article className={`project-tile tile-${tileId}`} data-project={project.id} data-category={project.filter} hidden={filter !== "all" && project.filter !== filter} key={project.id}>
                    <a className="project-open" href={`#${project.id}-details`} data-open={project.id} aria-labelledby={`${tileId}-title`} aria-haspopup="dialog" onClick={(event) => handleProjectClick(event, project)}>
                      <ProjectCover project={project} />
                      <div className="tile-title"><div className="project-identity">{project.icon && <Image className="project-icon" src={project.icon} alt="" width={36} height={36} />}<h3 id={`${tileId}-title`}>{project.name}</h3></div></div>
                      <p className="tile-copy">{project.tagline}</p>
                      <p className="tile-meta" data-meta={project.id}>{[project.category, project.status, project.role].filter(Boolean).join(" · ")}</p>
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="gallery-footnote">{homeCopy.galleryNote}</p>
            <details className="additional-projects">
              <summary>더 살펴볼 작업 <span>{additionalProjects.length}</span></summary>
              <ul>{additionalProjects.map((project) => <li key={project.id}>
                <a className="additional-project-open" href={`#${project.id}-details`} aria-haspopup="dialog" onClick={(event) => handleProjectClick(event, project)}>
                  <span className="project-identity">{project.icon && <Image className="project-icon" src={project.icon} alt="" width={32} height={32} />}<strong>{project.name}</strong></span>
                  <span className="additional-project-summary">{project.tagline}</span>
                  <span className="additional-project-meta">{[project.category, project.status, project.role].filter(Boolean).join(" · ")}</span>
                </a>
              </li>)}</ul>
            </details>
          </section>
          <section className="tools-section preview-section" id="tools" data-chapter="profile">
            <div id="tools-root">
              <h2 className="tools-heading">작은 도구들</h2>
              <div className="tools-choices" role="group" aria-label="도구 선택">
                {tools.map((item, index) => <button className="tools-choice" type="button" id={`tool-choice-${index}`} data-tool-index={index} aria-pressed={toolIndex === index} aria-controls="tool-current" key={item.name} onClick={() => setToolIndex(index)}>{item.name}</button>)}
              </div>
              <div className="tools-current" id="tool-current" role="status" aria-atomic="true" aria-labelledby={`tool-choice-${toolIndex}`}>
                {tool && <>
                  <p>{tool.problem} {tool.state}</p>
                  {tool.github && <a className="tools-source" href={tool.github} target="_blank" rel="noreferrer" aria-label={`${tool.name} GitHub 저장소`}>GitHub <span aria-hidden="true">↗</span></a>}
                </>}
              </div>
              {tool?.image && <figure className="tools-preview">
                <a href={tool.image.src} target="_blank" rel="noreferrer" aria-label={`${tool.name} 제품 화면 원본 보기`}><Image src={tool.image.src} alt={tool.image.alt} width={tool.image.width} height={tool.image.height} sizes="(max-width: 780px) calc(100vw - 46px), 960px" /></a>
                <figcaption>{tool.image.caption}</figcaption>
              </figure>}
            </div>
          </section>
          <section className="profile-section preview-section" id="about" data-chapter="profile">
            <div id="profile-root">
              <div className="profile-overview">
                <div className="profile-intro">
                  <p className="profile-role">{homeCopy.profileRole}</p>
                  <h2 className="profile-name">{homeCopy.profileName}</h2>
                  <p className="profile-direction">{homeCopy.profileDirection}</p>
                  <p className="profile-aspiration">{homeCopy.profileAspiration}</p>
                </div>
                <div className="profile-experience">
                  <h3 className="profile-label">경력</h3>
                  {jobs.map((job) => <article className="profile-job" key={job.company}>
                    <h4>{job.company}</h4>
                    <div className="profile-job-meta"><span>{job.role}</span><span>{job.period}</span></div>
                    <p>{job.summary}</p>
                    {job.lines.length > 0 && <details className="profile-details"><summary>경력 상세</summary><ul className="profile-records">{job.lines.map((line) => <li key={line}>{line}</li>)}</ul></details>}
                  </article>)}
                </div>
              </div>
              <div className="profile-skills" id="skills">
                <h3 className="profile-label">기술</h3>
                <dl className="profile-skill-groups">{skills.map((skill) => <div key={skill.label}><dt>{skill.label}</dt><dd>{skill.items}</dd></div>)}</dl>
              </div>
              <div className="profile-background">
                <details className="profile-details" id="awards">
                  <summary>수상</summary>
                  <ul className="profile-records">
                    {awards.map((award) => <li key={`${award.date}-${award.org}`}>
                      <span className="profile-record-date">{award.date}</span><strong>{award.title}</strong><p>{award.org} · {award.note}</p>
                      {award.image && <a className="award-photo" href={award.image} target="_blank" rel="noreferrer" aria-label={`${award.title} · ${award.org} 수상 사진 원본 보기`}>
                        {award.imageWidth && award.imageHeight ? <Image src={award.image} alt={award.imageAlt ?? `${award.title} · ${award.org} 수상 사진`} width={award.imageWidth} height={award.imageHeight} sizes="(max-width: 480px) calc(100vw - 46px), (max-width: 780px) 45vw, 520px" style={{ width: "100%", height: "auto", objectFit: "contain" }} /> : "수상 사진 원본 보기 ↗"}
                      </a>}
                    </li>)}
                  </ul>
                </details>
                <details className="profile-details">
                  <summary>교육·자격</summary>
                  <ul className="profile-records">{education.map((item) => <li key={item.title}><strong>{item.title}</strong><p>{item.note}</p></li>)}</ul>
                </details>
                <details className="profile-details" id="activity">
                  <summary>활동</summary>
                  <ul className="profile-records">{activities.map((activity) => <li key={activity.name}>
                    <strong>{activity.href ? <a href={activity.href} target="_blank" rel="noreferrer">{activity.name}</a> : activity.name}</strong><p>{activity.why}</p><p>{activity.now}</p>
                  </li>)}</ul>
                </details>
              </div>
            </div>
          </section>
        </main>
        <footer className="contact-section preview-section" id="contact" data-chapter="profile">
          <div id="contact-root">
            <h2 className="contact-heading">Contact</h2>
            <div className="contact-content">
              <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
              <nav className="contact-links" aria-label="연락처 및 외부 링크">
                <a href={contact.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                <a href={contact.blog} target="_blank" rel="noreferrer">Blog <span aria-hidden="true">↗</span></a>
                <a href={contact.resume} target="_blank" rel="noreferrer">이력서 <span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <VisitorCount />
          </div>
        </footer>
      </div>
      <dialog id="project-dialog" ref={dialogRef} aria-labelledby="dialog-title" onClose={closeProject} onClick={handleBackdropClick}>
        <form method="dialog" className="dialog-close-form"><button type="submit" className="dialog-close" value="close" aria-label="프로젝트 상세 닫기">닫기 <span aria-hidden="true">×</span></button></form>
        <div id="dialog-content">{activeProject && <>
          <header className="dialog-heading">
            <p className="dialog-meta">{[activeProject.category, activeProject.status, activeProject.role].filter(Boolean).join(" · ")}</p>
            <div className="dialog-project-title">{activeProject.icon && <Image className="project-icon" src={activeProject.icon} alt="" width={44} height={44} />}<h2 id="dialog-title">{activeProject.name}</h2></div><p className="dialog-summary">{activeProject.summary}</p>
          </header>
          <div className={`dialog-media${activeProject.id === "deepvoice" ? " dialog-media-phones" : ""}`}>
            {activeProject.media?.length ? activeProject.media.map((media) => <figure className="dialog-original" key={media.src}>
              <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={activeProject.id === "deepvoice" ? "(max-width: 600px) 44vw, 380px" : "(max-width: 600px) calc(100vw - 64px), 800px"} />
              <figcaption>{media.caption} · <a href={media.src} target="_blank" rel="noreferrer">원본 크게 보기 ↗</a></figcaption>
            </figure>) : <ProjectCover project={activeProject} />}
          </div>
          <div className="dialog-details">
            <div><h3>시작한 이유</h3><p>{activeProject.problem}</p></div>
            <div><h3>구현과 참여</h3><p>{activeProject.solution}</p></div>
            <div><h3>확인한 범위</h3><p>{activeProject.evidence}</p></div>
            <div className="dialog-foot"><span>{activeProject.stack.join(" / ")}</span><div className="dialog-links">{activeProject.liveUrl && <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">서비스 열기 ↗</a>}{activeProject.github && <a href={activeProject.github} target="_blank" rel="noreferrer">소스 코드 보기 ↗</a>}</div></div>
          </div>
        </>}</div>
      </dialog>
    </>
  );
}
