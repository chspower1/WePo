import { IAward } from "@/atoms";
import { useForm } from "react-hook-form";
import { Category, updateData } from "@api/api";
import { useParams } from "react-router-dom";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";
import * as AwardStyled from "@styledComponents/CategoryStyled";
interface IAwardEditFromProps {
    index: number;
    awards: IAward[];
    setAwards: React.Dispatch<React.SetStateAction<IAward[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    maxDate: string;
    setTargetIndex: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
    userId: number;
    awardId: string;
}
export default function AwardEditForm({
    index,
    awards,
    setAwards,
    setIsEditing,
    maxDate,
    setTargetIndex,
    userId,
    awardId,
}: IAwardEditFromProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAward>({ mode: "onChange" });
    const onvalid = (data: IAward) => {
        updateData(data, Category.award, userId, awardId);
        setAwards((award) => {
            const newAward = [...award];
            newAward[index] = { ...data, userId, awardId };
            return newAward;
        });
        console.log(awards);
        setIsEditing(false);
        setTargetIndex(null);
    };
    const current = awards[index];

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <AwardStyled.AddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}>
                    <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel> 필수사항
                </p>
                <AwardStyled.ContentName>
                    제목 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>{" "}
                </AwardStyled.ContentName>
                <AwardStyled.AddInput
                    type="text"
                    width="300"
                    placeholder="제목"
                    defaultValue={current.title}
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
            </AwardStyled.AddInputBox>
            <AwardStyled.AddInputBox>
                <AwardStyled.ContentName>
                    수상순위 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>{" "}
                </AwardStyled.ContentName>
                <AwardStyled.AddInput
                    type="text"
                    width="300"
                    placeholder="상세제목"
                    defaultValue={current.grade}
                    {...register("grade", {
                        required: "상세제목을 입력하세요!",
                        minLength: { value: 1, message: "상세제목을 입력하세요!" },
                    })}
                />
                {errors.grade && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.grade.message}
                    </ErrMsg>
                )}
            </AwardStyled.AddInputBox>
            <AwardStyled.AddInputBox>
                <AwardStyled.ContentName>
                    날짜 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>{" "}
                </AwardStyled.ContentName>
                <AwardStyled.AddInput
                    type="date"
                    width="130"
                    placeholder="날짜를 입력하세요"
                    defaultValue={String(current.date).slice(0, 10)}
                    {...register("date", {
                        required: "날짜를 입력하세요",
                        max: { value: maxDate, message: "수상을 한 날짜를 입력하세요!" },
                    })}
                />
                {errors.date && (
                    <ErrMsg>
                        <DangerIcon />
                        {errors.date.message}
                    </ErrMsg>
                )}
            </AwardStyled.AddInputBox>
            <AwardStyled.AddInputBox>
                <AwardStyled.ContentName>
                    기관 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>{" "}
                </AwardStyled.ContentName>
                <AwardStyled.AddInput
                    type="text"
                    width="300"
                    placeholder="기관"
                    defaultValue={current.org}
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
            </AwardStyled.AddInputBox>
            <AwardStyled.AddInputBox>
                <AwardStyled.ContentName>
                    기관 <AwardStyled.RequiredLabel>*</AwardStyled.RequiredLabel>{" "}
                </AwardStyled.ContentName>
                <AwardStyled.AddInput
                    type="text"
                    width="300"
                    placeholder="상세설명"
                    defaultValue={current.description}
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
            </AwardStyled.AddInputBox>
            <div style={{ float: "right", marginBottom: "10px" }}>
                <AwardStyled.Button type="submit" color="#3687FF">
                    수정
                </AwardStyled.Button>
                <AwardStyled.Button
                    onClick={() => {
                        setIsEditing(false);
                        setTargetIndex(null);
                    }}
                >
                    취소
                </AwardStyled.Button>
            </div>
        </form>
        // <div>
        //     <form onSubmit={handleSubmit(onvalid)}>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="제목"
        //                 defaultValue={current.title}
        //                 {...register("title", {
        //                     required: "제목을 입력하세요!",
        //                     minLength: { value: 1, message: "제목을 입력하세요!" },
        //                 })}
        //             />
        //             {errors.title && <p>{errors.title.message}</p>}
        //         </div>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="상세제목"
        //                 defaultValue={current.grade}
        //                 {...register("grade", {
        //                     required: "상세제목을 입력하세요!",
        //                     minLength: { value: 1, message: "상세제목을 입력하세요!" },
        //                 })}
        //             />
        //             {errors.grade && <p>{errors.grade.message}</p>}
        //         </div>
        //         <div className="inputBox">
        //             <textarea
        //                 placeholder="내용"
        //                 {...register("description", {
        //                     required: "내용을 입력하세요!",
        //                     minLength: { value: 1, message: "내용을 입력하세요!" },
        //                 })}
        //                 style={{ resize: "none" }}
        //             >
        //                 {current.description}
        //             </textarea>
        //             {errors.description && <p>{errors.description.message}</p>}
        //         </div>
        //         <div className="inputBox">
        //             <input
        //                 type="date"
        //                 defaultValue={current.date}
        //                 {...register("date", {
        //                     required: "날짜를 입력하세요!",
        //                     max: { value: maxDate, message: "현재까지 수상 한 날짜를 입력하세요!" },
        //                 })}
        //             />
        //             {errors.date && <p>{errors.date.message}</p>}
        //         </div>
        //         <div className="inputBox">
        //             <input
        //                 type="text"
        //                 placeholder="기관"
        //                 defaultValue={current.org}
        //                 {...register("org", {
        //                     required: "기관을 입력하세요!",
        //                     minLength: { value: 1, message: "기관을 입력하세요!" },
        //                 })}
        //             />
        //             {errors.org && <p>{errors.org.message}</p>}
        //         </div>
        //         <button>변경</button>
        //         <button
        //             onClick={() => {
        //                 setIsEditing(false);
        //             }}
        //         >
        //             취소
        //         </button>
        //     </form>
        // </div>
    );
}
