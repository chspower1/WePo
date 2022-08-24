import { IEducation } from '../../atoms';
import { useForm } from 'react-hook-form';

export default function EducationAddForm({  setDB, setAddFormActive}:any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IEducation>({ mode: 'onChange' });
    const onvalid = (data: IEducation) => {
        setDB((prev:any) => [...prev, data]); // 기존 DB에 data추가
        setAddFormActive(false);
        reset({
            school: '',
            major: '',
            status: ''
        });// 추가 시 inputValue 초기화
    };
    return (
        <div className='formWrap'>
            <form onSubmit={handleSubmit(onvalid)}>
                <div className="inputBox">
                <input type="text" placeholder="학교 이름" defaultValue={''} {...register('school', { required: '학교 이름을 입력하세요!', minLength: { value: 1, message: '학교 이름을 입력하세요!' } })} />
                {errors.school && <p>{errors.school.message}</p>}
                </div>
                <div className="inputBox">
                <input type="text" placeholder="전공" defaultValue={''} {...register('major', { required: '자신의 전공을 입력하세요!', minLength: { value: 1, message: '자신의 전공을 입력하세요!' } })} />
                {errors.major && <p>{errors.major.message}</p>}
                </div>
                <div className="radioBox">
                <input type="radio" {...register('status', { required: '필수 입력 입니다.' })} name="status" id="attending" value="재학중" />
                <label htmlFor="attending">재학중</label>
                <input type="radio" {...register('status', { required: '필수 입력 입니다.' })} name="status" id="bachelor" value="학사졸업" />
                <label htmlFor="bachelor">학사졸업</label>
                <input type="radio" {...register('status', { required: '필수 입력 입니다.' })} name="status" id="master" value="석사졸업" />
                <label htmlFor="master">석사졸업</label>
                <input type="radio" {...register('status', { required: '필수 입력 입니다.' })} name="status" id="doctor" value="박사졸업" />
                <label htmlFor="doctor">박사졸업</label>
                {errors.status && <p>{errors.status.message}</p>}
                </div>
                <button>추가</button>
                <button
                onClick={() => {
                    setAddFormActive(false);
                    reset({
                    school: '',
                    major: '',
                    status: ''
                    });
                }}
                >
                취소
                </button>
            </form>
        </div>
    )
}
