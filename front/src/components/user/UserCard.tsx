import { useEffect, useState } from "react";
import { curUserState, usersState, IUser, ILike, Efield } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useLocation, useParams } from "react-router-dom";

import styled, { css } from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";
import { useForm } from "react-hook-form";
import { updateUser, curUserToggleLike } from "@api/api";
import { Star } from "@styled-icons/fluentui-system-regular/Star";
import { StarEmphasis } from "@styled-icons/fluentui-system-filled/StarEmphasis";
import { PlusOutline } from "@styled-icons/evaicons-outline/PlusOutline";
import FieldStyle from "@styledComponents/FieldStyle";
import { E } from "styled-icons/simple-icons";
import FiledStyle from "@styledComponents/FieldStyle";
import { LoadingBox, LoadingIcon } from "./Network";

const ItemWrap = styled.div`
    position: relative;
    min-width: 350px;
    min-height: 335px;
    padding: 30px 30px;
    border-radius: 10px;
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowGrayColor};
    background: ${(props) => props.theme.cardColor};
`;
const From = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const InfoBox = styled.div`
    position: relative;
    display: flex;
`;
const ProfileImageBox = styled.div`
    position: relative;
    transform: translateY(-40px);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid ${(props) => props.theme.filedBgColor};
`;

const UserInfoTxt = styled.div`
    margin-left: 20px;
    color: ${(props) => props.theme.textColor};
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
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
`;
const PlusIcon = styled(PlusOutline)`
    position: absolute;
    z-index: 3;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
`;

const NameTxt = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 170px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: default;
`;
const EmailTxt = styled.h3`
    font-size: 14px;
    a {
        display: block;
        width: 170px;
        line-height: 1.5;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: ${(props) => props.theme.btnColor};
    }
`;
const DescBox = styled.div`
    color: ${(props) => props.theme.textColor};
`;
const DescTit = styled.p`
    font-weight: bold;
    margin-bottom: 16px;
`;
const DescTxt = styled.p`
    height: 80px;
    word-break: break-all;
    line-height: 1.2;
    font-size: 14px;
`;

const EditOrDetailBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
`;

const ArrowIcon = styled(ArrowRightShort)`
    width: 18px;
    height: 18px;
    margin-top: -3px;
`;
const DetailBtn = styled.button`
    text-align: center;
    color: #5573df;
    margin: 0 auto;
`;
const LikeBtnBox = styled.div`
    width: 25px;
    height: 25px;
    border: 1px solid #000;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.starBorderColor};
    transition: all 0.3s ease;
    &.active {
        background: ${(props) => props.theme.starBorderColor};
    }
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
    color: ${(props) => props.theme.starBorderColor};
    width: 80%;
`;
const FullLikeButton = styled(StarEmphasis)`
    color: ${(props) => props.theme.starFullColor};
    width: 75%;
`;
const DescTextarea = styled.textarea`
    width: 100%;
    height: 90%;
    resize: none;
`;
const FieldBox = styled.div`
    display: flex;
    min-height: 25px;
    flex-wrap: wrap;
    margin: 0 -4px 10px;
`;
const FieldTxt = styled.div`
    ${(props: any) =>
        props.chose &&
        css`
            background-color: ${(props) => props.theme.filedBgColor};
        `}
    display:inline-block;
    padding: 6px 8px;
    background: blue;
    color: red;
    font-size: 13px;
    border-radius: 5px;
    margin: 0 4px 10px;
`;
const CheckMe = styled.div`
    z-index: 0;
    position: absolute;
    text-align: center;
    width: 150px;
    height: 60px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border-radius: 10px 10px 0px 0px;
    right: 10px;
    top: -60px;
    padding-top: 15px;
    font-size: 26px;
`;
const InputBtn = styled.input`
    position: absolute;
    left: -99999px;
    & + label {
        background-color: gray;
        color: white;
    }
    &:checked + label {
        background-color: #3867ff;
        color: white;
    }
`;
interface IUserFormValue {
    reName: string;
    reDescription: string;
    reField: string[];
    rePicture: File[];
}

function UserCard({ _id, name, email, description, field, userId, picture }: IUser) {
    const location = useLocation();
    const pathName = location.pathname;
    const [curUser, setCurUser] = useRecoilState(curUserState);
    const [pictureState, setPictureState] = useState(picture);
    const { register, handleSubmit, watch } = useForm<IUserFormValue>();
    const [onEdit, setOnEdit] = useState(false);
    const foundLikeUser = curUser?.likes.find((user) => user === userId);
    const fieldList = ["프론트엔드", "백엔드", "데이터분석", "인공지능"];
    //권한관리
    const { userSeq } = useParams();
    const compareUser = userSeq && parseInt(userSeq) === curUser?.userId!;
    const inMyPage = pathName === "/mypage";
    const admin = inMyPage || compareUser;

    //수정완료 후 실행함수
    const onvalid = ({
        reName: name,
        reDescription: description,
        reField: field,
        rePicture: picture,
    }: IUserFormValue) => {
        console.log(picture);
        console.log(picture.length);
        setCurUser((prev) => {
            const updateCurUser = { ...prev };
            updateCurUser.name = name;
            updateCurUser.description = description;
            updateCurUser.field = field;
            if (picture.length !== 0) {
                updateCurUser.picture = picture[0]?.name;
                setPictureState(picture[0].name);
            }

            return updateCurUser as IUser;
        });

        updateUser({ name, description, field, picture }, curUser?.userId!);
        setOnEdit((cur) => !cur);
    };
    const onClickEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnEdit((cur) => !cur);
    };

    const onClickLike = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        curUserToggleLike(userId);
        setCurUser((prev: any) => {
            let filterLike = [...prev.likes];
            if (filterLike.includes(userId)) {
                filterLike = filterLike.filter((elem) => elem !== userId);
            } else {
                filterLike.push(userId);
            }
            const addLikeUser: IUser = { ...prev, likes: filterLike };
            return addLikeUser;
        });
    };
    // 이미지 미리보기
    const [avatarPreview, setAvatarPreview] = useState("");
    const avatar = watch("rePicture");
    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    }, [avatar]);
    useEffect(() => {}, [curUser]);
    if (!curUser)
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        );
    return (
        <>
            <ItemWrap>
                {curUser?.userId === userId && pathName === "/network" && (
                    <CheckMe>It's Me!</CheckMe>
                )}

                <From onSubmit={handleSubmit(onvalid)}>
                    <InfoBox>
                        <ProfileImageBox>
                            <ProfileImg
                                src={
                                    avatarPreview
                                        ? avatarPreview
                                        : `http://localhost:5001/uploads/${picture}`
                                }
                                alt="profileImage"
                            />
                            {onEdit && (
                                <ImageChangeInput
                                    type="file"
                                    accept="image/*"
                                    {...register("rePicture")}
                                />
                            )}
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
                        </UserInfoTxt>
                    </InfoBox>
                    <FieldBox>
                        {onEdit ||
                            field.map((elem) => (
                                <FieldStyle chose={field.includes(elem) ? true : false}>
                                    {elem}
                                </FieldStyle>
                            ))}
                        {onEdit &&
                            fieldList.map((elem, index) => (
                                <>
                                    <div style={{ display: "inline-block" }}>
                                        <InputBtn
                                            id={elem}
                                            key={elem}
                                            type="checkbox"
                                            value={elem}
                                            defaultChecked={field.includes(elem) ? true : false}
                                            {...register("reField")}
                                        />
                                        <FiledStyle
                                            htmlFor={elem}
                                            chose={field.includes(elem) ? true : false}
                                        >
                                            {elem}
                                        </FiledStyle>
                                    </div>
                                </>
                            ))}
                    </FieldBox>
                    <DescBox>
                        <DescTit>한마디</DescTit>
                        <DescTxt>
                            {onEdit ||
                                (description?.length > 73
                                    ? `${description.slice(0, 73)}...`
                                    : description)}
                            {onEdit && (
                                <DescTextarea
                                    defaultValue={description}
                                    {...register("reDescription", {
                                        required: "나에 대한 설명을 입력해주세요",
                                    })}
                                ></DescTextarea>
                            )}
                        </DescTxt>
                    </DescBox>
                    <EditOrDetailBtnBox>
                        {pathName === `/network` && (
                            <>
                                <LikeBtnBox className={foundLikeUser ? "active" : ""}>
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
                            (admin && (
                                <DetailBtn title="편집" onClick={onClickEdit}>
                                    편집
                                </DetailBtn>
                            ))}
                        {onEdit && (
                            <>
                                <DetailBtn title="수정완료">수정완료</DetailBtn>
                                <DetailBtn
                                    title="취소"
                                    onClick={(e) => {
                                        onClickEdit(e);
                                        setAvatarPreview(
                                            `http://localhost:5001/uploads/${picture}`
                                        );
                                    }}
                                >
                                    취소
                                </DetailBtn>
                            </>
                        )}
                    </EditOrDetailBtnBox>
                </From>
            </ItemWrap>
        </>
    );
}

export default UserCard;
