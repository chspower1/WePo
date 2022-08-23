import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
    ${reset}
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
