import type { MetadataRoute } from "next";

export const revalidate = 3600;

// Only the home page is listed: the older Sanity project pages are no longer linked and are noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.thisnorm.dev/", lastModified: new Date() }];
}
