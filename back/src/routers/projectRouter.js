import is from "@sindresorhus/is";
import { Router } from "express";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.get("/user/projects", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const userId = req.body.id;

    // Project DB에서 userId 매칭되는 것들 찾아오기
    const allProjects = await projectService.getAllProjects({userId})
    res.status(200).json(allProjects);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
