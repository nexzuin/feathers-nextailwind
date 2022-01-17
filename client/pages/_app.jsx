import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import { AppWrapper } from "@/context/appWrapper";

export default function Application({ Component, ...pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
