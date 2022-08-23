import { Link } from "react-router-dom";
import styled from "styled-components";
const Nav = styled.nav`
    background-color: red;
`;
function Header() {
    return (
        <Nav>
            <Link to="/portfolio">
                <span>나의페이지</span>
            </Link>
            <Link to="/network">
                <span>네트워크</span>
            </Link>
            <Link to="/logout">
                <span>로그아웃</span>
            </Link>
        </Nav>
    );
}

export default Header;
