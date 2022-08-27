import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addProject, getUser } from "../../api/api";
import { IProject } from "../../atoms";
import {
    MvpContentName,
    MvpAddInput,
    MvpAddInputBox,
    RequiredLabel,
    Button,
} from "../user/MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";

export const ProjectAddForm = ({ setAddFormActive, setProjects, userSeq }: any) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<IProject>({ mode: "onChange" });

    const onvalid = (data: IProject) => {
        addProject(data);
        setProjects((project: any) => [...project, data]);
        setAddFormActive(false);
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
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    프로젝트 명 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    id="project-title"
                    placeholder="프로젝트 명"
                    {...register("title", {
                        required: "프로젝트명을 입력해주세요",
                    })}
                ></MvpAddInput>
                {errors.title && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.title.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox style={{ display: "block" }}>
                <MvpContentName>
                    프로젝트 기간<RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="date"
                    width="130"
                    id="project-startDate"
                    placeholder="프로젝트 시작기간"
                    {...register("startDate", {
                        required: "기간을 입력해주세요",
                        // pattern: {
                        //     value: /^\d{4}\d{2}\d{2}$/,
                        //     message: "20220101 형식으로 작성해주세요",
                        // },
                    })}
                ></MvpAddInput>
                <span style={{ margin: "0  5px 0 5px" }}>-</span>
                <MvpAddInput
                    type="date"
                    id="project-endDate"
                    placeholder="프로젝트 종료기간"
                    {...register("endDate", {
                        required: "기간을 입력해주세요",
                        // pattern: {
                        //     value: /^\d{4}\d{2}\d{2}$/,
                        //     message: "20220101 형식으로 작성해주세요",
                        // },
                    })}
                ></MvpAddInput>
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
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>간단한 설명</MvpContentName>
                <MvpAddInput
                    type="text"
                    id="project-description"
                    placeholder="추가설명"
                    {...register("description")}
                ></MvpAddInput>
            </MvpAddInputBox>
            <div style={{ float: "right" }}>
                <Button color="#3687FF" type="submit">
                    추가
                </Button>
                <Button onClick={() => setAddFormActive(false)}>취소</Button>
            </div>
        </form>
    );
};
