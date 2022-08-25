import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState } from "recoil";
import { IProject, usersState } from "../../atoms";
import { type } from "os";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentName,
    MvpContentDetail,
    MvpContentDate,
    MvpEditButton,
    MvpAddButton,
    MvpAddInput,
    MvpAddInputBox,
    MvpDeleteButton,
} from "../MyPortfolio";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { PlusSquareFill } from "@styled-icons/bootstrap/PlusSquareFill";
export default function Project(info: IProject[]) {
    const { id } = useParams();
    const [Adding, setAdding] = useState(false);
    const [Editing, setEditing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
    function handleAdding() {
        setAdding((Adding) => !Adding);
    }

    const [projects, setProjects] = useState<IProject[]>([
    ]);

    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>프로젝트</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {Adding && (
                    <ProjectAddForm
                        setAdding={setAdding}
                        setProjects={setProjects}
                    />
                )}
                {!Adding &&
                    projects.map((val: IProject, index: number) => (
                        <MvpContentBox>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentName>{val.title}</MvpContentName>
                                    <MvpContentDetail>{val.description}</MvpContentDetail>
                                    <MvpContentDate>{`${val.startDate} ~ ${val.endDate}`}</MvpContentDate>
                                    {Editing && targetIndex !== index && (
                                        <>
                                        <MvpEditButton onClick={() => {
                                                setIsEditing(true);
                                                setTargetIndex(index);
                                        }}>
                                            <Pencil color="#3687FF" />
                                        </MvpEditButton>
                                        <MvpDeleteButton><Trash2 color="#3687FF"/></MvpDeleteButton>
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
                                    id={id}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            <MvpAddButton onClick={handleAdding}>
                <PlusSquareFill color="#3687FF" />
            </MvpAddButton>
            {/* <div>
                <ul>
                    {projects.map((val: IProject, index: number) => (
                        <Li key={index}>
                            <h1>{val.title}</h1>
                            <h2>{`${val.startDate} ~ ${val.endDate}`}</h2>
                            <h2>{val.description}</h2>
                            {Editing && targetIndex !== index && (
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setTargetIndex(index);
                                    }}
                                >
                                    수정
                                </button>
                            )}
                            {isEditing && targetIndex == index && (
                                <ProjectEditForm
                                    index={index}
                                    projects={projects}
                                    setProjects={setProjects}
                                    setEditing={setEditing}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    id={id}
                                />
                            )}
                        </Li>
                    ))}
                </ul>
            </div>
            <div>
                {Adding && <ProjectAddForm setAdding={setAdding} setProjects={setProjects} />}
                <button onClick={handleAdding}>추가</button>
            </div> */}
        </MvpContainer>
    );
}
const Li = styled.li`
    background-color: yellow;
`;
