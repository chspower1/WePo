import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {

  // 학력 추가
  static async addEducation({ userId, school, major, status }) {

    const eduId = uuidv4();
    const newEducation = { eduId, userId, school, major, status };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }


  // userId에 해당하는 유저의 학력 전체 조회
  static async getEducationListByUserId({ userId }) {
    const educationList = await Education.findByUserId({userId});
    return educationList;
  }

  // eduId에 해당하는 학력정보 조회
  static async getEducationByEduId({ eduId }) {
    const education = await Education.findOneByEduId({eduId});
    return education;
  }


  // 학력 수정
  static async updateEducation({ eduId, toUpdate }) {
    // 해당 eduId의 학력정보가 db에 존재하는지 여부 확인
    let education = await Education.findOneByEduId({ eduId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
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

  
}

export { educationService };
