import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState } from "recoil";
import { IProject, usersState } from "../../atoms";
import { type } from "os";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectEditForm } from "./ProjectEditForm";
import styled from "styled-components";
import { useParams } from "react-router-dom";

export default function Project(info: IProject[]) {
    const { id } = useParams();
    const [Adding, setAdding] = useState(false);
    const [Editing, setEditing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
    function handleAdding() {
        setAdding((Adding) => !Adding);
    }

    const [projects, setProjects] = useState<IProject[]>([]);

    return (
        <>
            <h1>프로젝트</h1>
            <div>
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
            </div>
        </>
    );
}
const Li = styled.li`
    background-color: yellow;
`;
