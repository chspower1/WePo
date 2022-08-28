import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useRecoilValue } from "recoil";
import { curUserState, IProject, usersState } from "../../atoms";
import { type } from "os";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentDetail,
    MvpContentDate,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../user/MyPortfolio";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { PlusSquareFill } from "@styled-icons/bootstrap/PlusSquareFill";
import { deleteProject } from "../../api/api";
import { Droppable } from "@hello-pangea/dnd";
import SEO from "./../SEO";
export default function Project({ info }: any) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    const userToken = sessionStorage.getItem("userToken");

    // form 관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
    const location = useLocation();
    const pathName = location.pathname;
    // 추가사항 on/off
    function handleAdding() {
        setAddFormActive((addFormActive) => !addFormActive);
    }

    const [projects, setProjects] = useState<IProject[]>(info);

    const onClickDeleteBtn = (project: IProject, index: number) => {
        const userId = parseInt(project.userId!);
        const projectId = project.projectId!;
        deleteProject(projectId, userId);
        setProjects((prev) => {
            const newProjects = [...prev];
            newProjects.splice(index, 1);
            return newProjects;
        });
    };
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>프로젝트</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <ProjectAddForm
                        setAddFormActive={setAddFormActive}
                        setProjects={setProjects}
                        userId={curUser?.userId}
                    /> // props로 id값을 안넘겨 주어도 정상 작동
                )}
                {!addFormActive &&
                    projects?.map((project: IProject, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{project.title}</MvpContentAccent>
                                    <MvpContentDetail>{project.description}</MvpContentDetail>
                                    <MvpContentDate>{`${String(project.startDate).slice(0,10)} ~ ${String(project.endDate).slice(0,10)}`}</MvpContentDate>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3687FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton
                                                onClick={() => {
                                                    onClickDeleteBtn(project, index);
                                                }}
                                            >
                                                <Trash2 color="#3687FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex == index && (
                                <ProjectEditForm
                                    index={index}
                                    projects={projects}
                                    setProjects={setProjects}
                                    setEditing={setEditing}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    userId={project.userId}
                                    projectId={project.projectId}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>

            {curUser && pathName === "/mypage" && !addFormActive && (
                <MvpAddButton onClick={handleAdding}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
