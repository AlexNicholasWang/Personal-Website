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
    title: "Software Developer",
    bio: "UCLA student building full-stack web applications and exploring AI-powered systems. Passionate about clean code, user experience, and creative projects.",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", icon: "linkedin" },
      { label: "Email", href: "mailto:alexwang770@g.ucla.edu", icon: "email" }
    ],
    scrollText: "scroll"
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
    label: "Work",
    title: "Featured Projects",
    items: [
      {
        title: "PetaLux",
        description: "A mechanical-blooming flower lamp that destroys darkness. Creative hardware-software hybrid exploring physical design and code.",
        tags: ["Swift", "Hardware", "IoT"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Cosmas",
        description: "AI Benefits Eligibility Agent that fights for your perks. Built with modern AI integration and intuitive UX.",
        tags: ["TypeScript", "AI", "React"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Dragon's Hoard",
        description: "Self-hosted file storage with encryption and versioning. Secure, scalable data management.",
        tags: ["Go", "Cloud Storage", "Security"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "The Oracle",
        description: "Minimal CLI for querying LLMs. Streams tokens, supports system prompts, makes AI accessible from terminal.",
        tags: ["Python", "CLI", "LLM"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      }
    ]
  },
  experience: {
    label: "History",
    title: "Experience",
    items: [
      {
        company: "Self-Employed",
        role: "Full Stack Developer",
        date: "2024 – Present",
        location: "Los Angeles, CA",
        description: "Building personal projects and contributing to open-source. Creating elegant solutions to complex problems."
      }
    ]
  },
  skillsSection: {
    label: "Expertise",
    title: "Skills",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Swift", "React", "Vite", "Tailwind CSS", "Next.js", "Node.js", "Express", "FastAPI", "PostgreSQL", "Firebase", "Git", "Docker", "AWS", "Vercel"]
  },
  education: {
    label: "Achievements",
    title: "Education & Awards",
    items: [
      {
        title: "BS Computer Science",
        organization: "University of California, Los Angeles (UCLA)",
        date: "Expected 2025",
        description: "Focus on full-stack development and AI systems"
      }
    ]
  },
  contact: {
    label: "Contact",
    subtitle: "Feel free to reach out. Always open to interesting conversations and opportunities.",
    links: [
      { label: "Email Me", href: "mailto:alexwang770@g.ucla.edu", icon: "email", primary: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", icon: "linkedin" },
      { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
    ],
    footer: "Alexander Wang · UCLA CS · Los Angeles, CA · 2026"
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

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #0f0f0f;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f0f0f;
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }

        body {
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.5px;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Syne', sans-serif;
          letter-spacing: -0.5px;
        }

        .name-italic {
          font-style: italic;
          color: #60a5fa;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }

        .glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.05);
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-10 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-blue-500/10' : 'bg-transparent'}`}
        style={{opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease-out 0.1s'}}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
          <div className="w-8"></div>
          <div className="flex gap-8 items-center text-sm">
            {PORTFOLIO_DATA.nav.links.map((link, idx) => (
              link.featured ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                  style={{opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-20px)', transition: `all 0.6s ease-out ${0.15 + idx * 0.1}s`}}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 uppercase tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                  style={{opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-20px)', transition: `all 0.6s ease-out ${0.15 + idx * 0.1}s`}}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 pt-20 relative">
        {/* Tag */}
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: loaded ? '0.2s' : '0s'}}>
          <div className="inline-block border border-blue-500/50 rounded-full px-4 py-2 text-xs uppercase tracking-widest text-blue-400 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            style={{opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.6s ease-out 0.2s'}}
          >
            {PORTFOLIO_DATA.hero.tag.toUpperCase()}
          </div>
        </div>

        {/* Profile Circle - Initials */}
        <div className="mb-12 animate-scale-in" style={{animationDelay: loaded ? '0.4s' : '0s'}}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-blue-500/50 bg-gradient-to-br from-blue-600/20 to-blue-900/20 flex items-center justify-center glow-blue hover-glow transform transition-all duration-300 hover:border-blue-400"
            style={{opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.6s ease-out 0.4s'}}
          >
            <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-blue-400 to-blue-200 bg-clip-text text-transparent">
              {PORTFOLIO_DATA.hero.initials}
            </span>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-center mb-4 leading-tight font-serif animate-fade-in-up"
          style={{animationDelay: loaded ? '0.5s' : '0s'}}
        >
          {PORTFOLIO_DATA.hero.firstName}{" "}
          <span className="name-italic animate-fade-in-up" style={{animationDelay: loaded ? '0.6s' : '0s'}}>
            {PORTFOLIO_DATA.hero.lastName}
          </span>
        </h1>

        {/* Title */}
        <p className="text-lg sm:text-xl text-blue-400 text-center mb-8 font-medium animate-fade-in-up"
          style={{animationDelay: loaded ? '0.7s' : '0s'}}
        >
          {PORTFOLIO_DATA.hero.title}
        </p>

        {/* Bio */}
        <p className="max-w-2xl text-center text-gray-300 text-sm sm:text-base leading-relaxed mb-12 animate-fade-in-up"
          style={{animationDelay: loaded ? '0.8s' : '0s'}}
        >
          {PORTFOLIO_DATA.hero.bio}
        </p>

        {/* Social Links */}
        <div className="flex gap-6 mb-24 animate-fade-in-up"
          style={{animationDelay: loaded ? '0.9s' : '0s'}}
        >
          {PORTFOLIO_DATA.hero.socialLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              title={link.label}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${0.95 + idx * 0.05}s`
              }}
            >
              <Icon name={link.icon} />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 text-gray-500 text-xs uppercase tracking-widest animate-pulse-slow"
          style={{opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease-out 1s'}}
        >
          {PORTFOLIO_DATA.hero.scrollText}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 sm:px-12 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold animate-slide-in-left">
              {PORTFOLIO_DATA.projects.label}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif gradient-text animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {PORTFOLIO_DATA.projects.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {PORTFOLIO_DATA.projects.items.map((project, idx) => (
              <div 
                key={project.title} 
                className="border border-gray-700/50 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm hover-glow transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{animationDelay: `${0.2 + idx * 0.1}s`}}
              >
                <h3 className="text-2xl font-bold text-white mb-3 font-serif gradient-text">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-3 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="flex gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-all duration-300 transform hover:translate-x-1"
                      >
                        <Icon name={link.icon} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 sm:px-12 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold animate-slide-in-left">
              {PORTFOLIO_DATA.experience.label}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif gradient-text animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Experience
            </h2>
          </div>

          <div className="space-y-12">
            {PORTFOLIO_DATA.experience.items.map((exp, idx) => (
              <div 
                key={idx} 
                className="border-l-2 border-blue-500/30 pl-8 hover:border-blue-400 transition-all duration-300 animate-fade-in-up hover:pl-10"
                style={{animationDelay: `${0.2 + idx * 0.1}s`}}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white font-serif gradient-text">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-gray-400 font-mono">
                    {exp.date}
                  </span>
                </div>
                <p className="text-blue-400 font-semibold mb-1 hover:text-blue-300 transition-colors">
                  {exp.company}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  {exp.location}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 sm:px-12 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold animate-slide-in-left">
              {PORTFOLIO_DATA.skillsSection.label}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif gradient-text animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {PORTFOLIO_DATA.skillsSection.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {PORTFOLIO_DATA.skillsSection.items.map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 bg-blue-500/10 text-blue-300 rounded border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm hover-glow"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Awards Section */}
      <section id="education" className="py-24 px-6 sm:px-12 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold animate-slide-in-left">
              {PORTFOLIO_DATA.education.label}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif gradient-text animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {PORTFOLIO_DATA.education.title}
            </h2>
          </div>

          <div className="space-y-8">
            {PORTFOLIO_DATA.education.items.map((item, idx) => (
              <div 
                key={idx}
                className="border border-gray-700/50 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm hover-glow animate-fade-in-up"
                style={{animationDelay: `${0.2 + idx * 0.1}s`}}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white font-serif gradient-text">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-400 font-mono">
                    {item.date}
                  </span>
                </div>
                <p className="text-blue-400 font-semibold mb-3">
                  {item.organization}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 sm:px-12 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold animate-slide-in-left">
              {PORTFOLIO_DATA.contact.label}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-serif gradient-text animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Get in Touch
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {PORTFOLIO_DATA.contact.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {PORTFOLIO_DATA.contact.links.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  link.primary
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
                    : "border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                }`}
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${0.35 + idx * 0.1}s`
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-6 sm:px-12 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 animate-fade-in" style={{animationDelay: loaded ? '1s' : '0s'}}>
          <p>{PORTFOLIO_DATA.contact.footer}</p>
        </div>
      </footer>
    </div>
  );
}