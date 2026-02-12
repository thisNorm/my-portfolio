import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "내 프로젝트",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "프로젝트 제목",
      type: "string",
    }),

    // ✅ 추가: 상단 고정 토글
    defineField({
      name: "pinned",
      title: "상단 고정",
      type: "boolean",
      initialValue: false,
      description: "프로젝트 리스트에서 최상단에 고정됩니다.",
    }),

    defineField({
      name: "order",
      title: "정렬 우선순위",
      type: "number",
      description: "숫자가 작을수록 위에 표시됩니다. 비워두면 기본 정렬(startDate desc)을 따릅니다.",
      validation: (Rule) => Rule.min(1).integer(),
    }),

    defineField({
      name: "slug",
      title: "고유 주소 (Slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),

    defineField({
      name: "startDate",
      title: "프로젝트 시작일",
      type: "date",
      options: { dateFormat: "YYYY-MM" },
    }),

    defineField({
      name: "image",
      title: "썸네일 이미지",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "description",
      title: "한 줄 소개",
      type: "text",
    }),

    defineField({
      name: "tags",
      title: "사용 기술 (Tech Stack)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),

    defineField({
      name: "content",
      title: "상세 설명 (트러블 슈팅 등)",
      type: "blockContent",
    }),

    defineField({
      name: "link",
      title: "배포 링크",
      type: "url",
    }),
  ],
});