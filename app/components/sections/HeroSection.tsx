"use client"; 
import { motion } from "framer-motion";

export default function HeroSection({ profile }: { profile: any }) {
  return (
    <section className="snap-section bg-slate-950 text-white relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[20%] w-[80vw] h-[80vw] bg-blue-700 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-0 w-[60vw] h-[60vw] bg-indigo-800 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-900/50 border border-blue-500/50 text-blue-300 font-bold text-xs rounded-full tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Current: ETRI Researcher
            </span>
            <span className="px-4 py-1.5 border border-slate-700 text-slate-400 font-semibold text-xs rounded-full tracking-widest uppercase">
              Major: Software Convergence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
            DEFINING THE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              OUTCOME.
            </span>
          </h1>
          
          <div className="space-y-6 max-w-lg">
            <div className="pl-5 border-l-2 border-blue-500">
              <p className="text-2xl font-bold text-white mb-2 font-serif">
                "진인사대천명 (盡人事待天命)"
              </p>
              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                인간으로서 할 일을 다하고 하늘의 명을 기다린다.<br/>
                재수 시절부터 가슴 깊이 새겨온 저의 흔들리지 않는 원칙입니다.
              </p>
            </div>
            
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              요행을 바라지 않습니다. <strong>압도적인 노력으로 결과를 필연으로 만듭니다.</strong><br/>
              치열하게 고민하는 <strong>백엔드 개발자</strong>이자,<br/>
              조직의 성장을 책임지는 <strong>리더</strong> {profile?.name || "황규범"}입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <a 
                href="/resume.pdf" 
                download
                className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
            <div className="relative w-[400px] h-[500px] mx-auto">
                <div className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-slate-800 rounded-3xl z-0"></div>
                <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 grayscale hover:grayscale-0 transition-all duration-700">
                    {profile?.profileImageUrl ? (
                        <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">NO IMAGE</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}