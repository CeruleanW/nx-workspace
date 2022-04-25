import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ProviderGroup } from '../providers';
import {APPNAME} from '../lib/CONSTANTS';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APPNAME}</title>
      </Head>
      <ProviderGroup>
        <main className="flex flex-col grow h-screen">
          <Component {...pageProps} />
        </main>
      </ProviderGroup>
    </>
  );
}

export default CustomApp;
