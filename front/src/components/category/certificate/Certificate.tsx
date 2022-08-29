import { curUserState, ICertificate } from "@/atoms";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { CertificateAddForm } from "./CertificateAddForm";
import { CertificateEditForm } from "./CertificateEditForm";
import * as CertStyled from "@styledComponents/CategoryStyled";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Pencil } from "styled-icons/boxicons-solid";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Trash2 } from "@styled-icons/feather/Trash2";
import { Category, deleteData } from "@api/api";

export default function Certificate({ certificatesProps }: { certificatesProps: ICertificate[] }) {
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

    // 자격증 상태
    const [certificates, setCertificates] = useState<ICertificate[]>(certificatesProps);

    // form 관리
    const [isAddFormActive, setIsAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false); //수정버튼 클릭시에 폼 여부
    const [targetIndex, setTargetIndex] = useState<number | null>();

    // 현재 경로
    const location = useLocation();
    const pathName = location.pathname;

    // 삭제버튼 클릭시
    const onClickDeleteBtn = (certificate: ICertificate, index: number) => {
        const userSeq = certificate?.userId!;
        const certificateId = certificate?.certId!;
        deleteData(Category.certificate, certificateId, userSeq);
        setCertificates((prev) => {
            const newCertificates = [...prev];
            newCertificates.splice(index, 1);
            return newCertificates;
        });
    };

    //추가버튼 클릭시 버튼 활성화 on/off
    function handleIsAddFormActive() {
        setIsAddFormActive((isAddFormActive) => !isAddFormActive);
    }
    return (
        <CertStyled.Container>
            <CertStyled.TitleBox>
                <CertStyled.Title>자격증</CertStyled.Title>
            </CertStyled.TitleBox>
            <CertStyled.ContentContainer>
                {isAddFormActive && (
                    <CertificateAddForm
                        setIsAddFormActive={setIsAddFormActive}
                        setCertificates={setCertificates}
                        userId={curUser?.userId!}
                    />
                )}
                {!isAddFormActive &&
                    certificates?.map((certificate: ICertificate, index: number) => (
                        <CertStyled.ContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <CertStyled.ContentAccent>
                                        {certificate.title}
                                    </CertStyled.ContentAccent>
                                    <CertStyled.ContentDate>
                                        {String(certificate.date).slice(0, 10)}
                                    </CertStyled.ContentDate>
                                    <CertStyled.ContentDetail>
                                        {certificate.org}
                                    </CertStyled.ContentDetail>
                                    <CertStyled.ContentDetail>
                                        {certificate.description}
                                    </CertStyled.ContentDetail>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <CertStyled.EditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3687FF" />
                                            </CertStyled.EditButton>
                                            <CertStyled.DeleteButton
                                                onClick={() => onClickDeleteBtn(certificate, index)}
                                            >
                                                <Trash2 color="#3687FF" />
                                            </CertStyled.DeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex === index && (
                                <CertificateEditForm
                                    index={index}
                                    certificates={certificates}
                                    setCertificates={setCertificates}
                                    setIsEditing={setIsEditing}
                                    setTargetIndex={setTargetIndex}
                                    userId={certificate?.userId!}
                                    certId={certificate?.certId!}
                                />
                            )}
                        </CertStyled.ContentBox>
                    ))}
            </CertStyled.ContentContainer>
            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <CertStyled.AddButton onClick={handleIsAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </CertStyled.AddButton>
            )}
        </CertStyled.Container>
    );
}
