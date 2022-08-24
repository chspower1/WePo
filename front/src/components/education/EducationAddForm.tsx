import { EduStatus, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import { addEducation } from "../../api/api";
import { Status } from "styled-icons/fluentui-system-filled";

export default function EducationAddForm({ setEducations, setAddFormActive, id }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IEducation>({ mode: "onChange" });

    const onvalid = (data: IEducation) => {
        setEducations((prev: any) => [...prev, data]);
        setAddFormActive(false);
        addEducation(data, id);
        reset(); // 추가 시 inputValue 초기화
    };
    return (
        <div className="formWrap">
            <form onSubmit={handleSubmit(onvalid)}>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="학교 이름"
                        defaultValue={""}
                        {...register("school", {
                            required: "학교 이름을 입력하세요!",
                            minLength: { value: 1, message: "학교 이름을 입력하세요!" },
                        })}
                    />
                    {errors.school && <p>{errors.school.message}</p>}
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="전공"
                        defaultValue={""}
                        {...register("major", {
                            required: "자신의 전공을 입력하세요!",
                            minLength: { value: 1, message: "자신의 전공을 입력하세요!" },
                        })}
                    />
                    {errors.major && <p>{errors.major.message}</p>}
                </div>
                <div className="radioBox">
                    <input
                        type="radio"
                        {...register("status", { required: "필수 입력 입니다." })}
                        name="status"
                        id="attending"
                        value={EduStatus.attending}
                    />
                    <label htmlFor="attending">{EduStatus.attending}</label>
                    <input
                        type="radio"
                        {...register("status", { required: "필수 입력 입니다." })}
                        name="status"
                        id="bachelor"
                        value={EduStatus.bachelor}
                    />
                    <label htmlFor="bachelor">{EduStatus.bachelor}</label>
                    <input
                        type="radio"
                        {...register("status", { required: "필수 입력 입니다." })}
                        name="status"
                        id="master"
                        value={EduStatus.master}
                    />
                    <label htmlFor="master">{EduStatus.master}</label>
                    <input
                        type="radio"
                        {...register("status", { required: "필수 입력 입니다." })}
                        name="status"
                        id="doctor"
                        value={EduStatus.doctor}
                    />
                    <label htmlFor="doctor">{EduStatus.doctor}</label>
                    {errors.status && <p>{errors.status.message}</p>}
                </div>
                <button>추가</button>
                <button
                    onClick={() => {
                        setAddFormActive(false);
                        reset({
                            school: "",
                            major: "",
                            status: EduStatus.attending,
                        });
                    }}
                >
                    취소
                </button>
            </form>
        </div>
    );
}
