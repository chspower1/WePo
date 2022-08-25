import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";

const awardRouter = Router();

// 수상내역 조회
awardRouter.get("/awardList", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.body._id;

    // award DB에서 userId 매칭되는 것들 찾아오기
    const allAwards = await awardService.getAllAwards({userId})
    res.status(200).json(allAwards);
  } catch (error) {
    next(error);
  }
});


// 수상내역 추가
awardRouter.post("/award", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const currentUserId = req["currentUserId"];
    const title = req.body.title;
    const grade = req.body.grade;
    const org = req.body.org;
    const date = req.body.date;
    const description = req.body.description;

    // 신규 수상내역 추가
    const newAward = await awardService.addAward({ userId: currentUserId, title, grade, org, date, description })
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});


// 수상내역 수정
awardRouter.put("/award/:awardId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // award 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const awardId = req.params.awardId;
    const title = req.body.title || undefined;
    const grade = req.body.grade || undefined;
    const org = req.body.org || undefined;
    const date = req.body.date || undefined;
    const description = req.body.description || undefined;
    
    const toUpdate = {title, grade, org, date, description};
    const updatedAward = await awardService.updateAward({
      awardId, 
      toUpdate
    })

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});


// 수상내역 삭제
awardRouter.delete("/award/:awardId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // award 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "currentUser가 본 award의 작성자가 아닙니다."
      );
    }

    const awardId = req.params.awardId;
    const deleteSuccessful = await awardService.deleteAward({awardId})
    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
