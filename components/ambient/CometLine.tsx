"use client";

interface CometLineProps {
  color?: string;
  className?: string;
}

/**
 * Section divider. It used to be a sweeping comet; now it is a single
 * hairline. Kept as a component so sections stay decoupled from styling.
 */
export default function CometLine({ color, className = "" }: CometLineProps) {
  void color;
  return (
    <div
      aria-hidden
      className={`relative h-px w-full ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(246,242,234,0.13) 18%, rgba(246,242,234,0.13) 82%, transparent)",
      }}
    />
  );
}
