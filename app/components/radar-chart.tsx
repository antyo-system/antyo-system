"use client";

import { useState } from "react";
import { Sparkles, Trophy, Flame } from "lucide-react";

export interface PillarData {
  name: string;
  key: string;
  score: number; // 0 to 100
  icon: string;
  color: string;
}

interface RadarChartProps {
  pillars?: PillarData[];
}

const DEFAULT_PILLARS: PillarData[] = [
  { name: "Time", key: "time", score: 85, icon: "⏱️", color: "text-indigo-400" },
  { name: "Finance", key: "finance", score: 90, icon: "💰", color: "text-emerald-400" },
  { name: "Health", key: "health", score: 82, icon: "💧", color: "text-blue-400" },
  { name: "Relationship", key: "relationship", score: 78, icon: "👥", color: "text-pink-400" },
  { name: "Story", key: "story", score: 88, icon: "📖", color: "text-purple-400" },
];

export default function RadarChart({ pillars = DEFAULT_PILLARS }: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Radar Layout Geometry (Size: 340 x 340, Center: 170, 170, Radius: 105)
  const size = 340;
  const center = size / 2;
  const radius = 105;
  const totalAxes = pillars.length;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to compute (x, y) coordinates for angle & ratio
  const getCoordinates = (index: number, valueRatio: number) => {
    // Angle in radians (start at top / -pi/2)
    const angle = (2 * Math.PI * index) / totalAxes - Math.PI / 2;
    const r = radius * valueRatio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid pentagon polygon string for a given level
  const getGridPolygonPoints = (levelRatio: number) => {
    return Array.from({ length: totalAxes })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, levelRatio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  // Build the score polygon points
  const dataPolygonPoints = pillars
    .map((p, i) => {
      const { x, y } = getCoordinates(i, p.score / 100);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // Calculate average RPG balance score
  const avgScore = Math.round(
    pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length
  );

  const getRankBadge = (score: number) => {
    if (score >= 90) return { rank: "S-CLASS", color: "text-amber-300 bg-amber-950/80 border-amber-500/50" };
    if (score >= 80) return { rank: "A-CLASS", color: "text-indigo-300 bg-indigo-950/80 border-indigo-500/50" };
    if (score >= 70) return { rank: "B-CLASS", color: "text-blue-300 bg-blue-950/80 border-blue-500/50" };
    return { rank: "C-CLASS", color: "text-zinc-400 bg-zinc-900 border-zinc-700" };
  };

  const rankInfo = getRankBadge(avgScore);

  return (
    <div className="relative flex flex-col items-center rounded-3xl border border-indigo-500/30 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
      {/* RPG HUD Header */}
      <div className="flex w-full items-center justify-between pb-3 border-b border-zinc-800 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
          <h3 className="text-xs font-mono font-extrabold tracking-widest text-zinc-100 uppercase">
            5 LIFE PILLARS — RPG RADAR STAT WHEEL
          </h3>
        </div>

        <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono font-extrabold tracking-wider shadow-md ${rankInfo.color}`}>
          <Trophy className="h-3.5 w-3.5" />
          <span>{rankInfo.rank} ({avgScore} PTS)</span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative flex items-center justify-center my-3">
        <svg width={size} height={size} className="overflow-visible">
          <defs>
            {/* Gradient Fill for Radar Polygon */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </radialGradient>

            {/* Neon Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Pentagons (Background Webs) */}
          {levels.map((lvl, idx) => (
            <polygon
              key={idx}
              points={getGridPolygonPoints(lvl)}
              className="fill-none stroke-zinc-700/70"
              strokeWidth={idx === levels.length - 1 ? "1.5" : "1"}
              strokeDasharray={idx < levels.length - 1 ? "3 3" : undefined}
            />
          ))}

          {/* Spoke lines from center to outer ring */}
          {pillars.map((_, i) => {
            const { x, y } = getCoordinates(i, 1.0);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                className="stroke-zinc-800"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Dynamic Score Polygon Fill */}
          <polygon
            points={dataPolygonPoints}
            fill="url(#radarGlow)"
            className="stroke-indigo-400 transition-all duration-500 ease-out"
            strokeWidth="3"
            filter="url(#neonGlow)"
          />

          {/* Vertex Points & Labels */}
          {pillars.map((pillar, i) => {
            const point = getCoordinates(i, pillar.score / 100);
            const outerPoint = getCoordinates(i, 1.22); // Label position
            const isHovered = hoveredIndex === i;

            return (
              <g key={pillar.key} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                {/* Vertex Point Circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 8 : 5.5}
                  className={`cursor-pointer transition-all duration-200 ${
                    isHovered
                      ? "fill-amber-300 stroke-white stroke-2 shadow-lg"
                      : "fill-indigo-400 stroke-zinc-950 stroke-2"
                  }`}
                />

                {/* Axis Vertex Label */}
                <foreignObject
                  x={outerPoint.x - 45}
                  y={outerPoint.y - 18}
                  width="90"
                  height="36"
                  className="overflow-visible"
                >
                  <div
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl p-1 text-center transition-transform duration-200 ${
                      isHovered ? "scale-110 shadow-lg" : ""
                    }`}
                  >
                    <span className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1">
                      <span>{pillar.icon}</span>
                      <span>{pillar.name}</span>
                    </span>
                    <span className={`text-[10px] font-extrabold ${pillar.color}`}>
                      {pillar.score}%
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Pillar Badges Row */}
      <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2 border-t border-zinc-800 pt-3">
        {pillars.map((p, idx) => (
          <div
            key={p.key}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1 transition-all cursor-pointer ${
              hoveredIndex === idx
                ? "border-indigo-500 bg-indigo-950/80 shadow-md scale-105"
                : "border-zinc-800 bg-zinc-950/80"
            }`}
          >
            <span className="text-xs">{p.icon}</span>
            <span className="text-[11px] font-semibold text-zinc-300">
              {p.name}:
            </span>
            <span className={`text-[11px] font-mono font-black ${p.color}`}>{p.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
