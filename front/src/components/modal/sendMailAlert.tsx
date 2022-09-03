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
        transform:translateY(40px);
    }
    to{
        opacity:1;
        transform:translateY(0px);
    }
`;
const Modal = styled.div`
    animation: ${modalShow} .6s;
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
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 60px;
`;

const ModalMsgBox = styled.div`
    width: 70%;
    margin-bottom: 50px;
`;

const ModalMsg = styled.p`
    width: 100%;
    margin-bottom: 25px;
    text-align: center;
`;

const ModalCloseButton = styled.button`
    width: 40%;
    height: 50px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
`;
const AccentWord = styled.span`
    color: #3867ff;
    font-weight: 600;
`;
function SendMailAlert({ setSendEmail }: any) {
  const navigator = useNavigate();
  return (
    <Wrapper>
      <Modal>
        <ModalHeader>
          ✉️ 이메일을 인증해주세요

        </ModalHeader>
        <ModalMsgBox>
          <ModalMsg>
            반가워요 ! <AccentWord>WEPO</AccentWord> 에 오신 것을 환영합니다 😆
          </ModalMsg>
          <ModalMsg>아직 한 단계가 남아있어요 !</ModalMsg>
          <ModalMsg>
            가입하신 이메일을 인증한 후 <AccentWord>WEPO</AccentWord> 를 마음껏 이용해 주세요
          </ModalMsg>
        </ModalMsgBox>
        <ModalCloseButton
          onClick={() => {
            setSendEmail(false);
            navigator("/login", { replace: true });
          }}
        >
          로그인 페이지로 이동하기
        </ModalCloseButton>
      </Modal>
    </Wrapper>
  );
}

export default SendMailAlert;
