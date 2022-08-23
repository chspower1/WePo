import { useState } from 'react';
import { IEducation } from '../../atoms';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { getUser } from '../../api/api';
import EducationEditForm from './EducationEditForm';

export default function Education(info: IEducation[]) {
  const [addFile, setAddFile] = useState(false);
  const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 보임
  const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
  const [oneByOne, setOneByOne] = useState(0);

  const [currentData, setCurrentData] = useState({});

  const [DB, setDB] = useState([
    {
      school: '',
      major: '',
      status: ''
    }
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IEducation>({ mode: 'onChange' });
  const onvalid = (data: IEducation) => {
    if (data.school === '' || data.major === '' || data.status === null) {
      alert('다시 확인해주세요');
      return;
    }
    setDB((prev) => [...prev, data]);
    setCurrentData(data);
    setAddFile(false);
    reset({
      school: '',
      major: '',
      status: ''
    });
  };

  return (
    <>
      <h1>학력</h1>
      {DB && (
        <ul>
          {DB.map((list, idx) => (
            <li>
              <div className="listInner">
                <div className="contents">
                  <div className="schoolName">{list.school}</div>
                  <div className="descBox">
                    <span className="majorName">{list.major}</span>
                    <span className="status">{list.status && `(${list.status})`}</span>
                  </div>
                </div>
                <div className="editBox">
                  {editing && idx !== 0 && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setOneByOne(idx);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              {isEditing && idx === oneByOne && <EducationEditForm idx={idx} DB={DB} setDB={setDB} setIsEditing={setIsEditing} currentData={currentData} setCurrentData={setCurrentData} />}
            </li>
          ))}
        </ul>
      )}
      {addFile && (
        <div>
          <form onSubmit={handleSubmit(onvalid)}>
            <div className="inputBox">
              <input type="text" placeholder="학교 이름" defaultValue={''} {...register('school')} />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="전공" defaultValue={''} {...register('major')} />
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
                setAddFile(false);
              }}
            >
              취소
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          setAddFile(true);
        }}
      >
        +
      </button>
    </>
  );
}
