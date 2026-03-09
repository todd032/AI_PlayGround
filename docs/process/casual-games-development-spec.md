# 캐주얼 웹게임 개발 명세서 (나머지 8종)

## 공통 명세
- 기술: 순수 HTML/CSS/Vanilla JS
- 실행: 정적 서버 기반 (`python3 -m http.server 4173`)
- 접근 경로: `games/<slug>/`
- 공통 UI: 제목, 상태(점수/턴/시간), 리셋/런처 복귀

## 게임별 구현 포인트

### Tic-Tac-Toe (`games/tic-tac-toe`)
- 상태: 9칸 배열, 현재 턴, 게임 종료 플래그
- 로직: 클릭 시 턴 배치, 8개 승리 라인 검사, 무승부 처리

### 2048 Lite (`games/2048`)
- 상태: 4x4 보드, 점수
- 입력: 방향키
- 로직: 라인 압축/병합/재압축, 이동 발생 시 랜덤 타일 생성

### Snake (`games/snake`)
- 상태: 뱀 좌표 배열, 방향 벡터, 먹이 좌표, 점수
- 루프: 고정 간격 tick 이동, 충돌 판정, 먹이 생성

### Brick Breaker (`games/brick-breaker`)
- 상태: 패들, 공, 벽돌 배열
- 루프: requestAnimationFrame 기반 물리 업데이트
- 충돌: 벽/패들/벽돌 AABB 단순 판정

### Flappy Lite (`games/flappy-lite`)
- 상태: 새 위치/속도, 파이프 리스트, 점수
- 입력: Space 또는 캔버스 클릭
- 로직: 중력, 점프, 파이프 생성/이동/충돌

### Memory Match (`games/memory-match`)
- 상태: 카드 목록(open/done), 열린 카드 버퍼, 턴, 잠금 플래그
- 로직: 두 장 비교, 불일치 시 지연 닫기, 완료 시 클리어

### Tetris Lite (`games/tetris-lite`)
- 상태: 10x20 그리드, 현재 블록, 점수
- 입력: 좌/우/하/회전
- 로직: 충돌 검사, 라인 제거, 게임오버

### Color Reflex (`games/color-reflex`)
- 상태: 정답 색상, 점수, 남은 시간, 타이머
- 로직: 문제 랜덤 출제(텍스트/색상 분리), 제한 시간 종료 처리
