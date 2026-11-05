// Static portfolio content rendered by PortfolioHome. Keep it in sync with public/resume.pdf.

export type Project = {
  title: string;
  kind: string;
  metric: string;
  note: string;
  desc: string;
  role: string;
  stack: string;
  href?: string;
};

export type Row = { name: string; why: string; now: string; href?: string };

export const facts = [
  { label: "단말 추론", value: "23ms", note: "FaceGate, CPU 305ms에서 NPU로" },
  { label: "데이터 유실", value: "0건", note: "메인 서버 약 하루 중단 2회 중" },
  { label: "수상", value: "5회", note: "대상 2회 포함" },
];

export const jobs = [
  {
    company: "인포벨리코리아 (INVAKO)",
    role: "Backend Engineer",
    period: "2026.06 — 현재",
    lines: [
      "3개 농가(농가당 소리수집기 8~20대, 카메라 12~15대) 엣지 서버, 20개 농가 추가 예정",
      "메인 서버가 두 번, 각각 약 하루 멈췄을 때도 데이터 유실 없음",
      "레거시 서버를 운영 중단 없이 교체 중 (같은 Jetson에서 병행 가동)",
      "매니저 서버: 농가 Heartbeat 집계, 포트 개방 없는 원격 업데이트",
      "6단계 자동 설치 검증, 하루 약 7GB 로그 장애 해결",
    ],
  },
  {
    company: "ETRI 자율형IoT연구실",
    role: "Research Trainee",
    period: "2026.01 — 2026.02",
    lines: [
      "CCTV·로봇 통합 관제 시스템 AegisView 1인 개발",
      "Redis Queue·DLQ로 탐지 이벤트 유실 방지, 이벤트 묶음으로 DB 쓰기 부하 감소",
      "aiohttp 비동기 통신으로 로봇 원격 조종 제어 지연 90% 개선",
    ],
  },
];

export const projects: Project[] = [
  { title: "FaceGate", kind: "현장 엣지 AI · 사내 PoC", metric: "305 → 23ms", note: "단말 장면 처리 (NPU · INT8)", desc: "AI팀 모델을 출입 단말 NPU로 옮기고, 변환 전후 판정이 같음을 확인한 얼굴인식 출입 시스템", role: "1인 개발", stack: "TypeScript, Android, RKNN", href: "https://github.com/thisNorm/facegate" },
  { title: "Air-gapped AutoCI", kind: "폐쇄망 CI/CD 자동화", metric: "통과한 것만 반영", note: "샌드박스 실행 · smoke test", desc: "폐쇄망에서 로컬 LLM이 CI 설정을 만들고, 샌드박스 검증을 통과한 것만 GitLab Runner에 반영", role: "2인 팀 리드", stack: "Python, GitLab CI, Docker, Ollama", href: "https://github.com/thisNorm/Air-gapped_DevOps" },
  { title: "HarnessVault", kind: "AI 거버넌스 · MVP", metric: "회사 → 팀 → 개인", note: "하네스를 조직 자산으로", desc: "개인의 AI 하네스를 회사에 남기는 플랫폼. 회사 자원은 MCP로 읽기 전용 연결, 기여는 승인 후 반영", role: "1인 개발", stack: "NestJS, Next.js, pgvector, MCP", href: "https://github.com/thisNorm/HarnessVault" },
  { title: "알아서", kind: "개인 재무 에이전트", metric: "계산은 코드로", note: "AI는 판단만 · 주문 기능 차단", desc: "카드·계좌·증권을 모아 결제 방법과 예산 조정안을 제안하는 개인 재무 에이전트", role: "1인 개발", stack: "JavaScript, MCP, LLM", href: "https://github.com/thisNorm/finance-agent" },
  { title: "SNS 성장 실험", kind: "운영 중인 실험", metric: "+2 → +22명", note: "13일 비교 · 선팔·맞팔 없음", desc: "대화 종료 기준을 둔 AI 댓글 에이전트로 계정이 실제로 크는지 측정하는 실험", role: "1인 운영", stack: "Agent, Threads, LinkedIn" },
  { title: "PinMate", kind: "팀 웹 서비스 · 개발 중", metric: "146 / 172", note: "커밋 · PR 병합 53 / 59", desc: "친구끼리 맛집 목록을 한 지도에 모으는 서비스. 주제 제안, 브랜치·PR 규칙과 CI 구성", role: "3인 팀 리드", stack: "React, Spring Boot, PostgreSQL", href: "https://github.com/taeyoung087007-wq/PinMate" },
  { title: "Content Agent", kind: "콘텐츠 자동화", metric: "fail-closed", note: "검증 실패 시 발행 중단", desc: "노션 초안을 각색·썸네일·티스토리·X 발행까지 한 번에 처리하는 파이프라인", role: "1인 개발", stack: "TypeScript, Claude, Gemini", href: "https://github.com/thisNorm/content-agent" },
  { title: "AegisView", kind: "폐쇄망 영상 AI · ETRI", metric: "지연 90% 개선", note: "로봇 원격 조종 제어", desc: "CCTV·로봇 통합 관제. Redis 큐·DLQ로 이벤트 유실을 막고 DB 쓰기 부하를 줄임", role: "1인 개발", stack: "YOLOv8, FastAPI, C#, Redis", href: "https://github.com/thisNorm/lab-guardian" },
  { title: "DeepVoice Shield", kind: "온디바이스 AI · 1년 팀", metric: "91.4%", note: "모델 경량화 · 대상 2회", desc: "통화 중 딥보이스를 휴대폰 안에서 탐지하는 앱. 백엔드·배포 담당, 경량화 방향 제안", role: "백엔드·배포", stack: "NestJS, MySQL, AWS", href: "https://github.com/thisNorm/deepfake_detection_service_backend" },
];

export const tools: Row[] = [
  { name: "OnlyDM", why: "사무실에서 인스타그램 DM만 가볍게 쓰려고, DM만 남겨 만든 Windows 메신저 창", now: "외국 사용자 요청으로 영어 UI 추가, npm으로 업데이트 배포", href: "https://github.com/thisNorm/OnlyDM" },
  { name: "Tailscale 모니터링", why: "공유 계정이라 누가 장비를 바꿨는지 알 수 없어서, 규칙 위반과 변경 이력을 Slack으로 알림", now: "사무실 전원이 사용 중", href: "https://github.com/thisNorm/tailscale-monitor" },
  { name: "AI POT CBT", why: "프롬프트 엔지니어링 자격증 기출을 반복해서 풀려고, 공개 시험지로 만든 CBT와 오답노트", now: "문제풀이를 이걸로만 해서 1급 취득", href: "https://github.com/thisNorm/ai-pot-cbt" },
  { name: "Keydesk", why: "Open API가 늘면서 키 관리가 난잡해져서, 오픈소스 Infisical을 바탕으로 만드는 개인용 API 키 보관함", now: "개발 중. API 호출을 모아 호출량과 비용을 관리하는 게이트웨이가 목표" },
  { name: "thisnorm.dev", why: "이력서만으로는 보여줄 수 없는 것들이 있어서, 도메인을 사서 직접 만든 포트폴리오 사이트", now: "지금 보고 있는 이 사이트", href: "https://github.com/thisNorm/my-portfolio" },
];

export const activities: Row[] = [
  { name: "데일리 AI 브리핑", why: "AI 기업들의 공식 발표와 새 모델을 먼저 돌려 본 개발자 커뮤니티의 반응을 매일 아침 모아, 그림과 함께 Threads·LinkedIn에 공유", now: "매일 오전 9시 게시" },
  { name: "AINOW AI 세미나 & 네트워킹", why: "AI를 업무에 쓰는 실무자·창업가 모임에 자발적으로 참가해, AI를 업무 자동화에 붙인 사례 강연을 듣고 참가자들과 교류", now: "2026.10.17 · Intel 후원 행사" },
  { name: "기술 블로그", why: "Docker·Kubernetes·CI/CD 학습 내용을 정리해 Content Agent로 발행", now: "thisnorm.tistory.com", href: "https://thisnorm.tistory.com" },
];

export const skills = [
  { label: "언어", items: "TypeScript, Python, JavaScript, Java, C#" },
  { label: "백엔드·데이터", items: "Node.js, NestJS, FastAPI, Spring Boot · PostgreSQL(pgvector), MySQL, SQLite, Redis, MQTT, WebSocket" },
  { label: "AI", items: "LLM 에이전트, MCP, RAG, 로컬 LLM(Ollama), 모델 경량화(ONNX, RKNN, TFLite, INT8), YOLOv8" },
  { label: "인프라", items: "Linux, Docker, GitLab CI, GitHub Actions, AWS, Firebase, Tailscale, Jetson" },
];

export const awards = [
  { date: "2026.01", title: "총장상", org: "홍익대학교", note: "교내외 기술 성과" },
  { date: "2025.12", title: "대상", org: "디지털 바이오헬스 종합설계 경진대회", note: "DeepVoice Shield" },
  { date: "2025.11", title: "대상", org: "충청권 ICT 이노베이션스퀘어 S/W 개발 분과", note: "DeepVoice Shield" },
  { date: "2025.11", title: "우수상", org: "지역혁신 인재양성 연합 페스티벌", note: "DeepVoice Shield" },
  { date: "2025.09", title: "최우수상", org: "OpenCV Zoo 영상분석 실무 프로젝트", note: "멀티프레임 반사광 제거 (3인 팀)" },
];

export const education = [
  { title: "AI-POT 프롬프트 엔지니어링 1급", note: "2026.02 · 직접 만든 CBT로 문제풀이" },
  { title: "SQLD", note: "2024.09" },
  { title: "AI를 활용한 DevOps 전문가 양성 교육", note: "2026.04 · Docker·Kubernetes 기반 CI/CD" },
  { title: "메타버스 융합 SW 아카데미", note: "2024.12 ~ 2025.06 · 과기부 주관, DeepVoice Shield" },
  { title: "홍익대학교 소프트웨어융합학과", note: "빅데이터비즈니스융합 복수전공 · 2026.08 졸업" },
];
