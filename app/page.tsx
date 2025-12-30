import { client } from "@/sanity/lib/client";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import TechStackSection from "./components/sections/TechStackSection";

export const dynamic = "force-dynamic";

const query = `{
  "profile": *[_type == "profile"][0]{
    name,
    role,
    intro,
    "profileImageUrl": profileImage.asset->url,
    skills,
    timeline
  },
  "projects": *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url, 
    link,
    tags, 
    "slug": slug.current 
  }
}`; 

export default async function Home() {
  const data = await client.fetch(query);
  const { profile, projects } = data;

  return (
    <div className="snap-container bg-slate-950 text-slate-100">
      <HeroSection profile={profile} />
      
      {/* 👇 정신 사나운 마퀴 대신 차분한 그리드 섹션으로 교체 */}
      <TechStackSection />

      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
      <ContactSection profile={profile} />
    </div>
  );
}