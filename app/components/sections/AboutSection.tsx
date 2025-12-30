"use client";
import { motion } from "framer-motion";

export default function AboutSection({ profile }: { profile: any }) {
  
  // 1. 개발자로서의 성과 (Hard Skills)
  const achievements = [
    { 
      year: "2026.01 - Present", 
      title: "ETRI (한국전자통신연구원)", 
      desc: "자율형IoT연구실 연구원 동계인턴 (디지털융합연구소)" 
    },
    { 
      year: "2025.12", 
      title: "대상 (Grand Prize)", 
      desc: "디지털 바이오헬스 종합설계 경진대회 (홍익대 바이오헬스 혁신융합대학)" 
    },
    { 
      year: "2025.11", 
      title: "대상 (Grand Prize)", 
      desc: "충청권 ICT 이노베이션스퀘어 개발 역량 강화 멘토링 S/W 개발 분과" 
    },
    { 
      year: "2025.11", 
      title: "우수상 (Excellence Award)", 
      desc: "지역혁신 인재양성 연합 페스티벌 컨퍼런스 (한국정보통신보안윤리학회)" 
    },
    { 
      year: "2025.09", 
      title: "최우수상 (1st Prize)", 
      desc: "OpenCV Zoo 기반 머신러닝/딥러닝 영상분석 프로젝트" 
    },
    { 
      year: "Certifications", 
      title: "자격증 보유", 
      desc: "SQLD, 정보처리기사(필기), 워드 3급, 운전면허 2종" 
    },
  ];

  // 2. 리더로서의 역량 (Soft Skills)
  const leadership = [
    { 
      title: "운영 및 위기관리 (Operations)", 
      desc: "24-25년 신입생 OT/MT 총괄. 운송/숙박 업체 직접 계약 및 학교 승인 심사 통과. 수백 명 규모 인원 통솔 및 안전 관리 완수." 
    },
    { 
      title: "재정 투명성 (Transparency)", 
      desc: "매 학기 개강/종강총회를 개최하여 학생회비 사용 내역을 1원 단위까지 투명하게 공개하고 사업 성과를 브리핑." 
    },
    { 
      title: "문제 해결 (Problem Solving)", 
      desc: "사물함 노후화 불만 접수 즉시 업체 컨택 및 외관 보수 진행. 기말고사 기간 간식차 섭외로 학우 사기 진작." 
    },
    { 
      title: "기획력 (Planning)", 
      desc: "졸업발표회 기획 총괄. 강사 및 교수진 초청, 사회자 섭외, 타임테이블 구성을 주도하여 성공적인 행사 개최." 
    },
  ];

  // 3. 융합 역량 (Business Insight) - 내용을 정확하게 수정함
  const convergence = [
    {
      keyword: "Convergence Major",
      desc: "홍익대학교 빅데이터비즈니스 융합전공 이수. [SW개발 본전공 + 상경/광고홍보 + 빅데이터 심화] 커리큘럼을 통해 기술과 비즈니스의 접점을 학습했습니다."
    },
    {
      keyword: "Product Mindset",
      desc: "단순 구현을 넘어 '팔리는 서비스'를 고민합니다. 상경학부의 비즈니스 로직과 광고홍보학부의 사용자 중심 기획력을 개발에 적용합니다."
    }
  ];

  return (
    <section className="snap-section bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center py-10">
        
        {/* 상단 타이틀 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase mb-2 block">PROVEN TRACK RECORD</span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            High Performer <span className="text-slate-300 mx-2">&</span> Good Leader
          </h2>
        </motion.div>

        {/* 메인 그리드 (2열) - 높이 조절됨 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[50vh] lg:h-[55vh] mb-6">
          
          {/* 왼쪽: 개발 성과 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
          >
            <div className="p-5 pb-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 sticky top-0 z-10">
                <h3 className="text-lg font-bold flex items-center">
                <span className="bg-blue-600 text-white p-1.5 rounded-md mr-3 text-xs">HARD SKILL</span>
                Awards & Career
                </h3>
            </div>
            <div className="p-5 overflow-y-auto custom-scrollbar space-y-5">
              {achievements.map((item, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-600">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-50 dark:border-slate-800"></div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded mb-1 inline-block">
                    {item.year}
                  </span>
                  <h4 className="font-bold text-md leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 오른쪽: 리더십 경험 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-50 dark:bg-slate-800/50 rounded-3xl border border-indigo-100 dark:border-slate-700 overflow-hidden flex flex-col"
          >
            <div className="p-5 pb-2 border-b border-indigo-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 sticky top-0 z-10">
                <h3 className="text-lg font-bold flex items-center">
                <span className="bg-indigo-500 text-white p-1.5 rounded-md mr-3 text-xs">SOFT SKILL</span>
                Student Council President (2 Years)
                </h3>
            </div>
            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4">
              {leadership.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl shadow-sm border border-indigo-50 dark:border-slate-700">
                      <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-1 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                          {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                          {item.desc}
                      </p>
                  </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 하단: 융합 역량 (Business Insight) - 강조된 부분 */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-5 border border-slate-300 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6 shadow-sm"
        >
            <div className="flex-shrink-0 text-center md:text-left min-w-[180px]">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  Big Data Business
                </span>
                <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight">
                    Convergence<br/>Major
                </h3>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {convergence.map((item, i) => (
                    <div key={i}>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            {item.keyword}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
}