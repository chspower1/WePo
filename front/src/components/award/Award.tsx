import { curUserState, IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useParams } from "react-router-dom";
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
} from "../MyPortfolio";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";
import { deleteAward } from "../../api/api";

export default function Award({ info }: any) {
    // user ID
    const { id } = useParams();
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
                        id={id}
                    />
                )}
                {!addFormActive &&
                    awards?.map((list, index) => (
                        <MvpContentBox key={index}>
                            {targetIndex !== index && (
                                <>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <MvpContentAccent>{list.title}</MvpContentAccent>
                                        <MvpContentDetail
                                            style={{ marginTop: "20px", marginLeft: "20px" }}
                                        >
                                            {list.grade}
                                        </MvpContentDetail>
                                    </div>
                                    <MvpContentDetail>{list.org}</MvpContentDetail>
                                    <MvpContentDate>{String(list.date)}</MvpContentDate>
                                    <MvpContentDetail>{list.description}</MvpContentDetail>
                                    {id === curUser?.userId! && targetIndex !== index && (
                                        <>
                                            <MvpEditButton
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTargetIndex(index);
                                                }}
                                            >
                                                <Pencil color="#3867FF" />
                                            </MvpEditButton>
                                            <MvpDeleteButton onClick={()=>{deleteAward(list._id!)}}>
                                                <Trash2 color="#3867FF" />
                                            </MvpDeleteButton>
                                        </>
                                    )}
                                </>
                            )}
                            {isEditing && targetIndex == index && (
                                <AwardEditForm
                                    index={index}
                                    awards={awards}
                                    setAwards={setAwards}
                                    setIsEditing={setIsEditing}
                                    maxDate={maxDate}
                                    id={id}
                                    _id={list._id}
                                    setTargetIndex={setTargetIndex}
                                />
                            )}
                        </MvpContentBox>
                    ))}
            </MvpContentContainer>
            {id === curUser?._id && (
                <MvpAddButton onClick={handleAdding}>
                    <PlusSquareFill color="#3687FF" />
                </MvpAddButton>
            )}
        </MvpContainer>
    );
}
