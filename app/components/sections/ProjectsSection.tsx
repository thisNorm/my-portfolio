"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PortableTextContent,
  type PortableTextBlock,
} from "@/app/components/PortableTextContent";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  content?: PortableTextBlock[];
}

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({
  projects = [],
}: ProjectsSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find(
    (project) => project._id === selectedId,
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      document.body.style.overflow = selectedId ? "hidden" : "unset";
    }, 0);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  return (
    <section
      id="projects"
      className="h-screen w-full snap-start flex flex-col relative bg-slate-950 overflow-hidden"
    >
      <div className="pt-24 pb-8 px-6 bg-slate-950/90 z-10 flex-shrink-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-white"
        >
          My Projects
        </motion.h2>

        <p className="sr-only">
          諛깆뿏??媛쒕컻 ?꾨줈?앺듃 ?ы듃?대━?? ?ㅼ떆媛?愿???쒖뒪?? API ?쒕쾭,
          ?명봽??援ъ꽦, ?깅뒫 媛쒖꽑 ?щ?.
        </p>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-24 w-full max-w-6xl mx-auto no-scrollbar scroll-smooth">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id}
                layoutId={`card-container-${project._id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedId(project._id)}
                className="group cursor-pointer flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl min-h-[350px]"
              >
                <div className="h-48 overflow-hidden bg-slate-800 relative flex-shrink-0">
                  {project.imageUrl ? (
                    <motion.img
                      layoutId={`card-image-${project._id}`}
                      src={project.imageUrl}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <motion.h3
                    layoutId={`card-title-${project._id}`}
                    className="text-xl font-bold mb-3 text-white group-hover:text-blue-400"
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow whitespace-pre-line">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags && project.tags.length > 3 && (
                      <span className="text-[10px] px-2 py-1 text-slate-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
              <p>遺덈윭???꾨줈?앺듃媛 ?놁뒿?덈떎.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <div className="h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute bottom-6 w-full text-center text-slate-400 text-xs tracking-widest animate-pulse">
          SCROLL FOR MORE ??        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="bg-slate-950 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 shadow-2xl relative z-10 flex flex-col"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                aria-label="Close"
              >
                ??              </button>

              <div className="overflow-y-auto custom-scrollbar h-full no-scrollbar">
                <div className="w-full h-64 md:h-80 relative bg-slate-900">
                  {selectedProject.imageUrl && (
                    <motion.img
                      layoutId={`card-image-${selectedId}`}
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.h2
                    layoutId={`card-title-${selectedId}`}
                    className="text-3xl md:text-4xl font-bold mb-6 text-white"
                  >
                    {selectedProject.title}
                  </motion.h2>

                  <p className="text-slate-400 text-lg mb-8 whitespace-pre-line">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4 mb-10">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg"
                      >
                        Visit Site ??                      </a>
                    )}
                  </div>

                  <hr className="border-slate-800 mb-10" />

                  <div className="prose prose-lg prose-invert max-w-none prose-p:whitespace-pre-line">
                    {selectedProject.content ? (
                      <PortableTextContent value={selectedProject.content} />
                    ) : (
                      <p className="text-slate-500">?곸꽭 ?댁슜???놁뒿?덈떎.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}