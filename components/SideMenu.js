/** @jsxImportSource theme-ui */
import { transparentize } from "@theme-ui/color";
import { Button } from "theme-ui";
import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SideMenu({ ids }) {
  const { scrollYProgress } = useViewportScroll();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    scrollYProgress.onChange((current) => {
      current > 0.05
        ? current < 0.98
          ? setIsShow(true)
          : setIsShow(false)
        : setIsShow(false);
    });
  });

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          sx={{
            display: ["none", null, "flex"],
            flexDirection: "column",
            position: "fixed",
            left: `calc(50% + 640px)`,
            top: 12,
            maxWidth: 160,
            zIndex: 9,
            p: 2,
            backgroundColor: transparentize("background", 0.6),
            borderRadius: 15,
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h4
            sx={{ variant: "text.caps", p: 2, my: 2, color: "secondaryText" }}
          >
            content
          </h4>
          <ul sx={{ listStyle: "none", p: 0, m: 0 }}>
            {ids.map((item, i) => (
              <li key={i}>
                <Button
                  onClick={() => {
                    const article =
                      document.getElementById("article").offsetTop;
                    window.scrollTo({
                      top:
                        document.getElementById(item.id).offsetTop +
                        article -
                        50,
                      behavior: "smooth",
                    });
                  }}
                  sx={{
                    fontSize: 0,
                    fontWeight: 400,
                    color: "altText",
                    backgroundColor: "transparent",
                    lineHeight: "heading5",
                    textAlign: "start",
                    p: 2,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
