"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { categoryLabels, projects, type Category } from "@/data/site";
import { asset } from "@/lib/asset";
import { Container, SectionHeading, btnOutline } from "./ui";

const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: categoryLabels.web },
  { key: "mobile", label: categoryLabels.mobile },
  { key: "programming", label: categoryLabels.programming },
  { key: "ml", label: categoryLabels.ml },
];

const PAGE = 6;

export default function Portfolio() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [count, setCount] = useState(PAGE);

  const list = projects.filter((p) => filter === "all" || p.category === filter);
  const shown = list.slice(0, count);

  return (
    <section id="portfolio" className="py-20 sm:py-24">
      <Container>
        <SectionHeading pill="Portfolio" title="My latest projects">
          A selection of web, mobile and machine-learning projects, each with source code and a live demo where available.
        </SectionHeading>

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => {
                setFilter(f.key);
                setCount(PAGE);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${filter === f.key ? "bg-brand-deep text-white" : "border border-line text-muted hover:text-brand-text"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-brand">
                {/* Accent line that sweeps across the top edge on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <div className="aspect-[7/5] overflow-hidden bg-brand-soft">
                  <img
                    src={asset(p.image)}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-semibold text-brand-text">{categoryLabels[p.category]}</p>
                  <h3 className="mt-1 text-h3 font-bold transition-colors duration-300 group-hover:text-brand-text">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-body text-muted">{p.description}</p>
                  <div className="mt-auto flex gap-4 pt-5 text-sm font-semibold">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-brand-text"
                      >
                        <FaGithub size={16} aria-hidden="true" /> Code
                        <span className="sr-only"> for {p.title}</span>
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-brand-text"
                      >
                        <LuArrowUpRight size={16} aria-hidden="true" /> Live
                        <span className="sr-only"> demo of {p.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {count < list.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setCount((c) => c + PAGE)} className={btnOutline}>
              Show more ({list.length - count} left)
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}