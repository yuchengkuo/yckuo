import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'stitches.config';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <script async data-api="/_hive" src="/bee.js"></script>
          <script
            async
            defer
            data-website-id="dd7cb5a4-7c1b-4cdd-9c79-03416a7e85b2"
            src="https://umami.yuchengkuo.com/track.js"
          ></script>

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="alternate icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-dark.png"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            sizes="16x16"
            href="/static/favicons/favicon-dark.svg"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#fcb33d" />
          <meta name="msapplication-TileColor" content="#fcb33d" />
          <meta name="theme-color" content="#080909" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
