<<<<<<< HEAD
// @ts-ignore
=======
>>>>>>> feat/Login
import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
<<<<<<< HEAD
    // 학력정보 식별 id
    eduId: {
      type: String,
      required: true
    },
=======
>>>>>>> feat/Login
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
<<<<<<< HEAD
		status: {
      type: String,
      enum : ['학사졸업', '석사졸업', '박사졸업', '재학중'],
=======
    status: {
      type: String,
      enum: ['학사졸업', '석사졸업', '박사졸업', '재학중'],
>>>>>>> feat/Login
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
