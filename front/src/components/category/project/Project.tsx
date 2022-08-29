import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { curUserState, IProject } from "@/atoms";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import { useLocation } from "react-router-dom";
import * as ProjectStyled from "@styledComponents/CategoryStyled";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { PlusSquareFill } from "@styled-icons/bootstrap/PlusSquareFill";
import { Category, deleteData } from "@api/api";
import { Draggable } from "@hello-pangea/dnd";
interface IProjectProps {
    projects: IProject[];
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}
export default function Project({ projects, setProjects }: IProjectProps) {
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

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
        <ProjectStyled.Container>
            <ProjectStyled.TitleBox>
                <ProjectStyled.Title>프로젝트</ProjectStyled.Title>
            </ProjectStyled.TitleBox>
            <ProjectStyled.ContentContainer>
                {isAddFormActive && (
                    <ProjectAddForm
                        setIsAddFormActive={setIsAddFormActive}
                        setProjects={setProjects}
                        userId={curUser?.userId!}
                        projects={projects}
                    /> // props로 id값을 안넘겨 주어도 정상 작동
                )}
                {!isAddFormActive &&
                    projects?.map((project, index: number) => (
                        <Draggable
                            key={String(project?.projectId!)}
                            draggableId={String(project?.projectId!)}
                            index={index}
                        >
                            {(magic) => (
                                <ProjectStyled.ContentBox key={index}>
                                    {targetIndex !== index && (
                                        <div
                                            ref={magic.innerRef}
                                            {...magic.draggableProps}
                                            {...magic.dragHandleProps}
                                        >
                                            <>
                                                <ProjectStyled.ContentAccent>
                                                    {project.title}
                                                </ProjectStyled.ContentAccent>
                                                <ProjectStyled.ContentDetail>
                                                    {project.description}
                                                </ProjectStyled.ContentDetail>
                                                <ProjectStyled.ContentDate>{`${String(
                                                    project.startDate
                                                ).slice(0, 10)} ~ ${String(project.endDate).slice(
                                                    0,
                                                    10
                                                )}`}</ProjectStyled.ContentDate>
                                                {curUser &&
                                                    pathName === "/mypage" &&
                                                    targetIndex !== index && (
                                                        <>
                                                            <ProjectStyled.EditButton
                                                                onClick={() => {
                                                                    setIsEditing(true);
                                                                    setTargetIndex(index);
                                                                }}
                                                            >
                                                                <Pencil color="#3687FF" />
                                                            </ProjectStyled.EditButton>
                                                            <ProjectStyled.DeleteButton
                                                                onClick={() => {
                                                                    onClickDeleteBtn(
                                                                        project,
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 color="#3687FF" />
                                                            </ProjectStyled.DeleteButton>
                                                        </>
                                                    )}
                                            </>
                                        </div>
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
                                </ProjectStyled.ContentBox>
                            )}
                        </Draggable>
                    ))}
            </ProjectStyled.ContentContainer>

            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <ProjectStyled.AddButton onClick={handleIsAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </ProjectStyled.AddButton>
            )}
        </ProjectStyled.Container>
    );
}
