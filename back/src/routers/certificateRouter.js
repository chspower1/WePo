// @ts-ignore
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 자격증 추가
certificateRouter.post("/certificate", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const currentUserId = req['currentUserId'];
    const title = req.body.title;
    const date = req.body.date;
    const org = req.body.org;
    const description = req.body.description;

    const newCertificate = await certificateService.addCertificate({
      userId: currentUserId,
      title,
      date,
      org,
      description
    });

    if(newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(200).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 자격증 조회
certificateRouter.get("/certificateList", login_required, async function (req, res, next) {
    try {
      const currentUserId = req['currentUserId'];
      const certificateList = await certificateService.getCertificateListByUserId({ 
        userId: currentUserId 
      });
      
      res.status(200).send(certificateList);
    } catch (error) {
      next(error);
    }
  }
);

// 자격증 수정
certificateRouter.put("/certificate/:certId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const certId = req.params.certId;

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
