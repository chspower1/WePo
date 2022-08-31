import styled from "styled-components";
import { Spam2 } from "@styled-icons/remix-line/Spam2";
export const Root = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 70px 0 0;
    transition: background 0.5s ease;
    background: ${(props) => props.theme.bgColor};
`;

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    padding: 50px 0;
`;

export const FromContainer = styled.div`
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
`;

export const TitleBox = styled.div`
    width: 100%;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
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
        font-size: 12px;
        color: ${(props) => props.theme.textColor};
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
    color: #eb7474;
`;

export const DangerIcon = styled(Spam2)`
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 3px 0 6px;
`;

export const SubmitButtonBox = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 40px;
`;
export const SubmitButton = styled.button`
    width: 50%;
    height: 50px;
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    border-radius: 10px;
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowBlueColor};

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
    text-decoration: underline;
    color: ${(props) => props.theme.btnColor};
`;

export const RegisterCommentBox = styled.div`
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
`;

export const RegisterFromContainer = styled(FromContainer)`
    padding: 60px 80px;
    height: 750px;
    margin: auto;
`;

export const RegisterWrapper = styled(Wrapper)`
    padding: 30px 0 50px;
`;

export const SuccessMsg = styled.p`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #198754;
    margin: 0 0 0 5px;
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
export const FiledBox = styled.div``;
export const FiledSelectBox = styled.div`
    display: flex;
    justify-content: space-around;
`;
export const FiledTit = styled.h2`
    width: 100%;
    margin-bottom: 20px;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
`;
export const FiledInputBox = styled.div``;
export const FiledInput = styled.input``;
export const FiledLabel = styled.label`
    color: ${(props) => props.theme.textColor};
    user-select: none;
`;
