// src/components/sections/ContactSection.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID  = "service_r8qr04m";
const EMAILJS_TEMPLATE_ID = "template_hlth0yt";
const EMAILJS_PUBLIC_KEY  = "1lLVOd6xQAqq3YnPu";

const CHANNELS = [
  {
    id: "email",
    label: "Signal",
    sub: "Primary Channel",
    value: "rhythmln1104@gmail.com",
    action: "copy",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Network",
    sub: "Professional Grid",
    value: "https://www.linkedin.com/in/rhythm-singh-b2a6ab250/",
    action: "link",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    id: "github",
    label: "Source Vault",
    sub: "Code Repository",
    value: "https://github.com/Rhythm-inCode",
    action: "link",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
];

function InputField({ label, name, type = "text", value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);

  const sharedStyle = {
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "#00d4ff" : "rgba(255,255,255,0.1)"}`,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
    outline: "none",
    width: "100%",
    padding: "10px 0",
    transition: "border-color 0.3s",
    resize: "none",
    boxShadow: focused ? "0 1px 0 0 rgba(0,212,255,0.4)" : "none",
  };

  return (
    <div className="flex flex-col gap-2">
      <span
        className="uppercase tracking-[0.35em] font-medium"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.58rem, 1.5vw, 0.68rem)",
          color: focused ? "rgba(0,212,255,0.7)" : "rgba(255,255,255,0.3)",
          transition: "color 0.3s",
        }}
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4}
          style={{ ...sharedStyle, paddingTop: "8px" }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="placeholder-[rgba(255,255,255,0.15)]"
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
          style={sharedStyle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="placeholder-[rgba(255,255,255,0.15)]"
        />
      )}
    </div>
  );
}

function ChannelCard({ channel }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (channel.action === "copy") {
      navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(channel.value, "_blank", "noopener noreferrer");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 w-full text-left transition-all duration-300"
      style={{
        border: "1px solid rgba(0,212,255,0.18)",
        background: "rgba(0,212,255,0.05)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.background = "rgba(0,212,255,0.05)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.08)"; e.currentTarget.style.background = "rgba(0,212,255,0.02)"; }}
    >
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center" style={{ border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.9)" }}>
        {channel.icon}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.55rem, 1.4vw, 0.65rem)", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(0,212,255,0.80)" }}>{channel.sub}</span>
        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(0.72rem, 2vw, 0.85rem)", fontWeight: 700, color: "rgba(255,255,255,0.9)" }} className="truncate">{channel.label}</span>
      </div>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)", textTransform: "uppercase", letterSpacing: "0.15em", color: copied ? "#00d4ff" : "rgba(255,255,255,0.45)", flexShrink: 0 }}>
        {channel.action === "copy" ? (copied ? "[ COPIED ]" : "[ COPY ]") : "[ OPEN ]"}
      </span>
    </button>
  );
}

export default function ContactSection() {
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
    });
    gsap.fromTo(lineRef.current, { scaleX: 0 }, {
      scaleX: 1, duration: 0.9, delay: 0.3, ease: "power3.out", transformOrigin: "left center",
      scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
    });
    gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.9, delay: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: leftRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: rightRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        subject: form.subject || "New transmission from portfolio",
        message: form.message, to_name: "Rhythm",
      }, EMAILJS_PUBLIC_KEY);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-28 md:py-36 px-6 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[700px] h-[300px] md:h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(0,212,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-baseline gap-4 mb-4">
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,212,255,0.5)" }}>05 /</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2.5rem, 9vw, 4.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>Initiate</h2>
          </div>
          <div ref={lineRef} className="h-px w-32" style={{ background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.08))", boxShadow: "0 0 10px rgba(0,212,255,0.35)" }} />
          <p className="mt-4 sm:mt-5 max-w-xs sm:max-w-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
            Open to opportunities, collabs, and interesting problems. Transmission goes straight to my inbox.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">

          {/* Left — Channels */}
          <div ref={leftRef} className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-2">
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.58rem, 1.5vw, 0.68rem)", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(0,212,255,0.4)" }}>Transmission Channels</span>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>Pick a channel or send a direct transmission via the form.</p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              {CHANNELS.map((ch) => (<ChannelCard key={ch.id} channel={ch} />))}
            </div>

            {/* Resume Download */}
            <a
              href="/Rhythm.pdf"
              download="Rhythm_Singh_Resume.pdf"
              className="group flex items-center justify-between p-3 sm:p-4 transition-all duration-300"
              style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"; e.currentTarget.style.background = "rgba(0,212,255,0.07)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; e.currentTarget.style.background = "rgba(0,212,255,0.03)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(0,212,255,0.2)", color: "rgba(0,212,255,0.7)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <polyline points="9,15 12,18 15,15"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(0.62rem, 1.8vw, 0.72rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Download CV</span>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.44rem, 1.2vw, 0.52rem)", color: "rgba(0,212,255,0.45)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Operator Dossier · PDF</span>
                </div>
              </div>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.44rem, 1.2vw, 0.52rem)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", flexShrink: 0 }}>[ EXTRACT ]</span>
            </a>

            {/* Status block */}
            <div className="flex items-center gap-3 mt-1 sm:mt-2" style={{ borderLeft: "1px solid rgba(0,212,255,0.15)", paddingLeft: "16px" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00d4ff", boxShadow: "0 0 6px #00d4ff", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Available for new missions</span>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className="flex flex-col gap-6">
            <div
              className="relative p-6 sm:p-7 md:p-9 flex flex-col gap-5 sm:gap-6"
              style={{ border: "1px solid rgba(0,212,255,0.22)", background: "linear-gradient(145deg, rgba(0,212,255,0.03) 0%, rgba(0,0,0,0.4) 100%)", backdropFilter: "blur(10px)" }}
            >
              <span className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1px solid rgba(0,212,255,0.4)", borderRight: "1px solid rgba(0,212,255,0.4)" }} />
              <span className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: "1px solid rgba(0,212,255,0.4)", borderLeft: "1px solid rgba(0,212,255,0.4)" }} />

              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.48rem, 1.3vw, 0.55rem)", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(0,212,255,0.75)" }}>Direct Transmission</span>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <InputField label="Callsign" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                  <InputField label="Return Signal" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <InputField label="Mission Brief" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                <InputField label="Transmission Body" name="message" value={form.message} onChange={handleChange} placeholder="Full message..." multiline />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 overflow-hidden group transition-all duration-300 mt-1 sm:mt-2"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "clamp(0.62rem, 1.8vw, 0.75rem)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    border: "1px solid rgba(0,212,255,0.4)",
                    color: status === "sent" ? "#00d4ff" : "rgba(255,255,255,0.85)",
                    opacity: status === "sending" ? 0.6 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.15)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(0,212,255,0.06)" }} />
                  <span className="relative z-10">
                    {status === "idle" && "Transmit"}
                    {status === "sending" && "Transmitting..."}
                    {status === "sent" && "Transmission Received"}
                    {status === "error" && "Signal Lost — Retry"}
                  </span>
                  {status === "idle" && (
                    <svg className="relative z-10" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-16 sm:mt-20 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-px flex-1 w-full md:w-auto" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)" }} />
          <span className="px-4 sm:px-6 text-center flex-shrink-0" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(0.44rem, 1.2vw, 0.55rem)", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.15)" }}>
            Rhythm © {new Date().getFullYear()} — All systems operational
          </span>
          <div className="h-px flex-1 w-full md:w-auto" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)" }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}