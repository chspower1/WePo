import { curUserState, ICertificate } from "./../../atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useRecoilValue } from "recoil";
import { CertificateAddForm } from "./CertificateAddForm";
import { CertificateEditForm } from "./CertificateEditForm";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MvpContainer,MvpTitleBox,MvpTitle,MvpContentContainer,MvpContentBox,MvpContentName,MvpContentDate, MvpContentDetail, MvpEditButton, MvpAddButton, MvpDeleteButton,MvpContentAccent} from "../MyPortfolio";
import { Pencil } from "styled-icons/boxicons-solid";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Trash2 } from "@styled-icons/feather/Trash2";

export default function Certificate(info: ICertificate[]) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

    // form 관리
    const [Adding, setAdding] = useState(false);
    const [Editing, setEditing] = useState(true); // 유저에따라 수정버튼 여부 지금은 우선 보이기위해 true 나중에는 defalut undefined 로그인 유저에따라 true or
    const [isEditing, setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex, setTargetIndex] = useState<Number>();

    // 추가사항 on/off
    function handleAdding() {
        setAdding((Adding) => !Adding);
    }

    const [certificates, setCertificates] = useState<ICertificate[]>([
    ]);


    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>자격증</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {Adding && (
                    <CertificateAddForm setAdding={setAdding} setCertificates={setCertificates} id={id}/>
                )}
                {!Adding && certificates.map((val: ICertificate, index: number) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <MvpContentAccent>{val.title}</MvpContentAccent>
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
            <MvpAddButton onClick={handleAdding}>
                <PlusSquareFill color="#3687FF" />
            </MvpAddButton>
            {/* {curUser?.id === id && <MvpAddButton onClick={handleAdding}>
                <PlusSquareFill color="#3687FF"/>
            </MvpAddButton>} */}
            {/* <div>
                <ul>
                    {certificates.map((certificate: ICertificate, index: number) => (
                        <Li key={index}>
                            <h1>{certificate.title}</h1>
                            <h2>{certificate.date}</h2>
                            <h2>{certificate.org}</h2>
                            <h2>{certificate.description}</h2>
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
                        </Li>
                    ))}
                </ul>
            </div>
            <div>
                {Adding && (
                    <CertificateAddForm
                        setAdding={setAdding}
                        setCertificates={setCertificates}
                        id={id}
                    />
                )}
                <button onClick={handleAdding}>추가</button>
            </div> */}
        </MvpContainer>
    );
}
