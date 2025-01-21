const CodeBlockBackground = () => (
  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
    <div className="grid grid-cols-4 gap-2 p-4 h-full w-full">
      {Array.from({length: 16}, (_, i) => (
        <div
          key={i}
          className={`
            ${Math.random() > 0.3 ? "bg-white" : ""}
            h-full w-full
            rounded-sm
          `}
        />
      ))}
    </div>
  </div>
);

export default CodeBlockBackground;