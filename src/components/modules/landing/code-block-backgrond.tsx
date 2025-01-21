"use client"

const CodeBlockBackground = () => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  
  return (
    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
      <div className="grid grid-cols-4 gap-2 p-4 h-full w-full">
        {Array.from({length: isMobile ? 4 : 24}, (_, i) => (
          <div
            key={i}
            className={`
              ${Math.random() > 0.1 ? "bg-white" : ""}
              h-full w-full
              rounded-sm
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default CodeBlockBackground;