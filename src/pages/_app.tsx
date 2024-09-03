import { SWRConfig } from 'swr';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/globals.css';
import '../style/prism-one-light.css';

import { GoogleAnalytics } from '@next/third-parties/google';

function MyApp({ Component, pageProps }: AppProps<{ fallback: any; }>) {
  const { fallback } = pageProps;

  return (
    <>
      <Head>
        <title>새우의 개발 블로그</title>
        <meta name="description" content="새우의 개발 블로그입니다." />
      </Head>

      <SWRConfig value={{ fallback }}>
        <Component {...pageProps} />

        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''}
        />
      </SWRConfig>
    </>
  );
}

export default MyApp;
