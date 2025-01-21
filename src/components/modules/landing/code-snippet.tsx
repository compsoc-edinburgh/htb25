'use client'

import { useEffect, useCallback, useMemo, useState, Fragment } from "react";

const CODE_SNIPPET = `async publicProcedure.query(() => {
  return posts;
});

export const generateMetadata = publicProcedure
  .input(z.object({
    prompt: z.string().min(4).max(280),
    // Please fix: /merch-access
  }))
  .mutation(async ({ input }) => {
    const completion = await openai.chat.completions
      .create({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "user", content: input.prompt }
        ]
      })`;

export function CodeSnippet() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const [displayedCode, setDisplayedCode] = useState("");
  
  const codeString = useMemo(() => CODE_SNIPPET, []);

  useEffect(() => {
    let currentIndex = 0;
    let isActive = true;

    const intervalId = setInterval(() => {
      if (!isActive) return;
      
      if (currentIndex <= codeString.length) {
        setDisplayedCode(prev => codeString.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [codeString]);

  const highlightCode = useCallback((code: string) => {
    const parts = [];
    let currentIndex = 0;

    const syntaxPatterns = [
      { regex: /(async|await|const|export|return|function)/g, className: "text-purple-400" },
      { regex: /(string|number|object)/g, className: "text-yellow-400" },
      { regex: /(\{|\}|\(|\))/g, className: "text-blue-400" },
      { regex: /(\/\/.+)/g, className: "text-gray-400" },
    ];

    while (currentIndex < code.length) {
      syntaxPatterns.forEach(pattern => {
        pattern.regex.lastIndex = currentIndex;
      });

      const matches = syntaxPatterns
        .map(({ regex, className }) => {
          const match = regex.exec(code);
          return match ? { match, className, index: match.index } : null;
        })
        .filter(Boolean);

      if (matches.length === 0) {
        parts.push(code.slice(currentIndex, currentIndex + 1));
        currentIndex++;
        continue;
      }

      const earliestMatch = matches.reduce((earliest, current) => 
        current!.index < earliest!.index ? current : earliest
      );

      if (earliestMatch!.index > currentIndex) {
        parts.push(code.slice(currentIndex, earliestMatch!.index));
      }

      parts.push(
        <span key={`${currentIndex}-${earliestMatch!.match[0]}`} className={earliestMatch!.className}>
          {earliestMatch!.match[0]}
        </span>
      );

      currentIndex = earliestMatch!.index + earliestMatch!.match[0].length;
    }

    return parts;
  }, []);

  const lines = CODE_SNIPPET.split('\n').length;
  const lineHeight = isMobile ? 1.1 : 1.3;
  const height = `${lines * lineHeight}rem`;

  return (
    <pre className="text-xs md:text-sm font-mono overflow-x-hidden overflow-y-hidden text-white" style={{ height }}>
      <code>
        {displayedCode.split('\n').map((line, i) => (
          <Fragment key={`line-${i}`}>
            {highlightCode(line)}
            {'\n'}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}
