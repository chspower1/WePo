import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    // User 식별 id
    url: {
      type: Array
    }
  }
);

const ImageModel = model("Image", ImageSchema);

export { ImageModel };