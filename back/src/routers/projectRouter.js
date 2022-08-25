import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 프로젝트 조회
projectRouter.get("/projectList", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.body._id;

    // userId 매칭되는 것들 찾아오기
    const projectList = await projectService.getProjectListByUserId({userId})
    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 추가
projectRouter.post("/project", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    // req (request) 에서 데이터 가져오기
    const currentUserId = req["currentUserId"];
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;

    // 신규 프로젝트 추가
    const newProject = await projectService.addProject({ 
      userId: currentUserId, 
      title, 
      startDate, 
      endDate, 
      description 
    })

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 수정
projectRouter.put("/project/:projectId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Project 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    const projectId = req.params.projectId;
    
    // req (request) 에서 데이터 가져오기
    const title = req.body.title || undefined;
    const startDate = req.body.startDate || undefined;
    const endDate = req.body.endDate || undefined;
    const description = req.body.description || undefined;
    
    const toUpdate = {title, startDate, endDate, description};
    const updatedProject = await projectService.updateProject({ 
      projectId, 
      toUpdate 
    })

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 삭제
projectRouter.delete("/project/:projectId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const userId = req.body.userId; // Project 내에 저장된 userId
    if (currentUserId!==userId) {
      throw new Error(
        "currentUser가 본 Project의 작성자가 아닙니다."
      );
    }

    const projectId = req.params.projectId;
    const deleteSuccessful = await projectService.deleteProject({projectId})
    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
