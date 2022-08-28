import { Schema, model, connection } from "mongoose";

const UserSchema = new Schema(
  {
    // User 이메일
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
      required: false,
    },
    // 관심 및 희망분야
    field: {
      type: Array,
      required: false,
      default: []
    },
    // 즐겨찾기/좋아요한 user의 ID들
    likes: {
      type: Array,
      required: false,
      default: []
    },
    // 포트폴리오 조회수
    views: {
      type: Number,
      required: false,
      default: 0
    },
    // 설명
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    userId: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: true,
  }
);


UserSchema.pre('save', async function () {
  const sequenceCollection = connection.collection('sequences');

  const sequence = (
    await sequenceCollection.findOneAndUpdate(
      {
        collectionName: 'users',
      },
      { $inc: { value: 1 } },
      {
        upsert: true,
        returnDocument: 'after',
      }
    )
  ).value;

  this.set({ userId: sequence.value });
});


const UserModel = model("User", UserSchema);

export { UserModel };
