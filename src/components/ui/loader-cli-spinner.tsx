"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  CLI_SPINNERS,
  type CliSpinnerVariant,
} from "@/components/ui/loader-cli-spinner-utils/cli-spinner-data";

export type LoaderCliSpinnerProps = {
  variant?: CliSpinnerVariant;
  speed?: number;
  size?: number | string;
  paused?: boolean;
  ariaLabel?: string;
  className?: string;
};

export function LoaderCliSpinner({
  variant = "braille-spin",
  speed = 1,
  size = "1em",
  paused = false,
  ariaLabel = "Loading",
  className,
}: LoaderCliSpinnerProps) {
  const spinner = CLI_SPINNERS[variant] ?? CLI_SPINNERS["braille-spin"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || speed <= 0) return;
    const delay = Math.max(16, spinner.interval / speed);
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % spinner.frames.length);
    }, delay);
    return () => window.clearInterval(id);
  }, [spinner, speed, paused]);

  const fontSize = typeof size === "number" ? `${size}px` : size;
  const currentFrame = spinner.frames[index % spinner.frames.length];

  return (
    <output
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center font-mono leading-none tabular-nums",
        className,
      )}
      style={{ fontSize, minWidth: "1ch" }}
    >
      <span aria-hidden="true">{currentFrame}</span>
    </output>
  );
}

export type { CliSpinnerVariant } from "@/components/ui/loader-cli-spinner-utils/cli-spinner-data";
export { CLI_SPINNER_VARIANTS } from "@/components/ui/loader-cli-spinner-utils/cli-spinner-data";

export default LoaderCliSpinner;
