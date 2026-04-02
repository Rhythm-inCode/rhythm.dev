// src/components/ui/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Logbook", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -8, duration: 0.2, ease: "power2.in",
      });
    }
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 0 24px rgba(0,212,255,0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 h-14 sm:h-16 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="relative group flex items-center gap-2 select-none"
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "#00d4ff",
                boxShadow: "0 0 8px #00d4ff, 0 0 20px rgba(0,212,255,0.4)",
              }}
            />
            <span
              className="text-white font-bold uppercase tracking-[0.25em]"
              style={{
                fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
                fontSize: "clamp(0.55rem, 2vw, 0.75rem)",
              }}
            >
              RHYTHM
            </span>
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
                    fontSize: "clamp(0.55rem, 1.2vw, 0.68rem)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.15))",
                      boxShadow: "0 0 6px #00d4ff",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me CTA — desktop */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden md:flex items-center px-4 lg:px-5 py-2 relative overflow-hidden group transition-all duration-300"
            style={{
              fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
              fontSize: "clamp(0.55rem, 1.2vw, 0.68rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              border: "1px solid rgba(0,212,255,0.35)",
              color: "#00d4ff",
            }}
          >
            <span className="relative z-10">Hire Me</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,212,255,0.08)" }}
            />
          </a>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300"
                style={{
                  background: "#00d4ff",
                  boxShadow: "0 0 4px #00d4ff",
                  width: i === 1 ? "1rem" : "1.5rem",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(3px, 3px)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(3px, -3px)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 md:hidden flex flex-col pt-20 px-6 sm:px-8"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(20px)" }}
        >
          <ul className="flex flex-col gap-6 mt-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block font-bold uppercase tracking-widest transition-colors duration-200"
                  style={{
                    fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
                    fontSize: "clamp(1.2rem, 6vw, 1.8rem)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#00d4ff")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me in mobile menu too */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-10 inline-flex items-center px-5 py-3 self-start"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              border: "1px solid rgba(0,212,255,0.35)",
              color: "#00d4ff",
            }}
          >
            Hire Me
          </a>

          <div
            className="mt-auto mb-12 h-px w-full"
            style={{
              background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
              boxShadow: "0 0 12px rgba(0,212,255,0.4)",
            }}
          />
        </div>
      )}
    </>
  );
}