import { UserModel } from "../schemas/user";

class User {

  // 새로운 유저 생성
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  // email로 유저 조회
  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  // userId에 해당하는 유저 조회
  // static async findById({ userId }) {
  //   const user = await UserModel.findById(userId);
  //   return user;
  // }

  static async findById({ userId }) {
    const user = await UserModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: 'awards', // 참고 할 테이블
          localField: '_id', // User.id
          foreignField: 'userId', // Award.userId
          as: 'awards', // 추가 할 프로퍼티
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: 'userId',
          as: 'projects',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: '_id',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'certificates',
          localField: '_id',
          foreignField: 'userId',
          as: 'certificates',
        },
      },
    ]);

    return user;
  }

  // 모든 유저 조회
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // 유저 정보 수정
  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
