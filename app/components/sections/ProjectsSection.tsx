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
            <div className="hidden md:block text-slate-500 text-sm font-medium">
                Scroll to explore →
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[60vh] overflow-y-auto md:overflow-visible pr-2">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <Link
                href={`/projects/${project.slug}`} 
                className="group relative flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all duration-300"
              >
                <div className="h-1/2 overflow-hidden bg-slate-800 relative">
                   {project.imageUrl && (
                     <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                   )}
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div className="p-6 flex flex-col h-1/2">
                   <div className="flex gap-2 mb-3">
                      {project.tags?.slice(0, 2).map((tag:string) => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-blue-900/50 text-blue-400 rounded uppercase">
                              {tag}
                          </span>
                      ))}
                   </div>
                   <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                   <p className="text-slate-400 text-sm line-clamp-3 mb-4">{project.description}</p>
                   
                   <div className="mt-auto flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                      View Detail <span className="ml-2">→</span>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}