/** @jsxImportSource theme-ui */
import { Flex, Text, useThemeUI } from "theme-ui";
import Img from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEmblaCarousel } from "embla-carousel/react";
import { transparentize } from "@theme-ui/color";
import { loader } from "utlis/image-loader";

export default function Caoursel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ inViewThreshold: 1 });
  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);
  const scrollTo = useCallback(
    (index) => {
      emblaApi && emblaApi.scrollTo(index);
    },
    [emblaApi]
  );
  const [snapList, setSnapList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { theme } = useThemeUI();

  useEffect(() => {
    if (emblaApi) {
      const lists = emblaApi.scrollSnapList();
      setSnapList(lists);
      setCurrentIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", () =>
        setCurrentIndex(emblaApi.selectedScrollSnap())
      );
    }
  }, [emblaApi, setSnapList, setCurrentIndex]);
  return (
    <motion.figure
      id="carousel"
      className="embla"
      sx={{
        overflow: "hidden",
        width: `99vw`,
        ml: `calc((100% - 99vw) / 2)`,
        my: [11, 12],
        px: [4, 6],
        position: "relative",
        cursor: "grab",
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      <div ref={emblaRef} className="embla__viewport">
        <Flex
          className="embla__container"
          sx={{
            alignItems: "center",
            ".is-selected": { opacity: 1 },
          }}
        >
          {props.images.map((item, i) => {
            return (
              <Flex
                as="figure"
                key={i}
                className="embla__slide"
                sx={{
                  position: "relative",
                  flexBasis: [`80vw`, `auto`, null, null],
                  flexShrink: 0,
                  flexDirection: "column",
                  alignItems: "center",
                  mr: [4, 8, `10%`, `20%`],
                  ":last-of-type": { mr: 0 },
                  ".carousel_image": {
                    borderRadius: 15,
                    backgroundColor: "secondary",
                  },
                  mb: 4,
                  opacity: 0.5,
                  transition: `all 200ms ease-out`,
                }}
              >
                <Img
                  loader={loader}
                  layout="intrinsic"
                  sizes="100%"
                  objectFit="cover"
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="carousel_image"
                />
                <Text as="figcaption" variant="caps" color="altText" my={3}>
                  {item?.caps}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </div>
      <motion.button
        className="embla__prev"
        sx={{
          visibility: ["hidden", null, null, "visible"],
          position: "absolute",
          left: `calc(50% - 400px - 26px)`,
          top: `calc(50% - 26px)`,
          width: 52,
          height: 52,
          borderRadius: 10,
          border: `1px solid`,
          borderColor: "secondary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: transparentize("altText", 0.8),
          cursor: "pointer",
        }}
        onClick={scrollPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6.6665L10.6667 15.9998L20 25.3332"
            stroke="#D6E4DC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      <motion.button
        className="embla__next"
        sx={{
          visibility: ["hidden", null, null, "visible"],
          position: "absolute",
          left: `calc(50% + 400px - 26px)`,
          top: `calc(50% - 26px)`,
          width: 52,
          height: 52,
          borderRadius: 10,
          border: `1px solid`,
          borderColor: "secondary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: transparentize("altText", 0.8),
          cursor: "pointer",
        }}
        onClick={scrollNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{ m: 0 }}
        >
          <path
            d="M12 6.6665L21.3333 15.9998L12 25.3332"
            stroke="#D6E4DC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      <Flex
        sx={{
          alignItems: "flex-end",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `100%`,
        }}
      >
        {snapList.map((_, i) => (
          <motion.button
            layout
            key={i}
            sx={{
              border: "none",
              mr: 2,
            }}
            style={{
              backgroundColor:
                i === currentIndex
                  ? `${theme.colors.secondary}`
                  : `${theme.colors.darkGray}`,
              height: i === currentIndex ? 6 : 4,
              width: i === currentIndex ? 52 : 40,
            }}
            whileHover={{ cursor: "pointer" }}
            onTap={() => scrollTo(i)}
          />
        ))}
      </Flex>
    </motion.figure>
  );
}
