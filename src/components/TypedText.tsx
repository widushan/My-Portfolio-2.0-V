"use client";

import { useEffect, useState } from "react";

export default function TypedText({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0;
    let i = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 40 : 90;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="block min-h-[1.15em] text-brand">
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-brand" />
    </span>
  );
}
