import Image from "next/image";
import type { ReactNode } from "react";
import "../home.css";
import HomeMotion from "./home/HomeMotion";
import VisitorCount from "./VisitorCount";
import {
  activities, aiMethod, awards, contact, education, homeCopy, otherProjectIds, perspective, projectById, projectMeta, skills, tools,
  type Project, type ProjectNote,
} from "./portfolioData";

type PortfolioHomeProps = {
  archiveLinks: { href: string; title: string }[];
  career: ReactNode;
};

const nav = [
  { href: "#career", label: "경력" },
  { href: "#view", label: "관점" },
  { href: "#work", label: "프로젝트" },
  { href: "#method", label: "AI와 일하는 방식" },
  { href: "#skills", label: "기술" },
  { href: "#awards", label: "수상" },
];

function Note({ note, className = "note" }: { note?: ProjectNote; className?: string }) {
  if (!note) return null;
  return (
    <div className={className}>
      <p className="note__label">{note.label}</p>
      {note.title && <h4>{note.title}</h4>}
      <p>{note.body}</p>
    </div>
  );
}

function Split({ project, stack = false }: { project: Project; stack?: boolean }) {
  if (!project.split) return null;
  return (
    <dl className={stack ? "split split--stack" : "split"}>
      {project.split.map(({ label, text }) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
    </dl>
  );
}

function RepoLink({ href, children = "저장소" }: { href: string | null; children?: ReactNode }) {
  if (!href) return null;
  return <a className="work-study__link" href={href} target="_blank" rel="noopener">{children} <span aria-hidden="true">↗</span></a>;
}

function Media({ project, index = 0, sizes }: { project: Project; index?: number; sizes: string }) {
  const media = project.media?.[index];
  if (!media) return null;
  return (
    <figure className="work-study__media">
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}

export default function PortfolioHome({ archiveLinks, career }: PortfolioHomeProps) {
  const hv = projectById("harnessvault");
  const ca = projectById("content");
  const fg = projectById("facegate");
  const dv = projectById("deepvoice");
  const lanes = perspective.lanes;

  return (
    <div className="home">
      <a className="home-skip" href="#work">프로젝트로 건너뛰기</a>
      <nav className="jump" aria-label="섹션 바로가기" hidden>
        <a className="home-wordmark" href="#top" aria-label="thisnorm 첫 화면">thisnorm<span>.</span></a>
        <div className="jump__links">{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
      </nav>
      <main>
        <section className="intro" id="top" aria-labelledby="intro-title" data-phase="0">
          <div className="intro-pin">
            <header className="home-masthead wrap">
              <a className="home-wordmark" href="#top" aria-label="thisnorm 첫 화면">thisnorm<span>.</span></a>
              <nav aria-label="포트폴리오">{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
            </header>
            <figure className="scene" aria-hidden="true">
              <Image className="scene-poster" src="/portfolio/hero-conveyor.webp" alt="" width={1100} height={800} priority />
              <canvas id="conveyor" />
            </figure>
            <div className="intro-layout wrap">
              <div className="intro-copy">
                <p className="intro-name">{homeCopy.name} <span>{homeCopy.role}</span></p>
                <h1 id="intro-title">{homeCopy.title[0]}<br />{homeCopy.title[1]}</h1>
                <p className="intro-description">{homeCopy.description[0]}<br />{homeCopy.description[1]}</p>
                <a className="intro-link" href="#work">{homeCopy.action} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="scene-footer wrap">
              <div className="scene-caption">
                <span className="scene-hint"><span aria-hidden="true">↓</span> <span id="scene-hint-text" data-start={homeCopy.sceneHint} data-end={homeCopy.sceneHintEnd}>{homeCopy.sceneHint}</span></span>
                <button type="button" id="auto-toggle" className="auto-toggle" data-stop={homeCopy.autoStop} data-resume={homeCopy.autoResume} hidden>{homeCopy.autoStop}</button>
              </div>
              <div className="scene-readout">
                <p id="phase-caption">{homeCopy.phases[0].caption}</p>
                <ol className="scene-steps" aria-label="자동화 장면 단계">
                  {homeCopy.phases.map((phase, i) => (
                    <li key={phase.label}><button type="button" data-step={i} data-caption={phase.caption} aria-current={i === 0 ? "step" : undefined}><small>{String(i + 1).padStart(2, "0")}</small> {phase.label}</button></li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {career}

        <section id="view" className="view" data-scene data-steps={perspective.examples.length} aria-labelledby="view-title">
          <div className="view__pin">
            <div className="wrap view__layout">
              <header className="view__head">
                <p className="view__label">{perspective.label}</p>
                <h2 id="view-title">{perspective.title[0]}<br />{perspective.title[1]}</h2>
                <p className="view__lead">{perspective.lead}</p>
                <ol className="view__tabs" aria-label="예시 프로젝트">
                  {perspective.examples.map((ex, i) => <li key={ex.name}><button type="button" data-goto={i}>{ex.name}</button></li>)}
                </ol>
              </header>
              <div className="view__board">
                {lanes.map((lane) => (
                  <div className={`lane lane--${lane.id}`} key={lane.id}>
                    <h3>{lane.label}</h3>
                    <ul className="lane__track">
                      {perspective.examples.flatMap((ex, i) => ex.items[lane.id].map((item) => (
                        <li key={`${ex.name}-${item.text}`} data-ex={i} className={"none" in item ? "lane__none" : undefined}>
                          <small>{ex.name}</small>{item.text}{"tool" in item && <em>{item.tool}</em>}
                        </li>
                      )))}
                    </ul>
                  </div>
                ))}
                {perspective.examples.map((ex, i) => <p className="view__caption" data-ex={i} data-name={ex.name} key={ex.name}>{ex.caption}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work-study" aria-labelledby="work-study-title">
          <span id="projects" aria-hidden="true" />
          <div className="work-chapter">
            <div className="work-chapter__pin">
              <div className="wrap work-chapter__layout">
                <svg className="work-chapter__planes" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
                  <path className="work-chapter__plane-edge" fill="#2e493a" d="M35 225 122 269 270 167V203L122 305 35 261Z" />
                  <path className="work-chapter__plane-far" fill="#3b5644" d="M181 126 279 53 372 96 270 167Z" />
                  <path className="work-chapter__plane-near" fill="#4e6b54" d="M35 225 181 126 270 167 122 269Z" />
                </svg>
                <header>
                  <p className="work-study__label">{homeCopy.workLabel}</p>
                  <div className="work-chapter__type">
                    <h2 id="work-study-title" className="work-chapter__title">{homeCopy.workTitle[0]} <br className="work-chapter__break" />{homeCopy.workTitle[1]}</h2>
                    <span className="work-chapter__title work-chapter__fill" aria-hidden="true">{homeCopy.workTitle[1]}</span>
                  </div>
                </header>
              </div>
            </div>
          </div>

          <div id="work-list" className="work-study__lead">
            <div className="wrap">
              <article id={`${hv.id}-details`} className="work-study__poster" aria-labelledby="work-hv-title">
                <div className="work-study__feature-copy">
                  <p className="work-study__meta">{projectMeta(hv)}</p>
                  <h3 id="work-hv-title">{hv.name}</h3>
                  <p className="work-study__headline">{hv.headline}</p>
                  <p className="work-study__summary">{hv.summary}</p>
                  <p className="work-study__stack">{hv.stack.join(" · ")}</p>
                  <RepoLink href={hv.github} />
                </div>
                <figure className="work-study__media">
                  <div className="work-study__window">
                    {hv.media?.[0] && <Image src={hv.media[0].src} alt={hv.media[0].alt} width={hv.media[0].width} height={hv.media[0].height} sizes="(max-width: 900px) 100vw, 56vw" />}
                  </div>
                  <figcaption>{hv.media?.[0]?.caption}</figcaption>
                </figure>
                <Split project={hv} />
                <Note note={hv.developmentNote} className="note note--wide" />
              </article>
            </div>
          </div>

          <div id={`${ca.id}-details`} className="ca" data-scene data-steps={ca.pipeline?.length ?? 1} aria-labelledby="work-ca-title">
            <div className="wrap ca__grid">
              <div className="ca__copy">
                <p className="work-study__meta">{projectMeta(ca)}</p>
                <h3 id="work-ca-title">{ca.name}</h3>
                <p className="work-study__headline">{ca.headline}</p>
                <Split project={ca} stack />
                <Note note={ca.developmentNote} />
                <p className="work-study__stack">{ca.stack.join(" · ")}</p>
                <RepoLink href={ca.github} />
              </div>
              <figure className="ca__flow">
                <ol>{ca.pipeline?.map((step) => <li key={step.title} data-who={step.who}><b>{step.title}</b><span>{step.detail}</span></li>)}</ol>
                <figcaption>
                  <span className="key key--human">사람</span><span className="key key--code">코드·규칙</span><span className="key key--ai">AI</span><span className="key key--gate">검증 게이트</span> README의 실제 파이프라인
                </figcaption>
              </figure>
            </div>
          </div>

          <div id={`${fg.id}-details`} className="fg">
            <div className="wrap fg__grid">
              <Media project={fg} sizes="(max-width: 900px) 100vw, 56vw" />
              <div className="fg__copy">
                <p className="work-study__meta">{projectMeta(fg)}</p>
                <h3>{fg.name}</h3>
                <p className="work-study__headline">{fg.headline}</p>
                <p className="work-study__summary">{fg.summary}</p>
                {fg.metric && (
                  <figure className="metric" aria-labelledby="facegate-metric">
                    <p id="facegate-metric" className="note__label">같은 단말 · 얼굴 검출 장면 처리 중앙값</p>
                    <div className="metric__row"><span>CPU</span><i style={{ width: "100%" }} /><b>{fg.metric.before}{fg.metric.unit}</b></div>
                    <div className="metric__row"><span>NPU INT8</span><i style={{ width: `${(fg.metric.after / fg.metric.before) * 100}%` }} /><b>{fg.metric.after}{fg.metric.unit}</b></div>
                    <figcaption>{fg.evidence}</figcaption>
                  </figure>
                )}
                <Note note={fg.developmentNote} />
                <RepoLink href={fg.github} />
              </div>
            </div>
          </div>

          <div id={`${dv.id}-details`} className="work-study__band" aria-labelledby="work-deepvoice-title">
            <div className="wrap work-study__band-grid">
              <div>
                <p className="work-study__meta">{dv.role} · {dv.status}</p>
                <h3 id="work-deepvoice-title">{dv.name}</h3>
                <p className="work-study__headline">{dv.headline}</p>
                <p className="work-study__summary">{dv.summary}</p>
                <div className="band-notes"><Note note={dv.developmentNote} /><Note note={dv.secondNote} /></div>
                <RepoLink href={dv.github}>백엔드 저장소</RepoLink>
              </div>
              <div className="band-phones">
                {dv.media?.map((media) => (
                  <figure key={media.src}>
                    <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 900px) 45vw, 200px" />
                    <figcaption>{media.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="work-study__index">
            <div className="wrap">
              <h3 className="work-study__index-title">{homeCopy.otherTitle}</h3>
              <div className="index-grid">
                {otherProjectIds.map(projectById).map((project) => (
                  <article id={`${project.id}-details`} key={project.id}>
                    {project.id !== "pinmate" && <Media project={project} sizes="(max-width: 900px) 100vw, 46vw" />}
                    <h4>{project.name}</h4>
                    <p className="work-study__meta">{projectMeta(project)}</p>
                    <p>{project.brief}</p>
                    <Note note={project.developmentNote} />
                    <div className="work-study__links">
                      {project.liveUrl && <RepoLink href={project.liveUrl}>서비스 열기</RepoLink>}
                      <RepoLink href={project.github} />
                    </div>
                  </article>
                ))}
              </div>
              {archiveLinks.length > 0 && (
                <nav className="archive" aria-labelledby="archive-title">
                  <h4 id="archive-title">{homeCopy.archiveTitle}</h4>
                  <ul>{archiveLinks.map(({ href, title }) => <li key={href}><a href={href}>{title}</a></li>)}</ul>
                </nav>
              )}
            </div>
          </div>
        </section>

        <section id="method" className="method" data-scene data-steps={aiMethod.steps.length} aria-labelledby="method-title">
          <div className="method__pin">
            <div className="wrap method__layout">
              <header className="method__head">
                <p className="view__label">{aiMethod.label}</p>
                <h2 id="method-title">{aiMethod.title[0]}<br />{aiMethod.title[1]}</h2>
                <p className="view__lead">{aiMethod.lead}</p>
                <svg className="loop" viewBox="0 0 320 345" aria-hidden="true" focusable="false">
                  <circle className="loop__track" cx="160" cy="160" r="118" />
                  <circle className="loop__run" cx="160" cy="160" r="118" pathLength={1} />
                  <text className="loop__self" x="160" y="332">{aiMethod.loopNote}</text>
                  {aiMethod.loop.map((label, i) => {
                    const [x, y] = [[160, 42], [278, 160], [160, 278], [42, 160]][i];
                    return <g className="loop__node" data-node={i} key={label}><circle cx={x} cy={y} r="30" /><text x={x} y={y + 5}>{label}</text></g>;
                  })}
                </svg>
              </header>
              <ol className="method__steps">
                {aiMethod.steps.map((step, i) => (
                  <li data-ex={i} className={step.key ? "is-key" : undefined} key={step.title}>
                    <button type="button" data-goto={i}><span>{String(i + 1).padStart(2, "0")}</span>{step.title}</button>
                    <div className="method__body">
                      <p>{step.body}</p>
                      {step.quote && <blockquote>{step.quote}<cite>{step.cite}</cite></blockquote>}
                      {step.report && <ol className="report">{step.report.map((item) => <li key={item}>{item}</li>)}</ol>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-study" aria-labelledby="skills-title">
          <div className="wrap skills-study__grid">
            <h2 id="skills-title">기술</h2>
            <dl className="skills-list">
              {skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.map((item) => (
                    <span key={item.name}>
                      {item.logo && <Image src={`/portfolio/stack/${item.logo}.svg`} alt="" width={20} height={20} unoptimized />}
                      {item.name}{item.note && <small>{item.note}</small>}
                    </span>
                  ))}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="awards" className="awards-study" aria-labelledby="awards-title">
          <div className="wrap">
            <div className="awards-study__head">
              <h2 id="awards-title">수상</h2>
              <p>{homeCopy.awardsLead}</p>
            </div>
            <div className="awards-photos">
              {awards.filter((award) => award.image).map((award) => (
                <figure key={award.image}>
                  <Image src={award.image!} alt={award.imageAlt ?? ""} width={award.imageWidth ?? 1200} height={award.imageHeight ?? 800} sizes="(max-width: 900px) 100vw, 45vw" />
                  <figcaption><b>{award.title}</b> {award.org} <time>{award.date}</time></figcaption>
                </figure>
              ))}
            </div>
            <ul className="awards-more" role="list">
              {awards.filter((award) => !award.image).map((award) => (
                <li key={`${award.date}-${award.org}`}><time>{award.date}</time><b>{award.title}</b> {award.org} · {award.note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="more" className="more-study" aria-labelledby="more-title">
          <div className="wrap more-study__grid">
            <div className="more-study__tools">
              <h2 id="more-title">작은 도구들</h2>
              <p className="more-study__lead">{homeCopy.toolsLead}</p>
              {tools[0]?.image && (
                <figure className="more-study__shot">
                  <Image src={tools[0].image.src} alt={tools[0].image.alt} width={tools[0].image.width} height={tools[0].image.height} sizes="(max-width: 900px) 100vw, 55vw" />
                  <figcaption>{tools[0].name} {tools[0].image.caption}</figcaption>
                </figure>
              )}
              <dl className="tool-list">
                {tools.map((tool) => (
                  <div key={tool.name}>
                    <dt>{tool.github ? <a href={tool.github} target="_blank" rel="noopener">{tool.name} <span aria-hidden="true">↗</span></a> : tool.name}</dt>
                    <dd>{tool.problem} {tool.state}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="more-study__edu">
              <h2>교육·자격</h2>
              <dl className="tool-list">
                {education.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.note}</dd></div>)}
              </dl>
              <h2 className="more-study__sub">활동</h2>
              <dl className="tool-list">
                {activities.map((item) => (
                  <div key={item.name}>
                    <dt>{item.href ? <a href={item.href} target="_blank" rel="noopener">{item.name} <span aria-hidden="true">↗</span></a> : item.name}</dt>
                    <dd>{item.why} · {item.now}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="study-foot wrap">
        <a className="home-wordmark" href="#top" aria-label="thisnorm 첫 화면">thisnorm<span>.</span></a>
        <div className="study-foot__links">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
          <a href={contact.blog} target="_blank" rel="noopener">블로그 <span aria-hidden="true">↗</span></a>
          <a href={contact.resume} target="_blank" rel="noopener">이력서 <span aria-hidden="true">↗</span></a>
          <a href="#top">처음으로 <span aria-hidden="true">↑</span></a>
        </div>
        <VisitorCount />
      </footer>
      <HomeMotion />
    </div>
  );
}
