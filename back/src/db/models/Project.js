import { ProjectModel } from "../schemas/project";

class Project {

  // 새로운 프로젝트 생성
  static async create(newProject) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  // 한 유저의 프로젝트 모두 불러오기
  static async findByUserId({ userId }) {
    const allProjects = await ProjectModel.find({ userId });
    return allProjects;
  }

  // 한 프로젝트 아이디로 프로젝트 찾아오기
  static async findByProjectId({ projectId }) {
    const oneProject = await ProjectModel.findById(projectId);
    return oneProject;
  }

  // 프로젝트 삭제하기
  static async delete({ projectId }) {
    const deleteSuccessful = await ProjectModel.findByIdAndDelete(projectId);
    return deleteSuccessful;
  }

  // 프로젝트 속성 update하기
  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { _id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
}

export { Project };