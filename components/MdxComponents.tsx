import { link } from "@styles/link";
import { text } from "@styles/text";
import { box } from "@styles/box";
import { loader } from "@utlis/image-loader";
import Link from "next/link";
import Img from "next/image";
import Carousel from "./Carousel";

export const MdxComponents = {
  Carousel: Carousel,
  h1: (props) => <h1 className={text({ article: "h1" })} {...props} />,
  h2: (props) => <h2 className={text({ article: "h2" })} {...props} />,
  h3: (props) => <h3 className={text({ article: "h3" })} {...props} />,
  h4: (props) => <h4 className={text({ article: "h4" })} {...props} />,
  h5: (props) => <h5 className={text({ article: "h4" })} {...props} />,
  p: (props) => <p className={text({ article: "p" })} {...props} />,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return <a className={link({ underline: true })} href={href} {...props} />;
    }
    return (
      <Link href={href} passHref>
        <a className={link({ underline: true })} {...props} />
      </Link>
    );
  },
  Image: (props) => (
    <figure
      className={box({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        m: 0,
        ml: "-$4",
        my: 40,
        "& div": { pointerEvents: "none" },
        "@bp1": { width: "90vw", ml: "calc((100% - 90vw) / 2)", my: 96 },
        "@bp2": { width: "70vw", ml: "calc((100% - 70vw) / 2)" },
      })}
    >
      <Img
        objectFit="cover"
        layout="intrinsic"
        loader={loader}
        className={box({ borderRadius: 15, backgroundColor: "$green" })}
        {...(props as any)}
      />
      <figcaption
        className={text({
          css: {
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "uppercase",
            my: "$4",
            color: "$gray2",
          },
        })}
      >
        {props?.caps}
      </figcaption>
    </figure>
  ),
  img: (props) => (
    <figure>
      <Img
        objectFit="cover"
        layout="intrinsic"
        loader={loader}
        {...(props as any)}
      />
      <figcaption className={text({})}>{props?.caps}</figcaption>
    </figure>
  ),
  hr: () => (
    <hr
      className={box({
        background: `url("data:image/svg+xml,%3Csvg width='76' height='4' viewBox='0 0 76 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23777980'/%3E%3Ccircle cx='38' cy='2' r='2' fill='%23777980'/%3E%3Ccircle cx='74' cy='2' r='2' fill='%23777980'/%3E%3C/svg%3E%0A") no-repeat center`,
        border: "none",
        height: 4,
        my: "$6",
      })}
    />
  ),
  ul: (props) => (
    <ul
      className={box({
        pl: "$5",
        my: "$5",
        listStyle: `url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 4 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='12' width='4' height='4' fill='%23BDBEC1'/%3E%3C/svg%3E%0A")`,
      })}
      {...props}
    />
  ),
  ol: (props) => <ol className={box({ pl: "$5", my: "$5" })} {...props} />,
  li: (props) => <li className={text({ article: "li" })} {...props} />,
  blockquote: (props) => (
    <blockquote
      className={box({
        backgroundColor: "$gray4",
        m: 0,
        px: "$5",
        "& p": { fontWeight: 400, py: "$4" },
        position: "relative",
        "&::before": {
          content: '""',
          width: 4,
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "$yellow",
        },
      })}
      {...props}
    />
  ),
  em: () => <em className={text({ fontSize: "" })} />,
};
