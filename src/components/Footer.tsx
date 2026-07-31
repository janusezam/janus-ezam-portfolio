import { siteMeta } from "@/data/site";

export default function Footer() {
  return (
    <footer className="w-full bg-footer-bg border-t border-card-border py-8">
      <p className="text-center text-footer-text text-xs tracking-wider font-mono">
        © {siteMeta.copyrightName} &nbsp;|&nbsp; Personal Portfolio{" "}
        {siteMeta.copyrightYear}
      </p>
    </footer>
  );
}
