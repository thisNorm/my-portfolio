"use client";
import { motion } from "framer-motion";

export default function TechStackSection() {
  const stack = {
    AppDev: [
      "Java", "NestJS", "Node.js", "PHP", 
      "Next.js", "React", "TypeScript"
    ],
    DataAI: [
      "Python", "R", "MySQL", "Oracle",
      "OpenCV", "Deep Learning", "Big Data Analysis"
    ],
    InfraTools: [
      "AWS", "Firebase", "Vercel", "Git/GitHub",
      "ChatGPT", "Gemini", "Perplexity", "GitHub Copilot",
      "Sider", "Liner", "Notion", "Figma"
    ],
  };

  return (
    <section className="snap-section bg-slate-950 text-white flex flex-col justify-center py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase mb-2 block">Technical Proficiency</span>
          <h2 className="text-3xl md:text-5xl font-black">Core Technologies</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 p-8 rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-lg">
                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold">Application Dev</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.AppDev.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700">{skill}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="text-xl font-bold">Data & AI</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.DataAI.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700">{skill}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold">Infra & AI Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.InfraTools.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700 hover:bg-indigo-900/30 hover:text-indigo-300 transition-colors">{skill}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}