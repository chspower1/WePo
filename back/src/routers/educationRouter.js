// @ts-ignore
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// 학력 추가
educationRouter.post("/education", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const currentUserId = req['currentUserId'];
    const school = req.body.school;
    const major = req.body.major;
    const status = req.body.status;

    const newEducation = await educationService.addEducation({
      userId: currentUserId,
      school,
      major,
      status,
    });

    res.status(200).json(newEducation);
  } catch (error) {
    next(error);
  }
});

// 학력 조회
educationRouter.get("/educationList", login_required, async function (req, res, next) {
    try {
      const currentUserId = req['currentUserId'];
      const educationList = await educationService.getEducationListByUserId({ 
        userId: currentUserId 
      });

      res.status(200).send(educationList);
    } catch (error) {
      next(error);
    }
  }
);

// 학력 수정





export { educationRouter };
