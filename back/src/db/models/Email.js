import { EmailModel } from "../schemas/email";

class Email {

  // 이메일 인증코드 추가
  static async add({ userId, authCode }) {
    return EmailModel.create({ userId, authCode })
  }

  // 이메일 인증코드 불러오기
  static async getUserIdCodePair(userId) {
    return EmailModel.findOne({ userId })
  }

  // 이메일 인증코드 변경
  static async update({ userId, authCode }) {
    return EmailModel.findOneAndUpdate({ userId }, { authCode })
  }

  // 이메일 인증코드 삭제
  static async delete(userId) {
    return EmailModel.findOneAndDelete({ userId })
  }

}

export { Email };