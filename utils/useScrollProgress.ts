import { useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useViewportScroll();

  useEffect(() => {
    scrollYProgress.onChange((current) => setProgress(current));
  });

  return progress;
}
