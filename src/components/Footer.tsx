import { siteMeta } from "@/data/site";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-surface-border py-10">
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
        <p>
          © {siteMeta.copyrightYear} {siteMeta.copyrightName}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#hero"
            className="hover:text-accent transition-colors uppercase tracking-wider"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
