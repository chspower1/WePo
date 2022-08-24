import { IAward } from "../../atoms";
import { useForm } from "react-hook-form";
import { updateAward } from "../../api/api";
import { useParams } from "react-router-dom";

export default function AwardEditForm({
    index,
    awards,
    setAwards,
    setIsEditing,
    maxDate,
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
        <div>
            <form onSubmit={handleSubmit(onvalid)}>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="제목"
                        defaultValue={current.title}
                        {...register("title", {
                            required: "제목을 입력하세요!",
                            minLength: { value: 1, message: "제목을 입력하세요!" },
                        })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="상세제목"
                        defaultValue={current.grade}
                        {...register("grade", {
                            required: "상세제목을 입력하세요!",
                            minLength: { value: 1, message: "상세제목을 입력하세요!" },
                        })}
                    />
                    {errors.grade && <p>{errors.grade.message}</p>}
                </div>
                <div className="inputBox">
                    <textarea
                        placeholder="내용"
                        {...register("description", {
                            required: "내용을 입력하세요!",
                            minLength: { value: 1, message: "내용을 입력하세요!" },
                        })}
                        style={{ resize: "none" }}
                    >
                        {current.description}
                    </textarea>
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className="inputBox">
                    <input
                        type="date"
                        defaultValue={current.date}
                        {...register("date", {
                            required: "날짜를 입력하세요!",
                            max: { value: maxDate, message: "현재까지 수상 한 날짜를 입력하세요!" },
                        })}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="기관"
                        defaultValue={current.org}
                        {...register("org", {
                            required: "기관을 입력하세요!",
                            minLength: { value: 1, message: "기관을 입력하세요!" },
                        })}
                    />
                    {errors.org && <p>{errors.org.message}</p>}
                </div>
                <button>변경</button>
                <button
                    onClick={() => {
                        setIsEditing(false);
                    }}
                >
                    취소
                </button>
            </form>
        </div>
    );
}
