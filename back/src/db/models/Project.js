import { ProjectModel } from "../schemas/project";

class Project {

  // 새로운 프로젝트 생성
  static async create(newProject) {
    return ProjectModel.create(newProject);
  }

  // userId에 해당하는 유저의 프로젝트 전체 조회
  static async findByUserId({ userId }) {
<<<<<<< HEAD
    return ProjectModel.find({ userId });;
=======
    return ProjectModel.find({userId});
>>>>>>> feat/Login
  }

  // projectId에 해당하는 프로젝트 조회
  static async findByProjectId({ projectId }) {
    return ProjectModel.findById(projectId);;
  }

<<<<<<< HEAD
  // 프로젝트 삭제하기
  static async delete({ projectId }) {
    return ProjectModel.findByIdAndDelete(projectId);
  }

  // 프로젝트 속성 update하기
=======
  // projectId에 해당하는 프로젝트 속성 수정
>>>>>>> feat/Login
  static async update({ projectId, newValues }) {
    const filter = { _id: projectId };
    const option = { returnOriginal: false };
    
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      newValues,
      option
      );
      return updatedProject;
    }

  // projectId에 해당하는 프로젝트 삭제
  static async delete({ projectId }) {
    return ProjectModel.findByIdAndDelete(projectId);
  }
}
  
export { Project };