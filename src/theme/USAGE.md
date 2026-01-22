# Theme 使用指南

## 概述

为了保证整个应用的样式一致性，所有交互元素和样式都应该从 `src/theme/index.ts` 导入使用。

## 导入

```tsx
import {
  colors,
  buttonStyles,
  inputStyles,
  modalStyles,
  cardStyles,
  componentStyles,
  getHoverClass,
  getTextColor
} from '@/theme'
```

## 使用示例

### 1. 按钮 - 关闭按钮

**❌ 不推荐（不一致）**
```tsx
<Button
  onClick={onClose}
  variant="ghost"
  size="sm"
  className="p-1 h-auto text-white/60 hover:bg-white/10"
>
  ✗
</Button>
```

**✅ 推荐（使用 theme）**
```tsx
import { componentStyles } from '@/theme'

<Button
  onClick={onClose}
  {...componentStyles.closeButton}
>
  ✗
</Button>
```

### 2. 按钮 - 操作按钮（Pin/✓）

**❌ 不推荐**
```tsx
<Button
  onClick={handleClick}
  variant="ghost"
  size="sm"
  className="text-xs text-white/60 hover:bg-white/10"
>
  Pin
</Button>
```

**✅ 推荐**
```tsx
import { componentStyles } from '@/theme'

<Button
  onClick={handleClick}
  {...componentStyles.actionButton}
>
  Pin
</Button>
```

### 3. 按钮 - 浮动按钮（底部操作栏）

**❌ 不推荐**
```tsx
<Button
  onClick={handleClick}
  variant="ghost"
  className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto"
>
  ✓
</Button>
```

**✅ 推荐**
```tsx
import { componentStyles } from '@/theme'

<Button
  onClick={handleClick}
  {...componentStyles.floatingButton}
>
  ✓
</Button>
```

### 4. 按钮 - 分类标签按钮（Background Selector）

**❌ 不推荐**
```tsx
<Button
  onClick={() => setActiveCategory(cat)}
  variant={activeCategory === cat ? 'default' : 'ghost'}
  className={`text-sm whitespace-nowrap ${
    activeCategory === cat
      ? 'bg-white/15 text-white'
      : 'text-white/60 hover:text-white'
  }`}
>
  {label}
</Button>
```

**✅ 推荐**
```tsx
import { componentStyles } from '@/theme'

const tabStyle = componentStyles.tabButton(activeCategory === cat)

<Button
  onClick={() => setActiveCategory(cat)}
  {...tabStyle}
>
  {label}
</Button>
```

### 5. 输入框

**❌ 不推荐**
```tsx
<Input
  className="w-full pl-12 pr-14 py-6 text-lg bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-black/30 focus:border-white/20"
/>
```

**✅ 推荐**
```tsx
import { inputStyles } from '@/theme'

<Input
  className={`${inputStyles.base} ${inputStyles.focus} ${inputStyles.padding} pl-12 pr-14 text-lg`}
/>
```

### 6. 模态框/抽屉背景

**❌ 不推荐**
```tsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
<div className="fixed right-0 top-0 h-screen w-96 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col">
```

**✅ 推荐**
```tsx
import { modalStyles } from '@/theme'

<div className={modalStyles.backdrop} />
<div className={modalStyles.drawer}>
```

### 7. 卡片

**❌ 不推荐**
```tsx
<div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
```

**✅ 推荐**
```tsx
import { cardStyles } from '@/theme'

<div className={`${cardStyles.base} ${cardStyles.padding} ${cardStyles.hover}`}>
```

### 8. 文本颜色

**❌ 不推荐**
```tsx
<span className="text-white/60">Muted text</span>
<span className="text-white/50">Secondary text</span>
```

**✅ 推荐**
```tsx
import { getTextColor } from '@/theme'

<span className={getTextColor('secondary')}>Muted text</span>
<span className={getTextColor('muted')}>Secondary text</span>
```

## 颜色快速参考

### 文本颜色
- `primary` = `text-white` - 主要文本
- `secondary` = `text-white/60` - 次要文本
- `muted` = `text-white/50` - 静音文本
- `disabled` = `text-white/40` - 禁用文本
- `hint` = `text-white/30` - 提示文本

### 背景色
- `primary` = `bg-slate-900/95` - 深色背景（抽屉、模态框）
- `secondary` = `bg-black/20` - 输入框背景
- `overlay` = `bg-black/60` - 覆盖层
- `card` = `bg-white/5` - 卡片背景
- `hover` = `bg-white/10` - 悬停状态
- `active` = `bg-white/15` - 激活状态

### 边框色
- `primary` = `border-white/10` - 主要边框
- `secondary` = `border-white/5` - 次要边框
- `active` = `border-white/20` - 激活边框

## 常见场景

### 场景1：添加新按钮
1. 查看是否有相似的 `componentStyles` 预定义
2. 如果没有，使用 `buttonStyles` 中的一个基础样式
3. 如需自定义，使用 `mergeButtonStyles()` 函数

### 场景2：创建新的模态框
1. 使用 `modalStyles.overlay` 和 `modalStyles.modal`
2. 所有内部按钮使用相应的 `componentStyles`

### 场景3：需要hover效果
1. 导入 `getHoverClass()`
2. 传入 'button' | 'card' | 'item'
3. 自动应用正确的 hover 样式

## 颜色更改

如果需要更改全局颜色：
1. 编辑 `src/theme/index.ts` 中的 `colors` 对象
2. 所有使用该颜色的组件都会自动更新
3. 无需逐个修改组件

## 动画和过渡

所有动画使用：
- `animations.transition` - 标准过渡
- `animations.smooth` - 平滑过渡
- `animations.hoverScale` - 悬停缩放
- `animations.hoverShadow` - 悬停阴影

## 按钮状态对照表

| 按钮类型 | 使用场景 | 样式 |
|---------|--------|------|
| `closeButton` | 关闭模态框/抽屉 | 小圆形 icon |
| `actionButton` | Pin/✓ 等小操作 | 小文本按钮 |
| `floatingButton` | 底部操作栏 | 大背景按钮 |
| `tabButton` | 分类/标签切换 | 背景+文本切换 |
| `cardButton` | 卡片选择 | 大型可点击卡片 |
| `searchButton` | 搜索提交 | 输入框内按钮 |

---

**记住：一致性是关键！总是优先使用 theme 中定义的样式。**
