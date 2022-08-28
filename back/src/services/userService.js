import { User, Image } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {

  // 유저 추가 (회원가입)
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail(email);
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    const picture = await Image.getRandomURL();

    // db에 저장
    const createdNewUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      picture 
    });

    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  // 유저 조회 (로그인)
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail(email);
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.userId }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    // 보안을 위해 password는 제거
    delete user.password;
    const loginUser = {
      token,
      errorMessage: null,
      ...user
    };

    return loginUser;
  }

  // 전체 유저 조회
  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  // 유저 정보 수정
  static async setUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findByUserId(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const { name, description } = toUpdate;

    const newValues = {
      ...(name && { name }),
      ...(description && { description }),
    };

    return User.update({ userId, newValues });
  }


  // 유저 정보 조회
  static async getUserInfo(userId) {

    const user = await User.findByUserId(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }


  // 사용자 포트폴리오의 조회수 증가
  static async increaseView(userId) {
    const user = await User.findByUserId(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return User.updateView(userId);
  }
}

export { userAuthService };
