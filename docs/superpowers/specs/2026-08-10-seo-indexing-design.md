# Search indexing normalization design

## Goal

Google이 동일한 포트폴리오를 여러 URL로 판단하지 않도록 공개 URL을 현재 Vercel 대표 주소인 `https://www.thisnorm.dev`로 통일하고, 사이트맵에 포함된 존재하지 않는 `/projects` URL을 제거한다.

## Confirmed causes

- Vercel은 `https://thisnorm.dev/*`를 `https://www.thisnorm.dev/*`로 리디렉션한다.
- 애플리케이션의 `metadataBase`, sitemap, robots는 apex 도메인인 `https://thisnorm.dev`를 사용한다.
- 홈 페이지에는 canonical이 없어 Google이 대표 URL을 추론해야 한다.
- sitemap은 `/projects`를 제출하지만 App Router에는 `app/projects/page.tsx`가 없어 운영 환경에서 404를 반환한다.

## Chosen behavior

- 공개 대표 주소는 현재 Vercel 설정과 일치하는 `https://www.thisnorm.dev`로 유지한다.
- 홈 페이지 canonical은 `https://www.thisnorm.dev/`로 출력한다.
- 프로젝트 상세 canonical과 Open Graph URL은 `metadataBase`를 통해 www 도메인으로 해석한다.
- robots가 가리키는 sitemap과 sitemap의 모든 URL은 www 도메인을 사용한다.
- `/projects`는 sitemap에서 제거한다.
- 기존 링크와 검색 기록을 보존하기 위해 `/projects` 요청은 홈의 프로젝트 섹션 `/#projects`로 영구 리디렉션한다.

## Files in scope

- `app/layout.tsx`: 대표 도메인 변경
- `app/page.tsx`: 홈 canonical 추가
- `app/sitemap.ts`: 대표 도메인 변경 및 `/projects` 제거
- `app/robots.ts`: sitemap 주소 변경
- `next.config.ts`: `/projects` 영구 리디렉션 추가
- `README.md`: 공개 웹사이트 주소를 대표 URL과 일치시킴

## Verification

- 정적 검증으로 각 metadata source가 www 도메인을 사용하고 `/projects`가 sitemap에서 제외되는지 확인한다.
- Next.js production build와 lint를 실행한다.
- 배포 후 HTTP 응답에서 다음을 확인한다.
  - `https://www.thisnorm.dev/`가 200과 www canonical을 반환한다.
  - `https://www.thisnorm.dev/projects`가 홈 프로젝트 섹션으로 영구 리디렉션한다.
  - sitemap에 apex 도메인 및 `/projects` 항목이 없다.
- Search Console의 과거 제외 기록은 즉시 삭제되지 않으므로 수정 검증을 요청하고 재크롤링을 기다린다.

## Out of scope

- 별도의 프로젝트 목록 페이지 신설
- Vercel 대표 도메인을 apex로 변경
- Search Console 과거 보고서 데이터 삭제
- 기존 `portfolio` 저장소의 코드 변경 또는 삭제
