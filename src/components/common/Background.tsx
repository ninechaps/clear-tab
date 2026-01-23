import { useSettingsStore } from '@/store/useSettingsStore';
import { useState, useEffect, useRef } from 'react';
import { backgroundPresets, getRandomBackgroundId } from './backgroundPresets';

export function Background() {
  const { wallpaper } = useSettingsStore();

  // 使用 useState 的初始化函数确保随机值只在首次渲染时生成
  const [randomId] = useState(() => getRandomBackgroundId());

  // 如果是随机模式，使用随机生成的 ID；否则使用用户选择的
  const currentKeyword = wallpaper.randomMode
    ? randomId
    : (wallpaper.keywords[0] || 'cyber');

  const preset = backgroundPresets[currentKeyword] || backgroundPresets.cyber;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevKeywordRef = useRef(currentKeyword);

  // Track theme changes for smooth transitions
  useEffect(() => {
    if (prevKeywordRef.current !== currentKeyword) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 1000);
      prevKeywordRef.current = currentKeyword;
      return () => clearTimeout(timer);
    }
  }, [currentKeyword]);

  const orbColor1 = preset.orbColors?.[0] || preset.accent;
  const orbColor2 = preset.orbColors?.[1] || preset.accentSecondary || preset.accent;
  const gridColor = preset.gridColor || 'rgba(255, 255, 255, 0.05)';
  const glowIntensity = preset.glowIntensity || 1;

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
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
