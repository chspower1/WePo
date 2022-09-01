import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ILike } from "@/atoms";
import {
    EmailTxt,
    InfoBox,
    NameTxt,
    ProfileImageBox,
    ProfileImg,
    UserInfoTxt,
} from "@user/UserCard";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    z-index: 1010;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
`;

const modalShow = keyframes`
    from{
        opacity:0;
        top:-100%;
    }
    to{
        opacity:1;
        top:50%;
    }
`;
const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${modalShow} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 600px;
    height: 600px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255);
    padding: 50px 30px 10px;
`;
const LikedUserImgBox = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    overflow: hidden;
    border: 4px solid ${(props) => props.theme.filedBgColor};
    box-shadow: 5px 5px 10px rgba(196, 196, 196, 0.4);
`;
const AccentWord = styled.h2`
    color: #3867ff;
    font-size: 30px;
    text-align: center;
    padding: 0 0 30px;
`;

const LikeBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    & + & {
        border-top: 2px solid #555555;
    }
`;
const LikeLists = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    max-height: 480px;
    padding: 0 30px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.btnColor};
        border-radius: 10px;
    }
`;
const ClsBtn = styled.button`
    position: absolute;
    right: 50px;
    top: 30px;
`;
const GotoLinkBox = styled.div`
    display: inline-block;
`;
const GotoLink = styled(Link)`
    display: inline-block;
    color: ${(props) => props.theme.btnTextColor};
    background: ${(props) => props.theme.starBorderColor};
    font-size: 13px;
    padding: 12px 15px;
    border-radius: 10px;
`;
const LikedUserInfoBox = styled.div`
    display: flex;
    align-items: center;
`;
const LikedUserInfoInner = styled.div`
    font-size: 16px;
    cursor: default;
    line-height: 1.5;
`;
const LikedUserName = styled.h3``;
const LikedUserEmail = styled.a`
    display: inline-block;
    color: ${(props) => props.theme.btnColor};
`;

interface ILikeCardProps {
    name: string;
    email: string;
    picture: string;
    userId: number;
    setOnLikeModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
const LikeCard = ({ name, email, picture, userId, setOnLikeModalState }: ILikeCardProps) => {
    return (
        <LikeBox>
            <LikedUserInfoBox>
                <LikedUserImgBox>
                    <ProfileImg
                        src={`http://localhost:5001/uploads/${picture}`}
                        alt="profileImage"
                    />
                </LikedUserImgBox>
                <LikedUserInfoInner>
                    <LikedUserName>{name}</LikedUserName>
                    <LikedUserEmail href={`mailto:${email}`} title={`${email}에 메일 보내기`}>
                        {email}
                    </LikedUserEmail>
                </LikedUserInfoInner>
            </LikedUserInfoBox>
            <GotoLinkBox>
                <GotoLink to={`/network/${userId}`} onClick={() => setOnLikeModalState(false)}>
                    프로필 보기
                </GotoLink>
            </GotoLinkBox>
        </LikeBox>
    );
};

function LikeModal({ likeUsers, setOnLikeModalState, onLikeModalState }: any) {
    // useEffect(() => {}, [onLikeModalState]);
    const navigator = useNavigate();
    return (
        <Wrapper>
            <Modal>
                <AccentWord>내가 팔로우한 사람</AccentWord>
                <ClsBtn onClick={() => setOnLikeModalState(false)}> x </ClsBtn>
                <LikeLists>
                    {likeUsers?.map((user: any, index: number) => (
                        <LikeCard {...user} setOnLikeModalState={setOnLikeModalState}></LikeCard>
                    ))}
                </LikeLists>
            </Modal>
        </Wrapper>
    );
}

export default LikeModal;
