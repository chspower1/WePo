import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.get(
  "/awardlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      // 특정 사용자에 대한 상장 이력 목록을 얻음
      const user_id = req.params.user_id
      const awardlist = await awardService.getAwardList({ user_id });
      res.status(200).send(awardlist);
    } catch (error) {
      next(error);
    }
  }
);


export { awardRouter };
