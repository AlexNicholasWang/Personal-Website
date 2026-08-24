import { useState, useEffect } from "react";

const PORTFOLIO_DATA = {
  nav: {
    logo: "AW",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Contact Me", href: "#contact", featured: true }
    ]
  },
  hero: {
    tag: "Software Developer",
    initials: "AW",
    firstName: "Alexander",
    lastName: "Wang",
    title: "UCLA Mathematics & Computer Science",
    bio: "2nd year undergraduate interested in AI & Quantitatve Finance",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", icon: "linkedin" },
      { label: "Email", href: "mailto:alexwang770@ucla.edu", icon: "email" }
    ],
  },
  skills: {
    label: "Toolkit",
    title: "Core Competencies",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Python",
      "Node.js",
      "Git",
      "Web Development",
      "Frontend Development",
      "UI/UX Design",
      "API Integration",
      "Database Design"
    ]
  },
  projects: {
    title: "Featured Projects",
    items: [
      {
        title: "PetaLux",
        description: "A mechanical-blooming flower lamp",
        tags: ["Swift", "Hardware", "Arduino"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Cosmas",
        description: "AI Benefits Eligibility Agent",
        tags: ["TypeScript", "AI", "React"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Ton-619",
        description: "Black Hole Simulator",
        tags: ["Python", "Physics", "Simulation"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "InkWells",
        description: "AI Photo Editing Tool",
        tags: ["Python", "AI", "FastAPI"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      }
    ]
  },
  experience: {
    title: "Work Experience",
    items: [
      {
        company: "Manispace Capital",
        role: "Quantitative Research Intern",
        date: "Jun 2026 – Sep 2026",
        location: "New York City, NY",
        description: "Futures Research & Backtesting"
      },
      {
        company: "University of Delaware",
        role: "Researcher: Directed Reading Program",
        date: "Jun 2026 – Aug 2026",
        location: "Newark, DE",
        description: "Random Walks (Advised by Prof. Sebastian Cioaba)"
      },
      {
        company: "BruinML Group",
        role: "Machine Learning Researcher",
        date: "Jan 2026 – Aug 2026",
        location: "Los Angeles, CA",
        description: "Ontology-LLM Verification & Emergent Intelligence"
      },
      {
        company: "Golden Keys Realty Group",
        role: "Software Engineer Intern",
        location: "Elkton, MD",
        date: "Jan 2026 - Apr 2026",
        description: "Tenant Dashboard & Customer Service."
      },
      {
        company: "Speeder Solutions LLC",
        role: "Software Engineer Intern",
        date: "Jun 2025 – Aug 2025",
        location: "New Castle, DE",
        description: "AI Photo Processing & Apparel Production"
      },
      {
        company: "Johns Hopkins University",
        role: "Biomedical Research Intern",
        date: "Jun 2023 – Aug 2023",
        location: "Baltimore, MD",
        description: "Peptides & Anti-cancer Drug Devlopment"
      },
    ]
  },
  skillsSection: {
    label: "Expertise",
    title: "Skills",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "Swift", "React", "Next.js", "SQL", "HTML/CSS", "Git", "Linux", "Data Structures & Algorithms", "Machine Learning", "FastAPI", "PostgreSQL"]
  },

  education: {
    title: "Education",
    items: [
      {
        title: "University of California, Los Angeles",
        date: "Expected 2028",
        organization: "B.S. in Mathematics & Computer Science",
        description: "GPA: 3.8/4.0",
      }
    ]
  },

  achievements: {
    title: "Achievements",
    items: [
      {
        title: "RIT Computing Award",
        organization: "Rochester Institute of Technology",
      },
      {
        title: "National Merit Scholar",
        organization: "National Merit Scholarship Corporation",
      },
      {
        title: "November 14 Award",
        organization: "Salesianum School",
      },
    ]
  },

  contact: {
    label: "Contact",
    subtitle: "Feel free to reach out. Always open to new opportunities.",
    links: [
      { label: "Email Me", href: "mailto:alexwang770@g.ucla.edu", icon: "email", primary: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", icon: "linkedin" },
      { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
    ],
    footer: "Alexander Wang · UCLA Math · UCLA Computer Science · Los Angeles, CA · 2026"
  }
};

function Icon({ name }: { name: string }) {
  const icons: { [key: string]: JSX.Element } = {
    github: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    email: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    external: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    )
  };
  return icons[name] || <span>→</span>;
}

const cardBase =
  "rounded-2xl border border-[var(--marketing-stroke)] bg-[var(--marketing-surface)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_-24px_rgba(35,33,28,0.75)] hover:border-[var(--marketing-stroke-strong)]";

const chipBase =
  "rounded-full border border-[var(--marketing-stroke)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--marketing-text-secondary)] transition-colors hover:border-[var(--marketing-accent)] hover:bg-[var(--marketing-accent-soft)] hover:text-[var(--marketing-accent)]";

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--marketing-accent)]">
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 flex flex-col gap-3 reveal">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display text-[36px] text-[var(--marketing-text-primary)] sm:text-[48px]">
        {title}
      </h2>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useReveal();

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--marketing-bg)] text-[var(--marketing-text-primary)]">
      <style>{`
        html { scroll-behavior: smooth; }
        * { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        .dot-grid {
          background-image: radial-gradient(rgba(15, 23, 42, 0.09) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%);
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { opacity: 0; animation: fade-up .7s ease-out forwards; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease-out, transform .7s ease-out; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .pulse-dot::before {
          content: ""; position: absolute; inset: 0; border-radius: 9999px;
          background: var(--marketing-accent); opacity: .5;
          animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Floating pill header */}
      <header
        className="fixed left-4 right-4 top-4 z-30"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity .6s ease-out .1s, transform .6s ease-out .1s",
        }}
      >
        <nav className="mx-auto grid h-12 max-w-[1100px] grid-cols-[1fr_auto_1fr] items-center gap-3 overflow-hidden rounded-2xl border border-[var(--marketing-stroke)] bg-white px-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:gap-6 sm:px-5">
          <a
            href="#"
            aria-label="Alexander Wang"
            className="display justify-self-start text-[20px] text-[var(--marketing-text-primary)]"
          >
            {PORTFOLIO_DATA.nav.logo}
            <span className="text-[var(--marketing-accent)]">.</span>
          </a>

          <div className="hidden items-center gap-8 justify-self-center md:flex">
            {PORTFOLIO_DATA.nav.links
              .filter((l) => !l.featured)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-[var(--marketing-text-muted)] transition-colors hover:text-[var(--marketing-text-primary)]"
                >
                  {link.label}
                </a>
              ))}
          </div>

          <div className="flex items-center gap-4 justify-self-end">
            {PORTFOLIO_DATA.nav.links
              .filter((l) => l.featured)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-full bg-[var(--marketing-accent)] px-4 text-[12px] font-semibold text-white shadow-[0_10px_24px_-14px_rgba(37,99,235,0.9)] transition-colors hover:bg-[var(--marketing-accent-hover)] active:scale-[0.98] sm:px-5 sm:text-[13px]"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 sm:px-12">
        <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

        {/* Status badge */}
        <div
          className="animate-fade-up mb-10 inline-flex items-center gap-2.5 rounded-full border border-[var(--marketing-stroke)] bg-white py-1.5 pl-2.5 pr-4 text-[12px] font-medium text-[var(--marketing-text-secondary)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          style={{ animationDelay: ".1s" }}
        >
          <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-[var(--marketing-accent)]" />
          {PORTFOLIO_DATA.hero.tag}
        </div>

        {/* Avatar */}
        <div className="animate-fade-up mb-10" style={{ animationDelay: ".2s" }}>
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.35)] ring-1 ring-[var(--marketing-stroke)] sm:h-36 sm:w-36">
            <img src="/logo.jpg" alt="Alexander Wang" className="h-full w-full object-cover" loading="eager" />
          </div>
        </div>

        <h1
          className="display animate-fade-up mb-6 text-center text-[56px] text-[var(--marketing-text-primary)] sm:text-[80px] md:text-[104px]"
          style={{ animationDelay: ".3s" }}
        >
          {PORTFOLIO_DATA.hero.firstName}{" "}
          <span className="serif-accent text-[var(--marketing-accent)]">{PORTFOLIO_DATA.hero.lastName}</span>
        </h1>

        <p
          className="animate-fade-up mb-4 text-center text-[17px] font-medium text-[var(--marketing-text-primary)] sm:text-[20px]"
          style={{ animationDelay: ".4s" }}
        >
          {PORTFOLIO_DATA.hero.title}
        </p>

        <p
          className="animate-fade-up mb-10 max-w-xl text-center text-[15px] leading-relaxed text-[var(--marketing-text-muted)] sm:text-[17px]"
          style={{ animationDelay: ".5s" }}
        >
          {PORTFOLIO_DATA.hero.bio}
        </p>

        <div className="animate-fade-up flex items-center gap-3" style={{ animationDelay: ".6s" }}>
          {PORTFOLIO_DATA.hero.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--marketing-stroke)] bg-white text-[var(--marketing-text-secondary)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--marketing-accent)] hover:text-[var(--marketing-accent)] hover:shadow-[0_10px_24px_-14px_rgba(37,99,235,0.9)]"
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <Icon name={link.icon} />
              </span>
            </a>
          ))}
        </div>

        <div
          className="absolute bottom-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--marketing-text-muted)]"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity .8s ease-out 1s" }}
        >
          scroll
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Work" title={PORTFOLIO_DATA.projects.title} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PORTFOLIO_DATA.projects.items.map((project, idx) => (
              <div
                key={project.title}
                className={`${cardBase} reveal p-7`}
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="display text-[26px] text-[var(--marketing-text-primary)]">{project.title}</h3>
                  <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--marketing-text-muted)]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="mb-5 text-[14px] leading-relaxed text-[var(--marketing-text-muted)]">
                  {project.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={chipBase}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--marketing-accent)] transition-colors hover:text-[var(--marketing-accent-hover)]"
                      >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                          <Icon name={link.icon} />
                        </span>
                        {link.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Background" title={PORTFOLIO_DATA.experience.title} />
          <div className="overflow-hidden rounded-2xl border border-[var(--marketing-stroke)] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            {PORTFOLIO_DATA.experience.items.map((exp, idx) => (
              <div
                key={idx}
                className="reveal grid grid-cols-1 gap-2 border-b border-[var(--marketing-stroke)] px-6 py-6 transition-colors last:border-b-0 hover:bg-[var(--marketing-surface-raised)] sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-8"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="font-mono text-[12px] leading-6 text-[var(--marketing-text-muted)]">{exp.date}</div>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--marketing-text-primary)]">
                      {exp.role}
                    </h3>
                    <span className="text-[13px] text-[var(--marketing-text-muted)]">{exp.location}</span>
                  </div>
                  <p className="mt-1 text-[14px] font-medium text-[var(--marketing-accent)]">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--marketing-text-muted)]">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow={PORTFOLIO_DATA.skillsSection.label} title={PORTFOLIO_DATA.skillsSection.title} />
          <div className="reveal flex flex-wrap gap-2.5">
            {PORTFOLIO_DATA.skillsSection.items.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--marketing-stroke)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--marketing-text-secondary)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--marketing-accent)] hover:bg-[var(--marketing-accent-soft)] hover:text-[var(--marketing-accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Achievements */}
      <section id="education" className="px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="School" title={PORTFOLIO_DATA.education.title} />
            {PORTFOLIO_DATA.education.items.map((item, idx) => (
              <div key={idx} className={`${cardBase} reveal p-7`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="display text-[24px] text-[var(--marketing-text-primary)]">{item.title}</h3>
                  <span className="font-mono text-[12px] text-[var(--marketing-text-muted)]">{item.date}</span>
                </div>
                <p className="mt-2 text-[14px] font-medium text-[var(--marketing-accent)]">{item.organization}</p>
                {item.description && (
                  <p className="mt-2 text-[14px] text-[var(--marketing-text-muted)]">{item.description}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <SectionHeading eyebrow="Recognition" title={PORTFOLIO_DATA.achievements.title} />
            <div className="flex flex-col gap-4">
              {PORTFOLIO_DATA.achievements.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`${cardBase} reveal flex items-center gap-4 p-5`}
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--marketing-accent-soft)] font-mono text-[12px] font-medium text-[var(--marketing-accent)]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[var(--marketing-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[var(--marketing-text-muted)]">{item.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24 sm:px-12">
        <div className="reveal mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-[var(--marketing-stroke)] bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-12 sm:py-20">
          <Eyebrow>{PORTFOLIO_DATA.contact.label}</Eyebrow>
          <h2 className="display mt-4 text-[40px] text-[var(--marketing-text-primary)] sm:text-[56px]">
            Get in <span className="serif-accent text-[var(--marketing-accent)]">touch</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[var(--marketing-text-muted)]">
            {PORTFOLIO_DATA.contact.subtitle}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {PORTFOLIO_DATA.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.primary
                    ? "inline-flex h-11 items-center justify-center rounded-full bg-[var(--marketing-accent)] px-6 text-[14px] font-semibold text-white shadow-[0_18px_36px_-20px_rgba(37,99,235,0.9)] transition-all hover:bg-[var(--marketing-accent-hover)] active:scale-[0.98]"
                    : "inline-flex h-11 items-center justify-center rounded-full border border-[var(--marketing-stroke)] bg-white px-6 text-[14px] font-semibold text-[var(--marketing-text-primary)] transition-all hover:border-[var(--marketing-stroke-strong)] hover:bg-[var(--marketing-surface-raised)] active:scale-[0.98]"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 pt-4 sm:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 border-t border-[var(--marketing-stroke)] pt-8 text-[13px] text-[var(--marketing-text-muted)] sm:flex-row">
          <span className="display text-[18px] text-[var(--marketing-text-primary)]">
            {PORTFOLIO_DATA.nav.logo}
            <span className="text-[var(--marketing-accent)]">.</span>
          </span>
          <p>{PORTFOLIO_DATA.contact.footer}</p>
        </div>
      </footer>
    </div>
  );
}