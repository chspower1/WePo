import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    z-index: 1007;
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
    width: 800px;
    height: 500px;
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

const ModalMsgBox = styled.div`
    width: 70%;
    margin-bottom: 50px;
`;

const ModalMsg = styled.p`
    width: 100%;
    margin-bottom: 20px;
`;

const ModalCloseButton = styled.button`
    width: 40%;
    height: 50px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
`;
const AccentWord = styled.span`
    color: #3867ff;
    font-size: 30px;
`;
function SendMailAlert({ setSendEmail }: any) {
    const navigator = useNavigate();
    return (
        <Wrapper>
            <Modal>
                <div style={{ width: "70%", marginBottom: "50px" }}>
                    <ModalHeader>
                        <AccentWord>인증메일</AccentWord>을 보내드렸어요.
                    </ModalHeader>
                    <ModalHeader>
                        <AccentWord>인증메일</AccentWord>을 확인해주세요.✉️
                    </ModalHeader>
                </div>
                <ModalMsgBox>
                    <ModalMsg>반가워요 WEPO에 오신것을 환영합니다!😆😆 </ModalMsg>
                    <ModalMsg>아직 한 단계가 남아있습니다.</ModalMsg>
                    <ModalMsg>
                        가입하신 이메일을 인증해주시면, WEPO의 서비스를 마음껏 이용하실 수 있습니다.
                    </ModalMsg>
                    <ModalMsg>👍🏻가입해주셔서 감사합니다👍🏻</ModalMsg>
                </ModalMsgBox>
                <ModalCloseButton
                    onClick={() => {
                        setSendEmail(false);
                        navigator("/login", { replace: true });
                    }}
                >
                    로그인 페이지로 돌아가기
                </ModalCloseButton>
            </Modal>
        </Wrapper>
    );
}

export default SendMailAlert;
