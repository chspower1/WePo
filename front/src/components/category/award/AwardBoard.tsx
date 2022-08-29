import React from "react";
import * as Board from "@styledComponents/CategoryStyled";
import { Trash2 } from "styled-icons/bootstrap";
import { Pencil } from "styled-icons/boxicons-solid";
export default function AwardBoard() {
    return null;
    // <>
    //         awards?.map((award, index) => (
    //             <Board.ContentBox key={index}>
    //                 {targetIndex !== index && (
    //                     <>
    //                         <div style={{ display: "flex", alignItems: "center" }}>
    //                             <Board.ContentAccent>{award.title}</Board.ContentAccent>
    //                             <Board.ContentDetail
    //                                 style={{
    //                                     marginTop: "20px",
    //                                     marginLeft: "20px",
    //                                 }}
    //                             >
    //                                 {award.grade}
    //                             </Board.ContentDetail>
    //                         </div>
    //                         <Board.ContentDetail>{award.org}</Board.ContentDetail>
    //                         <Board.ContentDate>
    //                             {String(award.date).slice(0, 10)}
    //                         </Board.ContentDate>
    //                         <Board.ContentDetail>{award.description}</Board.ContentDetail>
    //                         {curUser && pathName === "/mypage" && targetIndex !== index && (
    //                             <>
    //                                 <Board.EditButton
    //                                     onClick={() => {
    //                                         setIsEditing(true);
    //                                         setTargetIndex(index);
    //                                     }}
    //                                 >
    //                                     <Pencil color="#3867FF" />
    //                                 </Board.EditButton>
    //                                 <Board.DeleteButton
    //                                     onClick={() => {
    //                                         onClickDeleteBtn(award, index);
    //                                     }}
    //                                 >
    //                                     <Trash2 color="#3867FF" />
    //                                 </Board.DeleteButton>
    //                             </>
    //                         )}
    //                     </>
    //                 )}
    //             </Board.ContentBox>
    //         ))
    // </>
}
