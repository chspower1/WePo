import { useForm } from "react-hook-form";
import { addData, Category } from "@api/api";
import { IAward } from "@/atoms";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
import { useEffect } from "react";
import * as AwardStyled from "@styledComponents/CategoryStyled";

interface IAwardAddFormProps {
  setAwards: React.Dispatch<React.SetStateAction<IAward[]>>;
  maxDate: string;
  setIsAddFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  awards: IAward[];
}

export default function AwardAddForm({
  setAwards,
  maxDate,
  setIsAddFormActive,
  userId,
  awards,
}: IAwardAddFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IAward>({ mode: "onChange" });

  const onvalid = (data: IAward) => {
    const awardId: string = String(Date.now());
    const newAward: IAward = {
      ...data,
      awardId,
      userId,
      order: awards.length,
    };
    setAwards((project) => [...project, newAward]);
    setIsAddFormActive(false);
    addData(newAward, Category.award);
  };

  useEffect(() => {
    setError("title", {
      type: "custom",
      message: "제목을 입력해주세요",
    });
    setError("grade", {
      type: "custom",
      message: "수상순위를 입력해주세요",
    });
    setError("date", {
      type: "custom",
      message: "수상을 한 날짜를 입력해주세요",
    });
    setError("org", {
      type: "custom",
      message: "기관명을 입력해주세요",
    });
    setError("description", {
      type: "custom",
      message: "상세설명을 입력해주세요",
    });
  }, []);
  return (
    <form onSubmit={handleSubmit(onvalid)}>
      <AwardStyled.AddInputBox>
        <AwardStyled.ImportantTxt>
          <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
          필수사항
        </AwardStyled.ImportantTxt>
        <AwardStyled.ContentName>
          제목을 입력하세요
          <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
        </AwardStyled.ContentName>
        <AwardStyled.AddInput
          type="text"
          width="300"
          placeholder="제목"
          {...register("title", {
            required: "제목을 입력하세요!",
            minLength: { value: 1, message: "제목을 입력하세요!" },
          })}
        />
        {errors.title && (
          <ErrMsg>
            <DangerIcon />
            {errors.title.message}
          </ErrMsg>
        )}
      </AwardStyled.AddInputBox>
      <AwardStyled.AddInputBox>
        <AwardStyled.ContentName>
          수상순위을 입력하세요
          <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
        </AwardStyled.ContentName>
        <AwardStyled.AddInput
          type="text"
          width="300"
          placeholder="수상순위"
          {...register("grade", {
            required: "수상순위을 입력하세요!",
            minLength: { value: 1, message: "수상순위을 입력하세요!" },
          })}
        />
        {errors.grade && (
          <ErrMsg>
            <DangerIcon />
            {errors.grade.message}
          </ErrMsg>
        )}
      </AwardStyled.AddInputBox>
      <AwardStyled.AddInputBox>
        <AwardStyled.ContentName>
          날짜을 입력하세요 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
        </AwardStyled.ContentName>
        <AwardStyled.AddInput
          type="date"
          width="130"
          {...register("date", {
            required: "날짜를 입력하세요!",
            max: { value: maxDate, message: "수상을 한 날짜를 입력하세요!" },
          })}
        />
        {errors.date && (
          <ErrMsg>
            <DangerIcon />
            {errors.date.message}
          </ErrMsg>
        )}
      </AwardStyled.AddInputBox>
      <AwardStyled.AddInputBox>
        <AwardStyled.ContentName>
          기관을 입력하세요 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
        </AwardStyled.ContentName>
        <AwardStyled.AddInput
          type="text"
          placeholder="기관"
          {...register("org", {
            required: "기관을 입력하세요!",
            minLength: { value: 1, message: "기관을 입력하세요!" },
          })}
        />
        {errors.org && (
          <ErrMsg>
            <DangerIcon />
            {errors.org.message}
          </ErrMsg>
        )}
      </AwardStyled.AddInputBox>
      <AwardStyled.AddInputBox>
        <AwardStyled.ContentName>
          상세내용을 입력하세요 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>
        </AwardStyled.ContentName>
        <AwardStyled.AddInput
          type="text"
          placeholder="수상이력에 대한 설명을 간단하게 작성할 수 있습니다. 너무 길게말고 간단하게만 작성해주세요"
          {...register("description", {
            required: "상세설명을 입력하세요!",
            minLength: { value: 1, message: "상세설명을 입력하세요!" },
          })}
        />
        {errors.description && (
          <ErrMsg>
            <DangerIcon />
            {errors.description.message}
          </ErrMsg>
        )}
      </AwardStyled.AddInputBox>
      <AwardStyled.SubmitOrCencerBtnBox>
        <AwardStyled.Button color="#3687FF" type="submit">
          추가
        </AwardStyled.Button>
        <AwardStyled.Button onClick={() => setIsAddFormActive(false)}>
          취소
        </AwardStyled.Button>
      </AwardStyled.SubmitOrCencerBtnBox>
    </form>
  );
}
