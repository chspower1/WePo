import { TrialModel } from "../schemas/trial";

class Trial {

  // 회원가입 시 로그인 시도 횟수 생성
  static async setTrials(email){
    return TrialModel.create({email})
  }

  // 로그인 시도 횟수 확인
  static async getTrials(email){
    return TrialModel.findOne({email})
  }

  // 로그인 시도 횟수 증가
  static async increaseTrials(email) {
    const newTrials = await TrialModel.findOneAndUpdate(
      {
        email
      }, 
      { $inc: { trials: 1} }, 
      {
        returnDocument: 'after',
      }
    );

    return newTrials;
  }

  // 로그인 시도 횟수 초기화
  static async resetTrials(email){
    return TrialModel.findOneAndUpdate({email}, {trials: 0})
  }

}

export { Trial };