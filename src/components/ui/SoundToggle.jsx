// src/components/ui/SoundToggle.jsx
import { useEffect, useRef, useState } from "react";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const stopAll = () => {
    nodesRef.current.forEach((n) => { try { n.stop(); } catch {} });
    nodesRef.current = [];
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
  };

  const startAmbient = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);

    const drone = ctx.createOscillator();
    drone.type = "sine";
    drone.frequency.setValueAtTime(55, ctx.currentTime);
    drone.frequency.linearRampToValueAtTime(58, ctx.currentTime + 8);
    drone.frequency.linearRampToValueAtTime(55, ctx.currentTime + 16);
    const droneGain = ctx.createGain(); droneGain.gain.value = 0.6;
    drone.connect(droneGain); droneGain.connect(masterGain); drone.start();
    nodesRef.current.push(drone);

    const hum = ctx.createOscillator();
    hum.type = "triangle";
    hum.frequency.setValueAtTime(110, ctx.currentTime);
    hum.frequency.linearRampToValueAtTime(112, ctx.currentTime + 5);
    hum.frequency.linearRampToValueAtTime(110, ctx.currentTime + 10);
    const humGain = ctx.createGain(); humGain.gain.value = 0.3;
    hum.connect(humGain); humGain.connect(masterGain); hum.start();
    nodesRef.current.push(hum);

    const shimmer = ctx.createOscillator();
    shimmer.type = "sine"; shimmer.frequency.setValueAtTime(880, ctx.currentTime);
    const shimmerGain = ctx.createGain(); shimmerGain.gain.setValueAtTime(0.02, ctx.currentTime);
    shimmer.connect(shimmerGain); shimmerGain.connect(masterGain); shimmer.start();
    nodesRef.current.push(shimmer);

    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.3;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain); lfoGain.connect(shimmerGain.gain); lfo.start();
    nodesRef.current.push(lfo);
  };

  const toggle = () => {
    if (enabled) { stopAll(); setEnabled(false); }
    else { startAmbient(); setEnabled(true); }
  };

  useEffect(() => { return () => stopAll(); }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[9997] flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 transition-all duration-300 group"
      style={{
        border: enabled ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
        background: enabled ? "rgba(0,212,255,0.06)" : "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        boxShadow: enabled ? "0 0 16px rgba(0,212,255,0.1)" : "none",
      }}
      title={enabled ? "Mute ambient" : "Enable ambient sound"}
    >
      <div className="flex items-center gap-0.5" style={{ height: "12px" }}>
        {[3, 7, 5, 10, 4, 8, 3].map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: enabled ? `${h}px` : "3px",
              background: enabled ? "#00d4ff" : "rgba(255,255,255,0.25)",
              boxShadow: enabled ? "0 0 4px rgba(0,212,255,0.5)" : "none",
              transition: `height ${0.2 + i * 0.05}s ease, background 0.3s`,
              animation: enabled ? `wave-bar-${i} ${0.8 + i * 0.15}s ease-in-out infinite alternate` : "none",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.44rem, 1.2vw, 0.52rem)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: enabled ? "rgba(0,212,255,0.8)" : "rgba(255,255,255,0.25)",
          transition: "color 0.3s",
        }}
      >
        {enabled ? "SND ON" : "SND OFF"}
      </span>

      <style>{`
        @keyframes wave-bar-0 { from { height: 3px; } to { height: 3px; } }
        @keyframes wave-bar-1 { from { height: 4px; } to { height: 9px; } }
        @keyframes wave-bar-2 { from { height: 5px; } to { height: 7px; } }
        @keyframes wave-bar-3 { from { height: 6px; } to { height: 12px; } }
        @keyframes wave-bar-4 { from { height: 4px; } to { height: 6px; } }
        @keyframes wave-bar-5 { from { height: 5px; } to { height: 10px; } }
        @keyframes wave-bar-6 { from { height: 3px; } to { height: 5px; } }
      `}</style>
    </button>
  );
}