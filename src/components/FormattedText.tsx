"use client";

import React from "react";
import Link from "next/link";

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className = "" }: FormattedTextProps) {
  if (!text || typeof text !== "string") return null;

  // Regex matching markdown links [text](url), bold **text**, or HTML <a> tags
  const regex = /(\[[^\]]+\]\([^\)]+\)|\*\*[^\*]+\*\*|<a\s+[^>]*>.*?<\/a>)/gi;
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // 1. Markdown link: [label](url)
        const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
        if (mdLinkMatch) {
          const [, label, url] = mdLinkMatch;
          const isInternal = url.startsWith("/") || url.startsWith("#");

          if (isInternal) {
            return (
              <Link
                key={index}
                href={url}
                className="text-[#eb1e25] font-semibold hover:underline transition-colors inline"
              >
                {label}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#eb1e25] font-semibold hover:underline transition-colors inline"
            >
              {label}
            </a>
          );
        }

        // 2. HTML <a> tag: <a href="...">...</a>
        const htmlLinkMatch = part.match(/^<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>$/i);
        if (htmlLinkMatch) {
          const [, url, label] = htmlLinkMatch;
          const isInternal = url.startsWith("/") || url.startsWith("#");

          if (isInternal) {
            return (
              <Link
                key={index}
                href={url}
                className="text-[#eb1e25] font-semibold hover:underline transition-colors inline"
              >
                {label}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#eb1e25] font-semibold hover:underline transition-colors inline"
            >
              {label}
            </a>
          );
        }

        // 3. Bold text: **text**
        const boldMatch = part.match(/^\*\*([^\*]+)\*\*$/);
        if (boldMatch) {
          return (
            <strong key={index} className="font-bold text-gray-900">
              {boldMatch[1]}
            </strong>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
