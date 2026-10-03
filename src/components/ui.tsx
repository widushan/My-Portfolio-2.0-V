import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-brand/70 px-3 py-0.5 text-xs font-medium text-brand-text">
      {children}
    </span>
  );
}

export function SectionHeading({ pill, title, children }: { pill: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-xl">
      <Pill>{pill}</Pill>
      <h2 className="mt-4 text-title font-extrabold tracking-tight">{title}</h2>
      {children ? <p className="mt-4 text-lead text-muted">{children}</p> : null}
    </div>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition";
export const btnPrimary = `${base} bg-brand-deep text-white hover:bg-[#087338]`;
export const btnOutline = `${base} border-2 border-brand-deep text-brand-text hover:bg-brand-deep hover:text-white`;
