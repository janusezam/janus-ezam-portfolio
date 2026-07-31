"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface border border-surface-border transition-all duration-300 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      id="theme-toggle"
    >
      {/* Track background */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-r from-[#0B1120] to-[#1A2438] opacity-100"
              : "bg-gradient-to-r from-[#DBEAFE] to-[#93C5FD] opacity-100"
          }`}
        />
      </span>

      {/* Toggle knob */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === "dark"
            ? "left-0.5 bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(66,153,225,0.5)]"
            : "left-[calc(100%-1.625rem)] bg-gradient-to-br from-sky-300 to-blue-400 shadow-[0_0_10px_rgba(66,153,225,0.4)]"
        }`}
      >
        {/* Sun icon */}
        {theme === "light" && (
          <svg
            className="w-3.5 h-3.5 text-blue-900"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {/* Moon icon */}
        {theme === "dark" && (
          <svg
            className="w-3.5 h-3.5 text-blue-100"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>
    </button>
  );
}
