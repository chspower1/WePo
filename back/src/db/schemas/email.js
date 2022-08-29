import { Schema, model } from "mongoose";

const EmailSchema = new Schema(
  {
    //이미지 URL들을 담고 있는 배열
    email: {
      type: String,
      required: true
    },
    authCode: {
      type: Number,
      required: true
    }
  }
);

const EmailModel = model("Email", EmailSchema);

export { EmailModel };