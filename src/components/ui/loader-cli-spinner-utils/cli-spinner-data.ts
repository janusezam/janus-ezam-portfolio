export type SpinnerDefinition = {
  interval: number;
  frames: string[];
};

export const CLI_SPINNERS = {
  "braille-spin": {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  },
  "aesthetic": {
    interval: 100,
    frames: [
      "■■■■■□□□",
      "□■■■■■□□",
      "□□■■■■■□",
      "□□□■■■■■",
      "■□□□■■■■",
      "■■□□□■■■",
      "■■■□□□■■",
      "■■■■□□□■",
    ],
  },
  "line-dash": {
    interval: 100,
    frames: ["-", "\\", "|", "/"],
  },
  "dots": {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  },
  "line": {
    interval: 130,
    frames: ["-", "\\", "|", "/"],
  },
  "arc": {
    interval: 100,
    frames: ["◜", "◠", "◝", "◞", "◡", "◟"],
  },
  "bounce": {
    interval: 120,
    frames: ["⠁", "⠂", "⠄", "⠂"],
  },
  "toggle": {
    interval: 250,
    frames: ["⊶", "⊷"],
  },
} as const satisfies Record<string, SpinnerDefinition>;

export const CLI_SPINNER_VARIANTS = [
  "braille-spin",
  "aesthetic",
  "line-dash",
  "dots",
  "line",
  "arc",
  "bounce",
  "toggle",
] as const;

export type CliSpinnerVariant = (typeof CLI_SPINNER_VARIANTS)[number] | keyof typeof CLI_SPINNERS;

