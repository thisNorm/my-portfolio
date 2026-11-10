import type { MetadataRoute } from "next";
import { getProjectRecords } from "@/sanity/lib/project-records";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.thisnorm.dev";

  const projects = await getProjectRecords();

  return [
    { url: `${base}/`, lastModified: new Date() },

    ...projects.map((project) => ({
      url: `${base}/projects/${encodeURIComponent(project.slug)}`,
      lastModified: new Date(project.updatedAt),
    })),
  ];
}
