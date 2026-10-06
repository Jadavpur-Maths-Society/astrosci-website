"use client";

import type { CSSProperties } from "react";

interface CometLineProps {
  color?: string;
  className?: string;
}

/** A quiet section divider with a slow, ember-lit comet pass. */
export default function CometLine({ color = "#ff7a29", className = "" }: CometLineProps) {
  return (
    <div
      aria-hidden="true"
      className={`comet-line ${className}`}
      style={{ "--comet-color": color } as CSSProperties & { "--comet-color": string }}
    >
      <span className="comet-line__beam" />
    </div>
  );
}
