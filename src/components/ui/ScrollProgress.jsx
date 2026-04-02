// src/components/ui/ScrollProgress.jsx
// No changes needed — already fully responsive
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / total) * 100;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-px pointer-events-none" style={{ background: "rgba(0,212,255,0.08)" }}>
      <div ref={barRef} className="h-full" style={{ width: "0%", background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.4))", boxShadow: "0 0 8px rgba(0,212,255,0.6)", transition: "width 0.1s linear" }} />
    </div>
  );
}