import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import SSRProvider from "react-bootstrap/SSRProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import { Favicon } from "../components/Favicon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Favicon />
      </Head>
      <ThemeProvider>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
