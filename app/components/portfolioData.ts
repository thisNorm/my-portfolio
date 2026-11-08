// Approved portfolio copy. Keep project roles and evidence in sync with the resume.
export type ProjectId = 'finance' | 'facegate' | 'autoci' | 'harnessvault' | 'aegisview' | 'pinmate' | 'content' | 'sns' | 'deepvoice';
export type ProjectFilter = 'all' | 'automation' | 'ai' | 'service';
export type Project = {
  id: ProjectId; name: string; category: string; status: string; role: string;
  summary: string; problem: string; solution: string; evidence: string;
  stack: string[]; github: string | null; filter: Exclude<ProjectFilter, 'all'>;
  tagline: string; coverCaption: string;
  metric?: { before: number; after: number; unit: string; label: string };
};
export type Award = { date: string; title: string; org: string; note: string; image?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number };
type Portfolio = {
  projects: Project[];
  tools: {name: string; problem: string; state: string; github: string | null}[];
  jobs: {company: string; role: string; period: string; summary: string; lines: string[]}[];
  skills: {label: string; items: string}[];
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
      "status": "",
      "role": "1인 개발",
      "summary": "카드·계좌·증권을 모아 결제 방법과 예산 조정안을 제안합니다.",
      "problem": "카드·계좌·증권에 흩어진 정보를 모아 결제 방법과 예산 조정안을 판단할 필요가 있었습니다.",
      "solution": "계산은 코드로 처리하고 AI는 판단과 제안을 맡습니다. 거래·주문 기능 없이 제안까지만 다룹니다.",
      "evidence": "계산은 코드가 맡고, AI는 제안까지만 합니다. 주문 기능은 차단했습니다.",
      "stack": [
        "JavaScript",
        "MCP",
        "LLM"
      ],
      "github": "https://github.com/thisNorm/finance-agent",
      "filter": "automation",
      "tagline": "흩어진 재무 정보를 한곳으로.",
      "coverCaption": "정보를 한곳으로 모으는 개념 그래픽"
    },
    {
      "id": "facegate",
      "name": "FaceGate",
      "category": "현장 엣지 AI",
      "status": "사내 PoC",
      "role": "1인 개발",
      "summary": "AI팀 얼굴인식 모델을 출입 단말 NPU로 옮겼습니다.",
      "problem": "AI팀 모델을 출입 단말의 NPU에서 실행할 수 있도록 옮길 필요가 있었습니다.",
      "solution": "모델을 RKNN·INT8로 변환해 Android 출입 단말에 적용했습니다. 변환 전후 판정을 비교했습니다.",
      "evidence": "사내 PoC에서 변환 전후 판정이 같았습니다. 처리 시간은 NPU INT8 단말 장면 기준입니다.",
      "metric": {
        "before": 305,
        "after": 23,
        "unit": "ms",
        "label": "단말 장면 처리 · NPU INT8"
      },
      "stack": [
        "TypeScript",
        "Android",
        "RKNN"
      ],
      "github": "https://github.com/thisNorm/facegate",
      "filter": "ai",
      "tagline": "모델의 판단을 출입 단말에서도.",
      "coverCaption": "변환 전후의 판정도 함께 확인했습니다."
    },
    {
      "id": "autoci",
      "name": "Air-gapped AutoCI",
      "category": "폐쇄망 CI/CD 자동화",
      "status": "",
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
      "coverCaption": "샌드박스 검증 흐름의 개념도"
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
      "coverCaption": "실제 개발 화면 일부 · MVP · 테스트 데이터"
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
      "stack": [
        "YOLOv8",
        "FastAPI",
        "C#",
        "Redis"
      ],
      "github": "https://github.com/thisNorm/lab-guardian",
      "filter": "ai",
      "tagline": "영상 수집부터 로봇 제어까지, 하나의 시스템에.",
      "coverCaption": "공개 README의 실제 개발 데모"
    },
    {
      "id": "pinmate",
      "name": "PinMate",
      "category": "팀 웹 서비스",
      "status": "개발 중",
      "role": "3인 팀 리드",
      "summary": "친구끼리 맛집 목록을 한 지도에 모으는 웹 서비스입니다.",
      "problem": "친구끼리 가진 맛집 목록을 하나의 지도에서 모아 볼 필요가 있었습니다.",
      "solution": "맛집 목록을 한 지도에 모으는 서비스를 개발합니다. 주제를 제안하고 브랜치·PR 규칙과 CI를 구성했습니다.",
      "evidence": "3인 팀 리드로 주제 제안, 브랜치·PR 규칙과 CI 구성을 맡았으며 서비스는 개발 중입니다.",
      "stack": [
        "React",
        "Spring Boot",
        "PostgreSQL"
      ],
      "github": "https://github.com/taeyoung087007-wq/PinMate",
      "filter": "service",
      "tagline": "친구의 맛집 목록이 한 지도에서 만납니다.",
      "coverCaption": "공유 지도를 표현한 개념도"
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
      "problem": "통화 중 딥보이스를 휴대폰 안에서 탐지할 수 있어야 했습니다.",
      "solution": "온디바이스 탐지 앱의 백엔드와 배포를 담당했습니다. 모델 경량화 방향을 제안했습니다.",
      "evidence": "1년 팀 프로젝트에서 백엔드·배포를 맡았으며, DeepVoice Shield로 대상 2회를 포함한 수상을 했습니다.",
      "stack": [
        "NestJS",
        "MySQL",
        "AWS"
      ],
      "github": "https://github.com/thisNorm/deepfake_detection_service_backend",
      "filter": "ai",
      "tagline": "온디바이스 딥보이스 탐지 앱의 백엔드·배포.",
      "coverCaption": "음성 분석을 표현한 개념 그래픽"
    }
  ],
  "tools": [
    {
      "name": "OnlyDM",
      "problem": "사무실에서 인스타그램 DM만 가볍게 쓰고 싶었습니다.",
      "state": "DM 전용 Windows 창에 영어 UI를 추가하고 npm으로 업데이트를 배포합니다.",
      "github": "https://github.com/thisNorm/OnlyDM"
    },
    {
      "name": "Tailscale 모니터링",
      "problem": "공유 계정에서 누가 장비를 바꿨는지 알기 어려웠습니다.",
      "state": "규칙 위반과 변경 이력을 Slack으로 알리며 사무실 전원이 사용 중입니다.",
      "github": "https://github.com/thisNorm/tailscale-monitor"
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
      "state": "Infisical 기반으로 개발 중이며, API 호출량과 비용을 관리하는 게이트웨이가 목표입니다.",
      "github": null
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
      "items": "TypeScript, Python, JavaScript, Java, C#"
    },
    {
      "label": "백엔드·데이터",
      "items": "Node.js, NestJS, FastAPI, Spring Boot · PostgreSQL(pgvector), MySQL, SQLite, Redis, MQTT, WebSocket"
    },
    {
      "label": "AI",
      "items": "LLM 에이전트, MCP, RAG, 로컬 LLM(Ollama), 모델 경량화(ONNX, RKNN, TFLite, INT8), YOLOv8"
    },
    {
      "label": "인프라",
      "items": "Linux, Docker, GitLab CI, GitHub Actions, AWS, Firebase, Tailscale, Jetson"
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
      "note": "DeepVoice Shield"
    },
    {
      "date": "2025.11",
      "title": "우수상",
      "org": "지역혁신 인재양성 연합 페스티벌",
      "note": "DeepVoice Shield"
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
  "workEyebrow": "직접 만들어 바꾼 것들",
  "workTitle": "불편이 도구가 된 기록.",
  "workHint": "작업을 고르면 시작한 이유와 구현을 볼 수 있습니다.",
  "galleryNote": "실제 화면과 개념 그래픽을 구분해 표기했습니다. 각 작업에서 역할과 구현 범위를 확인할 수 있습니다.",
  "profileRole": "Backend Engineer",
  "profileName": "thisNorm",
  "profileDirection": "일상과 업무의 불편을 찾아 도구를 만들고, 반복되는 일을 자동화·디지털화합니다.",
  "profileAspiration": "현재는 백엔드 개발을 하고 있습니다. 앞으로는 AX / FDE 역할로 나아가고 싶습니다."
};
