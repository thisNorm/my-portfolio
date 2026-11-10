import type { Metadata } from "next";
import { getProjectRecords } from "@/sanity/lib/project-records";
import CareerSection from "./components/CareerSection";
import PortfolioHome from "./components/PortfolioHome";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const records = await getProjectRecords();
  const archiveLinks = records.map(({ slug, title }) => ({
    href: `/projects/${encodeURIComponent(slug)}`,
    title: title?.trim() || slug,
  }));
  return <PortfolioHome archiveLinks={archiveLinks} career={<CareerSection />} />;
}
