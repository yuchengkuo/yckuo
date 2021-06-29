/** @jsxImportSource theme-ui */
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
          sx={{
            width: 56,
            height: 56,
            left: [`85vw`, null, null, `calc(50% + 650px)`],
            bottom: 100,
            position: "fixed",
            backgroundColor: "#18191B",
            border: "none",
            borderRadius: 15,
            cursor: "pointer",
            overflow: "hidden",
            zIndex: 5,
          }}
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
            sx={{
              position: "absolute",
              width: `100%`,
              bottom: 0,
              left: 0,
              zIndex: -1,
              backgroundColor: "primary",
            }}
            style={{ height: `${height}%` }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
