import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { isLoginState } from "../atoms";



const HeaderWrap =styled.header`
    width:100%;
    box-shadow: 0 2px 2px rgba(0,0,0,.2);
`

export const HeaderContainer = styled.div`
    width:1300px;
    height : 100px;
    margin : 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;

`
const Nav = styled.nav`
    background-color: transprent;
    width :100%;
    height:100%;
    display :flex;
    justify-content:flex-end;
    align-items: center;
`;

export const LinkButton = styled.button`
    position:relative;
    background-color:transparent;
    margin: 0 10px;
    font-weight: bold;
    color:#343434;
`
export const ActivePath = styled.p`
    position:relative;
    margin: 0 10px;
    font-weight: bold;
    font-size: 14px;
    cursor: default;
    color:#3687ff;
    &:after{
        content:'';
        position:absolute;
        bottom:-8px;
        left:50%;
        transform: translateX(-50%);
        width:70%;
        height:3px;
        background-color:#3687ff;
    }
`

export const LoginRegiButton = styled.button`
    padding:6px 20px;
    background: #000;
    color: #fff;
    border-radius: 30px;
`

export const LogoBox = styled.div`
    width :150px;
    height: 100%;
    display:flex;
    align-items: center;
`
export const LogoImg = styled.img`
    width:100%;
`

const LoginOrRegiBtn = styled.button`
    padding : 5px 15px;
    background:#343434;
    border-radius: 20px;
    color: #fff;
    margin-left:20px;
    letter-spacing: -0.4px;
`


function Header() {
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <HeaderWrap>
            <HeaderContainer>
                <LogoBox>
                    <LogoImg src="./assets/image/Logo.svg" alt="" />
                </LogoBox>
                <Nav>
                    {isLogin ? (
                        <>
                        {pathName === "/" ?
                            <>
                                <ActivePath>나의페이지</ActivePath>
                                <Link to="/network">
                                    <LinkButton>네트워크</LinkButton>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={`/`}>
                                    <LinkButton>나의페이지</LinkButton>
                                </Link>
                                <ActivePath>네트워크</ActivePath>
                            </>
                        }
                            <LoginOrRegiBtn onClick={() => setIsLogin(false)}>로그아웃</LoginOrRegiBtn>
                        </>
                    ):
                    pathName === '/login'?
                    <>
                        <ActivePath>로그인</ActivePath>
                        <Link to={`/register`}>
                            <LoginOrRegiBtn>회원가입</LoginOrRegiBtn>
                        </Link>
                    </>
                    :
                    <>
                        <ActivePath>회원가입</ActivePath>
                        <Link to={`/login`}>
                            <LoginOrRegiBtn>로그인</LoginOrRegiBtn>
                        </Link>
                    </>
                    }
                </Nav>
            </HeaderContainer>
        </HeaderWrap>
    );
}

export default Header;
