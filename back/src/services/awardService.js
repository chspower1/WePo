import { Award } from "../db/models/Award";

class awardService {

<<<<<<< HEAD
  static async addAward({ userId, title, grade, org, date, description }) {
    // 새 수상내역 추가
=======
  // 수상내역 추가
  static async addAward({ userId, title, grade, org, date, description }) {
>>>>>>> feat/Login
    // 에러 처리 추가하기
    return Award.create({ userId, title, grade, org, date, description });
  }

<<<<<<< HEAD
  static async getAllAwards({userId}) {
    // 모든 수상내역 불러오기
    // 에러 처리 추가하기 
    return Award.findByUserId({userId});
  }

  static async updateAward({awardId, toUpdate}) {
=======
  // userId에 해당하는 유저의 수상내역 전체 조회
  static async getAllAwards({ userId }) {
    // 에러 처리 추가하기 
    return Award.findByUserId({ userId });
  }

  // 수상내역 수정
  static async updateAward({ awardId, toUpdate }) {
>>>>>>> feat/Login
    const { title, grade, org, date, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(grade && { grade }),
      ...(org && { org }),
      ...(date && { date }),
      ...(description && { description }),
    }
<<<<<<< HEAD
    return Award.update({awardId, newValues});
  }

  static async deleteAward({awardId}){
    return Award.delete({awardId})
=======
    return Award.update({ awardId, newValues });
  }

  // 수상내역 삭제
  static async deleteAward({ awardId }){
    return Award.delete({ awardId })
>>>>>>> feat/Login
  }
}

export { awardService };