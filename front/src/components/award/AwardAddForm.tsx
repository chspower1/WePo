import { useForm } from "react-hook-form";
import { addAward } from "../../api/api";
import { IAward } from "../../atoms";
import { useParams } from "react-router-dom";
import {
    MvpContentName,
    MvpAddInput,
    MvpAddInputBox,
    RequiredLabel,
    Button,
} from "../user/MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";
import { useEffect } from "react";

export default function AwardAddForm({ setAwards, maxDate, setAddFormActive }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IAward>({ mode: "onChange" });

    const onvalid = (data: IAward) => {
        setAwards((prev: any) => [...prev, data]); // 기존 DB에 data추가
        setAddFormActive(false);
        addAward(data);
    };

    useEffect(() => {
        setError("title", {
            type: "custom",
            message: "제목을 입력해주세요",
        });
        setError("grade", {
            type: "custom",
            message: "수상순위를 입력해주세요",
        });
        setError("date", {
            type: "custom",
            message: "수상을 한 날짜를 입력해주세요",
        });
        setError("org", {
            type: "custom",
            message: "기관명을 입력해주세요",
        });
        setError("description", {
            type: "custom",
            message: "상세설명을 입력해주세요",
        });
    }, []);
    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <RequiredLabel>*</RequiredLabel> 필수사항
                </p>
                <MvpContentName>
                    제목을 입력하세요 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    placeholder="제목"
                    {...register("title", {
                        required: "제목을 입력하세요!",
                        minLength: { value: 1, message: "제목을 입력하세요!" },
                    })}
                />
                {errors.title && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.title.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    수상순위을 입력하세요 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    placeholder="수상순위"
                    {...register("grade", {
                        required: "수상순위을 입력하세요!",
                        minLength: { value: 1, message: "수상순위을 입력하세요!" },
                    })}
                />
                {errors.grade && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.grade.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    날짜을 입력하세요 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="date"
                    width="130"
                    {...register("date", {
                        required: "날짜를 입력하세요!",
                        max: { value: maxDate, message: "수상을 한 날짜를 입력하세요!" },
                    })}
                />
                {errors.date && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.date.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    기관을 입력하세요 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    placeholder="기관"
                    {...register("org", {
                        required: "기관을 입력하세요!",
                        minLength: { value: 1, message: "기관을 입력하세요!" },
                    })}
                />
                {errors.org && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.org.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>
                    상세내용을 입력하세요 <RequiredLabel>*</RequiredLabel>
                </MvpContentName>
                <MvpAddInput
                    type="text"
                    placeholder="수상이력에 대한 설명을 간단하게 작성할 수 있습니다. 너무 길게말고 간단하게만 작성해주세요"
                    {...register("description", {
                        required: "상세설명을 입력하세요!",
                        minLength: { value: 1, message: "상세설명을 입력하세요!" },
                    })}
                />
                {errors.description && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.description.message}
                    </ErrMsg>
                )}
            </MvpAddInputBox>
            <div style={{ float: "right" }}>
                <Button color="#3687FF" type="submit">
                    추가
                </Button>
                <Button onClick={() => setAddFormActive(false)}>취소</Button>
            </div>
        </form>
    );
}
