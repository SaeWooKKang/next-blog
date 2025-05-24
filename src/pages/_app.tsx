import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/globals.css';
import '../style/prism-one-light.css';

import { GoogleAnalytics } from '@next/third-parties/google';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>새우의 개발 블로그</title>
        <meta name="description" content="새우의 개발 블로그입니다." />
      </Head>

      <Component {...pageProps} />

      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''}
      />
    </>
  );
}

export default MyApp;
