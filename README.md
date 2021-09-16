# hereandhear-refactoring

## 변수명 및 함수명 수정

<br>

## util 함수 분리

<storng>사용자</storng>

1. 암호화 함수
2. 토큰 생성 함수
3. CRUD 관련 로직 담당 함수

<br>

## 토큰 인증 방식 적용

1. 사용자가 로그인 시 access token과 refresh token 발행
2. access token에는 사용자의 id와 email 저장
3. refresh token은 사용자의 DB에 저장
4. access token 만료 시 refresh token으로 access token 발급 로직 구현
5. 토큰 인증 미들웨어 생성하여 인증이 필요한 로직에는 해당 미들웨어 삽입

<br>

## 새로운 비밀번호 발급 로직

진행중입니다.
