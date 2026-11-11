import { formatCareerMonths, getCareerTenure } from "../lib/career";
import { jobs } from "./portfolioData";

const showMonth = (month: string) => month.replace("-", ".");
const kindLabel = { training: "연구연수", work: "실무" } as const;

// Training first, then employment: the bar, the legend and the role list share one order.
const ordered = [...jobs].sort((a, b) => a.startMonth.localeCompare(b.startMonth));

export default function CareerSection() {
  const { asOfMonth, totals, totalMonths } = getCareerTenure(jobs, new Date());

  return (
    <section id="career" className="career-study" aria-labelledby="career-title">
      <div className="career-frame">
        <svg className="career-relief" viewBox="0 0 860 760" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="relief-side" x1="0" x2="1" y1="0" y2=".82">
              <stop stopColor="#537763" stopOpacity=".40" />
              <stop offset="1" stopColor="#264637" stopOpacity=".06" />
            </linearGradient>
            <linearGradient id="relief-top" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#8da684" stopOpacity=".32" />
              <stop offset="1" stopColor="#446857" stopOpacity="0" />
            </linearGradient>
            <g id="relief-rail">
              <path d="M130 160 736 -158 858 -88 251 230Z" fill="url(#relief-top)" />
              <path d="M251 230 858 -88 858 -55 251 263Z" fill="url(#relief-side)" />
              <path d="M130 160 251 230 251 263 130 193Z" fill="#264538" fillOpacity=".48" />
            </g>
          </defs>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <use key={i} href="#relief-rail" x={42 * i} y={91 * i} />)}
        </svg>
        <div className="wrap">
          <div className="career-head">
            <h2 id="career-title">경력</h2>
            <div className="career-total-study">
              <p>총 경력 <span>연구연수 포함</span></p>
              <strong>{totalMonths > 0 && <small>약</small>} {formatCareerMonths(totalMonths)}</strong>
              <time dateTime={asOfMonth}>{showMonth(asOfMonth)} 기준 · 사이 공백 제외</time>
            </div>
            <figure className="career-duration">
              <div className="duration-bar" aria-hidden="true">
                {ordered.map((job) => <i key={job.company} data-kind={job.kind} style={{ flexGrow: totals[job.kind] }} />)}
              </div>
              <figcaption>
                {ordered.map((job) => (
                  <span key={job.company}><i data-kind={job.kind} aria-hidden="true" />
                    {job.company.replace(/\s*\(.*\)$/, "")} {kindLabel[job.kind]} {job.kind === "work" ? "약 " : ""}{formatCareerMonths(totals[job.kind])}
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>
          <div className="career-roles">
            {ordered.map((job) => (
              <article key={job.company}>
                <p className="role-date">
                  <time dateTime={job.startMonth}>{showMonth(job.startMonth)}</time>–{job.endMonth ? <time dateTime={job.endMonth}>{showMonth(job.endMonth)}</time> : "현재"} · {kindLabel[job.kind]}
                </p>
                <h3>{job.company} <span>{job.role}</span></h3>
                <p className="role-summary">{job.summary}</p>
                <dl className="role-work">
                  {job.contributions.map(({ title, description }) => (
                    <div key={title}><dt>{title}</dt><dd>{description}</dd></div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
