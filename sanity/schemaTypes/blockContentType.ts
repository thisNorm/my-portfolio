import { defineType, defineArrayMember, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",

      // ✅ 제목/인용 등(마크다운 헤딩/인용 대응)
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],

      // ✅ 리스트(불릿 + 번호)  ← 에러( number list ) 해결 포함
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],

      // ✅ 인라인 마크다운 문법 대응(굵게/기울임/취소선/인라인코드/하이라이트)
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },     // **bold**
          { title: "Emphasis", value: "em" },       // *italic*
          { title: "Strike", value: "strike-through" }, // ~~strike~~
          { title: "Code", value: "code" },         // `inline code`
          { title: "Underline", value: "underline" },   // underline
        ],
        annotations: [
          // 링크
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              defineField({
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.uri({ allowRelative: true }),
              }),
              defineField({
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              }),
            ],
          },

          // 코드블록이 아니라 "각주/참고 링크"처럼 쓰고 싶을 때(선택)
          {
            title: "Internal Anchor",
            name: "internalAnchor",
            type: "object",
            fields: [
              defineField({
                title: "Anchor ID",
                name: "id",
                type: "string",
                description: "예: troubleshooting, results",
              }),
            ],
          },
        ],
      },
    }),

    // ✅ 이미지 삽입(마크다운 이미지 대응)
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

    // ✅ 코드 블록(마크다운 ```code``` 대응)
    defineArrayMember({
      name: "code",
      title: "Code Block",
      type: "code",
      options: {
        withFilename: true,
      },
    }),
  ],
});