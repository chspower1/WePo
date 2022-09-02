<img src="https://imgcloud.s3.us-east-1.wasabisys.com/yez78HiM58.png"/>

# 포트폴리오 공유 서비스, [ WePo ]

## 👋 소개

본 프로젝트는 `엘리스 AI트랙 5기` 첫번째 프로젝트의 8팀, `Limit`팀이 개발한 웹 서비스입니다.

우리(**We**)의 포트폴리오(**Po**rtfolio)를 작성하고, 서로 확인한다는 의미에서 `WePo`라는 이름을 붙여주었습니다.

⭐ [**[ WePo ] 사이트 보러 가기](http://kdt-ai5-team08.elicecoding.com/)** ⭐

> 위 링크는 프로젝트 진행 기간에만 유효합니다.
> 

📒 [**프로젝트 노션 페이지 보러 가기**](https://www.notion.so/Team-Limit-d1ce8a7ebec14b1dab9354bf4a3ede46) 📒

### 📅 **프로젝트 기간**

2022년 8월 22일 ~ 2022년 9월 3일 

### 👥 **팀 멤버**

Front-end | 김경원, 조호성, 한동룡

Back-end | 이준의, 정소희

---

## ⚙️ 설치 방법

1. 프론트엔드 서버 실행
    - Shell에서 다음 커맨드 입력:
        
        ```bash
        cd front
        yarn
        yarn start
        ```
        
2. 백엔드 서버 실행
    - 하기 명칭들의 변수가 선언된 `.env` 파일 `back` 폴더 내에 작성
        - SERVER_PORT
        - MONGODB_URL
        - JWT_SECRET_KEY
        - MAILS_EMAIL
        - MAILS_PWD
    
    > `MONGODB_URL`과 `MAILS_EMAIL`, `MAILS_PWD`에 대한 자세한 사항은 백엔드 README 참고
    > 
    - Shell에서 다음 커맨드 입력:
        
        ```bash
        cd back
        yarn
        yarn start
        ```
        
---

## 🛠️ 사용 기술

> front, back 폴더 내 README 참고

---

## 📋 기능 설명

### ☑️ 기본 기능

`엘리스`에서 제시하고 저희가 구현한 **5개 MVP(Minimum Viable Product)**와 각 MVP에 대한 설명은 다음과 같습니다:

- User (회원가입, 로그인 등 사용자 관련)
    - 회원가입
        - 회원가입 시 이메일, 이름, 비밀번호 형식 확인
        - 회원가입 시 비밀번호와 비밀번호 확인 일치 판단
    - 로그인
        
        <img src="showcase.gif" width="500px"/>
        
        - 로그인 시 이메일, 비밀번호 형식 확인
        - 로그인 시도 시 DB에 이메일 존재 여부 확인
        - 로그인 시도 시 비밀번호 확인
        - 로그인 성공 시 나의페이지로 이동
    - 나의 페이지 (개인 페이지)
        - 나의 페이지에서 이름과 설명 수정
    - 네트워크 페이지
        - 네트워크 페이지에서 모든 사용자 목록 띄우기
- Certificate (포트폴리오 중 자격증 관련)
    - 학력 정보 조회, 추가, 수정
    - 추가 및 수정은 나의 페이지에서만 가능
- Award (포트폴리오 중 상장 이력 관련)
    - 수상 이력 조회, 추가, 수정
    - 추가 및 수정은 나의 페이지에서만 가능
- Project (포트폴리오 중 프로젝트 관련)
    - 프로젝트 정보 조회, 추가, 수정
    - 추가 및 수정은 나의 페이지에서만 가능
- Education (포트폴리오 중 교육, 학교 관련)
    - 자격증 정보 조회, 추가, 수정
    - 추가 및 수정은 나의 페이지에서만 가능

### 🩹 기능 개선

5개 MVP의 연장선 상에서 개선하여 구현한 기능들은 다음과 같습니다:

> cf.) CAPE: Certificate, Award, Project, Education의 약자
> 
- 사용자 프로필 사진 업로드
- 사용자 비밀번호 변경
- `MongoDB`의 `$inc operator`를 활용한 사용자 ID를 부여하여 사용자 정보 조회 URL 간결화
- 비밀번호 입력 시 숨기기/보이기
- CAPE 삭제
- UI 고도화 (다크 모드, 미니 프로필) 및 애니메이션 추가
- UX 고도화 (시작 페이지, 모바일뷰)

### 💡 추가 기능

- 회원가입 시 **관심분야 선택**, 나의 페이지에서 수정
- 회원가입 시 사용자 **기본 프로필 사진 임의 적용** ( 총 10가지 종류 )
- 회원가입 시 **인증 이메일** 전송
- 비밀번호 5회 오입력 시 **임시 비밀번호** 이메일 전송
- CAPE 항목 순서 **DND**(Drag and Drop)로 변경
- 사용자 **즐겨찾기** 추가 및 조회
- 네트워크 페이지에서 관심분야로 목록 **필터링**
- 네트워크 페이지에서 사용자 **검색** (이름, 이메일, 설명 기준)

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다. Copyright 2022 엘리스 Inc. All rights reserved.

[README (Back-end)](back/README.md#wepo--백엔드)

[README (Front-end)](front/README.md#wepo-front-end)
