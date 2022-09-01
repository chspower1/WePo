import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";

const Root = styled.div`
position:relative;
width: 100%;
height: 100vh;
padding-top:100px;
background:${props=> props.theme.bgColor};
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
background: url(${process.env.PUBLIC_URL + "/assets/image/waveBg3.png"}) no-repeat left 50% bottom -80px/contain;
`

const fadeInUp = keyframes`
0% {
    opacity: 0;
    transform: translate(0, 25px);
}
100% {
    opacity: 1;
    transform: translate(0, 0);
}
`;

const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const TextBox = styled.div`
max-width:500px;
margin: 0 0 80px 100px;
color:${props=>props.theme.textColor};
`

const TitleBox = styled.div`
width: 100%;
user-select: none;
opacity: 0;
animation: ${fadeInUp} .8s .6s forwards;
`
const TitleTxt = styled.h2`
position: relative;
font-family: 'Montserrat', sans-serif;
font-size: 45px;
font-weight: bold;
&:after {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props=>props.theme.filedBgColor};
}
`
const DescBox = styled.div`
width: 100%;
margin: 40px 0 0;
user-select: none;
opacity: 0;
animation: ${fadeInUp} .8s .6s forwards;
`
const DescTxt = styled.p`
line-height: 2;
font-size: 18px;
color: #676767;    
`
const ButtonBox = styled.div`
width: 100%;
margin: 60px 0 0;
opacity: 0;
animation: ${fadeIn} 1s 1s forwards;    
`
const ViewMoreButton = styled(Link)`
display:flex;
justify-content: center;
align-items: center;
line-height:54px;
width: 150px;
height: 50px;
border-radius: 10px;
background : ${props=> props.theme.btnColor};
color:#fff;
transition: background .3s ease-out, width .3s ease-out;
&:hover{
    width: 170px;
    background: #296ee5;

    & > svg {
        width: 30px;
        margin-left: 10px;
    }
}
    
`
const ArrowIcon = styled(ArrowRightShort)`
    width: 0;
    height: 30px;
    transition: width .4s;
`;

const ImgBox = styled.div`
max-width: 800px;
width: 100%;
margin-left: 180px;
opacity: 0;
animation: ${fadeIn} 2.4s forwards;  
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
box-shadow: 0 0 450px 140px ${props=> props.theme.circleColor};
`
const Circle1 = styled(Circle)`
left: 750px;
top:130px;
box-shadow: 0 0 300px 100px ${props=> props.theme.circleColor};
`
const Circle2 = styled(Circle)`
left: 1600px;
top:680px;
box-shadow: 0 0 260px 100px ${props=> props.theme.circleColor};
`


export default function Home() {
    const navigate = useNavigate();
    return (
    <Root>
        <CircleBox>
            {/* <Circle /> */}
            {/* <Circle1 /> */}
            {/* <Circle2 /> */}
        </CircleBox>
        <Wrap>
            <TextBox>
                <TitleBox>
                    <TitleTxt>
                        Welcome to WePo
                    </TitleTxt>
                </TitleBox>
                <DescBox>
                    <DescTxt>
                        우리들의 포트폴리오 공유 웹 서비스
                        <br />
                        WePo에 오신걸 환영합니다.
                    </DescTxt>
                </DescBox>
                <ButtonBox>
                    <ViewMoreButton to="/login">
                        시작하기<ArrowIcon />
                    </ViewMoreButton>
                </ButtonBox>
            </TextBox>
            <ImgBox>
                <Img src={process.env.PUBLIC_URL + "/assets/image/homeConceptImg2.png"} />
            </ImgBox>
        </Wrap>
    </Root>
    );
}
