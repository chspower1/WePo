import { Certificate } from "../db";
<<<<<<< HEAD
import { v4 as uuidv4 } from "uuid";
=======
>>>>>>> feat/Login

class certificateService {

  // 자격증 추가
  static async addCertificate({ userId, title, date, org, description }) {
<<<<<<< HEAD

    // 해당 자격증에 대한 유니크 id 부여
    const certId = uuidv4();
    const newCertificate = { certId, userId, title, date, org, description };
=======
    const newCertificate = { userId, title, date, org, description };
>>>>>>> feat/Login

    if(!title || !date || !org) {
      const errorMessage = 
        "자격증정보 필수값을 모두 입력해주세요."
        return  { errorMessage };
    }

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

<<<<<<< HEAD

  // userId에 해당하는 유저의 자격증 전체 조회
  static async getCertificateListByUserId({ userId }) {
    const certificateList = await Certificate.findByUserId({ userId });
    return certificateList;
  }

  // certId에 해당하는 자겨증정보 조회
  static async getCertificateByCertId({ certId }) {
    const certificate = await Certificate.findOneByCertId({ certId });
    return certificate;
  }


  // 자격증 수정
  static async updateCertificate({ certId, toUpdate }) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findOneByCertId({ certId });
=======
  // userId에 해당하는 유저의 자격증 전체 조회
  static async getCertificateListByUserId({ userId }) {
    return Certificate.findByUserId({ userId });
  }

  // 자격증 수정
  static async updateCertificate({ certId, toUpdate }) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findByCertId({ certId });
>>>>>>> feat/Login

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage 
      = "자격증 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const { title, date, org, description } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(date && { date }),
      ...(org && { org }),
      ...(description && { description }),
    };

    return Certificate.update({ certId, newValues });
  }

  // 자격증 삭제
  static async deleteCertificate({ certId }) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
<<<<<<< HEAD
    let certificate = await Certificate.findOneByCertId({ certId });
=======
    let certificate = await Certificate.findByCertId({ certId });
>>>>>>> feat/Login

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage 
      = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

<<<<<<< HEAD
    const deleteSuccessful = await Certificate.delete({ certId });
    return deleteSuccessful;
  }
  
=======
    return Certificate.delete({ certId });
  }
>>>>>>> feat/Login
}

export { certificateService };
