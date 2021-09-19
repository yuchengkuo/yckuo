import { NextSeo, DefaultSeo as NextDefaultSeo, ArticleJsonLd } from "next-seo";
import config from "@utils/config";

export default function Seo({ path, title, description, image }) {
  return (
    <>
      <NextSeo
        title="title"
        titleTemplate="titleTemplate"
        description="description about the website."
      />
      <ArticleJsonLd
        url={path}
        title={title}
        authorName={config.author.name}
        datePublished={new Date().toISOString()}
        description={description}
        images={image}
        publisherName={config.author.name}
        publisherLogo={config.image}
      />
    </>
  );
}

export function DefaultSeo() {
  return (
    <NextDefaultSeo
      title={config.title}
      defaultTitle={config.title}
      description={config.description}
      canonical={config.url}
      openGraph={{
        type: "website",
        title: config.title,
        url: config.url,
        description: config.description,
        images: [
          { url: config.image, alt: config.title, width: 1920, height: 960 },
        ],
      }}
    />
  );
}
