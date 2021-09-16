//@ts-nocheck
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "normalize.css";
import { DefaultSeo } from "@components/Seo";
import { globalStyles } from "@styles/global";
import { lightTheme } from "stitches.config";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      <DefaultSeo />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        value={{ light: lightTheme.className, dark: "dark" }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
