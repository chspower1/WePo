// @ts-ignore
import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    // 자격증정보 식별 id
    certId: {
      type: String,
      required: true
    },
    // User 식별 id
    userId: {
      type: String,
      required: true,
    },
    // 자격증 이름
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
		org: {
      type: String,
      required: true,
    },
    // 자격증 설명
		description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
