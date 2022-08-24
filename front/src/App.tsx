import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import Router from "./Router";
import "./font/font.css";
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
export const Btn = styled.button`
    padding: 15px 10px;
`;
export const Container = styled.section`
    display: flex;
    flex-direction: column;
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
