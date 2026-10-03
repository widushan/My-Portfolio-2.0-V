import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { Container, SectionHeading, btnOutline, btnPrimary } from "./ui";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <Container className="grid items-center gap-14 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-brand-soft" />
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface">
            <img
              src={asset(site.images.about)}
              alt={`${site.name}, undergraduate`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <SectionHeading pill="About Me" title="I design and build software that helps your business succeed.">
            I combine a degree in Information &amp; Communication Engineering with hands-on project work across full-stack
            web, mobile apps and machine learning. Every project is a chance to ship something clear, reliable and useful.
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className={btnPrimary}>
              Hire Me
            </a>
            <a href={site.cv} download className={btnOutline}>
              Download CV
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
