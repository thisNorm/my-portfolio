import { client } from "./client";

type ProjectRecord = { slug: string; title: string | null; updatedAt: string };

export async function getProjectRecords(): Promise<ProjectRecord[]> {
  try {
    return await client.fetch<ProjectRecord[]>(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current, title, "updatedAt": _updatedAt }`,
    );
  } catch (error) {
    // The home page and sitemap can still serve without the archive.
    console.error("Project records fetch failed:", error);
    return [];
  }
}
