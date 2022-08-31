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
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

const modalShow = keyframes`
    from{
        opacity:0;
        transform:translateY(-100%);
    }
    to{
        opacity:1;
        transform:translateY(0%);
    }
`;
const Modal = styled.div`
    animation: ${modalShow} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin-top: 50px;
    width: 400px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    background-color: rgba(255, 255, 255);
`;
const ModalHeader = styled.h1`
    width: 100%;
    font-size: 20px;
    font-weight: 400;
`;
const AccentWord = styled.span`
    color: #3867ff;
    font-size: 30px;
`;

const LikeBox = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
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
        <LikeBox style={{ margin: "10px" }}>
            <InfoBox style={{ alignItems: "center" }}>
                <ProfileImageBox style={{ width: "60px", height: "60px" }}>
                    <ProfileImg
                        src={`http://localhost:5001/uploads/${picture}`}
                        alt="profileImage"
                    />
                </ProfileImageBox>
                <UserInfoTxt style={{ alignItems: "center" }}>
                    <NameTxt>{name}</NameTxt>

                    <EmailTxt>
                        <a href={`mailto:${email}`} title={`${email}에 메일 보내기`}>
                            {email}
                        </a>
                    </EmailTxt>
                </UserInfoTxt>
            </InfoBox>
            <Link to={`/network/${userId}`}>
                <button onClick={() => setOnLikeModalState(false)}>보러가기</button>
            </Link>
        </LikeBox>
    );
};

function LikeModal({ likeUsers, setOnLikeModalState, onLikeModalState }: any) {
    useEffect(() => {}, [onLikeModalState]);
    const navigator = useNavigate();
    return (
        <Wrapper>
            <Modal>
                <AccentWord>내가 팔로우한 사람</AccentWord>
                <button onClick={() => setOnLikeModalState(false)}> x </button>
                {likeUsers?.map((user: any, index: number) => (
                    <LikeCard {...user} setOnLikeModalState={setOnLikeModalState}></LikeCard>
                ))}
            </Modal>
        </Wrapper>
    );
}

export default LikeModal;
