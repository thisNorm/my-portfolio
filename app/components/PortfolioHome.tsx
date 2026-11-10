"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import ProjectCover from "./ProjectCover";
import { HeroScene, useProjectMotion } from "./PortfolioMotion";
import ThemeToggle from "./ThemeToggle";
import VisitorCount from "./VisitorCount";
import {
  activities, additionalProjects, aiWorkflow, awards, contact, education, featuredGroups, featuredProjects, homeCopy, jobs, projects, skills, tools,
  type Project, type ProjectFilter,
} from "./portfolioData";

const filters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "automation", label: "자동화" },
  { value: "ai", label: "AI 적용" },
  { value: "service", label: "서비스" },
];

type PortfolioHomeProps = {
  archiveLinks: { href: string; title: string }[];
};

export default function PortfolioHome({ archiveLinks }: PortfolioHomeProps) {
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
  const matchesFilter = (project: Project) => filter === "all" || project.filter === filter;
  const visibleCount = featuredProjects.filter(matchesFilter).length;
  const ProjectTitle = filter === "all" ? "h4" : "h3";

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
            <nav aria-label="주 메뉴">
              <a href="#career">경력</a>
              <a href="#work">프로젝트</a>
              <a href="#ai-workflow">AI 활용</a>
              <a href="#about">소개</a>
              <a href="#skills">기술</a>
              <a href="#contact">연락</a>
            </nav>
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
          <section className="profile-section career-section preview-section" id="career" data-chapter="profile" aria-labelledby="career-title">
            <h2 id="career-title">경력</h2>
            <div className="career-jobs">
              {jobs.map((job) => (
                <article className="profile-job" key={job.company}>
                  <h3>{job.company}</h3>
                  <div className="profile-job-meta"><span>{job.role}</span><span>{job.period}</span></div>
                  <p>{job.summary}</p>
                  {job.lines.length > 0 && (
                    <details className="profile-details">
                      <summary aria-label={`${job.company} 경력 상세`}>경력 상세</summary>
                      <ul className="profile-records">{job.lines.map((line) => <li key={line}>{line}</li>)}</ul>
                    </details>
                  )}
                </article>
              ))}
            </div>
          </section>
          <section className="work-section preview-section" id="projects" data-chapter="work" aria-labelledby="work-title">
            <span id="work" aria-hidden="true" />
            <header className="work-heading">
              <h2 id="work-title">{homeCopy.workTitle}</h2>
              <p className="work-hint">{homeCopy.workHint}</p>
            </header>
            <div className="work-nav">
              <nav aria-label="프로젝트 분야">{filters.map((item) => <button key={item.value} type="button" data-filter={item.value} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}</nav>
              <p id="project-count" aria-live="polite">{visibleCount}개의 작업</p>
            </div>
            <div className={`project-gallery${filter === "all" ? "" : " is-filtered"}`} id="project-gallery" ref={galleryRef}>
              {featuredGroups.map((group) => (
                <div className="project-group" data-group={group.id} hidden={!group.projects.some(matchesFilter)} key={group.id}>
                  <h3 className="project-group-title">{group.label}</h3>
                  <div className="project-pair">
                    {group.projects.map((project) => (
                      <article className="project-tile" data-project={project.id} data-category={project.filter} hidden={!matchesFilter(project)} key={project.id}>
                        <a className="project-open" href={`#${project.id}-details`} data-open={project.id} aria-labelledby={`${project.id}-title`} aria-haspopup="dialog" onClick={(event) => handleProjectClick(event, project)}>
                          <div className="project-intro">
                            <div className="tile-title project-identity">
                              {project.icon && <Image className="project-icon" src={project.icon} alt="" width={36} height={36} />}
                              <ProjectTitle id={`${project.id}-title`}>{project.name}</ProjectTitle>
                            </div>
                            <p className="tile-copy">{project.tagline}</p>
                            <p className="tile-meta" data-meta={project.id}>{[project.category, project.status, project.role].filter(Boolean).join(" · ")}</p>
                          </div>
                          <ProjectCover project={project} />
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="gallery-footnote">{homeCopy.galleryNote}</p>
            <details className="additional-projects">
              <summary>더 살펴볼 작업 <span>{additionalProjects.length + archiveLinks.length}</span></summary>
              <ul>{additionalProjects.map((project) => <li key={project.id}>
                <a className="additional-project-open" href={`#${project.id}-details`} aria-haspopup="dialog" onClick={(event) => handleProjectClick(event, project)}>
                  <span className="project-identity">{project.icon && <Image className="project-icon" src={project.icon} alt="" width={32} height={32} />}<strong>{project.name}</strong></span>
                  <span className="additional-project-summary">{project.tagline}</span>
                  <span className="additional-project-meta">{[project.category, project.status, project.role].filter(Boolean).join(" · ")}</span>
                </a>
              </li>)}</ul>
              {archiveLinks.length > 0 && (
                <nav className="project-archive" aria-labelledby="project-archive-title">
                  <h3 id="project-archive-title">이전 프로젝트 기록</h3>
                  <ul>{archiveLinks.map(({ href, title }) => (
                    <li key={href}><a href={href}>{title}</a></li>
                  ))}</ul>
                </nav>
              )}
            </details>
          </section>
          <section className="ai-workflow preview-section" id="ai-workflow" aria-labelledby="workflow-title">
            <header className="workflow-heading">
              <h2 id="workflow-title">{aiWorkflow.title}</h2>
              <p>{aiWorkflow.intro}</p>
            </header>
            <div className="workflow-map">
              <ol className="workflow-stages" role="list" aria-label="개발 흐름">
                {aiWorkflow.stages.map((stage, index) => (
                  <li className="workflow-station" data-stage={stage.id} key={stage.id}>
                    <div className="workflow-rail">
                      <span className="workflow-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span>{stage.label}</span>
                      {index < aiWorkflow.stages.length - 1 && <span className="workflow-arrow" aria-hidden="true" />}
                    </div>
                    <h3>{stage.heading}</h3>
                    <p className="workflow-description">{stage.description}</p>
                    <div className="workflow-return">
                      <svg aria-hidden="true" width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15.5 4.5v4a4 4 0 0 1-4 4h-7m3-3-3 3 3 3" />
                      </svg>
                      <p><span>{stage.condition}</span><strong>{stage.action}</strong></p>
                    </div>
                    <details className="workflow-detail" name="portfolio-ai-step" data-step={stage.id}>
                      <summary>
                        <span>{stage.detailLabel}</span>
                        <span className="workflow-toggle" aria-hidden="true" />
                      </summary>
                      <p>{stage.detail}</p>
                    </details>
                  </li>
                ))}
              </ol>
              <div className="workflow-handoff">
                <p className="workflow-handoff-route">
                  <span>기준 충족</span>
                  <span aria-hidden="true">→</span>
                  <strong>결과 보고</strong>
                  <span aria-hidden="true">→</span>
                  <strong>다음 계획 결정</strong>
                </p>
                <p>{aiWorkflow.handoff}</p>
              </div>
            </div>
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
            <div id="profile-root" className="profile-overview">
              <div className="profile-intro">
                <p className="profile-role">{homeCopy.profileRole}</p>
                <h2 className="profile-name">{homeCopy.profileName}</h2>
                <p className="profile-direction">{homeCopy.profileDirection}</p>
                <p className="profile-aspiration">{homeCopy.profileAspiration}</p>
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
          <section className="tech-stack preview-section" id="skills" aria-labelledby="tech-title">
            <header className="tech-heading">
              <h2 id="tech-title">기술</h2>
              <p>프로젝트와 실무에서 사용한 기술을 모았습니다.</p>
            </header>
            <div className="tech-groups">
              {skills.map((group) => (
                <div className="tech-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul role="list">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        {item.logo && (
                          <Image
                            className={item.darkLogo ? "tech-logo tech-logo-light" : "tech-logo"}
                            data-logo={item.logo}
                            src={`/portfolio/stack/${item.logo}.svg`}
                            width={18}
                            height={18}
                            alt=""
                            unoptimized
                          />
                        )}
                        {item.darkLogo && <Image className="tech-logo tech-logo-dark" src={`/portfolio/stack/${item.darkLogo}.svg`} width={18} height={18} alt="" unoptimized />}
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
            {activeProject.developmentNote && <div>
              <h3>{activeProject.developmentNote.title}</h3>
              <p>{activeProject.developmentNote.body}</p>
            </div>}
            <div><h3>확인한 범위</h3><p>{activeProject.evidence}</p></div>
            <div className="dialog-foot"><span>{activeProject.stack.join(" / ")}</span><div className="dialog-links">{activeProject.liveUrl && <a href={activeProject.liveUrl} target="_blank" rel="noreferrer">서비스 열기 ↗</a>}{activeProject.github && <a href={activeProject.github} target="_blank" rel="noreferrer">소스 코드 보기 ↗</a>}</div></div>
          </div>
        </>}</div>
      </dialog>
    </>
  );
}
