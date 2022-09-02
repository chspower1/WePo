import { Project } from "../db";

class projectService {

  // 프로젝트 추가
  static async addProject({ userId, title, startDate, endDate, description, projectId, order }) {

    // 사용자가 필수로 입력해야하는 값이 모두 있는지 확인
    if (!title || !startDate || !endDate) {
      const errorMessage =
        "필수값을 모두 입력해주세요."
      return { errorMessage };
    }

    // front에서 생성하여 넘겨주는 id값 있는지 체크
    if (!projectId) {
      const errorMessage =
        "projectId값이 정상적으로 생성되지 않았습니다."
      return { errorMessage };
    }

    return Project.create({
      userId,
      title,
      startDate,
      endDate,
      description,
      projectId,
      order
    });
  }

  // userId에 해당하는 유저의 프로젝트 전체 조회
  static async getProjectsByUserId(userId) {
    return Project.findByUserId(userId);
  }

  // projectId에 해당하는 자격증 조회
  static async getProject(projectId) {
    return Project.findByProjectId(projectId);
  }

  // 프로젝트 수정
  static async updateProject({ projectId, toUpdate }) {
    // 해당 certId의 자격증정보가 db에 존재하는지 여부 확인
    let project = await Project.findByProjectId(projectId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage
        = "프로젝트 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const { title, startDate, endDate, description } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(description && { description }),
    }
    return Project.update({ projectId, newValues });
  }

  // 프로젝트 순서 수정
  static async updateProjectOrder(newCategories) {
    const newOrders = newCategories.map((newCategory, idx) =>
      ({ projectId: newCategory.projectId, order: idx })
    );

    newOrders.forEach((newOrder) => {
      Project.updateOrder(newOrder);
    });

    return;
  }

  // 프로젝트 삭제
  static async deleteProject(projectId) {
    // 해당 projectId의 프로젝트가 db에 존재하는지 여부 확인
    const project = await Project.findByProjectId(projectId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage
        = "프로젝트 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return Project.delete(projectId);
  }

}

export { projectService };