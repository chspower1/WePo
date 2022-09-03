import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    // User 식별 id
    userId: {
      type: Number,
      required: true,
    },
    // 대회명
    title: {
      type: String,
      required: true,
    },
    // 수상 등급 (우수 최우수 대상 참여 등등)
    grade: {
      type: String,
      required: true,
    },
    // 수상 기관
    org: {
      type: String,
      required: true,
    },
    // 수상 일자
    date: {
      type: Date,
      required: true,
    },
    // 설명
    description: {
      type: String,
      required: false,
    },
    // awardId : 학력 추가 시 프론트에서 넘겨주는 해당 award의 고유id
    awardId: {
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

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
