import { client } from "@/sanity/lib/client";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";

// ⚡️ 중요: 캐시를 끄고 매번 최신 데이터를 가져오게 강제 설정
export const dynamic = "force-dynamic";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  slug: string;
}

const query = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  "imageUrl": image.asset->url,
  link,
  tags,
  "slug": slug.current
}`;

export default async function Home() {
  const projects: Project[] = await client.fetch(query);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight">
            <span className="text-blue-600 dark:text-blue-400">&lt;</span>
            Dev.thisNorm
            <span className="text-blue-600 dark:text-blue-400"> /&gt;</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/thisNorm"
              target="_blank"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <header className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
            Backend Focused Full Stack
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Scalable Systems, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Clean Architecture.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            단순히 작동하는 코드가 아닌, <strong>유지보수 가능하고 확장성 있는 시스템</strong>을 설계합니다.
            데이터 흐름을 이해하고 안정적인 백엔드 위에서 사용자 경험을 완성합니다.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Featured Projects
          <span className="text-sm font-normal text-slate-500 dark:text-slate-500 ml-2">
            ({projects.length})
          </span>
        </h2>

        {projects.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500">
            등록된 프로젝트가 없습니다. Sanity Studio에서 추가해주세요.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="group relative flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-600 font-mono text-sm">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                    View Project
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-600 text-sm">
        © 2024 Dev.thisNorm. Built with Next.js 14 & Sanity.
      </footer>
    </div>
  );
}