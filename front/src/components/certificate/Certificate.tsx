import { curUserState, ICertificate } from "./../../atoms";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useRecoilValue } from "recoil";
import { CertificateAddForm } from "./CertificateAddForm";
import { CertificateEditForm } from "./CertificateEditForm";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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

    return (
        <>
            <h1>자격증</h1>
            <div>
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
                {curUser?.id === id && <button onClick={handleAdding}>+</button>}
            </div>
        </>
    );
}

const Li = styled.li`
    background-color: skyblue;
`;
