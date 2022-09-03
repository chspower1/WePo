import { ProjectModel } from "../schemas/project";

class Project {

  // 새로운 프로젝트 생성
  static async create({ userId, title, startDate, endDate, description, projectId, order }) {
    return ProjectModel.create({
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
  static async findByUserId(userId) {
    return ProjectModel.find({ userId });
  }

  // projectId에 해당하는 프로젝트 조회
  static async findByProjectId(projectId) {
    return ProjectModel.findOne({ projectId });;
  }

  // projectId에 해당하는 프로젝트 속성 수정
  static async update({ projectId, newValues }) {
    const filter = { projectId: projectId };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedProject;
  }

  // projectId에 해당하는 프로젝트 삭제
  static async delete(projectId) {
    return ProjectModel.findOneAndDelete({ projectId });
  }

  // 프로젝트 순서 변경
  static async updateOrder(newOrder) {

    const { projectId, order } = newOrder;

    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { projectId: projectId },
      { order: order },
      option
    );

    return updatedProject;
  }
}

export { Project };