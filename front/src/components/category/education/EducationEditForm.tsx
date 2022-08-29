import { EduStatus, IEducation } from "@/atoms";
import { useForm } from "react-hook-form";
import * as EducationStyled from "@styledComponents/CategoryStyled";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
import { Category, updateData } from "@api/api";
interface IEducationEditFormProps {
    index: number;
    educations: IEducation[];
    setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setTargetIndex: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
    userId: number;
    eduId: string;
}
export default function EducationEditForm({
    index,
    educations,
    setEducations,
    setIsEditing,
    setTargetIndex,
    userId,
    eduId,
}: IEducationEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEducation>({ mode: "onChange" });

    const onvalid = (data: IEducation) => {
        updateData(data, Category.education, userId, eduId);
        setEducations((prev) => {
            const newEducations = [...prev];
            newEducations[index] = { ...data, userId, eduId };
            return newEducations;
        });
        setIsEditing(false);
        setTargetIndex(null);
    };
    const current = educations[index];

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <EducationStyled.AddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel> 필수사항
                </p>
                <EducationStyled.ContentName>
                    학교 이름 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>
                </EducationStyled.ContentName>
                <EducationStyled.AddInput
                    type="text"
                    placeholder="학교 이름"
                    defaultValue={`${current.school}`}
                    {...register("school", {
                        required: "학교 이름을 입력하세요!",
                        minLength: {
                            value: 1,
                            message: "학교 이름을 입력하세요!",
                        },
                    })}
                />
                {errors.school && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.school.message}
                    </ErrMsg>
                )}
            </EducationStyled.AddInputBox>
            <EducationStyled.AddInputBox>
                <EducationStyled.ContentName>
                    전공 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>
                </EducationStyled.ContentName>
                <EducationStyled.AddInput
                    type="text"
                    placeholder="전공"
                    defaultValue={`${current.major}`}
                    {...register("major", {
                        required: "자신의 전공을 입력하세요!",
                        minLength: {
                            value: 1,
                            message: "자신의 전공을 입력하세요!",
                        },
                    })}
                ></EducationStyled.AddInput>
                {errors.major && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.major.message}
                    </ErrMsg>
                )}
            </EducationStyled.AddInputBox>
            <EducationStyled.AddInputBox>
                <div style={{ marginBottom: "30px" }}>
                    <EducationStyled.ContentName>
                        졸업여부 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>{" "}
                    </EducationStyled.ContentName>
                    <EducationStyled.MajorGraduate
                        value={EduStatus.attending}
                        id="attending"
                        defaultChecked={current.status === "재학중"}
                        {...register("status", { required: "필수 입력입니다." })}
                    />
                    <EducationStyled.MajorGraduateLabel htmlFor="attending">
                        {EduStatus.attending}
                    </EducationStyled.MajorGraduateLabel>
                    <EducationStyled.MajorGraduate
                        value={EduStatus.bachelor}
                        id="bachelor"
                        defaultChecked={current.status === "학사졸업"}
                        {...register("status", { required: "필수 입력입니다." })}
                    />
                    <EducationStyled.MajorGraduateLabel htmlFor="bachelor">
                        {EduStatus.bachelor}
                    </EducationStyled.MajorGraduateLabel>
                    <EducationStyled.MajorGraduate
                        value={EduStatus.master}
                        id="master"
                        defaultChecked={current.status === "석사졸업"}
                        {...register("status", { required: "필수 입력입니다." })}
                    />
                    <EducationStyled.MajorGraduateLabel htmlFor="master">
                        {EduStatus.master}
                    </EducationStyled.MajorGraduateLabel>
                    <EducationStyled.MajorGraduate
                        value={EduStatus.doctor}
                        id="doctor"
                        defaultChecked={current.status === "박사졸업"}
                        {...register("status", { required: "필수 입력입니다." })}
                    />
                    <EducationStyled.MajorGraduateLabel htmlFor="doctor">
                        {EduStatus.doctor}
                    </EducationStyled.MajorGraduateLabel>
                    <div style={{ marginTop: "10px" }}>
                        {errors.status && (
                            <ErrMsg>
                                <DangerIcon />
                                {errors.status.message}
                            </ErrMsg>
                        )}
                    </div>
                </div>
            </EducationStyled.AddInputBox>
            <div style={{ float: "right", marginBottom: "10px" }}>
                <EducationStyled.Button type="submit" color="#3687FF">
                    수정
                </EducationStyled.Button>
                <EducationStyled.Button
                    onClick={() => {
                        setIsEditing(false);
                        setTargetIndex(null);
                    }}
                >
                    취소
                </EducationStyled.Button>
            </div>
        </form>
        // <div>
        //     <form onSubmit={handleSubmit(onvalid)}>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="학교 이름"
        //                 defaultValue={`${current.school}`}
        //                 {...register("school", {
        //                     required: "학교 이름을 입력하세요!",
        //                     minLength: { value: 1, message: "학교 이름을 입력하세요!" },
        //                 })}
        //             />
        //             {errors.school && <p>{errors.school.message}</p>}
        //         </div>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="전공"
        //                 defaultValue={`${current.major}`}
        //                 {...register("major", {
        //                     required: "자신의 전공을 입력하세요!",
        //                     minLength: { value: 1, message: "자신의 전공을 입력하세요!" },
        //                 })}
        //             />
        //             {errors.major && <p>{errors.major.message}</p>}
        //         </div>
        //         <div className="radioBox">
        //             <input
        //                 type="radio"
        //                 {...register("status")}
        //                 name="status"
        //                 id="attending"
        //                 value="재학중"
        //                 defaultChecked={current.status === "재학중"}
        //             />
        //             <label htmlFor="attending">재학중</label>
        //             <input
        //                 type="radio"
        //                 {...register("status")}
        //                 name="status"
        //                 id="bachelor"
        //                 value="학사졸업"
        //                 defaultChecked={current.status === "학사졸업"}
        //             />
        //             <label htmlFor="bachelor">학사졸업</label>
        //             <input
        //                 type="radio"
        //                 {...register("status")}
        //                 name="status"
        //                 id="master"
        //                 value="석사졸업"
        //                 defaultChecked={current.status === "석사졸업"}
        //             />
        //             <label htmlFor="master">석사졸업</label>
        //             <input
        //                 type="radio"
        //                 {...register("status")}
        //                 name="status"
        //                 id="doctor"
        //                 value="박사졸업"
        //                 defaultChecked={current.status === "박사졸업"}
        //             />
        //             <label htmlFor="doctor">박사졸업</label>
        //         </div>
        //         <button>변경</button>
        //         <button
        //             onClick={() => {
        //                 setIsEditing(false);
        //                 setOneByOne()
        //             }}
        //         >
        //             취소
        //         </button>
        //     </form>
        // </div>
    );
}
