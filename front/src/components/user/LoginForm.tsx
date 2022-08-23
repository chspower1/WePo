import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
export interface ILogin {
    email: string;
    password: string;
}
export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({ mode: "onChange" });
    const onvalid = (data: ILogin) => {
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
                <button>로그인</button>
            </form>
        </>
    );
}
