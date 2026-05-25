import type { Experience } from "@/domain/entities/Experience"

export const EXPERIENCES: Experience[] = [
  {
    id: "hub-brasil-senior",
    company: "HUB Brasil",
    companyUrl: "https://www.hubbrasil.com.br",
    role: {
      pt: "Desenvolvedor Full Stack Pleno",
      en: "Mid-Level Full Stack Developer",
    },
    level: "mid",
    startDate: "2025-08",
    endDate: null,
    location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
    modality: { pt: "Híbrido", en: "Hybrid" },
    description: {
      pt: "Atuação estratégica no desenvolvimento e evolução contínua da plataforma Workflow, sendo responsável desde a definição da arquitetura até a implementação e sustentação do ecossistema Frontend (React) e Backend (Nest.js).",
      en: "Strategic role in the development and continuous evolution of the Workflow platform, responsible from architecture definition to implementation and sustainment of the Frontend (React) and Backend (Nest.js) ecosystem.",
    },
    highlights: {
      pt: [
        "Implementação de microsserviços com Nest.js e FastAPI aplicando DDD para sistemas desacoplados",
        "Estruturação de fluxos assíncronos com RabbitMQ e otimização de queries em PostgreSQL",
        "Desenvolvimento de interfaces complexas com React e TypeScript focando em componentização",
        "Desenvolvimento de sistemas para gestão de custos e automação com orquestradores de IA",
        "Criação integral de sistemas de reserva de tickets e projetos de padronização técnica",
      ],
      en: [
        "Microservices implementation with Nest.js and FastAPI applying DDD for decoupled systems",
        "Asynchronous flow structuring with RabbitMQ and PostgreSQL query optimization",
        "Complex interface development with React and TypeScript focusing on componentization",
        "Development of cost management systems and automation with AI orchestrators",
        "Full creation of ticket booking systems and technical standardization projects",
      ],
    },
    stack: [
      "Nest.js",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "RabbitMQ",
      "DDD",
    ],
  },
  {
    id: "class-solutions-mid",
    company: "Class Solutions",
    role: {
      pt: "Desenvolvedor Web Pleno",
      en: "Mid-Level Web Developer",
    },
    level: "mid",
    startDate: "2024-06",
    endDate: "2025-01",
    location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
    modality: { pt: "Híbrido", en: "Hybrid" },
    description: {
      pt: "Desenvolvimento de soluções empresariais de alta complexidade com foco no ecossistema SharePoint Framework (SPFx), atendendo clientes de grande porte nos setores de Logística, Agronegócio, Advocacia e Cibersegurança.",
      en: "Development of high-complexity enterprise solutions focused on the SharePoint Framework (SPFx) ecosystem, serving large clients in Logistics, Agribusiness, Legal, and Cybersecurity sectors.",
    },
    highlights: {
      pt: [
        "Tech Lead na frente de Power Automate, orientando o time e definindo padrões de governança",
        "Foco estratégico na redução de custos via criação e otimização de workflows escaláveis",
        "Criação de aplicação integrada à API do Power Platform para análise e monitoramento em tempo real",
        "Colaboração em chatbots e aplicativos com Azure OpenAI para otimizar produtividade",
      ],
      en: [
        "Tech Lead on Power Automate front, guiding the team and defining governance standards",
        "Strategic focus on cost reduction through creation and optimization of scalable workflows",
        "Created application integrated with Power Platform API for real-time analysis and monitoring",
        "Collaborated on chatbots and apps using Azure OpenAI to optimize productivity",
      ],
    },
    stack: [
      "React.js",
      "Node.js",
      "Python",
      "Azure OpenAI",
      "SPFx",
      "Power Platform",
      "Azure DevOps",
    ],
  },
  {
    id: "class-solutions-junior",
    company: "Class Solutions",
    role: {
      pt: "Desenvolvedor Web Júnior",
      en: "Junior Web Developer",
    },
    level: "junior",
    startDate: "2023-01",
    endDate: "2024-06",
    location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
    modality: { pt: "Híbrido", en: "Hybrid" },
    description: {
      pt: "Atuação focada no desenvolvimento de soluções corporativas dinâmicas e escaláveis dentro do ecossistema SharePoint Framework (SPFx), com forte ênfase em performance e experiência do usuário.",
      en: "Focused on developing dynamic and scalable corporate solutions within the SharePoint Framework (SPFx) ecosystem, with strong emphasis on performance and user experience.",
    },
    highlights: {
      pt: [
        "Refatoração de pacote core que reduziu o tempo de resposta em aproximadamente 70%",
        "Construção e manutenção de SPAs complexas com React.js e TypeScript",
        "Colaboração em projetos com Azure OpenAI e Azure Cognitive Search para automação de processos",
        "Entrega de soluções para Logística, Agronegócio, Advocacia e Cibersegurança",
      ],
      en: [
        "Core package refactoring that reduced response time by approximately 70%",
        "Building and maintaining complex SPAs with React.js and TypeScript",
        "Collaboration on projects with Azure OpenAI and Azure Cognitive Search for process automation",
        "Delivery of solutions for Logistics, Agribusiness, Legal, and Cybersecurity sectors",
      ],
    },
    stack: [
      "React.js",
      "SPFx",
      "TypeScript",
      "Azure OpenAI",
      "Azure Cognitive Search",
    ],
  },
  {
    id: "class-solutions-intern",
    company: "Class Solutions",
    role: {
      pt: "Desenvolvedor Web (Estágio)",
      en: "Web Developer (Intern)",
    },
    level: "intern",
    startDate: "2021-09",
    endDate: "2023-01",
    location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
    modality: { pt: "Presencial", en: "On-site" },
    description: {
      pt: "Suporte ao desenvolvimento de soluções corporativas e componentes customizados no ecossistema Microsoft 365 e interfaces modernas em React.js.",
      en: "Support in developing corporate solutions and custom components in the Microsoft 365 ecosystem and modern React.js interfaces.",
    },
    highlights: {
      pt: [
        "Criação de componentes de interface com SPFx e React.js garantindo responsividade",
        "Consumo e integração de APIs RESTful com Microsoft Graph e SharePoint API",
        "Configuração de endpoints e manutenção preventiva de serviços integrados",
        "Estudo e aplicação de Clean Code, Clean Architecture e Refactoring",
      ],
      en: [
        "Interface component creation with SPFx and React.js ensuring responsiveness",
        "Consumption and integration of RESTful APIs with Microsoft Graph and SharePoint API",
        "Endpoint configuration and preventive maintenance of integrated services",
        "Study and application of Clean Code, Clean Architecture, and Refactoring",
      ],
    },
    stack: [
      "React.js",
      "SPFx",
      "Microsoft Graph API",
      "JavaScript",
      "RESTful Services",
    ],
  },
]
