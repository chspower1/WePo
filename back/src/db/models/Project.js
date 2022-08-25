import { ProjectModel } from "../schemas/project";

class Project {

  // 새로운 프로젝트 생성
  static async create(newProject) {
    return ProjectModel.create(newProject);
  }

  // 한 유저의 프로젝트 모두 불러오기
  static async findByUserId({ userId }) {
    return ProjectModel.find({ userId });;
  }

  // 한 프로젝트 아이디로 프로젝트 찾아오기
  static async findByProjectId({ projectId }) {
    return ProjectModel.findById(projectId);;
  }

  // 프로젝트 삭제하기
  static async delete({ projectId }) {
    return ProjectModel.findByIdAndDelete(projectId);
  }

  // 프로젝트 속성 update하기
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
}

export { Project };