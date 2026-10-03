import { certificates, projects } from "@/data/site";
import { Container } from "./ui";
import CountUp from "./CountUp";

const stats = [
  { end: projects.length, suffix: "+", label: "Projects completed" },
  { end: certificates.length, suffix: "", label: "Certificates earned" },
  { end: 3, suffix: "+", label: "Years of experience" },
];

export default function Stats() {
  return (
    <section aria-label="Highlights" className="py-12">
      <Container>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
          {stats.map((s, i) => (
            <div key={s.label} className={`sm:px-8 ${i > 0 ? "sm:border-l sm:border-line" : "sm:pl-0"}`}>
              <dd className="text-4xl font-extrabold tabular-nums text-brand sm:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-lg text-ink">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}