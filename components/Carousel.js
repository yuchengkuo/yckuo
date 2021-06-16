/** @jsxImportSource theme-ui */
import { Grid, Flex } from "theme-ui";
import Img from "next/image";
import { wrap } from "popmotion";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function Caoursel({ src }) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const ImageIndex = wrap(0, src.length, index);
  const paginate = (newDirection) => {
    setIndex([index + newDirection, newDirection]);
  };
  return (
    <div sx={{ width: 640, height: 400, display: "flex" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div sx={{ display: "flex" }}>
          <Img
            src={src[ImageIndex].src}
            width={640}
            height={400}
            sizes="100%"
            layout="intrinsic"
            objectFit="cover"
          />
          <Img
            src={src[ImageIndex].src}
            width={640}
            height={400}
            sizes="100%"
            layout="intrinsic"
            objectFit="cover"
          />
          <Img
            src={src[ImageIndex + 1].src}
            width={640}
            height={400}
            sizes="100%"
            layout="intrinsic"
            objectFit="cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
