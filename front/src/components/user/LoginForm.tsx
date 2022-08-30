import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "@api/api";
import { isLoginState, IUser } from "../../atoms";
import { curUserState } from "@/atoms";
import * as LoginStyled from "@styledComponents/SignStyled";
import { Spam2 } from "@styled-icons/remix-line/Spam2";
import { EyeOffOutline, EyeOutline } from "styled-icons/evaicons-outline";
import SendMailAlert from "@components/modal/sendMailAlert";
import { useCookies } from "react-cookie";
import { checkedBoxValue } from "./../../atoms";
import { Google } from "@styled-icons/boxicons-logos/Google";
export interface ILogin {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [viewPassword, setViewPassword] = useState(false);
    const [isEmailRemember, setIsEmailRemember] = useState(false);
    // const [isPasswordRemember, setIsPasswordRemember] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies(["rememberEmail", "rememberPassword"]);
    const [curUser, setCurUser] = useRecoilState(curUserState);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ILogin>({
        mode: "onChange",
        defaultValues: {
            email: `${cookies.rememberEmail}`,
        },
    });

    const isLogin = useRecoilValue(isLoginState);
    const navigator = useNavigate();
    const [checkedErr, setCheckedErr] = useState(1);

    const onvalid = async (formData: ILogin) => {
        try {
            const newUser = await UserLogin({ ...formData });
            if (checkedErr >= 5) {
                return alert("비밀번호를 5번 이상 틀리셨습니다. 집가서 발 닦고 잠이나 자십시오.");
            }
            if (newUser === undefined) {
                setCheckedErr((prev) => prev + 1);
                if (checkedErr === 3) {
                    return alert(
                        `비밀번호가 일치하지 않습니다. 다시 확인해 주세요.(${checkedErr}회)\n5번 이상 틀리시면 비밀번호가 초기화 됩니다...\n정확히 써주세요..ㅜㅜ`
                    );
                } else if (checkedErr === 4) {
                    return alert(
                        `비밀번호가 일치하지 않습니다. 다시 확인해 주세요.(${checkedErr}회)\n5번 이상 틀리시면 비밀번호가 초기화 됩니다...\n마지막 기회에요! 기억해서 입력해주세요!!!`
                    );
                }
                alert(`비밀번호가 일치하지 않습니다. 다시 확인해 주세요.(${checkedErr}회)`);
            } else {
                await setCurUser(newUser!);
            }
        } catch (err) {
            alert("일치하지 않습니다!");
        }
    };

    //첫 랜더시
    useEffect(() => {
        if (cookies.rememberEmail !== undefined) {
            console.log(cookies.rememberEmail);
            setIsEmailRemember(true);
        }
        if (cookies.rememberEmail === "") {
            setError("email", {
                type: "costom",
                message: "이메일을 입력해 주세요",
            });
            setIsEmailRemember(false);
        }
        if (!cookies.rememberPassword) {
            setCookies("rememberEmail", "");
        }
        setError("password", {
            type: "custom",
            message: "비밀번호를 입력해 주세요",
        });
    }, []);

    //로그인상황이 바뀔시
    useEffect(() => {
        if (isLogin) {
            if (isEmailRemember) {
                setCookies("rememberEmail", curUser?.email!, { maxAge: 3600 });
            } else {
                setCookies("rememberEmail", "");
            }
            navigator("/mypage", { replace: true });
        }
    }, [isLogin]);

    function handleViewButton(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setViewPassword((prev) => !prev);
    }

    //자동로그인 & 아이디 저장 OnClick시
    function onChangeAtuoLogin(e: React.FormEvent<HTMLInputElement>) {
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.checked);
        setIsEmailRemember(e.currentTarget.checked);
        if (e.currentTarget.checked === false) setCookies("rememberEmail", "");

        // if (e.currentTarget.name === "autoLogin") {
        //     setIsEmailRemember(e.currentTarget.checked);
        //     setIsPasswordRemember(e.currentTarget.checked);
        // }
        // setIsPasswordRemember(false);
    }
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
                                    className="password"
                                    placeholder="비밀번호를 입력하세요"
                                    {...register("password", {
                                        required: "비밀번호를 입력해 주세요",
                                        minLength: {
                                            value: 4,
                                            message: "비밀번호는 4글자 이상입니다!",
                                        },
                                    })}
                                />
                                <LoginStyled.ViewButton
                                    tabIndex={-1}
                                    onMouseDown={handleViewButton}
                                >
                                    {viewPassword ? (
                                        <EyeOutline color="#3687FF" />
                                    ) : (
                                        <EyeOffOutline color="#3687FF" />
                                    )}
                                </LoginStyled.ViewButton>
                            </LoginStyled.InputInnerBox>
                            {errors.password && (
                                <LoginStyled.ErrMsg>
                                    <LoginStyled.DangerIcon />
                                    {errors.password.message}
                                </LoginStyled.ErrMsg>
                            )}
                        </LoginStyled.InputBox>
                        <div>
                            아이디 저장하기
                            <input
                                type="checkbox"
                                name="rememberId"
                                checked={isEmailRemember}
                                onClick={onChangeAtuoLogin}
                            />
                        </div>
                        {/* <div>
                            자동 로그인
                            <input type="checkbox" name="autoLogin" onClick={onChangeAtuoLogin} />
                        </div> */}
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
