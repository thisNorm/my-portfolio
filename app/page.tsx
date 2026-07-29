import type { Metadata } from "next";
import PortfolioHome from "./components/PortfolioHome";

export const metadata: Metadata = {
  title: "황규범 | Backend Engineer · AI Systems & Automation",
  description:
    "백엔드와 인프라 경험을 기반으로 AI 에이전트, 자동화 워크플로우, 엣지 시스템을 실제 서비스에 연결하는 엔지니어 황규범의 포트폴리오입니다.",
};

export default function HomePage() {
  return <PortfolioHome />;
}
