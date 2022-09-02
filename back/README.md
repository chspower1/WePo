<img src="https://imgcloud.s3.us-east-1.wasabisys.com/yez78HiM58.png"/>

# [ WePo ] 백엔드


## 사용기술
<div>
    <img src="https://img.shields.io/badge/node-339933?style=flat-square&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
    <img src="https://img.shields.io/badge/NodeMailer-339933?style=flat-square&logo=NodeMailer&logoColor=white"/>
    <img src="https://img.shields.io/badge/Multer-F46519?style=flat-square&logo=Multer&logoColor=white"/>
    <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
    <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JWT&logoColor=white"/>
    <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"/>
</div>

---

## 백엔드 설정

### 1. MongoDB 서버 구축 (a, b 중 선택)

#### a. 로컬 서버

📄 [공식 문서 참조](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
`mongosh` 커맨드로 서버가 들어가지면 성공적으로 구축된 것입니다.

#### b. Atlas 서버

[MongoDB Atlas](https://www.mongodb.com/atlas) 가입 -> 무료 클러스터 생성 (512MB)
왼쪽 아래 SECURITY 의 Database Access -> Add New User -> name, password 설정
왼쪽 아래 SECURITY 의 Network Access -> Add IP Address -> current IP 등록
왼쪽 위 DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사

### 2. MongoDB 서버 URL 환경변수에 등록

`.env` 파일 수정
MONGODB_URL을 위에서 만든 mongodb 서버 링크로 설정

```
MONGODB_URL="mongodb://localhost:27017/myDB"  (로컬 서버의 경우 예시)MONGODB_URL="mongodb+srv://<name>:<password>@cluster0.acaph.mongodb.net/myDB?retryWrites=true&w=majority" (Atlas 서버의 경우 예시)
```

> Atlas 서버의 경우 `<name>`, `<password>`를 위에서 설정했던 name, password로 바꾸어 주세요.
> 

### 3. Nodemailer 설정

> 본 프로젝트는 구글 이메일 (Gmail) 기준으로 설정되었음을 유의 바랍니다.
> 
- [구글 계정 설정 > 보안](https://myaccount.google.com/security) 메뉴에서, `Google에 로그인`(Signing in to Google) 옵션 중 `2단계 인증`(2-Step Verification)을 `사용함`으로 변경
- `Google에 로그인`(Signing in to Google) 옵션 중 `앱 비밀번호`(App passwords) 클릭
- 앱 비밀번호를 생성할 앱 및 기기를 선택 ( `앱 선택 > 기타` 로 설정 후 앱 이름 설정) 후 생성
- **구글 이메일 계정**과 생성된 **앱 비밀번호**를 `.env`에 기입

```markdown
MAILS_EMAIL="구글아이디@gmail.com"
MAILS_PWD="앱 비밀번호"
```

### 4. Express 실행

- `npm` 패키지인 `yarn`을 설치합니다. (이미 설치 시 생략)
- 이후, `yarn` 혹은 `yarn install` 커맨드는  `package.json` 바탕으로 필요한 라이브러리를 한꺼번에 설치해 줍니다.
- `yarn start` 커맨드를 입력하여 실행합니다.

```bash
npm install --global yarn
yarn
yarn start
```

---

## 폴더 구조

```
📦 back
├─ uploads -> 가입 시 임의 지정되는 프로필 사진과 업로드된 사진들 보관
└─ src
   ├─ db 
   │  ├─ index.js -> Mongoose와 MongoDB 서버를 연결
   │  ├─ schemas
   │  │  ├─ ... -> 기본 MVP 5개
   │  │  ├─ sequence.js -> 사용자 생성 시 숫자 아이디를 부여에 쓰임
   │  │  ├─ email.js -> 이메일 인증에 쓰임
   │  │  └─ trial.js -> 로그인 실패 횟수 확인에 쓰임
   │  └─ models
   │     ├─ ... -> 기본 MVP 5개
   │     ├─ Email.js 
   │     └─ Trial.js
   ├─ services -> 백엔드 로직 코드들
   ├─ routers -> request와 response 처리하는 라우터들
   ├─ middlewares -> jwt 및 에러처리 미들웨어들
   ├─ utils
   │  └─ imageUpload.js -> multer를 활용해 사용자 프로필 사진 업로드에 쓰임
   └─ app.js
```