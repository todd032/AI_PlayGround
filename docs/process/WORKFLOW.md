# Game Delivery Workflow

이 저장소에서 새 게임을 만들 때의 표준 프로세스입니다.

## Step 1) 기획 입력
- 작성자(사용자)가 `docs/templates/game-concept-template.md`를 채웁니다.

## Step 2) 개발 계획 수립
- Codex가 입력 내용을 바탕으로 `docs/process/game-development-plan-template.md` 형식의 상세 계획서를 작성합니다.
- 이 단계에서 범위(MVP)와 제외 범위(Out of Scope)를 명확히 고정합니다.

## Step 3) 구현
- `games/<game-slug>/` 폴더에 게임 구현
- 필요 시 루트 런처(`index.html`)에 게임 카드 추가
- README 실행/접속 정보 반영

## Step 4) 검증
- 최소 정적 점검 + 로컬 실행 확인
- 시각적 변화가 있으면 스크린샷 캡처

## Step 5) 전달
- 커밋 + PR 요약 + 테스트 결과 공유

---

## 빠른 사용 가이드
1. 템플릿 복사
   - `docs/templates/game-concept-template.md` → `docs/templates/<game-slug>-concept.md`
2. 기획서 작성
3. "이 기획서로 개발 계획서 만들어줘" 요청
4. 계획 승인 후 "구현 진행" 요청
