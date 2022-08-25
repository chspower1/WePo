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

    if(newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

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
educationRouter.put("/education/:eduId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const eduId = req.params.eduId;

    // 학력정보을 입력했던 유저와 로그인한 유저가 같은지 비교하는 부분
    // 주석처리한 이유 #1 :  postman으로 해보니까 토큰값이 틀리면 애초에 login_required에서 막혀서 "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요." 에러메세지 나옴 -> 이 부분이 필요없어보임
    // const education = await educationService.getEducationByEduId({ eduId });
    // const currentUserId = req['currentUserId'];
    // if(education.userId !== currentUserId) {   
    //   throw new Error(
    //     "학력을 추가할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
    //   );
    // } 

    const school = req.body.school;
    const major = req.body.major;
    const status = req.body.status;

    
    const toUpdate = { school, major, status };
    const updateEducation = await educationService.updateEducation({ 
      eduId, 
      toUpdate 
    });

    if(updateEducation.errorMessage) {
      throw new Error(updateEducation.errorMessage);
    }

    res.status(200).json(updateEducation);
  } catch (error) {
    next(error);
  }
});


// 학력 삭제
educationRouter.delete("/education/:eduId", login_required, async function (req, res, next) {
  try {
    const eduId = req.params.eduId;

    const deleteSuccessful = await educationService.deleteEducation({ eduId });

    if(deleteSuccessful.errorMessage) {
      throw new Error(deleteSuccessful.errorMessage);
    }

    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});




export { educationRouter };
