import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project', // 코드에서 부를 이름
  title: '내 프로젝트', // 관리자 페이지에 보일 이름
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
      type: 'slug', // URL 주소로 쓸 것 (Generate 버튼 누르면 자동 생성됨)
      options: {
        source: 'title',
        maxLength: 96,
       },
    }),
    defineField({
      name: 'image',
      title: '썸네일 이미지',
      type: 'image',
      options: { hotspot: true }, // 이미지 중심점 맞추기 기능
    }),
    defineField({
      name: 'description',
      title: '한 줄 소개',
      type: 'text', // 긴 글 입력
    }),
    defineField({
      name: 'tags',
      title: '사용 기술 (Tech Stack)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // 태그 형태
      },
    }),
    defineField({
      name: 'content',
      title: '상세 설명 (트러블 슈팅 등)',
      type: 'array', 
      of: [{ type: 'block' }] // 이게 바로 서식 있는 텍스트(Rich Text)입니다
    }),
    defineField({
      name: 'link',
      title: '배포 링크',
      type: 'url',
    }),
  ],
})