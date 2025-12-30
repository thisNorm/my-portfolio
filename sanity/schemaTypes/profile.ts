import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: '내 정보 (Profile)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: '직무 (예: Backend Developer)',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: '프로필 사진',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'intro',
      title: '한 줄 소개',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'skills',
      title: '보유 기술 (쉼표로 구분 없이 엔터로 입력)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'timeline',
      title: '경력 및 경험 (Timeline)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'period', title: '기간 (예: 2023.01 - 2024.01)', type: 'string' },
            { name: 'company', title: '소속/기관', type: 'string' },
            { name: 'role', title: '역할/직책', type: 'string' },
            { name: 'desc', title: '설명', type: 'text' },
          ],
        },
      ],
    }),
  ],
})