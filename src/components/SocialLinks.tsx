import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/data/site";

export const socialItems = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: FaLinkedinIn },
  { label: "GitHub", href: site.socials.github, Icon: FaGithub },
  { label: "Facebook", href: site.socials.facebook, Icon: FaFacebookF },
  { label: "WhatsApp", href: site.socials.whatsapp, Icon: FaWhatsapp },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {socialItems.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-brand-text transition hover:bg-brand-deep hover:text-white"
          >
            <Icon size={15} />
          </a>
        </li>
      ))}
    </ul>
  );
}
