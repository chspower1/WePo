import is from "@sindresorhus/is";
import { Router } from "express";
import { projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";


const projectRouter = Router();

// 프로젝트 추가
projectRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const currentUserId = req["currentUserId"];
    const { title, startDate, endDate, description, projectId } = req.body;

    // 신규 프로젝트 추가
    const newProject = await projectService.addProject({ 
      userId: currentUserId, 
      title, 
      startDate, 
      endDate, 
      description,
      projectId
    });

    if(newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 조회
projectRouter.get("/list", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;

    // userId 매칭되는 것들 찾아오기
    const projectList = await projectService.getProjectsByUserId(userId);
    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 수정
projectRouter.put("/:projectId", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const projectId = req.params.projectId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const project = await projectService.getProject(projectId);
    const userId = project.userId; // project 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    // req (request) 에서 데이터 가져오기
    const { title, startDate, endDate, description } = req.body;

    const toUpdate = { title, startDate, endDate, description };
    const updatedProject = await projectService.updateProject({ 
      projectId, 
      toUpdate 
    });

    if(updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 삭제
projectRouter.delete("/:projectId", login_required, async function (req, res, next) {
  try {
    const projectId = req.params.projectId;

    // User authentication
    const currentUserId = req["currentUserId"]; // 현재 로그인 중인 userId
    const project = await projectService.getProject(projectId);
    const userId = project.userId; // project 내에 저장된 userId

    if (currentUserId !== userId) {
      throw new Error(
        "해당 정보을 수정할 권한이 없습니다. 본인의 정보만 수정할 수 있습니다."
      );
    }

    const deleteSuccessful = await projectService.deleteProject(projectId);

    if(deleteSuccessful.errorMessage) {
      throw new Error(deleteSuccessful.errorMessage);
    }

    res.status(200).json(deleteSuccessful);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
