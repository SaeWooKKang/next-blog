import { SWRConfig } from 'swr';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../style/globals.css';
import '../style/prism-one-light.css';

import { GoogleTagManager } from '@next/third-parties/google';

function MyApp({ Component, pageProps }: AppProps<{ fallback: any; }>) {
  const { fallback } = pageProps;

  return (
    <>
      <Head>
        <title>Saewookkang&lsquo;s Blog</title>

        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''} />
      </Head>

      <SWRConfig value={{ fallback }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
