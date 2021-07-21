/** @jsxImportSource theme-ui */
import { transparentize } from "@theme-ui/color";
import { Button } from "theme-ui";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollProgress from "utlis/useScrollProgress";
import useIntersectionObserver from "utlis/useIntersectionObserver";

export default function SideMenu({ ids }) {
  const [sectionElements, setSectionElements] = useState([]);
  const [currentIndex] = useIntersectionObserver(sectionElements, {
    offset: 100,
  });
  const [carouselElements, setCarouelElements] = useState([]);
  const [carouselIndex] = useIntersectionObserver(carouselElements);

  const scrollProgress = useScrollProgress();
  const isShow =
    scrollProgress > 0.05 && scrollProgress < 0.98 && carouselIndex === -1;

  useEffect(() => {
    const sectionElements = ids.map((item) =>
      document.querySelector(`section[id=${item.id}-section]`)
    );
    setSectionElements(sectionElements);
    const carouselElements = document.querySelectorAll("#carousel");
    setCarouelElements([...carouselElements]);
  }, [ids]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.nav
          sx={{
            display: ["none", null, null, "unset"],
            mt: 12,
            backgroundColor: transparentize("background", 0.6),
            borderRadius: 15,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h4
            sx={{ variant: "text.caps", p: 2, my: 2, color: "secondaryText" }}
          >
            contents
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
                    color: i === currentIndex ? "primary" : "altText",
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
