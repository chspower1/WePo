import { AwardModel } from "../schemas/award";

class Award {

  // 새로운 수상내역 생성
  static async create({ userId, title, grade, org, date, description, awardId }) {
    return AwardModel.create({
      userId, 
      title, 
      grade, 
      org, 
      date, 
      description, 
      awardId 
    });
  }

  // userId에 해당하는 유저의 수상내역 전체조회
  static async findByUserId(userId) {
    return AwardModel.find({ userId });
  }

  // awardId에 해당하는 수상내역 조회
  static async findByAwardId(awardId) {
    return AwardModel.findOne({ awardId });
  }

  // awardId에 해당하는 수상내역 수정
  static async update({ awardId, newValues }) {
    const filter = { awardId: awardId };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedAward;
  }

  // awardId에 해당하는 자격증정보 삭제
  static async delete(awardId) {
    return AwardModel.findOneAndDelete({ awardId });
  }
}

export { Award };