"use client";

interface Ring {
  r: number;
  dur: number;
  dot: number;
  color: string;
  dash: string;
  opacity: number;
  reverse?: boolean;
}

const RINGS: Ring[] = [
  { r: 132, dur: 16, dot: 4.5, color: "#38bdf8", dash: "3 8", opacity: 0.34 },
  { r: 200, dur: 26, dot: 3.5, color: "#a5b4fc", dash: "2 9", opacity: 0.26, reverse: true },
  { r: 268, dur: 38, dot: 3, color: "#34d399", dash: "2 11", opacity: 0.2 },
];

/**
 * Decorative satellite orbit rings — dashed circles with a glowing
 * satellite sweeping along each orbit at different speeds.
 * Purely presentational (aria-hidden), never intercepts the pointer.
 */
export default function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
        {RINGS.map((ring) => (
          <g
            key={ring.r}
            style={{
              transformOrigin: "300px 300px",
              transformBox: "view-box",
              animation: `astro-spin ${ring.dur}s linear infinite ${ring.reverse ? "reverse" : ""}`,
              willChange: "transform",
            }}
          >
            {/* orbit path */}
            <circle
              cx="300"
              cy="300"
              r={ring.r}
              stroke={ring.color}
              strokeOpacity={ring.opacity}
              strokeWidth="1"
              strokeDasharray={ring.dash}
            />
            {/* satellite glow */}
            <circle
              cx={300 + ring.r}
              cy="300"
              r={ring.dot * 2.6}
              fill={ring.color}
              opacity="0.22"
            />
            {/* satellite body */}
            <circle cx={300 + ring.r} cy="300" r={ring.dot} fill={ring.color} />
            <circle
              cx={300 + ring.r}
              cy="300"
              r={ring.dot * 0.45}
              fill="#f0f9ff"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
