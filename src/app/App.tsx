import { useState } from "react";

const PORTFOLIO_DATA = {
  hero: {
    name: "Alexander Wang",
    title: "Software Developer",
    bio: "UCLA student building full-stack web applications and exploring AI-powered systems. Passionate about clean code, user experience, and creative projects.",
    location: "Los Angeles, California",
    email: "alexwang770@g.ucla.edu",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/", icon: "linkedin" },
      { label: "Email", href: "mailto:alexwang770@g.ucla.edu", icon: "email" }
    ]
  },
  skills: {
    label: "Skills",
    title: "Technical Toolkit",
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
        description: "A mechanical-blooming flower lamp that destroys darkness. A creative hardware-software hybrid project exploring the intersection of physical design and code.",
        tags: ["Swift", "Hardware", "IoT"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Cosmas",
        description: "An AI Benefits Eligibility Agent that fights on your behalf to get you the perks you deserve. Built with modern AI integration and intuitive UX.",
        tags: ["TypeScript", "AI", "React"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "Dragon's Hoard",
        description: "Self-hosted file storage with encryption and versioning. Built atop S3-compatible backends for secure, scalable data management.",
        tags: ["Go", "Cloud Storage", "Security"],
        links: [
          { label: "GitHub", href: "https://github.com/AlexNicholasWang", icon: "github" }
        ]
      },
      {
        title: "The Oracle",
        description: "Minimal CLI for querying LLMs from your terminal. Streams tokens, supports system prompts, and makes AI accessible from the command line.",
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
        description: "Building personal projects and contributing to open-source. Focused on creating elegant solutions to complex problems."
      }
    ]
  },
  education: {
    label: "Background",
    title: "Education",
    degree: {
      school: "University of California, Los Angeles",
      field: "Computer Science",
      date: "Expected 2027"
    }
  },
  contact: {
    label: "Contact",
    title: "Get In Touch",
    subtitle: "Feel free to reach out. I'm always open to interesting conversations and opportunities.",
    links: [
      { label: "Email Me", href: "mailto:alexwang770@g.ucla.edu", primary: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/alexwang67/" },
      { label: "GitHub", href: "https://github.com/AlexNicholasWang" }
    ]
  }
};

// Icon component
function Icon({ name }: { name: string }) {
  const icons: { [key: string]: string } = {
    github: "⚙️",
    linkedin: "💼",
    email: "✉️",
    external: "↗️"
  };
  return <span>{icons[name] || "→"}</span>;
}

// Section heading
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
        {label}
      </p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
    </div>
  );
}

// Skill tag
function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded border border-gray-200 dark:border-gray-700">
      {label}
    </span>
  );
}

// Project card
function ProjectCard({
  title,
  description,
  tags,
  links,
}: {
  title: string;
  description: string;
  tags: string[];
  links: Array<{ label: string; href: string; icon: string }>;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <SkillTag key={tag} label={tag} />
        ))}
      </div>
      {links.length > 0 && (
        <div className="flex gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <Icon name={link.icon} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Experience card
function ExperienceCard({
  company,
  role,
  date,
  location,
  description,
}: {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
}) {
  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {role}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {date}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
        {company}
      </p>
      <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
        {location}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function App() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <style>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        @media (prefers-color-scheme: dark) {
          ::-webkit-scrollbar-track {
            background: #111827;
          }
          ::-webkit-scrollbar-thumb {
            background: #374151;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #4b5563;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            AW
          </a>
          <div className="flex gap-6 text-sm">
            <a
              href="#skills"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {PORTFOLIO_DATA.hero.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {PORTFOLIO_DATA.hero.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {PORTFOLIO_DATA.hero.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Icon name={link.icon} />
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            📍 {PORTFOLIO_DATA.hero.location}
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <SectionHeading
            label={PORTFOLIO_DATA.skills.label}
            title={PORTFOLIO_DATA.skills.title}
          />
          <div className="flex flex-wrap gap-3">
            {PORTFOLIO_DATA.skills.items.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <SectionHeading
            label={PORTFOLIO_DATA.projects.label}
            title={PORTFOLIO_DATA.projects.title}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {PORTFOLIO_DATA.projects.items.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <a
            href="https://github.com/AlexNicholasWang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            View all projects <Icon name="external" />
          </a>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20">
          <SectionHeading
            label={PORTFOLIO_DATA.experience.label}
            title={PORTFOLIO_DATA.experience.title}
          />
          <div>
            {PORTFOLIO_DATA.experience.items.map((exp, idx) => (
              <ExperienceCard key={idx} {...exp} />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-20">
          <SectionHeading
            label={PORTFOLIO_DATA.education.label}
            title={PORTFOLIO_DATA.education.title}
          />
          <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {PORTFOLIO_DATA.education.degree.field}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
              {PORTFOLIO_DATA.education.degree.school}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {PORTFOLIO_DATA.education.degree.date}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-12">
          <SectionHeading
            label={PORTFOLIO_DATA.contact.label}
            title={PORTFOLIO_DATA.contact.title}
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8 text-lg">
            {PORTFOLIO_DATA.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {PORTFOLIO_DATA.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded text-sm font-medium transition-all ${
                  link.primary
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                    : "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with React & TypeScript · No tracking · No ads
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Alexander Wang. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}