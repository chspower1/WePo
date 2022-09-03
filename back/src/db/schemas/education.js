import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    // User 식별 id
    userId: {
      type: Number,
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
      enum: ['학사졸업', '석사졸업', '박사졸업', '재학중'],
      required: true,
    },
    // eduId : 학력 추가 시 프론트에서 넘겨주는 해당 educaiton의 고유id
    eduId: {
      type: String,
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

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
