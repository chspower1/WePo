import { EmailModel } from "../schemas/email";

class Email {

  static async getEmailCodePair(email){
    return EmailModel.findOne({email})
  }

  static async add({email, authCode}){
    return EmailModel.create({email, authCode})
  }

  static async update({email, authCode}){
    return EmailModel.findOneAndUpdate({email}, {authCode})
  }

  static async delete(email){
    return EmailModel.findOneAndDelete({email})
  }

}

export { Email };