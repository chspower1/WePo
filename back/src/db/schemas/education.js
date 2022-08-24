// @ts-ignore
import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    // 학력정보 식별 id
    eduId: {
      type: String,
      required: true
    },
    // User 식별 id
    userId: {
      type: String,
      required: true,
    },
    // 학교명
    school: {
      type: String,
      required: true,
    },
    // 전공
    major: {
      type: String,
      required: true,
    },
    // 졸업상태
		status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
