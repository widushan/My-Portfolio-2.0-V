import Link from "next/link";
import { btnPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-black text-brand-text">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        Back to Home
      </Link>
    </div>
  );
}
