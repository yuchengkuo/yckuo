import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from '@components/Seo';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Cursor from '@components/Cursor';
import { Menu } from '@components/Menu';
import Head from '@components/Head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo />
      <Head />
      <ThemeProvider attribute="class">
        <Menu />
        <Cursor />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
