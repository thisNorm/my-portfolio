import VisitorCount from "./VisitorCount";
import {
  activities,
  awards,
  education,
  facts,
  jobs,
  projects,
  skills,
  tools,
  type Row,
} from "./portfolioData";

const EMAIL = "kisook2557@gmail.com";

function RowList({ rows }: { rows: Row[] }) {
  return (
    <div className="rows">
      {rows.map((row) => (
        <div className="row" key={row.name}>
          <b>{row.href ? <a href={row.href} target="_blank" rel="noreferrer">{row.name}</a> : row.name}</b>
          <span className="muted wide">{row.why}</span>
          <span className="strong">{row.now}</span>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioHome() {
  return (
    <div className="page">
      <header className="bar">
        <div className="wrap bar-inner">
          <a href="#top" className="mono logo">thisnorm</a>
          <nav aria-label="주요 메뉴" className="nav">
            <a href="#work">경력</a>
            <a href="#projects">프로젝트</a>
            <a href="#skills">기술</a>
            <a href="#awards">수상</a>
            <a href={`mailto:${EMAIL}`} className="underline">연락하기</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="mono muted small">황규범 — 백엔드 엔지니어, 인포벨리코리아</p>
            <h1>반복 업무를 AI 에이전트와 자동화로 바꾸는 일을 합니다.</h1>
            <p className="lead">
              스마트팜 농가의 현장 장비와 서비스 사이 백엔드를 만들고, 그 위에 AI 자동화를 붙입니다. AI가 만든 결과는 검증을 통과한 것만 반영하는 구조를 선호하고, 불편한 일은 직접 도구로 만들어 동료와 외부 사용자가 함께 씁니다.
            </p>
            <div className="actions">
              <a href="#projects" className="button primary">프로젝트 보기</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="button">이력서 PDF</a>
            </div>
          </div>
          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="muted small">{fact.label}</dt>
                <dd className="fact-value">{fact.value}</dd>
                <dd className="muted small">{fact.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <main className="wrap">
        <section id="work" className="section">
          <h2>경력</h2>
          <div className="rule">
            {jobs.map((job) => (
              <article className="job" key={job.company}>
                <div>
                  <h3>{job.company}</h3>
                  <p className="muted">{job.role}</p>
                  <p className="mono muted small">{job.period}</p>
                </div>
                <ul>
                  {job.lines.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head">
            <h2>프로젝트</h2>
            <a href="https://github.com/thisNorm" target="_blank" rel="noreferrer" className="underline">GitHub에서 코드 보기</a>
          </div>
          <div className="cards">
            {projects.map((project) => {
              const body = (
                <>
                  <div className="card-head">
                    <span className="metric">{project.metric}</span>
                    <span className="muted small">{project.note}</span>
                  </div>
                  <div className="card-body">
                    <p className="mono muted small">{project.kind}</p>
                    <h3>{project.title}</h3>
                    <p className="desc">{project.desc}</p>
                    <p className="mono muted small card-foot">{project.role} · {project.stack}</p>
                  </div>
                </>
              );
              return project.href ? (
                <a className="card" key={project.title} href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.title} 저장소 열기`}>{body}</a>
              ) : (
                <div className="card" key={project.title}>{body}</div>
              );
            })}
          </div>
        </section>

        <section id="tools" className="section">
          <h2>불편해서 만든 도구</h2>
          <RowList rows={tools} />
        </section>

        <section id="activity" className="section">
          <h2>활동</h2>
          <RowList rows={activities} />
        </section>

        <section id="skills" className="section">
          <h2>기술</h2>
          <dl className="rule">
            {skills.map((skill) => (
              <div className="skill" key={skill.label}>
                <dt>{skill.label}</dt>
                <dd className="muted wide">{skill.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section two">
          <div id="awards">
            <h2>수상</h2>
            <ol className="rule list">
              {awards.map((award) => (
                <li className="award" key={`${award.date}-${award.org}`}>
                  <span className="mono muted small">{award.date}</span>
                  <span><b>{award.title} — {award.org}</b><span className="muted small block">{award.note}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>교육·자격</h2>
            <ol className="rule list">
              {education.map((item) => (
                <li className="edu" key={item.title}>
                  <b>{item.title}</b>
                  <span className="muted small">{item.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <div className="footer-inner muted small">
          <span>{EMAIL} · github.com/thisNorm · thisnorm.tistory.com</span>
          <VisitorCount />
        </div>
      </footer>
    </div>
  );
}
