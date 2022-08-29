import { useState } from "react";
import { curUserState, usersState, IUser } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";
import { useForm } from "react-hook-form";
import { updateUser } from "@api/api";
import { Star } from "@styled-icons/fluentui-system-regular/Star";
import { StarEmphasis } from "@styled-icons/fluentui-system-filled/StarEmphasis";

const ItemWrap = styled.div`
    min-width: 350px;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(162, 190, 231, 0.25);
    background: #fff;
`;
const InfoBox = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 40px;
`;
const ProfileImageBox = styled.div`
    position: relative;
    transform: translateY(-40px);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #5573df;
`;

const UserInfoTxt = styled.div`
    margin-left: 20px;
`;
const ProfileImg = styled.img`
    position: relative;
    z-index: 1;
`;
const ImageChangeInput = styled.input`
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    text-indent: -99999px;
    display: inline-flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;
const NameTxt = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const EmailTxt = styled.h3`
    font-size: 14px;
    a {
        display: block;
        width: 170px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: ${(props) => props.theme.btnColor};
    }
`;
const DescBox = styled.div``;
const DescTit = styled.p`
    font-weight: bold;
    margin-bottom: 16px;
`;
const DescTxt = styled.p`
    height: 100px;
    word-break: break-all;
    line-height: 1.2;
`;

const EditOrDetailBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ArrowIcon = styled(ArrowRightShort)`
    width: 18px;
    height: 18px;
    margin-top: -3px;
`;
const DetailBtn = styled.button`
    text-align: center;
    color: #5573df;
`;
const LikeBtnBox = styled.div`
    width: 25px;
    height: 25px;
    border: 1px solid #000;
    border-radius: 5px;
`;
const LikeBtn = styled.button`
    display: flex;
    padding: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const EmptyLikeButton = styled(Star)`
    color: black;
    width: 80%;
`;
const FullLikeButton = styled(StarEmphasis)`
    color: black;
    width: 80%;
`;

interface IUserFormValue {
    reName: string;
    reDescription: string;
}

function UserCard({ _id, name, email, description, field, userId, picture, likes }: IUser) {
    const location = useLocation();
    const pathName = location.pathname;
    const [curUser, setCurUser] = useRecoilState(curUserState);
    const { register, handleSubmit } = useForm<IUserFormValue>();
    const [onEdit, setOnEdit] = useState(false);
    const [curLikes, setCurLikes] = useState(likes);
    const foundLikeUser = curUser?.likes.find((user) => user.userId === userId);
    const onvalid = ({ reName: name, reDescription: description }: IUserFormValue) => {
        setCurUser((prev) => {
            const updateCurUser = { ...prev };
            updateCurUser.name = name;
            updateCurUser.description = description;
            return updateCurUser as IUser;
        });
        updateUser({ name, description }, curUser?.userId!);
        setOnEdit((cur) => !cur);
    };
    const onClickEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnEdit((cur) => !cur);
    };



    
    const onClickLike = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurLikes((prev) => {
            const newLikes = [...prev, { userId }];
            return newLikes;
        });
        setCurUser((prev) => {
            const updateCurUser = { ...prev, likes: curLikes };
            console.log("curUser", curUser);
            return updateCurUser as IUser;
        });
    };

    return (
        <>
            <ItemWrap>
                <form onSubmit={handleSubmit(onvalid)}>
                    <InfoBox>
                        <ProfileImageBox>
                            <ProfileImg src={picture} alt="profileImage" />
                        </ProfileImageBox>
                        <UserInfoTxt>
                            <NameTxt>
                                {onEdit || name}
                                {onEdit && (
                                    <input
                                        type="text"
                                        defaultValue={name}
                                        {...register("reName", {
                                            required: "이름을 입력해주세요",
                                        })}
                                    />
                                )}
                            </NameTxt>

                            <EmailTxt>
                                {onEdit || (
                                    <a href={`mailto:${email}`} title={`${email}에 메일 보내기`}>
                                        {email}
                                    </a>
                                )}
                            </EmailTxt>

                            {/* <DescTit>{field}</DescTit> */}
                        </UserInfoTxt>
                    </InfoBox>
                    <DescBox>
                        <DescTit>한마디</DescTit>
                        <DescTxt>
                            {onEdit ||
                                (description?.length > 70
                                    ? description.slice(0, 70) + "..."
                                    : description)}
                            {onEdit && (
                                <input
                                    type="text"
                                    defaultValue={description}
                                    {...register("reDescription", {
                                        required: "나에 대한 설명을 입력해주세요",
                                    })}
                                />
                            )}
                        </DescTxt>
                    </DescBox>
                    <EditOrDetailBtnBox>
                        {pathName === `/network` && (
                            <>
                                <LikeBtnBox>
                                    <LikeBtn onClick={onClickLike}>
                                        {foundLikeUser ? <FullLikeButton /> : <EmptyLikeButton />}
                                    </LikeBtn>
                                </LikeBtnBox>
                                <Link to={`${userId}`}>
                                    <DetailBtn title="더보기">
                                        더보기
                                        <ArrowIcon />
                                    </DetailBtn>
                                </Link>
                            </>
                        )}
                        {onEdit ||
                            (_id === curUser?._id && pathName === "/mypage" && (
                                <DetailBtn title="편집" onClick={onClickEdit}>
                                    편집
                                </DetailBtn>
                            ))}
                        {onEdit && (
                            <>
                                <DetailBtn title="수정완료">수정완료</DetailBtn>
                                <DetailBtn title="취소" onClick={onClickEdit}>
                                    취소
                                </DetailBtn>
                            </>
                        )}
                    </EditOrDetailBtnBox>
                </form>
            </ItemWrap>
        </>
    );
}

export default UserCard;
