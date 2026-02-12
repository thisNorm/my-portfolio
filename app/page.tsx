import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import HeroSection from "./components/sections/HeroSection";
import TechStackSection from "./components/sections/TechStackSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import VisitorCounter from "./components/VisitorCounter";

export const dynamic = "force-dynamic";

// ✅ (권장) 홈 페이지 메타데이터: layout 기본값을 덮어쓰진 않지만, 홈 의도 명확히
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const query = `{
  "profile": *[_type == "profile"][0]{
    name,
    role,
    "profileImageUrl": profileImage.asset->url,
    timeline
  },
  "projects": *[_type == "project"] | order(startDate desc) { 
      _id,
      title,
      "slug": slug.current,
      startDate,
      description,
      "tags": tags[]->title,
      content,
      link,
      "imageUrl": image.asset->url
    }
  }
`;

export default async function Home() {
  const data = await client
    .fetch(query)
    .catch(() => ({ profile: null, projects: [] as any[] }));
  const { profile, projects } = data;

  return (
    <div className="snap-container bg-slate-950 text-slate-100 relative">
      <VisitorCounter />

      {/* ✅ UI 영향 없이 검색용 키워드만 추가 */}
      <p className="sr-only">
        백엔드 개발자 포트폴리오. Node.js, NestJS, FastAPI 기반 서버 개발과 프로젝트 경험,
        이력서 및 연락처.
      </p>

      <HeroSection profile={profile} />
      <TechStackSection />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />

      <div className="relative z-30 bg-slate-950">
        <ContactSection profile={profile} />
      </div>
    </div>
  );
}