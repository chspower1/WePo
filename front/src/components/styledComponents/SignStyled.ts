import styled from "styled-components";
import { Spam2 } from "@styled-icons/remix-line/Spam2";
export const Root = styled.div`
    width: 100%;
    height: 100vh;
    padding: 70px 0 0;
    background: #eff3ff;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 80px 0 50px;
`;

export const FromContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 570px;
    width: 100%;
    height: 560px;
    padding: 70px 80px;
    margin: auto;
    border-radius: 15px;
    background: rgba(162, 190, 231, 0.1);
    box-shadow: 10px 10px 15px rgba(162, 190, 231, 0.25);
`;

export const TitleBox = styled.div`
    width: 100%;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
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
    border: 1px solid rgba(161, 161, 161, 0.1);
    font-size: 15px;
    padding: 0 20px;
    margin-bottom: 10px;
    box-shadow: 5px 4px 5px rgba(166, 184, 210, 0.3);
    &::placeholder {
        font-size: 12px;
    }
    &[type="password"] {
        font-family: sans-serif;
        letter-spacing: 1px;
        color: #3687ff;
        &::placeholder {
            font-family: "Elice";
        }
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
    color: ${(props) => props.theme.bgColor};
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(90, 156, 255, 0.4);
    &:disabled {
        background: #8a929e;
        box-shadow: 10px 10px 15px rgba(138, 146, 158, 0.4);
        cursor: not-allowed;
    }
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
`;

export const RegisterFromContainer = styled(FromContainer)`
    padding: 60px 80px;
    height: 700px;
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
