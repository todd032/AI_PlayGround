# AI_PlayGround

여러 게임을 게임별 폴더로 관리하는 웹/앱 게임 플레이그라운드입니다.

## 폴더 구조

- `games/meteor-dodge/`: 첫 번째 아케이드 게임 Meteor Dodge

## 빠른 실행 (로컬)

아래처럼 저장소 루트를 정적 서버로 실행하세요.

```bash
python3 -m http.server 4173
```

그다음 아래 주소로 접속하면 됩니다.

- 게임 런처(기본 진입): `http://localhost:4173/`
- Meteor Dodge 직접 실행: `http://localhost:4173/games/meteor-dodge/`

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
