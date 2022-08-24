import { IEducation } from "../../atoms";
import { useForm } from "react-hook-form";

export default function EducationEditForm({ index, educations, setEducations, setIsEditing }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEducation>({ mode: "onChange" });
    const onvalid = (data: IEducation) => {
        const editData = [...educations];
        editData[index] = data;
        setEducations(editData);
        setIsEditing(false);
    };
    const current = educations[index];

    return (
        <div>
            <form onSubmit={handleSubmit(onvalid)}>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="학교 이름"
                        defaultValue={`${current.school}`}
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
                        defaultValue={`${current.major}`}
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
                        {...register("status")}
                        name="status"
                        id="attending"
                        value="재학중"
                        defaultChecked={current.status === "재학중"}
                    />
                    <label htmlFor="attending">재학중</label>
                    <input
                        type="radio"
                        {...register("status")}
                        name="status"
                        id="bachelor"
                        value="학사졸업"
                        defaultChecked={current.status === "학사졸업"}
                    />
                    <label htmlFor="bachelor">학사졸업</label>
                    <input
                        type="radio"
                        {...register("status")}
                        name="status"
                        id="master"
                        value="석사졸업"
                        defaultChecked={current.status === "석사졸업"}
                    />
                    <label htmlFor="master">석사졸업</label>
                    <input
                        type="radio"
                        {...register("status")}
                        name="status"
                        id="doctor"
                        value="박사졸업"
                        defaultChecked={current.status === "박사졸업"}
                    />
                    <label htmlFor="doctor">박사졸업</label>
                </div>
                <button>변경</button>
                <button
                    onClick={() => {
                        setIsEditing(false);
                    }}
                >
                    취소
                </button>
            </form>
        </div>
    );
}
