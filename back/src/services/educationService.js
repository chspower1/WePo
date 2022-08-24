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


  // 학력 조회
  static async getEducationListByUserId({ userId }) {
    const educationList = await Education.findByUserId({userId});
    return educationList;
  }


  // 학력 수정

  // 학력 삭제

  
}

export { educationService };
