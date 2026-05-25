export interface Translations {
  nav: {
    home: string
    projects: string
    experience: string
    stack: string
    contact: string
    cv: string
  }
  hero: {
    badge: string
    greeting: string
    name: string
    title: string
    subtitle: string
    description: string
    cta_projects: string
    cta_contact: string
    cta_cv: string
    location: string
    available: string
    terminal: {
      line1: string
      line2: string
      line3: string
      line4: string
      line5: string
      line6: string
      line7: string
      line8: string
      line9: string
    }
  }
  about: {
    title: string
    subtitle: string
    pillars: {
      quality: { title: string; description: string }
      performance: { title: string; description: string }
      leadership: { title: string; description: string }
    }
    formation: string
    beyond: {
      title: string
      running: string
      coffee: string
      gaming: string
    }
  }
  experience: {
    title: string
    subtitle: string
    present: string
    level: {
      intern: string
      junior: string
      mid: string
      senior: string
    }
    stack_label: string
  }
  projects: {
    title: string
    subtitle: string
    view_all: string
    view_github: string
    view_demo: string
    status: {
      active: string
      wip: string
      archived: string
    }
    source: {
      local: string
      github: string
    }
    no_projects: string
    featured_title: string
  }
  stack: {
    title: string
    subtitle: string
    groups: {
      frontend: string
      backend: string
      cloud: string
      ai: string
      architecture: string
      tools: string
    }
  }
  contact: {
    title: string
    subtitle: string
    description: string
    email_label: string
    linkedin_label: string
    github_label: string
    cta: string
    cta_cv: string
    open_to: string
    opportunities: string[]
  }
  cv: {
    title: string
    subtitle: string
    print: string
    summary: {
      title: string
      text: string
    }
    education: {
      title: string
      degree: string
      institution: string
      period: string
    }
    skills: {
      title: string
    }
    languages: {
      title: string
      portuguese: string
      english: string
    }
    experience: {
      title: string
    }
  }
  footer: {
    built_with: string
    and: string
    source: string
  }
  theme: {
    label: string
    toggle: string
  }
  language: {
    toggle: string
  }
  common: {
    loading: string
    error: string
    stars: string
    forks: string
    see_more: string
  }
}

export const pt: Translations = {
  nav: {
    home: "~/inicio",
    projects: "~/projetos",
    experience: "~/experiencia",
    stack: "~/stack",
    contact: "~/contato",
    cv: "~/curriculo",
  },
  hero: {
    badge: "● disponível para projetos",
    greeting: "Olá, eu sou",
    name: "Lucas Pedro da Hora",
    title: "Full Stack Developer",
    subtitle: "Especialista em React, Node.js & Rust",
    description:
      "Desenvolvedor com {years} de experiência na criação de sistemas web de alta performance. Foco em arquitetura escalável, código limpo e integração de IA.",
    cta_projects: "Ver projetos",
    cta_contact: "Entrar em contato",
    cta_cv: "Baixar CV",
    location: "São Paulo, SP",
    available: "Disponível",
    terminal: {
      line1: "$ whoami",
      line2: "> lucas-pedro-da-hora",
      line3: "$ cat skills.txt",
      line4: "> React · Node.js · Rust · TypeScript",
      line5: "> DDD · Clean Architecture · Microsserviços",
      line6: "$ cat location.txt",
      line7: "> São Paulo, SP · Híbrido / Remoto",
      line8: "$ status --check",
      line9: "> ● disponível para novos projetos",
    },
  },
  about: {
    title: "Sobre mim",
    subtitle: "$ cat about.md",
    pillars: {
      quality: {
        title: "Código de Qualidade",
        description:
          "Entusiasta de Clean Code e Clean Architecture. Aplico SOLID e Design Patterns para software escalável, testável e de fácil manutenção.",
      },
      performance: {
        title: "Performance e Impacto",
        description:
          "Busco otimizações que geram valor real — como a refatoração de um core package que reduziu o tempo de resposta em 70%.",
      },
      leadership: {
        title: "Liderança Técnica",
        description:
          "Como Tech Lead, desenvolvi habilidade de orientar times e definir padrões de governança, conectando tecnologia às necessidades do negócio.",
      },
    },
    formation: "Graduado em Análise e Desenvolvimento de Sistemas pela FAM.",
    beyond: {
      title: "Além do código",
      running: "Corrida — 5km e 10km",
      coffee: "Café especial",
      gaming: "Jogos indie",
    },
  },
  experience: {
    title: "Experiência",
    subtitle: "$ git log --oneline --career",
    present: "o momento",
    level: {
      intern: "Estágio",
      junior: "Júnior",
      mid: "Pleno",
      senior: "Sênior",
    },
    stack_label: "Stack:",
  },
  projects: {
    title: "Projetos",
    subtitle: "$ ls -la ~/projects",
    view_all: "Ver todos os projetos",
    view_github: "Ver no GitHub",
    view_demo: "Ver demo",
    status: {
      active: "ativo",
      wip: "em desenvolvimento",
      archived: "arquivado",
    },
    source: {
      local: "local",
      github: "github",
    },
    no_projects: "Nenhum projeto encontrado.",
    featured_title: "Projetos em Destaque",
  },
  stack: {
    title: "Stack",
    subtitle: "$ cat package.json | jq .dependencies",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      cloud: "Cloud & Infra",
      ai: "Inteligência Artificial",
      architecture: "Arquitetura",
      tools: "Ferramentas",
    },
  },
  contact: {
    title: "Contato",
    subtitle: "$ send --message",
    description:
      "Estou sempre aberto a discutir novas tecnologias, arquitetura de software e soluções baseadas em IA. Vamos conversar?",
    email_label: "Email",
    linkedin_label: "LinkedIn",
    github_label: "GitHub",
    cta: "Enviar email",
    cta_cv: "Baixar CV",
    open_to: "Aberto para",
    opportunities: [
      "Projetos freelance",
      "Posições CLT/PJ",
      "Consultorias técnicas",
      "Open source",
    ],
  },
  cv: {
    title: 'Currículo',
    subtitle: '$ cat curriculo.md',
    print: 'Imprimir / Salvar PDF',
    summary: {
      title: 'Resumo Profissional',
      text: 'Desenvolvedor Full Stack com {years} de experiência na criação de sistemas web de alta performance. Especialista em React, Node.js, Nest.js e Rust, com sólida experiência em arquitetura de microsserviços, DDD, Clean Architecture e integração de IA. Atuei como Tech Lead, orientando times e definindo padrões de governança técnica.',
    },
    education: {
      title: 'Formação',
      degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'FAM — Centro Universitário das Américas',
      period: '2020 — 2022',
    },
    skills: {
      title: 'Habilidades Técnicas',
    },
    languages: {
      title: 'Idiomas',
      portuguese: 'Português — Nativo',
      english: 'Inglês — Intermediário (leitura, escrita e conversação)',
    },
    experience: {
      title: 'Experiência Profissional',
    },
  },
  footer: {
    built_with: "Feito com",
    and: "e",
    source: "Código fonte no GitHub",
  },
  theme: {
    label: "Tema",
    toggle: "Trocar tema",
  },
  language: {
    toggle: "EN",
  },
  common: {
    loading: "Carregando...",
    error: "Erro ao carregar",
    stars: "estrelas",
    forks: "forks",
    see_more: "Ver mais",
  },
}
