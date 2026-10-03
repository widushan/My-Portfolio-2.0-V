"use client";

import { FormEvent, useState } from "react";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { site } from "@/data/site";
import SocialLinks from "./SocialLinks";
import { Container, SectionHeading, btnOutline, btnPrimary } from "./ui";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-brand";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const formData = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "Could not send your message. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message. Please try again.");
      setStatus("error");
    }
  }

  const info = [
    { Icon: LuPhone, label: "Call me", value: site.phone, href: `tel:${site.phoneHref}` },
    { Icon: LuMail, label: "Email me", value: site.email, href: `mailto:${site.email}` },
    { Icon: LuMapPin, label: "Location", value: site.location },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading pill="Contact" title="Let's discuss your project">
            Tell me what you&apos;re building and I&apos;ll get back to you.
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <ul className="space-y-5">
              {info.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-deep text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="break-words text-sm font-semibold hover:text-brand-text">
                        {value}
                      </a>
                    ) : (
                      <p className="text-body font-semibold">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <SocialLinks className="mt-8" />
            <a href={site.cv} download className={`${btnOutline} mt-8`}>
              Download CV
            </a>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input name="email" type="email" required maxLength={150} autoComplete="email" placeholder="Your email" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Subject</span>
              <input name="subject" required maxLength={150} placeholder="Subject" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea name="message" required rows={6} maxLength={4000} placeholder="Your message" className={field} />
            </label>

            {/* Web3Forms Access Key */}
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6eed7ee2-be88-43bc-8263-73eda0d20309"} />

            {/* Honeypot: Web3Forms uses botcheck */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "sending"} className={`${btnPrimary} disabled:opacity-60`}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-600" : "text-brand-text"}`}>
                {status === "success" && "Message sent. I'll reply to you soon."}
                {status === "error" && error}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
