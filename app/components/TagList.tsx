"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function TagList({ tags }: { tags: string[] }) {
  useEffect(() => {
    const dropdown_handler = function (e: MouseEvent) {
      document
        .querySelectorAll(".dropdown")
        .forEach(function (dropdown: Element) {
          if (e.target && !dropdown.contains(e.target as Node)) {
            (dropdown as HTMLDetailsElement).open = false;
          }
        });
    };

    window.addEventListener("click", dropdown_handler);
    return () => window.removeEventListener("click", dropdown_handler);
  }, []);
  return tags.map((tag) => (
    <li key={`tags-${tag}`}>
      <Link
        href={`/tags/${tag}`}
        key={`link-${tag}`}
        onClick={(e) => document.getElementById("tags")?.click()}
      >
        {tag}
      </Link>
    </li>
  ));
}
