"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_VISIBILITY_THRESHOLD = 0.1;
const REGENERATE_VISIBILITY_THRESHOLD = 0.2;
const DESKTOP_BLOCK_COUNT = 24;
const MOBILE_BLOCK_COUNT = 8;

interface BlockProps {
  isVisible: boolean;
  index: number;
}

const Block = ({ isVisible, index }: BlockProps) => (
  <motion.div
    key={index}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: isVisible ? 1 : 0.8,
      opacity: isVisible ? 1 : 0,
    }}
    transition={{
      duration: 0.3,
      delay: index * 0.02,
    }}
    className={` ${isVisible ? "bg-white" : ""} h-full w-full rounded-sm`}
  />
);

const CodeBlockBackground = () => {
  const [blocks, setBlocks] = useState<boolean[]>([]);

  useEffect(() => {
    if (window) {
      const mediaQuery = window.matchMedia("(max-width: 765px)");
      const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
        setBlocks(
          Array.from(
            { length: e.matches ? MOBILE_BLOCK_COUNT : DESKTOP_BLOCK_COUNT },
            () => Math.random() > INITIAL_VISIBILITY_THRESHOLD,
          ),
        );
      };

      handleResize(mediaQuery);
      mediaQuery.addEventListener("change", handleResize);

      return () => mediaQuery.removeEventListener("change", handleResize);
    }
  }, []);

  const regenerateBlocks = useCallback(() => {
    setBlocks((prevBlocks) =>
      prevBlocks.map(() => Math.random() > REGENERATE_VISIBILITY_THRESHOLD),
    );
  }, []);

  return (
    <motion.div
      className="absolute inset-0 opacity-20"
      onMouseEnter={regenerateBlocks}
      whileHover={{ opacity: 0.3 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid h-full w-full grid-cols-4 gap-2 p-4">
        <AnimatePresence>
          {blocks.map((isVisible, i) => (
            <Block key={i} isVisible={isVisible} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CodeBlockBackground;
