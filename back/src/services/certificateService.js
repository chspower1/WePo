import { Certificate } from "../db";

class certificateService {

  // 자격증 추가
  static async addCertificate({ userId, title, date, org, description, certId, order }) {

    // 사용자가 필수로 입력해야하는 값이 모두 있는지 확인
    if(!title || !date || !org) {
      const errorMessage = 
        "필수값을 모두 입력해주세요."
        return  { errorMessage };
    }

    // front에서 생성하여 넘겨주는 id값 있는지 체크
    if(!certId) {  
      const errorMessage = 
        "certId값이 정상적으로 생성되지 않았습니다."
      return  { errorMessage };
    }

    return Certificate.create({ 
      userId, 
      title, 
      date, 
      org, 
      description, 
      certId,
      order
    });
  }

  // userId에 해당하는 유저의 자격증 전체 조회
  static async getCertificatesByUserId(userId) {
    return Certificate.findByUserId(userId);
  }

  // certId에 해당하는 자격증 조회
  static async getCertificate(certId) {
    return Certificate.findByCertId(certId);
  }

  // 자격증 수정
  static async updateCertificate({ certId, toUpdate }) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findByCertId(certId);

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

  // 자격증 순서 수정
  static async updateCertificateOrder(newCategories) {
    const newOrders = newCategories.map((newCategory, idx) => 
      ({ certId: newCategory.certId, order: idx })
    );

    newOrders.forEach((newOrder) => {
      Certificate.updateOrder(newOrder);
    });
    
    return;
  }

  // 자격증 삭제
  static async deleteCertificate(certId) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    const certificate = await Certificate.findByCertId(certId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage 
        = "자격증 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return Certificate.delete(certId);
  }

}

export { certificateService };
