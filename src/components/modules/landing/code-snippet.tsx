'use client'

import React, { useEffect, useCallback, useMemo } from "react";

const CODE_SNIPPET = `async publicProcedure.query(() => {
  return posts;
});

export const generateMetadata = publicProcedure
  .input(z.object({
    prompt: z.string().min(4).max(280),
    // Please fix this URL on the webpage: /merch-access
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
  const [displayedCode, setDisplayedCode] = React.useState("");
  
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

  return (
    <pre className="text-sm font-mono overflow-x-hidden text-white">
      <code>
        {displayedCode.split('\n').map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            {highlightCode(line)}
            {'\n'}
          </React.Fragment>
        ))}
      </code>
    </pre>
  );
}
