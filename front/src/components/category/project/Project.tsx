import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { curUserState, IProject } from "@/atoms";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import { useLocation, useParams } from "react-router-dom";
import * as ProjectStyled from "@styledComponents/CategoryStyled";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { Category, deleteData } from "@api/api";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "styled-icons/bootstrap";

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
  const newDate = new Date();
  const maxDate = `${newDate.getFullYear() + 1}-${String(newDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(newDate.getDate()).padStart(2, "0")}`;

  //parmas
  const { userSeq } = useParams();
  //현재경로
  const location = useLocation();
  const pathName = location.pathname;

  //권한관리
  const compareUser = userSeq && parseInt(userSeq) === curUser?.userId!;
  const inMyPage = pathName === "/mypage";
  const admin = inMyPage || compareUser;

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
    <Droppable droppableId="projects" isDropDisabled={admin ? false : true}>
      {(magic) => (
        <div ref={magic.innerRef} {...magic.droppableProps}>
          <ProjectStyled.Container>
            <ProjectStyled.TitleBox>
              <ProjectStyled.Title>프로젝트</ProjectStyled.Title>
            </ProjectStyled.TitleBox>
            <ProjectStyled.ContentContainer>
              {isAddFormActive && (
                <ProjectAddForm
                  maxDate={maxDate}
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
                      <>
                        <ProjectStyled.ContentBox key={index}>
                          {targetIndex !== index && (
                            <div
                              ref={magic.innerRef}
                              {...magic.draggableProps}
                              {...magic.dragHandleProps}
                            >
                              <>
                                <ProjectStyled.ContentAccent
                                  title={project.title}
                                >
                                  {project.title}
                                </ProjectStyled.ContentAccent>
                                <ProjectStyled.ContentDetail
                                  title={project.description}
                                >
                                  {project.description}
                                </ProjectStyled.ContentDetail>
                                <ProjectStyled.ContentDate
                                  style={{
                                    borderBottom: `1px solid #e9e9e9`,
                                    padding: `10px 0 30px`
                                  }}
                                >{`${String(
                                  project.startDate
                                ).slice(0, 10)} ~ ${String(
                                  project.endDate
                                ).slice(
                                  0,
                                  10
                                )}`}</ProjectStyled.ContentDate>
                                {curUser &&
                                  admin &&
                                  targetIndex !== index && (
                                    <>
                                      <ProjectStyled.EditButton
                                        onClick={() => {
                                          setIsEditing(true);
                                          setTargetIndex(
                                            index
                                          );
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
                        </ProjectStyled.ContentBox>
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
                      </>
                    )}
                  </Draggable>
                ))}
            </ProjectStyled.ContentContainer>
            {magic.placeholder}

            {curUser && admin && !isAddFormActive && (
              <ProjectStyled.AddButton onClick={handleIsAddFormActive}>
                <Plus color={"white"} size={36} />
              </ProjectStyled.AddButton>
            )}
          </ProjectStyled.Container>
        </div>
      )}
    </Droppable>
  );
}
