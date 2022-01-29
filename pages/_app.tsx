import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import SEO from '@components/Seo'
import Header from '@components/Header'
import Footer from '@components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MyApp
