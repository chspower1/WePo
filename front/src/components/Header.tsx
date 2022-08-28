import { Link, useLocation, NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { curUserState, isLoginState } from "../atoms";
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
    background-color: #eff3ff;
    transition: box-shadow 0.6s, background 0.6s;
    &.home {
        background-color: transparent;
    }
    &.active {
        box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.2);
        background-color: #fff;
    }
`;

export const HeaderContainer = styled.div`
    max-width: 1300px;
    min-width: 480px;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
`;
const Nav = styled.nav`
    background-color: transprent;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
/**
 *  정확한 페이지로 가면 active-style
 *  아니면 normal-style
 * @end v6는 exact가 기본 설정되어 있지만 확실하게 end 써주세요!
 * */
export const LinkButton = styled(NavLink)`
    text-align: center;
    position: relative;
    background-color: transparent;
    margin: 0 10px;
    font-weight: bold;
    color: #343434;
    font-size: 14px;
    &.active {
        position: relative;
        font-weight: bold;
        color: ${(props) => props.theme.btnColor};
        &:after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 3px;
            background-color: ${(props) => props.theme.btnColor};
        }
    }
    &:hover {
        animation: ${LinkHover} 0.8s forwards;
    }
`;

export const LogoBox = styled.div`
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
`;
export const LogoImg = styled.img`
    width: 100%;
`;

const LoginOrRegiBtn = styled.button`
    padding: 5px 15px;
    background: #343434;
    border-radius: 20px;
    color: ${(props) => props.theme.bgColor};
    border: 2px solid #343434;
    margin-left: 20px;
    letter-spacing: -0.4px;
    transition: all 0.4s;
    &:hover {
        background: ${(props) => props.theme.bgColor};
        color: #343434;
    }
`;

function Header() {
    const isLogin = useRecoilValue(isLoginState);
    const setCurUser = useSetRecoilState(curUserState);
    const location = useLocation();
    const pathName = location.pathname;

    const [navActive, setNavActive] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [scrollActive, setScrollActive] = useState(false);

    const scrollFixed = () => {
        if (scrollY > 100) {
            setScrollY(window.pageYOffset);
            setScrollActive(true);
        } else {
            setScrollY(window.pageYOffset);
            setScrollActive(false);
        }
    };

    useEffect(() => {
        const scrollListener = () => {
            window.addEventListener("scroll", scrollFixed);
        };
        scrollListener();
        return () => {
            window.removeEventListener("scroll", scrollFixed);
        };
    });

    const UserLogout = () => {
        localStorage.removeItem("recoil-persist");
        sessionStorage.removeItem("userToken");
        setCurUser(null);
    };
    return (
        <>
            <HeaderWrap
                className={`${pathName === "/" ? "home" : ""} ${scrollActive ? "active" : ""}`}
            >
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
                                <LinkButton to="/">홈</LinkButton>
                                <LinkButton to="/mypage">나의페이지</LinkButton>
                                <LinkButton to="/network" end>
                                    네트워크
                                </LinkButton>
                                <LoginOrRegiBtn onClick={UserLogout}>로그아웃</LoginOrRegiBtn>
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
