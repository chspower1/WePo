import { Router } from "express";
import { uploadFiles } from "../middlewares/fileUpload";

const uploadRouter = Router();

// 프로필 이미지 업로드하기

uploadRouter.put("/", uploadFiles)


export { uploadRouter };