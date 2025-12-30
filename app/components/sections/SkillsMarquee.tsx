"use client";
import { motion } from "framer-motion";

const skills = [
  "Java", "Spring Boot", "JPA/Hibernate", "MySQL", "Redis", 
  "AWS", "Docker", "Python", "FastAPI", "Next.js", "TypeScript", 
  "Git", "Clean Architecture", "TDD"
];

export default function SkillsMarquee() {
  return (
    <div className="bg-blue-600 py-6 overflow-hidden relative z-20">
      {/* 왼쪽과 오른쪽 끝을 살짝 흐리게 해서 자연스럽게 보이게 함 */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-600 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-600 to-transparent z-10"></div>

      <div className="flex">
        <motion.div
          className="flex flex-nowrap gap-8 pr-8"
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 // 속도 조절 (숫자가 클수록 느림)
          }}
        >
          {/* 자연스러운 무한 루프를 위해 리스트를 두 번 반복 */}
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={i} className="text-2xl md:text-3xl font-black text-white/90 uppercase tracking-tighter whitespace-nowrap">
              {skill} <span className="text-blue-400 mx-2">•</span>
            </span>
          ))}
        </motion.div>
        
        {/* 끊기지 않게 뒤에 하나 더 붙여둠 */}
        <motion.div
          className="flex flex-nowrap gap-8 pr-8"
          animate={{ x: "-100%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20
          }}
        >
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={`dup-${i}`} className="text-2xl md:text-3xl font-black text-white/90 uppercase tracking-tighter whitespace-nowrap">
              {skill} <span className="text-blue-400 mx-2">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}