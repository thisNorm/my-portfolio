"use client";
import { motion } from "framer-motion";

export default function AboutSection({ profile }: { profile: any }) {
  const achievements = [
    { year: "2026.01 ~", title: "ETRI (한국전자통신연구원)", desc: "자율형IoT연구실 연구원 인턴" },
    { year: "2025.12", title: "대상 (Grand Prize)", desc: "디지털 바이오헬스 종합설계 경진대회" },
    { year: "2025.11", title: "대상 (Grand Prize)", desc: "충청권 ICT 이노베이션스퀘어 멘토링 S/W 개발" },
    { year: "2025.09", title: "최우수상 (1st Prize)", desc: "OpenCV Zoo 기반 머신러닝 영상분석 프로젝트" },
  ];

  return (
    <section className="snap-section bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center">
        
        <div className="mb-12">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-5xl font-black mb-8"
            >
                WHO AM I?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[320px]">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 bg-slate-100 dark:bg-slate-800 rounded-3xl p-6 flex flex-col justify-between"
                >
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile</span>
                        <h3 className="text-2xl font-bold mt-2">{profile?.name || "황규범"}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Backend Developer & Leader</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <div className="text-xs text-slate-500 uppercase">Born</div>
                            <div className="font-bold text-lg">2000 (27세)</div> 
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase">Location</div>
                            <div className="font-bold text-lg">Incheon / Daejeon</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-xs text-slate-500 uppercase">Education</div>
                            <div className="font-bold text-base leading-tight">
                                Hongik Univ.<br/>
                                <span className="text-sm font-medium text-slate-500">Software Convergence & Big Data Biz</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-indigo-600 text-white rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2">Personality</div>
                    <div className="text-5xl font-black mb-1">ESFP</div>
                    <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">자유로운 영혼의 연예인</div>
                    <p className="text-xs mt-4 opacity-80 leading-relaxed">
                        #에너지 #분위기메이커<br/>#리더십 #사람좋아함
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 flex flex-col justify-between border border-slate-200 dark:border-slate-700"
                >
                     <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Life</span>
                        <h3 className="text-lg font-bold mt-1">Sports Mania</h3>
                     </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-sm font-bold shadow-sm">🎳 볼링</span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-sm font-bold shadow-sm">🏀 농구</span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-sm font-bold shadow-sm">🏋️ 헬스</span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-700 rounded-lg text-sm font-bold shadow-sm">🏃 러닝</span>
                     </div>
                     <p className="text-xs text-slate-500 mt-4">"건강한 신체에 깃드는 긍정 에너지!"</p>
                </motion.div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[40vh]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 sticky top-0 z-10">
                <h3 className="text-lg font-bold flex items-center"><span className="bg-blue-600 text-white p-1 rounded mr-2 text-xs">HARD</span> Awards & Career</h3>
            </div>
            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4">
              {achievements.map((item, i) => (
                <div key={i} className="pl-4 border-l-2 border-slate-300 dark:border-slate-600 relative">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">{item.year}</span>
                  <h4 className="font-bold text-sm mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-indigo-50 dark:bg-slate-800/50 rounded-3xl border border-indigo-100 dark:border-slate-700 flex flex-col overflow-hidden">
             <div className="p-5 border-b border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 sticky top-0 z-10">
                <h3 className="text-lg font-bold flex items-center"><span className="bg-indigo-500 text-white p-1 rounded mr-2 text-xs">SOFT</span> Student Council (2 Years)</h3>
            </div>
            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-sm">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-700">
                    <h4 className="font-bold text-indigo-600 mb-1">🤝 운영 및 계약 (Operations)</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">OT/MT 총괄, 업체 직접 계약 및 학교 승인 심사 통과, 인원 통솔.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-700">
                    <h4 className="font-bold text-indigo-600 mb-1">💰 재정 투명성 (Transparency)</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">개강/종강총회에서 학생회비 사용 내역 1원 단위까지 공개.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-700">
                     <h4 className="font-bold text-indigo-600 mb-1">📢 문제 해결 (Problem Solving)</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-xs">사물함 노후화 해결 요청, 시험 기간 간식차 행사 기획.</p>
                </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-5 border border-slate-300 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6 shadow-sm"
        >
            <div className="flex-shrink-0 text-center md:text-left min-w-[180px]">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  Academic Background
                </span>
                <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight">
                    Software &<br/>Business
                </h3>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Dual Expertise
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        홍익대학교 [소프트웨어융합학과(주전공) + 빅데이터비즈니스(융합전공)]을 동시 이수하며, 공학적 깊이와 비즈니스적 넓이를 모두 갖췄습니다.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Product Mindset
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        단순 구현을 넘어 '팔리는 서비스'를 고민합니다. 상경학부의 비즈니스 로직과 광고홍보학부의 사용자 중심 기획력을 개발에 적용합니다.
                    </p>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}