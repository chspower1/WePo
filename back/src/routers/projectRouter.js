import is from "@sindresorhus/is";
import { Router } from "express";
import { projectService } from "../services/projectService";
import { Project } from "../db/models/Project";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();


// 주어진 ID의 User의 프로젝트 목록 get
projectRouter.get("/projectList", async function (req, res, next) {
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


// 주어진 ID의 User에게 신규 프로젝트 post
projectRouter.post("/project", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const currentUserId = req.currentUserId;
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;

    // Project DB에 신규 프로젝트 추가하기
    const newProject = await projectService.addProject({ userId: currentUserId, title, startDate, endDate, description })
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});


// 주어진 projectId에 해당되는 프로젝트 수정
projectRouter.put("/project/:projectId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req.currentUserId; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Project 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "currentUser가 본 Project의 작성자가 아닙니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const projectId = req.params.projectId;
    const title = req.body.title || undefined;
    const startDate = req.body.startDate || undefined;
    const endDate = req.body.endDate || undefined;
    const description = req.body.description || undefined;
    const toUpdate = {title, startDate, endDate, description};

    // Project DB에서 projectId에 매칭되는 Project 수정하기
    const updatedProject = await projectService.updateProject({projectId, toUpdate})
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});


// 주어진 projectId에 해당되는 프로젝트 삭제
projectRouter.delete("/project/:projectId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req.currentUserId; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Project 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "currentUser가 본 Project의 작성자가 아닙니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const projectId = req.params.projectId;

    // Project DB에서 projectId에 매칭되는 Project 삭제하기
    const deleteSuccessful = await projectService.deleteProject({projectId})
    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});


export { projectRouter };
