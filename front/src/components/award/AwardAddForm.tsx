import { useForm } from "react-hook-form";
import { IAward } from "../../atoms";

export default function AwardAddForm({setDB, maxDate, setAddFormActive}:any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IAward>({ mode: 'onChange' });
    const onvalid = (data: IAward) => {
        setDB((prev:any) => [...prev, data]);// 기존 DB에 data추가
        setAddFormActive(false); 
        reset({
            title: '',
            grade: '',
            org: '',
            date: maxDate,
            description: '',
        });// 추가 시 inputValue 초기화
    };
    return (
        <div className='formWrap'>
            <form onSubmit={handleSubmit(onvalid)}>
                <div className="inputBox">
                <input type="text" placeholder="제목" defaultValue={""} {...register("title", { required: '제목을 입력하세요!', minLength: { value: 1, message: '제목을 입력하세요!' } })} />
                {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div className="inputBox">
                <input type="text" placeholder="상세제목" defaultValue={""} {...register("grade", { required: '상세제목을 입력하세요!', minLength: { value: 1, message: '상세제목을 입력하세요!' } })} />
                {errors.grade && <p>{errors.grade.message}</p>}
                </div>
                <div className="inputBox">
                <textarea  placeholder="내용" {...register("description", { required: '내용을 입력하세요!', minLength: { value: 1, message: '내용을 입력하세요!' } })} style={{resize: "none"}} ></textarea>
                {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className="inputBox">
                <input type="date" defaultValue={maxDate} {...register("date", { required: '날짜를 입력하세요!', max: { value: maxDate, message: '수상 한 날짜를 입력하세요!' } })} />
                {errors.date && <p>{errors.date.message}</p>}
                </div>
                <div className="inputBox">
                <input type="text" placeholder="기관" defaultValue={""} {...register("org", { required: '기관을 입력하세요!', minLength: { value: 1, message: '기관을 입력하세요!' } })} />
                {errors.org && <p>{errors.org.message}</p>}
                </div>
                <button>추가</button>
                <button
                onClick={() => {
                    setAddFormActive(false);
                    reset({
                    title: '',
                    grade: '',
                    description: '',
                    date: maxDate,
                    org: '',
                    });
                }}
                >
                취소
                </button>
            </form>
        </div>
    )
}
