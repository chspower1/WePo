import { curUserState, ICertificate } from "./../../atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useRecoilValue } from "recoil";
import { CertificateAddForm } from "./CertificateAddForm";
import { CertificateEditForm } from "./CertificateEditForm";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
    MvpContainer,
    MvpTitleBox,
    MvpTitle,
    MvpContentContainer,
    MvpContentBox,
    MvpContentName,
    MvpContentDate,
    MvpContentDetail,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
} from "../MyPortfolio";
import { Pencil } from "styled-icons/boxicons-solid";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Trash2 } from "@styled-icons/feather/Trash2";

export default function Certificate(info: ICertificate[]) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 자격증 상태
    const [certificates, setCertificates] = useState<ICertificate[]>([]);

    // form 관리
    const [Adding, setAdding] = useState(false);
    const [Editing, setEditing] = useState(true); // 유저에따라 수정버튼 여부 지금은 우선 보이기위해 true 나중에는 defalut undefined 로그인 유저에따라 true or
    const [isEditing, setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex, setTargetIndex] = useState<Number>();

    // 추가사항 on/off
    function handleAdding() {
        setAdding((Adding) => !Adding);
    }

    const [projects, setProjects] = useState<ICertificate[]>([]);
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>자격증</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {Adding && (
                    <CertificateAddForm setAdding={setAdding} setProjects={setProjects} id={id} />
                )}
                {!Adding &&
                    projects.map((val: ICertificate, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentName>{val.title}</MvpContentName>
                                    <MvpContentDate>{val.date}</MvpContentDate>
                                    <MvpContentDetail>{val.org}</MvpContentDetail>
                                    <MvpContentDetail>{val.description}</MvpContentDetail>
                                    {Editing && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3687FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton>
                                                <Trash2 color="#3687FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex === index && (
                                <CertificateEditForm
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
            {curUser?.id === id && !Adding && (
                <MvpAddButton onClick={handleAdding}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
