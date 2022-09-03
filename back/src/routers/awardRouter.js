import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";


const awardRouter = Router();

// 수상내역 추가
awardRouter.post("/", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const currentUserId = req["currentUserId"];
        const { title, grade, org, date, description, awardId, order } = req.body;

        // 신규 수상내역 추가
        const newAward = await awardService.addAward({
            userId: currentUserId,
            title,
            grade,
            org,
            date,
            description,
            awardId,
            order
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        }

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});

// 수상내역 조회
awardRouter.get("/list", login_required, async function (req, res, next) {
    try {
        const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId

        // userId가 들어오지 않았을 시 로그인한 유저의 정보 가져오기
        const userId = req.query.userId ?? currentUserId;

        // userId 매칭되는 것들 찾아오기
        const awardList = await awardService.getAwardsByUseId(userId);
        res.status(200).json(awardList);
    } catch (error) {
        next(error);
    }
});

// 수상내역 수정
awardRouter.put("/:awardId", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const awardId = req.params.awardId;

        // User authentication
        const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
        const award = await awardService.getAward(awardId);
        const userId = award.userId; // award 내에 저장된 userId
        if (currentUserId !== userId) {
            console.log(typeof currentUserId, typeof userId);
            throw new Error(
                "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
            );
        }

        // req (request) 에서 데이터 가져오기
        const { title, grade, org, date, description } = req.body;

        const toUpdate = { title, grade, org, date, description };
        const updatedAward = await awardService.updateAward({
            awardId,
            toUpdate,
        });

        if (updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }

        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
});

// 수상내역 삭제
awardRouter.delete("/:awardId", login_required, async function (req, res, next) {
    try {
        const awardId = req.params.awardId;

        // User authentication
        const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
        const award = await awardService.getAward(awardId);
        const userId = award.userId; // award 내에 저장된 userId

        if (currentUserId !== userId) {
            throw new Error(
                "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
            );
        }

        const deleteSuccessful = await awardService.deleteAward(awardId);

        if (deleteSuccessful.errorMessage) {
            throw new Error(deleteSuccessful.errorMessage);
        }

        res.status(200).json(deleteSuccessful);
    } catch (error) {
        next(error);
    }
});

// 수상내역 순서 변경
awardRouter.put("/", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        // req (request) 에서 데이터 가져오기
        const { newCategories } = req.body.data;

        await awardService.updateAwardOrder(newCategories);

        res.status(200).send("순서변경 성공");
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
