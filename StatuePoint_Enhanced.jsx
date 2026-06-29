/**
 * Statue Point - Enhanced Mobile-First Fashion Boutique
 * Features: Cinematic Preloader, Horizontal Snap-Scrolls, SVG Iconography, Minimalist Aesthetics
 */

import { useState, useEffect, useRef } from "react";

// ── Icons (Replacing all emojis for premium feel) ─────────────────────
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Shop: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Gallery: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Contact: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Bag: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Star: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  WhatsApp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Location: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Quality: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Pricing: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Heritage: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Return: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>
};

// ── Cinematic Preloader ───────────────────────────────────────────────
function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2; // Adjust speed here
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 800); // Wait for fade transition
        }, 400);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        opacity: isFading ? 0 : 1,
        visibility: isFading ? "hidden" : "visible",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), visibility 0.8s",
      }}
    >
      <div
        style={{
          fontSize: "clamp(24px, 5vw, 32px)",
          fontWeight: 800,
          letterSpacing: "0.2em",
          fontFamily: "Inter, sans-serif",
          transform: isFading ? "translateY(-20px)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        STATUE<span style={{ color: "#F5C518" }}>.</span>POINT
      </div>
      <div
        style={{
          width: 200,
          height: 1,
          background: "#333",
          marginTop: 40,
          overflow: "hidden",
          opacity: isFading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#F5C518",
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <div style={{ marginTop: 16, fontSize: 10, letterSpacing: "0.3em", color: "#666", fontFamily: "JetBrains Mono, monospace" }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}

// ── Utility: useParallax ──────────────────────────────────────────────
function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const scrolled = window.innerHeight / 2 - rect.top - rect.height / 2;
            setOffset(scrolled * speed);
          };
          window.addEventListener("scroll", handleScroll, { passive: true });
          handleScroll();
          return () => window.removeEventListener("scroll", handleScroll);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [speed]);

  return [ref, offset];
}

// ── Utility: useScrollReveal ──────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ── Utility: useTypeLoop ──────────────────────────────────────────────
function useTypeLoop(words, typingSpeed = 80, pause = 2000, deletingSpeed = 40) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = words[wordIdx];
    if (phase === "typing") {
      if (display.length < current.length) {
        const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [display, phase, wordIdx, words, typingSpeed, pause, deletingSpeed]);

  return display;
}

// ── RevealBox ─────────────────────────────────────────────────────────
function RevealBox({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useScrollReveal();

  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
    scale: "scale(0.95)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction] || "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Ticker Tape ───────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "✦ FREE DELIVERY ABOVE ₹1,499",
    "✦ 5.0 RATED BOUTIQUE",
    "✦ PREMIUM LINEN & GEORGETTE",
    "✦ DAHISAR EAST, MUMBAI",
    "✦ OPEN TILL 10PM DAILY",
    "✦ BANARASI ORGANZA SILK",
    "✦ EASY 7-DAY RETURNS",
  ];
  const full = [...items, ...items];

  return (
    <div
      style={{
        background: "#0A0A0A",
        color: "#fff",
        fontSize: 10,
        letterSpacing: "0.2em",
        fontFamily: "JetBrains Mono, monospace",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: 0,
          animation: "ticker 32s linear infinite",
        }}
      >
        {full.map((item, i) => (
          <span key={i} style={{ padding: "0 32px", color: "#aaa" }}>
            {item.replace("✦", "")} <span style={{ color: "#F5C518", margin: "0 8px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar({ cartCount, currentScreen, setScreen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Shop", id: "shop" },
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { setScreen("home"); setMenuOpen(false); }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#0A0A0A",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.1,
            }}
          >
            STATUE<span style={{ color: "#F5C518" }}>.</span>POINT
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.3em",
              color: "#aaa",
              fontFamily: "JetBrains Mono, monospace",
              marginTop: 2,
            }}
          >
            DAHISAR EAST · MUMBAI
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setScreen(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: currentScreen === l.id ? "#0A0A0A" : "#888",
                borderBottom: currentScreen === l.id ? "1.5px solid #0A0A0A" : "1.5px solid transparent",
                paddingBottom: 4,
                transition: "all 0.3s",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setScreen("cart")}
            style={{
              background: "transparent",
              color: "#0A0A0A",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "transform 0.2s",
              flexShrink: 0,
              position: "relative",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Icons.Bag />
            {cartCount > 0 && (
              <span style={{ 
                background: "#F5C518", color: "#0A0A0A", borderRadius: "50%", 
                width: 18, height: 18, fontSize: 10, fontWeight: 700, 
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "absolute", top: -6, right: -10
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger - mobile only */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
              lineHeight: 1,
              display: "none",
              color: "#0A0A0A"
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          maxHeight: menuOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          borderTop: menuOpen ? "1px solid #f0f0f0" : "none",
          background: "#fff",
        }}
      >
        <div style={{ padding: "8px 20px 20px" }}>
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { setScreen(l.id); setMenuOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "16px 4px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: currentScreen === l.id ? "#0A0A0A" : "#888",
                borderBottom: "1px solid #f5f5f5",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                animation: menuOpen ? `slideDown 0.4s ease ${i * 40}ms both` : "none",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────
function HeroSection({ setScreen }) {
  const typeText = useTypeLoop(
    ["Premium Linen", "Banarasi Silk", "Ethnic Fusion", "Modern Silhouettes", "Festive Wear"],
    80,
    2200,
    45
  );
  const [heroBgRef, heroBgOffset] = useParallax(0.3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        background: "#F8F7F4",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Parallax BG image */}
      <div
        ref={heroBgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${heroBgOffset}px)`,
          opacity: 0.15,
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(48px, 12vw, 100px) 20px clamp(60px, 10vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
          width: "100%",
          flex: 1,
        }}
      >
        {/* Left: text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              width: "fit-content",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(16px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              style={{
                background: "#0A0A0A",
                color: "#fff",
                fontSize: 9,
                letterSpacing: "0.2em",
                padding: "4px 10px",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
              }}
            >
              MUMBAI
            </span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "#888",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              ✦ Premium Boutique
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              overflow: "hidden",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(60px, 16vw, 140px)",
                fontWeight: 900,
                lineHeight: 0.85,
                fontStyle: "italic",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                fontFamily: "Inter, sans-serif",
                margin: 0,
              }}
            >
              Statue
              <br />
              Point
            </h1>
          </div>

          {/* Type loop */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          >
            <div
              style={{
                fontSize: "clamp(16px, 4vw, 24px)",
                fontWeight: 400,
                color: "#555",
                fontFamily: "Inter, sans-serif",
                minHeight: "1.4em",
              }}
            >
              Discover{" "}
              <span
                style={{
                  color: "#F5C518",
                  fontWeight: 700,
                  borderRight: "2px solid #F5C518",
                  paddingRight: 3,
                  animation: "blink 0.9s step-end infinite",
                }}
              >
                {typeText}
              </span>
            </div>
            <p
              style={{
                fontSize: "clamp(13px, 3vw, 15px)",
                color: "#777",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                lineHeight: 1.8,
                marginTop: 16,
                maxWidth: 480,
              }}
            >
              Experience premium fashion crafted for comfort and styled for confidence in the heart of Dahisar East. Authentic looms, bespoke silhouettes.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.4s",
              marginTop: 8
            }}
          >
            <PulseButton onClick={() => setScreen("shop")} primary>
              Shop Collection →
            </PulseButton>
            <PulseButton onClick={() => setScreen("about")}>
              Our Story
            </PulseButton>
          </div>
        </div>

        {/* Right: feature image — hidden on small mobile, shown on larger */}
        <div
          className="hero-image-panel"
          style={{
            display: "none",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            minHeight: 460,
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 0.4s",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=900"
            alt="Featured collection"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0) 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace", marginBottom: 8 }}>
              ✦ FEATURED ARRIVAL
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, fontStyle: "italic", fontFamily: "Playfair Display, Georgia, serif", lineHeight: 1.1 }}>
              The Canvas
              <br />
              Series
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PulseButton ───────────────────────────────────────────────────────
function PulseButton({ children, onClick, primary = false }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onClick && onClick(); }}
      style={{
        background: primary ? (hovered ? "#1a1a1a" : "#0A0A0A") : "transparent",
        color: primary ? "#fff" : "#0A0A0A",
        border: primary ? "none" : "1.5px solid #0A0A0A",
        padding: "14px 28px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        borderRadius: 2,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: pressed ? "scale(0.96)" : hovered ? "translateY(-2px)" : "none",
        boxShadow: primary && hovered ? "0 8px 24px rgba(10,10,10,0.2)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </button>
  );
}

// ── Category Card ─────────────────────────────────────────────────────
function CategoryCard({ title, count, image, onClick, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-item-small"
      style={{
        position: "relative",
        height: "clamp(260px, 45vw, 400px)",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: 4,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.1) 60%, transparent 100%)",
          transition: "background 0.5s",
        }}
      />
      <div style={{ position: "absolute", bottom: 24, left: 24, color: "#fff" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace", marginBottom: 8 }}>
          {count}
        </div>
        <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
          {title}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            letterSpacing: "0.15em",
            fontFamily: "JetBrains Mono, monospace",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "all 0.4s ease",
          }}
        >
          <span>EXPLORE</span>
          <span>→</span>
        </div>
        <div
          style={{
            height: 2,
            width: hovered ? 40 : 0,
            background: "#F5C518",
            marginTop: 6,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────
function ProductCardUI({ product, onAdd }) {
  const [ref, visible] = useScrollReveal(0.05);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    onAdd && onAdd(product);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-item"
      style={{
        background: "#fff",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.02)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", paddingBottom: "125%" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {product.sale && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#0A0A0A",
              color: "#fff",
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.15em",
              padding: "4px 10px",
              fontFamily: "JetBrains Mono, monospace",
              borderRadius: 2
            }}
          >
            SALE
          </div>
        )}
        {/* Quick add */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 12,
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              background: added ? "#fff" : "#0A0A0A",
              color: added ? "#0A0A0A" : "#fff",
              border: added ? "1px solid #e5e5e5" : "none",
              padding: "12px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.3s",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            {added ? <><Icons.Check /> Added</> : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 8, letterSpacing: "0.2em", color: "#888", fontFamily: "JetBrains Mono, monospace", marginBottom: 6, textTransform: "uppercase" }}>
            {product.category}
          </div>
          <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 600, color: "#0A0A0A", fontFamily: "Inter, sans-serif", lineHeight: 1.4, marginBottom: 12 }}>
            {product.name}
          </div>
        </div>
        
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>
              ₹{product.price.toLocaleString()}
            </span>
            {product.original && (
              <span style={{ fontSize: 11, color: "#aaa", textDecoration: "line-through", fontFamily: "Inter, sans-serif" }}>
                ₹{product.original.toLocaleString()}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: "#F5C518", width: 10, height: 10 }}>
                <Icons.Star />
              </span>
            ))}
            <span style={{ fontSize: 9, color: "#888", fontFamily: "JetBrains Mono, monospace", marginLeft: 4 }}>({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Why Choose Us (1px Bento Grid) ────────────────────────────────────
function WhyUs() {
  const [ref, visible] = useScrollReveal(0.1);
  const items = [
    { 
      icon: <Icons.Quality />, 
      title: "Premium Quality", 
      desc: "Curated organic linens & Banarasi organza handloom silk fabrics." 
    },
    { 
      icon: <Icons.Pricing />, 
      title: "Direct Pricing", 
      desc: "Direct artisan supply chains bypass middlemen markups." 
    },
    { 
      icon: <Icons.Heritage />, 
      title: "Modern Heritage", 
      desc: "Blending traditional embroideries with Swiss minimalism." 
    },
    { 
      icon: <Icons.Location />, 
      title: "Local Presence", 
      desc: "Serving Dahisar East with outstanding community reviews." 
    },
    { 
      icon: <Icons.Return />, 
      title: "Easy Returns", 
      desc: "Hassle-free 7-day exchanges on all catalog purchases." 
    },
  ];

  return (
    <section style={{ background: "#0A0A0A", padding: "clamp(60px, 10vw, 90px) 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, borderBottom: "1px solid #1a1a1a", paddingBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#888", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>
                THE BOUTIQUE EXPERIENCE
              </div>
              <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: "#fff", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
                Why Choose Us
              </h2>
            </div>
          </div>
        </RevealBox>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1, // Creates the clean 1px modular grid borders
            background: "#1a1a1a", // Acts as the border color
            border: "1px solid #1a1a1a",
            borderRadius: 4,
            overflow: "hidden"
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "40px 32px",
                background: "#0A0A0A",
                textAlign: "left",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, background-color 0.4s ease`,
                cursor: "default",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0A0A0A";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, color: "#F5C518" }}>
                <span style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.15em", color: "#444" }}>
                  0{i + 1}
                </span>
                {item.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: "#666", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: "Priya Sharma", rating: 5, text: "The linen shirt quality is outstanding! Perfect for Mumbai's humidity. Very happy with the fit.", product: "Royal Ivory Linen Shirt" },
    { name: "Rahul Mehta", rating: 5, text: "Incredible georgette kurti set for my wife's diwali outfit. Colors are vibrant, delivery was fast.", product: "Festive Ochre Kurti Set" },
    { name: "Anjali Nair", rating: 5, text: "Finally a local store with premium quality at fair prices. The owner is very helpful and genuine.", product: "Banarasi Silk Saree" },
  ];

  return (
    <section style={{ padding: "clamp(60px, 10vw, 90px) 20px", background: "#F8F7F4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#888", fontFamily: "JetBrains Mono, monospace", marginBottom: 10 }}>
              DAHISAR COMMUNITY REVIEWS
            </div>
            <h2 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Inter, sans-serif", margin: 0 }}>
              Customer Reviews
            </h2>
          </div>
        </RevealBox>

        <div className="scroll-container grid-3">
          {reviews.map((rev, i) => (
            <RevealBox key={i} delay={i * 100} direction="up" className="scroll-item">
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #f0f0f0",
                  borderRadius: 4,
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  height: "100%",
                  transition: "box-shadow 0.4s, transform 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div style={{ display: "flex", gap: 4, color: "#F5C518" }}>
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <span key={j} style={{ width: 14, height: 14 }}><Icons.Star /></span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "#444", fontFamily: "Inter, sans-serif", lineHeight: 1.8, fontStyle: "italic", margin: 0, flex: 1 }}>
                  "{rev.text}"
                </p>
                <div style={{ paddingTop: 16, borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: 9, color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>
                      {rev.product}
                    </div>
                  </div>
                  <span style={{ fontSize: 9, color: "#16a34a", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Icons.Check /> VERIFIED
                  </span>
                </div>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Instagram Grid ────────────────────────────────────────────────────
function InstagramGrid() {
  const images = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80",
    "/genz.jpg",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&auto=format&fit=crop&q=80",
  ];

  return (
    <section style={{ padding: "clamp(60px, 10vw, 80px) 20px", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>
                @STATUE_POINT
              </div>
              <h2 style={{ fontSize: "clamp(20px, 4.5vw, 28px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Inter, sans-serif", margin: 0 }}>
                Instagram Lookbook
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", color: "#888", textDecoration: "none", fontWeight: 700, letterSpacing: "0.15em" }}
            >
              FOLLOW →
            </a>
          </div>
        </RevealBox>

        <div className="scroll-container grid-3">
          {images.map((img, i) => (
            <RevealBox key={i} delay={i * 60} direction="scale" className="scroll-item-small">
              <div
                style={{
                  position: "relative",
                  paddingBottom: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: 4
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1.06)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "0";
                }}
              >
                <img
                  src={img}
                  alt="Lookbook"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10,10,10,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.4s",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 10, letterSpacing: "0.2em", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                    VIEW POST
                  </span>
                </div>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact Strip ─────────────────────────────────────────────────────
function ContactStrip() {
  return (
    <section style={{ padding: "clamp(60px, 8vw, 90px) 20px", background: "#0A0A0A" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", textAlign: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace" }}>
              COME VISIT OUR SHOWROOM
            </div>
            <h2 style={{ fontSize: "clamp(26px, 6vw, 44px)", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "Inter, sans-serif", margin: 0 }}>
              Visit Our Store
            </h2>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif", lineHeight: 1.8, maxWidth: 500 }}>
              Shop No. 26/149/2 & 3, Off Shiv Vallabh Road, Chunabhatti Road, Dahisar East, Mumbai — Open Daily till 10:00 PM
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
              <a
                href="https://wa.me/919137084025?text=Hello%20Statue%20Point!"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "14px 28px",
                  background: "#fff",
                  color: "#0A0A0A",
                  textDecoration: "none",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Icons.WhatsApp /> WhatsApp Us
              </a>
              <a
                href="tel:+919137084025"
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                  border: "1.5px solid #333",
                  borderRadius: 2,
                  transition: "border-color 0.3s, background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
              >
                <Icons.Contact /> +91 91370 84025
              </a>
            </div>
          </div>
        </RevealBox>
      </div>
    </section>
  );
}

// ── Shop Screen ───────────────────────────────────────────────────────
function ShopScreen({ onAdd }) {
  const products = [
    { id: 1, name: "Royal Ivory Premium Linen Shirt", price: 1899, original: 2499, category: "Men's Wear", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", reviews: 14, sale: true },
    { id: 2, name: "Festive Ochre Georgette Kurti Set", price: 3299, original: 4500, category: "Women's Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80", reviews: 22, sale: true },
    { id: 3, name: "Satoshi Heavy Crewneck Sweatshirt", price: 899, original: 1299, category: "Men's Wear", image: "/satoshi-crewneck.jpg", reviews: 19 },
    { id: 4, name: "Heritage Banarasi Organza Saree", price: 5999, original: 7500, category: "Women's Wear", image: "/banarasi-saree.jpg", reviews: 8, sale: true },
    { id: 5, name: "Kids Festival Sherwani Set", price: 1499, original: 2000, category: "Kids' Wear", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80", reviews: 11 },
    { id: 6, name: "Premium Casual Cotton Kurta", price: 799, original: 1100, category: "Men's Wear", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80", reviews: 27 },
    { id: 7, name: "Elegant Chiffon Dupatta Set", price: 2199, original: 2999, category: "Women's Wear", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", reviews: 15 },
    { id: 8, name: "Formal Linen Trouser", price: 1199, original: 1600, category: "Men's Wear", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", reviews: 9 },
  ];

  const categories = ["All", "Men's Wear", "Women's Wear", "Kids' Wear"];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F6", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>
              FULL CATALOG
            </div>
            <h1 style={{ fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
              Shop Collection
            </h1>
          </div>

          {/* Filter chips */}
          <div className="scroll-container" style={{ paddingBottom: 16, marginBottom: 16 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "10px 20px",
                  background: filter === cat ? "#0A0A0A" : "#fff",
                  color: filter === cat ? "#fff" : "#888",
                  border: "1px solid",
                  borderColor: filter === cat ? "#0A0A0A" : "#e5e5e5",
                  borderRadius: 40,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.3s",
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealBox>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(180px, 100%), 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((p) => (
            <ProductCardUI key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Cart Screen ───────────────────────────────────────────────────────
function CartScreen({ cart, setCart, setScreen }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F6", padding: "32px 20px 100px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <RevealBox>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: 28 }}>
            Shopping Bag ({cart.length})
          </h1>
        </RevealBox>

        {cart.length === 0 ? (
          <RevealBox>
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", border: "1px dashed #e5e5e5", borderRadius: 4 }}>
              <div style={{ color: "#ccc", display: "flex", justifyContent: "center", marginBottom: 20 }}>
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif", marginBottom: 8 }}>
                Your bag is empty
              </h2>
              <p style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif", marginBottom: 28 }}>
                Browse our curated collection and add items to your bag.
              </p>
              <PulseButton onClick={() => setScreen("shop")} primary>
                Start Shopping
              </PulseButton>
            </div>
          </RevealBox>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map((item, i) => (
              <RevealBox key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
                  <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginBottom: 8 }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => setCart(cart.filter((_, j) => j !== i))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 8, transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </RevealBox>
            ))}

            <RevealBox delay={cart.length * 60}>
              <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: 24, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif" }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif" }}>Delivery</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", fontFamily: "Inter, sans-serif" }}>
                    {total >= 1499 ? "FREE" : "₹150"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>Total</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>
                    ₹{(total >= 1499 ? total : total + 150).toLocaleString()}
                  </span>
                </div>
                <PulseButton primary onClick={() => alert("Proceeding to checkout! In the full app, enter your shipping details.")} style={{width: "100%"}}>
                  <div style={{ width: "100%", textAlign: "center" }}>Proceed to Checkout →</div>
                </PulseButton>
              </div>
            </RevealBox>
          </div>
        )}
      </div>
    </div>
  );
}

// ── About Screen ──────────────────────────────────────────────────────
function AboutScreen() {
  const [imgRef, imgOffset] = useParallax(0.2);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F6", paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(260px, 50vw, 460px)", overflow: "hidden" }}>
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            inset: "-20%",
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${imgOffset}px)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.6)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 20, textAlign: "center" }}>
          <RevealBox>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace" }}>OUR STORY</div>
            <h1 style={{ fontSize: "clamp(28px, 7vw, 56px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: "16px 0 0", letterSpacing: "0.04em" }}>
              Statue Point
            </h1>
          </RevealBox>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 20px" }}>
        <RevealBox>
          <p style={{ fontSize: "clamp(16px, 3.5vw, 20px)", color: "#444", fontFamily: "Inter, sans-serif", lineHeight: 1.85, textAlign: "center", marginBottom: 80 }}>
            Born in the heart of Dahisar East, Statue Point is more than a clothing store — it's a statement of identity. We curate premium fashion that honors India's rich textile heritage while embracing contemporary global aesthetics.
          </p>
        </RevealBox>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { number: "5.0", label: "Customer Rating", accent: "★" },
            { number: "500", label: "Products Curated", accent: "+" },
            { number: "1K", label: "Happy Customers", accent: "+" },
            { number: "2026", label: "Established", accent: "" },
          ].map((stat, i) => (
            <RevealBox key={i} delay={i * 100} direction="up">
              <div style={{ textAlign: "center", padding: "40px 20px", border: "1px solid #e5e5e5", borderRadius: 4, background: "#fff" }}>
                <div style={{ fontSize: "clamp(32px, 7vw, 44px)", fontWeight: 900, color: "#0A0A0A", fontFamily: "Inter, sans-serif" }}>
                  {stat.number}<span style={{ color: "#F5C518" }}>{stat.accent}</span>
                </div>
                <div style={{ fontSize: 10, color: "#888", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 12 }}>
                  {stat.label}
                </div>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Gallery Screen ────────────────────────────────────────────────────
function GalleryScreen() {
  const images = [
    { url: "/linenpants.jpg", span: "2" },
    { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", span: "1" },
    { url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80", span: "1" },
    { url: "/loombook.jpg", span: "1" },
    { url: "/oversize.jpg", span: "2" },
    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", span: "1" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F6", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>BOUTIQUE LOOKBOOK</div>
            <h1 style={{ fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
              Gallery
            </h1>
          </div>
        </RevealBox>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {images.map((img, i) => (
            <RevealBox key={i} delay={i * 80} direction="scale">
              <div
                style={{
                  gridColumn: `span ${img.span}`,
                  position: "relative",
                  paddingBottom: img.span === "2" ? "50%" : "100%",
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: 4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("img").style.transform = "scale(1)";
                }}
              >
                <img
                  src={img.url}
                  alt="Lookbook"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Contact Screen ────────────────────────────────────────────────────
function ContactScreen() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F6", padding: "40px 20px 100px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#aaa", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>GET IN TOUCH</div>
            <h1 style={{ fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
              Contact Us
            </h1>
          </div>
        </RevealBox>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { icon: <Icons.Location />, label: "Address", value: "Shop No. 26/149/2 & 3, Chunabhatti Road, Dahisar East, Mumbai 400068" },
            { icon: <Icons.Contact />, label: "Phone", value: "+91 91370 84025 (Daily till 10 PM)" },
            { icon: <Icons.WhatsApp />, label: "WhatsApp", value: "Chat with us directly on WhatsApp for instant assistance" },
          ].map((item, i) => (
            <RevealBox key={i} delay={i * 100}>
              <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ color: "#0A0A0A", marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#888", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#444", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            </RevealBox>
          ))}
        </div>

        <RevealBox delay={300}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 40px", background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "center", color: "#16a34a", marginBottom: 20 }}>
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif", marginBottom: 8 }}>Message Sent!</h2>
              <p style={{ fontSize: 13, color: "#666", fontFamily: "Inter, sans-serif" }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "32px" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0A0A0A", fontFamily: "Inter, sans-serif", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Send a Message
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Your Name", "Email Address", "Message"].map((placeholder, i) => (
                  i < 2 ? (
                    <input
                      key={placeholder}
                      type={i === 1 ? "email" : "text"}
                      placeholder={placeholder}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #e5e5e5",
                        borderRadius: 2,
                        fontSize: 13,
                        fontFamily: "Inter, sans-serif",
                        color: "#0A0A0A",
                        background: "#fafafa",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                    />
                  ) : (
                    <textarea
                      key={placeholder}
                      placeholder={placeholder}
                      rows={5}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #e5e5e5",
                        borderRadius: 2,
                        fontSize: 13,
                        fontFamily: "Inter, sans-serif",
                        color: "#0A0A0A",
                        background: "#fafafa",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0A0A0A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                    />
                  )
                ))}
                <div style={{ marginTop: 8 }}>
                  <PulseButton primary onClick={() => setSent(true)}>
                    Send Message →
                  </PulseButton>
                </div>
              </div>
            </div>
          )}
        </RevealBox>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer({ setScreen }) {
  return (
    <footer style={{ background: "#0A0A0A", color: "#fff", padding: "clamp(50px, 8vw, 80px) 20px clamp(100px, 20vw, 40px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.15em", marginBottom: 16, fontFamily: "Inter, sans-serif" }}>
              STATUE<span style={{ color: "#F5C518" }}>.</span>POINT
            </div>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}>
              Curating luxury-editorial wardrobes since inception. Blending modern aesthetics with Mumbai craftsmanship.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace", marginBottom: 20, textTransform: "uppercase" }}>
              Navigation
            </div>
            {["home", "shop", "about", "gallery", "contact"].map((link) => (
              <button
                key={link}
                onClick={() => setScreen(link)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: "6px 0",
                  fontFamily: "Inter, sans-serif",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#F5C518", fontFamily: "JetBrains Mono, monospace", marginBottom: 20, textTransform: "uppercase" }}>
              Mumbai Showroom
            </div>
            <p style={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}>
              Shop No. 26/149/2 & 3,<br />Chunabhatti Road, Dahisar East,<br />Mumbai, Maharashtra 400068
            </p>
            <p style={{ fontSize: 11, color: "#ccc", fontFamily: "JetBrains Mono, monospace", marginTop: 16, lineHeight: 1.8 }}>
              +91 91370 84025<br />Open Daily till 10 PM
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 10, color: "#666", fontFamily: "JetBrains Mono, monospace", margin: 0 }}>
            © 2026 Statue Point Boutique, Mumbai. All Rights Reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5C518", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, color: "#666", fontFamily: "JetBrains Mono, monospace" }}>OPEN TODAY · 10AM–10PM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Bottom Nav (Mobile) ───────────────────────────────────────────────
function BottomNav({ currentScreen, setScreen, cartCount }) {
  const items = [
    { icon: <Icons.Home />, label: "Home", id: "home" },
    { icon: <Icons.Shop />, label: "Shop", id: "shop" },
    { icon: <Icons.Gallery />, label: "Gallery", id: "gallery" },
    { icon: <Icons.Contact />, label: "Contact", id: "contact" },
    { icon: <Icons.Bag />, label: "Bag", id: "cart", badge: cartCount },
  ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)", // iOS Safe Area Magic
      }}
    >
      {items.map((item) => {
        const active = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px 4px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              color: active ? "#0A0A0A" : "#aaa",
              transition: "color 0.3s",
              position: "relative"
            }}
          >
            <div style={{ position: "relative" }}>
              {item.icon}
              {item.badge > 0 && (
                <span style={{ 
                  background: "#F5C518", color: "#0A0A0A", borderRadius: "50%", 
                  width: 14, height: 14, fontSize: 8, fontWeight: 800, 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "absolute", top: -4, right: -6
                }}>
                  {item.badge}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: active ? 700 : 500,
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Home Screen ───────────────────────────────────────────────────────
function HomeScreen({ setScreen, onAdd }) {
  const categories = [
    { title: "Men's Wear", count: "45+ Styles", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80" },
    { title: "Women's Wear", count: "60+ Styles", image: "/womens-wear.jpg" },
    { title: "Ethnic Wear", count: "30+ Styles", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80" },
    { title: "Kids' Wear", count: "20+ Styles", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80" },
  ];

  const featuredProducts = [
    { id: 1, name: "Royal Ivory Premium Linen Shirt", price: 1899, original: 2499, category: "Men's Wear", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", reviews: 14, sale: true },
    { id: 2, name: "Festive Ochre Georgette Kurti Set", price: 3299, original: 4500, category: "Women's Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80", reviews: 22, sale: true },
    { id: 3, name: "Satoshi Heavy Crewneck", price: 899, original: 1299, category: "Men's Wear", image: "/satoshi-crewneck.jpg", reviews: 19 },
    { id: 4, name: "Heritage Banarasi Organza Saree", price: 5999, original: 7500, category: "Women's Wear", image: "/banarasi-saree.jpg", reviews: 8, sale: true },
  ];

  return (
    <div>
      <HeroSection setScreen={setScreen} />

      {/* Categories */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) 20px", maxWidth: 1280, margin: "0 auto" }}>
        <RevealBox>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, borderBottom: "1px solid #f0f0f0", paddingBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#888", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>CURATED COLLECTIONS</div>
              <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
                Shop by Category
              </h2>
            </div>
            <button onClick={() => setScreen("shop")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: "#0A0A0A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              ALL →
            </button>
          </div>
        </RevealBox>
        
        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="scroll-container grid-2">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} onClick={() => setScreen("shop")} delay={i * 80} />
          ))}
        </div>
      </section>

      <WhyUs />

      {/* New Arrivals */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) 20px", background: "#FAF9F6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <RevealBox>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, borderBottom: "1px solid #e5e5e5", paddingBottom: 16 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#888", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>LATEST DROP 2026</div>
                <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", fontFamily: "Inter, sans-serif", margin: 0 }}>
                  New Arrivals
                </h2>
              </div>
              <button onClick={() => setScreen("shop")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: "#0A0A0A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                VIEW ALL →
              </button>
            </div>
          </RevealBox>

          <div className="scroll-container grid-4">
            {featuredProducts.map((p) => (
              <ProductCardUI key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <InstagramGrid />
      <ContactStrip />
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const setScreen = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Global Styles for Scrolling & UI */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: #FAF9F6; overflow-x: hidden; }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes blink {
          0%, 100% { border-right-color: #F5C518; }
          50% { border-right-color: transparent; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Premium Horizontal Scroll Magic (Mobile) ── */
        .scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          gap: 16px;
          padding-bottom: 24px;
        }
        .scroll-container::-webkit-scrollbar { 
          display: none; /* Chrome/Safari */
        }
        .scroll-item {
          flex: 0 0 75%;
          scroll-snap-align: start;
        }
        .scroll-item-small {
          flex: 0 0 65%;
          scroll-snap-align: start;
        }

        /* Mobile vs Desktop Display Logic */
        .bottom-nav { display: grid !important; }
        .mobile-menu-btn { display: flex !important; }
        .desktop-nav { display: none !important; }
        .hero-image-panel { display: none !important; }

        @media (min-width: 768px) {
          .bottom-nav { display: none !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
          .hero-image-panel { display: block !important; }
          
          /* Disable horizontal scroll on Desktop, convert to Grid */
          .scroll-container {
            display: grid;
            overflow-x: visible;
            padding-bottom: 0;
            gap: 24px;
          }
          .grid-2 { grid-template-columns: repeat(2, 1fr); }
          .grid-3 { grid-template-columns: repeat(3, 1fr); }
          .grid-4 { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
          
          .scroll-item, .scroll-item-small {
            flex: auto;
          }
          
          /* Desktop hero: side-by-side */
          section[data-hero] > div {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Scrollbar styling for main window */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAF9F6; }
        ::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: #bbb; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* The Cinematic Loading Screen overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div style={{ 
        fontFamily: "Inter, sans-serif", 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        // Prevent scrolling while loading
        height: loading ? "100vh" : "auto",
        overflow: loading ? "hidden" : "visible"
      }}>
        <TickerTape />
        <Navbar cartCount={cart.length} currentScreen={currentScreen} setScreen={setScreen} />

        <main style={{ flex: 1 }}>
          {currentScreen === "home" && <HomeScreen setScreen={setScreen} onAdd={handleAddToCart} />}
          {currentScreen === "shop" && <ShopScreen onAdd={handleAddToCart} />}
          {currentScreen === "cart" && <CartScreen cart={cart} setCart={setCart} setScreen={setScreen} />}
          {currentScreen === "about" && <AboutScreen />}
          {currentScreen === "gallery" && <GalleryScreen />}
          {currentScreen === "contact" && <ContactScreen />}
        </main>

        <Footer setScreen={setScreen} />
        <BottomNav currentScreen={currentScreen} setScreen={setScreen} cartCount={cart.length} />
        
        {/* ORIGIN MEDIA PREVIEW WATERMARK */}
        <div 
          style={{ 
            position: "fixed", 
            bottom: 60, 
            left: 0, 
            width: "100%", 
            zIndex: 9999, 
            pointerEvents: "none", /* Prevents the text from blocking clicks on the website */
            mixBlendMode: "difference", 
            overflow: "hidden", 
            whiteSpace: "nowrap" 
          }}
        >
          <div 
            style={{ 
              display: "inline-flex", 
              animation: "ticker 20s linear infinite", 
              color: "#fff", /* Pure white with 'difference' blend mode creates the negative effect */
              fontSize: "clamp(50px, 10vw, 26px)", 
              fontWeight: 900, /* Bold Gen-Z brutalist style */
              textTransform: "uppercase", 
              fontFamily: "Inter, sans-serif", 
              letterSpacing: "0.01em", 
            }}
          >
            {/* Array multiplies the text so it loops smoothly across the screen */}
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{ padding: "0 10px" }}>
                ORIGIN MEDIA DIGITAL BLUEPRINT PREVIEW — SOURCE CODE UNPAID ✦
              </span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
