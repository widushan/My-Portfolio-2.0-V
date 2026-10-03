import { site } from "@/data/site";
import SocialLinks from "./SocialLinks";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
