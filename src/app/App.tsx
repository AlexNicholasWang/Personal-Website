import { useState, useEffect, useRef } from "react";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.7 + 0.2,
  blink: Math.random() > 0.6,
  delay: Math.random() * 4,
}));

const PROJECTS = [
  {
    name: "starfield.js",
    desc: "A tiny canvas library for procedural star animations. Zero dependencies, 2kb gzipped.",
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 312,
    href: "#",
  },
  {
    name: "coven",
    desc: "Minimal IRC-like chat for small communities. Self-hostable, end-to-end encrypted.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 841,
    href: "#",
  },
  {
    name: "moonphase-api",
    desc: "Free REST API returning current moon phase, rise/set times, and illumination percentage.",
    lang: "Go",
    langColor: "#00add8",
    stars: 1204,
    href: "#",
  },
  {
    name: "pixel-rain",
    desc: "CSS + JS rain effect that runs in any webpage without iframes or heavy dependencies.",
    lang: "CSS",
    langColor: "#563d7c",
    stars: 198,
    href: "#",
  },
];

const POSTS = [
  {
    date: "2026-06-10",
    title: "How I built a rain effect in 40 lines of JS",
    excerpt: "A walkthrough of the pixel-rain project, from the first canvas experiments to the final polished library.",
  },
  {
    date: "2026-05-22",
    title: "The indie web is not dead",
    excerpt: "Reflections on spending a month rebuilding my personal site from scratch with no frameworks, no analytics.",
  },
  {
    date: "2026-04-03",
    title: "Moon phase APIs: a deep dive",
    excerpt: "Why every existing lunar API was either broken, paywalled, or just wrong — so I built my own.",
  },
];

const LINKS = [
  { label: "GitHub", href: "#", emoji: "🐙" },
  { label: "Mastodon", href: "#", emoji: "🐘" },
  { label: "Last.fm", href: "#", emoji: "🎵" },
  { label: "RSS", href: "#", emoji: "📡" },
  { label: "Email", href: "#", emoji: "✉️" },
];

const BADGES = [
  { label: "Neocities", color: "#0066cc" },
  { label: "Handmade", color: "#5c3317" },
  { label: "No AI Art", color: "#222" },
  { label: "Firefox", color: "#e76e00" },
  { label: "Dark Mode", color: "#1a1a2e" },
];

const NOW_PLAYING = {
  track: "Stars (Are Out Tonight)",
  artist: "David Bowie",
};

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {STARS.map((s) => (
        <span
          key={s.id}
          className={s.blink ? "animate-pulse" : ""}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: "#c9a0ff",
            opacity: s.opacity,
            animationDuration: `${2 + s.delay}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function MoodBadge({ mood }: { mood: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs tracking-widest uppercase"
      style={{
        background: "rgba(201, 160, 255, 0.1)",
        border: "1px solid rgba(201, 160, 255, 0.25)",
        color: "#c9a0ff",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#ff87ab] inline-block" />
      {mood}
    </span>
  );
}

function SectionHeading({ children, glyph = "✦" }: { children: React.ReactNode; glyph?: string }) {
  return (
    <h2
      className="flex items-center gap-3 mb-6"
      style={{ fontFamily: "'VT323', monospace", fontSize: "1.75rem", color: "#c9a0ff", letterSpacing: "0.08em" }}
    >
      <span style={{ opacity: 0.5 }}>{glyph}</span>
      {children}
      <span className="flex-1 h-px" style={{ background: "rgba(201,160,255,0.15)" }} />
    </h2>
  );
}

function ProjectCard({ name, desc, lang, langColor, stars, href }: (typeof PROJECTS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block p-4 transition-all duration-200"
      style={{
        background: hovered ? "rgba(201,160,255,0.06)" : "rgba(201,160,255,0.02)",
        border: `1px solid ${hovered ? "rgba(201,160,255,0.28)" : "rgba(201,160,255,0.1)"}`,
        borderRadius: "2px",
        textDecoration: "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.95rem",
            color: "#c9a0ff",
            fontWeight: 500,
          }}
        >
          {name}
        </span>
        <span
          className="flex items-center gap-1 shrink-0"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#7a7090" }}
        >
          ★ {stars.toLocaleString()}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#7a7090" }}>
        {desc}
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#7a7090" }}>
          {lang}
        </span>
      </div>
    </a>
  );
}

function PostRow({ date, title, excerpt }: (typeof POSTS)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block py-4 transition-colors duration-150"
      style={{
        borderBottom: "1px solid rgba(201,160,255,0.08)",
        textDecoration: "none",
      }}
    >
      <div className="flex gap-4 items-baseline">
        <span
          className="shrink-0"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#7a7090" }}
        >
          {date}
        </span>
        <div>
          <p
            className="text-sm font-medium transition-colors duration-150"
            style={{
              color: hovered ? "#c9a0ff" : "#d4cfe8",
              fontFamily: "'Noto Serif', serif",
              fontStyle: "italic",
            }}
          >
            {title}
          </p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: "#7a7090" }}>
            {excerpt}
          </p>
        </div>
      </div>
    </a>
  );
}

function NowPlaying() {
  const [playing] = useState(true);
  return (
    <div
      className="flex items-center gap-2 px-3 py-2"
      style={{
        background: "rgba(255,135,171,0.06)",
        border: "1px solid rgba(255,135,171,0.2)",
        borderRadius: "2px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.72rem",
      }}
    >
      <span
        className={playing ? "animate-pulse" : ""}
        style={{ color: "#ff87ab", fontSize: "0.6rem" }}
      >
        ▶
      </span>
      <span style={{ color: "#7a7090" }}>now playing</span>
      <span style={{ color: "#d4cfe8" }}>
        {NOW_PLAYING.artist} — {NOW_PLAYING.track}
      </span>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = ["about", "projects", "blog", "links"];

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#0b0b18", color: "#d4cfe8", fontFamily: "'JetBrains Mono', monospace" }}
    >
      <StarField />

      {/* Layout */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Sidebar + Main */}
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky" style={{ top: "3rem" }}>
              {/* Avatar + name */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-sm mb-4 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1a0a2e 0%, #2a1458 100%)",
                    border: "1px solid rgba(201,160,255,0.25)",
                    fontSize: "2rem",
                  }}
                >
                  ☽
                </div>
                <h1
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: "2.2rem",
                    color: "#c9a0ff",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  yourname
                </h1>
                <p className="text-xs mt-1" style={{ color: "#7a7090" }}>
                  @yourhandle
                </p>
              </div>

              <MoodBadge mood="curious 🌙" />

              <nav className="mt-6 space-y-0.5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="flex items-center gap-2 px-2 py-1.5 transition-colors duration-150 text-sm"
                    style={{
                      color: activeSection === item ? "#c9a0ff" : "#7a7090",
                      background: activeSection === item ? "rgba(201,160,255,0.07)" : "transparent",
                      borderLeft: `2px solid ${activeSection === item ? "#c9a0ff" : "transparent"}`,
                      textDecoration: "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span style={{ opacity: activeSection === item ? 1 : 0.4 }}>✦</span>
                    {item}
                  </a>
                ))}
              </nav>

              <div className="mt-8">
                <NowPlaying />
              </div>

              {/* Status */}
              <div
                className="mt-4 p-3 text-xs leading-relaxed"
                style={{
                  background: "rgba(201,160,255,0.03)",
                  border: "1px solid rgba(201,160,255,0.1)",
                  borderRadius: "2px",
                  color: "#7a7090",
                }}
              >
                <span style={{ color: "#c9a0ff" }}>// status</span>
                <br />
                writing code somewhere between midnight and 3am. building things for fun, not VC funding.
              </div>

              {/* 88x31 badges */}
              <div className="mt-5 flex flex-wrap gap-1">
                {BADGES.map((b) => (
                  <span
                    key={b.label}
                    className="inline-block px-2 py-0.5 text-center"
                    style={{
                      width: "88px",
                      height: "31px",
                      background: b.color,
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontSize: "9px",
                      lineHeight: "29px",
                      color: "#fff",
                      fontFamily: "'VT323', monospace",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* About */}
            <section
              id="about"
              ref={(el) => { sectionRefs.current["about"] = el; }}
            >
              <SectionHeading glyph="☾">about</SectionHeading>
              <div className="space-y-4 text-sm leading-loose" style={{ color: "#a89cc0" }}>
                <p>
                  hey! i'm a developer and occasional writer who builds small,{" "}
                  <span style={{ color: "#c9a0ff" }}>useful things</span> for the web. i care a lot about the indie web,
                  handmade software, and keeping personal websites weird.
                </p>
                <p>
                  i've been making websites since my early teens — first on Geocities, then Tumblr, then Neocities, and
                  now here. somewhere along the way i learned to actually write good code, but the spirit of{" "}
                  <span style={{ color: "#ff87ab" }}>making something just because it's fun</span> never left.
                </p>
                <p>
                  when i'm not at a keyboard i'm probably watching old films, obsessing over moon phases, or trying to
                  grow herbs on a windowsill with questionable success.
                </p>
              </div>

              <div
                className="mt-6 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
                style={{
                  background: "rgba(201,160,255,0.03)",
                  border: "1px solid rgba(201,160,255,0.1)",
                  borderRadius: "2px",
                }}
              >
                {[
                  { label: "location", value: "somewhere cool" },
                  { label: "pronouns", value: "they/them" },
                  { label: "languages", value: "TS · Go · Rust" },
                  { label: "editor", value: "neovim, btw" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs" style={{ color: "#7a7090" }}>
                      {label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#d4cfe8" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section
              id="projects"
              ref={(el) => { sectionRefs.current["projects"] = el; }}
            >
              <SectionHeading glyph="✦">projects</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECTS.map((p) => (
                  <ProjectCard key={p.name} {...p} />
                ))}
              </div>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
                style={{ color: "#7a7090", fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7090")}
              >
                view all on github →
              </a>
            </section>

            {/* Blog */}
            <section
              id="blog"
              ref={(el) => { sectionRefs.current["blog"] = el; }}
            >
              <SectionHeading glyph="✧">blog</SectionHeading>
              <div>
                {POSTS.map((p) => (
                  <PostRow key={p.title} {...p} />
                ))}
              </div>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
                style={{ color: "#7a7090", fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7090")}
              >
                rss feed →
              </a>
            </section>

            {/* Links */}
            <section
              id="links"
              ref={(el) => { sectionRefs.current["links"] = el; }}
            >
              <SectionHeading glyph="⊹">links</SectionHeading>
              <div className="flex flex-wrap gap-3">
                {LINKS.map(({ label, href, emoji }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 px-4 py-2 text-sm transition-all duration-150"
                    style={{
                      background: "rgba(201,160,255,0.04)",
                      border: "1px solid rgba(201,160,255,0.15)",
                      borderRadius: "2px",
                      color: "#a89cc0",
                      textDecoration: "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c9a0ff";
                      e.currentTarget.style.borderColor = "rgba(201,160,255,0.35)";
                      e.currentTarget.style.background = "rgba(201,160,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#a89cc0";
                      e.currentTarget.style.borderColor = "rgba(201,160,255,0.15)";
                      e.currentTarget.style.background = "rgba(201,160,255,0.04)";
                    }}
                  >
                    <span>{emoji}</span>
                    {label}
                  </a>
                ))}
              </div>

              {/* Guestbook / friends section */}
              <div
                className="mt-10 p-5"
                style={{
                  background: "rgba(255,135,171,0.03)",
                  border: "1px solid rgba(255,135,171,0.12)",
                  borderRadius: "2px",
                }}
              >
                <h3
                  className="mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'VT323', monospace", fontSize: "1.3rem", color: "#ff87ab" }}
                >
                  ✩ sign my guestbook
                </h3>
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const t = e.currentTarget;
                    const name = (t.elements.namedItem("name") as HTMLInputElement)?.value;
                    if (name) alert(`thanks for signing, ${name}! 🌙`);
                    t.reset();
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      name="name"
                      placeholder="your name"
                      required
                      className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                      style={{
                        border: "1px solid rgba(255,135,171,0.2)",
                        borderRadius: "2px",
                        color: "#d4cfe8",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8rem",
                      }}
                    />
                    <input
                      name="site"
                      placeholder="your site (optional)"
                      className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                      style={{
                        border: "1px solid rgba(255,135,171,0.2)",
                        borderRadius: "2px",
                        color: "#d4cfe8",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8rem",
                      }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="leave a message..."
                    rows={3}
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none resize-none"
                    style={{
                      border: "1px solid rgba(255,135,171,0.2)",
                      borderRadius: "2px",
                      color: "#d4cfe8",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs transition-all duration-150"
                    style={{
                      background: "rgba(255,135,171,0.12)",
                      border: "1px solid rgba(255,135,171,0.3)",
                      borderRadius: "2px",
                      color: "#ff87ab",
                      fontFamily: "'VT323', monospace",
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,135,171,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,135,171,0.12)";
                    }}
                  >
                    SIGN ✩
                  </button>
                </form>
              </div>
            </section>

            {/* Footer */}
            <footer
              className="pt-8 pb-4"
              style={{ borderTop: "1px solid rgba(201,160,255,0.08)" }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs" style={{ color: "#7a7090" }}>
                  handmade with ☽ · no trackers · no cookies · valid html
                </p>
                <p className="text-xs" style={{ color: "#7a7090" }}>
                  last updated{" "}
                  <span style={{ color: "#c9a0ff" }}>
                    {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </p>
              </div>
              <p className="mt-2 text-xs" style={{ color: "#3a3050" }}>
                ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦
              </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}
