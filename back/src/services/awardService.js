import { Award } from "../db/models/Award";

class AwardService {

  static async addAward({ userId, title, startDate, endDate, description }) {
    // 새 수상내역 추가
    // 에러 처리 추가하기
    return Award.create({ userId, title, startDate, endDate, description });
  }

  static async getAllAwards({userId}) {
    // 모든 수상내역 불러오기
    // 에러 처리 추가하기 
    return Award.findByUserId({userId});
  }

  static async updateAward({AwardId, toUpdate}) {
    const { title, startDate, endDate, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(description && { description }),
    }
    return Award.update({AwardId, newValues});
  }

  static async deleteAward({AwardId}){
    return Award.delete({AwardId})
  }
}

export { AwardService };