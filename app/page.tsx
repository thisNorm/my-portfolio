import type { Metadata } from "next";
import CareerSection from "./components/CareerSection";
import PortfolioHome from "./components/PortfolioHome";

// Career months are computed from today's date, so the static page is refreshed hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <PortfolioHome career={<CareerSection />} />;
}
