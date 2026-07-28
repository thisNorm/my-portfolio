import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  PortableTextContent,
  type PortableTextBlock,
} from "@/app/components/PortableTextContent";

interface ProjectDetail {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  tags?: string[];
  content?: PortableTextBlock[];
  _createdAt: string;
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string): Promise<ProjectDetail | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "imageUrl": image.asset->url,
    link,
    "tags": tags[]->title,
    content,
    _createdAt
  }`;

  return client.fetch<ProjectDetail | null>(query, { slug });
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "?꾨줈?앺듃瑜?李얠쓣 ???놁뒿?덈떎",
      description: "議댁옱?섏? ?딅뒗 ?꾨줈?앺듃?낅땲??",
      alternates: { canonical: "/projects" },
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${slug}`,
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="text-center py-20 text-slate-100">
        ?꾨줈?앺듃瑜?李얠쓣 ???놁뒿?덈떎.
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <header className="border-b border-slate-800 pt-32 pb-12 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
            {project.title}
          </h1>

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
                ?쒕퉬??諛⑸Ц?섍린 ??              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all text-slate-300"
            >
              紐⑸줉?쇰줈 ?뚯븘媛湲?            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {project.imageUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 mb-16 shadow-2xl bg-slate-900">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-400 prose-img:rounded-xl">
          {project.content ? (
            <PortableTextContent value={project.content} />
          ) : (
            <p className="text-slate-500">?묒꽦???곸꽭 ?댁슜???놁뒿?덈떎.</p>
          )}
        </div>
      </div>
    </article>
  );
}