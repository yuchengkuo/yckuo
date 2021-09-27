import Layout from "@components/Layout";
import { box } from "@styles/box";
import { layout } from "@styles/layout";
import { text } from "@styles/text";
import { getBlurredData, loader } from "@utils/image-loader";
import cloudinary from "cloudinary";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import { GetStaticProps } from "next";

type data = {
  format: string;
  width: number;
  height: number;
  public_id: string;
  blurDataURL: string;
  context: object;
}[];

export default function Playground({ data }: { data: data }) {
  function columnize() {
    const oddData = [];
    const evenData = [];
    for (let i = 0; i < data.length; i += 2) {
      const ImageTemplate = (item) => (
        <Zoom
          overlayBgColorStart="hsl(0 0% 0% / 0.8)"
          overlayBgColorEnd="hsl(0 0% 0% / 0.95)"
          zoomMargin={80}
        >
          <figure className={box({ p: "$4" })}>
            <Image
              key={i}
              objectFit="cover"
              src={item.public_id}
              alt={item?.context?.custom?.alt}
              width={item.width > 1000 ? item.width / 2 : item.width}
              height={item.width > 1000 ? item.height / 2 : item.height}
              placeholder="blur"
              blurDataURL={item.blurDataURL}
              loader={loader}
              className={box({ borderRadius: 12 })}
            />
            <figcaption
              className={text({
                size: "2",
                css: { fontWeight: 400, textAlign: "center", mt: "$1" },
              })}
            >
              {item?.context?.custom?.caption}
            </figcaption>
          </figure>
        </Zoom>
      );
      const odd = data[i];
      oddData.push(ImageTemplate(odd));
      if (i + 1 < data.length) {
        const even = data[i + 1];
        evenData.push(ImageTemplate(even));
      }
    }
    return (
      <>
        <div>{oddData}</div>
        <div>{evenData}</div>
      </>
    );
  }
  return (
    <Layout>
      <div className={layout({ variant: "section" })}>
        <h1 className={text({ article: "h1" })}>Playground</h1>
        <p className={text({ article: "p" })}>
          A sleceted list of practices and experiments.
        </p>
        <div
          className={box({
            display: "flex",
            mt: "$8",
            mx: "-$4",
            "& > div": { flex: "1 1 50%" },
            flexDirection: "column",
            "@bp1": { flexDirection: "row" },
          })}
        >
          {columnize()}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  cloudinary.v2.config({
    cloud_name: "yucheng",
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const { resources } = await cloudinary.v2.api.resources_by_tag("playground", {
    type: "upload",
    context: true,
  });
  const data = await Promise.all(
    resources.map(async (resource) => {
      const blurDataURL = await getBlurredData(resource.public_id);
      return {
        format: resource.format,
        width: resource.width,
        height: resource.height,
        public_id: resource.public_id,
        blurDataURL,
        context: resource.context ?? "",
      };
    })
  );
  return {
    props: { data },
    revalidate: 36 * 60 * 60,
  };
};
