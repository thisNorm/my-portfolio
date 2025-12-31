import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

interface ProjectDetail {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  content: any;
  _createdAt: string;
}

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "imageUrl": image.asset->url,
    link,
    "tags": tags[]->title,
    content,
    _createdAt
  }`;
  
  return client.fetch(query, { slug });
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params; 
  
  const project: ProjectDetail = await getProject(slug);

  if (!project) {
    return <div className="text-center py-20">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      <header className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            {project.description}
          </p>

          <div className="flex gap-4">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
              >
                서비스 방문하기 →
              </a>
            )}
            <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
                목록으로 돌아가기
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {project.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-16 shadow-2xl">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600">
          {project.content ? (
            <PortableText value={project.content} />
          ) : (
            <p className="text-slate-500">작성된 상세 내용이 없습니다.</p>
          )}
        </div>
      </div>
    </article>
  );
}