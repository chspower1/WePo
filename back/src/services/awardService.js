import { Award } from "../db/models/Award";

class awardService {

  static async addAward({ userId, title, grade, org, date, description }) {
    // 새 수상내역 추가
    // 에러 처리 추가하기
    return Award.create({ userId, title, grade, org, date, description });
  }

  static async getAllAwards({userId}) {
    // 모든 수상내역 불러오기
    // 에러 처리 추가하기 
    return Award.findByUserId({userId});
  }

  static async updateAward({awardId, toUpdate}) {
    const { title, grade, org, date, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(grade && { grade }),
      ...(org && { org }),
      ...(date && { date }),
      ...(description && { description }),
    }
    return Award.update({awardId, newValues});
  }

  static async deleteAward({awardId}){
    return Award.delete({awardId})
  }
}

export { awardService };