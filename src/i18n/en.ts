import type { Translations } from "./pt"

export const en: Translations = {
  nav: {
    home: "~/home",
    projects: "~/projects",
    experience: "~/experience",
    stack: "~/stack",
    contact: "~/contact",
    cv: "~/resume",
  },
  hero: {
    badge: "● passionate about architecture & code",
    greeting: "Hey, I am",
    name: "Lucas Pedro da Hora",
    title: "Full Stack Developer",
    subtitle: "Specialist in React, Node.js & Rust",
    description:
      "Developer with {years} of experience building high-performance web systems. Focused on scalable architecture, clean code, and AI integration.",
    cta_projects: "View projects",
    cta_contact: "Get in touch",
    cta_cv: "View resume",
    location: "São Paulo, SP",
    available: "Available",
    terminal: {
      line1: "$ whoami",
      line2: "> lucas-pedro-da-hora",
      line3: "$ cat skills.txt",
      line4: "> React · Node.js · Rust · TypeScript",
      line5: "> DDD · Clean Architecture · Microservices",
      line6: "$ cat location.txt",
      line7: "> São Paulo, SP · Hybrid / Remote",
      line8: "$ status --check",
      line9: "> ● always building something new",
    },
  },
  about: {
    title: "About me",
    subtitle: "$ cat about.md",
    pillars: {
      quality: {
        title: "Quality Code",
        description:
          "Clean Code and Clean Architecture enthusiast. I apply SOLID and Design Patterns for scalable, testable, and maintainable software.",
      },
      performance: {
        title: "Performance & Impact",
        description:
          "I seek optimizations that generate real value — like refactoring a core package that reduced response time by 70%.",
      },
      leadership: {
        title: "Technical Leadership",
        description:
          "As a Tech Lead, I developed skills to guide teams and define governance standards, connecting technology to business needs.",
      },
    },
    formation: "Graduated in Systems Analysis and Development from FAM.",
    beyond: {
      title: "Beyond code",
      running: "Running — 5km and 10km",
      coffee: "Specialty coffee",
      gaming: "Indie games",
    },
  },
  experience: {
    title: "Experience",
    subtitle: "$ git log --oneline --career",
    present: "present",
    level: {
      intern: "Intern",
      junior: "Junior",
      mid: "Mid-Level",
      senior: "Senior",
    },
    stack_label: "Stack:",
  },
  projects: {
    title: "Projects",
    subtitle: "$ ls -la ~/projects",
    view_all: "View all projects",
    view_github: "View on GitHub",
    view_demo: "View demo",
    status: {
      active: "active",
      wip: "in development",
      archived: "archived",
    },
    source: {
      local: "local",
      github: "github",
    },
    no_projects: "No projects found.",
    featured_title: "Featured Projects",
  },
  stack: {
    title: "Stack",
    subtitle: "$ cat package.json | jq .dependencies",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      cloud: "Cloud & Infra",
      ai: "Artificial Intelligence",
      architecture: "Architecture",
      tools: "Tools",
    },
  },
  contact: {
    title: "Contact",
    subtitle: "$ send --message",
    description:
      "I'm always open to discussing new technologies, software architecture, and AI-based solutions. Let's talk?",
    email_label: "Email",
    linkedin_label: "LinkedIn",
    github_label: "GitHub",
    cta: "Send email",
    cta_cv: "View resume",
    open_to: "Interested in",
    opportunities: [
      "Software architecture",
      "AI integration",
      "Technical consulting",
      "Open source",
    ],
  },
  cv: {
    title: 'Resume',
    subtitle: '$ cat resume.md',
    print: 'Print / Save as PDF',
    summary: {
      title: 'Professional Summary',
      text: 'Full Stack Developer with {years} of experience building high-performance web systems. Specialist in React, Node.js, Nest.js, and Rust, with solid expertise in microservices architecture, DDD, Clean Architecture, and AI integration. Worked as Tech Lead, guiding teams and defining technical governance standards.',
    },
    education: {
      title: 'Education',
      degree: 'Associate Degree in Systems Analysis and Development',
      institution: 'FAM — Centro Universitário das Américas',
      period: '2020 — 2022',
    },
    skills: {
      title: 'Technical Skills',
    },
    languages: {
      title: 'Languages',
      portuguese: 'Portuguese — Native',
      english: 'English — Intermediate (reading, writing and conversation)',
    },
    experience: {
      title: 'Professional Experience',
    },
  },
  footer: {
    built_with: "Built with",
    and: "and",
    source: "Source code on GitHub",
  },
  theme: {
    label: "Theme",
    toggle: "Switch theme",
  },
  language: {
    toggle: "PT",
  },
  common: {
    loading: "Loading...",
    error: "Error loading",
    stars: "stars",
    forks: "forks",
    see_more: "See more",
  },
}
