import type { Metadata } from "next";
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

// ✅ 프로젝트별 SEO 메타데이터 생성
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project: ProjectDetail | null = await getProject(params.slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
      description: "존재하지 않는 프로젝트입니다.",
      alternates: { canonical: "/projects" },
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${params.slug}`,
      images: project.imageUrl
        ? [{ url: project.imageUrl, width: 1200, height: 630 }]
        : undefined,
      type: "article",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="mt-10">{children}</h1>,
    h2: ({ children }: any) => <h2 className="mt-10">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mt-8">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mt-6">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-slate-700 pl-4 italic text-slate-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="my-1">{children}</li>,
    number: ({ children }: any) => <li className="my-1">{children}</li>,
  },
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      const blank = value?.blank ?? isExternal;

      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    code: ({ children }: any) => (
      <code className="px-1 py-0.5 rounded bg-slate-800 text-slate-100">
        {children}
      </code>
    ),
  },
  types: {
    // ✅ 플러그인 없이 만든 codeBlock(_type: "codeBlock") 대응
    codeBlock: ({ value }: any) => (
      <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto">
        {value?.filename ? (
          <div className="text-xs text-slate-400 mb-2">{value.filename}</div>
        ) : null}
        <code>{value?.code}</code>
      </pre>
    ),

    // ✅ 기존에 _type:"code" 데이터가 남아있는 경우도 안전하게 렌더링
    code: ({ value }: any) => (
      <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project: ProjectDetail | null = await getProject(slug);

  if (!project) {
    return (
      <div className="text-center py-20 text-slate-100">
        프로젝트를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 헤더 영역 */}
      <header className="border-b border-slate-800 pt-32 pb-12 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {/* 태그 영역 */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
            {project.title}
          </h1>

          {/* ✅ 줄바꿈 반영 */}
          <p className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed whitespace-pre-line">
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
              href="/projects"
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
          <div className="rounded-2xl overflow-hidden border border-slate-800 mb-16 shadow-2xl bg-slate-900">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400 prose-img:rounded-xl">
          {project.content ? (
            <PortableText value={project.content} components={portableTextComponents} />
          ) : (
            <p className="text-slate-500">작성된 상세 내용이 없습니다.</p>
          )}
        </div>
      </div>
    </article>
  );
}