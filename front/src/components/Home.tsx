import styled from "styled-components";

const Root = styled.div`
position:relative;
width: 100%;
height: 89vh;
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
const ViewMoreButton = styled.button`
width: 150px;
height: 60px;
border-radius: 10px;
border: 2px solid ${props=> props.theme.btnColor};
background: linear-gradient(120deg, #fdfdfd 50%, ${props=> props.theme.btnColor} 50%);
background-size: 280%;
transition: background .8s, color .6s;
&:hover{
    background-position: 90% 100%;
    color:#fff;
    transition-delay:color .4s ;
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
                    <ViewMoreButton>
                        더 알아보기
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
