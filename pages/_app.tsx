import type { AppProps } from 'next/app'
import Header from '@components/Header'
import Footer from '@components/Footer'
import '../styles/globals.css'
import { Router } from 'next/router'
import nprogress from 'nprogress'

Router.events.on('routeChangeStart', nprogress.start)
Router.events.on('routeChangeComplete', () => {
  nprogress.done()
})
Router.events.on('routeChangeError', () => {
  nprogress.done()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
