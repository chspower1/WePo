import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력 생성
  static async create({ userId, school, major, status, eduId, order }) {
    return EducationModel.create({
      userId,
      school,
      major,
      status,
      eduId,
      order
    });
  }

  // userId에 해당하는 유저의 학력정보 전체조회
  static async findByUserId(userId) {
    return EducationModel.find({ userId });
  }

  // eduId에 해당하는 학력정보 조회
  static async findByEduId(eduId) {
    return EducationModel.findOne({ eduId });
  }

  // eduId에 해당하는 학력정보 수정
  static async update({ eduId, newValues }) {
    const filter = { eduId: eduId };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedEducation;
  }

  // 학력 순서 변경
  static async updateOrder(newOrder) {

    const { eduId, order } = newOrder;

    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      { eduId: eduId },
      { order: order },
      option
    );

    return updatedEducation;
  }

  // eduId에 해당하는 학력정보 삭제
  static async delete(eduId) {
    return EducationModel.findOneAndDelete({ eduId });
  }
}

export { Education };
