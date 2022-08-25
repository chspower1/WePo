import { curUserState, IAward } from "../../atoms";
import { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardAddForm from "./AwardAddForm";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
    MvpContainer,
    MvpTitle,
    MvpTitleBox,
    MvpContentContainer,
    MvpContentBox,
    MvpContentDetail,
    MvpContentDate,
    MvpEditButton,
    MvpAddButton,
    MvpDeleteButton,
    MvpContentAccent,
} from "../MyPortfolio";
import { PlusSquareFill } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
import { Trash2 } from "styled-icons/feather";

export default function Award(info: IAward[]) {
    // user ID
    const { id } = useParams();
    // 현재 로그인 유저
    const curUser = useRecoilValue(curUserState);
    // 자격증 상태
    const [awards, setAwards] = useState<IAward[]>([]);

    // form관리
    const [addFormActive, setAddFormActive] = useState(false);
    const [editing,setEditing] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [targetIndex, setTargetIndex] = useState<Number>();
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
        <MvpContainer>
            <MvpTitleBox>
                <MvpTitle>수상경력</MvpTitle>
            </MvpTitleBox>
            <MvpContentContainer>
                {addFormActive && (
                    <AwardAddForm setAwards={setAwards} maxDate={maxDate} setAddFormActive={setAddFormActive} id={id}/>
                )}
                {!addFormActive && awards.map((list,index) =>(
                    <MvpContentBox>
                        {targetIndex !== index && (
                            <>
                                <div style={{display:"flex", alignItems:"center"}}>
                                    <MvpContentAccent>{list.title}</MvpContentAccent>
                                    <MvpContentDetail style={{marginTop:"20px",marginLeft:"20px"}}>{list.grade}</MvpContentDetail>
                                </div>
                                <MvpContentDetail>{list.org}</MvpContentDetail>
                                <MvpContentDate>{list.date}</MvpContentDate>
                                <MvpContentDetail>{list.description}</MvpContentDetail>
                                {editing && targetIndex !== index && (
                                    <>
                                        <MvpEditButton onClick={()=>{setIsEditing(true); setTargetIndex(index)}}><Pencil color="#3867FF"/></MvpEditButton>
                                        <MvpDeleteButton><Trash2 color="#3867FF"/></MvpDeleteButton>
                                    </>
                                )}
                            </>
                        )}
                        {isEditing && targetIndex == index && (
                                    <AwardEditForm index={index} awards={awards} setAwards={setAwards} setIsEditing={setIsEditing} maxDate={maxDate} id={id} setTargetIndex={setTargetIndex} />
                        )}
                    </MvpContentBox>
                ))}
            </MvpContentContainer>
            <MvpAddButton onClick={handleAdding}>
                <PlusSquareFill color="#3687FF" />
            </MvpAddButton>
            {/* {curUser?.id === id && <MvpAddButton onClick={handleAdding}>
                <PlusSquareFill color="#3687FF" />
            </MvpAddButton>} */}
        </MvpContainer>
        // <div className="awardWrap">
        //     <div className="title">
        //         <h1>수상이력</h1>
        //     </div>
        //     {awards && (
        //         <ul>
        //             {awards?.map((list, index) => (
        //                 <li key={list.title + index}>
        //                     <div className="contentsBox">
        //                         <h3>{list.title}</h3>
        //                         <p>{list.grade}</p>
        //                         {index !== 0 && (
        //                             <div style={{ width: 200 }}>
        //                                 <p>
        //                                     {list.description}
        //                                 </p>
        //                                 {/* shift+enter 시 \n으로 스플릿해서 그대로 보이게끔 */}
        //                             </div>
        //                         )}
        //                         <p>{list.date}</p>
        //                         <p>{list.org}</p>
        //                         <div className="editBox">
        //                             {curUser?.id === id && (
        //                                 <button
        //                                     onClick={() => {
        //                                         setIsEditing(true);
        //                                         setOneByOne(index);
        //                                     }}
        //                                 >
        //                                     Edit
        //                                 </button>
        //                             )}
        //                         </div>
        //                     </div>
        //                     {isEditing && index === oneByOne && (
        //                         <AwardEditForm
        //                             index={index}
        //                             awards={awards}
        //                             setAwards={setAwards}
        //                             setIsEditing={setIsEditing}
        //                             maxDate={maxDate}
        //                             id={id}
        //                         />
        //                     )}
        //                     {/* index === oneByOne 는 index를 찾아서 하나만 활성화 / 만약 다른 Edit버튼 누르면 원래 있던 건 사라지고 해당 list EditForm 만 활성화 */}
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        //     {addFormActive && (
        //         <AwardAddForm
        //             setAwards={setAwards}
        //             maxDate={maxDate}
        //             setAddFormActive={setAddFormActive}
        //             id={id}
        //         />
        //     )}
        //     {curUser?.id === id && <button onClick={handleAdding}>+</button>}
        // </div>
    );
}
