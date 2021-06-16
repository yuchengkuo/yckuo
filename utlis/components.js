/* eslint-disable react/display-name */
/** @jsxImportSource theme-ui */
import Link from "next/link";
import Img from "next/image";
import { Flex, Text } from "theme-ui";
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
    <Flex
      as="figure"
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: `70vw`,
        ml: `calc((100% - 70vw) / 2)`,
        my: 6,
      }}
    >
      <Img layout="intrinsic" sizes="100%" objectFit="cover" {...props} />
      <Text as="figcaption" variant="caps" color="altText" my={2}>
        {props.caps}
      </Text>
    </Flex>
  );
};

const components = {
  h2: heading("h2"),
  h3: heading("h3"),
  a: link(),
  img: img(),
};

export default components;
