import { useSettingsStore } from '@/store/useSettingsStore'
import { useState, useEffect, useRef } from 'react'

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
}

// 获取所有可用的背景 ID
const backgroundIds = Object.keys(backgroundPresets)

// 随机选择一个背景 ID
function getRandomBackgroundId(): string {
  const randomIndex = Math.floor(Math.random() * backgroundIds.length)
  return backgroundIds[randomIndex]
}

export function Background() {
  const { wallpaper } = useSettingsStore()

  // 使用 useState 的初始化函数确保随机值只在首次渲染时生成
  const [randomId] = useState(() => getRandomBackgroundId())

  // 如果是随机模式，使用随机生成的 ID；否则使用用户选择的
  const currentKeyword = wallpaper.randomMode
    ? randomId
    : (wallpaper.keywords[0] || 'cyber')

  const preset = backgroundPresets[currentKeyword] || backgroundPresets.cyber
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevKeywordRef = useRef(currentKeyword)

  // Track theme changes for smooth transitions
  useEffect(() => {
    if (prevKeywordRef.current !== currentKeyword) {
      setIsTransitioning(true)
      const timer = setTimeout(() => setIsTransitioning(false), 1000)
      prevKeywordRef.current = currentKeyword
      return () => clearTimeout(timer)
    }
  }, [currentKeyword])

  const orbColor1 = preset.orbColors?.[0] || preset.accent
  const orbColor2 = preset.orbColors?.[1] || preset.accentSecondary || preset.accent
  const gridColor = preset.gridColor || 'rgba(255, 255, 255, 0.05)'
  const glowIntensity = preset.glowIntensity || 1

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Base gradient with smooth transition */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${preset.gradient} transition-all duration-1000 ease-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Animated gradient orbs - Primary (top-left) */}
      <div
        className="absolute top-0 -left-1/4 w-2/3 h-2/3 rounded-full blur-[100px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${orbColor1} 0%, transparent 70%)`,
          animation: 'float 10s ease-in-out infinite',
          opacity: glowIntensity,
        }}
      />

      {/* Animated gradient orbs - Secondary (bottom-right) */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full blur-[100px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${orbColor2} 0%, transparent 70%)`,
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '-5s',
          opacity: glowIntensity,
        }}
      />

      {/* Center glow pulse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[150px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${preset.accentSecondary || preset.accent} 0%, transparent 50%)`,
          animation: 'pulse-slow 15s ease-in-out infinite',
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* HUD Grid - Main */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* HUD Grid - Fine detail */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
        }}
      />

      {/* Corner accent - top left */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${orbColor1} 0%, transparent 60%)`,
        }}
      />

      {/* Corner accent - bottom right */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-30"
        style={{
          background: `linear-gradient(-45deg, ${orbColor2} 0%, transparent 60%)`,
        }}
      />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.6)',
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
