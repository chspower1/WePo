import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { createtUser } from "@api/api";
import { usersState } from "@scr/atoms";
import { IUser } from "@scr/atoms";
import { useQuery } from "react-query";
import {
    Wrapper,
    DangerIcon,
    ErrMsg,
    FromContainer,
    Input,
    InputBox,
    SubmitButton,
    SubmitButtonBox,
    Title,
    TitleBox,
} from "./LoginForm";
import { useNavigate } from "react-router-dom";
export interface IRegister {
    email: string;
    name: string;
    password: string;
    checkPassword?: string;
}

const Root = styled.div`
    width: 100%;
    height: 100vh;
    padding: 70px 0 0;
    background: #eff3ff;
`;

const RegisterFromContainer = styled(FromContainer)`
    padding: 60px 80px;
    height: 700px;
    margin: auto;
`;

const RegisterWrapper = styled(Wrapper)`
    padding: 30px 0 50px;
`;

const SuccessMsg = styled.p`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #198754;
    margin: 0 0 0 5px;
`;

export default function RegisterForm() {
    const [users, setUsers] = useRecoilState(usersState);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm<IRegister>({ mode: "onChange" });
    const navigator = useNavigate();
    const onvalid = (data: IRegister) => {
        (async () => {
            const newUser = await createtUser(data as IUser);
            await setUsers((prev) => {
                const newUsers = [...prev];
                newUsers.push(newUser!);
                return newUsers;
            });
            navigator("/", { replace: true });
        })();
    };
    const valid = !errors.email && !errors.checkPassword && !errors.name && !errors.password;
    useEffect(() => {
        setError("email", {
            type: "costom",
            message: "이메일을 형식에 맞게 입력해주세요!",
        });
        setError("name", {
            type: "costom",
            message: "이름은 2글자 이상으로 입력해주세요 :-)",
        });
        setError("password", {
            type: "custom",
            message: "비밀번호는 4글자 이상으로!",
        });
        setError("checkPassword", {
            type: "required",
            message: "비밀번호를 한번 더 입력해 주세요",
        });
    }, []);
    return (
        <Root>
            <RegisterWrapper>
                <RegisterFromContainer>
                    <TitleBox>
                        <Title>회원가입</Title>
                    </TitleBox>
                    <form onSubmit={handleSubmit(onvalid)}>
                        <InputBox>
                            <Input
                                type="text"
                                placeholder="Email"
                                {...register("email", {
                                    required: "이메일을 입력해 주세요",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "이메일 형식에 맞지 않습니다!",
                                    },
                                })}
                            />
                            {errors.email ? (
                                <ErrMsg>
                                    <DangerIcon></DangerIcon>
                                    {errors.email.message}
                                </ErrMsg>
                            ) : (
                                <SuccessMsg>✔️적합한 Email이에요</SuccessMsg>
                            )}
                        </InputBox>
                        <InputBox>
                            <Input
                                type="text"
                                placeholder="Name"
                                {...register("name", {
                                    required: "이름을 입력해 주세요",
                                    minLength: {
                                        value: 2,
                                        message: "2글자 이상 입력해주세요!",
                                    },
                                })}
                            />
                            {errors.name ? (
                                <ErrMsg>
                                    <DangerIcon></DangerIcon>
                                    {errors.name.message}
                                </ErrMsg>
                            ) : (
                                <SuccessMsg>✔️멋진 이름이에요</SuccessMsg>
                            )}
                        </InputBox>
                        <InputBox>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "비밀번호를 입력해 주세요",
                                    minLength: {
                                        value: 4,
                                        message: "비밀번호는 4글자 이상입니다!",
                                    },
                                })}
                            />
                            {errors.password ? (
                                <ErrMsg>
                                    <DangerIcon></DangerIcon>
                                    {errors.password.message}
                                </ErrMsg>
                            ) : (
                                <SuccessMsg>✔️적합한 비밀번호에요</SuccessMsg>
                            )}
                        </InputBox>
                        <InputBox>
                            <Input
                                type="password"
                                placeholder="Check your Password"
                                {...register("checkPassword", {
                                    required: "비밀번호를 한번 더 입력해 주세요",
                                    validate: {
                                        mathchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return (
                                                password === value ||
                                                "비밀번호가 일치하지 않습니다."
                                            );
                                        },
                                    },
                                })}
                            />
                            {errors.checkPassword ? (
                                <ErrMsg>
                                    <DangerIcon></DangerIcon>
                                    {errors.checkPassword.message}
                                </ErrMsg>
                            ) : (
                                <SuccessMsg>✔️비밀번호가 일치해요</SuccessMsg>
                            )}
                        </InputBox>
                        <SubmitButtonBox>
                            <SubmitButton disabled={!valid}>작성완료</SubmitButton>
                        </SubmitButtonBox>
                    </form>
                </RegisterFromContainer>
            </RegisterWrapper>
        </Root>
    );
}
