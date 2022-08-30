import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { curUserState, isLoginState } from "@/atoms";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
        border: 1px solid #f0f0f9;
        background-color: #fff;
    }
`;

export const HeaderContainer = styled.div`
    max-width: 1800px;
    min-width: 480px;
    width: 100%;
    height: 80px;
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
    font-weight: bold;
    color: #343434;
    font-size: 16px;
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
const MiniProfileImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 2px solid gray;
`;
const MiniProfileName = styled.span`
    margin: 0px 20px 0px 10px;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
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
    font-size: 15px;
    &:hover {
        background: ${(props) => props.theme.bgColor};
        color: #343434;
    }
`;

const SearchBox = styled.form`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Input = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: 2px solid ${(props) => props.theme.btnColor};
    }
`;
function Header() {
    const isLogin = useRecoilValue(isLoginState);
    const setCurUser = useSetRecoilState(curUserState);
    const location = useLocation();
    const pathName = location.pathname;
    const curUser = useRecoilValue(curUserState);
    const [navActive, setNavActive] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [scrollActive, setScrollActive] = useState(false);
    const { register, handleSubmit } = useForm();
    const navigator = useNavigate();
    const onvalid = (data: any) => {
        console.log(data);
        navigator("/search");
    };
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
                    <SearchBox onSubmit={handleSubmit(onvalid)}>
                        <Input
                            type="text"
                            placeholder="찾고싶은 정보를 검색해주세요!"
                            {...register("search", {
                                required: "검색어를 입력해주세요!",
                            })}
                        />

                        <button>클릭</button>
                    </SearchBox>
                    <Nav>
                        {isLogin ? (
                            <>
                                <LinkButton to="/network" end>
                                    네트워크
                                </LinkButton>
                                <LinkButton to="/mypage">나의페이지</LinkButton>
                                <MiniProfileImg src={curUser?.picture} />
                                <MiniProfileName>{curUser?.name} 님</MiniProfileName>
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
