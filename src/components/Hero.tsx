import { LuArrowUpRight } from "react-icons/lu";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import SocialLinks from "./SocialLinks";
import TypedText from "./TypedText";
import AutoRotate3D from "./AutoRotate3D";
import { Container, Pill, btnPrimary } from "./ui";

const dots = [
  { top: "14%", left: "46%", size: 10, color: "bg-blue-600" },
  { top: "30%", left: "38%", size: 12, color: "bg-red-500" },
  { top: "22%", left: "32%", size: 9, color: "bg-yellow-400" },
  { top: "62%", left: "6%", size: 10, color: "bg-red-500" },
  { top: "74%", left: "36%", size: 12, color: "bg-brand" },
  { top: "48%", left: "48%", size: 8, color: "bg-blue-600" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute hidden rounded-full md:block ${d.color}`}
          style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
        />
      ))}

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Pill>Welcome</Pill>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            I&apos;m a
            <TypedText words={site.roles} />
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#contact" className={btnPrimary}>
              Contact Me
            </a>
            <a href="#portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-brand-text">
              View Portfolio <LuArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Portrait with automatic 3D rotation */}
        <AutoRotate3D className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 h-full w-full border-2 border-ink"
            style={{ transform: "translateZ(-30px)" }}
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-brand">
            <img
              src={asset(site.images.hero)}
              alt={`Portrait of ${site.name}`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </AutoRotate3D>
      </Container>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="text-xs font-medium text-brand-text [writing-mode:vertical-rl]">Follow me on:</span>
        <span aria-hidden="true" className="h-12 w-px bg-line" />
        <SocialLinks className="flex-col" />
      </div>
    </section>
  );
}