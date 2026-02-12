import { MetadataRoute } from "next";

type ProjectSlug = { slug: { current: string } };

async function getProjectSlugs(): Promise<string[]> {
  // ✅ Sanity 예시
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return [];

  const query = encodeURIComponent(`*[_type=="project" && defined(slug.current)]{ "slug": slug }`);
  const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = await res.json();
  const items: ProjectSlug[] = data?.result ?? [];
  return items.map((x) => x.slug.current).filter(Boolean);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://thisnorm.dev";

  const slugs = await getProjectSlugs();

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },

    ...slugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
    })),
  ];
}