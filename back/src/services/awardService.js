import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class awardService {
  static async getAwardList({ user_id }) {
    const awardlist = await Award.findAwardList({user_id});
    return awardlist;
  }
}

export { awardService };
