import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: '내 프로젝트',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '프로젝트 제목',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: '고유 주소 (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
       },
    }),
    defineField({
      name: 'startDate',
      title: '프로젝트 시작일',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      }
    }),
    defineField({
      name: 'image',
      title: '썸네일 이미지',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: '한 줄 소개',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: '사용 기술 (Tech Stack)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }], // 👈 핵심: 참조(Reference)로 변경
    }),
    defineField({
      name: 'content',
      title: '상세 설명 (트러블 슈팅 등)',
      type: 'array', 
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'link',
      title: '배포 링크',
      type: 'url',
    }),
  ],
})