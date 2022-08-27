import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
position:relative;
width: 100%;
height: 100vh;
padding-top:100px;
background:#eff3ff;
overflow:hidden;
`

const Wrap = styled.div`
position:relative;
z-index: 2;
width: 100%;
min-width: 1000px;
height: 100%;
min-height: 480px;
display: flex;
justify-content: center;
align-items: center;
`

const TextBox = styled.div`
    max-width:500px;
`

const TitleBox = styled.div`
width: 100%;
user-select: none;
`
const TitleTxt = styled.h2`
font-size: 40px;
font-weight: bold;
    
`
const DescBox = styled.div`
width: 100%;
margin: 30px 0 0;
user-select: none;
`
const DescTxt = styled.p`
line-height: 1.5;
    
`
const ButtonBox = styled.div`
width: 100%;
text-align: center;
margin: 80px 0 0;
    
`
const ViewMoreButton = styled(Link)`
display:inline-block;
line-height:54px;
text-align:center;
width: 150px;
height: 60px;
border-radius: 10px;
border: 2px solid ${props=> props.theme.btnColor};
background : ${props=> props.theme.btnColor};
color:#fff;
transition: background .6s ease-out, color .6s ease-out;
&:hover{
    background:#fff;
    color:${props=> props.theme.btnColor};
}
    
`

const ImgBox = styled.div`
max-width: 700px;
width: 100%;
margin-left:100px;
`
const Img = styled.img`
width: 100%;

`
const CircleBox = styled.div`
position:absolute;
z-index:1;
width: 100%;
height: 100%;
filter:blur(65px);
`

const Circle = styled.div`
position:absolute;
z-index:1;
left: 200px;
top:560px;
border-radius: 50%;
background: #3686ffc9;
box-shadow: 0 0 450px 140px ${props=> props.theme.btnColor};
`
const Circle1 = styled(Circle)`
left: 750px;
top:130px;
box-shadow: 0 0 300px 100px ${props=> props.theme.btnColor};
`
const Circle2 = styled(Circle)`
left: 1600px;
top:680px;
box-shadow: 0 0 260px 100px ${props=> props.theme.btnColor};
`


export default function Home() {
    const navigate = useNavigate();
    return (
    <Root>
        <CircleBox>
            <Circle />
            <Circle1 />
            <Circle2 />
        </CircleBox>
        <Wrap>
            <TextBox>
                <TitleBox>
                    <TitleTxt>
                        Welcome to WePo!!_
                    </TitleTxt>
                </TitleBox>
                <DescBox>
                    <DescTxt>
                        포트폴리오 공유 웹 서비스
                        <br />
                        우리들의 포트폴리오 WePo에 오신걸 환영합니다.
                    </DescTxt>
                </DescBox>
                <ButtonBox>
                    <ViewMoreButton to="/login">
                        시작하기
                    </ViewMoreButton>
                </ButtonBox>
            </TextBox>
            <ImgBox>
                <Img src={process.env.PUBLIC_URL + "/assets/image/homeConceptImg.png"} />
            </ImgBox>
        </Wrap>
    </Root>
    );
}
