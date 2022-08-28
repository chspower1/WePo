import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { curUserState, IProject } from "../../atoms";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import { useLocation } from "react-router-dom";
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
import { Category, deleteData } from "../../api/api";
export default function Project({ projectsProps }: { projectsProps: IProject[] }) {
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

    // 프로젝트 상태 관리
    const [projects, setProjects] = useState<IProject[]>(projectsProps);

    // form 관리
    const [isAddFormActive, setIsAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number | null>();

    // 현재 경로
    const location = useLocation();
    const pathName = location.pathname;

    // 삭제 버튼 클릭 시
    const onClickDeleteBtn = (project: IProject, index: number) => {
        const userId = project.userId!;
        const projectId = project.projectId!;
        deleteData(Category.project, projectId, userId);
        setProjects((prev) => {
            const newProjects = [...prev];
            newProjects.splice(index, 1);
            return newProjects;
        });
    };

    //추가버튼 클릭시 버튼 활성화 on/off
    function handleIsAddFormActive() {
        setIsAddFormActive((isAddFormActive) => !isAddFormActive);
    }
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>프로젝트</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {isAddFormActive && (
                    <ProjectAddForm
                        setIsAddFormActive={setIsAddFormActive}
                        setProjects={setProjects}
                        userId={curUser?.userId!}
                    /> // props로 id값을 안넘겨 주어도 정상 작동
                )}
                {!isAddFormActive &&
                    projects?.map((project: IProject, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{project.title}</MvpContentAccent>
                                    <MvpContentDetail>{project.description}</MvpContentDetail>
                                    <MvpContentDate>{`${String(project.startDate).slice(
                                        0,
                                        10
                                    )} ~ ${String(project.endDate).slice(0, 10)}`}</MvpContentDate>
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
                            {isEditing && targetIndex === index && (
                                <ProjectEditForm
                                    index={index}
                                    projects={projects}
                                    setProjects={setProjects}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    userId={project.userId!}
                                    projectId={project.projectId!}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>

            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <MvpAddButton onClick={handleIsAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
