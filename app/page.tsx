import type { Metadata } from "next";
import PortfolioHome from "./components/PortfolioHome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <PortfolioHome />;
}
