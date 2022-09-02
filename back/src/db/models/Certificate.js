import { CertificateModel } from "../schemas/certificate";

class Certificate {

  // 새로운 자격증 생성
  static async create({ userId, title, date, org, description, certId, order }) {
    return CertificateModel.create({
      userId,
      title,
      date,
      org,
      description,
      certId,
      order
    });
  }

  // userId에 해당하는 유저의 자격증정보 전체조회
  static async findByUserId(userId) {
    return CertificateModel.find({ userId });
  }

  // certId에 해당하는 자격증정보 조회
  static async findByCertId(certId) {
    return CertificateModel.findOne({ certId });
  }

  // certId에 해당하는 자격증정보 수정
  static async update({ certId, newValues }) {
    const filter = { certId: certId };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedCertificate;
  }

  // 자격증 순서 변경
  static async updateOrder(newOrder) {

    const { certId, order } = newOrder;

    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      { certId: certId },
      { order: order },
      option
    );

    return updatedCertificate;
  }

  // certId에 해당하는 자격증정보 삭제
  static async delete(certId) {
    return CertificateModel.findOneAndDelete({ certId });
  }
}

export { Certificate };
