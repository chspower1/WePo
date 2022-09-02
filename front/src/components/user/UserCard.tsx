import { useEffect, useState } from "react";
import { curUserState, IUser, IProfile } from "@/atoms";
import { useRecoilState } from "recoil";
import { Link, useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";
import { useForm } from "react-hook-form";
import { updateUser, curUserToggleLike } from "@api/api";
import { Star } from "@styled-icons/fluentui-system-regular/Star";
import { StarEmphasis } from "@styled-icons/fluentui-system-filled/StarEmphasis";
import { PlusOutline } from "@styled-icons/evaicons-outline/PlusOutline";
import FieldStyle from "@styledComponents/FieldStyle";
import FiledStyle from "@styledComponents/FieldStyle";
import { LoadingBox, LoadingIcon } from "./Network";
import LikeModal from "@components/modal/LikeModal";
import ChangePassword from "@components/modal/ChangePassword";
import { LockPassword } from "styled-icons/remix-line";

const ItemWrap = styled.div`
    position: relative;
    min-height: 335px;
    padding: 30px 30px 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowGrayColor};
    background: ${(props) => props.theme.cardColor};
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.cardColor};
    transform: translate(0, 0);
    transition: border 0.3s, box-shadow 0.3s, transform 0.4s;
    &:not(.sticky):hover {
        border: 1px solid ${(props) => props.theme.filedBgColor};
        box-shadow: 12px 12px 18px ${(props) => props.theme.boxShadowHoverColor};
        transform: translate(0, -10px);
    }
    &.sticky {
        position: sticky;
        left: 0;
        top: 120px;
    }
    @media screen and (max-width: 500px) {
        width: 88%;
        margin: 0px auto;
    }
`;
const From = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const InfoBox = styled.div`
    position: relative;
    display: flex;
`;
export const ProfileImageBox = styled.div`
    position: relative;
    transform: translate(-10px, -50px);
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid ${(props) => props.theme.filedBgColor};
    box-shadow: 5px 5px 10px rgba(196, 196, 196, 0.4);
`;
export const LikeModalInfoBox = styled(InfoBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;
export const ModalProfileImageBox = styled(ProfileImageBox)`
    position: relative;
    transform: translate(0, 0);
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid ${(props) => props.theme.filedBgColor};
    box-shadow: 5px 5px 10px rgba(196, 196, 196, 0.4);
`;

export const UserInfoTxt = styled.div`
    width: calc(100% - 130px);
    margin-left: 20px;
    color: ${(props) => props.theme.textColor};
`;
export const ProfileImg = styled.img`
    object-fit: cover;
    height: 100%;
    position: relative;
    z-index: 1;
`;
const ImageChangeBox = styled.div`
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    transition: background 0.3s;
    &:hover {
        background: rgba(0, 0, 0, 0.5);
        & svg {
            color: rgba(255, 255, 255, 1);
        }
    }
`;
const ImageChangeInput = styled.input`
    text-indent: -99999px;
    width: 100%;
    height: 100%;
`;
const ImageChangeLabel = styled.label`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
`;
const ImageChangeIcon = styled(PlusOutline)`
    margin: auto;
    width: 30px;
    height: 30px;
    transition: color 0.3s;
    color: rgba(255, 255, 255, 0);
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

export const NameTxt = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: default;
    line-height: 1.4;
    & > input[type="text"] {
        font-size: 16px;
        width: 100%;
        border-radius: 10px;
        border: solid 1px ${(props) => props.theme.btnColor};
        outline: none;
        margin-bottom: 10px;
        padding: 8px 10px;
        &::placeholder {
            font-size: 14px;
            color: #f32942;
        }
        &:focus {
            border: 2px solid ${(props) => props.theme.accentColor};
        }
    }
`;
export const EmailTxt = styled.h3`
    font-size: 16px;
    a {
        display: block;
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
    font-size: 16px;
    color: ${(props) => props.theme.subTextColor};
    &:focus {
        border: 1.5px solid ${(props) => props.theme.accentColor};
    }
`;

const EditOrDetailBtnBox = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-top: 30px;
`;
const IsMyCardBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &.mycard {
        justify-content: flex-end;
    }
`;

const ArrowIcon = styled(ArrowRightShort)`
    width: 25px;
    height: 25px;
    margin-top: -3px;
`;
const DetailBtn = styled.button`
    display: inline-block;
    color: #5573df;
    margin: 0 auto;
    font-size: 15px;
    padding: 5px 0;
    transition: all 0.4s ease;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    padding: 10px 15px;
    border-radius: 5px;
    transition: all 0.4s ease;
    &:hover {
        background: ${(props) => props.theme.accentColor};
    }
`;
const ExitButton = styled.button`
    color: ${(props) => props.theme.btnColor};
    padding: 8px 15px;
    border-radius: 5px;
    margin-top: 10px;
`;

const LikeBtnBox = styled.div`
    width: 30px;
    height: 30px;
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
    font-size: 15px;
    border-radius: 10px;
    border: 0;
    border: solid 1px ${(props) => props.theme.btnColor};
    margin-bottom: 10px;
    padding: 8px 10px;
    &::placeholder {
        color: #f32942;
        font-size: 14px;
    }
    &:focus {
        outline: 1.5px solid ${(props) => props.theme.accentColor};
    }
`;
const FieldBox = styled.div`
    display: flex;
    min-height: 25px;
    flex-wrap: wrap;
    margin: 0 -4px 20px;
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
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border-radius: 10px 10px 0px 0px;
    right: 10px;
    top: 0;
    padding-top: 15px;
    font-size: 16px;
    padding: 10px 30px;
    transform: translateY(-100%);
`;
const InputBtn = styled.input`
    position: absolute;
    left: -99999px;
    & + label {
        background-color: #cdd7f4;
        color: white;
    }
    &:checked + label {
        background-color: #3867ff;
        color: white;
    }
`;

const ModalDelBtn = styled.button``;
const PasswordChangeBtn = styled.button`
    display: flex;
    text-align: center;
    font-size: 13px;
    padding: 7px;
    color: tomato;
    margin: 0 0 0 auto;
    border-radius: 5px;
    transform: translate(0, -58px);
    transition: all 0.4s ease;
    &:hover {
        color: #ff0000;
    }
`;

interface IUserCardProps {
    profile?: IProfile | IUser;
    setProfile?: React.Dispatch<React.SetStateAction<IProfile | undefined>>;
}
interface IUserFormValue {
    reName: string;
    reDescription: string;
    reField: string[];
    rePicture: File[];
}

function UserCard({ profile, setProfile }: IUserCardProps) {
    const location = useLocation();
    const pathName = location.pathname;
    const [curUser, setCurUser] = useRecoilState(curUserState);
    const { name, email, description, field, userId, picture, likes } = profile
        ? profile!
        : curUser!;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserFormValue>({
        mode: "onChange",
        defaultValues: {
            reField: field,
        },
    });
    const [onLikeModalState, setOnLikeModalState] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const foundLikeUser = curUser?.likes.find((user) => user.userId === userId);
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
        setProfile!((prev) => {
            const updateProfile = { ...prev };
            if (picture!.length !== 0) {
                updateProfile.picture = picture[0]?.name;
            }
            return { ...prev, name, field, description, picture: updateProfile.picture };
        });
        setCurUser((prev) => {
            const updateCurUser = { ...prev };
            updateCurUser.name = name;
            updateCurUser.description = description;
            updateCurUser.field = field;
            if (picture!.length !== 0) {
                updateCurUser.picture = picture[0]?.name;
            }
            return updateCurUser as IUser;
        });
        updateUser({ name, description, field, picture }, curUser?.userId!);
        setOnEdit(false);
    };
    const onClickEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnEdit((cur) => !cur);
    };

    const onClickLikesModal = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnLikeModalState((cur) => !cur);
    };
    //즐겨찾기 추가/삭제
    const onClickLike = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        curUserToggleLike(profile?.userId!);
        setCurUser((prev) => {
            let filterLike = [...prev?.likes!];
            if (foundLikeUser) {
                filterLike = filterLike.filter((elem) => elem.userId !== userId);
            } else {
                filterLike.push({
                    userId: profile?.userId!,
                    name: profile?.name!,
                    email: profile?.email!,
                    picture: profile?.picture!,
                });
            }
            const addLikeUser = { ...prev, likes: filterLike };
            return addLikeUser as IUser;
        });
    };
    // 이미지 미리보기
    const [newPicturePreview, setNewPicturePreview] = useState("");
    const newPicture = watch("rePicture");
    useEffect(() => {
        if (newPicture && newPicture.length > 0) {
            const file = newPicture[0];
            setNewPicturePreview(URL.createObjectURL(file));
        }
    }, [newPicture]);

    const pictureDefault = String(picture).split("/")[0] === "default_images";
    const findUserId = String(picture).split("_")[0] === String(userId) ? "" : userId + "_";
    const notDefault = pictureDefault ? "" : findUserId;

    useEffect(() => {}, [onEdit]);
    if (!profile)
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        );
    return (
        <>
            {editPassword && <ChangePassword setEditPassword={setEditPassword}></ChangePassword>}
            {onLikeModalState && (
                <>
                    <LikeModal
                        likeUsers={likes}
                        setOnLikeModalState={setOnLikeModalState}
                        onLikeModalState={onLikeModalState}
                    ></LikeModal>
                </>
            )}
            <ItemWrap className={pathName === "/mypage" ? "sticky" : ""}>
                {curUser?.userId === userId && pathName === "/network" && (
                    <CheckMe>It's Me!</CheckMe>
                )}

                <From
                    onSubmit={handleSubmit(onvalid)}
                    encType="multipart/form-data"
                    acceptCharset="UTF-8"
                >
                    <InfoBox>
                        <ProfileImageBox>
                            <ProfileImg
                                src={
                                    newPicturePreview
                                        ? newPicturePreview
                                        : `http://${window.location.hostname}:5001/uploads/${notDefault}${picture}`
                                }
                                alt="profileImage"
                            />
                            {onEdit && (
                                <ImageChangeBox>
                                    <ImageChangeInput
                                        type="file"
                                        id="imgInput"
                                        accept="image/*"
                                        {...register("rePicture")}
                                    />
                                    <ImageChangeLabel htmlFor="imgInput">
                                        <ImageChangeIcon />
                                    </ImageChangeLabel>
                                </ImageChangeBox>
                            )}
                        </ProfileImageBox>
                        <UserInfoTxt>
                            <NameTxt>
                                {onEdit || name}
                                {onEdit && (
                                    <input
                                        type="text"
                                        defaultValue={name}
                                        placeholder={errors.reName?.message}
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
                    {onEdit && (
                        <PasswordChangeBtn onMouseDown={() => setEditPassword(true)}>
                            <LockPassword size={18} style={{ marginRight: "5px" }} />
                            비밀번호 변경
                        </PasswordChangeBtn>
                    )}
                    <FieldBox>
                        {onEdit ||
                            field?.map(
                                (elem) =>
                                    field.length >= 1 && (
                                        <FieldStyle chose={field.includes(elem) ? true : false}>
                                            {elem}
                                        </FieldStyle>
                                    )
                            )}
                        {onEdit &&
                            fieldList.map((elem, index) => (
                                <>
                                    <div style={{ display: "inline-block" }}>
                                        <InputBtn
                                            id={elem}
                                            key={elem}
                                            type="checkbox"
                                            value={elem}
                                            {...register("reField")}
                                        />
                                        <FiledStyle
                                            htmlFor={elem}
                                            chose={field?.includes(elem) ? true : false}
                                        >
                                            {elem}
                                        </FiledStyle>
                                    </div>
                                </>
                            ))}
                        {errors.reField?.message}
                    </FieldBox>
                    <DescBox>
                        <DescTxt>
                            {onEdit ||
                                (description &&
                                    (description!.length > 73
                                        ? `${description?.slice(0, 73)}...`
                                        : description!))}
                            {onEdit && (
                                <>
                                    <DescTextarea
                                        placeholder={errors.reDescription?.message}
                                        defaultValue={description!}
                                        {...register("reDescription", {
                                            required: "나에 대한 설명을 입력해주세요",
                                        })}
                                    ></DescTextarea>
                                </>
                            )}
                        </DescTxt>
                    </DescBox>
                    <EditOrDetailBtnBox>
                        {pathName === `/network` && (
                            <IsMyCardBox className={userId === curUser?.userId ? "mycard" : ""}>
                                {userId !== curUser?.userId && (
                                    <LikeBtnBox className={foundLikeUser ? "active" : ""}>
                                        <LikeBtn onClick={onClickLike}>
                                            {foundLikeUser ? (
                                                <FullLikeButton />
                                            ) : (
                                                <EmptyLikeButton />
                                            )}
                                        </LikeBtn>
                                    </LikeBtnBox>
                                )}
                                <Link to={`${userId}`}>
                                    <DetailBtn title="더보기">
                                        더보기
                                        <ArrowIcon />
                                    </DetailBtn>
                                </Link>
                            </IsMyCardBox>
                        )}
                        {onEdit ||
                            (admin && (
                                <DetailBtn title="편집" onClick={onClickEdit}>
                                    편집
                                </DetailBtn>
                            ))}
                        {pathName !== "/network" && !onEdit && admin && (
                            <DetailBtn title="즐겨찾기 목록" onClick={onClickLikesModal}>
                                즐겨찾기목록
                            </DetailBtn>
                        )}
                        {onEdit && (
                            <>
                                <SubmitButton>수정완료</SubmitButton>
                                <ExitButton
                                    title="취소"
                                    onClick={(e) => {
                                        onClickEdit(e);
                                        setNewPicturePreview(
                                            `http://${window.location.hostname}:5001/uploads/${notDefault}${picture}`
                                        );
                                    }}
                                >
                                    취소
                                </ExitButton>
                            </>
                        )}
                    </EditOrDetailBtnBox>
                </From>
            </ItemWrap>
        </>
    );
}

export default UserCard;
