import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme, darkTheme } from "./theme/theme";
import Router from "./Router";
import "./font/font.css";
import { useRecoilState} from "recoil";
import { isDarkState, isLoginState } from "./atoms";
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
    html{
        overflow-y:scroll;
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
    const [isDark, setIsDark] = useRecoilState(isDarkState);
    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
