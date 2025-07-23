"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);

  const handleCopy = async () => {
    const code = preRef.current?.innerText;
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      if (codeElement) {
        hljs.highlightElement(codeElement as HTMLElement);

        // Detect language class, like "language-js"
        const langClass = [...codeElement.classList].find((cls) =>
          cls.startsWith("language-")
        );
        if (langClass) {
          const lang = langClass.replace("language-", "");
          setLanguage(lang);
        }
      }
    }
  }, []);

  return (
    <div className="relative group">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-6 z-10 p-1 text-zinc-300 rounded 
          hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 
          transition cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      {/* Code Block */}
      <pre
        ref={preRef}
        className="overflow-x-auto overflow-y-auto max-h-96 rounded-lg p-4 
            bg-[var(--color-panel)] text-[var(--color-text-light)] text-sm 
            custom-scroll"
        >
        {children}
      </pre>

    </div>
  );
}
