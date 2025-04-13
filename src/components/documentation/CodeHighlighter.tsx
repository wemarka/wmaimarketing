
import React from "react";
import { cn } from "@/lib/utils";

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
