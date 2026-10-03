"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuStar } from "react-icons/lu";
import { testimonials } from "@/data/site";
import { asset } from "@/lib/asset";
import { Container, SectionHeading } from "./ui";

const AUTO_MS = 5000; // pause between automatic slides

export default function Testimonials() {
  const listRef = useRef<HTMLUListElement>(null);
  const [positions, setPositions] = useState<number[]>([0]); // scroll stops, one per dot
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Work out the scroll stops for the current screen width.
  // Cards near the end can't reach the left edge, so they share the last stop.
  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const lefts = Array.from(el.children).map((c) =>
      Math.min(Math.round((c as HTMLElement).offsetLeft), max)
    );
    const unique = Array.from(new Set(lefts)).sort((a, b) => a - b);
    setPositions((prev) => (prev.join() === unique.join() ? prev : unique));
  }, []);

  // Highlight the dot whose stop is closest to the current scroll position
  const syncActive = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const x = el.scrollLeft;
    const pos = positionsRef.current;
    let best = 0;
    for (let i = 1; i < pos.length; i++) {
      if (Math.abs(pos[i] - x) < Math.abs(pos[best] - x)) best = i;
    }
    setActive(best);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({
      left: positionsRef.current[i] ?? 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setActive(i);
  }, []);

  // Keep stops and active dot correct on resize and while scrolling (swipe, trackpad, dots)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      syncActive();
    });
    ro.observe(el);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncActive();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure, syncActive]);

  // Autoplay: move on after AUTO_MS. Any change (including a manual swipe or dot click)
  // restarts the timer, so it never jumps right after the visitor interacts.
  useEffect(() => {
    if (paused || positions.length < 2 || prefersReducedMotion()) return;
    const t = setTimeout(() => goTo((active + 1) % positions.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused, positions.length, goTo]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <Container>
        <SectionHeading pill="Reviews" title="What people say about working with me" />

        <div
          className="mt-10"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <ul
            ref={listRef}
            tabIndex={0}
            aria-label="Testimonials"
            className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <li
                key={t.name}
                className="w-80 shrink-0 snap-start rounded-2xl border border-line bg-surface p-6 sm:w-96"
              >
                <p className="flex gap-0.5 text-brand" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <LuStar key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} aria-hidden="true" />
                  ))}
                </p>
                <blockquote className="mt-4 text-body text-muted">{t.text}</blockquote>
                <div className="mt-5 flex items-center gap-3">
                  {t.image && <img src={asset(t.image)} alt="" className="h-10 w-10 rounded-full object-cover" />}
                  <div>
                    <p className="text-body font-bold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Dots */}
          {positions.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {positions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonials ${i + 1} of ${positions.length}`}
                  aria-current={i === active}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-2 bg-line hover:bg-muted"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}