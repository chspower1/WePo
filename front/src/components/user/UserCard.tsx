import { useState } from "react";
import { curUserState, IUser } from "./../../atoms";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";

const ItemWrap = styled.div`
    position: relative;
    width: 100%;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);
`;
const InfoBox = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 40px;
`;
const ProfileImageBox = styled.div`
    position: absolute;
    left: 0px;
    top: -40px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    object-position: center center;
    border: 2px solid #5573df;
`;

const UserInfoTxt = styled.div`
    margin-left: 110px;
`;
const NameTxt = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const EmailTxt = styled.h3`
    a {
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
    text-align: right;
`;

const ArrowIcon = styled(ArrowRightShort)`
    width: 18px;
    height: 18px;
    margin-top: -3px;
`;
const DetailBtn = styled.button`
    color: #5573df;
`;

function UserCard({ _id, name, email, description, hopeField }: IUser) {
    const location = useLocation();
    const pathName = location.pathname;
    const curUser = useRecoilValue(curUserState);
    const val_id = _id === curUser?._id;
    const [onEdit, setOnEdit] = useState(false);
    const onClickEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnEdit((cur) => !cur);
    };
    return (
        <>
            {onEdit ? (
                <>
                    편집모드
                    {_id === curUser?._id && (
                        <DetailBtn title="편집" onClick={onClickEdit}>
                            편집
                        </DetailBtn>
                    )}
                </>
            ) : (
                <ItemWrap>
                    <InfoBox>
                        <ProfileImageBox>
                            <img src="https://placeimg.com/32/32/animals" alt="" />
                        </ProfileImageBox>
                        <UserInfoTxt>
                            <NameTxt>{name}</NameTxt>
                            <EmailTxt>
                                <a href={`mailto:${email}`} title="메일 보내기">
                                    {email}
                                </a>
                            </EmailTxt>
                            <DescTit>{hopeField}</DescTit>
                        </UserInfoTxt>
                    </InfoBox>
                    <DescBox>
                        <DescTit>한마디</DescTit>
                        <DescTxt>
                            {description.length > 70
                                ? description.slice(0, 70) + "..."
                                : description}
                        </DescTxt>
                    </DescBox>
                    <EditOrDetailBtnBox>
                        {pathName === `/network` && (
                            <Link to={`${_id}`}>
                                <DetailBtn title="더보기">
                                    더보기
                                    <ArrowIcon />
                                </DetailBtn>
                            </Link>
                        )}
                        {_id === curUser?._id && (
                            <DetailBtn title="편집" onClick={onClickEdit}>
                                편집
                            </DetailBtn>
                        )}
                    </EditOrDetailBtnBox>
                </ItemWrap>
            )}
        </>
    );
}

export default UserCard;
