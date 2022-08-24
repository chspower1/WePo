import { ICertificate } from "./../../atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState } from "recoil";
import { CertificateAddForm } from './CertificateAddForm'
import { CertificateEditForm} from "./CertificateEditForm"
import styled from "styled-components";


export default function Certificate(info: ICertificate[]) {
    const [Adding, setAdding] = useState(false);
    const [Editing,setEditing] = useState(true); // 유저에따라 수정버튼 여부 지금은 우선 보이기위해 true 나중에는 defalut undefined 로그인 유저에따라 true or false
    const [isEditing,setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex,setTargetIndex] =  useState<Number>();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICertificate>();

    function handleAdding() {
        setAdding((Adding) => !Adding);
    }

    const [projects, setProjects] = useState<ICertificate[]>([
    ]);

    
    return (
        <>
            <h1>자격증</h1>
            <div>
                <ul>
                    {projects.map((val: ICertificate, index:number) => (
                        <Li key={index}>
                            <h1>{val.title}</h1>
                            <h2>{val.date}</h2>
                            <h2>{val.org}</h2>
                            <h2>{val.description}</h2>
                            {Editing && targetIndex !== index &&<button onClick={()=>{setIsEditing(true); setTargetIndex(index)}}>수정</button>}
                            {isEditing &&  targetIndex == index && <CertificateEditForm index={index} projects={projects} setProjects={setProjects} setEditing={setEditing} setIsEditing={setIsEditing} setTargetIndex={setTargetIndex}/>}
                        </Li>
                    ))}
                </ul>
            </div>
            <div>
                {Adding && <CertificateAddForm setAdding={setAdding} setProjects={setProjects}/>}
                <button onClick={handleAdding}>추가</button>
            </div>
        </>
    );
}

const Li = styled.li`
    background-color: skyblue;
`