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
  static async findById({ userId }) {
    const user = await UserModel.findById(userId);
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
