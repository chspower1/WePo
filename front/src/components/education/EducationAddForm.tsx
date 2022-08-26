import { EduStatus, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import { addEducation } from "../../api/api";
import { MvpContentName,MvpAddInput, MvpAddInputBox, RequiredLabel,Button,MajorGraduate,MajorGraduateLabel } from "../MyPortfolio";
import { Status } from "styled-icons/fluentui-system-filled";
import { DangerIcon, ErrMsg } from "../user/LoginForm";
import { useEffect } from "react";

export default function EducationAddForm({ setEducations, setAddFormActive, id }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IEducation>({ mode: "onChange" });

    const onvalid = (data: IEducation) => {
        setEducations((prev: any) => [...prev, data]);
        setAddFormActive(false);
        addEducation(data);
    };
    useEffect(()=>{
        setError("status",{
            type:"custom",
            message:"졸엽여부를 입력해주세요"
        })
        setError("school",{
            type:"custom",
            message:"자신의 학교를 입력해주세요"
        })
        setError("major",{
            type:"custom",
            message:"자신의 전공을 입력해주세요"
        })
    },[])

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{position:"absolute",right:"20px",top:"20px"}}><RequiredLabel>*</RequiredLabel> 필수사항</p>
                <MvpContentName>학교 이름 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput type="text" placeholder="학교 이름" width="300"{...register('school',{required:"학교 이름을 입력하세요!",minLength:{value:1,message:"학교 이름을 입력하세요"}})}/>
                {errors.school && <ErrMsg><DangerIcon/>{errors.school.message}</ErrMsg>}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>전공 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput type="text" placeholder="전공" width="300" {...register('major',{required:"자신의 전공을 입력하세요!",minLength:{value:1,message:"자신의 전공을 입력하세요"}})}/>
                {errors.major && <ErrMsg><DangerIcon/>{errors.major.message}</ErrMsg>}
            </MvpAddInputBox>
            <div style={{marginBottom:"30px"}}>
                <MvpContentName>졸업여부 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MajorGraduate value={EduStatus.attending} id="attending" {...register("status",{required:"필수 입력입니다."})}/>
                <MajorGraduateLabel htmlFor="attending">{EduStatus.attending}</MajorGraduateLabel>
                <MajorGraduate value={EduStatus.bachelor} id="bachelor" {...register("status",{required:"필수 입력입니다."})}/>
                <MajorGraduateLabel htmlFor="bachelor">{EduStatus.bachelor}</MajorGraduateLabel>
                <MajorGraduate value={EduStatus.master} id="master" {...register("status",{required:"필수 입력입니다."})}/>
                <MajorGraduateLabel htmlFor="master">{EduStatus.master}</MajorGraduateLabel>
                <MajorGraduate value={EduStatus.doctor} id="doctor" {...register("status",{required:"필수 입력입니다."})}/>
                <MajorGraduateLabel htmlFor="doctor">{EduStatus.doctor}</MajorGraduateLabel>
                <div style={{marginTop:"10px"}}>
                    {errors.status && <ErrMsg><DangerIcon/>{errors.status.message}</ErrMsg>}
                </div>
            </div>
            <div style={{float:"right",marginBottom:"10px"}}>
                <Button color="#3687FF" type="submit">추가</Button>
                <Button onClick={() => setAddFormActive(false)}>취소</Button>
            </div>
        </form>
        // <div className="formWrap">
        //     <form onSubmit={handleSubmit(onvalid)}>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="학교 이름"
        //                 defaultValue={""}
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
        //                 defaultValue={""}
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
        //                 {...register("status", { required: "필수 입력 입니다." })}
        //                 name="status"
        //                 id="attending"
        //                 value={EduStatus.attending}
        //             />
        //             <label htmlFor="attending">{EduStatus.attending}</label>
        //             <input
        //                 type="radio"
        //                 {...register("status", { required: "필수 입력 입니다." })}
        //                 name="status"
        //                 id="bachelor"
        //                 value={EduStatus.bachelor}
        //             />
        //             <label htmlFor="bachelor">{EduStatus.bachelor}</label>
        //             <input
        //                 type="radio"
        //                 {...register("status", { required: "필수 입력 입니다." })}
        //                 name="status"
        //                 id="master"
        //                 value={EduStatus.master}
        //             />
        //             <label htmlFor="master">{EduStatus.master}</label>
        //             <input
        //                 type="radio"
        //                 {...register("status", { required: "필수 입력 입니다." })}
        //                 name="status"
        //                 id="doctor"
        //                 value={EduStatus.doctor}
        //             />
        //             <label htmlFor="doctor">{EduStatus.doctor}</label>
        //             {errors.status && <p>{errors.status.message}</p>}
        //         </div>
        //         <button>추가</button>
        //         <button
        //             onClick={() => {
        //                 setAddFormActive(false);
        //                 reset({
        //                     school: "",
        //                     major: "",
        //                     status: EduStatus.attending,
        //                 });
        //             }}
        //         >
        //             취소
        //         </button>
        //     </form>
        // </div>
    );
}
