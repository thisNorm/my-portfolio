import { defineType, defineArrayMember, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Strike", value: "strike-through" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineField({
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              defineField({
                title: "URL",
                name: "href",
                type: "url",
              }),
              defineField({
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),

    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),

    // ✅ 플러그인 없이 코드블록
    defineArrayMember({
      name: "codeBlock",
      title: "Code Block",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          initialValue: "text",
          options: {
            list: [
              { title: "Text", value: "text" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
              { title: "Java", value: "java" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "YAML", value: "yaml" },
            ],
          },
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 8,
        }),
        defineField({
          name: "filename",
          title: "Filename",
          type: "string",
        }),
      ],
    }),
  ],
});