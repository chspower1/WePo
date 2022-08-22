import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { lightTheme } from "./../theme";
import { Btn } from "./../index";

const LoginBtn = styled(Btn)``;

interface ILogIn {
    id: string;
    pw: string;
}
export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILogIn>({ mode: "onChange" });
    const onvalid = (data: ILogIn) => {
        console.log(data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onvalid)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("id", {
                        required: "이메일을 입력해 주세요",
                        maxLength: {
                            value: 10,
                            message: "최댓값은 10입니다",
                        },
                        minLength: {
                            value: 3,
                            message: "최솟값은 3입니다",
                        },
                    })}
                />
                {errors.id && <p>{errors.id.message}</p>}
                <input
                    type="password"
                    {...register("pw", {
                        required: "비밀번호를 입력해 주세요",
                    })}
                />
                {errors.pw && <p>{errors.pw.message}</p>}
                <button>클릭</button>
            </form>
        </>
    );
}
