"use client";
import { motion } from "framer-motion";

export default function TechStackSection() {
  const stack = {
    // 1. 백엔드 및 언어: Java, NestJS, Python, R
    Backend: [
      "Java", "Python", "R", 
      "NestJS", "Node.js", "PHP"
    ],
    // 2. 데이터 및 AI: 빅데이터 전공 + DB + AI
    DataAI: [
      "MySQL", "Oracle", 
      "OpenCV", "Deep Learning", "Big Data Analysis"
    ],
    // 3. 배포 및 프론트엔드: AWS, Firebase, Vercel 강조 (Notion, Figma 포함)
    DeploymentFrontend: [
      "AWS", "Firebase", "Vercel",
      "Next.js", "React", "TypeScript", "Angular",
      "Git/GitHub", "Notion", "Figma"
    ],
  };

  return (
    <section className="snap-section bg-slate-950 text-white flex flex-col justify-center py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* 섹션 타이틀 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase mb-2 block">Technical Proficiency</span>
          <h2 className="text-3xl md:text-5xl font-black">
            Core Technologies
          </h2>
        </motion.div>

        {/* 기술 스택 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Backend & Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 p-8 rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              </div>
              <h3 className="text-xl font-bold">Backend & Lang</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.Backend.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 2. Data & AI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58 4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              <h3 className="text-xl font-bold">Data & AI</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.DataAI.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 3. Deployment & Frontend (수정됨: 구름 아이콘 + 배포 스택) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600 rounded-lg">
                {/* Cloud Icon for Deployment */}
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Deploy & Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.DeploymentFrontend.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded-md border border-slate-700 hover:bg-slate-700 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}