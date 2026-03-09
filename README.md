# AI_PlayGround

여러 게임을 게임별 폴더로 관리하는 웹/앱 게임 플레이그라운드입니다.

## 폴더 구조

- `games/meteor-dodge/`: 첫 번째 아케이드 게임 Meteor Dodge

## 실행 방법 (Meteor Dodge)

아래처럼 저장소 루트를 정적 서버로 실행한 뒤 브라우저에서 게임 경로로 접속하세요.

```bash
python3 -m http.server 4173
```

접속 주소:

- `http://localhost:4173/games/meteor-dodge/`

## Meteor Dodge 게임 설명

- 좌우 이동으로 떨어지는 메테오를 피하며 생존 점수를 올립니다.
- 점수는 프레임 기반으로 증가합니다.
- 최고 점수는 `localStorage`에 저장되어 재방문 시 유지됩니다.
