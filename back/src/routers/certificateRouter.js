import is from "@sindresorhus/is";
import { Router } from "express";
import { certificateService } from "../services/certificateService";
import { login_required } from "../middlewares/login_required";


const certificateRouter = Router();

// 자격증 추가
certificateRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const currentUserId = req['currentUserId'];
    const { title, date, org, description, certId, order } = req.body;

    // 신규 자격증 추가
    const newCertificate = await certificateService.addCertificate({
      userId: currentUserId,
      title,
      date,
      org,
      description,
      certId,
      order
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(200).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 자격증 조회
certificateRouter.get("/list", login_required, async function (req, res, next) {
  try {

    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId

    // userId가 들어오지 않았을 시 로그인한 유저의 정보 가져오기
    const userId = req.query.userId ?? currentUserId;

    // userId 매칭되는 것들 찾아오기
    const certificateList = await certificateService.getCertificatesByUserId(userId);
    res.status(200).json(certificateList);
  } catch (error) {
    next(error);
  }
});

// 자격증 수정
certificateRouter.put("/:certId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const certId = req.params.certId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const certificate = await certificateService.getCertificate(certId);
    const userId = certificate.userId; // certificate 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const { title, date, org, description } = req.body;

    const toUpdate = { title, date, org, description };
    const updateCertificate = await certificateService.updateCertificate({
      certId,
      toUpdate
    });

    if (updateCertificate.errorMessage) {
      throw new Error(updateCertificate.errorMessage);
    }

    res.status(200).json(updateCertificate);
  } catch (error) {
    next(error);
  }
});


// 자격증 삭제
certificateRouter.delete("/:certId", login_required, async function (req, res, next) {
  try {
    const certId = req.params.certId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const certificate = await certificateService.getCertificate(certId);
    const userId = certificate.userId; // certificate 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    const deleteSuccessful = await certificateService.deleteCertificate(certId);

    if (deleteSuccessful.errorMessage) {
      throw new Error(deleteSuccessful.errorMessage);
    }

    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});

// 자격증 순서 변경
certificateRouter.put("/", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { newCategories } = req.body.data;

    await certificateService.updateCertificateOrder(newCategories);

    res.status(200).send("순서변경 성공");
  } catch (error) {
    next(error);
  }
});


export { certificateRouter };
