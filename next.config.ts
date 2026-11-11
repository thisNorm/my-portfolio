import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
      // The older Sanity project write-ups were removed; keep their links landing on the projects section.
      {
        source: "/projects/:slug",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
