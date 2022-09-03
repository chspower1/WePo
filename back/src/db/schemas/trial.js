import { Schema, model } from "mongoose";

const TrialSchema = new Schema(
  {
    // User 이메일
    email: {
      type: String,
      required: true
    },
    // 누적 비밀번호 오입력 횟수
    trials: {
      type: Number,
      required: true,
      default: 0
    }
  }
);

const TrialModel = model("Trial", TrialSchema);

export { TrialModel };