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
  developmentNote?: { title: string; body: string };
  metric?: { before: number; after: number; unit: string; label: string };
};
export type Award = { date: string; title: string; org: string; note: string; image?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number };
type Portfolio = {
  projects: Project[];
  tools: {name: string; problem: string; state: string; github: string | null; image?: ProjectMedia}[];
  jobs: {company: string; role: string; period: string; summary: string; lines: string[]}[];
  skills: {label: string; items: { name: string; logo?: string; darkLogo?: string }[]}[];
  awards: Award[];
  education: {title: string; note: string}[];
  contact: {email: string; github: string; blog: string; resume: string};
};

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
      "developmentNote": {
        "title": "같은 소비가 두 번 잡히는 문제",
        "body": "카드 승인액과 나중에 출금된 카드 대금을 합치면 한 번 쓴 돈이 두 번 집계됩니다. 카드 내역은 소비 분석에, 계좌 내역은 잔액과 현금 흐름에 쓰도록 나눴습니다. 할부 계산을 AI에 맡겼을 때도 같은 조건에서 답이 달라져, 금액 계산은 서버 규칙으로 옮겼습니다."
      },
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
      ]
    },
    {
      "id": "facegate",
      "name": "FaceGate",
      "category": "현장 엣지 AI",
      "status": "사내 PoC",
      "role": "1인 개발",
      "summary": "AI팀 인식 경로를 Android 출입 단말에 통합하고, 얼굴 검출을 NPU로 옮겼습니다.",
      "problem": "얼굴인식 API와 게이트 제어를 연결하고, 상시 실행되는 얼굴 검출의 단말 CPU 부담을 줄일 필요가 있었습니다.",
      "solution": "SCRFD 얼굴 검출 모델을 RKNN·INT8로 변환해 Android 단말의 NPU에서 실행합니다. 얼굴 인식은 CPU에 유지하고, 기존 API 형식으로 출입 서버와 연결합니다.",
      "evidence": "동일 단말의 장면 처리 중앙값이 305ms에서 23ms로 줄었습니다. 저장 장면 44장에서 CPU·NPU의 사람 판정이 같았습니다. 사내 PoC 기록이며, 모든 환경의 정확도를 확정한 결과는 아닙니다.",
      "developmentNote": {
        "title": "검출만 바꿔 비교한 이유",
        "body": "단말에서 계속 실행되는 얼굴 검출의 부하를 줄이는 것이 이번 실험의 목표였습니다. 검출을 NPU로 옮기되 인식과 출입 연동은 기존 경로에 남겼습니다. 확인한 수치는 검출 장면의 처리 시간이며, 실제 출입 절차 전체의 응답 시간을 비교한 것은 아닙니다."
      },
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
      ]
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
      "developmentNote": {
        "title": "로컬 모델이 만든 YAML의 한계",
        "body": "Gemma 계열 모델은 GitLab CI용 YAML을 안정적으로 생성하지 못했습니다. 생성한 설정을 바로 반영하지 않고 격리 환경에서 실행해, smoke test에서 실패한 설정은 걸렀습니다. YAML 생성 품질 자체는 더 많은 예제나 다른 로컬 모델로 개선할 과제로 남았습니다."
      },
      "stack": [
        "Python",
        "GitLab CI",
        "Docker",
        "Ollama"
      ],
      "github": "https://github.com/thisNorm/Air-gapped_DevOps",
      "filter": "automation",
      "tagline": "폐쇄망에서도 반복 설정을 줄이도록.",
      "coverCaption": "샌드박스 검증 흐름의 개념도"
    },
    {
      "id": "tailscale",
      "name": "Tailscale 모니터링",
      "category": "사내 운영 자동화",
      "status": "사내 사용",
      "role": "1인 개발",
      "summary": "장비 이름·태그 규칙과 설정 변경을 확인하고, 이력을 웹과 Slack·Telegram으로 전달합니다.",
      "problem": "현장과 사무실 장비가 늘면서 이름·태그가 제각각이 되었고, 공유 계정의 설정 변경을 뒤늦게 알게 됐습니다.",
      "solution": "Tailscale API에서 장비와 설정 변경을 수집해 규칙을 검사합니다. 변경 이력과 알림, 암호화된 연동 설정, 웹 업데이트 흐름을 구현했습니다.",
      "evidence": "사내 장비 관리에 사용합니다. 공유 계정의 변경자는 해당 계정 단위까지만 식별됩니다. 공개 화면은 실제 사내 장비 대신 저장소의 가상 장비 데모를 사용했습니다.",
      "developmentNote": {
        "title": "공유 계정에서 알 수 있는 범위",
        "body": "Tailscale API에 공유 계정만 남으면 실제로 조작한 사람을 특정할 수 없었습니다. 대신 어떤 장비의 이름과 태그가 바뀌었는지, 규칙을 어겼는지를 기록하고 Slack으로 알렸습니다. 사람 단위 식별은 계정 운영 방식의 제약으로 남았습니다."
      },
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
      ]
    },
    {
      "id": "harnessvault",
      "name": "HarnessVault",
      "category": "AI 거버넌스",
      "status": "MVP",
      "role": "1인 개발",
      "summary": "개인이 만든 AI 하네스를 회사·팀·개인 자산으로 관리합니다.",
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
      ]
    },
    {
      "id": "aegisview",
      "name": "AegisView",
      "category": "폐쇄망 영상 AI · ETRI",
      "status": "",
      "role": "1인 개발",
      "summary": "CCTV 탐지 이벤트와 로봇 원격 조종을 폐쇄망에서 통합합니다.",
      "problem": "폐쇄망에서 CCTV 탐지 이벤트와 로봇 원격 조종을 한곳에서 다룰 관제가 필요했습니다.",
      "solution": "Redis Queue·DLQ로 탐지 이벤트를 처리하고 이벤트를 묶어 DB에 저장합니다. 로봇 제어 통신에는 aiohttp 비동기 처리를 적용했습니다.",
      "evidence": "ETRI 자율형IoT연구실에서 1인 개발했습니다.",
      "developmentNote": {
        "title": "완전히 겹치면 ID를 이어 가지 못했습니다",
        "body": "객체가 화면에 들어오면 번호를 부여하고, 화면 안에 머무는 동안 같은 번호를 유지하도록 했습니다. 새 객체는 새 번호를 받았지만, 두 객체가 완전히 겹쳤다 흩어지면 어느 쪽에 이전 번호를 이어야 할지 구별하지 못했습니다. 이후 ETRI 연구진과 스마트돈사 영상을 논의할 때, 돼지끼리 가려지는 문제는 카메라를 위에서 내려다보도록 배치해 줄인다는 설명을 들었습니다. 추적 로직과 함께 촬영 구도도 봐야 한다는 걸 배웠습니다."
      },
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
      ]
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
      "developmentNote": {
        "title": "동시에 등록해도 핀은 하나로",
        "body": "친구 둘이 같은 장소를 등록할 때 지도가 중복 핀으로 채워질 수 있었습니다. 같은 모임의 장소를 카카오 장소 ID 또는 이름과 거리로 대조하고, DB 잠금과 고유 제약을 두어 동시 등록을 처리했습니다. 이미 있는 장소에 대해서는 사람별 추천을 따로 남깁니다."
      },
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
      ]
    },
    {
      "id": "content",
      "name": "Content Agent",
      "category": "콘텐츠 자동화",
      "status": "",
      "role": "1인 개발",
      "summary": "노션 초안부터 각색·썸네일·티스토리·X 발행까지 연결하는 콘텐츠 파이프라인입니다.",
      "problem": "노션 초안 각색, 썸네일 제작과 채널별 발행을 한 흐름으로 묶을 필요가 있었습니다.",
      "solution": "초안 각색부터 썸네일과 채널 발행까지 파이프라인으로 연결했습니다. 검증에 실패하면 발행을 중단합니다.",
      "evidence": "노션 초안에서 티스토리·X 발행까지 처리하며, 검증 실패 시 발행을 멈추는 동작을 구현했습니다.",
      "developmentNote": {
        "title": "각색하면서 코드와 이미지 표시를 지키는 방법",
        "body": "노션 원고를 AI로 각색할 때 코드 블록과 이미지 위치 표시가 바뀌지 않도록, 먼저 임시 표식으로 바꿨습니다. 표식이 하나라도 빠지거나 소제목이 지나치게 줄면 발행을 중단합니다. 검증을 통과한 글에만 원래 코드 블록과 이미지 표시를 되돌립니다."
      },
      "stack": [
        "TypeScript",
        "Claude",
        "Gemini"
      ],
      "github": "https://github.com/thisNorm/content-agent",
      "filter": "automation",
      "tagline": "매번 하던 발행 작업을 하나의 흐름으로.",
      "coverCaption": "발행 흐름의 개념 그래픽 · 검증 실패 시 중단"
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
      "status": "",
      "role": "백엔드·배포",
      "summary": "통화 중 딥보이스를 휴대폰 안에서 탐지하는 앱의 백엔드와 배포를 담당했습니다.",
      "problem": "기본 전화 앱에서 통화 중 딥보이스를 탐지하려 했지만, Android의 통화 음성 접근 제한에 막혀 프로젝트를 계속할 방법을 다시 찾아야 했습니다.",
      "solution": "통화 중 탐지가 가능하다는 걸 보여 주는 데 집중해, 자체 VoIP 통화 앱에서 시연하자고 제안했습니다. 팀이 앱을 만들었고, 저는 백엔드와 배포를 맡았습니다.",
      "evidence": "1년 동안 팀 프로젝트를 이어 갔고, 완성한 VoIP 앱에서 통화 중 딥보이스 탐지를 시연했습니다. 디지털 바이오헬스 종합설계 경진대회와 충청권 ICT S/W 개발 분과에서 대상을 받았습니다.",
      "developmentNote": {
        "title": "실시간 탐지의 병목은 추론 시간이었습니다",
        "body": "추론 시간을 줄이기 위해 모델 경량화를 제안하고, 방법을 비교할 근거가 될 논문을 찾아 팀에 공유했습니다. 경량화 구현은 모델 담당 팀원들이 맡았습니다. 그 결과 정확도 저하를 억제하면서 추론 시간을 크게 줄였습니다."
      },
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
      ]
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
      "period": "2026.06 — 현재",
      "summary": "농가 엣지 서버와 매니저 서버를 운영하며 레거시 서버를 같은 Jetson에서 병행 교체하고 있습니다. 농가 Heartbeat 집계, 포트 개방 없는 원격 업데이트와 자동 설치 검증을 담당합니다.",
      "lines": [
        "3개 농가(농가당 소리수집기 8~20대, 카메라 12~15대) 엣지 서버, 20개 농가 추가 예정",
        "메인 서버가 두 번, 각각 약 하루 멈췄을 때도 데이터 유실 없음",
        "레거시 서버를 운영 중단 없이 교체 중 (같은 Jetson에서 병행 가동)",
        "매니저 서버: 농가 Heartbeat 집계, 포트 개방 없는 원격 업데이트",
        "6단계 자동 설치 검증, 하루 약 7GB 로그 장애 해결"
      ]
    },
    {
      "company": "ETRI 자율형IoT연구실",
      "role": "Research Trainee",
      "period": "2026.01 — 2026.02",
      "summary": "CCTV·로봇 통합 관제 시스템 AegisView를 1인 개발했습니다. Redis Queue·DLQ, 이벤트 묶음 저장과 aiohttp 비동기 통신을 적용했습니다.",
      "lines": [
        "CCTV·로봇 통합 관제 시스템 AegisView 1인 개발",
        "Redis Queue·DLQ로 탐지 이벤트 유실 방지, 이벤트 묶음으로 DB 쓰기 부하 감소",
        "aiohttp 비동기 통신으로 로봇 원격 조종 제어 지연 90% 개선"
      ]
    }
  ],
  "skills": [
    {
      "label": "언어",
      "items": [
        { name: "TypeScript", logo: "typescript" },
        { name: "Python", logo: "python" },
        { name: "JavaScript", logo: "javascript" },
        { name: "Java", logo: "java" },
      ],
    },
    {
      "label": "백엔드",
      "items": [
        { name: "Node.js", logo: "nodejs" },
        { name: "NestJS", logo: "nestjs" },
        { name: "FastAPI", logo: "fastapi" },
        { name: "Spring Boot (경험)", logo: "spring" },
      ],
    },
    {
      "label": "데이터·통신",
      "items": [
        { name: "PostgreSQL · pgvector", logo: "postgresql" },
        { name: "MySQL", logo: "mysql" },
        { name: "SQLite", logo: "sqlite" },
        { name: "Redis", logo: "redis" },
        { name: "MQTT", logo: "mqtt", darkLogo: "mqtt-dark" },
        { name: "WebSocket" },
        { name: "WebRTC", logo: "webrtc" },
        { name: "RTSP" },
      ],
    },
    {
      "label": "AI 활용 도구",
      "items": [
        { name: "Claude" },
        { name: "Codex" },
      ],
    },
    {
      "label": "비전 모델",
      "items": [
        { name: "YOLOv8", logo: "ultralytics" },
        { name: "ResNet50" },
        { name: "LVFace-T" },
      ],
    },
    {
      "label": "AI 연동·실행",
      "items": [
        { name: "MCP", logo: "mcp" },
        { name: "RAG" },
        { name: "Ollama", logo: "ollama" },
        { name: "ONNX", logo: "onnx" },
        { name: "TensorFlow Lite", logo: "tensorflow" },
        { name: "RKNN" },
      ],
    },
    {
      "label": "인프라·운영",
      "items": [
        { name: "Linux", logo: "linux" },
        { name: "Docker", logo: "docker" },
        { name: "GitLab CI", logo: "gitlab" },
        { name: "GitHub Actions", logo: "githubactions" },
        { name: "AWS", logo: "aws", darkLogo: "aws-dark" },
        { name: "Firebase", logo: "firebase" },
        { name: "Tailscale", logo: "tailscale" },
        { name: "Jetson (엣지 실행)", logo: "nvidia" },
      ],
    }
  ],
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
export const featuredGroups = [
  { id: "field", label: "현장 시스템", members: ["aegisview", "facegate"] },
  { id: "operations", label: "운영 자동화", members: ["autoci", "tailscale"] },
  { id: "products", label: "제품·서비스", members: ["finance", "pinmate"] },
].map(({ id, label, members }) => ({
  id, label,
  projects: members.flatMap((member) => projects.filter((project) => project.id === member)),
}));
export const featuredProjects = featuredGroups.flatMap((group) => group.projects);
export const additionalProjects = projects.filter((project) => !featuredProjects.includes(project) && project.id !== "sns");

export const aiWorkflow = {
  title: "AI와 일하는 방식",
  intro: "기능을 맡기기 전에, 무엇을 확인하고 어떤 결과면 통과인지 정합니다.",
  stages: [
    {
      id: "docs",
      label: "문서 작성",
      heading: "기대 동작과 성공 사례",
      description: "아는 것부터 docs/에 적고, AI의 질문에 답하며 기대 동작과 성공 사례를 정리합니다.",
      condition: "요구사항이 빠졌으면",
      action: "인터뷰 → 답을 문서에 반영",
      detailLabel: "인터뷰 방식",
      detail: "AI에게 문서의 틀을 잡게 한 뒤, 지금 설명할 수 있는 상황과 문제, 목표부터 말합니다. 초안에 빠져 있거나 제가 미처 생각하지 못한 조건은 질문에 답하며 채웁니다.",
    },
    {
      id: "eval",
      label: "개발 계획 · Eval",
      heading: "기능별 통과 기준",
      description: "기능의 우선순위를 정하고, 성공 사례를 바탕으로 확인할 동작과 통과 조건을 적습니다.",
      condition: "기준이 없거나 모호하면",
      action: "AI가 다시 질문 → 답을 계획에 반영",
      detailLabel: "통과 기준을 정하는 법",
      detail: "계획을 세울 때 기능마다 어떤 조건에서 확인할지, 어떤 결과면 통과인지 정합니다. 문서만으로 판정할 수 없다면 AI가 먼저 다시 묻고, 제 답을 반영해 기준을 정한 뒤 구현합니다.",
    },
    {
      id: "verify",
      label: "기능 개발",
      heading: "같은 기준으로 검증",
      description: "기능마다 하네스를 정해 하나씩 구현하고, 계획에 적어 둔 통과 기준으로 테스트합니다.",
      condition: "기준에 못 미치면",
      action: "기능 수정 → 같은 기준으로 재테스트",
      detailLabel: "하네스와 테스트",
      detail: "이번 기능에 맞는 문서, 작업 범위와 규칙, 실행 도구를 정합니다. 문제가 생기면 실패한 지점을 찾아 구현을 고치고, 계획에서 정한 목표가 충족될 때까지 다시 확인합니다.",
    },
  ],
  handoff: "실행한 테스트, 실패한 지점, 수정과 재테스트 결과를 보고받습니다. 제가 확인한 뒤 다음 기능의 계획으로 돌아갑니다.",
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
    "why": "Docker·Kubernetes·CI/CD 학습 내용을 정리해 Content Agent로 발행",
    "now": "thisnorm.tistory.com",
    "href": "https://thisnorm.tistory.com"
  }
];

export const homeCopy = {
  "identity": "백엔드 개발자 황규범",
  "lead": "불편해서,",
  "outcome": "직접 만들었습니다.",
  "description": [
    "반복하는 일은 자동화하고,",
    "손으로 하던 일은 시스템으로 바꿉니다."
  ],
  "action": "만든 도구 살펴보기",
  "motionReplay": "흐름 다시 보기",
  "motionStop": "모션 멈추기",
  "workTitle": "불편이 도구가 된 기록.",
  "workHint": "프로젝트를 고르면 맡은 역할과 구현 내용을 볼 수 있습니다.",
  "galleryNote": "실제 화면과 개념 그래픽을 구분해 표기했습니다. 각 작업에서 역할과 구현 범위를 확인할 수 있습니다.",
  "profileRole": "Backend Engineer",
  "profileName": "thisNorm",
  "profileDirection": "일상과 업무의 불편을 찾아 도구를 만들고, 반복되는 일을 자동화·디지털화합니다.",
  "profileAspiration": "현재는 백엔드 개발을 하고 있습니다. 앞으로는 AX / FDE 역할로 나아가고 싶습니다."
};
