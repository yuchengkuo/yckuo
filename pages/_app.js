import { ThemeProvider } from "theme-ui";
import theme from "../utlis/theme";
import components from "../utlis/components";
import "../public/font/font.css";
import "normalize.css";
import { DefaultSeo } from "components/Seo";

function MyApp({ Component, pageProps }) {
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
