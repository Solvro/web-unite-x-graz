import * as React from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

type Lang = "pl" | "en" | "de";

export function Flag({ code, className }: { code: Lang; className?: string }) {
  const id = useId();
  const classes = cn("h-full w-full size-9", className);

  if (code === "pl") {
    return (
      <span
        aria-label="Polish"
        title="Polish"
        className="block h-full w-full rounded-full"
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={classes}
        >
          <defs>
            <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill={`url(#${id}-grad)`} />
        </svg>
      </span>
    );
  }

  if (code === "en") {
    return (
      <span
        className="block h-full w-full rounded-full"
        aria-label="English"
        title="English"
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={classes}
        >
          <defs>
            <clipPath id={`${id}-clip`}>
              <circle cx="50" cy="50" r="50" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${id}-clip)`}>
            <rect width="100" height="100" fill="#012169" />
            <path
              d="M0 0 L100 100 M100 0 L0 100"
              stroke="#ffffff"
              strokeWidth="16"
            />
            <path
              d="M0 0 L100 100 M100 0 L0 100"
              stroke="#C8102E"
              strokeWidth="8"
            />
            <path d="M50 0 V100 M0 50 H100" stroke="#ffffff" strokeWidth="28" />
            <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="16" />
          </g>
        </svg>
      </span>
    );
  }

  return (
    <span
      className="block h-full w-full rounded-full"
      aria-label="German"
      title="German"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={classes}
      >
        <defs>
          <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="33.3333%" stopColor="#000000" />
            <stop offset="33.3333%" stopColor="#dd0000" />
            <stop offset="66.6667%" stopColor="#dd0000" />
            <stop offset="66.6667%" stopColor="#ffce00" />
            <stop offset="100%" stopColor="#ffce00" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill={`url(#${id}-grad)`} />
      </svg>
    </span>
  );
}
