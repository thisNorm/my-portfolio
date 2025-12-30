"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <section className="snap-section bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center">
        <div className="flex items-end justify-between mb-10 px-2">
            <div>
                <span className="text-blue-500 font-bold tracking-widest uppercase mb-2 block">My Works</span>
                <h2 className="text-4xl md:text-5xl font-black">PROJECTS</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {projects && projects.length > 0 ? projects.map((project, i) => (
            <motion.div key={project._id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="h-full">
              <Link href={`/projects/${project.slug}`} className="group relative flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all duration-300">
                <div className="h-48 overflow-hidden bg-slate-800 relative">
                   {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                   <p className="text-slate-400 text-sm line-clamp-3 mb-4">{project.description}</p>
                   <div className="mt-auto text-sm font-bold text-blue-400">View Detail →</div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="text-slate-500">프로젝트 데이터가 없습니다. Sanity를 확인해주세요.</div>
          )}
        </div>
      </div>
    </section>
  );
}