// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App, { GlobalStyle } from "./App.tsx";
import { defaultTheme } from "./theme.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>
);
