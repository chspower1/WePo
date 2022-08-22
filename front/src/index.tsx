import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { lightTheme } from "./theme";

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
