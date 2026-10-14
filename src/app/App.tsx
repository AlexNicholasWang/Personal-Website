import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import "./portfolio.css";

const experience = [
  { role: "Undergraduate Researcher", place: "UCLA Mathematics · Mathematical & Statistical Finance", period: "2026 — Present", detail: "Statistical modeling, market microstructure, and equity order flow." },
  { role: "Visiting Researcher", place: "University of Illinois Urbana-Champaign · SALT Lab", period: "2026 — Present", detail: "Studying information leakage and security in autonomous AI agents." },
  { role: "Quantitative Developer Intern", place: "Manispace Capital", period: "Summer 2026", detail: "Built infrastructure and quantitative tools for systematic trading research." },
  { role: "Researcher", place: "University of Delaware · Directed Reading Program", period: "Summer 2026", detail: "Explored random walks, expander graphs, and spectral graph theory." },
  { role: "Machine Learning Researcher", place: "BruinML Group", period: "2026", detail: "Investigated machine learning and emergent intelligence." },
  { role: "Software Engineer Intern", place: "Golden Keys Realty Group", period: "2026", detail: "Developed tenant-facing software and customer service tools." },
  { role: "Software Engineer Intern", place: "Speeder Solutions LLC", period: "2025", detail: "Worked on AI-powered photo workflows and production software." },
  { role: "Biomedical Research Intern", place: "Johns Hopkins University", period: "2023", detail: "Researched peptide development and biomedical applications." },
];

const projects = [
  { name: "LA Pokerbots", kind: "AI / Community", year: "2026", detail: "Founded a UCLA competition where students build autonomous agents to compete in poker.", url: "https://github.com/AlexNicholasWang/LAPokerbots" },
  { name: "Keyfolio", kind: "Full-stack platform", year: "2026", detail: "A streamlined property management platform for landlords and tenants.", url: "https://goldenkeyscapital.app/" },
  { name: "Cosmas", kind: "AI / Public benefits", year: "2026", detail: "An AI assistant that helps people navigate benefits eligibility.", url: "https://cosmas.cfd/" },
  { name: "InkWells", kind: "AI / Creative tools", year: "2026", detail: "An AI-powered photo editing experience.", url: "https://inkwell.pics/" },
  { name: "Euler Chess Engine", kind: "Algorithms / Game AI", year: "2026", detail: "A chess engine exploring strategy, search, and a mathematical twist.", url: "https://eulerchessengine.site/" },
  { name: "Tic-Tac-Toe Solver", kind: "Algorithms / Game theory", year: "2026", detail: "Explore optimal play in an interactive game solver.", url: "https://tictactoesolver.fun/" },
  { name: "TON-619", kind: "Physics / Simulation", year: "2026", detail: "A black hole simulation inspired by one of the universe's largest known black holes.", url: "https://ton619.cfd/" },
];

const research = [
  { title: "Security of Agentic AI", label: "UIUC · SALT Lab", description: "Understanding how AI agents can leak sensitive information and how to make them more robust." },
  { title: "Mathematical Finance", label: "UCLA · MSF Group", description: "Exploring statistical signals, order flow, and the mathematics underlying financial markets." },
  { title: "Random Walks & Expander Graphs", label: "University of Delaware · DRP", description: "Studying the connections between probability, graph structure, and spectral methods." },
];

const links = [
  { label: "GitHub", href: "https://github.com/AlexNicholasWang", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", Icon: Linkedin },
  { label: "Email", href: "mailto:alexwang770@ucla.edu", Icon: Mail },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const updateTime = () => setLocalTime(new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const nav = [{ text: "Work History", href: "#work" }, { text: "Projects", href: "#projects" }, { text: "Research", href: "#research" }, { text: "Contact", href: "#contact" }];
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>ALEXANDER WANG<span className="wordmark-dot">.</span></a>
        <nav className={menuOpen ? "site-nav open" : "site-nav"} aria-label="Main navigation">
          {nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.text}</a>)}
          <a href="mailto:alexwang770@ucla.edu" className="nav-resume">Let's talk <ArrowUpRight size={14}/></a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-topline"><span>PORTFOLIO / 2026</span><span>BASED IN LOS ANGELES, CA · {localTime || "PST"}</span></div>
          <div className="hero-main">
            <div className="hero-kicker"><span className="availability-dot"/> MATHEMATICS · SOFTWARE · RESEARCH</div>
            <h1>Alexander<br/><em>Wang.</em></h1>
            <div className="hero-bottom">
              <p>Hi, I'm Alexander. I study Mathematics of Computation at UCLA, and I love building things at the intersection of <strong>software, artificial intelligence, and mathematics.</strong></p>
              <a className="round-arrow" href="#about" aria-label="Scroll to introduction"><ArrowDownRight size={27}/></a>
            </div>
          </div>
          <div className="hero-index"><span>01 / INTRODUCTION</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="about" className="section-frame about-section fade-in">
          <div className="section-rail"><span>01 / ABOUT ME</span><span className="rail-line"/></div>
          <div className="about-content">
            <h2 className="statement">Curious by nature.<br/><span>Driven to build.</span></h2>
            <div className="about-grid">
              <p>I'm a UCLA undergraduate interested in machine learning, optimization, quantitative finance, and the systems that make ambitious ideas possible.</p>
              <div><p>My time is split between research, engineering projects, and bringing people together to build something new. I founded LA Pokerbots, a student-run competition exploring AI and game theory.</p><a className="text-link" href="mailto:alexwang770@ucla.edu">Get in touch <ArrowUpRight size={17}/></a></div>
            </div>
          </div>
        </section>

        <section id="work" className="section-frame content-section fade-in">
          <div className="section-rail"><span>02 / EXPERIENCE</span><span className="rail-line"/></div>
          <div className="section-content">
            <div className="section-title-row"><h2>Work <em>History.</em></h2><span>SELECTED EXPERIENCE</span></div>
            <div className="timeline">{experience.map((item, i) => <article className="timeline-row" key={item.place}>
              <div className="row-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="row-main"><h3>{item.role}</h3><p className="row-company">{item.place}</p><p className="row-detail">{item.detail}</p></div>
              <span className="row-period">{item.period}</span>
            </article>)}</div>
          </div>
        </section>

        <section id="projects" className="section-frame content-section fade-in">
          <div className="section-rail"><span>03 / SELECTED WORK</span><span className="rail-line"/></div>
          <div className="section-content">
            <div className="section-title-row"><h2>Featured <em>Projects.</em></h2><span>THINGS I'VE BUILT</span></div>
            <div className="projects-list">{projects.map((item, i) => <a className="project-row" href={item.url} key={item.name} target="_blank" rel="noopener noreferrer">
              <span className="row-number">{String(i + 1).padStart(2, "0")}</span>
              <span className="project-info"><span className="project-name">{item.name}</span><span className="project-description">{item.detail}</span></span>
              <span className="project-type">{item.kind}</span><span className="project-year">{item.year}</span><span className="project-arrow"><ArrowUpRight size={24}/></span>
            </a>)}</div>
            <a className="text-link all-projects" href="https://github.com/AlexNicholasWang" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={17}/></a>
          </div>
        </section>

        <section id="research" className="section-frame content-section research-section fade-in">
          <div className="section-rail"><span>04 / INQUIRY</span><span className="rail-line"/></div>
          <div className="section-content">
            <div className="section-title-row"><h2>Research <em>Interests.</em></h2><span>QUESTIONS WORTH ASKING</span></div>
            <div className="research-grid">{research.map((item, i) => <article className="research-card" key={item.title}><span className="research-count">0{i + 1} / RESEARCH</span><h3>{item.title}</h3><p>{item.description}</p><span className="research-affiliation">{item.label}</span></article>)}</div>
          </div>
        </section>

        <section className="section-frame education-strip fade-in"><span>EDUCATION</span><div><strong>University of California, Los Angeles</strong><p>B.S. Mathematics of Computation · Expected 2028</p></div><span>LOS ANGELES, CA</span></section>

        <section id="contact" className="contact-section section-frame">
          <div className="section-rail"><span>05 / CONTACT</span><span className="rail-line"/></div>
          <p className="contact-intro">HAVE SOMETHING IN MIND?</p>
          <a className="contact-headline" href="mailto:alexwang770@ucla.edu">Let's make<br/><em>it happen.</em><ArrowUpRight className="contact-arrow" strokeWidth={1} /></a>
          <div className="contact-bottom"><span>ALWAYS OPEN TO INTERESTING CONVERSATIONS.</span><a href="mailto:alexwang770@ucla.edu">alexwang770@ucla.edu <ArrowUpRight size={16}/></a></div>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} ALEXANDER WANG</span><span>MADE WITH CURIOSITY.</span><div>{links.map(({ label, href, Icon }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"><Icon size={18}/></a>)}</div><a className="back-top" href="#top">BACK TO TOP ↑</a></footer>
    </div>
  );
}
