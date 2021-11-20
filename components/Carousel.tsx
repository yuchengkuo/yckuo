import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEmblaCarousel } from "embla-carousel/react";
import classNames from "classnames";
import { box } from "@styles/box";
import { theme } from "stitches.config";

export default function Carousel(props) {
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
  const [snapList, setSnapList] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

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
      className={classNames(
        "embla",
        box({
          overflow: "hidden",
          width: "98vw",
          ml: "calc((100% - 98vw) / 2)",
          my: "$11",
          px: "$4",
          position: "relative",
          cursor: "grab",
          "@bp1": {
            my: "$12",
            px: "$6",
          },
        })
      )}
      whileTap={{ cursor: "grabbing" }}
    >
      <div ref={emblaRef} className="embla__viewport">
        <div
          className={classNames(
            "embla__container",
            box({
              display: "flex",
              alignItems: "center",
              "& .is-selected": { opacity: 1 },
              figure: {
                display: "flex",
                position: "relative",
                flexBasis: "80vw",
                flexShrink: 0,
                flexDirection: "column",
                alignItems: "center",
                mr: "$4",
                mb: "$4",
                opacity: 0.5,
                transition: "all 200ms ease-out",
                "&:last-of-type": { mr: 0 },
                "& .carousel_image": { borderRadius: 15 },
                "& div": { pointerEvents: "none" },
                "@bp1": { flexBasis: "auto", mr: "$8" },
                "@bp2": { flexBasis: null, mr: "10%" },
                "@bp3": { flexBasis: null, mr: "20%" },
              },
            })
          )}
        >
          {props.children}
          {/* {props.images.map((item, i) => {
            return (
              <figure
                key={i}
                className={classNames(
                  "embla__slide",
                  box({
                    display: "flex",
                    position: "relative",
                    flexBasis: "80vw",
                    flexShrink: 0,
                    flexDirection: "column",
                    alignItems: "center",
                    mr: "$4",
                    mb: "$4",
                    opacity: 0.5,
                    transition: "all 200ms ease-out",
                    "&:last-of-type": { mr: 0 },
                    "& .carousel_image": { borderRadius: 15 },
                    "& div": { pointerEvents: "none" },
                    "@bp1": { flexBasis: "auto", mr: "$8" },
                    "@bp2": { flexBasis: null, mr: "10%" },
                    "@bp3": { flexBasis: null, mr: "20%" },
                  })
                )}
              >
                <Image
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
                <figcaption
                  className={text({
                    css: {
                      fontSize: "$3",
                      fontWeight: 400,
                      color: "$gray2",
                      my: "$3",
                      textTransform: "uppercase",
                    },
                  })}
                >
                  {item?.caps}
                </figcaption>
              </figure>
            );
          })} */}
        </div>
      </div>
      <motion.button
        className={classNames(
          "embla__prev",
          box({
            appearance: "none",
            backgroundColor: "transparent",
            visibility: "hidden",
            position: "absolute",
            left: "calc(50% - 400px - 26px)",
            top: "calc(50% - 46px)",
            width: 52,
            height: 52,
            borderRadius: 10,
            border:
              currentIndex !== 0 ? "1px solid $green" : "1px solid $gray3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 99,
            "@bp3": { visibility: "visible" },
            path: {
              stroke: currentIndex !== 0 ? "$green" : "$gray3",
            },
          })
        )}
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      <motion.button
        className={classNames(
          "embla__next",
          box({
            appearance: "none",
            backgroundColor: "transparent",
            visibility: "hidden",
            position: "absolute",
            left: "calc(50% + 400px - 26px)",
            top: "calc(50% - 46px)",
            width: 52,
            height: 52,
            borderRadius: 10,
            border:
              currentIndex !== snapList.length - 1
                ? "1px solid $green"
                : "1px solid $gray3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 99,
            "@bp3": { visibility: "visible" },
            path: {
              stroke:
                currentIndex !== snapList.length - 1 ? "$green" : "$gray3",
            },
          })
        )}
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
        >
          <path
            d="M12 6.6665L21.3333 15.9998L12 25.3332"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      <div
        className={box({
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        })}
      >
        {snapList.map((_, i) => (
          <motion.button
            layout
            key={i}
            className={box({ border: "none", borderRadius: 1, mr: "$2" })}
            style={{
              backgroundColor:
                i === currentIndex
                  ? `${theme.colors.green}`
                  : `${theme.colors.gray3}`,
              height: 4,
              width: i === currentIndex ? 32 : 24,
            }}
            whileHover={{ cursor: "pointer" }}
            onTap={() => scrollTo(i)}
          />
        ))}
      </div>
    </motion.figure>
  );
}
