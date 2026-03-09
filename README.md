# AI_PlayGround

여러 게임을 게임별 폴더로 관리하는 웹/앱 게임 플레이그라운드입니다.

## 폴더 구조

- `games/meteor-dodge/`: 첫 번째 아케이드 게임 Meteor Dodge
- `games/minesweeper/`: 두 번째 퍼즐 게임 Mini Minesweeper

## 빠른 실행 (로컬)

아래처럼 저장소 루트를 정적 서버로 실행하세요.

```bash
python3 -m http.server 4173
```

그다음 아래 주소로 접속하면 됩니다.

- 게임 런처(기본 진입): `http://localhost:4173/`
- Meteor Dodge 직접 실행: `http://localhost:4173/games/meteor-dodge/`
- Mini Minesweeper 직접 실행: `http://localhost:4173/games/minesweeper/`

## GitHub 링크로 바로 플레이하기

이 저장소는 GitHub Pages 정적 배포를 지원합니다.

1. GitHub 저장소의 **Settings → Pages**에서 Source를 **GitHub Actions**로 선택
2. `main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 자동 배포
3. 배포 후 아래 URL로 접속하면 게임 런처 페이지가 열립니다

- `https://<github-username>.github.io/<repo-name>/`

## Meteor Dodge 게임 설명

- 좌우 이동으로 떨어지는 메테오를 피하며 생존 점수를 올립니다.
- 점수는 프레임 기반으로 증가합니다.
- 최고 점수는 `localStorage`에 저장되어 재방문 시 유지됩니다.

## Mini Minesweeper 게임 설명

- 9x9 보드에서 지뢰 10개를 피해 모든 안전 칸을 열면 승리합니다.
- 첫 클릭은 안전하게 보장되며, 우클릭(모바일은 롱프레스)으로 깃발을 표시할 수 있습니다.
- 클리어 시간 최고 기록은 `localStorage`에 저장되어 재방문 시 유지됩니다.

## 게임 제작 프로세스 (Template 기반)

- 기획 입력 템플릿: `docs/templates/game-concept-template.md`
- Meteor Dodge 기획서 예시: `docs/templates/meteor-dodge-concept.md`
- 상세 개발 계획 템플릿: `docs/process/game-development-plan-template.md`
- 전체 워크플로우 안내: `docs/process/WORKFLOW.md`

권장 흐름:
1. 사용자가 기획 템플릿 작성
2. Codex가 상세 개발 계획서 작성
3. 계획 승인 후 구현 진행
