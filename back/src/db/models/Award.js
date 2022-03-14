import { AwardModel } from "../schemas/award";

class Award {
  static async findAwardList({ user_id }) {
    const awardlist = await AwardModel.find({ user_id });
    return awardlist;
  }
}

export { Award };
