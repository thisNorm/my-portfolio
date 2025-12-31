import { client } from "@/sanity/lib/client";
import HeroSection from "./components/sections/HeroSection";
import TechStackSection from "./components/sections/TechStackSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import VisitorCounter from "./components/VisitorCounter";

export const dynamic = "force-dynamic";

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
  const data = await client.fetch(query).catch(() => ({ profile: null, projects: [] }));
  const { profile, projects } = data;

  return (
    <div className="snap-container bg-slate-950 text-slate-100 relative">
      <VisitorCounter />
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