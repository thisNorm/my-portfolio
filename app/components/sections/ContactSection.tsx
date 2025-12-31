"use client";
import { motion } from "framer-motion";

export default function ContactSection({ profile }: { profile: any }) {
  return (
    <section className="snap-section bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-blue-500 font-bold tracking-widest uppercase mb-4">What's Next?</p>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Let's Make <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Impact Together.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
            데이터의 흐름을 설계하고, 사람과 기술을 연결할 준비가 되어있습니다.<br/>
            새로운 도전을 시작할 준비가 되었습니다! 면접 제안 및 채용 관련 연락을 기다립니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:kisook2557@gmail.com" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">Send Email →</a>
            <a href="https://github.com/thisNorm" target="_blank" className="px-8 py-4 border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors">GitHub Profile</a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 w-full text-center text-slate-600 text-xs font-mono">
        © {new Date().getFullYear()} {profile?.name || "Gyubeom Hawng"}. Driven by Passion & Logic.
      </div>
    </section>
  );
}