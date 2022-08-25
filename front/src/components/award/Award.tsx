import { IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useParams } from "react-router-dom";

export default function Award(info: IAward[]) {
    const { id } = useParams();
    const newDate = new Date();
    const maxDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;

    const [addFormActive, setAddFormActive] = useState(false);
    const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 edit버튼 보임
    const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
    const [oneByOne, setOneByOne] = useState(0); // index 를 체크해서 맞는 것만 editform 활성화
    const [awards, setAwards] = useState<IAward[]>([]); // 더미awards 초기값

    return (
        <div className="awardWrap">
            <div className="title">
                <h1>수상이력</h1>
            </div>
            {awards && (
                <ul>
                    {awards?.map((list, index) => (
                        <li key={list.title + index}>
                            <div className="contentsBox">
                                <h3>{list.title}</h3>
                                <p>{list.grade}</p>
                                {index !== 0 && (
                                    <div style={{ width: 200 }}>
                                        <p>
                                            {list.description}
                                        </p>
                                        {/* shift+enter 시 \n으로 스플릿해서 그대로 보이게끔 */}
                                    </div>
                                )}
                                <p>{list.date}</p>
                                <p>{list.org}</p>
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
                                <AwardEditForm
                                    index={index}
                                    awards={awards}
                                    setAwards={setAwards}
                                    setIsEditing={setIsEditing}
                                    maxDate={maxDate}
                                    id={id}
                                />
                            )}
                            {/* index === oneByOne 는 index를 찾아서 하나만 활성화 / 만약 다른 Edit버튼 누르면 원래 있던 건 사라지고 해당 list EditForm 만 활성화 */}
                        </li>
                    ))}
                </ul>
            )}
            {addFormActive && (
                <AwardAddForm
                    setAwards={setAwards}
                    maxDate={maxDate}
                    setAddFormActive={setAddFormActive}
                    id={id}
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
