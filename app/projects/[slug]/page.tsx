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
    return <div className="text-center py-20 text-slate-100">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    // ✨ 배경을 slate-950으로 고정하여 어두운 테마 유지
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* 헤더 영역 */}
      <header className="border-b border-slate-800 pt-32 pb-12 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {/* 태그 영역 */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
            {project.title}
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex gap-4">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-900/20"
              >
                서비스 방문하기 →
              </a>
            )}
            <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all text-slate-300"
            >
                목록으로 돌아가기
            </Link>
          </div>
        </div>
      </header>

      {/* 본문 영역 */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        {project.imageUrl && (
          // ✨ 이미지 컨테이너: 높이 제한을 없애고(h-auto) 이미지가 잘리지 않게 함
          <div className="rounded-2xl overflow-hidden border border-slate-800 mb-16 shadow-2xl bg-slate-900">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-contain" 
            />
          </div>
        )}

        {/* 본문 내용 (Rich Text) - 다크 모드 스타일 적용 */}
        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400 prose-img:rounded-xl">
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