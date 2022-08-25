import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { curUserState, isLoginState } from "../atoms";

const HeaderWrap = styled.header`
    width: 100%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;

export const HeaderContainer = styled.div`
    max-width: 1300px;
    min-width:480px;
    width:100%;
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

export const LinkButton = styled.button`
    position: relative;
    background-color: transparent;
    margin: 0 8px;
    font-weight: bold;
    color: #343434;
`;
export const ActivePath = styled.p`
    position: relative;
    margin: 0 10px;
    font-weight: bold;
    font-size: 14px;
    cursor: default;
    color: ${(props)=> props.theme.btnColor};
    &:after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        height: 3px;
        background-color: ${(props)=> props.theme.btnColor};
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
    color: ${(props)=> props.theme.bgColor};
    margin-left: 20px;
    letter-spacing: -0.4px;
`;

function Header() {
    const isLogin = useRecoilValue(isLoginState);
    const setCurUser = useSetRecoilState(curUserState);
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <HeaderWrap>
            <HeaderContainer>
                <Link to="/">
                    <LogoBox>
                        <LogoImg src="./assets/image/Logo.svg" alt="WepoLogo" />
                    </LogoBox>
                </Link>
                <Nav>
                    {isLogin ? (
                        <>
                            {pathName === "/" ? (
                                <>
                                    <ActivePath>나의페이지</ActivePath>
                                    <Link to="/network">
                                        <LinkButton>네트워크</LinkButton>
                                    </Link>
                                </>
                            ) : pathName === "/network" ? (
                                <>
                                    <Link to={`/`}>
                                        <LinkButton>나의페이지</LinkButton>
                                    </Link>
                                    <ActivePath>네트워크</ActivePath>
                                </>
                            ):(
                                <>
                                    <Link to={`/`}>
                                        <LinkButton>나의페이지</LinkButton>
                                    </Link>
                                    <Link to="/network">
                                        <LinkButton>네트워크</LinkButton>
                                    </Link>
                                </>
                            )}
                            <LoginOrRegiBtn onClick={() => setCurUser(null)}>
                                로그아웃
                            </LoginOrRegiBtn>
                        </>
                    ) : pathName === "/login" ? (
                        <>
                            <Link to="/network">
                                <LinkButton>네트워크</LinkButton>
                            </Link>
                            <ActivePath>로그인</ActivePath>
                            <Link to={`/register`}>
                                <LoginOrRegiBtn>회원가입</LoginOrRegiBtn>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/network">
                                <LinkButton>네트워크</LinkButton>
                            </Link>
                            <ActivePath>회원가입</ActivePath>
                            <Link to={`/login`}>
                                <LoginOrRegiBtn>로그인</LoginOrRegiBtn>
                            </Link>
                        </>
                    )}
                </Nav>
            </HeaderContainer>
        </HeaderWrap>
    );
}

export default Header;
