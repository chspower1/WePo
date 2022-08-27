import { useForm } from "react-hook-form";
import { addCertificate, updateCertificate } from "../../api/api";
import { ICertificate } from "../../atoms";
import { MvpContentName, MvpAddInput, MvpAddInputBox, RequiredLabel, Button } from "../user/MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";

export function CertificateEditForm({
    index,
    certificates,
    setCertificates,
    setEditing,
    setIsEditing,
    setTargetIndex,
    userSeq,
    _id,
}: any) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICertificate>();

    const onvalid = (data: ICertificate) => {
        updateCertificate(data, userSeq, _id);
        setCertificates((cerfiticate: any) => {
            const editCerfiticate = [...cerfiticate];
            editCerfiticate[index] = data;
            return editCerfiticate;
        });

        setIsEditing(false);
        setTargetIndex(null);
    };
    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    자격증명 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    id="project-title"
                    defaultValue={certificates[index].title}
                    {...register("title", {
                        required: "자격증명을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></MvpAddInput>
                {errors.title && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.title.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    취득날짜 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="date"
                    width="100"
                    id="project-startDate"
                    defaultValue={certificates[index].date}
                    {...register("date", {
                        required: "발급날짜을 입력해주세요",
                        // pattern: {
                        //     value: /^\d{4}\d{2}\d{2}$/,
                        //     message: "20220101 형식으로 작성해주세요",
                        // },
                        shouldUnregister: true,
                    })}
                ></MvpAddInput>
                {errors.date && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.date.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    발급기관 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    id="project-endDate"
                    defaultValue={certificates[index].org}
                    {...register("org", {
                        required: "발급기관을 입력해주세요",
                        shouldUnregister: true,
                    })}
                ></MvpAddInput>
                {errors.org?.message && errors.org.message}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>자격증 설명</MvpContentName>
                <MvpAddInput
                    type="text"
                    id="project-description"
                    defaultValue={certificates[index].description}
                    {...register("description", { shouldUnregister: true })}
                ></MvpAddInput>
            </MvpAddInputBox>
            <div style={{ float: "right", marginBottom: "10px" }}>
                <Button type="submit" color="#3687FF">
                    수정
                </Button>
                <Button
                    onClick={() => {
                        setIsEditing(false);
                        setTargetIndex(null);
                    }}
                >
                    취소
                </Button>
            </div>
        </form>
    );
}
