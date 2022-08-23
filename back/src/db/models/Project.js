import { ProjectModel } from "../schemas/project";

class Project {

  // 새로운 프로젝트 생성
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  // 한 유저의 프로젝트 모두 불러오기
  static async findById({ userId }) {
    const allProjects = await ProjectModel.find({ id: userId });
    return allProjects;
  }

  // 프로젝트 삭제하기
  static async deleteProject({ projectId }) {
    const deleteSuccessful = await ProjectModel.findByIdAndDelete(projectId);
    return deleteSuccessful;
  }

  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
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
