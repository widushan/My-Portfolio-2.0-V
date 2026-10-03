"use client";

import { useState } from "react";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { certificates, education, experience, skills } from "@/data/site";
import { asset } from "@/lib/asset";
import Lightbox from "./Lightbox";
import { Container, SectionHeading } from "./ui";

const tabs = ["Education", "Experience", "Skills", "Certificates"] as const;
type Tab = (typeof tabs)[number];

function Timeline({ items, icon }: { items: typeof education; icon: "edu" | "work" }) {
  const Icon = icon === "edu" ? LuGraduationCap : LuBriefcase;
  return (
    <ol className="space-y-4">
      {items.map((it) => (
        <li
          key={it.title}
          className="group flex gap-5 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:translate-x-1.5 hover:border-brand hover:shadow-lg motion-reduce:transform-none"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-deep text-white ring-0 ring-brand-soft transition-all duration-300 group-hover:ring-4">
            <Icon size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-body font-semibold text-brand-text">{it.date}</p>
            <h3 className="mt-0.5 text-h3 font-bold">{it.title}</h3>
            <p className="text-body text-muted">{it.place}</p>
            <p className="mt-3 text-body text-muted">{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Resume() {
  const [tab, setTab] = useState<Tab>("Education");
  const [light, setLight] = useState<number | null>(null);

  return (
    <section id="resume" className="py-20 sm:py-24">
      <Container>
        <SectionHeading pill="Resume" title="Education, experience and skills" />

        <div role="tablist" aria-label="Resume sections" className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls="resume-panel"
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-brand-deep text-white" : "text-muted hover:text-brand-text"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div id="resume-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8">
          {tab === "Education" && <Timeline items={education} icon="edu" />}
          {tab === "Experience" && <Timeline items={experience} icon="work" />}

          {tab === "Skills" && (
            <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
              {skills.map((s) => (
                <li key={s.name}>
                  <div className="mb-2 flex justify-between gap-4 text-sm font-medium">
                    <span>{s.name}</span>
                    <span className="text-muted">{s.level}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={s.name}
                    className="h-2 rounded-full bg-brand-soft"
                  >
                    <div className="h-full rounded-full bg-brand" style={{ width: `${s.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "Certificates" && (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {certificates.map((c, i) => (
                <li key={c.src}>
                  <button
                    type="button"
                    onClick={() => setLight(i)}
                    aria-label={`View certificate: ${c.title}`}
                    className="group block w-full overflow-hidden rounded-xl border border-line bg-surface text-left"
                  >
                    <img
                      src={asset(c.src)}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.03]"
                    />
                    <span className="block p-3 text-xs font-medium leading-snug">{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      {light !== null && (
        <Lightbox items={certificates} index={light} onChange={setLight} onClose={() => setLight(null)} />
      )}
    </section>
  );
}