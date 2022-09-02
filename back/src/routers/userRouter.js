import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { emailService } from "../services/emailService";
import imageUpload from "../utils/imageUpload";

const upload = imageUpload("uploads", 5);

const userAuthRouter = Router();

// 회원가입
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
            field,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        // 인증코드 생성
        const codeAdded = await emailService.createAuthCode(newUser.userId);

        // 인증 이메일 전송
        const mailContent = newUser.mailContent
        mailContent.setContent(codeAdded.authCode)
        await emailService.sendEmail(mailContent);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 회원가입 - 이메일 인증
userAuthRouter.post("/register/:userId/:authCode", async function (req, res, next) {
    try {
        // path parameter 가져오기
        const { userId, authCode } = req.params;

        // 입력된 authCode DB와 비교
        const gotAuthCode = await emailService.getAuthCode(userId);
        if (gotAuthCode.authCode != authCode) {
            throw new Error("인증 실패했습니다.");
        }

        // 인증 성공 시 userId-authCode pair DB에서 삭제
        await emailService.deleteAuthCode(userId);

        res.status(201).send("인증성공");
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

        // 로그인 시도 횟수 4회 초과 시 비밀번호 리셋 후 이메일 전송
        if (user.mailContent) {
            await emailService.sendEmail(user.mailContent);
            const errorMessage =
                "로그인 시도 가능 횟수를 초과하여 이메일로 새 비밀번호를 보내드렸습니다.";
            throw new Error(errorMessage);
        }

        // user의 이메일 인증여부 확인
        const gotAuthCode = await emailService.getAuthCode(user.userId);
        if (gotAuthCode) {
            throw new Error("이메일 인증 완료 부탁드립니다.");
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

// id의 사용자 정보 update
userAuthRouter.post("/:id", login_required, upload.single('image'), async function (req, res, next) {
    try {
        // User authentication
        const currentUserId = req["currentUserId"]; // 현재 로그인 중인 UserId
        // URI로부터 사용자 id를 추출함.
        const userId = parseInt(req.params.id);

        if (userId !== currentUserId) {
            throw new Error(
                "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
            );
        }

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { name, description, field } = req.body;
        const imageFile = req.file;
        let picture = null;

        if (imageFile) {
            picture = Buffer.from(imageFile.originalname, 'latin1').toString('utf8');
        }

        const toUpdate = { name, description, field, picture };

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
        const toggleDone = await userAuthService.toggleLike({ userId, otherId });

        res.status(200).json(toggleDone);
    } catch (error) {
        next(error);
    }
});

// 비밀번호 변경
userAuthRouter.put("/changePassword", login_required, async function (req, res, next) {
    try {
        const userId = req["currentUserId"];
        const { oldPassword, newPassword } = req.body;
        const updatedUser = await userAuthService.changePassword({
            userId,
            oldPassword,
            newPassword,
        });
        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }
        res.status(200).send("비밀번호 변경 성공");
    } catch (error) {
        next(error);
    }
});

export { userAuthRouter };
