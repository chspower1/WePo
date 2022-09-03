import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    // User 식별 id
    userId: {
      type: Number,
      required: true,
    },
    // 프로젝트명
    title: {
      type: String,
      required: true,
    },
    // 시작일
    startDate: {
      type: Date,
      required: true,
    },
    // 종료일
    endDate: {
      type: Date,
      required: true,
    },
    // 설명
    description: {
      type: String,
      required: false,
    },
    // projectId : 학력 추가 시 프론트에서 넘겨주는 해당 project의 고유id
    projectId: {
      type: String,
      required: true
    },
    // 개인 페이지 내의 배열 순서
    order: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };