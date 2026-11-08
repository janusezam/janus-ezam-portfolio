import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary px-6 text-center font-mono">
      <div className="border border-surface-border bg-surface p-8 rounded-lg max-w-md w-full shadow-lg">
        <span className="text-accent text-xs tracking-widest font-semibold uppercase">Error 404</span>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-text-muted text-xs mb-6">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}

