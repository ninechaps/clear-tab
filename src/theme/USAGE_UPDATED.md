# Theme 使用指南 - Tailwind CSS 标准方式 ✅

## 问题与解决方案

### 原问题
之前的方式在 TypeScript 中定义字符串类型的类名，这实际上是在**字符串级别重复 Tailwind 的工作**，不符合 Tailwind CSS 标准。

### 正确方式 ✅
遵循 Tailwind CSS 最佳实践：
1. **颜色和基础变量** → `tailwind.config.js`
2. **组件样式** → `src/index.css` 使用 `@layer components`
3. **配置和变体逻辑** → `src/theme/index.ts`

---

## 三层架构

### 第1层：Tailwind 主题 - `tailwind.config.js`

```js
export default {
  theme: {
    extend: {
      colors: {
        // 应用专用颜色
        'app-bg-primary': 'rgba(15, 23, 42, 0.95)',
        'app-bg-hover': 'rgba(255, 255, 255, 0.1)',
        // ...
      }
    }
  }
}
```

**优点：**
- Tailwind 官方推荐方式
- 可以在 Tailwind 的所有工具中使用
- 性能优化（构建时处理）

### 第2层：CSS 组件类 - `src/index.css`

```css
@layer components {
  .btn-close {
    @apply p-1 h-auto text-white/60 hover:bg-white/10 transition-all duration-200 cursor-pointer rounded;
  }

  .modal-drawer {
    @apply fixed right-0 top-0 h-screen w-96 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col overflow-hidden animate-slide-in-right;
  }
}
```

**优点：**
- 符合 Tailwind CSS 设计理念
- 使用 `@apply` 指令组合工具类
- CSS 级别的优化和复用
- 类名可复用和覆盖

### 第3层：React 配置 - `src/theme/index.ts`

```ts
export const buttonPresets = {
  close: {
    variant: 'ghost' as const,
    size: 'sm' as const,
    className: 'btn-close',  // 使用 CSS 类名
  },
}

export const cssClasses = {
  button: {
    close: 'btn-close',
  },
  modal: {
    drawer: 'modal-drawer',
  },
}

export const getTabButtonClass = (isActive: boolean): string => {
  // 动态逻辑处理
}
```

**用途：**
- shadcn Button 预设配置
- CSS 类名常量（避免硬编码）
- 动态样式生成器

---

## 使用示例

### ✅ 正确方式 - 使用预定义

```tsx
import { buttonPresets, cssClasses } from '@/theme'
import { Button } from '@/components/ui/button'

// 方式1：使用 buttonPresets
<Button {...buttonPresets.close}>
  <XIcon />
</Button>

// 方式2：使用 cssClasses
<div className={cssClasses.modal.drawer}>
  {/* 内容 */}
</div>

// 方式3：使用动态生成器
<Button className={getTabButtonClass(isActive)}>
  Tab
</Button>
```

### ❌ 错误方式 - 不要这样做

```tsx
// ❌ 硬编码类名
<Button className="p-1 h-auto text-white/60 hover:bg-white/10 ...">
  Close
</Button>

// ❌ 在 TS 中定义样式字符串
const styles = 'p-1 h-auto text-white/60 hover:bg-white/10'

// ❌ 混合使用
<div className="p-1 h-auto text-white/60">
  {/* 这个内容和 btn-close 重复了 */}
</div>
```

---

## API 参考

### `buttonPresets` - shadcn Button 预设

```ts
buttonPresets.close      // 关闭按钮
buttonPresets.action     // 操作按钮（Pin/✓）
buttonPresets.floating   // 浮动按钮
```

**使用方式：**
```tsx
<Button {...buttonPresets.close} />
```

### `cssClasses` - CSS 类名常量

```ts
cssClasses.button.close     // btn-close
cssClasses.modal.drawer     // modal-drawer
cssClasses.modal.dialog     // modal-dialog
cssClasses.card.base        // card-base
cssClasses.divider.primary  // divider-primary
```

**使用方式：**
```tsx
<div className={cssClasses.modal.drawer}>
```

### 动态生成器函数

```ts
getTabButtonClass(isActive)        // 标签按钮
getSearchButtonClass(isActive)     // 搜索按钮
getCardButtonClass(isSelected)     // 卡片按钮
```

**使用方式：**
```tsx
<Button className={getTabButtonClass(true)}>
  Active Tab
</Button>
```

### 工具函数

```ts
// 合并类名
cn('class1', undefined, 'class2')  // 'class1 class2'

// 获取文本颜色
getTextColorClass('secondary')     // 'text-white/60'

// 获取背景颜色
getBgColorClass('hover')           // 'bg-app-bg-hover'
```

---

## CSS 类名完整列表

### 按钮类

| 类名 | 说明 |
|-----|------|
| `.btn-close` | 关闭按钮 icon |
| `.btn-action` | 操作按钮（Pin/✓）|
| `.btn-ghost` | 幽灵按钮 |
| `.btn-floating` | 浮动按钮 |
| `.btn-disabled` | 禁用状态 |

### 模态框类

| 类名 | 说明 |
|-----|------|
| `.modal-backdrop` | 背景覆盖层 |
| `.modal-drawer` | 侧边抽屉 |
| `.modal-dialog` | 中央模态框 |

### 卡片类

| 类名 | 说明 |
|-----|------|
| `.card-base` | 基础卡片 |
| `.card-interactive` | 可交互卡片 |

### 其他类

| 类名 | 说明 |
|-----|------|
| `.divider-primary` | 主分隔线 |
| `.divider-secondary` | 次分隔线 |
| `.input-base` | 输入框基础 |
| `.input-focus` | 输入框 focus 状态 |

---

## 修改样式的方式

### 方式1：修改 CSS 类（推荐）

编辑 `src/index.css`：

```css
@layer components {
  .btn-close {
    /* 修改这里 */
    @apply p-2 h-auto text-white/70 hover:bg-white/20 ...;
  }
}
```

**影响：** 所有使用 `buttonPresets.close` 的按钮都会更新

### 方式2：修改主题变量

编辑 `tailwind.config.js`：

```js
colors: {
  'app-bg-hover': 'rgba(255, 255, 255, 0.15)',  // 从 0.1 改为 0.15
}
```

然后在 CSS 中引用：
```css
.btn-close {
  @apply hover:bg-app-bg-hover;
}
```

### 方式3：添加新的 CSS 类

在 `src/index.css` 中添加：

```css
@layer components {
  .btn-secondary {
    @apply px-4 py-2 bg-white/5 hover:bg-white/10 text-white transition-all ...;
  }
}
```

然后在 `src/theme/index.ts` 中引用：

```ts
export const cssClasses = {
  button: {
    // ...
    secondary: 'btn-secondary',
  },
}
```

---

## 最佳实践

✅ **推荐**
- 使用 `cssClasses` 中的预定义常量
- 使用 `buttonPresets` 配置 shadcn 组件
- 在 CSS 中修改样式
- 使用 Tailwind 的官方工具类

❌ **避免**
- 硬编码类名字符串
- 在 TypeScript 中定义样式
- 绕过 Tailwind 的主题系统
- 过度自定义（保持简洁）

---

## 总结

| 层 | 文件 | 用途 | 修改频率 |
|---|-----|------|--------|
| **1. 主题** | `tailwind.config.js` | 颜色、间距等变量 | 低 |
| **2. 组件** | `src/index.css` | 样式组合和应用 | 中 |
| **3. 逻辑** | `src/theme/index.ts` | 配置和变体 | 高 |

这种方式遵循 Tailwind CSS 官方最佳实践，代码更易维护和扩展。
