import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력 생성
  static async create({ newEducation }) {
    return EducationModel.create(newEducation);
  }

  // userId에 해당하는 유저의 학력정보 전체조회
  static async findByUserId({ userId }) {
    return EducationModel.find({userId});
  }

  // eduId에 해당하는 학력정보 조회
  static async findByEduId({ eduId }) {
    return EducationModel.findById(eduId);
  }

  // eduId에 해당하는 학력정보 수정
  static async update({ eduId, newValues }) {
    const filter = { _id: eduId };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedEducation;
  }

  // eduId에 해당하는 학력정보 삭제
  static async delete({ eduId }) {
    return EducationModel.findByIdAndDelete(eduId);
  }
}

export { Education };
