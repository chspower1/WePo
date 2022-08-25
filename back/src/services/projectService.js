import { Project } from "../db/models/Project";

class projectService {

  // 프로젝트 추가
  static async addProject({ userId, title, startDate, endDate, description }) {
<<<<<<< HEAD
    // 새 프로젝트 추가
=======
>>>>>>> feat/Login
    // 에러 처리 추가하기
    return Project.create({ userId, title, startDate, endDate, description });
  }

<<<<<<< HEAD
  static async getAllProjects({userId}) {
    // 모든 프로젝트 불러오기
    // 에러 처리 추가하기 
    return Project.findByUserId({userId});
  }

  static async updateProject({projectId, toUpdate}) {
=======
  // userId에 해당하는 유저의 프로젝트 전체 조회
  static async getAllProjects({ userId }) {
    // 에러 처리 추가하기 
    return Project.findByUserId({ userId });
  }
  
  // 프로젝트 수정
  static async updateProject({ projectId, toUpdate }) {
>>>>>>> feat/Login
    const { title, startDate, endDate, description } = toUpdate;
    const newValues = {
      ...(title && { title }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(description && { description }),
    }
<<<<<<< HEAD
    return Project.update({projectId, newValues});
  }

  static async deleteProject({projectId}){
    return Project.delete({projectId})
=======
    return Project.update({ projectId, newValues });
  }
  
  // 프로젝트 삭제
  static async deleteProject({ projectId }){
    return Project.delete({ projectId })
>>>>>>> feat/Login
  }
}

export { projectService };