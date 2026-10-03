"use client";

import { useEffect } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { asset } from "@/lib/asset";

type Item = { src: string; title: string };

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const prev = () => onChange((index - 1 + items.length) % items.length);
  const next = () => onChange((index + 1) % items.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  const item = items[index];
  const btn = "grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-black/85 p-4"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close" className={`${btn} absolute right-4 top-4`}>
        <LuX size={20} />
      </button>

      <div className="flex w-full max-w-5xl items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={prev} aria-label="Previous certificate" className={`${btn} hidden sm:grid`}>
          <LuChevronLeft size={22} />
        </button>
        <img src={asset(item.src)} alt={item.title} className="max-h-[75vh] max-w-full rounded-md bg-white object-contain" />
        <button type="button" onClick={next} aria-label="Next certificate" className={`${btn} hidden sm:grid`}>
          <LuChevronRight size={22} />
        </button>
      </div>

      <div className="text-center text-white" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold">{item.title}</p>
        <p className="mt-1 text-xs text-white/70">
          {index + 1} of {items.length}
        </p>
        <div className="mt-3 flex justify-center gap-3 sm:hidden">
          <button type="button" onClick={prev} aria-label="Previous certificate" className={btn}>
            <LuChevronLeft size={22} />
          </button>
          <button type="button" onClick={next} aria-label="Next certificate" className={btn}>
            <LuChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
