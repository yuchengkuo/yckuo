import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import 'normalize.css';
import { DefaultSeo } from '@components/Seo';
import { globalStyles } from '@styles/global';
import { lightTheme } from 'stitches.config';
import Header from '@components/Header';
import Footer from '@components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      <DefaultSeo />
      <ThemeProvider attribute="class" value={{ light: lightTheme.className, dark: 'dark' }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
