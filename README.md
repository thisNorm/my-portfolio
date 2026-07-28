# Hwang Gyubeom — Portfolio

> Backend Engineer · AI Systems & Automation

백엔드와 인프라 경험을 기반으로 **AI 에이전트, 자동화 워크플로우, 데이터와 도구를 실제 서비스에 연결하는 엔지니어**의 포트폴리오입니다.

## Portfolio

- Website: https://thisnorm.dev
- GitHub: https://github.com/thisNorm
- Contact: invako@naver.com

## Direction

이 포트폴리오는 단순한 기술 스택 나열보다 다음 흐름을 보여주는 데 집중합니다.

```text
Agent → Workflow → Data & API → Infra & Edge
```

- **Agentic Systems** — 도구 호출, 메모리, 권한, 평가를 갖춘 실행 가능한 에이전트
- **Workflow Automation** — 상태 관리, 재시도, 승인, 실패 복구를 포함한 자동화
- **Backend & Data** — API, 큐, 데이터베이스, 실시간 통신
- **Infra & Edge** — Linux, Docker, 네트워크, 장치 환경

## Selected Work

### DeepVoice Shield

모바일 환경에서 동작하는 딥보이스 탐지 시스템입니다. ONNX와 TensorFlow Lite 기반으로 모델을 경량화하고 실시간 음성 처리 파이프라인을 구성했습니다.

- 약 91% 모델 경량화
- On-device inference
- FastAPI 및 Android 연동

### Content Agent

콘텐츠 조사, 생성, 검수, 배포까지의 반복 작업을 에이전트와 워크플로우로 연결한 자동화 프로젝트입니다.

- Agent workflow
- RAG
- Evaluation
- End-to-end automation

### AegisView · Lab Guardian

폐쇄망 영상 AI 환경에서 객체 탐지 결과를 수집하고 실시간 관제 화면까지 전달하는 시스템입니다.

- YOLOv8
- Redis queue
- WebSocket
- Docker

### SiteOps Radar

생성형 검색 환경에서 브랜드 노출과 인용 흐름을 관찰하기 위한 AEO·GEO 분석 실험입니다.

- Search visibility analysis
- Automation
- Analytics

## Experience

### Infovally Korea — Backend Engineer

스마트팜 현장의 장치 연결, 엣지 서버 운영, 데이터 수집·전송 흐름을 개발하고 있습니다.

### ETRI Autonomous IoT Lab — Research Trainee

폐쇄망 영상 AI 관제 환경에서 실시간 추론 결과 처리와 Redis 기반 데이터 파이프라인을 구현했습니다.

## Tech

| Area | Stack |
| --- | --- |
| Backend | Node.js, TypeScript, NestJS, FastAPI |
| Data & Realtime | Redis, PostgreSQL, SQLite, WebSocket, MQTT |
| AI Systems | ONNX, TensorFlow Lite, YOLOv8, RAG, Agent Workflow |
| Infra & Edge | Linux, Docker, Network, Device Integration |
| Frontend | Next.js, React |

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
├─ components/       # 기존 재사용 컴포넌트
├─ projects/         # 프로젝트 상세 페이지
├─ studio/           # Sanity Studio
├─ globals.css       # 포트폴리오 디자인 시스템
├─ layout.tsx        # 전역 레이아웃 및 메타데이터
└─ page.tsx          # 메인 포트폴리오 화면
```

## Design Concept

시각 방향은 **Dark Navy System Hero + Light Editorial Content**입니다.

- AI 시스템 구조를 시각화한 Hero
- 경력과 프로젝트를 명확히 분리
- 숫자 과장 없이 문제, 역할, 결과 중심으로 구성
- 반응형 레이아웃과 reduced-motion 지원

---

© Hwang Gyubeom. Built with Next.js.
