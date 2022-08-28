import { UserModel } from "../schemas/user";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

class User {

  // 새로운 유저 생성
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  // email로 유저 조회
  static async findByEmail({ email }) {
    const user = await UserModel.aggregate([
      {
        $match: {
          email
        },
      },
      {
        $lookup: {
          from: 'awards', // 참고 할 테이블
          localField: 'userId', // User.id
          foreignField: 'userId', // Award.userId
          as: 'awards', // 추가 할 프로퍼티
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'userId',
          foreignField: 'userId',
          as: 'projects',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: 'userId',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'certificates',
          localField: 'userId',
          foreignField: 'userId',
          as: 'certificates',
        },
      },
    ]);

    return user[0];
  }

  // userId에 해당하는 유저 조회
  // static async findById({ userId }) {
  //   const user = await UserModel.findById(userId);
  //   return user;
  // }

  // userId로 해당하는 유저의 모든 정보 조회
  static async findByUserId({ userId }) {
    const user = await UserModel.aggregate([
      {
        $match: {
          userId: userId
        },
      },
      {
        $lookup: {
          from: 'awards', // 참고 할 테이블
          localField: 'userId', // User.id
          foreignField: 'userId', // Award.userId
          as: 'awards', // 추가 할 프로퍼티
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'userId',
          foreignField: 'userId',
          as: 'projects',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: 'userId',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'certificates',
          localField: 'userId',
          foreignField: 'userId',
          as: 'certificates',
        },
      },
    ]);

    return user[0];
  }

  // 모든 유저 조회
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // 유저 정보 수정
  static async update({ userId, newValues }) {
    const filter = { userId: userId };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      newValues,
      option
    );
    return updatedUser;
  }
}

export { User };
