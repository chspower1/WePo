import { EmailModel } from "../schemas/email";

class Email {

  static async getEmailCodePair(userId){
    return EmailModel.findOne({userId})
  }

  static async add({userId, authCode}){
    return EmailModel.create({userId, authCode})
  }

  static async update({userId, authCode}){
    return EmailModel.findOneAndUpdate({userId}, {authCode})
  }

  static async delete(userId){
    return EmailModel.findOneAndDelete({userId})
  }

}

export { Email };