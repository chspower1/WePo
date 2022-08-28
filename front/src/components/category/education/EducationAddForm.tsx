import { EduStatus, IEducation, IUser } from "@/atoms";
import { useForm } from "react-hook-form";
import { addData, Category } from "@api/api";
import {
    MvpContentName,
    MvpAddInput,
    MvpAddInputBox,
    RequiredLabel,
    Button,
    MajorGraduate,
    MajorGraduateLabel,
} from "@user/MyPortfolio";
import { Status } from "styled-icons/fluentui-system-filled";
import { DangerIcon, ErrMsg } from "@user/LoginForm";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { curUserState } from "@/atoms";

interface IEducationAddFormProps {
    setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
    setIsAddFormActive: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number;
}

export default function EducationAddForm({
    setEducations,
    setIsAddFormActive,
    userId,
}: IEducationAddFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IEducation>({ mode: "onChange" });
    const onvalid = (data: IEducation) => {
        const eduId: string = String(Date.now());
        const newEducation: IEducation = {
            ...data,
            eduId,
            userId,
        };
        setEducations((prev) => [...prev, newEducation]);
        setIsAddFormActive(false);
        addData(newEducation, Category.education);
    };
    useEffect(() => {
        setError("status", {
            type: "custom",
            message: "졸엽여부를 입력해주세요",
        });
        setError("school", {
            type: "custom",
            message: "자신의 학교를 입력해주세요",
        });
        setError("major", {
            type: "custom",
            message: "자신의 전공을 입력해주세요",
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    학교 이름 <RequiredLabel>*</RequiredLabel>{" "}
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    placeholder="학교 이름"
                    width="300"
                    {...register("school", {
                        required: "학교 이름을 입력하세요!",
                        minLength: { value: 1, message: "학교 이름을 입력하세요" },
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
                    전공 <RequiredLabel>*</RequiredLabel>{" "}
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    placeholder="전공"
                    width="300"
                    {...register("major", {
                        required: "자신의 전공을 입력하세요!",
                        minLength: { value: 1, message: "자신의 전공을 입력하세요" },
                    })}
                />
                {errors.major && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.major.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <div style={{ marginBottom: "30px" }}>
                <MvpContentName>
                    졸업여부 <RequiredLabel>*</RequiredLabel>{" "}
                </MvpContentName>
                <MajorGraduate
                    value={EduStatus.attending}
                    id="attending"
                    {...register("status", { required: "필수 입력입니다." })}
                />
                <MajorGraduateLabel htmlFor="attending">{EduStatus.attending}</MajorGraduateLabel>
                <MajorGraduate
                    value={EduStatus.bachelor}
                    id="bachelor"
                    {...register("status", { required: "필수 입력입니다." })}
                />
                <MajorGraduateLabel htmlFor="bachelor">{EduStatus.bachelor}</MajorGraduateLabel>
                <MajorGraduate
                    value={EduStatus.master}
                    id="master"
                    {...register("status", { required: "필수 입력입니다." })}
                />
                <MajorGraduateLabel htmlFor="master">{EduStatus.master}</MajorGraduateLabel>
                <MajorGraduate
                    value={EduStatus.doctor}
                    id="doctor"
                    {...register("status", { required: "필수 입력입니다." })}
                />
                <MajorGraduateLabel htmlFor="doctor">{EduStatus.doctor}</MajorGraduateLabel>
                <div style={{ marginTop: "10px" }}>
                    {errors.status && (
                        <ErrMsg>
                            <DangerIcon />
                            {errors.status.message}
                        </ErrMsg>
                    )}
                </div>
            </div>
            <div style={{ float: "right", marginBottom: "10px" }}>
                <Button color="#3687FF" type="submit">
                    추가
                </Button>
                <Button onClick={() => setIsAddFormActive(false)}>취소</Button>
            </div>
        </form>
    );
}
