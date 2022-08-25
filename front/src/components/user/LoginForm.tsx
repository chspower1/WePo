import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../api/api";
import { isLoginState, IUser } from "../../atoms";
import { curUserState } from "./../../atoms";

import { Spam2 } from "@styled-icons/remix-line/Spam2";

export interface ILogin {
    email: string;
    password: string;
}

export const ButtonReset = styled.button`
    cursor: pointer;
    border: 0;
    background: transparent;
`
export const Wrapper = styled.div`
    width:100%;
    padding: 80px 0 50px;
`


export const FromContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width:570px;
    width:100%;
    height: 560px;
    padding : 70px 80px;
    margin: 0 auto;
    border-radius: 15px;
    background: rgba(162, 190, 231, 0.1);
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
    background: ${(props)=> props.theme.btnColor};
    color: ${(props)=> props.theme.bgColor};
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(90, 156, 255, 0.4);
    &:disabled {
        background: #8a929e;
        box-shadow:  10px 10px 15px rgba(138, 146, 158, 0.4);
        cursor:not-allowed;
    }
`;

export const RegisterButton = styled.button`
    text-decoration: underline;
    color: ${(props)=> props.theme.btnColor};
`


export const RegisterCommentBox = styled.div`
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
`;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ILogin>({ mode: "onChange", defaultValues: { email: "", password: "" } });

    const isLogin = useRecoilValue(isLoginState);
    const navigator = useNavigate();
    const setCurUser = useSetRecoilState(curUserState);
    const onvalid = async (formData: ILogin) => {
        try {
            const newUser = await UserLogin({ ...formData });
            await setCurUser(newUser!);
        } catch (err) {
            alert("일치하지 않습니다!");
            console.log(err);
        }
    };

    useEffect(() => {
        if (isLogin) {
            navigator("/", { replace: true });
        }
        setError("email", {
            type: "costom",
            message: "이메일을 입력해 주세요",
        });
        setError("password", {
            type: "custom",
            message: "비밀번호를 입력해 주세요",
        });
    }, [isLogin]);

    return (
        <Wrapper>
            <FromContainer>
                <TitleBox>
                    <Title>로그인</Title>
                </TitleBox>
                <form onSubmit={handleSubmit(onvalid)}>
                    <InputBox>
                        <Input
                            type="text"
                            placeholder="이메일을 입력하세요"
                            {...register("email", {
                                required: "이메일을 입력해 주세요",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "이메일 형식에 맞지 않습니다!",
                                },
                            })}
                        />
                        {errors.email && <ErrMsg><DangerIcon/>{errors.email.message}</ErrMsg>}
                    </InputBox>
                    <InputBox>
                        <Input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            {...register("password", {
                                required: "비밀번호를 입력해 주세요",
                                minLength: {
                                    value: 4,
                                    message: "비밀번호는 4글자 이상입니다!",
                                },
                            })}
                        />
                        {errors.password && <ErrMsg><DangerIcon/>{errors.password.message}</ErrMsg>}
                    </InputBox>
                    <SubmitButtonBox><SubmitButton>로그인</SubmitButton></SubmitButtonBox>
                    <RegisterCommentBox>
                    아직 회원이 아니신가요? 
                    <Link to="/register">
                        <RegisterButton>회원가입</RegisterButton>
                    </Link>
                    </RegisterCommentBox>
                </form>
            </FromContainer>
        </Wrapper>
    );
}
