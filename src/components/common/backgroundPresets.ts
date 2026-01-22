// High-tech background gradient presets
export interface BackgroundPreset {
  gradient: string
  accent: string
  accentSecondary?: string
  orbColors?: [string, string]
  gridColor?: string
  glowIntensity?: number
}

export const backgroundPresets: Record<string, BackgroundPreset> = {
  // === CYBER / NEON ===
  cyber: {
    gradient: 'from-[#0a0a0f] via-[#0d0d1a] to-[#05050a]',
    accent: 'rgba(0, 255, 255, 0.15)',
    accentSecondary: 'rgba(255, 0, 255, 0.12)',
    orbColors: ['rgba(0, 255, 255, 0.3)', 'rgba(255, 0, 255, 0.25)'],
    gridColor: 'rgba(0, 255, 255, 0.08)',
    glowIntensity: 1.2,
  },
  neon: {
    gradient: 'from-[#0f0f1a] via-[#1a0a2e] to-[#0a0a14]',
    accent: 'rgba(255, 0, 255, 0.18)',
    accentSecondary: 'rgba(0, 255, 255, 0.15)',
    orbColors: ['rgba(255, 0, 255, 0.35)', 'rgba(0, 255, 255, 0.3)'],
    gridColor: 'rgba(255, 0, 255, 0.06)',
    glowIntensity: 1.3,
  },
  matrix: {
    gradient: 'from-[#000a00] via-[#001a00] to-[#000500]',
    accent: 'rgba(0, 255, 0, 0.12)',
    accentSecondary: 'rgba(0, 200, 100, 0.1)',
    orbColors: ['rgba(0, 255, 0, 0.25)', 'rgba(0, 255, 100, 0.2)'],
    gridColor: 'rgba(0, 255, 0, 0.06)',
    glowIntensity: 1.1,
  },

  // === TECH / FUTURISTIC ===
  hologram: {
    gradient: 'from-[#050510] via-[#0a1020] to-[#020208]',
    accent: 'rgba(0, 150, 255, 0.18)',
    accentSecondary: 'rgba(100, 200, 255, 0.15)',
    orbColors: ['rgba(0, 180, 255, 0.35)', 'rgba(100, 220, 255, 0.28)'],
    gridColor: 'rgba(0, 200, 255, 0.08)',
    glowIntensity: 1.2,
  },
  quantum: {
    gradient: 'from-[#05000a] via-[#100520] to-[#0a0010]',
    accent: 'rgba(138, 43, 226, 0.2)',
    accentSecondary: 'rgba(75, 0, 130, 0.15)',
    orbColors: ['rgba(148, 0, 211, 0.35)', 'rgba(138, 43, 226, 0.3)'],
    gridColor: 'rgba(148, 0, 211, 0.07)',
    glowIntensity: 1.2,
  },
  neural: {
    gradient: 'from-[#0a0a12] via-[#12101f] to-[#06060c]',
    accent: 'rgba(99, 102, 241, 0.18)',
    accentSecondary: 'rgba(139, 92, 246, 0.15)',
    orbColors: ['rgba(99, 102, 241, 0.3)', 'rgba(139, 92, 246, 0.25)'],
    gridColor: 'rgba(99, 102, 241, 0.07)',
    glowIntensity: 1.1,
  },

  // === DARK MINIMAL ===
  void: {
    gradient: 'from-[#000000] via-[#050508] to-[#000000]',
    accent: 'rgba(255, 255, 255, 0.06)',
    accentSecondary: 'rgba(100, 100, 120, 0.05)',
    orbColors: ['rgba(80, 80, 100, 0.15)', 'rgba(60, 60, 80, 0.12)'],
    gridColor: 'rgba(255, 255, 255, 0.03)',
    glowIntensity: 0.8,
  },
  obsidian: {
    gradient: 'from-[#0a0a0c] via-[#101015] to-[#06060a]',
    accent: 'rgba(120, 120, 140, 0.1)',
    accentSecondary: 'rgba(80, 80, 100, 0.08)',
    orbColors: ['rgba(100, 100, 130, 0.18)', 'rgba(80, 80, 110, 0.15)'],
    gridColor: 'rgba(150, 150, 170, 0.04)',
    glowIntensity: 0.9,
  },
  carbon: {
    gradient: 'from-[#080808] via-[#101010] to-[#050505]',
    accent: 'rgba(50, 50, 55, 0.15)',
    accentSecondary: 'rgba(40, 40, 45, 0.12)',
    orbColors: ['rgba(70, 70, 80, 0.2)', 'rgba(50, 50, 60, 0.18)'],
    gridColor: 'rgba(100, 100, 110, 0.05)',
    glowIntensity: 0.7,
  },

  // === PLASMA / ENERGY ===
  plasma: {
    gradient: 'from-[#0a0515] via-[#150a20] to-[#05000a]',
    accent: 'rgba(255, 0, 128, 0.18)',
    accentSecondary: 'rgba(255, 100, 200, 0.15)',
    orbColors: ['rgba(255, 20, 147, 0.35)', 'rgba(255, 105, 180, 0.28)'],
    gridColor: 'rgba(255, 0, 128, 0.06)',
    glowIntensity: 1.3,
  },
  fusion: {
    gradient: 'from-[#0a0a00] via-[#151505] to-[#0a0500]',
    accent: 'rgba(255, 200, 0, 0.15)',
    accentSecondary: 'rgba(255, 150, 0, 0.12)',
    orbColors: ['rgba(255, 220, 0, 0.3)', 'rgba(255, 180, 0, 0.25)'],
    gridColor: 'rgba(255, 200, 0, 0.05)',
    glowIntensity: 1.2,
  },
  aurora: {
    gradient: 'from-[#000a0a] via-[#051515] to-[#000505]',
    accent: 'rgba(0, 255, 200, 0.15)',
    accentSecondary: 'rgba(100, 200, 255, 0.12)',
    orbColors: ['rgba(0, 255, 180, 0.3)', 'rgba(50, 200, 255, 0.25)'],
    gridColor: 'rgba(0, 255, 200, 0.06)',
    glowIntensity: 1.1,
  },

  // === SPACE / COSMIC ===
  nebula: {
    gradient: 'from-[#0a0515] via-[#100a1a] to-[#050a15]',
    accent: 'rgba(180, 100, 255, 0.18)',
    accentSecondary: 'rgba(100, 150, 255, 0.15)',
    orbColors: ['rgba(180, 80, 255, 0.32)', 'rgba(80, 150, 255, 0.28)'],
    gridColor: 'rgba(150, 100, 255, 0.05)',
    glowIntensity: 1.15,
  },
  cosmos: {
    gradient: 'from-[#02020a] via-[#0a0a1a] to-[#000005]',
    accent: 'rgba(100, 100, 255, 0.15)',
    accentSecondary: 'rgba(150, 100, 200, 0.12)',
    orbColors: ['rgba(100, 80, 255, 0.28)', 'rgba(150, 100, 220, 0.22)'],
    gridColor: 'rgba(100, 100, 255, 0.05)',
    glowIntensity: 1.0,
  },
  eclipse: {
    gradient: 'from-[#000000] via-[#0a0510] to-[#000000]',
    accent: 'rgba(255, 100, 50, 0.12)',
    accentSecondary: 'rgba(255, 50, 100, 0.1)',
    orbColors: ['rgba(255, 120, 50, 0.25)', 'rgba(255, 50, 80, 0.2)'],
    gridColor: 'rgba(255, 100, 50, 0.04)',
    glowIntensity: 1.0,
  },

  // === LEGACY (renamed/updated) ===
  minimal: {
    gradient: 'from-[#08080c] via-[#0c0c12] to-[#050508]',
    accent: 'rgba(100, 110, 140, 0.1)',
    accentSecondary: 'rgba(70, 80, 100, 0.08)',
    orbColors: ['rgba(90, 100, 130, 0.18)', 'rgba(70, 80, 110, 0.15)'],
    gridColor: 'rgba(100, 110, 140, 0.05)',
    glowIntensity: 0.8,
  },
  city: {
    gradient: 'from-[#0a0a12] via-[#10101a] to-[#050508]',
    accent: 'rgba(100, 150, 200, 0.12)',
    accentSecondary: 'rgba(80, 120, 160, 0.1)',
    orbColors: ['rgba(100, 150, 200, 0.2)', 'rgba(80, 120, 180, 0.15)'],
    gridColor: 'rgba(100, 150, 200, 0.04)',
    glowIntensity: 0.9,
  },
  space: {
    gradient: 'from-[#000005] via-[#050510] to-[#000000]',
    accent: 'rgba(150, 100, 255, 0.15)',
    accentSecondary: 'rgba(100, 150, 255, 0.12)',
    orbColors: ['rgba(150, 100, 255, 0.25)', 'rgba(100, 150, 255, 0.2)'],
    gridColor: 'rgba(150, 100, 255, 0.05)',
    glowIntensity: 1.0,
  },
  abstract: {
    gradient: 'from-[#0a0515] via-[#150a20] to-[#080510]',
    accent: 'rgba(200, 100, 255, 0.15)',
    accentSecondary: 'rgba(255, 100, 200, 0.12)',
    orbColors: ['rgba(200, 100, 255, 0.28)', 'rgba(255, 100, 200, 0.22)'],
    gridColor: 'rgba(200, 100, 255, 0.05)',
    glowIntensity: 1.1,
  },
  sunset: {
    gradient: 'from-[#0a0500] via-[#15050a] to-[#0a0000]',
    accent: 'rgba(255, 150, 100, 0.18)',
    accentSecondary: 'rgba(255, 100, 50, 0.15)',
    orbColors: ['rgba(255, 150, 100, 0.3)', 'rgba(255, 100, 50, 0.25)'],
    gridColor: 'rgba(255, 150, 100, 0.06)',
    glowIntensity: 1.2,
  },
  rose: {
    gradient: 'from-[#0a0008] via-[#150a12] to-[#080505]',
    accent: 'rgba(255, 100, 150, 0.16)',
    accentSecondary: 'rgba(255, 80, 120, 0.13)',
    orbColors: ['rgba(255, 100, 150, 0.28)', 'rgba(255, 80, 120, 0.22)'],
    gridColor: 'rgba(255, 100, 150, 0.05)',
    glowIntensity: 1.05,
  },
  ember: {
    gradient: 'from-[#0a0400] via-[#120805] to-[#080200]',
    accent: 'rgba(255, 120, 50, 0.18)',
    accentSecondary: 'rgba(255, 80, 30, 0.15)',
    orbColors: ['rgba(255, 120, 50, 0.3)', 'rgba(255, 80, 30, 0.25)'],
    gridColor: 'rgba(255, 120, 50, 0.06)',
    glowIntensity: 1.15,
  },
  lavender: {
    gradient: 'from-[#08050a] via-[#12080f] to-[#06040a]',
    accent: 'rgba(180, 100, 255, 0.15)',
    accentSecondary: 'rgba(150, 80, 200, 0.12)',
    orbColors: ['rgba(180, 100, 255, 0.26)', 'rgba(150, 80, 200, 0.2)'],
    gridColor: 'rgba(180, 100, 255, 0.05)',
    glowIntensity: 1.0,
  },
  ocean: {
    gradient: 'from-[#000a0a] via-[#050f15] to-[#000508]',
    accent: 'rgba(50, 200, 255, 0.16)',
    accentSecondary: 'rgba(0, 150, 200, 0.13)',
    orbColors: ['rgba(50, 200, 255, 0.26)', 'rgba(0, 150, 200, 0.2)'],
    gridColor: 'rgba(50, 200, 255, 0.05)',
    glowIntensity: 1.0,
  },
  arctic: {
    gradient: 'from-[#050a0c] via-[#0a1215] to-[#050808]',
    accent: 'rgba(100, 200, 255, 0.15)',
    accentSecondary: 'rgba(50, 150, 200, 0.12)',
    orbColors: ['rgba(100, 200, 255, 0.25)', 'rgba(50, 150, 200, 0.2)'],
    gridColor: 'rgba(100, 200, 255, 0.05)',
    glowIntensity: 0.95,
  },
  nature: {
    gradient: 'from-[#050a05] via-[#0a150a] to-[#050805]',
    accent: 'rgba(100, 200, 100, 0.15)',
    accentSecondary: 'rgba(80, 180, 80, 0.12)',
    orbColors: ['rgba(100, 200, 100, 0.25)', 'rgba(80, 180, 80, 0.2)'],
    gridColor: 'rgba(100, 200, 100, 0.05)',
    glowIntensity: 0.95,
  },
  forest: {
    gradient: 'from-[#040805] via-[#0a1008] to-[#050806]',
    accent: 'rgba(80, 180, 100, 0.16)',
    accentSecondary: 'rgba(60, 150, 80, 0.13)',
    orbColors: ['rgba(80, 180, 100, 0.26)', 'rgba(60, 150, 80, 0.2)'],
    gridColor: 'rgba(80, 180, 100, 0.05)',
    glowIntensity: 0.9,
  },
  midnight: {
    gradient: 'from-[#050510] via-[#0a0a15] to-[#040408]',
    accent: 'rgba(80, 100, 180, 0.14)',
    accentSecondary: 'rgba(60, 80, 150, 0.11)',
    orbColors: ['rgba(80, 100, 180, 0.22)', 'rgba(60, 80, 150, 0.18)'],
    gridColor: 'rgba(80, 100, 180, 0.04)',
    glowIntensity: 0.85,
  },
  noir: {
    gradient: 'from-[#050505] via-[#0a0a0a] to-[#000000]',
    accent: 'rgba(100, 100, 100, 0.12)',
    accentSecondary: 'rgba(80, 80, 80, 0.1)',
    orbColors: ['rgba(100, 100, 100, 0.18)', 'rgba(80, 80, 80, 0.14)'],
    gridColor: 'rgba(100, 100, 100, 0.04)',
    glowIntensity: 0.8,
  },
  cosmic: {
    gradient: 'from-[#0a050f] via-[#100515] to-[#050a0a]',
    accent: 'rgba(180, 100, 200, 0.16)',
    accentSecondary: 'rgba(150, 80, 180, 0.13)',
    orbColors: ['rgba(180, 100, 200, 0.26)', 'rgba(150, 80, 180, 0.2)'],
    gridColor: 'rgba(180, 100, 200, 0.05)',
    glowIntensity: 1.05,
  },
}

// 获取所有可用的背景 ID
export const backgroundIds = Object.keys(backgroundPresets)

// 随机选择一个背景 ID
export function getRandomBackgroundId(): string {
  const randomIndex = Math.floor(Math.random() * backgroundIds.length)
  return backgroundIds[randomIndex]
}
