import {
  PortableText,
  type PortableTextBlock,
  type PortableTextBlockComponent,
  type PortableTextComponents,
  type PortableTextListComponent,
  type PortableTextListItemComponent,
  type PortableTextMarkComponent,
  type PortableTextTypeComponent,
} from "@portabletext/react";

type LinkMark = {
  _type: "link";
  _key?: string;
  href?: string;
  blank?: boolean;
};

type CodeBlock = {
  _type: "codeBlock" | "code";
  code?: string;
  filename?: string;
};

const NormalBlock: PortableTextBlockComponent = ({ children }) => (
  <p className="whitespace-pre-line leading-relaxed my-4">{children}</p>
);

const Heading1: PortableTextBlockComponent = ({ children }) => (
  <h1 className="mt-10">{children}</h1>
);

const Heading2: PortableTextBlockComponent = ({ children }) => (
  <h2 className="mt-10">{children}</h2>
);

const Heading3: PortableTextBlockComponent = ({ children }) => (
  <h3 className="mt-8">{children}</h3>
);

const Heading4: PortableTextBlockComponent = ({ children }) => (
  <h4 className="mt-6">{children}</h4>
);

const Blockquote: PortableTextBlockComponent = ({ children }) => (
  <blockquote className="border-l-4 border-slate-700 pl-4 italic text-slate-300">
    {children}
  </blockquote>
);

const BulletList: PortableTextListComponent = ({ children }) => (
  <ul className="list-disc pl-6">{children}</ul>
);

const NumberList: PortableTextListComponent = ({ children }) => (
  <ol className="list-decimal pl-6">{children}</ol>
);

const ListItem: PortableTextListItemComponent = ({ children }) => (
  <li className="my-1">{children}</li>
);

const LinkMarkComponent: PortableTextMarkComponent<LinkMark> = ({
  value,
  children,
}) => {
  const href = value?.href || "#";
  const isExternal = /^https?:\/\//.test(href);
  const openInNewTab = value?.blank ?? isExternal;

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

const InlineCode: PortableTextMarkComponent = ({ children }) => (
  <code className="px-1 py-0.5 rounded bg-slate-800 text-slate-100">
    {children}
  </code>
);

const CodeBlockComponent: PortableTextTypeComponent<CodeBlock> = ({ value }) => (
  <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto">
    {value.filename ? (
      <div className="text-xs text-slate-400 mb-2">{value.filename}</div>
    ) : null}
    <code>{value.code}</code>
  </pre>
);

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: NormalBlock,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    blockquote: Blockquote,
  },
  list: {
    bullet: BulletList,
    number: NumberList,
  },
  listItem: {
    bullet: ListItem,
    number: ListItem,
  },
  marks: {
    link: LinkMarkComponent,
    code: InlineCode,
  },
  types: {
    codeBlock: CodeBlockComponent,
    code: CodeBlockComponent,
  },
};

export function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={portableTextComponents} />;
}

export type { PortableTextBlock };