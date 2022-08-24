import { useForm } from "react-hook-form";
import { ICertificate } from "../../atoms";

export function CertificateEditForm({index,projects,setProjects,setEditing,setIsEditing,setTargetIndex}:any){
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICertificate>();

    return(
        <form onSubmit={handleSubmit((data) => {
            setProjects((project:any)=>{
                const editProject = [...project]
                editProject[index] = data
                return editProject
            })
            setIsEditing(false)
            setTargetIndex(null)
        })}>
            <input
                type="text"
                id="project-title"
                defaultValue={projects[index].title}
                {...register("title", {
                    required: "자격증명을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.title?.message && errors.title.message}
            <input
                type="number"
                id="project-startDate"
                defaultValue={projects[index].date}
                {...register("date", {
                    required: "취득날짜을 입력해주세요",
                    pattern: {
                        value: /^\d{4}\d{2}\d{2}$/,
                        message: "20220101 형식으로 작성해주세요",
                    },
                    shouldUnregister: true,
                })}
            ></input>
            {errors.date?.message && errors.date.message}
            <input
                type="text"
                id="project-endDate"
                defaultValue={projects[index].org}
                {...register("org", {
                    required: "발급기관을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.org?.message && errors.org.message}
            <input
                type="text"
                id="project-description"
                defaultValue={projects[index].description}
                {...register("description", { shouldUnregister: true })}
            ></input>
            <button>수정</button>
            <button>닫기</button>
        </form>
    )   
}
