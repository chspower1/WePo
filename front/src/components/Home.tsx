import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Root = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    padding-top: 100px;
    background: ${(props) => props.theme.bgColor};
    overflow: hidden;
`;

const Wrap = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    min-height: 480px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${process.env.PUBLIC_URL + "/assets/image/waveBg3.png"}) no-repeat left 50%
        bottom -80px / contain;
 
    @media screen and (max-width: 800px) {
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 40px;
        background-position: 50% 100%;
        background-size: 150%;
    }
`;

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
    max-width: 500px;
    margin: 0 0 80px 100px;
    color: ${(props) => props.theme.textColor};

    @media screen and (max-width: 800px) {
        max-width: none;
        width: 100%;
        text-align: center;
        margin: 0px 140px 50px;
    }
`;

const TitleBox = styled.div`
    user-select: none;
    opacity: 0;
    animation: ${fadeInUp} 0.8s 0.6s forwards;
`;
const TitleTxt = styled.h2`
    position: relative;
    display: inline-block;
    font-family: "Montserrat", sans-serif;
    font-size: 45px;
    font-weight: bold;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: -10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${(props) => props.theme.filedBgColor};
    }

    @media screen and (max-width: 500px) {
        font-size: 36px;
        line-height: 1.5;
    }
`;
const DescBox = styled.div`
    width: 100%;
    margin: 40px 0 0;
    user-select: none;
    opacity: 0;
    animation: ${fadeInUp} 0.8s 0.6s forwards;
`;
const DescTxt = styled.p`
    line-height: 2;
    font-size: 18px;
    color: ${props =>props.theme.textColor};

    @media screen and (max-width: 500px) {
        font-size: 15px;
    }
`;
const ButtonBox = styled.div`
    width: 100%;
    margin: 60px 0 0;
    opacity: 0;
    animation: ${fadeIn} 1s 1s forwards;

    @media screen and (max-width: 500px) {
        margin: 30px 0 0;
    }
`;
const ViewMoreButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 54px;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background: ${(props) => props.theme.btnColor};
    color: #fff;
    transition: background 0.3s ease-out, width 0.3s ease-out;
    &:hover {
        width: 170px;
        background: #296ee5;

        & > svg {
            width: 30px;
            margin-left: 10px;
        }
    }

    @media screen and (max-width: 800px) {
        margin: 0 auto;
        font-size: 14px;
        width: 110px;
        height: 45px;
    }
`;
const ArrowIcon = styled(ArrowRightShort)`
    width: 0;
    height: 30px;
    transition: width 0.4s;
`;

const ImgBox = styled.div`
    max-width: 800px;
    width: 100%;
    min-width: 360px;
    margin-left: 10%;
    opacity: 0;
    animation: ${fadeIn} 2.4s forwards;

    @media screen and (max-width: 800px) {
        width: 80%;
        margin: 0 auto;
    }

    @media screen and (max-width: 500px) {
        width: 90%;
    }
`;
const Img = styled.img`
    width: 100%;
    opacity: ${(props) => props.theme.imgOpacity};
`;
export default function Home() {
  const [cookies, setCookies, removeCookies] = useCookies(["rememberEmail", "rememberPassword"]);
  useEffect(() => {
    if (cookies.rememberEmail === undefined) {
      setCookies("rememberEmail", "");
    }
  }, []);

  return (
    <Root>
      <Wrap>
        <TextBox>
          <TitleBox>
            <TitleTxt>Welcome to WePo</TitleTxt>
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
              시작하기
              <ArrowIcon />
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
