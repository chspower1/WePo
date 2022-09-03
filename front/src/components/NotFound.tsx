import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ArrowRightShort } from "styled-icons/bootstrap";
import { Error } from "@styled-icons/boxicons-regular/Error";

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
    min-width: 1000px;
    height: 100%;
    min-height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${process.env.PUBLIC_URL + "/assets/image/waveBg3.png"}) no-repeat left 50%
        bottom -110px / contain;
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
`;

const TitleBox = styled.div`
    width: 100%;
    user-select: none;
    opacity: 0;
    animation: ${fadeInUp} 0.8s 0.6s forwards;
`;
const TitleTxt = styled.h2`
    display: flex;

    position: relative;
    font-family: "Montserrat", sans-serif;
    font-size: 45px;
    font-weight: 900;
    margin: 30px 0px;
`;
const NotFoundTitle = styled(TitleTxt)`
    /* border: 3px solid tomato; */
    background-color: #ffe0e0;
    padding: 15px;
    border-radius: 15px;
    /* color: #ffe0e0; */
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
    color: #676767;
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0px 0 0;
    opacity: 0;
    animation: ${fadeIn} 1s 1s forwards;
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
`;
const ArrowIcon = styled(ArrowRightShort)`
    width: 0;
    height: 30px;
    transition: width 0.4s;
`;

const ImgBox = styled.div`
    max-width: 600px;
    width: 100%;
    margin-left: 100px;
    opacity: 0;
    animation: ${fadeIn} 2.4s forwards;
`;
const Img = styled.img`
    width: 100%;
`;
const CircleBox = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    filter: blur(65px);
`;

export default function NotFound() {
  return (
    <Root>
      <Wrap>
        <TextBox>
          <TitleBox>
            <NotFoundTitle>
              <Error size={44} color={"tomato"} style={{ marginRight: "10px" }} /> 404
              Not Found
            </NotFoundTitle>
            <TitleTxt>없는 페이지입니다 :-(</TitleTxt>
          </TitleBox>
          <DescBox>
            <DescTxt>
              <br />
            </DescTxt>
          </DescBox>
          <ButtonBox>
            <ViewMoreButton to="/">
              홈으로 돌아가기
              <ArrowIcon />
            </ViewMoreButton>
          </ButtonBox>
        </TextBox>
        <ImgBox>
          <Img src={process.env.PUBLIC_URL + "/assets/image/notFound.png"} />
        </ImgBox>
      </Wrap>
    </Root>
  );
}
