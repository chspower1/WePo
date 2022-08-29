import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "@api/api";
import { isLoginState, IUser } from "../../atoms";
import { curUserState } from "@/atoms";
import * as LoginStyled from "@styledComponents/SignStyled";
import { Spam2 } from "@styled-icons/remix-line/Spam2";
import { EyeOffOutline,EyeOutline } from "styled-icons/evaicons-outline";
export interface ILogin {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [viewPassword,setViewPassword] = useState(false);
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
        }
    };
    console.log(isLogin);
    useEffect(() => {
        if (isLogin) {
            navigator("/mypage", { replace: true });
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
        <LoginStyled.Root>
            <LoginStyled.Wrapper>
                <LoginStyled.FromContainer>
                    <LoginStyled.TitleBox>
                        <LoginStyled.Title>로그인</LoginStyled.Title>
                    </LoginStyled.TitleBox>
                    <form onSubmit={handleSubmit(onvalid)}>
                        <LoginStyled.InputBox>
                            <LoginStyled.Input
                                type="text"
                                placeholder="이메일을 입력하세요"
                                {...register("email", {
                                    required: "이메일을 입력해 주세요",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "이메일 형식에 맞지 않습니다!",
                                    },
                                })}
                            />
                            {errors.email && (
                                <LoginStyled.ErrMsg>
                                    <LoginStyled.DangerIcon />
                                    {errors.email.message}
                                </LoginStyled.ErrMsg>
                            )}
                        </LoginStyled.InputBox>
                        <LoginStyled.InputBox>
                            <LoginStyled.InputInnerBox>
                                <LoginStyled.Input
                                    type={viewPassword ? "text" : "password"}
                                    placeholder="비밀번호를 입력하세요"
                                    {...register("password", {
                                        required: "비밀번호를 입력해 주세요",
                                        minLength: {
                                            value: 4,
                                            message: "비밀번호는 4글자 이상입니다!",
                                        },
                                    })}
                                />
                                <LoginStyled.ViewButton onClick={(e)=> {e.preventDefault();setViewPassword(prev => !prev);}}>{viewPassword ? <EyeOutline color="#3687FF"/> : <EyeOffOutline color="#3687FF"/>}</LoginStyled.ViewButton>
                            </LoginStyled.InputInnerBox>
                            {errors.password && (
                                    <LoginStyled.ErrMsg>
                                        <LoginStyled.DangerIcon />
                                        {errors.password.message}
                                    </LoginStyled.ErrMsg>
                            )}
                        </LoginStyled.InputBox>
                        <LoginStyled.SubmitButtonBox>
                            <LoginStyled.SubmitButton>로그인</LoginStyled.SubmitButton>
                        </LoginStyled.SubmitButtonBox>
                        <LoginStyled.RegisterCommentBox>
                            아직 회원이 아니신가요?
                            <Link to="/register">
                                <LoginStyled.RegisterButton>회원가입</LoginStyled.RegisterButton>
                            </Link>
                        </LoginStyled.RegisterCommentBox>
                    </form>
                </LoginStyled.FromContainer>
            </LoginStyled.Wrapper>
        </LoginStyled.Root>
    );
}