import { Schema, model } from "mongoose";

const TrialSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    trials: {
      type: Number,
      required: true,
      default: 0
    }
  }
);

const TrialModel = model("Trial", TrialSchema);

export { TrialModel };