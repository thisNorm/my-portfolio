import type { MetadataRoute } from "next";

export const revalidate = 3600;

// The site is a single page; the older /projects/* write-ups now redirect to /#projects.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.thisnorm.dev/", lastModified: new Date() }];
}
