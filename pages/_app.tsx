import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import SEO from '@components/Seo'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Cursor from '@components/Cursor'
import Bg from '@components/Bg'
import '../styles/globals.css'
import '../styles/project-styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <ThemeProvider attribute="class">
        <Cursor />
        <Bg />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
