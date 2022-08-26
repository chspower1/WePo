import { IAward } from "../../atoms";
import { useForm } from "react-hook-form";
import { updateAward } from "../../api/api";
import { useParams } from "react-router-dom";
import { MvpContentName,MvpAddInput, MvpAddInputBox, RequiredLabel,Button } from "../MyPortfolio";
import { DangerIcon, ErrMsg } from "../user/LoginForm";
export default function AwardEditForm({
    index,
    awards,
    setAwards,
    setIsEditing,
    maxDate,
    setTargetIndex,
    id,
}: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAward>({ mode: "onChange" });
    const onvalid = (data: IAward) => {
        const editData = [...awards];
        editData[index] = data;
        setAwards(editData);
        setIsEditing(false);
        updateAward(data, id!);
    };
    const current = awards[index];

    return (
        <form onSubmit={handleSubmit(onvalid)}>
            <MvpAddInputBox>
                <p style={{ position: "absolute", right: "20px", top: "20px" }}><RequiredLabel>*</RequiredLabel> 필수사항</p>
                <MvpContentName>제목 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput 
                    type="text"
                    width="300"
                    placeholder="제목"
                    defaultValue={current.title}
                    {...register("title", {
                        required: "제목을 입력하세요!",
                        minLength: { value: 1, message: "제목을 입력하세요!" },
                    })}
                    />
                {errors.title && <ErrMsg><DangerIcon/>{errors.title.message}</ErrMsg>}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>수상순위 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    placeholder="상세제목"
                    defaultValue={current.grade}
                    {...register("grade", {
                        required: "상세제목을 입력하세요!",
                        minLength: { value: 1, message: "상세제목을 입력하세요!" },
                    })}
                />
                {errors.grade && <ErrMsg><DangerIcon/>{errors.grade.message}</ErrMsg>}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>날짜 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                    <MvpAddInput
                        type="date"
                        width="130"
                        placeholder="날짜를 입력하세요"
                        defaultValue={current.date}
                        {...register('date',{
                            required:"날짜를 입력하세요",
                            max: { value: maxDate, message: "수상을 한 날짜를 입력하세요!" }
                        })}
                    />
                {errors.date && <ErrMsg><DangerIcon/>{errors.date.message}</ErrMsg>}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>기관 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    placeholder="기관"
                    defaultValue={current.org}
                    {...register("org", {
                        required: "기관을 입력하세요!",
                        minLength: { value: 1, message: "기관을 입력하세요!" },
                    })}
                />
                {errors.org && <ErrMsg><DangerIcon/>{errors.org.message}</ErrMsg>}
            </MvpAddInputBox>
            <MvpAddInputBox>
                <MvpContentName>기관 <RequiredLabel>*</RequiredLabel> </MvpContentName>
                <MvpAddInput
                    type="text"
                    width="300"
                    placeholder="상세설명"
                    defaultValue={current.description}
                    {...register("org", {
                        required: "상세설명을 입력하세요!",
                        minLength: { value: 1, message: "상세설명을 입력하세요!" },
                    })}
                />
                {errors.description && <ErrMsg><DangerIcon/>{errors.description.message}</ErrMsg>}
            </MvpAddInputBox>
            <div style={{float:"right",marginBottom:"10px"}}>
                <Button type="submit" color="#3687FF">수정</Button>
                <Button onClick={()=> {setIsEditing(false); setTargetIndex(null)}}>취소</Button>
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
