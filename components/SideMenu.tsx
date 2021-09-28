import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollProgress from "@utils/useScrollProgress";
import useIntersectionObserver from "@utils/useIntersectionObserver";
import { box } from "@styles/box";
import { button } from "@styles/button";
import { text } from "@styles/text";
import { Frontmatter } from "types/frontmatter";

export default function SideMenu({ ids }: { ids: Frontmatter["ids"] }) {
  const [sectionElements, setSectionElements] = useState<Element[]>([]);
  const [currentIndex] = useIntersectionObserver(sectionElements, {
    offset: 100,
  });
  const [carouselElements, setCarouelElements] = useState<Element[]>([]);
  const [carouselIndex] = useIntersectionObserver(carouselElements);

  const scrollProgress = useScrollProgress();
  const isShow =
    scrollProgress > 0.05 && scrollProgress < 0.98 && carouselIndex === -1;

  useEffect(() => {
    const sectionElements = ids.map((item) =>
      document.querySelector(`section[id=${item.id}-section]`)
    );
    setSectionElements(sectionElements);
    const carouselElements = Array.from(document.querySelectorAll("#carousel"));
    setCarouelElements(carouselElements);
  }, [ids]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.nav
          className={box({
            display: "none",
            mt: "$12",
            backgroundColor: "transparent",
            "@bp4": { display: "unset" },
            zIndex: 10,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h4
            className={text({
              css: {
                fontSize: "$2",
                fontWeight: 400,
                p: "$2",
                my: "$2",
                color: "$gray1",
                textTransform: "uppercase",
              },
            })}
          >
            contents
          </h4>
          <ul className={box({ listStyle: "none", p: 0, m: 0 })}>
            {ids.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: document.getElementById(item.id).offsetTop - 50,
                      behavior: "smooth",
                    });
                  }}
                  className={button({
                    css: {
                      fontSize: "$3",
                      fontWeight: 400,
                      textAlign: "start",
                      color: i === currentIndex ? "$yellow" : "$gray2",
                      backgroundColor: "transparent",
                      p: "$2",
                      mb: "$1",
                    },
                  })}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
