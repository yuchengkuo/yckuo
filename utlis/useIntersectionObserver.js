import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(elements, options) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const observer = useRef(null);

  const observerCallback = (entries) => {
    setCurrentIndex(
      entries.findIndex((entry) => {
        return entry.intersectionRatio > 0;
      })
    );
  };

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(observerCallback, {
      rootMargin: `-${(options && options.offset) || 0}px 0px 0px 0px`,
      root: (options && options.root) || null,
    });

    elements.forEach((element) => {
      observer.current.observe(element);
    });
  }, [elements, options]);

  return [currentIndex];
}
