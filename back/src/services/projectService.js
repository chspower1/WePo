import { Project } from "../db/models/Project";

class projectService {

  // 프로젝트 추가
  static async addProject({ userId, title, startDate, endDate, description }) {
    // 에러 처리 추가하기
    return Project.create({ userId, title, startDate, endDate, description });
  }

  // userId에 해당하는 유저의 프로젝트 전체 조회
  static async getProjectListByUserId({ userId }) {
    // 에러 처리 추가하기 
    return Project.findByUserId({ userId });
  }
  
  // 프로젝트 수정
  static async updateProject({ projectId, toUpdate }) {
    const { title, startDate, endDate, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(description && { description }),
    }
    return Project.update({ projectId, newValues });
  }
  
  // 프로젝트 삭제
  static async deleteProject({ projectId }){
    return Project.delete({ projectId })
  }
}

export { projectService };