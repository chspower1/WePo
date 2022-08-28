import { Education } from "../db";

class educationService {

  // 학력 추가
  static async addEducation({ userId, school, major, status, eduId }) {
    const newEducation = { userId, school, major, status, eduId };

    if(!school || !major || !status) {
      const errorMessage = 
        "학력정보 필수값을 모두 입력해주세요."
        return  { errorMessage };
    }

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  // userId에 해당하는 유저의 학력 전체 조회
  static async getEducationListByUserId({ userId }) {
    return Education.findByUserId({ userId });
  }
  
  // 학력 수정
  static async updateEducation({ eduId, toUpdate }) {
    // 해당 eduId의 학력정보가 db에 존재하는지 여부 확인
    let education = await Education.findByEduId({ eduId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage 
      = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const { school, major, status } = toUpdate;

    const newValues = {
      ...(school && { school }),
      ...(major && { major }),
      ...(status && { status }),
    };

    return Education.update({ eduId, newValues });
  }

  // 학력 삭제
  static async deleteEducation({ eduId }) {
    // 해당 eduId의 학력정보가 db에 존재하는지 여부 확인
    let education = await Education.findByEduId({ eduId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage 
      = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return Education.delete({ eduId });
  }
}

export { educationService };
