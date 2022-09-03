import { EduStatus, IEducation, IUser } from "@/atoms";
import { useForm } from "react-hook-form";
import { addData, Category } from "@api/api";
import * as EducationStyled from "@styledComponents/CategoryStyled";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
import { useEffect } from "react";

interface IEducationAddFormProps {
  setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
  setIsAddFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  educations: IEducation[];
}

export default function EducationAddForm({
  setEducations,
  setIsAddFormActive,
  userId,
  educations,
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
      order: educations.length,
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
      <EducationStyled.AddInputBox>
        <EducationStyled.ImportantTxt>
          <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel> 필수사항
        </EducationStyled.ImportantTxt>
        <EducationStyled.ContentName>
          학교 이름 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>{" "}
        </EducationStyled.ContentName>
        <EducationStyled.AddInput
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
      </EducationStyled.AddInputBox>
      <EducationStyled.AddInputBox>
        <EducationStyled.ContentName>
          전공 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>{" "}
        </EducationStyled.ContentName>
        <EducationStyled.AddInput
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
      </EducationStyled.AddInputBox>
      <div style={{ marginBottom: "30px" }}>
        <EducationStyled.ContentName>
          졸업여부 <EducationStyled.RequiredLabel>*</EducationStyled.RequiredLabel>{" "}
        </EducationStyled.ContentName>
        <EducationStyled.MajorGraduate
          value={EduStatus.attending}
          id="attending"
          {...register("status", { required: "필수 입력입니다." })}
        />
        <EducationStyled.MajorGraduateLabel htmlFor="attending">
          {EduStatus.attending}
        </EducationStyled.MajorGraduateLabel>
        <EducationStyled.MajorGraduate
          value={EduStatus.bachelor}
          id="bachelor"
          {...register("status", { required: "필수 입력입니다." })}
        />
        <EducationStyled.MajorGraduateLabel htmlFor="bachelor">
          {EduStatus.bachelor}
        </EducationStyled.MajorGraduateLabel>
        <EducationStyled.MajorGraduate
          value={EduStatus.master}
          id="master"
          {...register("status", { required: "필수 입력입니다." })}
        />
        <EducationStyled.MajorGraduateLabel htmlFor="master">
          {EduStatus.master}
        </EducationStyled.MajorGraduateLabel>
        <EducationStyled.MajorGraduate
          value={EduStatus.doctor}
          id="doctor"
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
      <EducationStyled.SubmitOrCencerBtnBox>
        <EducationStyled.Button color="#3687FF" type="submit">
          추가
        </EducationStyled.Button>
        <EducationStyled.Button onClick={() => setIsAddFormActive(false)}>
          취소
        </EducationStyled.Button>
      </EducationStyled.SubmitOrCencerBtnBox>
    </form>
  );
}
