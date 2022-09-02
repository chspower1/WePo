import { useForm } from "react-hook-form";
import { IProject } from "@/atoms";
import { Category, updateData } from "@api/api";
import * as ProjectStyled from "@styledComponents/CategoryStyled";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";

interface IProjectEditFormProps {
  index: number;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetIndex: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
  userId: number;
  projectId: string;
}

export function ProjectEditForm({
  index,
  projects,
  setProjects,
  setIsEditing,
  setTargetIndex,
  userId,
  projectId,
}: IProjectEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProject>({ mode: "onChange" });

  const onvalid = (data: IProject) => {
    updateData(data, Category.project, userId, projectId);
    setProjects((project) => {
      const newProjects = [...project];
      newProjects[index] = { ...data, userId, projectId };
      return newProjects;
    });
    setIsEditing(false);
    setTargetIndex(null);
  };
  return (
    <form onSubmit={handleSubmit(onvalid)}>
      <ProjectStyled.AddInputBox>
        <ProjectStyled.ImportantTxt>
          <ProjectStyled.RequiredLabel>*</ProjectStyled.RequiredLabel> 필수사항
        </ProjectStyled.ImportantTxt>
        <ProjectStyled.ContentName>
          프로젝트 명 <ProjectStyled.RequiredLabel>*</ProjectStyled.RequiredLabel>
        </ProjectStyled.ContentName>
        <ProjectStyled.AddInput
          type="text"
          id="project-title"
          defaultValue={projects[index].title}
          {...register("title", {
            required: "프로젝트명을 입력해주세요",
          })}
        ></ProjectStyled.AddInput>
        {errors.title && (
          <ErrMsg>
            <DangerIcon />
            {errors.title.message}
          </ErrMsg>
        )}
      </ProjectStyled.AddInputBox>
      <ProjectStyled.AddInputBox style={{ display: "block" }}>
        <ProjectStyled.ContentName>
          프로젝트 기간 <ProjectStyled.RequiredLabel>*</ProjectStyled.RequiredLabel>
        </ProjectStyled.ContentName>
        <ProjectStyled.AddInput
          type="date"
          width="100"
          maxLength={2}
          id="project-startDate"
          defaultValue={String(projects[index].startDate).slice(0, 10)}
          placeholder="프로젝트 시작기간"
          {...register("startDate", {
            required: "기간을 입력해주세요",
            // pattern: {
            //     value: /^\d{4}\d{2}\d{2}$/,
            //     message: "20220101 형식으로 작성해주세요",
            // },
          })}
        ></ProjectStyled.AddInput>
        <span style={{ margin: "0  5px 0 5px" }}>-</span>
        <ProjectStyled.AddInput
          type="date"
          id="project-endDate"
          defaultValue={String(projects[index].endDate).slice(0, 10)}
          placeholder="프로젝트 종료기간"
          {...register("endDate", {
            required: "기간을 입력해주세요",
            // pattern: {
            //     value: /^\d{4}\d{2}\d{2}$/,
            //     message: "20220101 형식으로 작성해주세요",
            // },
          })}
        ></ProjectStyled.AddInput>
        {(errors.startDate && (
          <ErrMsg>
            <DangerIcon />
            {errors.startDate.message}
          </ErrMsg>
        )) ||
          (errors.endDate && (
            <ErrMsg>
              <DangerIcon />
              {errors.endDate.message}
            </ErrMsg>
          ))}
      </ProjectStyled.AddInputBox>
      <ProjectStyled.AddInputBox>
        <ProjectStyled.ContentName>간단한 설명</ProjectStyled.ContentName>
        <ProjectStyled.AddInput
          type="text"
          id="project-description"
          defaultValue={projects[index].description}
          placeholder="추가설명"
          {...register("description")}
        ></ProjectStyled.AddInput>
      </ProjectStyled.AddInputBox>
      <ProjectStyled.SubmitOrCencerBtnBox>
        <ProjectStyled.Button type="submit" color="#3687FF">
          수정
        </ProjectStyled.Button>
        <ProjectStyled.Button
          onClick={() => {
            setIsEditing(false);
            setTargetIndex(null);
          }}
        >
          취소
        </ProjectStyled.Button>
      </ProjectStyled.SubmitOrCencerBtnBox>
    </form>
  );
}
