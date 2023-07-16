import { SWRConfig } from 'swr';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/prism-one-light.css';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }: AppProps<{ fallback: any; }>) {
  const { fallback } = pageProps;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Saewookkang&lsquo;s Blog</title>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <SWRConfig value={{ fallback }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
