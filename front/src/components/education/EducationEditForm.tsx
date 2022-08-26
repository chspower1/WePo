import { EduStatus, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import {
    MvpContentName,
    MvpAddInput,
    MvpAddInputBox,
    RequiredLabel,
    Button,
    MajorGraduate,
    MajorGraduateLabel,
} from "../MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";
import { updateEducation } from "../../api/api";

export default function EducationEditForm({
    index,
    educations,
    setEducations,
    setIsEditing,
    setTargetIndex,
    id,
    _id
}: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEducation>({ mode: "onChange" });
    const onvalid = (data: IEducation) => {
        const editData = [...educations];
        editData[index] = data;
        setEducations(editData);
        updateEducation(data, id, _id)
        setIsEditing(false);
        setTargetIndex(null);
    };
    const current = educations[index];

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    학교 이름 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
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
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    전공 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
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
                ></MvpAddInput>
                {errors.major && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.major.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <div style={{marginBottom:"30px"}}>
                    <MvpContentName>졸업여부 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                    <MajorGraduate value={EduStatus.attending} id="attending" defaultChecked={current.status === "재학중"} {...register("status",{required:"필수 입력입니다."})}/>
                    <MajorGraduateLabel htmlFor="attending">{EduStatus.attending}</MajorGraduateLabel>
                    <MajorGraduate value={EduStatus.bachelor} id="bachelor" defaultChecked={current.status === "학사졸업"} {...register("status",{required:"필수 입력입니다."})}/>
                    <MajorGraduateLabel htmlFor="bachelor">{EduStatus.bachelor}</MajorGraduateLabel>
                    <MajorGraduate value={EduStatus.master} id="master" defaultChecked={current.status === "석사졸업"} {...register("status",{required:"필수 입력입니다."})}/>
                    <MajorGraduateLabel htmlFor="master">{EduStatus.master}</MajorGraduateLabel>
                    <MajorGraduate value={EduStatus.doctor} id="doctor" defaultChecked={current.status === "박사졸업"} {...register("status",{required:"필수 입력입니다."})}/>
                    <MajorGraduateLabel htmlFor="doctor">{EduStatus.doctor}</MajorGraduateLabel>
                    <div style={{marginTop:"10px"}}>
                        {errors.status && <ErrMsg><DangerIcon/>{errors.status.message}</ErrMsg>}
                    </div>
                </div>
            </MvpAddInputBox>
            <div style={{float:"right",marginBottom:"10px"}}>
                    <Button type="submit" color="#3687FF">수정</Button>
                    <Button onClick={()=> {setIsEditing(false); setTargetIndex(null)}}>취소</Button>
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
