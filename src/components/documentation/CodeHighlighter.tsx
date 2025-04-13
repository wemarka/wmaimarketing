
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
// Import basic Prism themes and languages
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";

interface CodeHighlighterProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  language = "javascript",
  className,
}) => {
  useEffect(() => {
    // Highlight all code elements when component mounts or updates
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className={cn("font-mono text-sm overflow-x-auto rounded-md bg-muted/50", className)}>
      <pre className="p-4 m-0">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};
