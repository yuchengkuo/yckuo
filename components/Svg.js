import { motion, useAnimation, useCycle } from "framer-motion";
import React, { useEffect, useState } from "react";
const path = [
  "M1 81 L21 41 L1 1 L81 1 L41 81 Z",
  "M1 81 L1 1 L81 1 L61 41 L81 81 Z",
  "M1 81 L41 81 L81 1 L41 1 Z",
  "M1 81 L21 41 L1 1 L81 1 L41 81 Z",
  "M1 81 L1 1 L81 1 L61 41 L81 81 Z",
];
const color = ["#FCB33D", "#BDBEC1", "#FBCED3", "#BDBEC1"];

const Svg = () => {
  const [randomInitialPath] = useState(() =>
    path.sort(() => Math.random() - 0.5)
  );
  const [randomInitialColors] = useState(() =>
    color.sort(() => Math.random() - 0.5)
  );
  const controls = useAnimation();
  const [d, cycleD] = useCycle(...randomInitialPath);
  const [stroke, cycleStroke] = useCycle(...randomInitialColors);
  const [count, setCount] = useState(0);
  const delayTime = 5 + Math.floor(Math.random() * (50 - 10));
  const pathVariant = {
    initial: {
      pathLength: 0,
      pathOffset: 1,
    },
    animate: {
      pathLength: 1.3,
      pathOffset: 0,
      transition: {
        delay: Math.random(),
        duration: 4,
        repeat: 1,
        repeatType: "reverse",
        repeatDelay: delayTime,
      },
    },
  };
  useEffect(() => {
    controls.start("animate");
  });
  return (
    <motion.svg
      width="82"
      height="82"
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 0.95, rotate: 1 }}
    >
      <motion.path
        d={d}
        stroke={stroke}
        // @ts-ignore
        variants={pathVariant}
        initial="initial"
        animate={controls}
        onAnimationComplete={() => {
          cycleD();
          cycleStroke();
          setCount(count + 1);
        }}
      />
    </motion.svg>
  );
};

export default Svg;
