import type { Client } from "@/domain/entities/Client"

export const CLIENTS: Client[] = [
  {
    id: "vedacit",
    name: "Vedacit",
    project: {
      pt: "Plataforma de e-learning",
      en: "E-learning platform",
    },
  },
  {
    id: "nsk",
    name: "NSK",
    project: {
      pt: "Sistema de gerenciamento de tickets de suporte",
      en: "Support ticket management system",
    },
  },
  {
    id: "maxion-wheels",
    name: "Maxion Wheels",
    project: {
      pt: "Sistema de tickets de incidentes",
      en: "Incident ticket system",
    },
  },
  {
    id: "ajinomoto",
    name: "Ajinomoto",
    project: {
      pt: "Sistema de checklist",
      en: "Checklist system",
    },
  },
  {
    id: "siemens-healthineers",
    name: "Siemens Healthineers",
    project: {
      pt: "Processo de solicitação de construção de sistemas médicos (ex: máquinas de ressonância magnética)",
      en: "Request process for building medical systems (e.g. MRI machines)",
    },
  },
  {
    id: "hub-brasil",
    name: "Hub Brasil",
    project: {
      pt: "Criação de sistema de CRM, Workflow e Inbox",
      en: "CRM, Workflow, and Inbox system",
    },
  },
  {
    id: "nubank-ironman",
    name: "Nubank — IronMan",
    project: {
      pt: "Sistema de tickets para bicicletas",
      en: "Ticket system for bikes",
    },
  },
  {
    id: "c6-bank",
    name: "C6 Bank",
    project: {
      pt: "Landing page de promoção de corretores",
      en: "Landing page for broker promotion",
    },
  },
]
