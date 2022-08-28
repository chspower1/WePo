import { useState } from "react";
import { curUserState, IEducation } from "@/atoms";

import EducationEditForm from "./EducationEditForm";
import EducationAddForm from "./EducationAddForm";
import { useLocation } from "react-router-dom";
import * as EducationStyled from "@styledComponents/CategoryStyled";
import { useRecoilValue } from "recoil";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";
import { Category, deleteData } from "@api/api";
export default function Education({ educationsProps }: { educationsProps: IEducation[] }) {
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

    // 학력 상태 관리
    const [educations, setEducations] = useState<IEducation[]>(educationsProps); // 더미educations 초기값

    // form 관리
    const [isAddFormActive, setIsAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [targetIndex, setTargetIndex] = useState<Number | null>(); // index 를 체크해서 맞는 것만 editform 활성화

    //현재경로
    const location = useLocation();
    const pathName = location.pathname;

    // 삭제버튼 클릭시
    const onClickDeleteBtn = (education: IEducation, index: number) => {
        const educationId = education.eduId!;
        deleteData(Category.education, educationId, education.userId!);
        setEducations((prev) => {
            const newEducations = [...prev];
            newEducations.splice(index, 1);
            return newEducations;
        });
    };

    //추가버튼 클릭시 버튼 활성화 on/off
    function handleIsAddFormActive() {
        setIsAddFormActive((current) => !current);
    }
    return (
        <EducationStyled.Container>
            <EducationStyled.TitleBox>
                <EducationStyled.Title>학력</EducationStyled.Title>
            </EducationStyled.TitleBox>
            <EducationStyled.ContentContainer>
                {isAddFormActive && (
                    <EducationAddForm
                        setIsAddFormActive={setIsAddFormActive}
                        setEducations={setEducations}
                        userId={curUser?.userId!}
                    />
                )}
                {!isAddFormActive &&
                    educations?.map((education, index) => (
                        <EducationStyled.ContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <EducationStyled.ContentAccent>
                                        {education.school}
                                    </EducationStyled.ContentAccent>
                                    <div style={{ display: "flex" }}>
                                        <EducationStyled.ContentDetail
                                            style={{ marginRight: "10px" }}
                                        >
                                            {education.major}
                                        </EducationStyled.ContentDetail>
                                        <EducationStyled.ContentDetail>
                                            ({education.status})
                                        </EducationStyled.ContentDetail>
                                    </div>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <EducationStyled.EditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3867FF" />
                                            </EducationStyled.EditButton>
                                            <EducationStyled.DeleteButton
                                                onClick={() => {
                                                    onClickDeleteBtn(education, index);
                                                }}
                                            >
                                                <Trash2 color="#3867FF" />
                                            </EducationStyled.DeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex == index && (
                                <EducationEditForm
                                    index={index}
                                    educations={educations}
                                    setEducations={setEducations}
                                    setIsEditing={setIsEditing}
                                    userId={education.userId!}
                                    eduId={education.eduId}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </EducationStyled.ContentBox>
                    ))}
            </EducationStyled.ContentContainer>
            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <EducationStyled.AddButton onClick={handleIsAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </EducationStyled.AddButton>
            )}
        </EducationStyled.Container>
    );
}
