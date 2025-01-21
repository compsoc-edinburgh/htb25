"use client"

import { useEffect, useState, useCallback } from "react";

const CodeBlockBackground = () => {
  const [blocks, setBlocks] = useState<boolean[]>([]);

  useEffect(() => {
    const length = 24;
    setBlocks(Array.from({length}, () => Math.random() > 0.1));
  }, []);

  const regenerateBlocks = useCallback(() => {
    setBlocks(blocks.map(() => Math.random() > 0.2));
  }, [blocks]);

  return (
    <div 
      className="absolute inset-0 opacity-20 group-hover:opacity-30"
      onMouseEnter={regenerateBlocks}
    >
      <div className="grid grid-cols-4 gap-2 p-4 h-full w-full">
        {blocks.map((isVisible, i) => (
          <div
            key={i}
            className={`
              ${isVisible ? "bg-white" : ""}
              h-full w-full
              rounded-sm
              transition-colors duration-300
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default CodeBlockBackground;