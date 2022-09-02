import { Schema, model } from "mongoose";

const EmailSchema = new Schema(
  {
    // User 식별 id
    userId: {
      type: String,
      required: true
    },
    // 이메일 인증 코드
    authCode: {
      type: String,
      required: true
    }
  }
);

const EmailModel = model("Email", EmailSchema);

export { EmailModel };