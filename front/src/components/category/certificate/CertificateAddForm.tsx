import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addData, Category } from "@api/api";
import { ICertificate } from "@/atoms";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
import * as CertStyled from "@styledComponents/CategoryStyled";

interface ICertificateAddFormProps {
  setCertificates: React.Dispatch<React.SetStateAction<ICertificate[]>>;
  setIsAddFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  certificates: ICertificate[];
}

export function CertificateAddForm({
  setIsAddFormActive,
  setCertificates,
  userId,
  certificates,
}: ICertificateAddFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICertificate>({ mode: "onChange" });

  const onvalid = (data: ICertificate) => {
    const certId: string = String(Date.now());
    const newCertificate: ICertificate = {
      ...data,
      certId,
      userId,
      order: certificates.length,
    };
    console.log("생성완료", newCertificate);
    setCertificates((project) => [...project, newCertificate]);
    setIsAddFormActive(false);
    addData(newCertificate, Category.certificate);
  };

  useEffect(() => {
    setError("title", {
      type: "custom",
      message: "자격증 명을 입력해주세요",
    });
    setError("date", {
      type: "custom",
      message: "발급일을 입력해주세요",
    });
    setError("org", {
      type: "custom",
      message: "발급기관을 입력해주세요",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onvalid)}>
      <CertStyled.AddInputBox>
        <CertStyled.ImportantTxt>
          <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel> 필수사항
        </CertStyled.ImportantTxt>
        <CertStyled.ContentName>
          자격증 <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel>
        </CertStyled.ContentName>
        <CertStyled.AddInput
          type="text"
          id="certificate"
          width="300"
          placeholder="자격증이름"
          {...register("title", {
            required: "자격증을 입력해주세요",
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
          발급일 <CertStyled.RequiredLabel>*</CertStyled.RequiredLabel>
        </CertStyled.ContentName>
        <CertStyled.AddInput
          type="Date"
          width="130"
          id="issue-date"
          placeholder="발급일"
          {...register("date", {
            required: "발급일을 입력해주세요",
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
          type="string"
          id="issuer"
          width="300"
          placeholder="발급기관"
          {...register("org", {
            required: "발급기관을 입력해주세요",
            shouldUnregister: true,
          })}
        ></CertStyled.AddInput>
        {errors.org && (
          <ErrMsg>
            <DangerIcon />
            {errors.org.message}
          </ErrMsg>
        )}
      </CertStyled.AddInputBox>
      <CertStyled.AddInputBox>
        <CertStyled.ContentName>자격증 설명</CertStyled.ContentName>
        <CertStyled.AddInput
          type="text"
          id="certificate-description"
          placeholder="예) 전산 직무에 관심이 많아 산업인력공단에서 시행하는 정보처리기사 자격증을 취득하였습니다."
          {...register("description", { shouldUnregister: true })}
        ></CertStyled.AddInput>
      </CertStyled.AddInputBox>

      <CertStyled.SubmitOrCencerBtnBox>
        <CertStyled.Button color="#3687FF" type="submit">
          추가
        </CertStyled.Button>
        <CertStyled.Button onClick={() => setIsAddFormActive(false)}>
          취소
        </CertStyled.Button>
      </CertStyled.SubmitOrCencerBtnBox>
    </form>
  );
}
