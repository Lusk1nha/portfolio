import type { Translations } from "./pt"

export const es: Translations = {
  nav: {
    home: "~/inicio",
    projects: "~/proyectos",
    experience: "~/experiencia",
    stack: "~/stack",
    contact: "~/contacto",
    cv: "~/cv",
  },
  hero: {
    badge: "● apasionado por la arquitectura y el código",
    greeting: "Hola, soy",
    name: "Lucas Pedro da Hora",
    title: "Desarrollador Full Stack",
    subtitle: "Especialista en React, Node.js y Rust",
    description:
      "Desarrollador con {years} años de experiencia construyendo sistemas web de alto rendimiento. Enfocado en arquitectura escalable, código limpio e integración de IA.",
    cta_projects: "Ver proyectos",
    cta_contact: "Contactar",
    cta_cv: "Ver currículum",
    location: "São Paulo, SP",
    available: "Disponible",
    terminal: {
      line1: "$ whoami",
      line2: "> lucas-pedro-da-hora",
      line3: "$ cat habilidades.txt",
      line4: "> React · Node.js · Rust · TypeScript",
      line5: "> DDD · Clean Architecture · Microservicios",
      line6: "$ cat ubicacion.txt",
      line7: "> São Paulo, SP · Híbrido / Remoto",
      line8: "$ status --check",
      line9: "> ● siempre construyendo algo nuevo",
    },
  },
  about: {
    title: "Sobre mí",
    subtitle: "$ cat sobre_mi.md",
    pillars: {
      quality: {
        title: "Código de Calidad",
        description:
          "Entusiasta del Clean Code y Clean Architecture. Aplico principios SOLID y Patrones de Diseño para crear software escalable, testable y mantenible.",
      },
      performance: {
        title: "Rendimiento e Impacto",
        description:
          "Busco optimizaciones que generen valor real — como la refactorización de un paquete central que redujo el tiempo de respuesta en un 70%.",
      },
      leadership: {
        title: "Liderazgo Técnico",
        description:
          "Como Tech Lead, desarrollé habilidades para guiar equipos y definir estándares de gobernanza, conectando la tecnología con las necesidades del negocio.",
      },
    },
    formation: "Graduado en Análisis y Desarrollo de Sistemas por la FAM.",
    beyond: {
      title: "Más allá del código",
      running: "Running — 5km y 10km",
      coffee: "Café de especialidad",
      gaming: "Juegos indie",
    },
  },
  experience: {
    title: "Experiencia",
    subtitle: "$ git log --oneline --carrera",
    present: "actualidad",
    level: {
      intern: "Pasante",
      junior: "Junior",
      mid: "Semi-Senior",
      senior: "Senior",
    },
    stack_label: "Stack:",
  },
  projects: {
    title: "Proyectos",
    subtitle: "$ ls -la ~/proyectos",
    view_all: "Ver todos los proyectos",
    view_github: "Ver en GitHub",
    view_demo: "Ver demo",
    status: {
      active: "activo",
      wip: "en desarrollo",
      archived: "archivado",
    },
    source: {
      local: "local",
      github: "github",
    },
    no_projects: "No se encontraron proyectos.",
    featured_title: "Proyectos Destacados",
  },
  stack: {
    title: "Stack",
    subtitle: "$ cat package.json | jq .dependencies",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      cloud: "Cloud e Infraestructura",
      ai: "Inteligencia Artificial",
      architecture: "Arquitectura",
      tools: "Herramientas",
    },
  },
  contact: {
    title: "Contacto",
    subtitle: "$ send --message",
    description:
      "Siempre estoy abierto a discutir sobre nuevas tecnologías, arquitectura de software y soluciones basadas en IA. ¿Hablamos?",
    email_label: "Email",
    linkedin_label: "LinkedIn",
    github_label: "GitHub",
    cta: "Enviar email",
    cta_cv: "Ver currículum",
    open_to: "Interesado en",
    opportunities: [
      "Arquitectura de software",
      "Integración de IA",
      "Consultoría técnica",
      "Open source",
    ],
    form: {
      name_label: "Nombre",
      name_placeholder: "Tu nombre",
      email_label: "Email",
      email_placeholder: "tu@email.com",
      message_label: "Mensaje",
      message_placeholder: "Hola Lucas, me gustaría hablar sobre...",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      success_title: "¡Mensaje enviado!",
      success_message: "Gracias por contactarme. Te responderé pronto.",
      error_title: "Error al enviar",
      error_message: "Algo salió mal. Inténtalo de nuevo o usa el email directamente.",
      retry: "Intentar de nuevo",
    },
  },
  cv: {
    title: "Currículum",
    subtitle: "$ cat cv.md",
    print: "Imprimir / Guardar como PDF",
    summary: {
      title: "Resumen Profesional",
      text: "Desarrollador Full Stack con {years} años de experiencia construyendo sistemas web de alto rendimiento. Especialista en React, Node.js, Nest.js y Rust, con sólida experiencia en arquitectura de microservicios, DDD, Clean Architecture e integración de IA. Trabajé como Tech Lead, guiando equipos y definiendo estándares de gobernanza técnica.",
    },
    education: {
      title: "Educación",
      degree: "Grado en Análisis y Desarrollo de Sistemas",
      institution: "FAM — Centro Universitário das Américas",
      period: "2021 — 2023",
    },
    skills: {
      title: "Habilidades Técnicas",
    },
    languages: {
      title: "Idiomas",
      portuguese: "Portugués — Nativo",
      english: "Inglés — Intermedio (lectura, escritura y conversación)",
    },
    experience: {
      title: "Experiencia Profesional",
    },
  },
  footer: {
    built_with: "Desarrollado con",
    and: "y",
    source: "Código fuente en GitHub",
  },
  theme: {
    label: "Tema",
    toggle: "Cambiar tema",
  },
  language: {
    toggle: "PT",
  },
  common: {
    loading: "Cargando...",
    error: "Error al cargar",
    stars: "estrellas",
    forks: "forks",
    see_more: "Ver más",
  },
}