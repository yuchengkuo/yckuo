/* eslint-disable react/display-name */
/** @jsxImportSource theme-ui */
import Link from "next/link";
import Img from "next/image";
import { Text } from "theme-ui";
import { motion } from "framer-motion";

const heading = (Tag) => (props) => {
  if (!props.id) return <Tag {...props} />;

  return (
    <Tag {...props}>
      <Link href={`#${props.id}`} passHref>
        <motion.a
          sx={{ textDecoration: "none", color: "secondaryText" }}
          whileHover={{ textDecoration: "underline", letterSpacing: `0.2px` }}
        >
          {props.children}
        </motion.a>
      </Link>
    </Tag>
  );
};

const link = () => (props) =>
  (
    <Link href={props.href}>
      <motion.a {...props} whileHover={{ fontWeight: "400" }}>
        {props.children}
      </motion.a>
    </Link>
  );

const img = () => (props) => {
  return (
    <motion.figure
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: [`99vw`, `90vw`, `70vw`],
        m: 0,
        ml: [
          `calc((100% - 99vw) / 2)`,
          `calc((100% - 90vw) / 2)`,
          `calc((100% - 70vw) / 2)`,
        ],
        my: 96,
        div: {
          borderRadius: 15,
          backgroundColor: "secondary",
          pointerEvents: "none",
        },
      }}
    >
      <Img
        layout="intrinsic"
        sizes="100%"
        objectFit="cover"
        placeholder="blur"
        {...props}
      />
      <Text as="figcaption" variant="caps" color="altText" my={3}>
        {props?.caps}
      </Text>
    </motion.figure>
  );
};

const hr = () => () => {
  return (
    <hr
      sx={{
        background: `url("data:image/svg+xml,%3Csvg width='76' height='4' viewBox='0 0 76 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23777980'/%3E%3Ccircle cx='38' cy='2' r='2' fill='%23777980'/%3E%3Ccircle cx='74' cy='2' r='2' fill='%23777980'/%3E%3C/svg%3E%0A") no-repeat center`,
        border: "none",
        height: 4,
      }}
    />
  );
};

const components = {
  h2: heading("h2"),
  h3: heading("h3"),
  a: link(),
  img: img(),
  hr: hr(),
};

export default components;
