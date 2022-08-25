import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력 생성
  static async create({ newEducation }) {
<<<<<<< HEAD
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
=======
    return EducationModel.create(newEducation);
>>>>>>> feat/Login
  }

  // userId에 해당하는 유저의 학력정보 전체조회
  static async findByUserId({ userId }) {
<<<<<<< HEAD
    const educationList = await EducationModel.find({ userId });
    return educationList;
  }

  // eduId에 해당하는 학력정보 조회
  static async findOneByEduId({ eduId }) {
    const education = await EducationModel.findOne({ eduId });
    return education;
=======
    return EducationModel.find({userId});
  }

  // eduId에 해당하는 학력정보 조회
  static async findByEduId({ eduId }) {
    return EducationModel.findById(eduId);
>>>>>>> feat/Login
  }

  // eduId에 해당하는 학력정보 수정
  static async update({ eduId, newValues }) {
<<<<<<< HEAD
    const filter = { eduId };
=======
    const filter = { _id: eduId };
>>>>>>> feat/Login
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedEducation;
  }

  // eduId에 해당하는 학력정보 삭제
  static async delete({ eduId }) {
<<<<<<< HEAD
    const deleteSuccessful = await EducationModel.findOneAndDelete(eduId);
    return deleteSuccessful;
=======
    return EducationModel.findByIdAndDelete(eduId);
>>>>>>> feat/Login
  }
}

export { Education };
