import { useForm } from "react-hook-form";
import { Category, updateData } from "@api/api";
import { ICertificate } from "@/atoms";
import * as CertStyled from "@styledComponents/CategoryStyled";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
interface ICertificateEditFormProps {
  index: number;
  certificates: ICertificate[];
  setCertificates: React.Dispatch<React.SetStateAction<ICertificate[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetIndex: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  userId: number;
  certId: string;
}
export function CertificateEditForm({
  index,
  certificates,
  setCertificates,
  setIsEditing,
  setTargetIndex,
  userId,
  certId,
}: ICertificateEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICertificate>({ mode: "onChange" });

  const onvalid = (data: ICertificate) => {
    updateData(data, Category.certificate, userId, certId);
    setCertificates((cerfiticate) => {
      const newCerfiticate = [...cerfiticate];
      newCerfiticate[index] = { ...data, userId, certId };
      return newCerfiticate;
    });
    setIsEditing(false);
    setTargetIndex(null);
  };
  return (
    <form onSubmit={handleSubmit(onvalid)}>
      <CertStyled.AddInputBox>
        <CertStyled.ImportantTxt>
          <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel> 필수사항
        </CertStyled.ImportantTxt>
        <CertStyled.ContentName>
          자격증명 <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel>
        </CertStyled.ContentName>
        <CertStyled.AddInput
          type="text"
          width="300"
          id="project-title"
          defaultValue={certificates[index].title}
          {...register("title", {
            required: "자격증명을 입력해주세요",
            shouldUnregister: true,
          })}
        ></CertStyled.AddInput>
        {errors.title && (
          <ErrMsg>
            <DangerIcon />
            {errors.title.message}
          </ErrMsg>
        )}
      </CertStyled.AddInputBox>
      <CertStyled.AddInputBox>
        <CertStyled.ContentName>
          취득날짜 <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel>
        </CertStyled.ContentName>
        <CertStyled.AddInput
          type="date"
          width="100"
          id="project-startDate"
          defaultValue={String(certificates[index]?.date).slice(0, 10)}
          {...register("date", {
            required: "발급날짜을 입력해주세요",
            // pattern: {
            //     value: /^\d{4}\d{2}\d{2}$/,
            //     message: "20220101 형식으로 작성해주세요",
            // },
            shouldUnregister: true,
          })}
        ></CertStyled.AddInput>
        {errors.date && (
          <ErrMsg>
            <DangerIcon />
            {errors.date.message}
          </ErrMsg>
        )}
      </CertStyled.AddInputBox>
      <CertStyled.AddInputBox>
        <CertStyled.ContentName>
          발급기관 <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel>
        </CertStyled.ContentName>
        <CertStyled.AddInput
          type="text"
          width="300"
          id="project-endDate"
          defaultValue={certificates[index].org}
          {...register("org", {
            required: "발급기관을 입력해주세요",
            shouldUnregister: true,
          })}
        ></CertStyled.AddInput>
        {errors.org?.message && errors.org.message}
      </CertStyled.AddInputBox>
      <CertStyled.AddInputBox>
        <CertStyled.ContentName>자격증 설명</CertStyled.ContentName>
        <CertStyled.AddInput
          type="text"
          id="project-description"
          defaultValue={certificates[index].description}
          {...register("description", { shouldUnregister: true })}
        ></CertStyled.AddInput>
      </CertStyled.AddInputBox>
      <CertStyled.SubmitOrCencerBtnBox>
        <CertStyled.Button type="submit" color="#3687FF">
          수정
        </CertStyled.Button>
        <CertStyled.Button
          onClick={() => {
            setIsEditing(false);
            setTargetIndex(null);
          }}
        >
          취소
        </CertStyled.Button>
      </CertStyled.SubmitOrCencerBtnBox>
    </form>
  );
}
