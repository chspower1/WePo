import { UserModel } from "../schemas/user";

// 유저 정보 조회시 필요한 lookup
const userExtraInfoLookup = [{
  $lookup: {
    from: 'awards', // 참고 할 테이블
    localField: 'userId', // User.userId
    foreignField: 'userId', // Award.userId
    pipeline: [
      { $sort: { 'order': 1 } }
    ],
    as: 'awards', // 추가 할 프로퍼티
  },
},
{
  $lookup: {
    from: 'projects',
    localField: 'userId',
    foreignField: 'userId',
    pipeline: [
      { $sort: { 'order': 1 } }
    ],
    as: 'projects',
  },
},
{
  $lookup: {
    from: 'educations',
    localField: 'userId',
    foreignField: 'userId',
    pipeline: [
      { $sort: { 'order': 1 } }
    ],
    as: 'educations',
  },
},
{
  $lookup: {
    from: 'certificates',
    localField: 'userId',
    foreignField: 'userId',
    pipeline: [
      { $sort: { 'order': 1 } }
    ],
    as: 'certificates',
  },
}];


class User {
  // 새로운 유저 생성
  static async create({ name, email, password: hashedPassword, picture, field }) {
    return UserModel.create({
      name,
      email,
      password: hashedPassword,
      picture,
      field
    });
  }

  // email로 유저 조회
  static async findByEmail(email) {
    const user = await UserModel.aggregate([
      {
        $match: {
          email
        },
      },
      ...userExtraInfoLookup
    ]);

    return user[0];
  }

  // userId로 해당하는 유저의 모든 정보 조회
  static async findByUserId(userId) {
    const user = await UserModel.aggregate([
      {
        $match: {
          userId: userId
        },
      },
      ...userExtraInfoLookup
    ]);

    return user[0];
  }

  // 모든 유저 조회
  static async findAll() {
    const users = await UserModel.find({}).sort({ createdAt: -1 });
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

  // 조회수 증가
  static async updateView(userId) {
    const updatedView = await UserModel.findOneAndUpdate(
      {
        userId
      },
      { $inc: { views: 1 } },
      {
        returnDocument: 'after',
      }
    );

    return updatedView;
  }

}

export { User };
