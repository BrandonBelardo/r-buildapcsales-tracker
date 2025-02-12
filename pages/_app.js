import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #1b1b1b;
    color: white;
    text-align: center;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle />
    <Component {...pageProps} />
    </>
  );
}
