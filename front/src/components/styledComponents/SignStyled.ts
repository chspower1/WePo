import styled, { keyframes } from "styled-components";
import { Spam2 } from "@styled-icons/remix-line/Spam2";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";

const fadeInUp = keyframes`
0% {
    opacity: 0;
    transform: translate(0, 25px);
}
100% {
    opacity: 1;
    transform: translate(0, 0);
}
`;

export const Root = styled.div`
    width: 100%;
    transition: background 0.5s ease;
    background: ${(props) => props.theme.bgColor};
`;

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    padding: 50px 0 0;
    background: url(${process.env.PUBLIC_URL + "/assets/image/waveBg2.png"}) no-repeat left 50% bottom -80px/contain;
    &.register:before {
        content: '';
        position: absolute;
        z-index:1;
        bottom: 80px;
        left: 8%;
        width: 420px;
        height: 420px;
        opacity:${(props) => props.theme.imgOpacity};
        background: url(${process.env.PUBLIC_URL + "/assets/image/loginConceptImg1.png"}) no-repeat 50% 50%/contain;
    }
    &.login:after {
        content: '';
        position: absolute;
        z-index:1;
        bottom: 80px;
        right: 8%;
        width: 420px;
        height: 420px;
        opacity:${(props) => props.theme.imgOpacity};
        background: url(${process.env.PUBLIC_URL + "/assets/image/loginConceptImg2.png"}) no-repeat 50% 50%/contain;
    }

    @media screen and (max-width: 500px) {
        &.login:after {
            display: none;
        }

        &.register:before {
            display: none;
        }
    }
`;


export const FromContainer = styled.div`
    position:relative;
    z-index: 30;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 570px;
    width: 100%;
    height: 560px;
    padding: 70px 80px;
    margin: 80px auto;
    border-radius: 15px;
    background: ${(props) => props.theme.opacityBgColor};
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowGrayColor};
    backdrop-filter: blur(8px);
    opacity: 0;
    animation: ${fadeInUp} .6s .3s forwards;

    @media screen and (max-width: 500px) {
        width: 85%;
        height: 460px;
        padding: 35px 30px;
        margin: 150px auto 0;
    }
`;

export const TitleBox = styled.div`
    width: 100%;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
    padding-bottom:50px;

    @media screen and (max-width: 500px) {
        font-size: 22px;
        text-align: center;
    }
`;

export const InputBox = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 7px;
    outline: 0;
    border: 1px solid ${(props) => props.theme.opacityBgColor};
    font-size: 15px;
    padding: 0 20px;
    margin-bottom: 10px;
    box-shadow: 5px 4px 5px ${(props) => props.theme.boxShadowGrayColor};
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.inputBgColor};
    &::placeholder {
        font-size: 14px;
        color: #c9c9c9;
        // color: ${(props) => props.theme.textColor};
        font-family: "Elice";
    }
    &.password {
        font-family: sans-serif;
        letter-spacing: 1px;
    }
    &.password[type="password"] {
        color: #3687ff;
    }
    &.password[type="text"] {
        color: ${(props) => props.theme.textColor};
    }
`;

export const ErrMsg = styled.p`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #aabce0;
`;

export const DangerIcon = styled(Spam2)`
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 3px 0 6px;
    margin-top:2px;
`;

export const SubmitButtonBox = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 40px;
`;
export const SubmitButton = styled.button`
    width: 100%;
    height: 50px;
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border-radius: 10px;
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowBlueColor};
    font-size: 16px;

    &:disabled {
        background: #8a929e;
        box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowGrayColor};
        cursor: not-allowed;
    }
`;
export const SosialButton = styled(SubmitButton)`
    width: 50px;
    height: 50px;
    border-radius: 30px;
`;

export const RegisterButton = styled.button`
    font-size: 16px;
    text-decoration: underline;
    color: ${(props) => props.theme.btnColor};
`;

export const RegisterCommentBox = styled.div`
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 200%);

    @media screen and (max-width: 500px) {
        width: 100%;
    }
`;

export const RegisterFromContainer = styled(FromContainer)`
    padding: 60px 80px;
    height: auto;
    margin: auto;

    @media screen and (max-width: 500px) {
        height: auto;
        padding: 35px 30px;
        margin: 150px auto 0;

        & > div > h2 {
            margin-bottom: 40px;
        }
    }
`;

export const RegisterWrapper = styled(Wrapper)`
    padding: 80px 0 50px;
`;

export const SuccessMsg = styled.p`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.successColor};
    margin: 0 0 0 5px;
`;
export const CheckImoge = styled(CheckCircle)`
    width:11px;
    height:11px;
    margin: 0 3px 0 3px;
    color: ${(props) => props.theme.successColor};
    margin-top:2px;
`;

export const InputInnerBox = styled.div`
    position: relative;
`;

export const ViewButton = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-70%);
`;
export const FiledBox = styled.div`
    margin-bottom:10px;
    padding-top: 20px;
`;
export const FiledSelectBox = styled.div`
    display: flex;
    justify-content: space-around;    

    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`;
export const FiledTit = styled.h2`
    width: 100%;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
`;
export const FiledInputBox = styled.div`
    margin: 0;

    @media screen and (max-width: 500px) {
        margin: 8px 5px;
    }
`;
export const FiledInput = styled.input``;
export const FiledLabel = styled.label`
    color: ${(props) => props.theme.textColor};
    user-select: none;
`;
export const RememberIdLabel = styled.label`
    color: ${(props) => props.theme.textColor};
`;