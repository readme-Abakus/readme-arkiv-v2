import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
