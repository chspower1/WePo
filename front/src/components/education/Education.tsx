import { useState } from "react";
import { IEducation } from "../../atoms";
import { useForm } from "react-hook-form";
import EducationEditForm from "./EducationEditForm";
import EducationAddForm from "./EducationAddForm";

export default function Education(info: IEducation[]) {
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 edit버튼 보임
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [oneByOne, setOneByOne] = useState(0); // index 를 체크해서 맞는 것만 editform 활성화

    const [currentData, setCurrentData] = useState({}); // 수정 시 기존에 있던 데이터 state

    const [educations, setEducations] = useState<IEducation[]>([]); // 더미educations 초기값

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
                />
            )}
            <button
                onClick={() => {
                    setAddFormActive(true);
                }}
            >
                +
            </button>
        </div>
    );
}
