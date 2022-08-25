import { curUserState, IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function Award(info: IAward[]) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 자격증 상태
    const [awards, setAwards] = useState<IAward[]>([]);

    // form관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [oneByOne, setOneByOne] = useState(0);
    const newDate = new Date();
    const maxDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;

    // 추가사항 on/off
    function handleAdding() {
        setAddFormActive((current) => !current);
    }

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
                                            {list.description.split("\n").map((text) => (
                                                <>
                                                    {text}
                                                    <br />
                                                </>
                                            ))}
                                        </p>
                                        {/* shift+enter 시 \n으로 스플릿해서 그대로 보이게끔 */}
                                    </div>
                                )}
                                <p>{list.date}</p>
                                <p>{list.org}</p>
                                <div className="editBox">
                                    {curUser?.id === id && (
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
            {curUser?.id === id && <button onClick={handleAdding}>+</button>}
        </div>
    );
}
