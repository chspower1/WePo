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
    MvpContentAccent,
} from "../MyPortfolio";
import { Pencil } from "styled-icons/boxicons-solid";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Trash2 } from "@styled-icons/feather/Trash2";

export default function Certificate({ info }: any) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    const userToken = sessionStorage.getItem("userToken");

    // form 관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // 유저에따라 수정버튼 여부 지금은 우선 보이기위해 true 나중에는 defalut undefined 로그인 유저에따라 true or
    const [isEditing, setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex, setTargetIndex] = useState<Number>();

    // 추가사항 on/off
    function handleAdding() {
        setAddFormActive((addFormActive) => !addFormActive);
    }

    // 자격증 상태
    const [certificates, setCertificates] = useState<ICertificate[]>(info);

    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>자격증</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <CertificateAddForm
                        setAddFormActive={setAddFormActive}
                        setCertificates={setCertificates}
                    />
                )}
                {!addFormActive &&
                    certificates?.map((val: ICertificate, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{val.title}</MvpContentAccent>
                                    <MvpContentDate>{String(val.date)}</MvpContentDate>
                                    <MvpContentDetail>{val.org}</MvpContentDetail>
                                    <MvpContentDetail>{val.description}</MvpContentDetail>
                                    {id === curUser?._id! && targetIndex !== index && (
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
                                    certificates={certificates}
                                    setCertificates={setCertificates}
                                    setEditing={setEditing}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    id={id}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>

            {id === curUser?._id && !addFormActive && (
                <MvpAddButton onClick={handleAdding}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
