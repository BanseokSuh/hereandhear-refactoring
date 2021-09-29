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

## 새로운 비밀번호 발급 로직 추가

1. 사용자가 비밀번호를 기억하지 못할 시에
2. email과 이름을 입력받아 해당 사용자가 있는 것을 확인한 후
3. 해당 사용자 데이터가 존재한다면 입력된 email로 임의의 문자열 전송
4. 그 사이에 임의의 문자열을 해싱하여 salt와 함께 DB에 저장

<br>

## 비밀번호 변경 로직 추가

1. 로그인한 상태에서 토큰 값으로 사용자 정보(email) 조회
2. 이메일, 이전 비밀번호, 새 비밀번호 입력받음
3. 토큰에서 조회한 이메일과 입력받은 이메일 비교
4. 새 비밀번호 해싱하여 DB에 update
