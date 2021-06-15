import { ThemeProvider } from "theme-ui";
import theme from "../utlis/theme";
import "../public/font/font.css";
import "normalize.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
