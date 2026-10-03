"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuBot, LuBrain, LuCircleCheck, LuCode, LuLayers, LuScanFace, LuSparkles, LuX } from "react-icons/lu";
import type { IconType } from "react-icons";
import { services, type ServiceIcon } from "@/data/site";
import { Container, SectionHeading, btnPrimary } from "./ui";

const icons: Record<ServiceIcon, IconType> = {
  layers: LuLayers,
  brain: LuBrain,
  bot: LuBot,
  scan: LuScanFace,
  sparkles: LuSparkles,
  code: LuCode,
};

export default function Services() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [selected]);

  const current = selected !== null ? services[selected] : null;

  return (
    <section id="services" className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading pill="My Services" title="Why hire me for your next project?">
            I work across the stack, from interface to model to deployment, so one person can take an idea from first
            sketch to a live product.
          </SectionHeading>
          {/* <a href="#contact" className={`${btnPrimary} mt-8`}>
            Hire Me
          </a> */}
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              // The li keeps the staggered offset; the hover lift is applied to the inner card
              <li key={s.title} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-lg motion-reduce:transform-none">
                  <Icon size={26} className="text-brand-text" aria-hidden="true" />
                  <h3 className="mt-4 text-h3 font-bold">{s.title}</h3>
                  <p className="mt-2 text-body text-muted">{s.points.slice(0, 2).join(" ")}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setSelected(i);
                    }}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-text"
                  >
                    View more{" "}
                    <LuArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>

      {current && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-5"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-surface p-8 shadow-xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line"
            >
              <LuX size={18} />
            </button>
            <h3 id="service-title" className="pr-10 text-h3 font-bold">
              {current.title}
            </h3>
            <p className="mt-2 text-body text-muted">With more than 3 years of experience delivering quality work.</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <LuCircleCheck size={18} className="mt-0.5 shrink-0 text-brand-text" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}