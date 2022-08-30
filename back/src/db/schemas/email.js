import { Schema, model } from "mongoose";

const EmailSchema = new Schema(
  {
    userId: {
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