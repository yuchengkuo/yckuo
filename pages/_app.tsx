import type { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import theme from "@utlis/theme";
import components from "@utlis/components";
// import "../public/font/font.css";
import "normalize.css";
import { DefaultSeo } from "@components/Seo";
import { globalStyles } from "@styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      <DefaultSeo />
      <ThemeProvider theme={theme} components={components}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
