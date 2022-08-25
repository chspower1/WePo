import { Project } from "../db/models/Project";

class projectService {

  static async addProject({ userId, title, startDate, endDate, description }) {
    // 새 프로젝트 추가
    // 에러 처리 추가하기
    return Project.create({ userId, title, startDate, endDate, description });
  }

  static async getAllProjects({userId}) {
    // 모든 프로젝트 불러오기
    // 에러 처리 추가하기 
    return Project.findByUserId({userId});
  }

  static async updateProject({projectId, toUpdate}) {
    const { title, startDate, endDate, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(description && { description }),
    }
    return Project.update({projectId, newValues});
  }

  static async deleteProject({projectId}){
    return Project.delete({projectId})
  }
}

export { projectService };