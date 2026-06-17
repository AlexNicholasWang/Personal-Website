import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL KEYFRAME STYLES
───────────────────────────────────────────── */
const STYLES = `
  @keyframes walkRight {
    0%   { transform: translateX(-180px) scaleX(1); }
    48%  { transform: translateX(105vw)  scaleX(1); }
    50%  { transform: translateX(105vw)  scaleX(-1); }
    98%  { transform: translateX(-180px) scaleX(-1); }
    100% { transform: translateX(-180px) scaleX(1); }
  }
  @keyframes walkRight2 {
    0%   { transform: translateX(-200px) scaleX(1); }
    48%  { transform: translateX(108vw)  scaleX(1); }
    50%  { transform: translateX(108vw)  scaleX(-1); }
    98%  { transform: translateX(-200px) scaleX(-1); }
    100% { transform: translateX(-200px) scaleX(1); }
  }
  @keyframes flyAcross {
    0%   { transform: translateX(-250px) translateY(0) scaleX(1); }
    45%  { transform: translateX(108vw)  translateY(-30px) scaleX(1); }
    50%  { transform: translateX(108vw)  translateY(-30px) scaleX(-1); }
    95%  { transform: translateX(-250px) translateY(0) scaleX(-1); }
    100% { transform: translateX(-250px) translateY(0) scaleX(1); }
  }
  @keyframes bob {
    0%, 100% { margin-top: 0; }
    50%       { margin-top: -6px; }
  }
  @keyframes bobFast {
    0%, 100% { margin-top: 0; }
    50%       { margin-top: -4px; }
  }
  @keyframes wingFlap {
    0%, 100% { transform: scaleY(1); }
    50%       { transform: scaleY(0.6); }
  }
  @keyframes flicker {
    0%, 100% { opacity: 1;   transform: scaleX(1)   rotate(-1deg); }
    20%       { opacity: 0.85; transform: scaleX(1.08) rotate(2deg); }
    40%       { opacity: 0.95; transform: scaleX(0.92) rotate(-2deg); }
    60%       { opacity: 0.9;  transform: scaleX(1.05) rotate(1deg); }
    80%       { opacity: 1;    transform: scaleX(0.97) rotate(-1deg); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 8px 2px rgba(201,162,39,0.18); }
    50%       { box-shadow: 0 0 18px 6px rgba(201,162,39,0.35); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes drift {
    0%   { transform: translateY(0) translateX(0); }
    25%  { transform: translateY(-8px) translateX(4px); }
    50%  { transform: translateY(-4px) translateX(-4px); }
    75%  { transform: translateY(-10px) translateX(2px); }
    100% { transform: translateY(0) translateX(0); }
  }

  .char-walk  { animation: walkRight 28s linear infinite; }
  .char-walk2 { animation: walkRight2 38s linear infinite; animation-delay: -14s; }
  .char-fly   { animation: flyAcross 22s linear infinite; animation-delay: -8s; }
  .char-bob   { animation: bob 0.55s ease-in-out infinite; display: inline-block; }
  .char-bob2  { animation: bob 0.7s ease-in-out infinite; display: inline-block; animation-delay: -0.2s; }
  .char-wing  { animation: wingFlap 0.4s ease-in-out infinite; display: inline-block; }
  .torch-flame { animation: flicker 1.8s ease-in-out infinite; display: inline-block; transform-origin: bottom center; }
  .glow-card  { animation: glowPulse 3s ease-in-out infinite; }
  .drift      { animation: drift 6s ease-in-out infinite; }

  .fade-in { animation: fadeInUp 0.6s ease both; }

  body { overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #191208; }
  ::-webkit-scrollbar-thumb { background: #3a2a10; border-radius: 0; }

  .parchment-border {
    border-image: linear-gradient(to bottom, #c9a227 0%, #8a6c1a 40%, #c9a227 100%) 1;
  }
  .rune-divider::before, .rune-divider::after {
    content: '⟡';
    margin: 0 0.5rem;
    color: #c9a22760;
  }
  input::placeholder, textarea::placeholder { color: #5a4a2a; }
  input:focus, textarea:focus {
    outline: none;
    border-color: rgba(201,162,39,0.45) !important;
    box-shadow: 0 0 0 2px rgba(201,162,39,0.1);
  }
  a { transition: color 0.15s; }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    name: "The Siege Engine",
    desc: "A blazing-fast build tool that lays waste to slow compile times. Written in Rust, zero config.",
    rune: "⚔️",
    lang: "Rust",
    langColor: "#ce422b",
    stars: 2841,
  },
  {
    name: "Grimoire",
    desc: "A local-first knowledge base for developers. Markdown, code blocks, diagrams — all offline.",
    rune: "📜",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 1203,
  },
  {
    name: "Dragon's Hoard",
    desc: "Self-hosted file storage with encryption and versioning. Built atop S3-compatible backends.",
    rune: "🐉",
    lang: "Go",
    langColor: "#00add8",
    stars: 987,
  },
  {
    name: "The Oracle",
    desc: "Minimal CLI for querying LLMs from your terminal. Streams tokens, supports system prompts.",
    rune: "🔮",
    lang: "Python",
    langColor: "#3572A5",
    stars: 512,
  },
];

const POSTS = [
  {
    date: "X June, Anno Domini 2026",
    title: "On the Craft of Building Things That Last",
    excerpt: "Most software rots within five years. A meditation on writing code as if it might survive you.",
  },
  {
    date: "XXII May, Anno Domini 2026",
    title: "The Forgotten Art of the Personal Website",
    excerpt: "Why every developer should have a corner of the web that belongs to no algorithm.",
  },
  {
    date: "III April, Anno Domini 2026",
    title: "Rust for the Weary TypeScript Developer",
    excerpt: "A guide for those ready to trade runtime errors for compiler wrath — and why it is worth it.",
  },
];

const LINKS = [
  { label: "GitHub", href: "#", symbol: "⚔" },
  { label: "Mastodon", href: "#", symbol: "🐘" },
  { label: "Last.fm", href: "#", symbol: "♬" },
  { label: "RSS Feed", href: "#", symbol: "📡" },
  { label: "Email", href: "#", symbol: "✉" },
];

/* ─────────────────────────────────────────────
   ANIMATED CHARACTERS
───────────────────────────────────────────── */
function Knight() {
  return (
    <div
      className="char-walk fixed pointer-events-none select-none"
      style={{ bottom: "60px", left: 0, zIndex: 50, fontSize: "2.2rem", lineHeight: 1 }}
    >
      <span className="char-bob" style={{ display: "inline-block" }}>🧙‍♂️</span>
      <span style={{ fontSize: "0.55rem", display: "block", textAlign: "center", color: "#c9a22799", fontFamily: "'Cinzel', serif" }}>
        wizard
      </span>
    </div>
  );
}

function KnightOnHorse() {
  return (
    <div
      className="char-walk2 fixed pointer-events-none select-none"
      style={{ bottom: "52px", left: 0, zIndex: 50, fontSize: "2.4rem", lineHeight: 1 }}
    >
      <span className="char-bob2" style={{ display: "inline-block" }}>🏇</span>
      <span style={{ fontSize: "0.55rem", display: "block", textAlign: "center", color: "#c9a22799", fontFamily: "'Cinzel', serif" }}>
        knight
      </span>
    </div>
  );
}

function Dragon() {
  return (
    <div
      className="char-fly fixed pointer-events-none select-none"
      style={{ top: "80px", left: 0, zIndex: 50, fontSize: "2.6rem", lineHeight: 1 }}
    >
      <span className="char-wing" style={{ display: "inline-block" }}>🐉</span>
    </div>
  );
}

function FlyingBird({ top, delay, size = "1.4rem" }: { top: string; delay: string; size?: string }) {
  return (
    <div
      className="char-fly fixed pointer-events-none select-none"
      style={{ top, left: 0, zIndex: 49, fontSize: size, animationDelay: delay, animationDuration: "30s" }}
    >
      <span className="char-wing" style={{ display: "inline-block" }}>🦅</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TORCH
───────────────────────────────────────────── */
function Torch({ right = false }: { right?: boolean }) {
  return (
    <div
      className="fixed top-32 pointer-events-none select-none"
      style={{ [right ? "right" : "left"]: "20px", zIndex: 40, textAlign: "center" }}
    >
      <div className="torch-flame" style={{ fontSize: "1.8rem" }}>🔥</div>
      <div style={{ width: "6px", height: "30px", background: "#5a3a10", margin: "0 auto", borderRadius: "1px" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
function SectionHeading({ children, rune = "⚜" }: { children: React.ReactNode; rune?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <span style={{ color: "#c9a22766", fontSize: "1rem" }}>{rune}</span>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#c9a227",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {children}
        </h2>
        <span style={{ color: "#c9a22766", fontSize: "1rem" }}>{rune}</span>
      </div>
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #c9a22750, transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ name, desc, rune, lang, langColor, stars }: (typeof PROJECTS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-5 transition-all duration-200 cursor-pointer"
      style={{
        background: hovered ? "rgba(201,162,39,0.06)" : "rgba(201,162,39,0.02)",
        border: `1px solid ${hovered ? "rgba(201,162,39,0.4)" : "rgba(201,162,39,0.15)"}`,
        boxShadow: hovered ? "0 0 20px rgba(201,162,39,0.08), inset 0 0 20px rgba(0,0,0,0.3)" : "none",
        position: "relative",
      }}
    >
      {/* corner ornaments */}
      {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos}`}
          style={{ fontSize: "0.5rem", color: "#c9a22740", lineHeight: 1 }}
        >
          ✦
        </span>
      ))}
      <div className="flex items-start gap-3">
        <span style={{ fontSize: "1.6rem" }}>{rune}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.9rem",
                color: hovered ? "#d4ae3a" : "#c9a227",
                fontWeight: 600,
              }}
            >
              {name}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#8a7a5a", fontFamily: "'IM Fell English', serif", whiteSpace: "nowrap" }}>
              ★ {stars.toLocaleString()}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#a08a60", fontFamily: "'IM Fell English', serif" }}>
            {desc}
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
            <span style={{ fontSize: "0.72rem", color: "#7a6a4a", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
              {lang}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BLOG ROW
───────────────────────────────────────────── */
function ScrollEntry({ date, title, excerpt }: (typeof POSTS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block py-5"
      style={{ borderBottom: "1px solid rgba(201,162,39,0.1)", textDecoration: "none" }}
    >
      <p style={{ fontSize: "0.7rem", color: "#6a5a3a", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {date}
      </p>
      <p
        className="mt-1"
        style={{
          fontFamily: "'IM Fell English', serif",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: hovered ? "#d4ae3a" : "#c8b880",
          transition: "color 0.15s",
        }}
      >
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed" style={{ color: "#8a7a5a", fontFamily: "'IM Fell English', serif" }}>
        {excerpt}
      </p>
    </a>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("chronicle");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [guestName, setGuestName] = useState("");
  const [guestMsg, setGuestMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "chronicle", label: "Chronicle", rune: "📜" },
    { id: "armory",    label: "Armory",    rune: "⚔️" },
    { id: "scriptorium", label: "Scriptorium", rune: "🪶" },
    { id: "tavern",    label: "Tavern",    rune: "🍺" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(139,26,26,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(201,162,39,0.05) 0%, transparent 70%),
            #0e0b06
          `,
          zIndex: 0,
        }}
      />

      {/* Ground strip */}
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "52px",
          background: "linear-gradient(to top, #0a0703, #191208)",
          borderTop: "1px solid rgba(201,162,39,0.12)",
          zIndex: 45,
        }}
      />
      {/* Ground grass texture */}
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "52px", zIndex: 46, overflow: "hidden" }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "32px",
              left: `${i * 1.7}%`,
              fontSize: `${0.6 + Math.random() * 0.5}rem`,
              color: "#2a1f08",
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
          >
            |
          </span>
        ))}
      </div>

      {/* Animated characters */}
      <Knight />
      <KnightOnHorse />
      <Dragon />
      <FlyingBird top="140px" delay="-5s" />
      <FlyingBird top="200px" delay="-18s" size="1rem" />

      {/* Wall torches */}
      <Torch />
      <Torch right />

      {/* Main layout */}
      <div className="relative min-h-screen" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10" style={{ paddingBottom: "100px" }}>

          {/* ── SIDEBAR ── */}
          <aside className="lg:w-60 shrink-0">
            <div className="lg:sticky" style={{ top: "3rem" }}>

              {/* Crest / Title */}
              <div className="mb-8 text-center">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 mb-4 drift"
                  style={{
                    background: "radial-gradient(circle, #2a1a05 0%, #0e0b06 100%)",
                    border: "2px solid rgba(201,162,39,0.35)",
                    fontSize: "2.6rem",
                    boxShadow: "0 0 24px rgba(201,162,39,0.12), inset 0 0 20px rgba(0,0,0,0.5)",
                  }}
                >
                  🏰
                </div>
                <h1
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "1.4rem",
                    color: "#c9a227",
                    letterSpacing: "0.06em",
                    lineHeight: 1.2,
                    textShadow: "0 0 20px rgba(201,162,39,0.3)",
                  }}
                >
                  Alexander Wang 
                </h1>
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.6rem",
                    color: "#8a7a5a",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Keeper of Code
                </p>
              </div>

              {/* Nav */}
              <nav className="space-y-1 mb-8">
                {navItems.map(({ id, label, rune }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-2.5 px-3 py-2 transition-all duration-150"
                    style={{
                      color: activeSection === id ? "#c9a227" : "#8a7a5a",
                      background: activeSection === id ? "rgba(201,162,39,0.08)" : "transparent",
                      border: `1px solid ${activeSection === id ? "rgba(201,162,39,0.25)" : "transparent"}`,
                      textDecoration: "none",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{rune}</span>
                    {label}
                  </a>
                ))}
              </nav>

              {/* Realm info */}
              <div
                className="p-4 mb-4"
                style={{
                  background: "rgba(201,162,39,0.03)",
                  border: "1px solid rgba(201,162,39,0.15)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute", inset: "3px",
                    border: "1px solid rgba(201,162,39,0.07)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.6rem",
                    color: "#c9a22780",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  ✦ Realm Status ✦
                </p>
                {[
                  { label: "Guild", value: "Open Source" },
                  { label: "Allegiance", value: "The Terminal" },
                  { label: "Weapon", value: "Neovim + Rust" },
                  { label: "Mood", value: "Questing 🌙" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-baseline mb-1">
                    <span style={{ fontSize: "0.68rem", color: "#6a5a3a", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
                      {label}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#a08a60", fontFamily: "'IM Fell English', serif" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Now playing */}
              <div
                className="p-3"
                style={{
                  background: "rgba(139,26,26,0.08)",
                  border: "1px solid rgba(139,26,26,0.2)",
                  fontFamily: "'IM Fell English', serif",
                }}
              >
                <p style={{ fontSize: "0.62rem", color: "#8b1a1a", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Cinzel', serif" }}>
                  ♬ Bardic Tale
                </p>
                <p style={{ fontSize: "0.8rem", color: "#c8b880", marginTop: "4px", fontStyle: "italic" }}>
                  Immigrant Song — Led Zeppelin
                </p>
              </div>

              {/* 88x31 Badges */}
              <div className="mt-5 flex flex-wrap gap-1">
                {[
                  { label: "HANDMADE", bg: "#2a1a05", border: "#c9a22740" },
                  { label: "NO TRACKERS", bg: "#1a0505", border: "#8b1a1a60" },
                  { label: "OPEN SOURCE", bg: "#051a05", border: "#2a7a2a60" },
                  { label: "MEDIEVAL WEB", bg: "#1a1205", border: "#c9a22740" },
                ].map((b) => (
                  <span
                    key={b.label}
                    style={{
                      display: "inline-block",
                      width: "88px",
                      height: "31px",
                      lineHeight: "29px",
                      textAlign: "center",
                      background: b.bg,
                      border: `1px solid ${b.border}`,
                      fontSize: "8px",
                      color: "#c9a227",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0 space-y-20">

            {/* CHRONICLE (About) */}
            <section
              id="chronicle"
              ref={(el) => { sectionRefs.current["chronicle"] = el; }}
              className="fade-in"
            >
              <SectionHeading rune="📜">The Chronicle</SectionHeading>

              <div
                className="p-6 mb-6 relative"
                style={{
                  background: "rgba(201,162,39,0.025)",
                  border: "1px solid rgba(201,162,39,0.18)",
                }}
              >
                {/* Inner border */}
                <div style={{ position: "absolute", inset: "5px", border: "1px solid rgba(201,162,39,0.07)", pointerEvents: "none" }} />
                {/* Corner runes */}
                {["top-2 left-3", "top-2 right-3", "bottom-2 left-3", "bottom-2 right-3"].map((p) => (
                  <span key={p} className={`absolute ${p}`} style={{ fontSize: "0.8rem", color: "#c9a22750" }}>⚜</span>
                ))}

                <div className="space-y-4" style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.02rem", lineHeight: 1.9, color: "#a08a60" }}>
                  <p>
                    Hark, traveller. I am a <span style={{ color: "#c9a227" }}>craftsperson of software</span> — a builder of tools that do not break, interfaces that do not lie, and systems that do not bow to the first sign of load.
                  </p>
                  <p>
                    My apprenticeship began in the age of dial-up, when websites were built by hand and hosted on servers you actually owned. That spirit never left me. I write code for{" "}
                    <span style={{ color: "#8b1a1a", fontStyle: "italic" }}>the joy of building</span>, not for growth metrics.
                  </p>
                  <p>
                    When not at the forge, I tend to old films, long walks in questionable weather, and a small collection of houseplants that are — against all odds — still alive.
                  </p>
                </div>
              </div>

              {/* Stats scroll */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {[
                  { rune: "🗡️", label: "Weapon", value: "Neovim" },
                  { rune: "🌍", label: "Realm", value: "The Internet" },
                  { rune: "📜", label: "Tongue", value: "TS · Go · Rust" },
                  { rune: "⚗️", label: "School", value: "Self-taught" },
                ].map(({ rune, label, value }) => (
                  <div
                    key={label}
                    className="p-3 text-center"
                    style={{ background: "rgba(201,162,39,0.025)", border: "1px solid rgba(201,162,39,0.12)" }}
                  >
                    <div style={{ fontSize: "1.4rem" }}>{rune}</div>
                    <div style={{ fontSize: "0.6rem", color: "#6a5a3a", fontFamily: "'Cinzel', serif", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#c8b880", fontFamily: "'IM Fell English', serif", fontStyle: "italic", marginTop: "2px" }}>{value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ARMORY (Projects) */}
            <section
              id="armory"
              ref={(el) => { sectionRefs.current["armory"] = el; }}
            >
              <SectionHeading rune="⚔️">The Armory</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {PROJECTS.map((p) => <ProjectCard key={p.name} {...p} />)}
              </div>
              <a
                href="#"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.72rem",
                  color: "#8a7a5a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a227")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7a5a")}
              >
                ⟶ View Full Armory on GitHub
              </a>
            </section>

            {/* SCRIPTORIUM (Blog) */}
            <section
              id="scriptorium"
              ref={(el) => { sectionRefs.current["scriptorium"] = el; }}
            >
              <SectionHeading rune="🪶">The Scriptorium</SectionHeading>
              <div>
                {POSTS.map((p) => <ScrollEntry key={p.title} {...p} />)}
              </div>
              <a
                href="#"
                className="mt-4 inline-block"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.72rem",
                  color: "#8a7a5a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a227")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7a5a")}
              >
                ⟶ All Scrolls via RSS
              </a>
            </section>

            {/* TAVERN (Links + Guestbook) */}
            <section
              id="tavern"
              ref={(el) => { sectionRefs.current["tavern"] = el; }}
            >
              <SectionHeading rune="🍺">The Tavern</SectionHeading>

              {/* Links */}
              <div className="flex flex-wrap gap-3 mb-10">
                {LINKS.map(({ label, href, symbol }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 px-4 py-2.5 transition-all duration-150"
                    style={{
                      background: "rgba(201,162,39,0.03)",
                      border: "1px solid rgba(201,162,39,0.18)",
                      color: "#a08a60",
                      textDecoration: "none",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c9a227";
                      e.currentTarget.style.borderColor = "rgba(201,162,39,0.4)";
                      e.currentTarget.style.background = "rgba(201,162,39,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#a08a60";
                      e.currentTarget.style.borderColor = "rgba(201,162,39,0.18)";
                      e.currentTarget.style.background = "rgba(201,162,39,0.03)";
                    }}
                  >
                    <span>{symbol}</span>
                    {label}
                  </a>
                ))}
              </div>

              {/* Guestbook */}
              <div
                className="p-6 relative"
                style={{
                  background: "rgba(139,26,26,0.04)",
                  border: "1px solid rgba(139,26,26,0.2)",
                }}
              >
                <div style={{ position: "absolute", inset: "4px", border: "1px solid rgba(139,26,26,0.07)", pointerEvents: "none" }} />
                {["top-2 left-3", "top-2 right-3", "bottom-2 left-3", "bottom-2 right-3"].map((p) => (
                  <span key={p} className={`absolute ${p}`} style={{ fontSize: "0.8rem", color: "#8b1a1a60" }}>⚜</span>
                ))}

                <h3
                  className="mb-5"
                  style={{
                    fontFamily: "'UnifrakturMaguntia', serif",
                    fontSize: "1.6rem",
                    color: "#c9a227",
                    textShadow: "0 0 12px rgba(201,162,39,0.2)",
                  }}
                >
                  Sign the Royal Register
                </h3>

                {submitted ? (
                  <div className="py-8 text-center">
                    <div style={{ fontSize: "2rem" }}>🏅</div>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "#c9a227", marginTop: "8px" }}>
                      Your words are inscribed in the register. The realm thanks thee.
                    </p>
                  </div>
                ) : (
                  <form
                    className="space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (guestName) setSubmitted(true);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Thy name, traveller..."
                        required
                        className="flex-1 bg-transparent px-3 py-2"
                        style={{
                          border: "1px solid rgba(201,162,39,0.2)",
                          color: "#e8d5a3",
                          fontFamily: "'IM Fell English', serif",
                          fontSize: "0.9rem",
                        }}
                      />
                      <input
                        placeholder="Thy website (optional)"
                        className="flex-1 bg-transparent px-3 py-2"
                        style={{
                          border: "1px solid rgba(201,162,39,0.2)",
                          color: "#e8d5a3",
                          fontFamily: "'IM Fell English', serif",
                          fontSize: "0.9rem",
                        }}
                      />
                    </div>
                    <textarea
                      value={guestMsg}
                      onChange={(e) => setGuestMsg(e.target.value)}
                      placeholder="Leave thy mark upon these halls..."
                      rows={3}
                      className="w-full bg-transparent px-3 py-2 resize-none"
                      style={{
                        border: "1px solid rgba(201,162,39,0.2)",
                        color: "#e8d5a3",
                        fontFamily: "'IM Fell English', serif",
                        fontSize: "0.9rem",
                      }}
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 transition-all duration-150"
                      style={{
                        background: "rgba(201,162,39,0.1)",
                        border: "1px solid rgba(201,162,39,0.35)",
                        color: "#c9a227",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.78rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,162,39,0.18)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201,162,39,0.1)"; }}
                    >
                      ⚜ Inscribe ⚜
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-10 pb-4" style={{ borderTop: "1px solid rgba(201,162,39,0.12)" }}>
              <div
                className="text-center"
                style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: "1.1rem", color: "#c9a22740", letterSpacing: "0.1em" }}
              >
                ⚔ ✦ 🏰 ✦ ⚔
              </div>
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.62rem", color: "#6a5a3a", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Forged by hand · No trackers · No algorithms
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.62rem", color: "#6a5a3a", letterSpacing: "0.1em" }}>
                  Anno Domini{" "}
                  <span style={{ color: "#c9a22780" }}>
                    {new Date().getFullYear()}
                  </span>
                </p>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </>
  );
}
