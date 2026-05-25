import type { Theme } from '@/domain/entities/Theme'
import type { ThemeName } from '@/domain/value-objects/ThemeName'

export const THEMES: Record<ThemeName, Theme> = {
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    accent: '#58a6ff',
    bg: '#0d1117',
    description: 'GitHub Dark',
  },
  terminal: {
    name: 'terminal',
    label: 'Terminal',
    accent: '#00ff41',
    bg: '#050505',
    description: 'Matrix Green',
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    accent: '#fdf500',
    bg: '#000b18',
    description: 'Neon Yellow',
  },
  dracula: {
    name: 'dracula',
    label: 'Dracula',
    accent: '#bd93f9',
    bg: '#282a36',
    description: 'Purple Classic',
  },
  'tokyo-night': {
    name: 'tokyo-night',
    label: 'Tokyo Night',
    accent: '#7aa2f7',
    bg: '#1a1b26',
    description: 'Editor Favorito',
  },
  synthwave: {
    name: 'synthwave',
    label: 'Synthwave',
    accent: '#ff7edb',
    bg: '#262335',
    description: '80s Retro Pink',
  },
  nord: {
    name: 'nord',
    label: 'Nord',
    accent: '#88c0d0',
    bg: '#2e3440',
    description: 'Arctic Blue',
  },
  'night-runner': {
    name: 'night-runner',
    label: 'Night Runner',
    accent: '#00f0ff',
    bg: '#090a0f',
    description: 'Cyan Neon',
  },
}
