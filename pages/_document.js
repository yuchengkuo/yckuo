import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script async data-api="/_hive" src="/bee.js"></script>
          <script
            defer
            data-domain="yuchengkuo.com"
            src="https://plausible.io/js/plausible.js"
          ></script>
          <script
            async
            defer
            data-website-id="dd7cb5a4-7c1b-4cdd-9c79-03416a7e85b2"
            src="https://analytics.yuchengkuo.com/track.js"
          ></script>

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#fcb33d"
          />
          <meta name="msapplication-TileColor" content="#fcb33d" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
