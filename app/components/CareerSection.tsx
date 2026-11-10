import { formatCareerMonths, getCareerTimeline } from "../lib/career";
import { jobs } from "./portfolioData";

const showMonth = (month: string) => month.replace("-", ".");

export default function CareerSection() {
  const timeline = getCareerTimeline(jobs, new Date());

  return (
    <section className="profile-section career-section preview-section" id="career" data-chapter="profile" aria-labelledby="career-title">
      <header className="career-heading">
        <h2 id="career-title">경력</h2>
        <div className="career-overview">
          <dl className="career-tenure">
            <div>
              <dt><i className="career-tenure-mark" data-kind="work" aria-hidden="true" />실무 경력</dt>
              <dd>{timeline.totals.work > 0 ? <small>약{" "}</small> : null}{formatCareerMonths(timeline.totals.work)}</dd>
            </div>
            <div>
              <dt><i className="career-tenure-mark" data-kind="training" aria-hidden="true" />연구연수</dt>
              <dd>{formatCareerMonths(timeline.totals.training)}</dd>
            </div>
          </dl>
          <figure className="career-timeline">
            <div className="career-timeline-track" aria-hidden="true" style={{ gridTemplateColumns: "repeat(" + timeline.columns + ", minmax(0, 1fr))" }}>
              {timeline.ranges.map((range, index) => range.end > range.start && (
                <span className="career-timeline-range" data-kind={range.kind} key={jobs[index].company} style={{ gridColumn: range.start + " / " + range.end }} />
              ))}
            </div>
            <figcaption>
              <time dateTime={timeline.firstMonth}>{showMonth(timeline.firstMonth)}</time>
              <span><time dateTime={timeline.asOfMonth}>{showMonth(timeline.asOfMonth)}</time> 기준</span>
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
