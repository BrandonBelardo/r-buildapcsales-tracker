import Head from 'next/head' //use instead of head
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        color: white;
        background-color:rgb(50, 43, 56);
        font-family: "Nunito Sans", serif;
        margin: 8px 0px 0px;
        background: linear-gradient(0deg, rgb(37, 29, 43), rgb(50, 43, 56));
    }
    
    a {
      font-style: inherit;
      color: inherit;
      text-decoration: none;
      font-family: inherit;
    }   
`;


export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>MVP Starter</title>
                <meta name='description' content='Put a description here about your app' />
                <meta name='robots' content='index, follow' />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
                <link rel="manifest" href="/favicon_package/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" /> </Head>
            <GlobalStyle />
            <Component {...pageProps} ></Component>
        </>
    );
}
