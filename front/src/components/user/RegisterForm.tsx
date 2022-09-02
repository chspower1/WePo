import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createtUser } from "@api/api";
import { usersState } from "@/atoms";
import * as RegisterStyled from "@styledComponents/SignStyled";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeOffOutline, EyeOutline } from "styled-icons/evaicons-outline";
import SendMailAlert from "@components/modal/sendMailAlert";
import { LoadingBox, LoadingIcon } from "./Network";

export interface IRegister {
    email: string;
    name: string;
    password: string;
    checkPassword?: string;
    field: string[] | false;
}

export default function RegisterForm() {
    const location = useLocation();
    const pathName = location.pathname;
    const [users, setUsers] = useRecoilState(usersState);
    const [viewCheckPassword, setViewCheckPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const newField = data.field === false ? [] : data.field;
            const newUser = await createtUser({ ...data, field: newField });
            if (newUser === undefined) {
                setSendEmail(false);
                setLoading(false);
                setError("email", {
                    type: "custom",
                    message: "이미 사용중인 이메일입니다!",
                });
            } else {
                await setUsers((prev) => {
                    const newUsers = [...prev];
                    newUsers.push(newUser!);
                    return newUsers;
                });
                setSendEmail(true);
            }
        })();
    };

    const valid =
        !errors.email && !errors.checkPassword && !errors.name && !errors.password && !errors.field;
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
    function handleViewButton(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setViewPassword((prev) => !prev);
    }
    function handleViewCheckButton(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setViewCheckPassword((prev) => !prev);
    }
    return (
        <RegisterStyled.Root>
            {sendEmail && <SendMailAlert setSendEmail={setSendEmail}></SendMailAlert>}
            <RegisterStyled.RegisterWrapper className={pathName === "/register" ? "register" : ""}>
                <RegisterStyled.RegisterFromContainer>
                    {loading ? (
                        <LoadingBox>
                            <LoadingIcon>Loding...</LoadingIcon>
                        </LoadingBox>
                    ) : (
                        <>
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
                                            <RegisterStyled.CheckImoge />
                                            적합한 Email이에요
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
                                            <RegisterStyled.CheckImoge />
                                            멋진 이름이에요
                                        </RegisterStyled.SuccessMsg>
                                    )}
                                </RegisterStyled.InputBox>
                                <RegisterStyled.InputBox>
                                    <RegisterStyled.InputInnerBox>
                                        <RegisterStyled.Input
                                            type={viewPassword ? "text" : "password"}
                                            className="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: "비밀번호를 입력해 주세요",
                                                minLength: {
                                                    value: 4,
                                                    message: "비밀번호는 4글자 이상입니다!",
                                                },
                                            })}
                                        />
                                        <RegisterStyled.ViewButton
                                            tabIndex={-1}
                                            onMouseDown={handleViewButton}
                                        >
                                            {viewPassword ? (
                                                <EyeOutline color="#3687FF" />
                                            ) : (
                                                <EyeOffOutline color="#3687FF" />
                                            )}
                                        </RegisterStyled.ViewButton>
                                    </RegisterStyled.InputInnerBox>
                                    {errors.password ? (
                                        <RegisterStyled.ErrMsg>
                                            <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                            {errors.password.message}
                                        </RegisterStyled.ErrMsg>
                                    ) : (
                                        <RegisterStyled.SuccessMsg>
                                            <RegisterStyled.CheckImoge />
                                            적합한 비밀번호에요
                                        </RegisterStyled.SuccessMsg>
                                    )}
                                </RegisterStyled.InputBox>
                                <RegisterStyled.InputBox>
                                    <RegisterStyled.InputInnerBox>
                                        <RegisterStyled.Input
                                            type={viewCheckPassword ? "text" : "password"}
                                            className="password"
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
                                        <RegisterStyled.ViewButton
                                            tabIndex={-1}
                                            onMouseDown={handleViewCheckButton}
                                        >
                                            {viewCheckPassword ? (
                                                <EyeOutline color="#3687FF" />
                                            ) : (
                                                <EyeOffOutline color="#3687FF" />
                                            )}
                                        </RegisterStyled.ViewButton>
                                    </RegisterStyled.InputInnerBox>
                                    {errors.checkPassword ? (
                                        <RegisterStyled.ErrMsg>
                                            <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>
                                            {errors.checkPassword.message}
                                        </RegisterStyled.ErrMsg>
                                    ) : (
                                        <RegisterStyled.SuccessMsg>
                                            <RegisterStyled.CheckImoge />
                                            비밀번호가 일치해요
                                        </RegisterStyled.SuccessMsg>
                                    )}
                                </RegisterStyled.InputBox>
                                <RegisterStyled.FiledBox>
                                    <RegisterStyled.FiledTit>선호분야</RegisterStyled.FiledTit>
                                    <RegisterStyled.FiledSelectBox>
                                        <RegisterStyled.FiledInputBox>
                                            <RegisterStyled.FiledInput
                                                type="checkbox"
                                                id="frontEnd"
                                                value="프론트엔드"
                                                {...register("field")}
                                            />
                                            <RegisterStyled.FiledLabel htmlFor="frontEnd">
                                                프론트엔드
                                            </RegisterStyled.FiledLabel>
                                        </RegisterStyled.FiledInputBox>
                                        <RegisterStyled.FiledInputBox>
                                            <RegisterStyled.FiledInput
                                                type="checkbox"
                                                id="backEnd"
                                                value="백엔드"
                                                {...register("field")}
                                            />
                                            <RegisterStyled.FiledLabel htmlFor="backEnd">
                                                백엔드
                                            </RegisterStyled.FiledLabel>
                                        </RegisterStyled.FiledInputBox>
                                        <RegisterStyled.FiledInputBox>
                                            <RegisterStyled.FiledInput
                                                type="checkbox"
                                                id="dataAnalysis"
                                                value="데이터분석"
                                                {...register("field")}
                                            />
                                            <RegisterStyled.FiledLabel htmlFor="dataAnalysis">
                                                데이터분석
                                            </RegisterStyled.FiledLabel>
                                        </RegisterStyled.FiledInputBox>
                                        <RegisterStyled.FiledInputBox>
                                            <RegisterStyled.FiledInput
                                                type="checkbox"
                                                id="AI"
                                                value="인공지능"
                                                {...register("field")}
                                            />
                                            <RegisterStyled.FiledLabel htmlFor="AI">
                                                인공지능
                                            </RegisterStyled.FiledLabel>
                                        </RegisterStyled.FiledInputBox>
                                    </RegisterStyled.FiledSelectBox>
                                </RegisterStyled.FiledBox>
                                {errors.field && (
                                    <RegisterStyled.ErrMsg>
                                        <RegisterStyled.DangerIcon></RegisterStyled.DangerIcon>{" "}
                                        {errors.field.message}
                                    </RegisterStyled.ErrMsg>
                                )}
                                <RegisterStyled.SubmitButtonBox>
                                    <RegisterStyled.SubmitButton disabled={!valid}>
                                        작성완료
                                    </RegisterStyled.SubmitButton>
                                </RegisterStyled.SubmitButtonBox>
                            </form>
                        </>
                    )}
                </RegisterStyled.RegisterFromContainer>
            </RegisterStyled.RegisterWrapper>
        </RegisterStyled.Root>
    );
}
