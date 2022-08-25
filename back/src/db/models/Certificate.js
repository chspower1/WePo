import { CertificateModel } from "../schemas/certificate";

class Certificate {

  // 새로운 자격증 생성
  static async create({ newCertificate }) {
<<<<<<< HEAD
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
=======
    return CertificateModel.create(newCertificate);
>>>>>>> feat/Login
  }

  // userId에 해당하는 유저의 자격증정보 전체조회
  static async findByUserId({ userId }) {
<<<<<<< HEAD
    const certificateList = await CertificateModel.find({ userId });
    return certificateList;
  }

  // certId에 해당하는 자격증정보 조회
  static async findOneByCertId({ certId }) {
    const certificate = await CertificateModel.findOne({ certId });
    return certificate;
=======
    return CertificateModel.find({userId});
  }

  // certId에 해당하는 자격증정보 조회
  static async findByCertId({ certId }) {
    return CertificateModel.findById(certId);
>>>>>>> feat/Login
  }

  // certId에 해당하는 자격증정보 수정
  static async update({ certId, newValues }) {
<<<<<<< HEAD
    const filter = { certId };
=======
    const filter = { _id: certId };
>>>>>>> feat/Login
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedCertificate;
  }

  // certId에 해당하는 자격증정보 삭제
  static async delete({ certId }) {
<<<<<<< HEAD
    const deleteSuccessful = await CertificateModel.findOneAndDelete(certId);
    return deleteSuccessful;
=======
    return CertificateModel.findOneAndDelete(certId);
>>>>>>> feat/Login
  }
}

export { Certificate };
