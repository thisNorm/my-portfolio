import { formatCareerMonths, getCareerTenure } from "../lib/career";
import { jobs } from "./portfolioData";

const showMonth = (month: string) => month.replace("-", ".");
const tenureKinds = [
  { kind: "training", label: "연구연수" },
  { kind: "work", label: "실무 경력" },
] as const;

export default function CareerSection() {
  const { asOfMonth, totals, totalMonths } = getCareerTenure(jobs, new Date());

  return (
    <section className="profile-section career-section preview-section" id="career" data-chapter="profile" aria-labelledby="career-title">
      <header className="career-heading">
        <h2 id="career-title">경력</h2>
        <div className="career-overview">
          <div className="career-total">
            <p className="career-total-label">총 경력 <small>연구연수 포함</small></p>
            <p className="career-total-value">{totalMonths > 0 ? <small>약{" "}</small> : null}{formatCareerMonths(totalMonths)}</p>
            <p className="career-total-date"><time dateTime={asOfMonth}>{showMonth(asOfMonth)}</time> 기준</p>
          </div>
          <figure className="career-breakdown">
            {totalMonths > 0 && (
              <div className="career-breakdown-bar" aria-hidden="true">
                {tenureKinds.map(({ kind }) => (
                  <span className="career-breakdown-segment" data-kind={kind} key={kind} style={{ flexGrow: totals[kind] }} />
                ))}
              </div>
            )}
            <figcaption>
              <dl className="career-breakdown-key">
                {tenureKinds.map(({ kind, label }) => (
                  <div key={kind}>
                    <dt><span className="career-breakdown-mark" data-kind={kind} aria-hidden="true" />{label}</dt>
                    <dd>{kind === "work" && totals.work > 0 ? "약 " : ""}{formatCareerMonths(totals[kind])}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </div>
      </header>
      <div className="career-jobs">
        {jobs.map((job) => (
          <article className="profile-job" key={job.company}>
            <h3>{job.company}</h3>
            <div className="profile-job-meta">
              <span>{job.role}</span>
              <span><time dateTime={job.startMonth}>{showMonth(job.startMonth)}</time> — {job.endMonth ? (
                <time dateTime={job.endMonth}>{showMonth(job.endMonth)}</time>
              ) : "현재"}</span>
            </div>
            <p>{job.summary}</p>
            <dl className="career-contributions">
              {job.contributions.map(({ title, description }) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
