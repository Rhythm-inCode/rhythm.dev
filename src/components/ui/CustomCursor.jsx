// src/components/ui/CustomCursor.jsx
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const hoveredRef = useRef(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — hide custom cursor entirely
    const checkTouch = () => setIsTouch(window.matchMedia("(hover: none)").matches);
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onMouseEnterLink = () => { hoveredRef.current = true; };
    const onMouseLeaveLink = () => { hoveredRef.current = false; };

    window.addEventListener("mousemove", onMouseMove);

    const attachHover = () => {
      const els = document.querySelectorAll("a, button, [data-cursor]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
        el.style.cursor = "none";
      });
    };
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        const size = hoveredRef.current ? 42 : 28;
        const offset = size / 2;
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = hoveredRef.current ? "1" : "0.5";
        ringRef.current.style.borderColor = hoveredRef.current ? "#00d4ff" : "rgba(255,255,255,0.6)";
        ringRef.current.style.boxShadow = hoveredRef.current ? "0 0 12px rgba(0,212,255,0.5)" : "0 0 6px rgba(0,212,255,0.2)";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      const els = document.querySelectorAll("a, button, [data-cursor]");
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 6px rgba(255,255,255,0.8)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full transition-[width,height,opacity,border-color,box-shadow] duration-200"
        style={{ width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 0 6px rgba(0,212,255,0.2)", willChange: "transform", background: "transparent" }}
      />
    </>
  );
}