# Portfolio (Next.js)

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Content lives in `src/data/site.ts`.

## Setup
1. `npm install`
2. Copy your old site's `images/` folder into `public/images/` (same file names: `profile.png`, `about_new.png`, `services/*`, `webCertificates/*`).
3. Copy your CV to `public/cv.pdf` (renamed from `my cv.pdf`).
4. Copy `.env.example` to `.env.local` and fill in your SMTP details (see below).
5. `npm run dev` then open http://localhost:3000

## Contact form
`POST /api/contact` sends mail from the server with Nodemailer. Credentials come from env vars, so they never reach the browser.
On Vercel, add the same variables under Project Settings, Environment Variables.

## Deploy
Push to GitHub, import the repo on Vercel, add the env vars, deploy.

## Customising
- Text, projects, skills, certificates, services: `src/data/site.ts`
- Colours: `tailwind.config.ts` (`brand`) and the CSS variables in `src/app/globals.css`
- Testimonials: add real entries to `testimonials` in `site.ts`; the section appears automatically.
