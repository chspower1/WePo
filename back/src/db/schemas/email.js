import { Schema, model } from "mongoose";

const EmailSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    authCode: {
      type: String,
      required: true
    }
  }
);

const EmailModel = model("Email", EmailSchema);

export { EmailModel };