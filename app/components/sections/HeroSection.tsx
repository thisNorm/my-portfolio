"use client"; 
import { motion } from "framer-motion";

export default function HeroSection({ profile }: { profile: any }) {
  return (
    <section className="snap-section bg-slate-950 text-white relative">
      {/* 배경: 은은하게 움직이는 오로라 효과 (역동성 유지) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 z-0">
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

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 왼쪽: 텍스트 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          {/* 상단 뱃지: 현재 상태 & 정체성 */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-900/50 border border-blue-500/50 text-blue-300 font-bold text-xs rounded-full tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Current: ETRI Researcher
            </span>
            <span className="px-4 py-1.5 border border-slate-700 text-slate-400 font-semibold text-xs rounded-full tracking-widest uppercase">
              Convergence Major
            </span>
          </div>
          
          {/* 메인 카피: 진인사대천명을 세련되게 해석 */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
            DEFINING THE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              OUTCOME.
            </span>
          </h1>
          
          {/* 소개글: 진인사대천명 철학 녹이기 */}
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
              조직의 성장을 책임지는 <strong>리더</strong> {profile?.name}입니다.
            </p>
          </div>

            <div className="flex flex-wrap gap-4 mt-8">
            {/* 기존 스크롤 유도 대신 버튼으로 변경해도 좋습니다 */}
            <a 
                href="/resume.pdf" // public 폴더에 resume.pdf 파일을 넣어야 함
                download="Backend_Developer_Name_Resume.pdf" // 다운로드될 때 파일명
                className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold text-sm md:text-base hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Resume
            </a>
            </div>
          {/* 하단 스크롤 유도 (작게) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-xs font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2"
          >
            Scroll to Explore
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-slate-600"></motion.div>
          </motion.div>
        </motion.div>

        {/* 오른쪽: 프로필 이미지 (더 심플하고 고급스럽게) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
            <div className="relative w-[450px] h-[550px] mx-auto">
                {/* 뒤쪽 장식 프레임 */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-slate-800 rounded-3xl z-0"></div>
                
                {/* 메인 이미지 영역 */}
                <div className="absolute inset-0 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 grayscale hover:grayscale-0 transition-all duration-700">
                    {profile?.profileImageUrl ? (
                        <img src={profile.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                          <span className="text-sm tracking-widest">NO IMAGE</span>
                        </div>
                    )}
                    
                    {/* 이미지 위 그라데이션 오버레이 (텍스트 가독성용 아님, 분위기용) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>

                {/* 떠있는 키워드 카드 1 */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-6 bottom-32 bg-white/10 backdrop-blur-md border border-white/10 text-white p-4 rounded-xl shadow-xl z-20"
                >
                    <div className="text-xs text-slate-300 uppercase tracking-wider mb-1">Motto</div>
                    <div className="font-bold font-serif text-lg">No Regrets</div>
                </motion.div>

                {/* 떠있는 키워드 카드 2 */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -left-6 bottom-12 bg-blue-600 text-white p-4 rounded-xl shadow-xl z-20"
                >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🔥</div>
                      <div>
                        <div className="text-[10px] text-blue-200 uppercase tracking-wider">Energy Type</div>
                        <div className="font-bold text-lg">ESFP Leader</div>
                      </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}