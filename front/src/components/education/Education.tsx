import { useState } from "react";
import { curUserState, IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import EducationEditForm from "./EducationEditForm";
import EducationAddForm from "./EducationAddForm";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function Education(info: IEducation[]) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 학력 상태
    const [educations, setEducations] = useState<IEducation[]>([]); // 더미educations 초기값

    // form 관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 edit버튼 보임
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [oneByOne, setOneByOne] = useState(0); // index 를 체크해서 맞는 것만 editform 활성화

    function handleAdding() {
        setAddFormActive((current) => !current);
    }
    console.log(curUser);
    return (
        <div className="EduacationWrap">
            <div className="title">
                <h1>학력</h1>
            </div>
            {educations && (
                <ul>
                    {educations.map((list, index) => (
                        <li key={list.school + index}>
                            <div className="listInner">
                                <div className="contents">
                                    <div className="schoolName">{list.school}</div>
                                    <div className="descBox">
                                        <span className="majorName">{list.major}</span>
                                        <span className="status">{`(${list.status})`}</span>
                                    </div>
                                </div>
                                <div className="editBox">
                                    {editing && (
                                        <button
                                            onClick={() => {
                                                setIsEditing(true);
                                                setOneByOne(index);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                            {isEditing && index === oneByOne && (
                                <EducationEditForm
                                    index={index}
                                    educations={educations}
                                    setEducations={setEducations}
                                    setIsEditing={setIsEditing}
                                    id={id}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {addFormActive && (
                <EducationAddForm
                    setAddFormActive={setAddFormActive}
                    setEducations={setEducations}
                    id={id}
                />
            )}
            {curUser?.id === id && addFormActive ? null : <button onClick={handleAdding}>+</button>}
        </div>
    );
}
