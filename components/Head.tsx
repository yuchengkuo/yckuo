import { useTheme } from 'next-themes';
import NextHead from 'next/head';

export default function Head() {
  const { systemTheme } = useTheme();
  return (
    <NextHead>
      {!systemTheme || systemTheme === 'dark' ? (
        <>
          <link
            rel="icon"
            type="image/svg+xml"
            sizes="16x16"
            href="/static/favicons/favicon-dark.svg"
          />
          <link
            rel="alternate icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-dark.png"
          />
        </>
      ) : (
        <>
          <link
            rel="icon"
            type="image/svg+xml"
            sizes="16x16"
            href="/static/favicons/favicon-light.svg"
          />
          <link
            rel="alternate icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-light.png"
          />
        </>
      )}
    </NextHead>
  );
}
