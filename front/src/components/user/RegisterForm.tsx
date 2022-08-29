import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { ReactEventHandler, useEffect,useState } from "react";
import { createtUser } from "@api/api";
import { usersState } from "@/atoms";
import { IUser } from "@/atoms";
import { useQuery } from "react-query";
import * as RegisterStyled from "@styledComponents/SignStyled";
import { useNavigate } from "react-router-dom";
import CheckFieldBox from "./CheckFieldBox";
import { EyeOffOutline,EyeOutline } from "styled-icons/evaicons-outline";
export interface IRegister {
    email: string;
    name: string;
    password: string;
    checkPassword?: string;
    field: string[];
}

export default function RegisterForm() {
    const [users, setUsers] = useRecoilState(usersState);
    const [viewCheckPassword,setViewCheckPassword] = useState(false);
    const [viewPassword,setViewPassword] = useState(false);
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
            const newUser = await createtUser(data);
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
    function handleViewButton(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setViewPassword(prev => !prev);
    }

    return (
        <RegisterStyled.Root>
            <RegisterStyled.RegisterWrapper>
                <RegisterStyled.RegisterFromContainer>
                    <RegisterStyled.TitleBox>
                        <RegisterStyled.Title>회원가입</RegisterStyled.Title>
                    </RegisterStyled.TitleBox>
                    <form onSubmit={handleSubmit(onvalid)}>
                        <RegisterStyled.InputBox>
                            <RegisterStyled.Input
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
                                <RegisterStyled.ErrMsg>
                                    <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                    {errors.email.message}
                                </RegisterStyled.ErrMsg>
                            ) : (
                                <RegisterStyled.SuccessMsg>
                                    ✔️적합한 Email이에요
                                </RegisterStyled.SuccessMsg>
                            )}
                        </RegisterStyled.InputBox>
                        <RegisterStyled.InputBox>
                            <RegisterStyled.Input
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
                                <RegisterStyled.ErrMsg>
                                    <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                    {errors.name.message}
                                </RegisterStyled.ErrMsg>
                            ) : (
                                <RegisterStyled.SuccessMsg>
                                    ✔️멋진 이름이에요
                                </RegisterStyled.SuccessMsg>
                            )}
                        </RegisterStyled.InputBox>
                        <RegisterStyled.InputBox>
                            <RegisterStyled.InputInnerBox>
                                <RegisterStyled.Input
                                    type={viewPassword ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "비밀번호를 입력해 주세요",
                                        minLength: {
                                            value: 4,
                                            message: "비밀번호는 4글자 이상입니다!",
                                        },
                                    })}
                                />
                                <RegisterStyled.ViewButton onClick={(e)=> {e.preventDefault();setViewPassword(prev => !prev);}}>{viewPassword ? <EyeOutline color="#3687FF"/> : <EyeOffOutline color="#3687FF"/>}</RegisterStyled.ViewButton>
                            </RegisterStyled.InputInnerBox>
                            {errors.password ? (
                                <RegisterStyled.ErrMsg>
                                    <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                    {errors.password.message}
                                </RegisterStyled.ErrMsg>
                            ) : (
                                <RegisterStyled.SuccessMsg>
                                    ✔️적합한 비밀번호에요
                                </RegisterStyled.SuccessMsg>
                            )}
                        </RegisterStyled.InputBox>
                        <RegisterStyled.InputBox>
                            <RegisterStyled.InputInnerBox>
                                <RegisterStyled.Input
                                    type={viewCheckPassword ? "text" : "password"}
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
                                <RegisterStyled.ViewButton onClick={(e)=> {e.preventDefault();setViewCheckPassword(prev => !prev);}}>{viewCheckPassword ? <EyeOutline color="#3687FF"/> : <EyeOffOutline color="#3687FF"/>}</RegisterStyled.ViewButton>
                            </RegisterStyled.InputInnerBox>
                            {errors.checkPassword ? (
                                <RegisterStyled.ErrMsg>
                                    <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                    {errors.checkPassword.message}
                                </RegisterStyled.ErrMsg>
                            ) : (
                                <RegisterStyled.SuccessMsg>
                                    ✔️비밀번호가 일치해요
                                </RegisterStyled.SuccessMsg>
                            )}
                        </RegisterStyled.InputBox>
                        <RegisterStyled.InputBox style={{display:"flex",justifyContent:"space-between"}}>
                            <h1>선호분야</h1>
                            <div>
                                <input type="checkbox" id="frontEnd" value="frontEnd"{...register("field")}></input>
                                <label  htmlFor="frontEnd">프론트엔드</label>
                            </div>
                            <div>
                                <input type="checkbox" id="backEnd" value="backEnd"{...register("field")}></input>
                                <label  htmlFor="backEnd">백엔드</label>
                            </div>
                            <div>
                                <input type="checkbox" id="dataAnalysis" value="dataAnalysis"{...register("field")}></input>
                                <label  htmlFor="dataAnalysis">데이터분석</label>
                            </div>
                            <div>
                                <input type="checkbox" id="AI" value="AI"{...register("field")}></input>
                                <label  htmlFor="AI">AI</label>
                            </div>
                        </RegisterStyled.InputBox>
                        <RegisterStyled.SubmitButtonBox>
                            <RegisterStyled.SubmitButton disabled={!valid}>
                                작성완료
                            </RegisterStyled.SubmitButton>
                        </RegisterStyled.SubmitButtonBox>
                    </form>
                </RegisterStyled.RegisterFromContainer>
            </RegisterStyled.RegisterWrapper>
        </RegisterStyled.Root>
    );
}
