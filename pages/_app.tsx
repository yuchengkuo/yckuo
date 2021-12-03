import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from '@components/Seo';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Cursor from '@components/Cursor';
import '../styles/globals.css';
import '../styles/prose-styles.css';
import Bg from '@components/Bg';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo />
      <ThemeProvider attribute="class">
        <Cursor />
        <Bg />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
