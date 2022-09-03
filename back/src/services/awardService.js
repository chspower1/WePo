import { Award } from "../db";

class awardService {

  // 수상내역 추가
  static async addAward({ userId, title, grade, org, date, description, awardId, order }) {

    // 사용자가 필수로 입력해야하는 값이 모두 있는지 확인
    if (!title || !grade || !org || !date) {
      const errorMessage =
        "필수값을 모두 입력해주세요."
      return { errorMessage };
    }

    // front에서 생성하여 넘겨주는 id값 있는지 체크
    if (!awardId) {
      const errorMessage =
        "awardId값이 정상적으로 생성되지 않았습니다."
      return { errorMessage };
    }

    return Award.create({
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

  // userId에 해당하는 유저의 수상내역 전체 조회
  static async getAwardsByUseId(userId) {
    return Award.findByUserId(userId);
  }

  // awardId에 해당하는 수상내역 조회
  static async getAward(awardId) {
    return Award.findByAwardId(awardId);
  }

  // 수상내역 수정
  static async updateAward({ awardId, toUpdate }) {
    // 해당 awardId의 자격증정보가 db에 존재하는지 여부 확인
    let award = await Award.findByAwardId(awardId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage
        = "수상이력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }


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

  // 수상내역 순서 수정
  static async updateAwardOrder(newCategories) {
    const newOrders = newCategories.map((newCategory, idx) =>
      ({ awardId: newCategory.awardId, order: idx })
    );

    newOrders.forEach((newOrder) => {
      Award.updateOrder(newOrder);
    });

    return;
  }

  // 수상내역 삭제
  static async deleteAward(awardId) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    const award = await Award.findByAwardId(awardId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage
        = "수상이력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return Award.delete(awardId);
  }
}

export { awardService };