import { AwardModel } from "../schemas/award";

class Award {

  // 새로운 수상내역 생성
  static async create(newAward) {
    return AwardModel.create(newAward);
  }

  // 한 유저의 수상내역 모두 불러오기
  static async findByUserId({ userId }) {
    return AwardModel.find({ userId });
  }

  // 한 수상내역 아이디로 수상내역 찾아오기
  static async findByAwardId({ awardId }) {
    return AwardModel.findById(awardId);
  }

  // 수상내역 삭제하기
  static async delete({ awardId }) {
    return AwardModel.findByIdAndDelete(awardId);
  }

  // 수상내역 속성 update하기
  static async update({ awardId, newValues }) {
    const filter = { _id: awardId };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedAward;
  }
}

export { Award };