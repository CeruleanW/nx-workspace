import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AppProvider } from '../providers';
import { APPNAME } from '../lib/CONSTANTS';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APPNAME}</title>
      </Head>
      <AppProvider>
        <main className="flex flex-col grow h-screen">
          <Component {...pageProps} />
        </main>
      </AppProvider>
    </>
  );
}

export default CustomApp;
