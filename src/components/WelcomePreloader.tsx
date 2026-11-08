"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import LoaderCliSpinner from "@/components/ui/loader-cli-spinner";
import SpecialText from "@/components/ui/special-text";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  try {
    return Boolean(sessionStorage.getItem("janus_portfolio_visited"));
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return true; // Prerender as true on server so no HTML hydration mismatch
}

export function useHasVisitedPortfolio() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type WelcomePreloaderProps = {
  onFadingOut?: () => void;
  onComplete?: () => void;
};

export default function WelcomePreloader({
  onFadingOut,
  onComplete,
}: WelcomePreloaderProps) {
  const isVisitedOnClient = useHasVisitedPortfolio();
  const [dismissedManually, setDismissedManually] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Animation timeline state
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const dismiss = useCallback(() => {
    setIsFadingOut(true);
    onFadingOut?.();
    try {
      sessionStorage.setItem("janus_portfolio_visited", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setTimeout(() => {
      setDismissedManually(true);
      document.body.style.overflow = "";
      onComplete?.();
    }, 750);
  }, [onFadingOut, onComplete]);

  useEffect(() => {
    if (isVisitedOnClient) return;

    document.body.style.overflow = "hidden";

    // Sequence stages: timed to allow full appreciation of CLI animation & scramble
    const timer1 = setTimeout(() => setStep1Done(true), 1600);
    const timer2 = setTimeout(() => setStep2Done(true), 3300);
    const timer3 = setTimeout(() => {
      setStep3Done(true);
      setShowWelcome(true);
    }, 4800);

    // Auto-dismiss after scramble resolves and user comfortably reads the message
    const timerDismiss = setTimeout(() => {
      dismiss();
    }, 8500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerDismiss);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVisitedOnClient, dismiss]);

  // If already visited in session or manually dismissed, do not render
  if (isVisitedOnClient || dismissedManually) {
    return null;
  }

  return (
    <div
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Preloader"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background p-4 cursor-pointer transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Terminal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-lg border border-surface-border bg-surface font-mono text-xs sm:text-sm text-text-primary shadow-2xl overflow-hidden cursor-default transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFadingOut
            ? "opacity-0 -translate-y-5 scale-[0.97] blur-[1px]"
            : "opacity-100 translate-y-0 scale-100 blur-0"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-2.5 bg-surface/50">
          <div className="flex items-center gap-2">
            <span className="size-2.5 sm:size-3 rounded-full bg-[#ef4444]" />
            <span className="size-2.5 sm:size-3 rounded-full bg-[#eab308]" />
            <span className="size-2.5 sm:size-3 rounded-full bg-[#22c55e]" />
            <span className="ml-2 text-xs font-mono text-text-muted">bash ~ janus@portfolio</span>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="text-[11px] font-mono text-text-muted hover:text-accent transition-colors cursor-pointer"
          >
            [skip ↵]
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* CLI Invocation */}
          <div className="text-text-muted">
            <span className="text-accent font-bold">$</span> npm run init:portfolio
          </div>

          {/* Step 1: Resolving Dependencies */}
          <div className="flex items-center gap-2.5">
            {step1Done ? (
              <span className="text-emerald-500 font-bold">✓</span>
            ) : (
              <LoaderCliSpinner variant="braille-spin" className="text-accent" />
            )}
            <span className={step1Done ? "text-text-muted" : "text-text-primary"}>
              {step1Done ? "Dependencies resolved" : "Resolving dependencies"}
            </span>
          </div>

          {/* Step 2: Building Modules */}
          {step1Done && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              {step2Done ? (
                <span className="text-emerald-500 font-bold">✓</span>
              ) : (
                <LoaderCliSpinner variant="aesthetic" className="text-accent" />
              )}
              <span className={step2Done ? "text-text-muted" : "text-text-primary"}>
                {step2Done ? "Modules compiled" : "Building modules"}
              </span>
            </div>
          )}

          {/* Step 3: Compiling */}
          {step2Done && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              {step3Done ? (
                <span className="text-emerald-500 font-bold">✓</span>
              ) : (
                <LoaderCliSpinner variant="line-dash" className="text-accent" />
              )}
              <span className={step3Done ? "text-text-muted" : "text-text-primary"}>
                {step3Done ? "Environment ready" : "Compiling portfolio"}
              </span>
            </div>
          )}

          {/* Step 4: Text Scramble Effect "Welcome To My Portfolio" */}
          {showWelcome && (
            <div className="pt-3 border-t border-surface-border mt-4 animate-fade-in">
              <div className="text-[11px] font-mono uppercase tracking-widest text-text-muted mb-1.5 flex items-center justify-between">
                <span>STATUS: READY</span>
                <span className="text-[10px] text-emerald-500 font-mono">100% loaded</span>
              </div>
              <div className="text-base sm:text-xl font-bold tracking-tight text-accent font-mono py-1">
                <SpecialText speed={28} delay={0.1}>
                  Welcome To My Portfolio
                </SpecialText>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Hint */}
      <p
        className={`mt-4 text-xs font-mono text-text-muted tracking-wider transition-opacity duration-500 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        Click anywhere or press <kbd className="px-1.5 py-0.5 rounded border border-surface-border bg-surface text-text-primary text-[10px]">ESC</kbd> to skip
      </p>
    </div>
  );
}
