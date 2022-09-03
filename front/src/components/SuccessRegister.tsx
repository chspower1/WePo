import { useEffect, useState } from 'react'
import styled, { keyframes } from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import { approveRegister } from '@api/api';



const Root = styled.div`
    position:relative;
    width: 100%;
    height: 100vh;
    padding:100px 0;
    background:${props => props.theme.bgColor};
    overflow:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Header = styled.h1`
    width: 100%;
    font-size: 36px;
    font-weight: 400;
    line-height: 1.6;
    word-break: keep-all;
    text-align: center;
`;
const AccentWord = styled.span`
    color: #3867ff;
    font-weight: 600;
`;
const shutdown = keyframes`
    0%{
        transform:translateY(-100%);
    }
    100%{
        transform:translateY(0%);
    }
`
const Test = styled.div`
    position:absolute;
    top:0%;
    width:100%;
    height:100%;
    background:red;
    z-index:9999;
    animation: ${shutdown} 0.5s ease-out;
`
const NavigateButton = styled.button`
    display: inline-block;
    font-size: 20px;
    padding: 20px 30px;
    background-color:#3867FF;
    border-radius:10px;
    color:white;
    &:hover{
        background-color rgba(55,103,255,0.8);
    }
`

export default function SuccessRegister() {
  const { userId } = useParams();
  const { authCode } = useParams();
  const [change, setChange] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    approveRegister(userId, authCode);
  }, [])
  return (
    <Root>
      {change && <Test></Test>}
      <div style={{ width: "50%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div>
          <Header>이메일 인증이 완료되었습니다.</Header>
        </div>
        <div style={{ marginTop: "60px"}}>
          <NavigateButton onClick={() => navigator("/login")}>WePo 로그인하기</NavigateButton>
        </div>
      </div>
    </Root>
  )
}