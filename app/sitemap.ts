import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

type ProjectEntry = { slug: string; updatedAt: string };

async function getProjects(): Promise<ProjectEntry[]> {
  try {
    return await client.fetch<ProjectEntry[]>(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    );
  } catch (error) {
    // Keep serving the home URL rather than failing the whole sitemap.
    console.error("Sitemap project fetch failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.thisnorm.dev";

  const projects = await getProjects();

  return [
    { url: `${base}/`, lastModified: new Date() },

    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
    })),
  ];
}
