import { useForm } from "react-hook-form";
import { addCertificate } from "../../api/api";
import { ICertificate } from "../../atoms";
export function CertificateAddForm({ setAdding, setProjects, id }: any) {
    console.log(id);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICertificate>();

    const onvalid = (data: ICertificate) => {
        setProjects((project: any) => [...project, data]);
        setAdding(false);
        addCertificate(data, id);
    };
    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <input
                type="text"
                id="project-title"
                placeholder="자격증명"
                {...register("title", {
                    required: "자격증명을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.title?.message && errors.title.message}
            <input
                type="Date"
                id="project-startDate"
                placeholder="취득기간 시작기간"
                {...register("date", {
                    required: "취득기간을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.date?.message && errors.date.message}
            <input
                type="Date"
                id="project-endDate"
                placeholder="프로젝트 종료기간"
                {...register("org", {
                    required: "발급기관을 입력해주세요",
                    shouldUnregister: true,
                })}
            ></input>
            {errors.org?.message && errors.org.message}
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
}
