import { SWRConfig } from "swr";
import Head from "next/head";
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps<{ fallback: any }>) {
  const { fallback } = pageProps;

  return (
    <>
      <Head>
        <title>Pac&lsquo;s Blog</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp
