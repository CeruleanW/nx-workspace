import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ProviderGroup } from '../providers'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Idea Dropper</title>
      </Head>
      <ProviderGroup>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ProviderGroup>
    </>
  );
}

export default CustomApp;
