import React, { useEffect, useState } from 'react'
import styled,{keyframes} from "styled-components"
import { useNavigate } from "react-router-dom";


const Root = styled.div`
    position:relative;
    width: 100%;
    height: 100vh;
    padding-top:100px;
    background:${props=> props.theme.bgColor};
    overflow:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Header = styled.h1`
    width: 100%;
    font-size: 20px;
    font-weight: 400;
`;
const AccentWord = styled.span`
    color: #3867ff;
    font-size: 30px;
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
    width:100%;
    height:60px;
    background-color:#3867FF;
    border-radius:10px;
    color:white;
    &:hover{
        background-color rgba(55,103,255,0.8);
    }
`

export default function SuccessRegister(){
    const [change,setChange] = useState(false)
    const navigator = useNavigate();
    return(
            <Root>
                {change && <Test></Test>}
                <div style={{width:"50%",height:"300px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                    <div>
                        <Header><AccentWord>WEPO</AccentWord>회원가입을 축하드립니다  🎉🎉</Header>
                        <Header><AccentWord>WEPO</AccentWord>회원가입을 축하드립니다  🎉🎉</Header>
                    </div>
                    <div style={{marginTop:"50px"}}>
                        <h1 style={{fontSize:"20px"}}>저희 서비스를 모두 이용하실 수 있습니다</h1>
                    </div>
                    <div style={{marginTop:"50px",width:"35%",height:"auto"}}>
                        <NavigateButton onClick={()=>navigator("/login")}>로그인 페이지로 이동</NavigateButton>
                    </div>
                </div>
            </Root>  
    )
}