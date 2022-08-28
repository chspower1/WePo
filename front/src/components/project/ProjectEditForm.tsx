import { useForm } from "react-hook-form";
import { useState } from "react";
import { IProject } from "../../atoms";
import { Category, updateData } from "../../api/api";
import {
    MvpContentName,
    MvpAddInput,
    MvpAddInputBox,
    RequiredLabel,
    Button,
} from "../user/MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";

interface IProjectEditFormProps{
    index: number;
    projects: IProject[];
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setTargetIndex: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
    userId: number;
    projectId: string;
}
export function ProjectEditForm({
    index,
    projects,
    setProjects,
    setIsEditing,
    setTargetIndex,
    userId,
    projectId,
}: IProjectEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProject>({ mode: "onChange" });

    const onvalid = (data: IProject) => {
        updateData(data, Category.project, userId, projectId);
        setProjects((project) => {
            const newProjects = [...project];
            newProjects[index] = { ...data, userId, projectId };
            return newProjects;
        });
        setIsEditing(false);
        setTargetIndex(null);
    };
    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    프로젝트 명 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    id="project-title"
                    defaultValue={projects[index].title}
                    {...register("title", {
                        required: "프로젝트명을 입력해주세요",
                    })}
                ></MvpAddInput>
                {errors.title && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.title.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox style={{ display: "block" }}>
                <MvpContentName>
                    프로젝트 기간 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="date"
                    width="100"
                    maxLength={2}
                    id="project-startDate"
                    defaultValue={String(projects[index].startDate).slice(0, 10)}
                    placeholder="프로젝트 시작기간"
                    {...register("startDate", {
                        required: "기간을 입력해주세요",
                        // pattern: {
                        //     value: /^\d{4}\d{2}\d{2}$/,
                        //     message: "20220101 형식으로 작성해주세요",
                        // },
                    })}
                ></MvpAddInput>
                <span style={{ margin: "0  5px 0 5px" }}>-</span>
                <MvpAddInput
                    type="date"
                    id="project-endDate"
                    defaultValue={String(projects[index].endDate).slice(0, 10)}
                    placeholder="프로젝트 종료기간"
                    {...register("endDate", {
                        required: "기간을 입력해주세요",
                        // pattern: {
                        //     value: /^\d{4}\d{2}\d{2}$/,
                        //     message: "20220101 형식으로 작성해주세요",
                        // },
                    })}
                ></MvpAddInput>
                {(errors.startDate && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.startDate.message}
                    </ErrMsg>
                )) ||
                    (errors.endDate && (
                        <ErrMsg>
                            <DangerIcon />
                            {errors.endDate.message}
                        </ErrMsg>
                    ))}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>간단한 설명</MvpContentName>
                <MvpAddInput
                    type="text"
                    id="project-description"
                    defaultValue={projects[index].description}
                    placeholder="추가설명"
                    {...register("description")}
                ></MvpAddInput>
            </MvpAddInputBox>
            <div style={{ float: "right", marginBottom: "10px" }}>
                <Button type="submit" color="#3687FF">
                    수정
                </Button>
                <Button
                    onClick={() => {
                        setIsEditing(false);
                        setTargetIndex(null);
                    }}
                >
                    취소
                </Button>
            </div>
        </form>
    );
}
