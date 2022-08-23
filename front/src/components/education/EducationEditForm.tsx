import { IEducation } from '../../atoms';
import { useForm } from 'react-hook-form';

export default function EducationEditForm({ idx, DB, setDB, setIsEditing, currentData, setCurrentData }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IEducation>({ mode: 'onChange' });
  const onvalid = (data: IEducation, e: any) => {
    if (data.school === '' || data.major === '' || data.status === null) {
      alert('다시 확인해주세요');
      return;
    }
    const editData = [...DB];
    editData[idx] = data;
    setDB(editData);
    setCurrentData(data);
    setIsEditing(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onvalid)}>
        <div className="inputBox">
          <input type="text" placeholder="학교 이름" defaultValue={`${currentData.school}`} {...register('school')} />
        </div>
        <div className="inputBox">
          <input type="text" placeholder="전공" defaultValue={`${currentData.major}`} {...register('major')} />
        </div>
        <div className="radioBox">
          <input type="radio" {...register('status')} name="status" id="attending" value="재학중" />
          <label htmlFor="attending">재학중</label>
          <input type="radio" {...register('status')} name="status" id="bachelor" value="학사졸업" />
          <label htmlFor="bachelor">학사졸업</label>
          <input type="radio" {...register('status')} name="status" id="master" value="석사졸업" />
          <label htmlFor="master">석사졸업</label>
          <input type="radio" {...register('status')} name="status" id="doctor" value="박사졸업" />
          <label htmlFor="doctor">박사졸업</label>
        </div>
        <button>추가</button>
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
