import { ThemeProvider } from "theme-ui";
import theme from "../utlis/theme";
import components from "../utlis/components";
import "../public/font/font.css";
import "normalize.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} components={components}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
