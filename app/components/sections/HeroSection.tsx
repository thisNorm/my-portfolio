"use client"; 
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection({ profile }: { profile: any }) {
  return (
    <section className="snap-section relative w-full h-screen overflow-hidden flex items-center bg-slate-950">
      
      <div className="absolute inset-0 z-0">
        <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center"
        quality={85}
        />
        <div className="absolute inset-0 bg-slate-950/80"></div> 
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full h-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left text-white"
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-900/50 border border-blue-500/50 text-blue-300 font-bold text-xs rounded-full tracking-widest uppercase backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Current: ETRI Researcher
            </span>
            <span className="px-4 py-1.5 border border-slate-500/50 text-slate-300 font-semibold text-xs rounded-full tracking-widest uppercase backdrop-blur-sm">
              Major: Software Convergence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
            DEFINING THE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              OUTCOME.
            </span>
          </h1>

          <p className="sr-only">
            백엔드 개발자 포트폴리오. Node.js 백엔드 개발자 황규범의 서버 개발 포트폴리오 사이트.
            NestJS, FastAPI, 실시간 관제 시스템, AI 영상 처리 프로젝트 경험을 정리한 개발자 포트폴리오.
          </p>
          
          <div className="space-y-6 max-w-lg">
            <div className="pl-5 border-l-2 border-blue-500">
              <p className="text-2xl font-bold text-white mb-2 font-serif">
                "진인사대천명 (盡人事待天命)"
              </p>
              <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                인간으로서 할 일을 다하고 하늘의 명을 기다린다.<br/>
                재수 시절부터 가슴 깊이 새겨온 저의 흔들리지 않는 원칙입니다.
              </p>
            </div>
            
            <p className="text-lg text-slate-200 leading-relaxed font-light">
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

        <div className="hidden lg:block"></div> 
        
      </div>
    </section>
  );
}