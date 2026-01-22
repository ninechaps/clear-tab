import { useState } from 'react'
import {
  SiGithub,
  SiGmail,
  SiNotion,
  SiReddit,
  SiStackoverflow,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons'

// Custom icon components for brands not in simple-icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

interface QuickLink {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  hoverColor: string
}

const quickLinks: QuickLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    hoverColor: 'rgba(36, 41, 46, 0.9)',
    icon: SiGithub,
  },
  {
    name: 'X',
    url: 'https://x.com',
    hoverColor: 'rgba(0, 0, 0, 0.9)',
    icon: SiX,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    hoverColor: 'rgba(255, 0, 0, 0.8)',
    icon: SiYoutube,
  },
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    hoverColor: 'rgba(234, 67, 53, 0.85)',
    icon: SiGmail,
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    hoverColor: 'rgba(244, 128, 36, 0.85)',
    icon: SiStackoverflow,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    hoverColor: 'rgba(10, 102, 194, 0.9)',
    icon: LinkedInIcon,
  },
  {
    name: 'Reddit',
    url: 'https://reddit.com',
    hoverColor: 'rgba(255, 69, 0, 0.85)',
    icon: SiReddit,
  },
  {
    name: 'Notion',
    url: 'https://notion.so',
    hoverColor: 'rgba(55, 53, 47, 0.9)',
    icon: SiNotion,
  },
]

export function QuickLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {quickLinks.map((link, index) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative p-3 rounded-xl text-white/70 transition-all duration-300 animate-fade-in cursor-pointer group"
          style={{
            animationDelay: `${index * 50}ms`,
            backgroundColor: hoveredIndex === index ? link.hoverColor : 'rgba(255, 255, 255, 0.08)',
            transform: hoveredIndex === index ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: hoveredIndex === index ? '0 8px 24px rgba(0, 0, 0, 0.3)' : 'none',
          }}
          title={link.name}
        >
          {/* Icon */}
          <span className={`block transition-all duration-300 ${
            hoveredIndex === index ? 'text-white' : ''
          }`}>
            <link.icon className="w-5 h-5" />
          </span>

          {/* Tooltip */}
          <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}>
            {link.name}
          </span>
        </a>
      ))}
    </div>
  )
}
