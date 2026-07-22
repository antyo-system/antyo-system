"use client";

import { useTimer, AmbientSoundType } from "@/app/lib/timer-context";
import { Volume2, VolumeX, CloudRain, Music, Radio, Zap } from "lucide-react";

const SOUND_OPTIONS: { type: AmbientSoundType; label: string; icon: any }[] = [
  { type: "none", label: "Mute", icon: VolumeX },
  { type: "rain", label: "Rainfall", icon: CloudRain },
  { type: "lofi", label: "Lo-Fi Beats", icon: Music },
  { type: "white_noise", label: "White Noise", icon: Radio },
  { type: "alpha_waves", label: "Alpha Waves", icon: Zap },
];

export default function AmbientSoundSelector() {
  const { ambientSound, setAmbientSound } = useTimer();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
        Ambient Focus Generator
      </label>

      <div className="flex flex-wrap gap-2">
        {SOUND_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = ambientSound === opt.type;
          return (
            <button
              key={opt.type}
              onClick={() => setAmbientSound(opt.type)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
