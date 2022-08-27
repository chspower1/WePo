import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 자격증 조회
certificateRouter.get("/certificateList", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.body.userId;

    // userId 매칭되는 것들 찾아오기
    const certificateList = await certificateService.getCertificateListByUserId({ userId })
    res.status(200).json(certificateList);
  } catch (error) {
    next(error);
  }
});

// 자격증 추가
certificateRouter.post("/certificate", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const currentUserId = req['currentUserId'];
    const title = req.body.title;
    const date = req.body.date;
    const org = req.body.org;
    const description = req.body.description;
    const certId = req.body.certId;

    // 신규 자격증 추가
    const newCertificate = await certificateService.addCertificate({
      userId: currentUserId,
      title,
      date,
      org,
      description,
      certId
    });

    if(newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(200).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 자격증 수정
certificateRouter.put("/certificate/:certId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Certificate 내에 저장된 userId
    if (currentUserId !== parseInt(userId)) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    } 

    const certId = req.params.certId;
    
    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const date = req.body.date;
    const org = req.body.org;
    const description = req.body.description;
    
    const toUpdate = { title, date, org, description };
    const updateCertificate = await certificateService.updateCertificate({ 
      certId, 
      toUpdate 
    });

    if(updateCertificate.errorMessage) {
      throw new Error(updateCertificate.errorMessage);
    }

    res.status(200).json(updateCertificate);
  } catch (error) {
    next(error);
  }
});


// 자격증 삭제
certificateRouter.delete("/certificate/:certId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Project 내에 저장된 userId
    if (currentUserId !== parseInt(userId)) {
      throw new Error(
        "해당 정보을 삭제할 권한이 없습니다. 본인의 정보만 삭제할 수 있습니다."
      );
    } 

    const certId = req.params.certId;
    const deleteSuccessful = await certificateService.deleteCertificate({ certId });

    if(deleteSuccessful.errorMessage) {
      throw new Error(deleteSuccessful.errorMessage);
    }

    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});




export { certificateRouter };
