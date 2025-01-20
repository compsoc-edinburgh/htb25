export function CodeSnippet() {
  // Using libraries just for one block is kinda overkill. so we use this "simple" hardcoded code snippet
  return (
    <pre className="text-sm font-mono overflow-x-hidden text-white">
      <code>
        <span className="text-purple-400">async</span> <span className="text-blue-400">publicProcedure</span>
        .query(() {"->"} {"{"}
        {"\n"}
        {"  "}
        <span className="text-purple-400">return</span> posts;
        {"\n"}
        {"}"}),{"\n\n"}
        <span className="text-purple-400">export</span> <span className="text-purple-400">const</span>{" "}
        <span className="text-blue-400">generateMetadata</span> = <span className="text-blue-400">publicProcedure</span>
        {"\n"}
        {"  "}.<span className="text-purple-400">input</span>(<span className="text-orange-400">z.object</span>({"{"}
        {"\n"}
        {"    "}prompt: <span className="text-green-400">z.string()</span>
        .min(4).max(280),{"\n"}
        {"    "}temperature: <span className="text-green-400">z.number()</span>
        .min(0).max(2).optional(),{"\n"}
        {"    "}<span className="text-gray-400">// pls fix this url on a webpage /merch-access</span>{"\n"}
        {"}"})){"\n"}
        {"  "}.<span className="text-purple-400">mutation</span>
        {"  "}<span className="text-gray-400">async</span> ({"{"} input {"}"}) {"->"} {"{"}
        {"\n"}
        {"    "}
        <span className="text-purple-400">const</span> completion = <span className="text-blue-400">await</span>{" "}
        openai.chat.completions
        {"\n"}
        {"      "}.create({"{"}
        {"\n"}
        {"        "}model: <span className="text-green-400">&quot;gpt-4-1106-preview&quot;</span>,{"\n"}
        {"        "}temperature: input.temperature ?? 0.7,{"\n"}
        {"        "}messages: [{"\n"}
        {"          "}{"{"}role: <span className="text-green-400">&quot;user&quot;</span>, content: input.prompt{"}"}{"\n"}
        {"        "}]{"\n"}
        {"      "}){"\n"}
      </code>
    </pre>
  )
}
