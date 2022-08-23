// @ts-ignore
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    // User 식별 id
    id: {
      type: String,
      required: true,
    },
    // User email
    email: {
      type: String,
      required: true,
    },
    // User 이름
    name: {
      type: String,
      required: true,
    },
    // 비밀번호
    password: {
      type: String,
      required: true,
    },
    // 프로필 사진
		picture: {
      type: String, //Image URL
    },
    // 설명
		description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
