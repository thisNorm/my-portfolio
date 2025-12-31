import { client } from "@/sanity/lib/client";
import HeroSection from "./components/sections/HeroSection";
import TechStackSection from "./components/sections/TechStackSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";

export const dynamic = "force-dynamic";

const query = `{
  "profile": *[_type == "profile"][0]{
    name,
    role,
    "profileImageUrl": profileImage.asset->url,
    timeline
  },
  "projects": *[_type == "project"] | order(startDate desc) { 
      title,
      slug,
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
    <div className="snap-container bg-slate-950 text-slate-100">
      <HeroSection profile={profile} />
      <TechStackSection />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
      <ContactSection profile={profile} />
    </div>
  );
}