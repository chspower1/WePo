import { useForm } from "react-hook-form";
import { useState } from "react";
import { IProject } from "../../atoms";
import { updateProject } from "../../api/api";

export function ProjectEditForm({
    index,
    projects,
    setProjects,
    setEditing,
    setIsEditing,
    setTargetIndex,
    id,
}: any) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IProject>();
    const onvalid = (data: IProject) => {
        updateProject(data, id);
        setProjects((project: any) => {
            const editProject = [...project];
            editProject[index] = data;
            return editProject;
        });
        setIsEditing(false);
        setTargetIndex(null);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onvalid)}>
                <input
                    type="text"
                    id="project-title"
                    defaultValue={projects[index].title}
                    {...register("title", {
                        required: "프로젝트명을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></input>
                {errors.title?.message && errors.title.message}
                <input
                    type="Date"
                    id="project-startDate"
                    defaultValue={projects[index].startDate}
                    {...register("startDate", {
                        required: "시작기간을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></input>
                {errors.startDate?.message && errors.startDate.message}
                <input
                    type="Date"
                    id="project-endDate"
                    defaultValue={projects[index].endDate}
                    {...register("endDate", {
                        required: "종료기간을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></input>
                {errors.endDate?.message && errors.endDate.message}
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
