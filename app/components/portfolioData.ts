import type { CareerPeriod } from "../lib/career";

// Approved portfolio copy. Keep project roles and evidence in sync with the resume.
export type ProjectId = 'finance' | 'facegate' | 'autoci' | 'tailscale' | 'harnessvault' | 'aegisview' | 'pinmate' | 'content' | 'sns' | 'deepvoice';
export type ProjectFilter = 'all' | 'automation' | 'ai' | 'service';
export type ProjectMedia = { src: string; width: number; height: number; alt: string; caption: string };
export type Project = {
  id: ProjectId; name: string; category: string; status: string; role: string;
  summary: string; problem: string; solution: string; evidence: string;
  stack: string[]; github: string | null; filter: Exclude<ProjectFilter, 'all'>;
  tagline: string; coverCaption: string;
  icon?: string; media?: ProjectMedia[]; liveUrl?: string;
  developmentNote?: ProjectNote; secondNote?: ProjectNote;
  metric?: { before: number; after: number; unit: string; label: string };
  // Home redesign: one-line outcome, short card copy, and the "what left human hands" split.
  headline?: string; brief?: string;
  split?: { label: string; text: string }[];
  pipeline?: { who: "human" | "code" | "ai" | "gate"; title: string; detail: string }[];
};
export type ProjectNote = { label: string; title?: string; body: string };
// Every skill names where it was used; `href` points at the section on the home page.
export type SkillUse = { label: string; href: string };
export type Skill = { name: string; logos?: string[]; note?: string; where: SkillUse[] };
type SkillGroups = { primary: Skill[]; secondary: Skill[]; models: Skill[]; tools: string[] };
export type Award = { date: string; title: string; org: string; note: string; image?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number };
type Portfolio = {
  projects: Project[];
  tools: {name: string; problem: string; state: string; github: string | null; image?: ProjectMedia}[];
  jobs: (CareerPeriod & { company: string; role: string; summary: string; contributions: { title: string; description: string }[] })[];
  skills: SkillGroups;
  awards: Award[];
  education: {title: string; note: string}[];
  contact: {email: string; github: string; blog: string; resume: string};
};

const use = {
  field: { label: "실무", href: "#field" },
  hv: { label: "HarnessVault", href: "#harnessvault-details" },
  ca: { label: "Content Agent", href: "#content-details" },
  fg: { label: "FaceGate", href: "#facegate-details" },
  dv: { label: "DeepVoice", href: "#deepvoice-details" },
  av: { label: "AegisView", href: "#aegisview-details" },
  ci: { label: "AutoCI", href: "#autoci-details" },
  ts: { label: "Tailscale 모니터링", href: "#tailscale-details" },
  fin: { label: "알아서", href: "#finance-details" },
  pm: { label: "PinMate", href: "#pinmate-details" },
} satisfies Record<string, SkillUse>;

export const portfolio: Portfolio = {
  "projects": [
    {
      "id": "finance",
      "name": "알아서",
      "category": "개인 재무 에이전트",
      "status": "로컬 앱",
      "role": "1인 개발",
      "summary": "수입·지출·보유 자산을 모아 결제 계획과 예산 변경안을 제안하는 개인 재무 도구입니다.",
      "problem": "카드·계좌·증권에 흩어진 정보를 모아 결제 방법과 예산 조정안을 판단할 필요가 있었습니다.",
      "solution": "금액·잔액·할부 계산은 서버 코드가 맡고, AI는 의도 해석·거래 분류·설명을 맡습니다. 대화로 요청한 변경안은 적용 전후를 먼저 비교합니다.",
      "evidence": "금융 자료는 로컬에 저장합니다. 화면의 금융 데이터는 공개 README에 사용된 예시이며, 계산 결과와 AI 설명을 분리해 처리합니다.",
      "stack": [
        "JavaScript",
        "MCP",
        "LLM"
      ],
      "github": "https://github.com/thisNorm/finance-agent",
      "filter": "automation",
      "tagline": "흩어진 재무 정보를 한곳으로.",
      "coverCaption": "실제 앱 UI · 공개 README의 예시 금융 데이터",
      "icon": "/portfolio/projects/finance-icon.png",
      "media": [
        {
          "src": "/portfolio/projects/finance-plan.png",
          "width": 1280,
          "height": 860,
          "alt": "이번 달 계획과 대화 기반 예산 변경안을 보여 주는 알아서 앱 화면",
          "caption": "실제 앱 UI · 공개 README의 예시 금융 데이터"
        },
        {
          "src": "/portfolio/projects/finance-mobile-chat.png",
          "width": 780,
          "height": 1688,
          "alt": "대화로 예산 변경안을 확인하는 알아서 모바일 화면",
          "caption": "모바일 앱 UI · 예시 금융 데이터"
        }
      ],
      "brief": "카드·계좌·증권 내역을 모아 결제 계획과 예산 변경안을 제안합니다. 계산은 서버 코드, 해석과 설명은 AI가 맡습니다.",
      "developmentNote": {
        "label": "시행착오",
        "body": "할부 계산을 AI에 맡겼더니 같은 조건에서 답이 달라졌습니다. 금액 계산을 서버 규칙으로 옮기고, 카드 승인액과 카드 대금이 두 번 잡히던 문제도 내역 용도를 나눠 풀었습니다."
      }
    },
    {
      "id": "facegate",
      "name": "FaceGate",
      "category": "현장 엣지 AI",
      "status": "사내 PoC",
      "role": "1인 개발",
      "summary": "SCRFD 검출 모델을 RKNN·INT8로 변환해 단말 NPU에서 실행합니다. 인식은 CPU에 남기고 기존 API 형식으로 출입 서버와 연결했습니다.",
      "problem": "얼굴인식 API와 게이트 제어를 연결하고, 상시 실행되는 얼굴 검출의 단말 CPU 부담을 줄일 필요가 있었습니다.",
      "solution": "SCRFD 얼굴 검출 모델을 RKNN·INT8로 변환해 Android 단말의 NPU에서 실행합니다. 얼굴 인식은 CPU에 유지하고, 기존 API 형식으로 출입 서버와 연결합니다.",
      "evidence": "저장 장면 44장에서 CPU·NPU의 사람 판정이 같았습니다. 검출 장면만 잰 사내 PoC 기록이며, 출입 전체 응답이나 모든 환경의 정확도가 아닙니다.",
      "metric": {
        "before": 305,
        "after": 23,
        "unit": "ms",
        "label": "얼굴 검출 장면 처리 · NPU INT8"
      },
      "stack": [
        "TypeScript",
        "Android",
        "RKNN"
      ],
      "github": "https://github.com/thisNorm/facegate",
      "filter": "ai",
      "tagline": "모델의 판단을 출입 단말에서도.",
      "coverCaption": "게이트 단말 대기 화면 · 예시 인물",
      "media": [
        {
          "src": "/portfolio/projects/facegate-terminal.png",
          "width": 1448,
          "height": 1086,
          "alt": "얼굴 위치 안내와 방문객 호출·QR 버튼이 보이는 FaceGate 단말 대기 화면",
          "caption": "FaceGate README의 게이트 단말 대기 화면 · 예시 인물"
        }
      ],
      "headline": "AI팀의 얼굴 인식을 Android 출입 단말에 붙이고, 상시 실행되는 얼굴 검출을 NPU로 옮겼습니다",
      "developmentNote": {
        "label": "시행착오",
        "title": "검출만 바꿔 비교한 이유",
        "body": "목표는 단말에서 계속 도는 검출의 부하를 줄이는 것이었습니다. 그래서 검출만 NPU로 옮기고 인식과 출입 연동은 기존 경로에 남겨, 바꾼 것 하나의 효과만 보이게 했습니다."
      }
    },
    {
      "id": "autoci",
      "name": "Air-gapped AutoCI",
      "category": "폐쇄망 CI/CD 자동화",
      "status": "PoC",
      "role": "2인 팀 리드",
      "summary": "폐쇄망에서 로컬 LLM으로 CI 설정을 생성합니다.",
      "problem": "폐쇄망에서도 CI 설정 생성부터 검증·반영까지 자동화할 필요가 있었습니다.",
      "solution": "로컬 LLM이 만든 CI 설정을 샌드박스에서 실행합니다. Smoke test를 통과한 설정만 GitLab Runner에 반영합니다.",
      "evidence": "샌드박스 실행과 smoke test를 통과한 설정만 GitLab Runner에 반영합니다.",
      "stack": [
        "Python",
        "GitLab CI",
        "Docker",
        "Ollama"
      ],
      "github": "https://github.com/thisNorm/Air-gapped_DevOps",
      "filter": "automation",
      "tagline": "폐쇄망에서도 반복 설정을 줄이도록.",
      "coverCaption": "샌드박스 검증 흐름의 개념도",
      "brief": "폐쇄망에서 로컬 LLM이 CI 설정을 만들고, 샌드박스 실행과 smoke test를 통과한 설정만 GitLab Runner에 반영합니다.",
      "developmentNote": {
        "label": "한계",
        "body": "Gemma 계열 모델은 GitLab CI용 YAML을 안정적으로 만들지 못했습니다. 실패한 설정은 격리 환경에서 걸렀지만, 생성 품질 자체는 남은 과제입니다."
      }
    },
    {
      "id": "tailscale",
      "name": "Tailscale 모니터링",
      "category": "사내 운영 자동화",
      "status": "사무실 장비 39대 관리 중",
      "role": "1인 개발",
      "summary": "장비 이름·태그 규칙과 설정 변경을 확인하고, 이력을 웹과 Slack·Telegram으로 전달합니다.",
      "problem": "현장과 사무실 장비가 늘면서 이름·태그가 제각각이 되었고, 공유 계정의 설정 변경을 뒤늦게 알게 됐습니다.",
      "solution": "Tailscale API에서 장비와 설정 변경을 수집해 규칙을 검사합니다. 변경 이력과 알림, 암호화된 연동 설정, 웹 업데이트 흐름을 구현했습니다.",
      "evidence": "사무실의 Tailscale 장비 39대를 관리하는 데 쓰고 있습니다. 공유 계정의 변경자는 해당 계정 단위까지만 식별됩니다. 공개 화면은 실제 사내 장비 대신 저장소의 가상 장비 데모를 사용했습니다.",
      "stack": [
        "Node.js",
        "SQLite",
        "Tailscale API",
        "Slack",
        "Telegram"
      ],
      "github": "https://github.com/thisNorm/tailscale-monitor",
      "filter": "automation",
      "tagline": "누군가 바꾼 장비 설정, 먼저 알 수 있도록.",
      "coverCaption": "실제 웹 UI · 가상 장비와 예시 이력",
      "media": [
        {
          "src": "/portfolio/projects/tailscale-demo.png",
          "width": 1280,
          "height": 901,
          "alt": "가상 장비의 태그 위반과 변경 이력을 표시한 Tailscale 모니터링 데모",
          "caption": "실제 웹 UI · 저장소의 가상 장비 데모"
        }
      ],
      "brief": "장비가 늘며 이름·태그가 제각각이 되고, 공유 계정의 설정 변경을 뒤늦게 알게 됐습니다. 사무실 장비 39대의 규칙 검사와 변경 이력을 자동으로 돌리고 Slack·Telegram으로 알립니다.",
      "developmentNote": {
        "label": "한계",
        "body": "공유 계정만 남으면 실제로 조작한 사람은 특정할 수 없었습니다. 대신 어떤 장비가 바뀌었고 규칙을 어겼는지를 기록해 알립니다."
      }
    },
    {
      "id": "harnessvault",
      "name": "HarnessVault",
      "category": "AI 거버넌스",
      "status": "MVP",
      "role": "1인 개발",
      "summary": "Codex나 Claude Code가 회사 영역에 들어오면 사용자를 식별하고, 회사 Harness를 내려주고, 권한을 판정하고, 필요하면 사람 승인을 받고, 실행을 감사 로그로 남깁니다. 새로 발견한 재사용 지식은 승인을 거쳐 조직 Harness로 돌아갑니다.",
      "problem": "개인이 만든 AI 하네스를 회사와 팀이 함께 활용할 조직 자산으로 남길 필요가 있었습니다.",
      "solution": "회사 자원은 MCP로 읽기 전용 연결합니다. 하네스 기여는 승인 후 반영하도록 별도 흐름으로 구성했습니다.",
      "evidence": "회사 자원은 읽기 전용으로 연결하며, 하네스 기여는 별도 승인 후 반영합니다.",
      "stack": [
        "NestJS",
        "Next.js",
        "pgvector",
        "MCP"
      ],
      "github": "https://github.com/thisNorm/HarnessVault",
      "filter": "ai",
      "tagline": "AI 하네스를 조직에 남기는 방법.",
      "coverCaption": "실제 개발 화면 일부 · MVP · 테스트 데이터",
      "media": [
        {
          "src": "/portfolio/harnessvault-dev.png",
          "width": 1280,
          "height": 900,
          "alt": "HarnessVault 자산 목록의 실제 MVP 개발 화면",
          "caption": "실제 개발 화면 · MVP · 테스트 데이터"
        }
      ],
      "headline": "개인이 쓰는 AI 도구를 회사 안에서 안전하게 쓰고, 잘 쓴 방법을 조직에 남기는 플랫폼",
      "split": [
        {
          "label": "사람 손에서 뺀 것",
          "text": "회사 자원을 찾아 AI에 붙이는 일. 에이전트가 MCP 툴로 회사 파일·DB·Git을 직접 읽습니다."
        },
        {
          "label": "AI에 맡기지 않은 것",
          "text": "권한·승인·정책 판단. 위험한 작업은 서버의 승인 상태가 APPROVED일 때만 실행되고, 접속 정보는 AI에 넘기지 않습니다."
        },
        {
          "label": "검증",
          "text": "기능별 e2e 17개. 마지막 스위트는 가입부터 다른 사용자가 다른 AI로 재사용하기까지 Mock 없이 돌고, 승인도 다른 계정이 실제로 합니다."
        }
      ],
      "developmentNote": {
        "label": "설계에서 막은 것",
        "title": "관리자가 앱 자신의 DB를 열 수 없게 했습니다",
        "body": "회사 DB 접속 정보는 저장하지 않고 환경변수 이름만 남깁니다. 그런데 이름을 아무거나 받으면 조직 관리자가 이 앱의 DATABASE_URL을 지정해 앱 자신의 DB를 열 수 있습니다. 그래서 이름이 HARNESS_RESOURCE_로 시작해야만 연결되게 막았습니다."
      }
    },
    {
      "id": "aegisview",
      "name": "AegisView",
      "category": "ETRI 연구연수",
      "status": "",
      "role": "1인 개발",
      "summary": "CCTV 탐지 이벤트와 로봇 원격 조종을 폐쇄망에서 통합합니다.",
      "problem": "폐쇄망에서 CCTV 탐지 이벤트와 로봇 원격 조종을 한곳에서 다룰 관제가 필요했습니다.",
      "solution": "Redis Queue·DLQ로 탐지 이벤트를 처리하고 이벤트를 묶어 DB에 저장합니다. 로봇 제어 통신에는 aiohttp 비동기 처리를 적용했습니다.",
      "evidence": "ETRI 자율형IoT연구실에서 1인 개발했습니다.",
      "stack": [
        "YOLOv8",
        "FastAPI",
        "C#",
        "Redis"
      ],
      "github": "https://github.com/thisNorm/lab-guardian",
      "filter": "ai",
      "tagline": "영상 수집부터 로봇 제어까지, 하나의 시스템에.",
      "coverCaption": "공개 README의 실제 개발 데모",
      "media": [
        {
          "src": "/portfolio/aegisview.png",
          "width": 3838,
          "height": 2085,
          "alt": "CCTV·로봇 통합 관제와 이벤트 처리를 보여 주는 AegisView 개발 데모",
          "caption": "공개 README의 실제 개발 데모"
        }
      ],
      "brief": "폐쇄망에서 CCTV 탐지 이벤트와 로봇 원격 조종을 한곳에 연결했습니다. 이벤트는 Redis Queue·DLQ로 처리해 묶어 저장합니다.",
      "developmentNote": {
        "label": "한계와 배운 점",
        "body": "두 객체가 완전히 겹쳤다 흩어지면 ID를 이어 가지 못했습니다. 이후 스마트돈사 영상을 논의하며 위에서 내려다보는 카메라로 가림을 줄인다는 설명을 듣고, 추적 코드만이 아니라 촬영 각도와 식별 정보도 함께 봐야 한다는 걸 배웠습니다."
      }
    },
    {
      "id": "pinmate",
      "name": "PinMate",
      "category": "팀 웹 서비스",
      "status": "배포 완료",
      "role": "3인 팀 리드",
      "summary": "친구끼리 맛집 목록을 한 지도에 모으는 웹 서비스입니다.",
      "problem": "친구끼리 가진 맛집 목록을 하나의 지도에서 모아 볼 필요가 있었습니다.",
      "solution": "맛집 목록을 한 지도에 모으는 서비스를 개발·배포했습니다. 주제를 제안하고 브랜치·PR 규칙과 CI를 구성했습니다.",
      "evidence": "3인 팀 리드로 주제 제안, 브랜치·PR 규칙과 CI 구성을 맡았습니다. 배포된 웹서비스에서 지도와 길찾기 화면을 공개합니다.",
      "stack": [
        "React",
        "Spring Boot",
        "PostgreSQL"
      ],
      "github": "https://github.com/ChungcheongVibe/PinMate",
      "filter": "service",
      "tagline": "친구의 맛집 목록이 한 지도에서 만납니다.",
      "coverCaption": "공식 브랜드 이미지 · 서비스 배포 완료",
      "liveUrl": "https://pinmate.kro.kr/",
      "icon": "/portfolio/projects/pinmate-icon.png",
      "media": [
        {
          "src": "/portfolio/projects/pinmate-brand.png",
          "width": 1200,
          "height": 630,
          "alt": "PinMate 공식 심볼과 친구들과 함께 만드는 지도 소개 이미지",
          "caption": "저장소의 공식 브랜드 이미지"
        }
      ],
      "brief": "친구끼리 맛집 목록을 한 지도에 모으는 서비스입니다. 주제를 제안했고 브랜치·PR 규칙과 CI를 구성했습니다.",
      "developmentNote": {
        "label": "시행착오",
        "body": "같은 장소를 동시에 등록하면 중복 핀이 생겼습니다. 카카오 장소 ID 또는 이름과 거리로 대조하고, DB 잠금과 고유 제약으로 막았습니다."
      }
    },
    {
      "id": "content",
      "name": "Content Agent",
      "category": "콘텐츠 자동화",
      "status": "블로그 글 6편 발행",
      "role": "1인 개발",
      "summary": "노션 초안부터 각색·썸네일·티스토리·X 발행까지 연결하는 콘텐츠 파이프라인입니다.",
      "problem": "노션 초안 각색, 썸네일 제작과 채널별 발행을 한 흐름으로 묶을 필요가 있었습니다.",
      "solution": "초안 각색부터 썸네일과 채널 발행까지 파이프라인으로 연결했습니다. 검증에 실패하면 발행을 중단합니다.",
      "evidence": "노션 초안에서 티스토리·X 발행까지 처리하며, 검증 실패 시 발행을 멈추는 동작을 구현했습니다.",
      "stack": [
        "TypeScript",
        "Claude",
        "Gemini"
      ],
      "github": "https://github.com/thisNorm/content-agent",
      "filter": "automation",
      "tagline": "매번 하던 발행 작업을 하나의 흐름으로.",
      "coverCaption": "발행 흐름의 개념 그래픽 · 검증 실패 시 중단",
      "headline": "노션에 글만 쓰면 블로그 편집, 썸네일, 티스토리·X 발행까지 이어지는 파이프라인",
      "split": [
        {
          "label": "사람 손에서 뺀 것",
          "text": "티스토리 편집, 썸네일 제작, 채널별 발행, 실행 기록."
        },
        {
          "label": "AI에 맡기지 않은 것",
          "text": "제목·HTML 구조·X 초안은 로컬 규칙으로 만듭니다. AI는 문체 각색(Claude)과 썸네일 이미지(Gemini)만 맡습니다."
        },
        {
          "label": "검증",
          "text": "기본 실행은 실제로 발행하지 않는 dry-run입니다. 각색 뒤 표식이 하나라도 빠지면 발행하지 않습니다."
        }
      ],
      "developmentNote": {
        "label": "시행착오",
        "title": "각색하면서 코드와 이미지 표시를 지키는 방법",
        "body": "AI로 각색하면 코드 블록과 이미지 위치 표시가 바뀔 수 있었습니다. 각색 전에 임시 표식으로 바꾸고, 표식이 하나라도 빠지거나 소제목이 지나치게 줄면 발행을 멈춥니다. 검증을 통과한 글에만 원래 블록을 되돌립니다."
      },
      "pipeline": [
        {
          "who": "human",
          "title": "노션 페이지",
          "detail": "원고 작성"
        },
        {
          "who": "code",
          "title": "본문·메타데이터 파싱",
          "detail": "fetchPostFromPage"
        },
        {
          "who": "code",
          "title": "제목·HTML 구조·X 초안",
          "detail": "로컬 규칙 · AI 토큰 없음"
        },
        {
          "who": "ai",
          "title": "블로그 문체로 각색",
          "detail": "Claude"
        },
        {
          "who": "gate",
          "title": "표식 보존 검증",
          "detail": "하나라도 빠지면 여기서 중단"
        },
        {
          "who": "ai",
          "title": "1280×720 썸네일",
          "detail": "Gemini 이미지 + sharp 합성"
        },
        {
          "who": "code",
          "title": "티스토리 발행",
          "detail": "Playwright"
        },
        {
          "who": "code",
          "title": "X 포스팅",
          "detail": "X API v2"
        },
        {
          "who": "code",
          "title": "노션에 실행 로그",
          "detail": "appendRunLogToPage"
        }
      ]
    },
    {
      "id": "sns",
      "name": "SNS 성장 실험",
      "category": "SNS 운영",
      "status": "운영 중인 실험",
      "role": "1인 운영",
      "summary": "대화 종료 기준을 둔 AI 댓글 에이전트로 계정 성장 여부를 관찰하는 실험입니다.",
      "problem": "AI 댓글 에이전트를 활용한 계정 운영에서 실제 성장 여부를 확인할 필요가 있었습니다.",
      "solution": "Threads·LinkedIn에서 대화 종료 기준을 둔 AI 댓글 에이전트를 운영합니다. 선팔·맞팔 없이 기간별 변화를 비교했습니다.",
      "evidence": "과거 13일 비교에서 팔로워 증가 +2명과 +22명을 기록했습니다. 현재 수치나 AI 댓글의 인과 효과를 확정한 결과는 아닙니다.",
      "stack": [
        "Agent",
        "Threads",
        "LinkedIn"
      ],
      "github": null,
      "filter": "service",
      "tagline": "자동화한 대화와 계정의 변화를 관찰합니다.",
      "coverCaption": "AI 댓글 에이전트의 대화 종료 기준을 실험"
    },
    {
      "id": "deepvoice",
      "name": "DeepVoice Shield",
      "category": "온디바이스 AI",
      "status": "대상 2회",
      "role": "팀 프로젝트 · 백엔드·배포 담당",
      "summary": "저는 NestJS 백엔드와 AWS 배포를 맡았습니다.",
      "problem": "기본 전화 앱에서 통화 중 딥보이스를 탐지하려 했지만, Android의 통화 음성 접근 제한에 막혀 프로젝트를 계속할 방법을 다시 찾아야 했습니다.",
      "solution": "통화 중 탐지가 가능하다는 걸 보여 주는 데 집중해, 자체 VoIP 통화 앱에서 시연하자고 제안했습니다. 팀이 앱을 만들었고, 저는 백엔드와 배포를 맡았습니다.",
      "evidence": "1년 동안 팀 프로젝트를 이어 갔고, 완성한 VoIP 앱에서 통화 중 딥보이스 탐지를 시연했습니다. 디지털 바이오헬스 종합설계 경진대회와 충청권 ICT S/W 개발 분과에서 대상을 받았습니다.",
      "stack": [
        "NestJS",
        "MySQL",
        "AWS"
      ],
      "github": "https://github.com/thisNorm/deepfake_detection_service_backend",
      "filter": "ai",
      "tagline": "온디바이스 딥보이스 탐지 앱의 백엔드·배포.",
      "coverCaption": "공개 앱 소개 저장소의 실제 화면 · 시연 결과",
      "icon": "/portfolio/projects/deepvoice-logo.png",
      "media": [
        {
          "src": "/portfolio/projects/deepvoice-main.png",
          "width": 663,
          "height": 1466,
          "alt": "DeepVoice Detection 모바일 앱의 메인 화면",
          "caption": "공개 앱 소개 저장소의 실제 메인 화면"
        },
        {
          "src": "/portfolio/projects/deepvoice-result.png",
          "width": 711,
          "height": 1602,
          "alt": "DeepVoice Detection 앱의 탐지 결과 시연 화면",
          "caption": "실제 앱 UI · 탐지 결과 예시"
        }
      ],
      "headline": "통화 중 딥보이스를 휴대폰 안에서 탐지하는 앱. 막혔을 때 시연 방향을 다시 잡았습니다",
      "developmentNote": {
        "label": "막힌 지점과 제 제안",
        "title": "기본 전화 앱에서는 통화 음성에 접근할 수 없었습니다",
        "body": "당시 Android의 통화 음성 접근 제약으로 팀이 포기를 고민했습니다. 목표는 통화 중 탐지가 동작함을 보여 주는 것이었기에, 자체 VoIP 통화 앱에서 시연하자고 제안했습니다."
      },
      "split": [
        { "label": "백엔드에서 만든 것", "text": "JWT 인증과 역할별 권한, 1:1 통화를 위한 WebRTC 시그널링(Socket.IO)을 만들었습니다." },
        { "label": "AI와 연결한 부분", "text": "앱이 올린 음성 파일을 AI 추론 서버(FastAPI)로 넘겨 결과를 돌려주고, 통화 중 탐지 확률을 상대방에게 실시간으로 전달합니다." },
        { "label": "배포", "text": "NestJS 서버와 MySQL을 AWS에 배포했습니다." }
      ],
      "secondNote": {
        "label": "제 역할과 팀 성과",
        "title": "추론 지연이 병목일 때 경량화를 제안했습니다",
        "body": "방법을 비교할 근거 논문을 찾아 공유했고, 구현은 모델 담당 팀원이 맡았습니다. 팀은 정확도 저하를 억제하면서 추론 시간을 줄였습니다."
      }
    }
  ],
  "tools": [
    {
      "name": "OnlyDM",
      "problem": "사무실에서 인스타그램 DM만 가볍게 쓰고 싶었습니다.",
      "state": "DM 전용 Windows 창에 영어 UI를 추가하고 npm으로 업데이트를 배포합니다.",
      "github": "https://github.com/thisNorm/OnlyDM",
      "image": {
        "src": "/portfolio/projects/onlydm-ui.png",
        "width": 2160,
        "height": 1350,
        "alt": "예시 대화를 사용한 OnlyDM 대화 목록과 채팅창",
        "caption": "실제 제품 화면 · 공개 README의 예시 대화"
      }
    },
    {
      "name": "Windows Toolkit",
      "problem": "개발할 때 사용 중인 포트와 IP·게이트웨이를 빠르게 확인할 도구가 필요했습니다.",
      "state": "PortPeek·NetworkPeek로 포트와 네트워크 상태를 트레이에서 조회하고 복사합니다.",
      "github": "https://github.com/thisNorm/Windows-Toolkit"
    },
    {
      "name": "AI POT CBT",
      "problem": "프롬프트 엔지니어링 자격증 기출을 반복해서 풀 도구가 필요했습니다.",
      "state": "공개 시험지로 CBT·오답노트를 만들었고, 이 CBT로만 문제풀이해 1급을 취득했습니다.",
      "github": "https://github.com/thisNorm/ai-pot-cbt"
    },
    {
      "name": "Keydesk",
      "problem": "Open API가 늘면서 개인 API 키 관리가 복잡해졌습니다.",
      "state": "Infisical 기반의 한국어 개인용 보관함에서 제공사·용도·사용 프로젝트·만료일을 키와 함께 관리합니다.",
      "github": "https://github.com/thisNorm/keydesk"
    },
    {
      "name": "thisnorm.dev",
      "problem": "이력서만으로 보여주기 어려운 작업을 담을 공간이 필요했습니다.",
      "state": "도메인을 구입해 직접 만든 포트폴리오 사이트입니다.",
      "github": "https://github.com/thisNorm/my-portfolio"
    }
  ],
  "jobs": [
    {
      "company": "인포벨리코리아 (INVAKO)",
      "role": "Backend Engineer",
      "kind": "work",
      "startMonth": "2026-06",
      "endMonth": null,
      "summary": "농가에 설치된 Jetson 엣지 서버와 중앙 매니저 서버를 개발·운영합니다. 현장 장비 연결과 데이터 수집부터 원격 업데이트, 신규 설치 검증까지 맡고 있습니다.",
      "contributions": [
        {
          "title": "현장 데이터 수집과 장애 대응",
          "description": "농가 3곳에서 소리수집기 8~20대와 카메라 12~15대를 농가별로 연결해 운영합니다. 중앙 서버가 두 차례 약 하루씩 중단됐을 때도 현장 수집 데이터는 유실되지 않았습니다."
        },
        {
          "title": "농가별 상태 확인과 원격 업데이트",
          "description": "매니저 서버에 농가별 상태 신호(Heartbeat)를 모아 엣지 서버를 확인하고, 농가 네트워크에 포트를 추가로 열지 않고도 원격으로 업데이트할 수 있도록 구현했습니다."
        },
        {
          "title": "엣지 서버 교체와 신규 설치 검증",
          "description": "같은 Jetson에서 기존 서버와 새 서버를 병행 가동하며 수집을 유지한 채 교체하고 있습니다. 신규 설치를 6단계로 자동 검증하고, 하루 약 7GB에 달한 로그로 발생한 장애도 해결했습니다."
        }
      ]
    },
    {
      "company": "ETRI 자율형IoT연구실",
      "role": "연구연수생 · Research Trainee",
      "kind": "training",
      "startMonth": "2026-01",
      "endMonth": "2026-02",
      "summary": "폐쇄망에서 CCTV 탐지 이벤트와 로봇 원격 조종을 한곳에서 다루는 관제 시스템 AegisView를 1인 개발했습니다.",
      "contributions": [
        {
          "title": "탐지 이벤트 처리와 저장",
          "description": "Redis Queue로 탐지 이벤트를 받고 실패한 건은 DLQ에 남겼습니다. 이벤트는 묶어서 저장해 DB 쓰기 횟수를 줄였습니다."
        },
        {
          "title": "로봇 원격 조종 응답 개선",
          "description": "로봇 제어 통신에 aiohttp 비동기 처리를 적용했습니다. 프로젝트 내 비교에서 원격 조종의 제어 지연을 약 90% 줄였습니다."
        }
      ]
    }
  ],
  "skills": {
    // Verified against each repository's dependency files, CI config, and the owner's confirmation (2026-11).
    primary: [
      { name: "TypeScript · Node.js · NestJS", logos: ["typescript", "nodejs", "nestjs"], where: [use.hv, use.dv, use.av] },
      { name: "Python · FastAPI", logos: ["python", "fastapi"], where: [use.av, use.ci] },
      { name: "PostgreSQL · pgvector", logos: ["postgresql"], where: [use.hv, use.pm] },
      { name: "Redis", logos: ["redis"], where: [use.av] },
      { name: "WebRTC 시그널링 · Socket.IO", logos: ["webrtc"], where: [use.dv, use.av] },
      { name: "RTSP · MQTT", logos: ["mqtt"], note: "스마트돈사 대시보드", where: [use.field] },
      { name: "Jetson · Linux", logos: ["nvidia", "linux"], note: "엣지 장비·배포", where: [use.field] },
      { name: "Docker", logos: ["docker"], where: [use.ci] },
      { name: "MCP", logos: ["mcp"], where: [use.hv, use.fin] },
    ],
    secondary: [
      { name: "Spring Boot · Java", note: "경험", where: [use.pm] },
      { name: "MySQL · TypeORM", where: [use.dv] },
      { name: "SQLite", where: [use.ts] },
      { name: "JavaScript", where: [use.ts, use.fin] },
      { name: "RKNN · ONNX Runtime", where: [use.fg] },
      { name: "TensorFlow Lite", where: [use.dv] },
      { name: "Ollama", where: [use.ci] },
      { name: "GitLab CI", where: [use.ci] },
      { name: "GitHub Actions", where: [use.pm] },
      { name: "AWS", where: [use.dv] },
      { name: "Playwright", where: [use.ca] },
      { name: "Tailscale API", where: [use.ts] },
    ],
    models: [
      { name: "YOLOv8", note: "객체 탐지", where: [use.av] },
      { name: "LVFace-T", note: "얼굴 인식", where: [use.fg] },
      { name: "ResNet50", note: "음성 모델", where: [use.dv] },
    ],
    tools: ["Claude", "Codex"],
  },
  "awards": [
    {
      "date": "2026.01",
      "title": "총장상",
      "org": "홍익대학교",
      "note": "교내외 기술 성과"
    },
    {
      "date": "2025.12",
      "title": "대상",
      "org": "디지털 바이오헬스 종합설계 경진대회",
      "note": "DeepVoice Shield",
      "image": "/portfolio/awards/biohealth-grand-prize-2025.jpg",
      "imageAlt": "2025 디지털 바이오헬스 종합설계 경진대회 대상 수상 현장 단체 사진",
      "imageWidth": 1280,
      "imageHeight": 720
    },
    {
      "date": "2025.11",
      "title": "대상",
      "org": "충청권 ICT 이노베이션스퀘어 S/W 개발 분과",
      "note": "DeepVoice Shield",
      "image": "/portfolio/awards/ict-innovation-grand-prize-board-2025.png",
      "imageAlt": "2025 충청권 ICT 이노베이션스퀘어 S/W 개발 분과 대상 시상 보드",
      "imageWidth": 1440,
      "imageHeight": 1019
    },
    {
      "date": "2025.11",
      "title": "우수상",
      "org": "지역혁신 인재양성 연합 페스티벌",
      "note": "DeepVoice Shield",
      "image": "/portfolio/awards/regional-innovation-excellence-2025-photo.png",
      "imageAlt": "2025 지역혁신 인재양성 연합 페스티벌 우수상 수상 현장 사진",
      "imageWidth": 512,
      "imageHeight": 683
    },
    {
      "date": "2025.09",
      "title": "최우수상",
      "org": "OpenCV Zoo 영상분석 실무 프로젝트",
      "note": "멀티프레임 반사광 제거 (3인 팀)"
    }
  ],
  "education": [
    {
      "title": "AI-POT 프롬프트 엔지니어링 1급",
      "note": "2026.02 · 직접 만든 CBT로 문제풀이"
    },
    {
      "title": "SQLD",
      "note": "2024.09"
    },
    {
      "title": "AI를 활용한 DevOps 전문가 양성 교육",
      "note": "2026.04 · Docker·Kubernetes 기반 CI/CD"
    },
    {
      "title": "메타버스 융합 SW 아카데미",
      "note": "2024.12 ~ 2025.06 · 과기부 주관, DeepVoice Shield"
    },
    {
      "title": "홍익대학교 소프트웨어융합학과",
      "note": "빅데이터비즈니스융합 복수전공 · 2026.08 졸업"
    }
  ],
  "contact": {
    "email": "kisook2557@gmail.com",
    "github": "https://github.com/thisNorm",
    "blog": "https://thisnorm.tistory.com",
    "resume": "/resume.pdf"
  }
};

export const { projects, tools, jobs, skills, awards, education, contact } = portfolio;
export const projectById = (id: ProjectId) => {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
};
export const projectMeta = (project: Project) => [project.role, project.status, project.category].filter(Boolean).join(" · ");
export const otherProjectIds: ProjectId[] = ["tailscale", "finance", "autoci", "aegisview", "pinmate"];

// How repetitive work gets split: what AI does, what code and rules fix, what stays with a person.
// Current job, shown first among the projects. Facts are from `jobs`; RTSP/MQTT confirmed by the owner.
export const fieldWork = {
  meta: "실무 · 인포벨리코리아 · 2026.06–현재",
  name: "스마트돈사 엣지 운영",
  headline: "농가 3곳의 Jetson 엣지 서버와 중앙 매니저 서버를 개발·운영합니다",
  split: [
    { label: "사람 손에서 뺀 것", text: "신규 설치 확인을 6단계 자동 검증으로 바꿨습니다. 농가 네트워크에 포트를 더 열지 않고 원격으로 업데이트하고, 농가별 상태 신호(Heartbeat)를 매니저 서버에 모읍니다." },
    { label: "운영에서 지킨 것", text: "중앙 서버가 두 차례 약 하루씩 멈췄을 때도 현장 수집 데이터는 유실되지 않았습니다. 같은 Jetson에서 기존·새 서버를 병행 가동하며 수집을 유지한 채 교체하고 있습니다." },
    { label: "연결하는 장비", text: "농가별 카메라 12~15대와 소리수집기 8~20대를 연결합니다. 스마트돈사 대시보드 시스템에서 RTSP와 MQTT를 씁니다." },
  ],
  note: { label: "장애 대응", body: "하루 약 7GB까지 쌓이던 로그 때문에 생긴 장애를 해결했습니다." },
  link: { label: "경력에서 맡은 일 보기", href: "#career" },
};

export const perspective = {
  label: "일을 보는 관점",
  title: ["손을 뗄 일과", "남겨 둘 일을 나눕니다"],
  lead: "반복되는 일을 보면 먼저 셋으로 나눕니다. AI에게 맡길 일, 코드와 규칙으로 고정할 일, 사람이 확인할 일. 계산이나 권한, 발행 여부처럼 틀리면 안 되는 판단은 AI 출력에 맡기지 않습니다.",
  lanes: [
    { id: "ai", label: "AI에게 맡김" },
    { id: "code", label: "코드와 규칙으로 고정" },
    { id: "human", label: "사람이 확인" },
  ],
  examples: [
    { name: "스마트돈사 엣지 운영", caption: "개발과 Mock 장비 테스트는 AI와 나누고, 무엇을 만들지와 어떤 결과면 통과인지는 제가 정합니다. 현장에서 반복되는 확인은 규칙으로 고정했습니다.", items: {
      ai: [{ text: "기능 구현" }, { text: "제가 놓칠 수 있는 부분 짚기" }, { text: "Mock 장비로 UI 테스트" }],
      code: [{ text: "신규 설치 6단계 자동 검증" }, { text: "농가별 상태 신호(Heartbeat) 수집" }, { text: "포트를 더 열지 않는 원격 업데이트" }],
      human: [{ text: "최초 문서 작성" }, { text: "AI가 짠 구현 계획 확인" }, { text: "작업 범위 할당" }, { text: "eval 기준 작성" }],
    } },
    { name: "Content Agent", caption: "글은 제가 쓰고, 옮기고 꾸미는 반복은 파이프라인이 합니다. 잘못된 글이 나가느니 멈추는 쪽을 택했습니다.", items: {
      ai: [{ text: "교재 문체를 블로그 문체로 각색", tool: "Claude" }, { text: "썸네일 이미지 생성", tool: "Gemini" }],
      code: [{ text: "제목·HTML 구조·X 초안은 로컬 규칙" }, { text: "코드 블록·이미지 표식이 빠지면 발행 중단" }, { text: "티스토리·X 발행과 실행 로그 기록" }],
      human: [{ text: "노션에 원고 작성" }],
    } },
    { name: "알아서", caption: "같은 조건에서 답이 달라지면 안 되는 계산은 AI에서 서버 규칙으로 옮겼습니다.", items: {
      ai: [{ text: "대화 요청의 의도 해석" }, { text: "거래 분류와 결과 설명" }],
      code: [{ text: "금액·잔액·할부 계산은 서버 규칙" }, { text: "카드 내역과 계좌 내역의 이중 집계 분리" }],
      human: [{ text: "변경안의 적용 전후를 보고 결정" }],
    } },
    { name: "HarnessVault", caption: "AI가 승인받았다고 말해도 믿지 않습니다. 실행 조건은 서버에 남은 승인 상태뿐입니다.", items: {
      ai: [{ text: "개인 AI가 회사 Harness를 받아 작업" }, { text: "MCP로 회사 파일·DB·Git 조회" }],
      code: [{ text: "권한·정책 판정과 감사 로그" }, { text: "DB 조회는 읽기 전용 트랜잭션으로 강제" }],
      human: [{ text: "위험한 작업과 하네스 기여 승인" }],
    } },
    { name: "Tailscale 모니터링", caption: "규칙만으로 충분한 일에는 AI를 넣지 않았습니다.", items: {
      ai: [{ text: "쓰지 않음. 규칙만으로 충분했습니다", none: true }],
      code: [{ text: "API로 장비와 설정 변경 수집" }, { text: "이름·태그 규칙 검사와 이력 저장" }],
      human: [{ text: "Slack·Telegram 알림을 받고 조치" }],
    } },
  ],
} as const;

// AI work loop. Quotes are from HarnessVault's AGENTS.md (the agent contract in that repository).
export const aiMethod = {
  label: "AI와 일하는 방식",
  title: ["구현 전에", "통과 기준부터"],
  lead: "Codex와 Claude Code에 기능을 맡기기 전에, 어떤 결과면 통과인지 먼저 정합니다. 인용은 HarnessVault의 실제 에이전트 규약이고, 사례는 공개 저장소에서 확인할 수 있습니다.",
  loop: ["docs", "eval", "구현", "보고"],
  loopNote: "↻ 통과할 때까지 반복",
  steps: [
    { title: "docs 먼저", body: "아는 문제와 목표, 현재 상황과 제약, 기대 동작과 성공 사례를 먼저 적습니다. 제가 놓쳤거나 지금 답할 수 없는 부분은 AI가 인터뷰하듯 묻고, 답을 문서에 채웁니다. 구현 뒤에 오류를 찾는 절차가 아니라 구현 전에 요구를 설계하는 단계입니다.",
      quote: "문서 계약과 다른 구현을 임의로 만들지 않는다.", cite: "모듈별 설계 문서는 docs/에 둡니다" },
    { title: "개발 계획과 eval을 함께", key: true, body: "우선순위와 기능·모듈 단위로 계획을 짜면서, 문서의 기대 동작에서 통과 기준을 가져옵니다. 기준이 애매하거나 없으면 구현부터 하지 않고 다시 묻습니다. 기능마다 어떤 환경과 하네스로 검증할지도 이때 정합니다.",
      quote: "Resolver · Policy · Approval은 명세의 필수 테스트 케이스를 그대로 테스트 파일로 옮겨 회귀를 막는다.", cite: "현재 지정된 Phase만 구현하고, 다음 Phase는 선행 구현하지 않습니다",
      example: { label: "이 사이트에서", text: "완료 기준을 저장소의 AGENTS.md에 먼저 적었습니다. lint·테스트·빌드 통과에 더해, 바꾼 화면은 실제 출력으로 확인해야 끝납니다. 테스트는 빌드 결과의 메타데이터·sitemap·리다이렉트와 한글 깨짐을 검사합니다." } },
    { title: "구현, 테스트, 수정, 재검증", body: "우선순위대로 한 기능을 만들고 정해 둔 하네스와 eval로 확인합니다. 실패하면 원인을 찾아 고친 뒤 같은 기준으로 다시 돌립니다. 목표가 확인될 때까지 이 루프를 반복합니다.",
      quote: "어떤 흐름도 Mock 성공으로 대체하지 않는다.", cite: "커밋 전 typecheck → lint → test → build가 통과해야 합니다",
      example: { label: "자동화 안에 남긴 기준", text: "같은 방식으로 만든 도구는 실행 중에도 기준을 지킵니다. Content Agent는 표식이 하나라도 빠지면 발행을 멈추고, AutoCI는 샌드박스 실행과 smoke test를 통과한 설정만 Runner에 반영합니다." } },
    { title: "결과 보고 후 다음 기능", body: "무엇을 만들었고, 어떤 테스트에서 무슨 문제가 나와 어떻게 고쳐 재검증했는지 보고받습니다. 결과를 확인한 뒤 다음 기능 계획으로 넘어갈지 정합니다.",
      report: ["변경 파일", "구현 내용", "검증 명령과 결과", "미검증 사항", "다음 Phase blocker"] },
  ],
};

export const activities = [
  {
    "name": "데일리 AI 브리핑",
    "why": "AI 기업들의 공식 발표와 새 모델을 먼저 돌려 본 개발자 커뮤니티의 반응을 매일 아침 모아, 그림과 함께 Threads·LinkedIn에 공유",
    "now": "매일 오전 9시 게시"
  },
  {
    "name": "AINOW AI 세미나 & 네트워킹",
    "why": "AI를 업무에 쓰는 실무자·창업가 모임에 자발적으로 참가해, AI를 업무 자동화에 붙인 사례 강연을 듣고 참가자들과 교류",
    "now": "2026.10.17 · Intel 후원 행사"
  },
  {
    "name": "기술 블로그",
    "why": "Docker·Kubernetes·CI/CD 학습 내용을 정리했습니다. 6편은 Content Agent로 발행했고, 이후로는 피드 글 작성에 집중하고 있습니다",
    "now": "thisnorm.tistory.com",
    "href": "https://thisnorm.tistory.com"
  }
];

export const homeCopy = {
  name: "황규범",
  role: "백엔드 개발자",
  title: ["불편해서,", "직접 만들었습니다"],
  description: ["반복하는 일은 자동화하고,", "손으로 하던 일은 시스템으로 바꿉니다."],
  action: "프로젝트 보기",
  phases: [
    { label: "입력", caption: "흩어진 요청과 기록이 들어옵니다." },
    { label: "정리", caption: "제각각인 입력을 같은 형태로 정리합니다." },
    { label: "처리", caption: "정해진 절차대로 일을 처리합니다." },
    { label: "검증", caption: "결과를 확인하고 다음 작업에 넘깁니다." },
  ],
  sceneHint: "스크롤로 장면 보기",
  sceneHintEnd: "아래로 내려 경력 보기",
  autoStop: "자동 재생 멈추기",
  autoResume: "자동 재생 다시 시작",
  workLabel: "대표 프로젝트",
  workTitle: ["만들고,", "검증한 것들"],
  heroFacts: ["농가 3곳 엣지 서버 운영", "얼굴 검출 305ms → 23ms", "경진대회 대상 2회"],
  resume: "이력서",
  contactLabel: "연락",
  otherTitle: "그 밖의 프로젝트",
  awardsLead: "DeepVoice Shield로 대상 2회, 우수상 1회를 받았습니다.",
  toolsLead: "일하다 불편했던 것을 직접 만든 도구입니다.",
};
