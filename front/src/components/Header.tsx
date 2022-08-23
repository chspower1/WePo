import { Link } from "react-router-dom";
import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { isLoginState } from "../atoms";
const Nav = styled.nav`
    background-color: red;
`;
function Header() {
    const setIsLogin = useSetRecoilState(isLoginState);
    return (
        <Nav>
            <Link to="/portfolio">
                <button>나의페이지</button>
            </Link>
            <Link to="/network">
                <button>네트워크</button>
            </Link>
            <button onClick={() => setIsLogin(false)}>로그아웃</button>
        </Nav>
    );
}

export default Header;
