import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { createtUser } from "../../api/api";
import { usersState } from "../../atoms";
import { IUser } from "./../../atoms";
import { useQuery } from "react-query";
export interface IRegister {
    email: string;
    name: string;
    password: string;
    checkPassword?: string;
}
export default function RegisterForm() {
    const [users, setUsers] = useRecoilState(usersState);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm<IRegister>({ mode: "onChange" });

    const onvalid = (data: IRegister) => {
        (async () => {
            const newUser = await createtUser(data as IUser);
            await setUsers((prev) => {
                const newUsers = [...prev];
                newUsers.push(newUser!);
                return newUsers;
            });
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
        <>
            <form onSubmit={handleSubmit(onvalid)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                        required: "이메일을 입력해 주세요",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "이메일 형식에 맞지 않습니다!",
                        },
                    })}
                />
                {errors.email ? <p>{errors.email.message}</p> : <p>적합한 Email이에요✔️</p>}
                <input
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
                {errors.name ? <p>{errors.name.message}</p> : <p>멋진 이름이에요✔️</p>}
                <input
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
                {errors.password ? <p>{errors.password.message}</p> : <p>적합한 비밀번호에요✔️</p>}
                <input
                    type="password"
                    placeholder="Check your Password"
                    {...register("checkPassword", {
                        required: "비밀번호를 한번 더 입력해 주세요",
                        validate: {
                            mathchesPreviousPassword: (value) => {
                                const { password } = getValues();
                                return password === value || "비밀번호가 일치하지 않습니다.";
                            },
                        },
                    })}
                />
                {errors.checkPassword ? (
                    <p>{errors.checkPassword.message}</p>
                ) : (
                    <p>비밀번호가 일치해요✔️</p>
                )}
                {valid && <button>작성완료</button>}
            </form>
        </>
    );
}
