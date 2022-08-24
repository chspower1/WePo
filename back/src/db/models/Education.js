import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력 생성
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // userId에 해당하는 유저의 학력 모두 불러오기
  static async findByUserId({ userId }) {
    const educationList = await EducationModel.find({ userId });
    return educationList;
  }

  // userId에 해당하는 유저의 학력 수정
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  // userId에 해당하는 유저의 학력 삭제
  static async delete({ educationId }) {
    const deleteSuccessful = await EducationModel.findByIdAndDelete(educationId);
    return deleteSuccessful;
  }
}

export { Education };
