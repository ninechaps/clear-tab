/**
 * 应用 Theme 配置
 *
 * 推荐方式：
 * 1. 颜色和基础样式定义在 tailwind.config.js 中
 * 2. 组件类使用 @layer components 在 src/index.css 中定义
 * 3. 这个文件仅定义 React 组件的配置和变体逻辑
 */

// ============================================
// shadcn Button 组件配置预设
// ============================================

/**
 * 所有按钮预设
 * 直接传给 shadcn Button 组件
 */
export const buttonPresets = {
  // 关闭按钮 - icon 按钮
  close: {
    variant: 'ghost' as const,
    size: 'sm' as const,
    className: 'btn-close hover:bg-white/10 !text-white/60',
  },

  // 操作按钮 - Pin、✓ 等
  action: {
    variant: 'ghost' as const,
    size: 'sm' as const,
    className: 'btn-action hover:bg-white/10 !text-white/60',
  },

  // 主浮动按钮
  floating: {
    variant: 'ghost' as const,
    className: 'btn-floating btn-disabled',
  },
};

// ============================================
// CSS 类名常量 - 直接在 JSX 中使用
// ============================================

export const cssClasses = {
  // 按钮
  button: {
    close: 'btn-close',
    action: 'btn-action',
    ghost: 'btn-ghost',
    floating: 'btn-floating',
    disabled: 'btn-disabled',
  },

  // 模态框
  modal: {
    backdrop: 'modal-backdrop',
    drawer: 'modal-drawer',
    dialog: 'modal-dialog',
  },

  // 卡片
  card: {
    base: 'card-base',
    interactive: 'card-interactive',
  },

  // 分隔线
  divider: {
    primary: 'divider-primary',
    secondary: 'divider-secondary',
  },

  // 输入框
  input: {
    base: 'input-base input-focus',
  },
};

// ============================================
// 标签按钮动态样式生成器
// ============================================

export const getTabButtonClass = (isActive: boolean): string => {
  return isActive
    ? 'text-sm whitespace-nowrap px-4 py-2 rounded-lg bg-white/15 text-white transition-all duration-200'
    : 'text-sm whitespace-nowrap px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200';
};

// ============================================
// 搜索按钮动态样式生成器
// ============================================

export const getSearchButtonClass = (isActive: boolean): string => {
  return isActive
    ? 'absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all duration-200 h-auto cursor-pointer'
    : 'absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-white/40 hover:text-white/60 transition-all duration-200 h-auto cursor-pointer';
};

// ============================================
// 卡片按钮样式生成器（用于背景选择）
// ============================================

export const getCardButtonClass = (isSelected: boolean): string => {
  return isSelected
    ? 'group relative rounded-xl overflow-hidden transition-all duration-300 animate-fade-in h-auto p-0 ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 scale-[1.02]'
    : 'group relative rounded-xl overflow-hidden transition-all duration-300 animate-fade-in h-auto p-0 hover:ring-2 hover:ring-white/30 hover:scale-[1.03]';
};

// ============================================
// 工具函数
// ============================================

/**
 * 合并 CSS 类名
 * @param classes 类名列表
 * @returns 合并后的类名字符串
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 获取文本颜色类
 * @param level 颜色等级
 * @returns CSS 类名
 */
export const getTextColorClass = (level: 'primary' | 'secondary' | 'muted' | 'disabled' = 'primary'): string => {
  const colorMap = {
    primary: 'text-white',
    secondary: 'text-white/60',
    muted: 'text-white/50',
    disabled: 'text-white/40',
  };
  return colorMap[level];
};

/**
 * 获取背景颜色类
 * @param type 背景类型
 * @returns CSS 类名
 */
export const getBgColorClass = (type: 'primary' | 'secondary' | 'overlay' | 'card' | 'hover' | 'active' = 'primary'): string => {
  const bgMap = {
    primary: 'bg-app-bg-primary',
    secondary: 'bg-app-bg-secondary',
    overlay: 'bg-app-bg-overlay',
    card: 'bg-app-bg-card',
    hover: 'bg-app-bg-hover',
    active: 'bg-app-bg-active',
  };
  return bgMap[type];
};
