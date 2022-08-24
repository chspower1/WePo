import { useForm } from "react-hook-form";
import { ICertificate } from "../../atoms";
export function CertificateAddForm({setAdding,setProjects}:any){
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
      } = useForm<ICertificate>();

    return(
        <form
            onSubmit={handleSubmit((data) => {
                setProjects((project:any)=>[...project,data])
                setAdding(false)
            })}
          >
            <input
              type="text"
              id="project-title"
              placeholder="자격증명"
              {...register('title', {
                required: "자격증명을 입력해주세요",
                shouldUnregister: true,
              })}
            ></input>
            {errors.title?.message && errors.title.message}
            <input
              type="number"
              id="project-startDate"
              placeholder="취득기간 시작기간"
              {...register('date', {
                required: "취득기간을 입력해주세요",
                pattern: {
                  value: /^\d{4}\d{2}\d{2}$/,
                  message: "20220101 형식으로 작성해주세요",
                },
                shouldUnregister: true,
              })}
            ></input>
            {errors.date?.message && errors.date.message}
            <input
              type="number"
              id="project-endDate"
              placeholder="프로젝트 종료기간"
              {...register('org', {
                required: "발급기관을 입력해주세요",
                pattern: {
                  value: /^\d{4}\d{2}\d{2}$/,
                  message: "20220101 형식으로 작성해주세요",
                },
                shouldUnregister: true,
              })}
            ></input>
            {errors.org?.message && errors.org.message}
            <input
              type="text"
              id="project-description"
              placeholder="추가설명"
              {...register('description', { shouldUnregister: true })}
            ></input>
            <button>추가</button>
            <button onClick={()=>setAdding(false)}>취소</button>
          </form>
    )
}





