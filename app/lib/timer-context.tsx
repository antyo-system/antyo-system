"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { addSession } from "@/app/lib/sessions";
import { addXP } from "@/app/lib/storage";

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  pillar: "time" | "finance" | "health" | "relationship" | "story";
}

export const SKILL_PRESETS: SkillItem[] = [
  { id: "s-1", name: "Fullstack Engineering", icon: "💻", pillar: "time" },
  { id: "s-2", name: "UI/UX & Product Design", icon: "🎨", pillar: "time" },
  { id: "s-3", name: "Writing & Reflection", icon: "✍️", pillar: "story" },
  { id: "s-4", name: "Financial Planning", icon: "📊", pillar: "finance" },
  { id: "s-5", name: "Mindful Meditation", icon: "🧘", pillar: "health" },
];

export type AmbientSoundType = "none" | "rain" | "lofi" | "white_noise" | "alpha_waves";

interface TimerContextType {
  status: "idle" | "running" | "paused";
  sessionType: "focus" | "break";
  duration: number; // in seconds
  breakDuration: number; // in seconds
  timeLeft: number; // in seconds
  currentTitle: string;
  selectedSkill: SkillItem;
  ambientSound: AmbientSoundType;
  showCompleteOverlay: boolean;
  lastCompletedSession: {
    title: string;
    durationMinutes: number;
    skill: SkillItem;
    xpEarned: number;
  } | null;

  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  setDuration: (focusSeconds: number, breakSeconds?: number) => void;
  setCurrentTitle: (title: string) => void;
  setSelectedSkill: (skill: SkillItem) => void;
  setAmbientSound: (sound: AmbientSoundType) => void;
  closeCompleteOverlay: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

// Pure Web Audio API Ambient Sound Synthesizer Generator
class AmbientAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private activeNodes: (AudioNode | OscillatorNode)[] = [];
  private currentType: AmbientSoundType = "none";

  public play(type: AmbientSoundType) {
    this.stop();
    if (type === "none" || typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.currentType = type;

      if (type === "white_noise" || type === "rain") {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = type === "rain" ? "lowpass" : "bandpass";
        filter.frequency.value = type === "rain" ? 800 : 1200;

        const gain = this.ctx.createGain();
        gain.gain.value = 0.08;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
        this.activeNodes.push(noise);
      } else if (type === "alpha_waves" || type === "lofi") {
        // Binaural Alpha Beats (10Hz difference for deep focus)
        const oscLeft = this.ctx.createOscillator();
        const oscRight = this.ctx.createOscillator();
        oscLeft.type = "sine";
        oscRight.type = "sine";
        oscLeft.frequency.value = 210;
        oscRight.frequency.value = 220; // 10Hz Alpha difference

        const gain = this.ctx.createGain();
        gain.gain.value = 0.05;

        oscLeft.connect(gain);
        oscRight.connect(gain);
        gain.connect(this.ctx.destination);

        oscLeft.start();
        oscRight.start();
        this.activeNodes.push(oscLeft, oscRight);
      }
    } catch (e) {
      console.warn("Web Audio API Ambient failed to initialize", e);
    }
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      try {
        if ("stop" in node) (node as OscillatorNode).stop();
        node.disconnect();
      } catch {}
    });
    this.activeNodes = [];
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close();
    }
    this.ctx = null;
    this.currentType = "none";
  }
}

const audioSynth = new AmbientAudioSynthesizer();

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  const [duration, setDurationState] = useState(25 * 60);
  const [breakDuration, setBreakDurationState] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [currentTitle, setCurrentTitle] = useState("Deep Work Session");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILL_PRESETS[0]);
  const [ambientSound, setAmbientSoundState] = useState<AmbientSoundType>("none");
  const [showCompleteOverlay, setShowCompleteOverlay] = useState(false);
  const [lastCompletedSession, setLastCompletedSession] = useState<{
    title: string;
    durationMinutes: number;
    skill: SkillItem;
    xpEarned: number;
  } | null>(null);

  const startTimeRef = useRef<Date | null>(null);

  // Timer Tick Interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === "running") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, sessionType, duration, breakDuration, currentTitle, selectedSkill]);

  const handleComplete = () => {
    setStatus("idle");
    audioSynth.stop();

    if (sessionType === "focus") {
      const minutes = Math.max(1, Math.round(duration / 60));
      const xpEarned = minutes * 10;
      addXP(xpEarned);

      addSession({
        label: currentTitle || selectedSkill.name,
        type: "work",
        startTime: (startTimeRef.current || new Date()).toISOString(),
        endTime: new Date().toISOString(),
        durationMinutes: minutes,
      });

      setLastCompletedSession({
        title: currentTitle || selectedSkill.name,
        durationMinutes: minutes,
        skill: selectedSkill,
        xpEarned,
      });
      setShowCompleteOverlay(true);

      // Transition to Break Mode automatically
      setSessionType("break");
      setTimeLeft(breakDuration);
    } else {
      // Break completed -> back to Focus
      setSessionType("focus");
      setTimeLeft(duration);
    }
  };

  const startTimer = () => {
    if (status === "idle") {
      startTimeRef.current = new Date();
    }
    setStatus("running");
    if (ambientSound !== "none") {
      audioSynth.play(ambientSound);
    }
  };

  const pauseTimer = () => {
    setStatus("paused");
    audioSynth.stop();
  };

  const resetTimer = () => {
    setStatus("idle");
    audioSynth.stop();
    setTimeLeft(sessionType === "focus" ? duration : breakDuration);
  };

  const skipSession = () => {
    audioSynth.stop();
    if (sessionType === "focus") {
      setSessionType("break");
      setTimeLeft(breakDuration);
    } else {
      setSessionType("focus");
      setTimeLeft(duration);
    }
    setStatus("idle");
  };

  const setDuration = (focusSec: number, breakSec = 5 * 60) => {
    setDurationState(focusSec);
    setBreakDurationState(breakSec);
    if (status === "idle") {
      setTimeLeft(sessionType === "focus" ? focusSec : breakSec);
    }
  };

  const setAmbientSound = (type: AmbientSoundType) => {
    setAmbientSoundState(type);
    if (status === "running") {
      audioSynth.play(type);
    }
  };

  const closeCompleteOverlay = () => {
    setShowCompleteOverlay(false);
  };

  return (
    <TimerContext.Provider
      value={{
        status,
        sessionType,
        duration,
        breakDuration,
        timeLeft,
        currentTitle,
        selectedSkill,
        ambientSound,
        showCompleteOverlay,
        lastCompletedSession,
        startTimer,
        pauseTimer,
        resetTimer,
        skipSession,
        setDuration,
        setCurrentTitle,
        setSelectedSkill,
        setAmbientSound,
        closeCompleteOverlay,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
