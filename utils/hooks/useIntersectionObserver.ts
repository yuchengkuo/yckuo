import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver(
  elements: Element[],
  options?: { offset?: number; root?: Element }
): [number] {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const observer = useRef<IntersectionObserver>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
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

    elements.forEach((element) => (element ? observer.current.observe(element) : null));
  }, [elements, options]);

  return [currentIndex];
}
