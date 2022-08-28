// @ts-ignore
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { mailService } from "../services/mailService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        const mailContent = {
            from: '"Limit" <wnsdml0120@gmail.com>', // sender address
            to: email, // list of receivers: "*@*.*, *@*.*"
            subject: "환영합니다!", // Subject line
            text: `${name}님, WePo에 가입하신 걸 축하드립니다!`, // plain text body
            html: `<h2><b>${name}<b/>님,</h2><br/>
                    WePo에 가입하신 걸 축하드립니다!`, // html body
          }
        
        await mailService.sendEmail(mailContent)
        
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

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

userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const userId = req["currentUserId"];
        const currentUserInfo = await userAuthService.getUserInfo({
            userId,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.put("/users/:id", login_required, async function (req, res, next) {
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
        const name = req.body.name ?? null;
        const description = req.body.description ?? null;

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

userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
    try {
        const userId = parseInt(req.params.id);
        const currentUserInfo = await userAuthService.getUserInfo({ userId });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        // currentUser와 조회되는 user가 다를 경우 조회된 user의 조회수 증가
        if (userId !== req["currentUserId"]) {
            await userAuthService.increaseView({ userId });
        }

        res.status(200).send(currentUserInfo);
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
