import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content (from the November 2026 CV)                                */
/* ------------------------------------------------------------------ */

const EMAIL = "alexwang770@ucla.edu";

const research = [
  {
    org: "UCLA Mathematics",
    lab: "Mathematical & Statistical Finance Group",
    advisor: "Prof. Mihai Cucuringu",
    detail:
      "Quantitative research on equity order flow: analyzing high-frequency limit order book data and applying matrix decomposition techniques to find stock-specific signals for return prediction.",
    color: "var(--coral)",
  },
  {
    org: "UCLA Mathematics",
    lab: "Directed Reading Program",
    advisor: "Daniel Rui",
    detail:
      "Spectral graph theory, expander graphs, random walks, and the expansion properties of zig-zag products. Presented the work at the UCLA DRP Colloquium.",
    color: "var(--violet)",
  },
  {
    org: "UCLA Computer Science",
    lab: "StarAI Lab",
    advisor: "Daniel Israel",
    detail:
      "Researched the computational efficiency and accuracy of multimodal machine learning models on the ImageNet benchmark for image classification.",
    color: "var(--mint)",
  },
  {
    org: "University of Delaware",
    lab: "GEMS REU",
    advisor: "Prof. Sebastian Cioaba",
    detail:
      "Random walks and expander graphs: their structural properties and their connections to probability, spectral graph theory, and theoretical computer science.",
    color: "var(--sun)",
  },
  {
    org: "UCLA Mathematics",
    lab: "BruinML Group",
    advisor: "William Chang",
    detail:
      "Co-developed a low-rank bandit algorithm that adapts pretrained AI models using far less user data, by proving stability guarantees for multi-agent systems.",
    color: "var(--violet)",
  },
];

const sophronSteps = ["Map the codebase", "Plan the task", "Make the change", "Test it in a sandbox"];

const projects = [
  {
    name: "LA Pokerbots engine",
    kind: "Python, Monte Carlo, REST API",
    detail:
      "A Python poker AI built on Monte Carlo simulation and opponent modeling, served over REST APIs. Supported by Jane Street, DRW, Citadel, Susquehanna, Optiver, AXQ Capital and Walleye Capital.",
    url: "https://github.com/AlexNicholasWang/LAPokerbots",
    color: "var(--coral)",
  },
  {
    name: "Euler’s Chess Engine",
    kind: "C++, search, game AI",
    detail: "A C++ chess engine with minimax, alpha-beta pruning and transposition tables.",
    url: "https://eulerchessengine.site/",
    color: "var(--sun)",
  },
  {
    name: "Keyfolio",
    kind: "Full-stack platform",
    detail: "A property management platform for landlords and tenants.",
    url: "https://goldenkeyscapital.app/",
    color: "var(--mint)",
  },
  {
    name: "Cosmas",
    kind: "AI assistant",
    detail: "An AI assistant that helps people figure out which public benefits they qualify for.",
    url: "https://cosmas.cfd/",
    color: "var(--violet)",
  },
  {
    name: "InkWells",
    kind: "AI photo editing",
    detail: "An AI-powered photo editor.",
    url: "https://inkwell.pics/",
    color: "var(--coral)",
  },
  {
    name: "TON-619",
    kind: "Physics simulation",
    detail: "A black hole simulation inspired by one of the largest known black holes.",
    url: "https://ton619.cfd/",
    color: "var(--sun)",
  },
  {
    name: "Tic-Tac-Toe Solver",
    kind: "Game theory",
    detail: "Play against perfect play and see why every line ends in a draw.",
    url: "https://tictactoesolver.fun/",
    color: "var(--mint)",
  },
];

const awards = [
  "National Merit Scholar Finalist",
  "Mathematics Department Honor (Honorable Mention)",
  "November 14 Award",
  "RIT Presidential Scholarship",
  "DIAA Scholar-Athlete Award",
  "Delaware State Champion",
  "Delaware All-State Athlete",
];

const coursework = [
  "Calculus",
  "Multivariable Calculus",
  "Linear Algebra",
  "Differential Equations",
  "Discrete Mathematics",
  "Abstract Linear Algebra",
  "Applied Numerical Methods (in progress)",
  "Probability & Statistics (in progress)",
];

const skills = [
  { group: "Languages", items: "Python, C++, Java, TypeScript/JavaScript, SQL, Swift" },
  { group: "ML and scientific", items: "PyTorch, NumPy, SciPy, Pandas, reinforcement learning, model fine-tuning" },
  { group: "Frameworks and tools", items: "FastAPI, React, SQLAlchemy, PostgreSQL, Docker, Git, CI/CD" },
];

// words light up as you scroll; colored phrases match the section colors below
const statement = [
  { t: "I like problems where the math is real and the code has to run. Right now that means" },
  { t: "random walks on expander graphs,", c: "var(--violet-t)" },
  { t: "order flow in equity markets,", c: "var(--coral-t)" },
  { t: "and" },
  { t: "AI agents that find their way around code they’ve never seen.", c: "var(--mint-t)" },
].flatMap((s) => s.t.split(" ").map((w) => ({ w, c: s.c })));

const NAV = [
  { id: "research", label: "Research" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  Hero: a lazy random walk on a sparse random graph                  */
/* ------------------------------------------------------------------ */

type GNode = { ox: number; oy: number; x: number; y: number; nbrs: number[] };

function buildGraph(w: number, h: number): GNode[] {
  const n = Math.round(Math.min(110, Math.max(42, (w * h) / 13000)));
  const cols = Math.max(4, Math.round(Math.sqrt((n * w) / h)));
  const rows = Math.ceil(n / cols);
  const cw = w / cols;
  const ch = h / rows;
  const cells: [number, number][] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
  cells.sort(() => Math.random() - 0.5);
  const nodes: GNode[] = cells.slice(0, n).map(([c, r]) => {
    const x = (c + 0.2 + Math.random() * 0.6) * cw;
    const y = (r + 0.2 + Math.random() * 0.6) * ch;
    return { ox: x, oy: y, x, y, nbrs: [] };
  });
  const link = (a: number, b: number) => {
    if (a === b || nodes[a].nbrs.includes(b)) return;
    nodes[a].nbrs.push(b);
    nodes[b].nbrs.push(a);
  };
  const d2 = (a: GNode, b: GNode) => (a.ox - b.ox) ** 2 + (a.oy - b.oy) ** 2;
  nodes.forEach((p, i) => {
    const near = nodes
      .map((q, j) => ({ j, d: d2(p, q) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d);
    link(i, near[0].j);
    link(i, near[1].j);
    if (Math.random() < 0.22) {
      const far = near.filter((o) => o.d > (w * 0.22) ** 2);
      if (far.length) link(i, far[Math.floor(Math.random() * far.length)].j);
    }
  });
  // make sure the graph is connected
  for (;;) {
    const seen = new Set<number>([0]);
    const stack = [0];
    while (stack.length) {
      const u = stack.pop()!;
      for (const v of nodes[u].nbrs) if (!seen.has(v)) { seen.add(v); stack.push(v); }
    }
    if (seen.size === nodes.length) break;
    let best = { a: 0, b: 0, d: Infinity };
    nodes.forEach((p, i) => {
      if (seen.has(i)) return;
      seen.forEach((j) => {
        const d = d2(p, nodes[j]);
        if (d < best.d) best = { a: i, b: j, d };
      });
    });
    link(best.a, best.b);
  }
  return nodes;
}

const RGB = {
  violet: [96, 96, 104],
  coral: [170, 170, 168],
  sun: [255, 255, 255],
};

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function WalkCanvas({ onStats }: { onStats: (t: number, tv: number) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef(onStats);
  statsRef.current = onStats;

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let nodes: GNode[] = [];
    let pi: number[] = [];
    let p: number[] = [];
    let step = 0;
    let cur = 0, nxt = 0, hopT = 0;
    let trail: { a: number; b: number; life: number }[] = [];
    let comet: { x: number; y: number }[] = [];
    let mixedAt = 0;
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let distClock = 0;

    const tvDist = () => p.reduce((s, v, i) => s + Math.abs(v - pi[i]), 0) / 2;

    const restart = (v: number) => {
      p = nodes.map((_, i) => (i === v ? 1 : 0));
      step = 0;
      cur = v;
      nxt = nodes[v].nbrs[Math.floor(Math.random() * nodes[v].nbrs.length)];
      hopT = 0;
      trail = [];
      comet = [];
      mixedAt = 0;
      statsRef.current(0, tvDist());
    };

    // one step of the lazy walk: p <- p (I + D^-1 A) / 2
    const evolve = () => {
      const q = p.map((v) => v / 2);
      nodes.forEach((nd, u) => {
        const share = p[u] / 2 / nd.nbrs.length;
        for (const v of nd.nbrs) q[v] += share;
      });
      p = q;
      step++;
      statsRef.current(step, tvDist());
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        const dx = n.ox - mouse.x, dy = n.oy - mouse.y;
        const d = Math.hypot(dx, dy);
        let tx = n.ox, ty = n.oy;
        if (d < 140 && d > 0.01) {
          const push = ((140 - d) / 140) * 30;
          tx += (dx / d) * push;
          ty += (dy / d) * push;
        }
        const k = reduce ? 1 : Math.min(1, dt * 8);
        n.x += (tx - n.x) * k;
        n.y += (ty - n.y) * k;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(236,235,230,0.1)";
      ctx.beginPath();
      nodes.forEach((n, i) => {
        for (const j of n.nbrs) if (j > i) { ctx.moveTo(n.x, n.y); ctx.lineTo(nodes[j].x, nodes[j].y); }
      });
      ctx.stroke();

      ctx.lineWidth = 2;
      for (const t of trail) {
        ctx.strokeStyle = `rgba(255,255,255,${t.life * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(nodes[t.a].x, nodes[t.a].y);
        ctx.lineTo(nodes[t.b].x, nodes[t.b].y);
        ctx.stroke();
      }

      // glow shows p_t(v) / pi(v): hot where the walk is over-represented, cool where under
      ctx.globalCompositeOperation = "lighter";
      nodes.forEach((n, i) => {
        const ratio = p[i] / pi[i];
        if (ratio < 0.02) return;
        const capped = Math.min(ratio, 6);
        const radius = 5 + 32 * Math.sqrt(capped / 6);
        const col =
          ratio < 1
            ? mix(RGB.violet, RGB.coral, ratio * 0.35)
            : mix(RGB.coral, RGB.sun, Math.min(1, (ratio - 1) / 3));
        const alpha = Math.min(0.85, 0.2 + 0.22 * capped);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius);
        g.addColorStop(0, `rgba(${col.join(",")},${alpha})`);
        g.addColorStop(1, `rgba(${col.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "rgba(236,235,230,0.6)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduce) return;

      const e = hopT < 0.5 ? 2 * hopT * hopT : 1 - (-2 * hopT + 2) ** 2 / 2;
      const a = nodes[cur], b = nodes[nxt];
      const wx = a.x + (b.x - a.x) * e;
      const wy = a.y + (b.y - a.y) * e;
      comet.push({ x: wx, y: wy });
      if (comet.length > 16) comet.shift();
      comet.forEach((c, i) => {
        const t = (i + 1) / comet.length;
        ctx.fillStyle = `rgba(255,255,255,${t * 0.5})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.5 + t * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      const halo = ctx.createRadialGradient(wx, wy, 0, wx, wy, 24);
      halo.addColorStop(0, "rgba(255,255,255,0.6)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(wx, wy, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(wx, wy, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const setup = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = buildGraph(W, H);
      const deg = nodes.reduce((s, n) => s + n.nbrs.length, 0);
      pi = nodes.map((n) => n.nbrs.length / deg);
      // start upper right, away from the name
      let start = 0, best = Infinity;
      nodes.forEach((n, i) => {
        const d = (n.ox - W * 0.78) ** 2 + (n.oy - H * 0.3) ** 2;
        if (d < best) { best = d; start = i; }
      });
      restart(start);
      if (reduce) {
        for (let i = 0; i < 18; i++) evolve();
        draw(0);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        hopT += dt / 0.34;
        if (hopT >= 1) {
          trail.push({ a: cur, b: nxt, life: 1 });
          cur = nxt;
          const nb = nodes[cur].nbrs;
          nxt = nb[Math.floor(Math.random() * nb.length)];
          hopT = 0;
        }
        trail.forEach((t) => (t.life -= dt * 0.45));
        trail = trail.filter((t) => t.life > 0);

        distClock += dt;
        if (distClock > 0.16) {
          distClock = 0;
          if (!mixedAt) {
            evolve();
            if (tvDist() < 0.01) mixedAt = now;
          } else if (now - mixedAt > 2600) {
            restart(Math.floor(Math.random() * nodes.length));
          }
        }
        draw(dt);
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (ev: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    const onClick = (ev: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = ev.clientX - r.left, y = ev.clientY - r.top;
      let bi = 0, bd = Infinity;
      nodes.forEach((n, i) => {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < bd) { bd = d; bi = i; }
      });
      restart(bi);
      if (reduce) {
        for (let i = 0; i < 18; i++) evolve();
        draw(0);
      }
    };

    setup();
    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect();
      if (Math.abs(r.width - W) > 40 || Math.abs(r.height - H) > 120) setup();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(wrap);
    const hero = wrap.parentElement!;
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="walk" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const fmt = (v: number) => Math.round(v).toLocaleString("en-US");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = fmt(to); return; }
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / 1400);
        el.textContent = fmt(to * (1 - (1 - t) ** 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span className="count" ref={ref}>{to.toLocaleString("en-US")}</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  const [stats, setStats] = useState({ t: 0, tv: 1 });
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [stepIdx, setStepIdx] = useState(0);
  const statementRef = useRef<HTMLDivElement>(null);
  const statsThrottle = useRef(0);

  const onStats = (t: number, tv: number) => {
    const now = performance.now();
    if (t === 0 || now - statsThrottle.current > 120) {
      statsThrottle.current = now;
      setStats({ t, tv });
    }
  };

  // nav background + scroll-linked statement
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = () => Array.from(statementRef.current?.querySelectorAll<HTMLSpanElement>(".sw") ?? []);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const el = statementRef.current;
        if (!el || reduce) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const prog = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.2)));
        const ws = words();
        const lit = Math.round(prog * ws.length);
        ws.forEach((w, i) => w.classList.toggle("lit", i < lit));
      });
    };
    if (reduce) words().forEach((w) => w.classList.add("lit"));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal on scroll + active nav section
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) spy.observe(el); });
    return () => { io.disconnect(); spy.disconnect(); };
  }, []);

  // Sophron step cycle
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStepIdx((i) => (i + 1) % sophronSteps.length), 1500);
    return () => window.clearInterval(id);
  }, []);

  const mixed = stats.tv < 0.01;

  return (
    <div className="site">
      <a className="skip" href="#research">Skip to content</a>

      <header className={scrolled ? "nav scrolled" : "nav"}>
        <a href="#top" className="mark" aria-label="Alexander Wang, back to top">
          <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
            <line x1="8" y1="31" x2="20" y2="9" />
            <line x1="20" y1="9" x2="32" y2="31" />
            <line x1="8" y1="31" x2="32" y2="31" />
            <line x1="14" y1="20" x2="26" y2="20" />
            <circle cx="8" cy="31" r="3.2" />
            <circle cx="20" cy="9" r="3.2" />
            <circle cx="32" cy="31" r="3.2" />
            <circle className="mark-walker" cx="20" cy="9" r="3.4" />
          </svg>
          <span>Alexander Wang</span>
        </a>
        <nav aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "on" : ""}>{n.label}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <WalkCanvas onStats={onStats} />
          <div className="hero-copy">
            <h1 aria-label="Alexander Wang">
              {["Alexander", "Wang"].map((word, wi) => (
                <span className="line" key={word} aria-hidden="true">
                  {word.split("").map((ch, ci) => (
                    <span className="ch" key={ci} style={{ ["--i" as string]: wi * 9 + ci }}>{ch}</span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="hero-sub">
              Mathematics of Computation at UCLA. I do research in machine learning, graph theory and markets,
              and I’m building Sophron, an AI agent for software engineering.
            </p>
            <div className="hero-links">
              <a href={`mailto:${EMAIL}`}><Mail size={17} /> Email</a>
              <a href="https://www.linkedin.com/in/alexwang67/" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn</a>
              <a href="https://github.com/AlexNicholasWang" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub</a>
            </div>
          </div>
          <div className="readout" aria-hidden="true">
            <div className="readout-row"><span>step</span><b>{stats.t}</b></div>
            <div className="readout-row"><span>distance to stationary</span><b>{stats.tv.toFixed(3)}</b></div>
            <div className="meter"><i style={{ transform: `scaleX(${1 - Math.min(1, stats.tv)})` }} /></div>
            <p>{mixed ? "Mixed. Restarting somewhere new." : "A lazy random walk spreading across a sparse random graph. Click anywhere to restart it from there."}</p>
          </div>
        </section>

        {/* STATEMENT */}
        <section className="statement-wrap">
          <p className="statement" ref={statementRef}>
            {statement.map((s, i) => (
              <span key={i} className={s.c ? "sw hl" : "sw"} style={s.c ? { ["--c" as string]: s.c } : undefined}>
                {s.w}{" "}
              </span>
            ))}
          </p>
        </section>

        {/* RESEARCH */}
        <section id="research" className="block">
          <div className="block-head" data-reveal>
            <h2>Research</h2>
            <p>Five groups across UCLA and the University of Delaware, spanning machine learning, spectral graph theory and market microstructure.</p>
          </div>
          <ol className="research">
            {research.map((r) => (
              <li key={r.lab} data-reveal style={{ ["--c" as string]: r.color }}>
                <span className="node" aria-hidden="true" />
                <div className="r-main">
                  <h3>{r.lab}</h3>
                  <p className="r-org">{r.org}, advised by {r.advisor}</p>
                </div>
                <p className="r-detail">{r.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WORK */}
        <section id="work" className="work">
          <div className="work-inner">
            <div className="work-head" data-reveal>
              <h2>Manispace Capital</h2>
              <p>Quantitative Developer Intern in New York, June to August 2026. Manispace is seeded by Morgan Stanley.</p>
            </div>
            <div className="work-grid">
              <article data-reveal>
                <div className="big"><Count to={2300} /> stocks, <Count to={20} /> years</div>
                <p>Rewrote the firm’s stock return-forecasting model from MATLAB into Python so it runs in the team’s backtester without MATLAB, reproducing its output to 10 decimal places.</p>
              </article>
              <article data-reveal>
                <div className="big"><Count to={2} /> days</div>
                <p>Got the team’s backtests running again after a 3-week outage, by tracing the failures to misconfigured environment variables on an air-gapped server and fixing the database connection.</p>
              </article>
              <article data-reveal>
                <div className="big"><Count to={20} /> runs, one night</div>
                <p>Added a batch mode to the backtesting framework, so a 20-run parameter sweep is one overnight job.</p>
              </article>
              <article data-reveal>
                <div className="big"><Count to={4200} /> M&amp;A deals</div>
                <p>Ran an event study: targets jumped about 16% on the news, while acquirers fell about 1%.</p>
              </article>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="block">
          <div className="block-head" data-reveal>
            <h2>Projects</h2>
            <p>Things I’ve built, starting with the one I spend the most time on.</p>
          </div>

          <a className="sophron" href="https://sophronai.org" target="_blank" rel="noopener noreferrer" data-reveal>
            <div className="s-copy">
              <span className="s-badge">Top 10% of YC F26 applicants</span>
              <h3>Sophron AI</h3>
              <p>An autonomous AI agent that maps unfamiliar codebases, plans and carries out engineering tasks, and tests every change in an isolated sandbox.</p>
              <span className="s-link">Visit sophronai.org <ArrowUpRight size={18} /></span>
            </div>
            <ol className="s-steps" aria-label="How Sophron works">
              {sophronSteps.map((s, i) => (
                <li key={s} className={i === stepIdx ? "now" : i < stepIdx ? "done" : ""}>
                  <span className="s-num">{i + 1}</span>{s}
                </li>
              ))}
            </ol>
          </a>

          <ul className="plist">
            {projects.map((p) => (
              <li key={p.name} data-reveal style={{ ["--c" as string]: p.color }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <span className="p-name">{p.name}</span>
                  <span className="p-detail">{p.detail}</span>
                  <span className="p-kind">{p.kind}</span>
                  <ArrowUpRight className="p-arrow" size={26} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* AWARDS */}
        <section className="awards" aria-label="Awards">
          <ul className="sr-only">{awards.map((a) => <li key={a}>{a}</li>)}</ul>
          {[0, 3].map((offset) => (
            <div className={offset ? "marquee rev" : "marquee"} key={offset} aria-hidden="true">
              <div className="track">
                {[...awards, ...awards].map((_, i) => (
                  <span key={i}>
                    {awards[(i + offset) % awards.length]}
                    <svg viewBox="0 0 20 20" width="22" height="22"><circle cx="10" cy="10" r="6" /></svg>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* EDUCATION + SKILLS */}
        <section className="block edu">
          <div className="edu-main" data-reveal>
            <h2>UCLA</h2>
            <p className="edu-line">B.S. in Mathematics of Computation, graduating June 2028. GPA 3.83.</p>
            <ul className="chips" aria-label="Relevant coursework">
              {coursework.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <dl className="skills" data-reveal>
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <h2 data-reveal><a href={`mailto:${EMAIL}`}>Say hello.</a></h2>
          <p data-reveal>I’m always up for talking about research, quant, or something you’re building.</p>
          <div className="contact-actions" data-reveal>
            <CopyEmail />
            <a href="https://www.linkedin.com/in/alexwang67/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
            <a href="https://github.com/AlexNicholasWang" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Alexander Wang</span>
        <span>Los Angeles and Delaware</span>
      </footer>
    </div>
  );
}
