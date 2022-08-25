import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import Router from "./Router";
import "./font/font.css";
import { useRecoilValue } from "recoil";
import { isLoginState } from "./atoms";
import { useNavigate, Navigator } from "react-router-dom";
import { useEffect } from "react";
const GlobalStyle = createGlobalStyle`
    ${reset}
    html,body,#root{
        font-family: "Elice";
        width:100%;
        height:100%;
    }
    *{
        font-family: "Elice";
        text-decoration: none;
        box-sizing: border-box;
    }

    button{
        cursor: pointer;
        border: 0;
        background: transparent;
    }
    img{
        width:100%;
    }
`;
function App() {
    
    return (
        <>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
