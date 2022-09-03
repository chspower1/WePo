import { User, Trial } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {

  // 유저 추가 (회원가입)
  static async addUser({ name, email, password, field }) {
    // 이메일 중복 확인
    const user = await User.findByEmail(email);
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 저장되어 있는 기본 프로필이미지 중 랜덤으로 파일명 넣어주기
    const randomSrc = Math.floor(10 * Math.random() + 1);
    const picture = "default_images/random_profile" + randomSrc + ".png";

    // db에 저장
    const createdNewUser = await User.create({
      name,
      email,
      password: hashedPassword,
      picture,
      field
    });

    // 로그인 시도 횟수 초기화
    await Trial.setTrials(email)

    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    // 인증 이메일 내용
    const userId = createdNewUser.userId
    const mailContent = {
      from: '"Limit" <wnsdml0120@gmail.com>',
      to: email,
      subject: "[WePo] 이메일 인증",
      text: "",
      html: "",
      setContent(authCode) {
        const authURL = `http://kdt-ai5-team08.elicecoding.com/user/register/${userId}/${authCode}`
        this.text = `${name}님, 다음 링크로 이메일 인증 부탁드립니다: ${authURL}`;
        this.html = `<br>${name}<b/>님,<br/>
        아래 버튼을 눌러 이메일 인증 부탁드립니다:</br>
        <a href="${authURL}">이메일 인증하기</a>`
      }
    };

    createdNewUser.mailContent = mailContent

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
      const loginTrial = await Trial.increaseTrials(email)
      // 로그인 시도 횟수가 5번 이상이면 비밀번호 초기화 이메일 전송
      if (loginTrial.trials >= 5) {
        const newPassword = await userAuthService.resetPassword(email)
        // 비밀번호 초기화 이메일 내용
        const mailContent = {
          from: '"Limit" <wnsdml0120@gmail.com>', // sender address
          to: email, // list of receivers: "*@*.*, *@*.*"
          subject: "[WePo] 비밀번호 초기화", // Subject line
          text: `다음 비밀번호를 사용하여 로그인 부탁드립니다: ${newPassword}`, // plain text body
          html: `<p>다음 비밀번호를 사용하여 로그인 부탁드립니다:<br/>
          <b>${newPassword}<b/><p>`, // html body
        }
        return { mailContent };
      }
      const errorMessage =
        `비밀번호가 틀렸습니다(${loginTrial.trials}회).`;
      return { errorMessage }
    }
    // 로그인 성공 -> 로그인 시도 횟수 초기화
    await Trial.resetTrials(email)

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


    let { name, description, field, picture } = toUpdate;

    if (!field) {
      field = [];
    }

    const newValues = {
      ...(name && { name }),
      ...(description && { description }),
      ...(field && { field }),
      ...(picture && { picture }),
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


  // 사용자 즐겨찾기 추가/삭제
  static async toggleLike({ userId, otherId }) {
    const user = await User.findByUserId(userId);
    const otherUser = await User.findByUserId(otherId);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 아이디가 존재하면 즐겨찾기에서 삭제
    if (user.likes.filter(likeUser => likeUser.userId === otherId).length) {
      const newValues = {
        likes: user.likes.filter(likeUser => likeUser.userId !== otherId)
      };
      return User.update({ userId, newValues });
    }

    // 아이디가 없으면 즐겨찾기에 새로 추가
    const newValues = {
      likes: [
        ...user.likes, {
          userId: otherId,
          name: otherUser.name,
          email: otherUser.email,
          picture: otherUser.picture
        }]
    };

    return User.update({ userId, newValues })
  }

  // 사용자 비밀번호 초기화
  static async resetPassword(email) {
    const user = await User.findByEmail(email)
    if (!user) {
      throw new Error("해당되는 사용자가 존재하지 않습니다.")
    }
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newValues = { password: hashedPassword }
    await User.update({ userId: user.userId, newValues })
    return newPassword
  }

  // 사용자 비밀번호 변경
  static async changePassword({ userId, oldPassword, newPassword }) {
    const user = await User.findByUserId(userId)
    if (!user) {
      throw new Error("해당되는 사용자가 존재하지 않습니다.")
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 새 비밀번호 적용
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const newValues = { password: hashedNewPassword }
    return User.update({ userId: user.userId, newValues })
  }
}

export { userAuthService };
