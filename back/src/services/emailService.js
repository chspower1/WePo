import { Email } from "../db/models/Email";

const nodemailer = require("nodemailer")

class emailService {

  // 이메일 전송
  static async sendEmail({ from, to, subject, text, html }) {
    /* Input parameter example
      {
        from: '"Fred Foo 👻" <wnsdml0120@gmail.com>', // sender address
        to: "wnsdml0120@gmail.com", // list of receivers: "*@*.*, *@*.*"
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
    */

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAILS_EMAIL, // Google ID
        pass: process.env.MAILS_PWD, // Google App Password
      },
    });

    // send mail with defined transport object
    return transporter.sendMail({ from, to, subject, text, html });
  }

  // 이메일 인증 번호 생성
  static async createAuthCode(userId){
    // 인증번호 생성
    const authCode = Math.floor(10+Math.random()*(99-10))

    const data = await Email.getEmailCodePair(userId)
    // 기존 userId-인증번호 pair 존재 시 인증번호 update
    if(data){
      return Email.update({userId, authCode})
    }
    // 이메일-인증번호 pair 추가
    return Email.add({userId, authCode})
  }

  // 이메일 인증 번호 확인
  static async getAuthCode(userId){
    const data = await Email.getEmailCodePair(userId)
    return data.authCode
  }

  // 이메일-인증번호 pair 삭제
  static async deleteAuthCode(userId){
    await Email.delete(userId)
  }

}

export { emailService }