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
            rel="icon"
            type="image/svg+xml"
            sizes="16x16"
            href="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E @media (prefers-color-scheme: dark) %7B :root %7B filter: invert(100%25); %7D %7D %3C/style%3E%3Cpath d='M12 8V24M12 8H4L8 16L4 24H12M12 8H20M12 24H20M12 24L20 8M24 16.3333L28 8H20M24 16.3333L28 24H20M24 16.3333L20 24' stroke='%23282828' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/svg%3E%0A"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#fcb33d" />
          <meta name="msapplication-TileColor" content="#080909" />
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
