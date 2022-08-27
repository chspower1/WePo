import { curUserState, IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useLocation, useParams } from "react-router-dom";
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
import { deleteAward } from "../../api/api";

export default function Award({ info }: any) {
    // user ID
    const { userSeq } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    const userToken = sessionStorage.getItem("userToken");
    // 자격증 상태
    const [awards, setAwards] = useState<IAward[]>(info);

    // form관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
    const newDate = new Date();
    const maxDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;
    const onClickDeleteBtn = (award: IAward, index:number) => {
        const userSeq = parseInt(award.userId!);
        const awardId = award._id!;
        deleteAward(awardId, userSeq);
        setAwards(prev=> {
            const newAwards = [...prev];
            newAwards.splice(index, 1);
            return newAwards;
        })
    };
    const location = useLocation();
    const pathName = location.pathname;
    // 추가사항 on/off
    function handleAdding() {
        setAddFormActive((current) => !current);
    }
    return (
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>수상경력</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <AwardAddForm
                        setAwards={setAwards}
                        maxDate={maxDate}
                        setAddFormActive={setAddFormActive}
                        userSeq={userSeq}
                    />
                )}
                {!addFormActive &&
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
                                    <MvpContentDate>{String(award.date)}</MvpContentDate>
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
                                            <MvpDeleteButton onClick={()=>{onClickDeleteBtn(award, index)}}>
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
                                    _id={award?._id!}
                                    userSeq={award?.userId!}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {curUser && pathName === "/mypage" && !addFormActive && (
                <MvpAddButton onClick={handleAdding}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
