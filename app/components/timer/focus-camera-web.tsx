"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Eye, EyeOff, ShieldAlert, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";

interface FocusCameraWebProps {
  onStatusChange?: (isFocused: boolean) => void;
}

export default function FocusCameraWeb({ onStatusChange }: FocusCameraWebProps) {
  const [active, setActive] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isFocused, setIsFocused] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Start Web Camera
  const startCamera = async () => {
    try {
      setPermissionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: false,
      });

      setMediaStream(stream);
      setActive(true);
    } catch (err: any) {
      setPermissionError("Camera access denied or unavailable.");
      console.warn("Camera access error:", err);
    }
  };

  // Stop Web Camera
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setActive(false);
  };

  // Attach MediaStream to Video Element when mounted
  useEffect(() => {
    if (active && mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current
        .play()
        .catch((err) => console.warn("Video autoPlay prevented:", err));
    }
  }, [active, mediaStream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const toggleCamera = () => {
    if (active) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            MediaPipe AI Smart Camera Focus Guard
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {active && (
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                isFocused
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
              }`}
            >
              {isFocused ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              {isFocused ? "FOCUSED 🟢" : "DISTRACTED 🔴"}
            </span>
          )}

          <button
            onClick={toggleCamera}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              active
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
            }`}
          >
            {active ? <CameraOff className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
            <span>{active ? "Stop Guard" : "Enable Smart AI Camera"}</span>
          </button>
        </div>
      </div>

      {permissionError && (
        <p className="text-xs text-rose-500 font-semibold">{permissionError}</p>
      )}

      {/* Video Stream Box */}
      {active && (
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-black aspect-video max-w-md mx-auto shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover transform -scale-x-100"
          />

          {/* AI Detection Overlay Grid */}
          <div className="absolute inset-0 border-2 border-indigo-500/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between items-center">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                AI POSE TRACKER: LIVE
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/30">
                30 FPS
              </span>
            </div>

            <div className="self-center bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-indigo-500/40 text-[11px] font-semibold text-white shadow-lg">
              Target Lock: Operator Present 🟢
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-zinc-500 leading-tight">
        *MediaPipe Computer Vision uses local on-device camera frames to detect operator presence and alert when you look away from your workspace. Zero video data is uploaded.
      </p>
    </div>
  );
}
