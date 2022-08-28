import { curUserState, IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentDetail,
    MvpContentDate,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../user/MyPortfolio";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";
import { Category, deleteData } from "../../api/api";

export default function Award({ awardsProps }: { awardsProps: IAward[] }) {
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);

    // 자격증 상태
    const [awards, setAwards] = useState<IAward[]>(awardsProps);

    // form관리
    const [isAddFormActive, setIsAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
    const newDate = new Date();
    const maxDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;

    // 현재 경로
    const location = useLocation();
    const pathName = location.pathname;

    // 삭제버튼 클릭시
    const onClickDeleteBtn = (award: IAward, index: number) => {
        const userId = award.userId!;
        const awardId = award.awardId!;
        deleteData(Category.award, awardId, userId);
        setAwards((prev) => {
            const newAwards = [...prev];
            newAwards.splice(index, 1);
            return newAwards;
        });
    };

    //추가버튼 클릭시 버튼 활성화 on/off
    function handleIsAddFormActive() {
        setIsAddFormActive((current) => !current);
    }
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>수상경력</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {isAddFormActive && (
                    <AwardAddForm
                        setAwards={setAwards}
                        maxDate={maxDate}
                        setIsAddFormActive={setIsAddFormActive}
                        userId={curUser?.userId!}
                    />
                )}
                {!isAddFormActive &&
                    awards?.map((award, index) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <MvpContentAccent>{award.title}</MvpContentAccent>
                                        <MvpContentDetail
                                            style={{ marginTop: "20px", marginLeft: "20px" }}
                                        >
                                            {award.grade}
                                        </MvpContentDetail>
                                    </div>
                                    <MvpContentDetail>{award.org}</MvpContentDetail>
                                    <MvpContentDate>
                                        {String(award.date).slice(0, 10)}
                                    </MvpContentDate>
                                    <MvpContentDetail>{award.description}</MvpContentDetail>
                                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3867FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton
                                                onClick={() => {
                                                    onClickDeleteBtn(award, index);
                                                }}
                                            >
                                                <Trash2 color="#3867FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex === index && (
                                <AwardEditForm
                                    index={index}
                                    awards={awards}
                                    setAwards={setAwards}
                                    setIsEditing={setIsEditing}
                                    maxDate={maxDate}
                                    awardId={award?.awardId!}
                                    userId={award?.userId!}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {curUser && pathName === "/mypage" && !isAddFormActive && (
                <MvpAddButton onClick={handleIsAddFormActive}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
