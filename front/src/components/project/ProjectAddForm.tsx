import { useForm } from "react-hook-form";
import { addProject } from "../../api/api";
import { IProject } from "../../atoms";

export const ProjectAddForm = ({ setAdding, setProjects, id }: any) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IProject>();

    const onvalid = (data: IProject) => {
        addProject(data, id);
        setProjects((project: any) => [...project, data]);
        setAdding(false);
    };

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <input
                type="text"
                id="project-title"
                placeholder="프로젝트 명"
                {...register("title", {
                    required: "프로젝트명을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.title?.message && errors.title.message}
            <input
                type="number"
                id="project-startDate"
                placeholder="프로젝트 시작기간"
                {...register("startDate", {
                    required: "시작기간을 입력해주세요",
                    pattern: {
                        value: /^\d{4}\d{2}\d{2}$/,
                        message: "20220101 형식으로 작성해주세요",
                    },
                    shouldUnregister: true,
                })}
            ></input>
            {errors.startDate?.message && errors.startDate.message}
            <input
                type="number"
                id="project-endDate"
                placeholder="프로젝트 종료기간"
                {...register("endDate", {
                    required: "종료기간을 입력해주세요",
                    pattern: {
                        value: /^\d{4}\d{2}\d{2}$/,
                        message: "20220101 형식으로 작성해주세요",
                    },
                    shouldUnregister: true,
                })}
            ></input>
            {errors.endDate?.message && errors.endDate.message}
            <input
                type="text"
                id="project-description"
                placeholder="추가설명"
                {...register("description", { shouldUnregister: true })}
            ></input>
            <button>추가</button>
            <button onClick={() => setAdding(false)}>취소</button>
        </form>
    );
};
