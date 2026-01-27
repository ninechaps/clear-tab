import { useState } from 'react';
import {
  SiGithub,
  SiGmail,
  SiNotion,
  SiReddit,
  SiStackoverflow,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { Plus, X, Link as LinkIcon } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { getFaviconUrl, getDefaultFaviconDataUrl } from '@/utils/favicon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MAX_QUICK_LINKS, DEFAULT_LINKS_MAP } from '@/store/useSettingsStore';
import type { QuickLinkItem } from '@/types';

// Custom icon components for brands not in simple-icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// 内置图标映射
const BUILTIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  x: SiX,
  youtube: SiYoutube,
  gmail: SiGmail,
  stackoverflow: SiStackoverflow,
  linkedin: LinkedInIcon,
  reddit: SiReddit,
  notion: SiNotion,
};

export function QuickLinks() {
  const { quickLinks = [], addQuickLink, removeQuickLink } = useSettingsStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleAddLink = () => {
    if (!newLinkName.trim() || !newLinkUrl.trim()) {
      return;
    }

    // 验证 URL 格式
    try {
      const url = newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`;
      new URL(url);

      // 检查是否是默认链接
      const defaultLink = DEFAULT_LINKS_MAP.get(url.toLowerCase());

      let newLink: Omit<QuickLinkItem, 'id'>;

      if (defaultLink) {
        // 如果是默认链接，使用原来的配置
        newLink = {
          name: defaultLink.name,
          url: defaultLink.url,
          iconType: 'builtin',
          hoverColor: defaultLink.hoverColor,
        };
      } else {
        // 新链接使用 favicon
        const faviconUrl = getFaviconUrl(url);
        newLink = {
          name: newLinkName.trim(),
          url,
          iconType: 'favicon',
          faviconUrl,
          hoverColor: 'rgba(99, 102, 241, 0.85)',
        };
      }

      addQuickLink(newLink);
      setNewLinkName('');
      setNewLinkUrl('');
      setShowAddForm(false);
    } catch {
      alert('请输入有效的 URL');
    }
  };

  const handleRemoveLink = (linkId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeQuickLink(linkId);
  };

  const canAddMore = quickLinks.length < MAX_QUICK_LINKS;

  // 渲染图标
  const renderIcon = (link: QuickLinkItem) => {
    if (link.iconType === 'builtin') {
      const IconComponent = BUILTIN_ICONS[link.id];
      if (IconComponent) {
        return <IconComponent className="w-5 h-5" />;
      }
    }

    // 使用 favicon
    if (link.faviconUrl) {
      return (
        <img
          src={link.faviconUrl}
          alt={link.name}
          className="w-5 h-5"
          onError={(e) => {
            e.currentTarget.src = getDefaultFaviconDataUrl();
          }}
        />
      );
    }

    // 默认图标
    return <LinkIcon className="w-5 h-5" />;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {quickLinks.map((link, index) => (
        <div key={link.id} className="relative group/link">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative p-3 rounded-xl text-white/70 transition-all duration-300 animate-fade-in cursor-pointer flex items-center justify-center"
            style={{
              animationDelay: `${index * 50}ms`,
              backgroundColor: hoveredIndex === index ? (link.hoverColor || 'rgba(99, 102, 241, 0.85)') : 'rgba(255, 255, 255, 0.08)',
              transform: hoveredIndex === index ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
              boxShadow: hoveredIndex === index ? '0 8px 24px rgba(0, 0, 0, 0.3)' : 'none',
            }}
            title={link.name}
          >
            {/* Icon */}
            <span className={`block transition-all duration-300 ${
              hoveredIndex === index ? 'text-white' : ''
            }`}>
              {renderIcon(link)}
            </span>

            {/* Tooltip */}
            <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap transition-all duration-200 pointer-events-none ${
              hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}>
              {link.name}
            </span>
          </a>

          {/* 删除按钮 */}
          <button
            onClick={(e) => handleRemoveLink(link.id, e)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500/90 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 z-10"
            title="删除"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      ))}

      {/* 添加按钮 */}
      {canAddMore && !showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all duration-300 cursor-pointer"
          title={`添加快捷链接 (${quickLinks.length}/${MAX_QUICK_LINKS})`}
        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      {/* 添加表单 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-96 border border-white/20 shadow-2xl animate-scale-in">
            <h3 className="text-white text-lg font-semibold mb-4">添加快捷链接</h3>

            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">名称</label>
                <Input
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="例如: GitHub"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  maxLength={20}
                  autoFocus
                />
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">URL</label>
                <Input
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="例如: https://github.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddLink();
                    }
                  }}
                />
              </div>

              <div className="text-white/50 text-xs">
                图标将自动从网站获取 ({quickLinks.length}/{MAX_QUICK_LINKS})
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleAddLink}
                  disabled={!newLinkName.trim() || !newLinkUrl.trim()}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  添加
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewLinkName('');
                    setNewLinkUrl('');
                  }}
                  variant="outline"
                  className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
