import { useForm } from "react-hook-form";
import { useState } from "react";
import { IProject} from "../../atoms";

export function ProjectEditForm({index,projects,setProjects,setEditing,setIsEditing}:any) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IProject>();

    return (
        <>
            <form>
                <input
                    type="text"
                    id="project-title"
                    defaultValue={projects[index].title}
                    {...register("title", {
                        required: "프로젝트명을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></input>
                <input
                    type="number"
                    id="project-startDate"
                    defaultValue={projects[index].startDate}
                    {...register("startDate", {
                        required: "시작기간을 입력해주세요",
                        pattern: {
                            value: /^\d{4}\d{2}\d{2}$/,
                            message: "20220101 형식으로 작성해주세요",
                        },
                        shouldUnregister: true,
                    })}
                ></input>
                <input
                    type="number"
                    id="project-endDate"
                    defaultValue={projects[index].endDate}
                    {...register("endDate", {
                        required: "종료기간을 입력해주세요",
                        pattern: {
                            value: /^\d{4}\d{2}\d{2}$/,
                            message: "20220101 형식으로 작성해주세요",
                        },
                        shouldUnregister: true,
                    })}
                ></input>
                <input
                    type="text"
                    id="project-description"
                    defaultValue={projects[index].description}
                    {...register("description", { shouldUnregister: true })}
                ></input>
                <button>수정</button>
                <button>닫기</button>
            </form>
        </>
    );
}
