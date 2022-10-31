import ReactDOM from "react-dom/client";
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

const queryClient = new QueryClient(); // react-query를 사용하기 위한 작업.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// index.tsx에 RecoilRoot 추가
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>
);