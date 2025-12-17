import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import SSRProvider from "react-bootstrap/SSRProvider";

// import "bootstrap/dist/css/bootstrap.min.css";
import { Favicon } from "../components/Favicon";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Favicon />
      </Head>
      <HeroUIProvider>
        {/* <ToastProvider placement="top-center" /> */}
        <ThemeProvider attribute="class" defaultTheme="system">
          <SSRProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SSRProvider>
        </ThemeProvider>
      </HeroUIProvider>
    </>
  );
}

export default MyApp;
