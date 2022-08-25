<<<<<<< HEAD
// @ts-ignore
=======
>>>>>>> feat/Login
import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
<<<<<<< HEAD
    // 자격증정보 식별 id
    certId: {
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
<<<<<<< HEAD
    // 자격증 이름
=======
    // 자격증 명칭
>>>>>>> feat/Login
    title: {
      type: String,
      required: true,
    },
    // 발급일
    date: {
      type: Date,
      required: true,
    },
    // 발급기관
<<<<<<< HEAD
		org: {
      type: String,
      required: true,
    },
    // 자격증 설명
		description: {
=======
    org: {
      type: String,
      required: true,
    },
    // 설명
    description: {
>>>>>>> feat/Login
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
