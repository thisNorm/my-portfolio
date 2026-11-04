"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";
import type { Project } from "./portfolioData";

type ProjectModalProps = {
  project: Project;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export default function ProjectModal({ project, closeRef, onClose }: ProjectModalProps) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeRef} className="modal-close" type="button" aria-label="닫기" onClick={onClose}>
          <X size={20} />
        </button>
        {project.thumbnail && (
          <div className={`modal-project-image ${project.thumbnailFit === "contain" ? "contain" : ""}`}>
            <Image src={project.thumbnail} alt={`${project.title} 프로젝트 화면`} fill sizes="760px" />
          </div>
        )}
        <p className="project-type">{project.type}</p>
        <h2 id="project-modal-title">{project.title}</h2>
        <p className="modal-lead">{project.description}</p>
        {(project.origin || project.achievement) && (
          <div className="project-proof">
            {project.origin && <span>연계 교육 · {project.origin}</span>}
            {project.achievement && <strong>{project.achievement}</strong>}
          </div>
        )}
        <div className="modal-insights">
          <article><span>시작</span><h3>왜 만들었나</h3><p>{project.motivation}</p></article>
          <article><span>과정</span><h3>어디서 어려웠나</h3><p>{project.challenge}</p></article>
          <article><span>회고</span><h3>무엇을 배웠나</h3><p>{project.lesson}</p></article>
        </div>
        <div className="modal-footer">
          <strong>{project.result}</strong>
          <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </section>
    </div>
  );
}
