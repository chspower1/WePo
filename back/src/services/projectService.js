import { Project } from "../db/models/Project";

class projectService {

  static async addProject({ userId, title, startDate, endDate, description }) {
    // 새 프로젝트 추가
    const createdNewProject = await Project.create({ userId, title, startDate, endDate, description });
    // 에러 처리 추가하기
    return createdNewProject;
  }

  static async getAllProjects({userId}) {
    // 모든 프로젝트 불러오기
    const allProjects = await Project.findByUserId({userId});
    return allProjects
    // 에러 처리 추가하기 
  }

  static async updateProject({projectId, toUpdate}) {
    // 업데이트 대상에 title이 있다면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      await Project.update({ projectId, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 startDate이 있다면 업데이트 진행
    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      await Project.update({ projectId, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 endDate이 있다면 업데이트 진행
    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      await Project.update({ projectId, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 description이 있다면 업데이트 진행
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      await Project.update({ projectId, fieldToUpdate, newValue });
    }
    const oneProject = await Project.findByProjectId({projectId})
    return oneProject;
  }

  static async deleteProject({projectId}){
    const deleteSuccessful = await Project.delete({projectId})
    return deleteSuccessful
  }
}

export { projectService };