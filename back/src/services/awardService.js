import { Award } from "../db/models/Award";

class awardService {

  // 수상내역 추가
  static async addAward({ userId, title, grade, org, date, description }) {
    // 에러 처리 추가하기
    const newAward = { userId, title, grade, org, date, description }
    return Award.create({ newAward });
  }

  // userId에 해당하는 유저의 수상내역 전체 조회
  static async getAllAwards({ userId }) {
    // 에러 처리 추가하기 
    return Award.findByUserId({ userId });
  }

  // 수상내역 수정
  static async updateAward({ awardId, toUpdate }) {
    const { title, grade, org, date, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(grade && { grade }),
      ...(org && { org }),
      ...(date && { date }),
      ...(description && { description }),
    }
    return Award.update({ awardId, newValues });
  }

  // 수상내역 삭제
  static async deleteAward({ awardId }){
    return Award.delete({ awardId })
  }
}

export { awardService };