import type { Translations } from "./pt"

export const fr: Translations = {
  nav: {
    home: "~/accueil",
    projects: "~/projets",
    experience: "~/experience",
    stack: "~/stack",
    contact: "~/contact",
    cv: "~/cv",
  },
  hero: {
    badge: "● passionné par l'architecture & le code",
    greeting: "Bonjour, je suis",
    name: "Lucas Pedro da Hora",
    title: "Développeur Full Stack",
    subtitle: "Spécialiste en React, Node.js & Rust",
    description:
      "Développeur avec {years} ans d'expérience dans la création de systèmes web haute performance. Axé sur une architecture évolutive, un code propre et l'intégration de l'IA.",
    cta_projects: "Voir les projets",
    cta_contact: "Me contacter",
    cta_cv: "Voir le CV",
    location: "São Paulo, SP",
    available: "Disponible",
    terminal: {
      line1: "$ whoami",
      line2: "> lucas-pedro-da-hora",
      line3: "$ cat competences.txt",
      line4: "> React · Node.js · Rust · TypeScript",
      line5: "> DDD · Clean Architecture · Microservices",
      line6: "$ cat localisation.txt",
      line7: "> São Paulo, SP · Hybride / Télétravail",
      line8: "$ status --check",
      line9: "> ● toujours en train de créer de nouvelles choses",
    },
  },
  about: {
    title: "À propos de moi",
    subtitle: "$ cat a_propos.md",
    pillars: {
      quality: {
        title: "Code de Qualité",
        description:
          "Adepte du Clean Code et de la Clean Architecture. J'applique les principes SOLID et les Design Patterns pour concevoir des logiciels évolutifs, testables et maintenables.",
      },
      performance: {
        title: "Performance & Impact",
        description:
          "Je recherche des optimisations qui génèrent une véritable valeur — comme la refonte d'un paquet central qui a réduit le temps de réponse de 70 %.",
      },
      leadership: {
        title: "Leadership Technique",
        description:
          "En tant que Tech Lead, j'ai développé des compétences pour guider les équipes et définir des normes de gouvernance, en reliant la technologie aux besoins métier.",
      },
    },
    formation: "Diplômé en Analyse et Développement de Systèmes de la FAM.",
    beyond: {
      title: "Au-delà du code",
      running: "Course à pied — 5 km et 10 km",
      coffee: "Café de spécialité",
      gaming: "Jeux indépendants",
    },
  },
  experience: {
    title: "Expérience",
    subtitle: "$ git log --oneline --carriere",
    present: "présent",
    level: {
      intern: "Stagiaire",
      junior: "Junior",
      mid: "Confirmé",
      senior: "Senior",
    },
    stack_label: "Stack :",
  },
  projects: {
    title: "Projets",
    subtitle: "$ ls -la ~/projets",
    view_all: "Voir tous les projets",
    view_github: "Voir sur GitHub",
    view_demo: "Voir la démo",
    status: {
      active: "actif",
      wip: "en développement",
      archived: "archivé",
    },
    source: {
      local: "local",
      github: "github",
    },
    no_projects: "Aucun projet trouvé.",
    featured_title: "Projets Phares",
  },
  stack: {
    title: "Stack",
    subtitle: "$ cat package.json | jq .dependencies",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      cloud: "Cloud & Infra",
      ai: "Intelligence Artificielle",
      architecture: "Architecture",
      tools: "Outils",
    },
  },
  contact: {
    title: "Contact",
    subtitle: "$ send --message",
    description:
      "Je suis toujours ouvert pour discuter de nouvelles technologies, d'architecture logicielle et de solutions basées sur l'IA. On en parle ?",
    email_label: "Email",
    linkedin_label: "LinkedIn",
    github_label: "GitHub",
    cta: "Envoyer un email",
    cta_cv: "Voir le CV",
    open_to: "Intéressé par",
    opportunities: [
      "Architecture logicielle",
      "Intégration de l'IA",
      "Consulting technique",
      "Open source",
    ],
  },
  cv: {
    title: "CV",
    subtitle: "$ cat cv.md",
    print: "Imprimer / Enregistrer en PDF",
    summary: {
      title: "Résumé Professionnel",
      text: "Développeur Full Stack avec {years} ans d'expérience dans la création de systèmes web haute performance. Spécialiste en React, Node.js, Nest.js et Rust, avec une solide expertise en architecture de microservices, DDD, Clean Architecture et intégration de l'IA. A travaillé en tant que Tech Lead, guidant les équipes et définissant les normes de gouvernance technique.",
    },
    education: {
      title: "Formation",
      degree: "Diplôme en Analyse et Développement de Systèmes",
      institution: "FAM — Centro Universitário das Américas",
      period: "2021 — 2023",
    },
    skills: {
      title: "Compétences Techniques",
    },
    languages: {
      title: "Langues",
      portuguese: "Portugais — Maternel",
      english: "Anglais — Intermédiaire (lu, écrit et parlé)",
    },
    experience: {
      title: "Expérience Professionnelle",
    },
  },
  footer: {
    built_with: "Développé avec",
    and: "et",
    source: "Code source sur GitHub",
  },
  theme: {
    label: "Thème",
    toggle: "Changer de thème",
  },
  language: {
    toggle: "PT",
  },
  common: {
    loading: "Chargement...",
    error: "Erreur de chargement",
    stars: "étoiles",
    forks: "forks",
    see_more: "Voir plus",
  },
}
