import is from "@sindresorhus/is";
import { Router } from "express";
import { educationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";


const educationRouter = Router();

// 학력 추가
educationRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const currentUserId = req['currentUserId'];
    const { school, major, status, eduId, order } = req.body;

    // 신규 학력 추가
    const newEducation = await educationService.addEducation({
      userId: currentUserId,
      school,
      major,
      status,
      eduId,
      order
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(200).json(newEducation);
  } catch (error) {
    next(error);
  }
});

// 학력 조회
educationRouter.get("/list", login_required, async function (req, res, next) {
  try {
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId

    // userId가 들어오지 않았을 시 로그인한 유저의 정보 가져오기
    const userId = req.query.userId ?? currentUserId;

    // userId 매칭되는 것들 찾아오기
    const educationList = await educationService.getEducationsByUserId(userId);
    res.status(200).json(educationList);
  } catch (error) {
    next(error);
  }
});

// 학력 수정
educationRouter.put("/:eduId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const eduId = req.params.eduId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const education = await educationService.getEducation(eduId);
    const userId = education.userId; // education 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const { school, major, status } = req.body;

    const toUpdate = { school, major, status };
    const updateEducation = await educationService.updateEducation({
      eduId,
      toUpdate,
    });

    if (updateEducation.errorMessage) {
      throw new Error(updateEducation.errorMessage);
    }

    res.status(200).json(updateEducation);
  } catch (error) {
    next(error);
  }
});


// 학력 삭제
educationRouter.delete("/:eduId", login_required, async function (req, res, next) {
  try {
    const eduId = req.params.eduId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const education = await educationService.getEducation(eduId);
    const userId = education.userId; // education 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    const deleteSuccessful = await educationService.deleteEducation(eduId);

    if (deleteSuccessful.errorMessage) {
      throw new Error(deleteSuccessful.errorMessage);
    }

    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});


// 학력 순서 변경
educationRouter.put("/", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { newCategories } = req.body.data;

    await educationService.updateEducationOrder(newCategories);

    res.status(200).send("순서변경 성공");
  } catch (error) {
    next(error);
  }
});


export { educationRouter };
