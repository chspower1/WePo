import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    //이미지 URL들을 담고 있는 배열
    urls: {
      type: Array
    }
  }
);

const ImageModel = model("Image", ImageSchema);

export { ImageModel };