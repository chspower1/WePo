// @ts-ignore
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { emailService } from "../services/emailService";
import { User } from "../db/models/User"


const userAuthRouter = Router();

// 회원가입 - 이메일 인증번호 전송
userAuthRouter.post("/register/email-send", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        // req (request) 에서 데이터 가져오기
        const { name, email } = req.body;

        // email 중복확인
        const user = await User.findByEmail({ email });
        if (user) {
            throw new Error("이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.");
        }

        // 인증 이메일 전송
        const codeAdded = await emailService.createAuthCode(email)

        const mailContent = {
            from: '"Limit" <wnsdml0120@gmail.com>', // sender address
            to: email, // list of receivers: "*@*.*, *@*.*"
            subject: "WePo 회원가입 인증번호", // Subject line
            text: `${name}님의 인증번호는 ${codeAdded.authCode}입니다.`, // plain text body
            html: `<b>${name}<b/>님의 인증번호는<br/>
                    <h3>${codeAdded.authCode}</h3>입니다.`, // html body
          }
        
        const emailSent = await emailService.sendEmail(mailContent)
        if(emailSent.rejected.length!==0){
            throw new Error("이메일 전송을 실패했습니다.")
        }

        res.status(201).send("인증번호 전송 성공");
    } catch (error) {
        next(error);
    }
});

// 회원가입 - 이메일 인증번호 확인
userAuthRouter.post("/register/email-check", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        // req (request) 에서 데이터 가져오기
        const { email, authCode } = req.body;
        
        // 입력된 authCode DB와 비교
        const gotAuthCode = await emailService.getAuthCode(email)
        if(gotAuthCode!==authCode){
            throw new Error("인증번호가 틀렸습니다.")
        }

        // 인증 성공 시 email-authCode pair DB에서 삭제
        await emailService.deleteAuthCode(email)

        res.status(201).send("인증성공");
    } catch (error) {
        next(error);
    }
});      

// 회원가입 - 최종 단계
userAuthRouter.post("/register", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        // req (request) 에서 데이터 가져오기
        const { name, email, password, field } = req.body;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
            field
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        // 회원 가입 완료 이메일 전송
        const mailContent = {
            from: '"Limit" <wnsdml0120@gmail.com>', // sender address
            to: email, // list of receivers: "*@*.*, *@*.*"
            subject: "환영합니다!", // Subject line
            text: `${name}님, WePo에 가입하신 걸 축하드립니다!`, // plain text body
            html: `<h2><b>${name}<b/>님,</h2><br/>
                    WePo에 가입하신 걸 축하드립니다!`, // html body
          }
        
        const emailSent = await emailService.sendEmail(mailContent)
        if(!emailSent.accepted){
            throw new Error("이메일 전송을 실패했습니다.")
        }

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인
userAuthRouter.post("/login", async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const { email, password } = req.body;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

// 전체 사용자 목록 불러오기
userAuthRouter.get("/list", login_required, async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

// 현재 사용자 목록 정보 불러오기
userAuthRouter.get("/current", login_required, async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const userId = req["currentUserId"];
        const currentUserInfo = await userAuthService.getUserInfo(userId);

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

// id의 사용자 정보 update
userAuthRouter.put("/:id", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        // User authentication
        const currentUserId = req["currentUserId"]; // 현재 로그인 중인 UserId
        // URI로부터 사용자 id를 추출함.
        const userId = parseInt(req.params.id);

        if (userId !== currentUserId) {
            console.log(userId, currentUserId);
            throw new Error(
                "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
            );
        }

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { name, description } = req.body;

        const toUpdate = { name, description };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({
            userId,
            toUpdate,
        });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// id를 즐겨찾기에 추가/삭제
userAuthRouter.put("/togglelike/:id", login_required, async function (req, res, next) {
    try {
        // User authentication
        const userId = req["currentUserId"]; // 현재 로그인 중인 UserId
        const otherId = parseInt(req.params.id); // 추가/삭제할 id

        // 즐겨찾기 추가/삭제
        const toggleDone = await userAuthService.toggleLike({userId, otherId})

        res.status(200).json(toggleDone);
    } catch (error) {
        next(error);
    }
});

// id의 사용자 정보 불러오기
userAuthRouter.get("/:id", login_required, async function (req, res, next) {
    try {
        const userId = parseInt(req.params.id);
        const currentUserInfo = await userAuthService.getUserInfo(userId);

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        // currentUser와 조회되는 user가 다를 경우 조회된 user의 조회수 증가
        if (userId !== req["currentUserId"]) {
            await userAuthService.increaseView(userId);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

// 검색하기-- 구현하기!!
userAuthRouter.get("/search/:toSearch", login_required, async function (req, res, next) {
    try {
        // currentUser와 조회되는 user가 다를 경우 조회된 user의 조회수 증가
        const toSearch = req.params.toSearch
        console.log(toSearch)
        res.status(200).send(toSearch);
    } catch (error) {
        next(error);
    }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
    res.status(200).send(
        `안녕하세요 ${req["currentUserId"]}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
