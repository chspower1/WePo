import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
export interface IRegister {
    email: string;
    name: string;
    password: string;
    checkPassword: string;
}
export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IRegister>({ mode: "onChange" });

    const onvalid = (data: IRegister) => {
        console.log(data);
    };
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
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="text"
                    placeholder="이름"
                    {...register("name", {
                        required: "이름을 입력해 주세요",
                        minLength: {
                            value: 2,
                            message: "2글자 이상 입력해주세요!",
                        },
                    })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <input
                    type="password"
                    {...register("password", {
                        required: "비밀번호를 입력해 주세요",
                        minLength: {
                            value: 4,
                            message: "비밀번호는 4글자 이상입니다!",
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
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
                {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
                <button>회원가입</button>
            </form>
        </>
    );
}
