import { Link, useLocation, NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { curUserState, isLoginState } from "@/atoms";
import { useEffect, useState } from "react";


const LinkHover = keyframes`
    0%{color:#343434}
    15%{color:#ff6698}
    30%{color:#ffb366}
    45%{color:#eeee00}
    60%{color:#98ff66}
    80%{color:#6698ff}
    100%{color:#4b0082}
`;

const HeaderWrap = styled.header`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: transparent;
    transition: box-shadow 0.3s ease, background 0.3s ease; // 조건문 걸어서 처리
    &.active {
        border-bottom: 1px solid ${(props) => props.theme.headerBorderColor};
        background: ${(props) => props.theme.headerActiveColor};
    }
`;

export const HeaderContainer = styled.div`
    max-width: 1800px;
    min-width: 300px;
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
        padding: 0 20px;
    }
`;
const Nav = styled.nav`
    background-color: transprent;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media screen and (max-width: 500px) {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translate(-50%, 0);
        justify-content: center;
    }
`;

export const LinkButton = styled(NavLink)`
    text-align: center;
    position: relative;
    background-color: transparent;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    transition: color 0.3s;
    & + & {
        margin: 0 20px 0 30px;
    }
    &.active {
        position: relative;
        font-weight: bold;
        color: ${(props) => props.theme.btnColor};
        &:after {
            content: "";
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 3px;
            background-color: ${(props) => props.theme.btnColor};
        }
    }
    &:hover {
        // animation: ${LinkHover} 0.8s forwards;
        color: #839dc9;
    }
`;

export const LogoBox = styled.div`
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    @media screen and (max-width: 500px) {
        width: 120px;
    }
`;
export const LogoImg = styled.img`
    width: 100%;
`;
const MiniProfileImg = styled.img`
    object-fit: cover;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 2px solid gray;
`;
const MiniProfileName = styled.span`
    margin: 0px 20px 0px 10px;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 500px) {
        display: none;
    }
`;
const LoginOrRegiBtn = styled.button`
    padding: 5px 15px;
    background: ${(props) => props.theme.textColor};
    border-radius: 20px;
    color: ${(props) => props.theme.bgColor};
    border: 2px solid ${(props) => props.theme.textColor};
    margin-left: 20px;
    letter-spacing: -0.4px;
    transition: all 0.3s ease;
    font-size: 15px;
    &:hover {
        background: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
    }
    &:logout {
    }

    @media screen and (max-width: 500px) {
        font-size: 14px;
    }
`;
const MiniProfileBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

function Header() {
  const isLogin = useRecoilValue(isLoginState);
  const setCurUser = useSetRecoilState(curUserState);
  const location = useLocation();
  const pathName = location.pathname;
  const curUser = useRecoilValue(curUserState);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
    if (scrollY < 10) {
      setScrollActive(false);
    } else {
      setScrollActive(true);
    }
  });

  const UserLogout = () => {
    localStorage.removeItem("recoil-persist");
    sessionStorage.removeItem("userToken");
    setCurUser(null);
  };
  // 이미지 초기값 확인
  const pictureDefault = curUser?.picture?.split("/")[0] === "default_images";
  const findUserId =
    curUser?.picture?.split("_")[0] === curUser?.userId ? "" : curUser?.userId + "_";
  const notDefault = pictureDefault ? "" : findUserId;

  useEffect(() => {
    window.scrollTo(0, 0);
    setScrollY(0);
    setScrollActive(false);
  }, [pathName]);
  useEffect(() => { }, [curUser?.picture]);
  return (
    <>
      <HeaderWrap className={`${scrollActive ? "active" : ""}`}>
        <HeaderContainer>
          <Link to="/">
            <LogoBox>
              <LogoImg
                src={process.env.PUBLIC_URL + "/assets/image/Logo.svg"}
                alt="WepoLogo"
              />
            </LogoBox>
          </Link>
          <Nav>
            {isLogin ? (
              <>
                <LinkButton to="/network" end>
                  네트워크
                </LinkButton>
                <LinkButton to="/mypage">나의페이지</LinkButton>
                <MiniProfileBox>
                  <MiniProfileImg
                    src={`http://${window.location.hostname}:5001/uploads/${notDefault}${curUser?.picture}`}
                  />
                  <MiniProfileName className="mobileNone">
                    {(String(curUser?.name).length > 7) ? String(curUser?.name).slice(0, 7) + "..." : curUser?.name} 님
                  </MiniProfileName>
                </MiniProfileBox>
                <LoginOrRegiBtn onClick={UserLogout} className="logOut">
                  <>로그아웃</>
                </LoginOrRegiBtn>
              </>
            ) : pathName === "/login" ? (
              <>
                <LinkButton to="/">홈</LinkButton>
                <LinkButton to="/login" end>
                  로그인
                </LinkButton>
                <Link to={`/register`}>
                  <LoginOrRegiBtn>회원가입</LoginOrRegiBtn>
                </Link>
              </>
            ) : (
              <>
                <LinkButton to="/">홈</LinkButton>
                <LinkButton to="/register" end>
                  회원가입
                </LinkButton>
                <Link to={`/login`}>
                  <LoginOrRegiBtn>로그인</LoginOrRegiBtn>
                </Link>
              </>
            )}
          </Nav>
        </HeaderContainer>
      </HeaderWrap>
    </>
  );
}

export default Header;
