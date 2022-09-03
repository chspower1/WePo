import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addData, Category } from "@api/api";
import { IProject } from "@/atoms";
import * as ProjectStyled from "@styledComponents/CategoryStyled";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";

interface IProjectAddFormProps {
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  setIsAddFormActive: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  projects: IProject[];
  maxDate: string;
}

export const ProjectAddForm = ({
  setIsAddFormActive,
  setProjects,
  userId,
  projects,
  maxDate,
}: IProjectAddFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IProject>({ mode: "onChange" });

  const onvalid = (data: IProject) => {
    const projectId: string = String(Date.now());
    const newProject: IProject = {
      ...data,
      projectId,
      userId,
      order: projects.length,
    };
    setProjects((project) => [...project, newProject]);
    setIsAddFormActive(false);
    addData(newProject, Category.project);
  };

  useEffect(() => {
    setError("title", {
      type: "custom",
      message: "프로젝트 명을 입력해주세요",
    });
    setError("startDate", {
      type: "custom",
      message: "기간을 입력해주세요",
    });
    setError("endDate", {
      type: "custom",
      message: "기간을 입력해주세요",
    });
  }, []);

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
          width="300"
          id="project-title"
          placeholder="프로젝트 명"
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
          프로젝트 기간<ProjectStyled.RequiredLabel>*</ProjectStyled.RequiredLabel>
        </ProjectStyled.ContentName>
        <ProjectStyled.AddInput
          type="date"
          width="130"
          id="project-startDate"
          placeholder="프로젝트 시작기간"
          {...register("startDate", {
            required: "기간을 입력해주세요",
          })}
        ></ProjectStyled.AddInput>
        <span style={{ margin: "0  5px 0 5px" }}>-</span>
        <ProjectStyled.AddInput
          type="date"
          id="project-endDate"
          placeholder="프로젝트 종료기간"
          {...register("endDate", {
            required: "기간을 입력해주세요",
            max: { value: maxDate, message: "종료기간은 현재년도를 기준으로 1년미만으로만 가능합니다." }
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
          placeholder="추가설명"
          {...register("description")}
        ></ProjectStyled.AddInput>
      </ProjectStyled.AddInputBox>
      <ProjectStyled.SubmitOrCencerBtnBox>
        <ProjectStyled.Button color="#3687FF" type="submit">
          추가
        </ProjectStyled.Button>
        <ProjectStyled.Button onClick={() => setIsAddFormActive(false)}>
          취소
        </ProjectStyled.Button>
      </ProjectStyled.SubmitOrCencerBtnBox>
    </form>
  );
};
