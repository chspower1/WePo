import { AwardModel } from "../schemas/award";

class Award {

  // 새로운 수상내역 생성
  static async create({ userId, title, grade, org, date, description, awardId, order }) {
    return AwardModel.create({
      userId,
      title,
      grade,
      org,
      date,
      description,
      awardId,
      order
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

  // 수상내역 순서 변경
  static async updateOrder(newOrder) {

    const { awardId, order } = newOrder;

    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      { awardId: awardId },
      { order: order },
      option
    );

    return updatedAward;
  }

  // awardId에 해당하는 수상내역 삭제
  static async delete(awardId) {
    return AwardModel.findOneAndDelete({ awardId });
  }
}

export { Award };