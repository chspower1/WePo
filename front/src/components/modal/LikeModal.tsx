import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProfileImg } from "@user/UserCard";
import { Link } from "react-router-dom";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

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
        transform: translate(-50%, -45%);
    }
    to{
        opacity:1;
        transform: translate(-50%, -50%);
    }
`;
const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${modalShow} 0.5s;
    width: 600px;
    height: 600px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255);
    padding: 50px 30px 10px;

    @media screen and (max-width: 500px) {
        width: 90%;
    }
`;
const LikedUserImgBox = styled.div`
    position: relative;
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    overflow: hidden;
    border: 2px solid ${(props) => props.theme.filedBgColor};
    box-shadow: 5px 5px 10px rgba(196, 196, 196, 0.4);
    flex-shrink: 0;
`;
const AccentWord = styled.h2`
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    text-align: center;
    padding: 0 0 40px;
`;

const LikeBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    & + & {
        border-top: 1px solid #eee;
    }
    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
    }
`;
const LikeLists = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    max-height: 480px;
    padding: 0 30px;
    overflow-y: scroll;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.starBorderColor};
        border-radius: 10px;
    }
`;
const ClsBtn = styled.button`
    position: absolute;
    right: 30px;
    top: 20px;
    width: 30px;
    height: 30px;
    padding: 0;
`;
const CloseBtnIcons = styled(CloseOutline)`
    width: 100%;
    height: 100%;
    color: #666666;
`;
const GotoLinkBox = styled.div`
    display: inline-block;
    flex-shrink: 0;
    @media screen and (max-width: 500px) {
        width: 100%;
        margin-top: 10px;
        text-align: right;
    }
`;
const GotoLink = styled(Link)`
    display: inline-block;
    color: ${(props) => props.theme.btnTextColor};
    background: ${(props) => props.theme.starBorderColor};
    font-size: 13px;
    padding: 10px 15px;
    border-radius: 10px;
`;
const LikedUserInfoBox = styled.div`
    display: flex;
    align-items: center;
    width:100%; 
`;
const LikedUserInfoInner = styled.div`
    width:100%;
    font-size: 16px;
    cursor: default;
    line-height: 1.5;
    @media screen and (max-width: 500px) {
        font-size: 14px;
    }
`;
const LikedUserName = styled.h3`
    width: 275px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const LikedUserEmail = styled.a`
    display: block;
    color: ${(props) => props.theme.btnColor};
    width: 275px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

interface ILikeCardProps {
  name: string;
  email: string;
  picture: string;
  userId: number;
  setOnLikeModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
const LikeCard = ({ name, email, picture, userId, setOnLikeModalState }: ILikeCardProps) => {
  const pictureDefault = String(picture).split("/")[0] === "default_images";
  const findUserId = String(picture).split("_")[0] === String(userId) ? "" : userId + "_";
  const notDefault = pictureDefault ? "" : findUserId;
  return (
    <LikeBox>
      <LikedUserInfoBox>
        <LikedUserImgBox>
          <ProfileImg
            src={`http://${window.location.hostname}:5001/uploads/${notDefault}${picture}`}
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
        <AccentWord>나의 즐겨찾기 목록</AccentWord>
        <ClsBtn onClick={() => setOnLikeModalState(false)}>
          <CloseBtnIcons />
        </ClsBtn>
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
