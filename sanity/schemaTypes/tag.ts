import { defineType, defineField } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: '기술 태그 관리',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '기술 이름',
      type: 'string',
    }),
  ],
})