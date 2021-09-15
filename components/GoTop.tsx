/** @jsxImportSource theme-ui */
import { box } from "@styles/box";
import { button } from "@styles/button";
import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function GoTop(props) {
  const { scrollY, scrollYProgress } = useViewportScroll();
  const [isShow, setIsShow] = useState(false);
  const [height, setHeight] = useState(0);
  const value = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    scrollY.onChange((current) => {
      current > 200 ? setIsShow(true) : setIsShow(false);
    });
    value.onChange((current) => {
      setHeight(current);
    });
  });
  return (
    <AnimatePresence>
      {isShow && (
        <motion.button
          {...props}
          className={button({
            css: {
              width: 56,
              height: 56,
              position: "relative",
              backgroundColor: "#18191B",
              borderRadius: 15,
              overflow: "hidden",
              zIndex: 5,
              mt: "auto",
              mb: 80,
            },
          })}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
          onTap={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M6.6665 20L15.9998 10.6667L25.3332 20"
              stroke={scrollYProgress.get() > 0.5 ? "#18191B" : "#E3E3E3"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          <motion.div
            className={box({
              position: "absolute",
              width: "100%",
              bottom: 0,
              left: 0,
              zIndex: -1,
              backgroundColor: "$yellow",
            })}
            style={{ height: `${height}%` }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
