import { IAward } from "../../atoms";
import { useState } from 'react';
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";

export default function Award( info : IAward[]) {
  const newDate = new Date();
  const maxDate = `${newDate.getFullYear()}-${String(newDate.getMonth()+1).padStart(2,"0")}-${String(newDate.getDate()).padStart(2,"0")}`

  const [addFormActive, setAddFormActive] = useState(false);
  const [editing, setEditing] = useState(true); // userId와 대조해서 맞으면 edit버튼 보임
  const [isEditing, setIsEditing] = useState(false); // edit버튼 눌러서 editform 활성화
  const [oneByOne, setOneByOne] = useState(0); // idx 를 체크해서 맞는 것만 editform 활성화


  const [DB, setDB] = useState<IAward[]>([]); // 더미DB 초기값
    
    return (
        <div className="awardWrap">
            <div className="title">
              <h1>수상이력</h1>
            </div>
            {DB && (
              <ul>
                {DB.map((list, idx) => (
                  <li key={list.title + idx}>
                    <div className="contentsBox">
                      <h3>{list.title}</h3>
                      <p>{list.grade}</p>
                      {idx !== 0 && <div style={{width:200}}>
                        <p>{list.description.split("\n").map(text=>(
                          <>{text}<br /></>
                        ))}</p>{/* shift+enter 시 \n으로 스플릿해서 그대로 보이게끔 */}
                      </div>}
                      <p>{list.date}</p>
                      <p>{list.org}</p>
                      <div className="editBox">
                        {editing &&(
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
                    {isEditing && idx === oneByOne && <AwardEditForm idx={idx} DB={DB} setDB={setDB} setIsEditing={setIsEditing}  maxDate={maxDate} />}
                    {/* idx === oneByOne 는 idx를 찾아서 하나만 활성화 / 만약 다른 Edit버튼 누르면 원래 있던 건 사라지고 해당 list EditForm 만 활성화 */}
                  </li>
                ))}
              </ul>
            )}
            {addFormActive &&
              <AwardAddForm setDB={setDB}  maxDate={maxDate} setAddFormActive={setAddFormActive} />
            }
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
