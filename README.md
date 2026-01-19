# Clear Tab

一个简洁、高度可定制的 Chrome 新标签页扩展，让你的浏览器保持清爽和高效。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ 特性

- **多种主题模式**：Focus（专注）、Minimal（极简）、Info（信息）和 Custom（自定义）四种预设主题
- **灵活的小部件系统**：
  - 🕐 数字/模拟时钟（支持 12/24 小时制）
  - 🔍 搜索框（支持 Google、Bing、DuckDuckGo、百度）
  - 🌤️ 天气信息
  - ⚡ 快速链接
  - 📊 更多小部件持续开发中...
- **个性化背景**：
  - 支持本地上传背景图片
  - 集成 Unsplash 和 Pexels 在线图库
  - 自定义背景模糊和覆盖层效果
  - 自动刷新背景功能
- **国际化支持**：多语言界面支持
- **数据本地化存储**：所有设置和数据存储在本地，保护隐私
- **响应式设计**：完美适配各种屏幕尺寸

## 📦 安装

### 从源代码构建

```bash
# 1. 克隆或下载项目
cd clear-tab

# 2. 安装依赖（使用 pnpm）
pnpm install

# 3. 开发模式
pnpm dev

# 4. 构建生产版本
pnpm build
```

### 安装到 Chrome

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 启用右上角的 **Developer Mode（开发者模式）**
3. 点击 **Load unpacked（加载已解压的扩展程序）**
4. 选择项目中的 `dist` 文件夹
5. 完成！现在打开新标签页就能使用 Clear Tab

## 🚀 使用方法

### 基本操作

1. **打开新标签页** - 点击浏览器的新标签页按钮或按 `Ctrl+T`（Windows）/ `Cmd+T`（Mac）
2. **更改背景** - 点击右下角的齿轮图标打开背景选择器
3. **自定义设置** - 在背景选择器中调整主题、小部件和背景设置

### 小部件管理

- 通过主题选择自动启用/禁用相关小部件
- 在设置中自定义各个小部件的行为（如时间格式、搜索引擎等）

## 🛠️ 开发

### 项目结构

```
src/
├── components/       # React 组件
│   ├── common/      # 通用组件（Background, BackgroundSelector 等）
│   ├── layouts/     # 布局组件（ProductiveLayout 等）
│   └── widgets/     # 小部件组件（Clock, Search, Weather 等）
├── store/           # Zustand 状态管理
├── services/        # 业务逻辑服务
├── i18n/            # 国际化支持
├── themes/          # 主题配置
├── types/           # TypeScript 类型定义
├── hooks/           # React 自定义 Hooks
└── main.tsx         # 应用入口
```

### 可用命令

```bash
# 开发服务器
pnpm dev

# Web 模式开发（用于网页调试）
pnpm dev:web

# 生产构建
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 生成图标（从 SVG 转换为 PNG）
pnpm generate-icons
```

> 注：`pnpm build` 会自动调用 `pnpm generate-icons` 来生成图标

### 技术栈

- **前端框架**：React 18.3 + TypeScript
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **构建工具**：Vite
- **扩展打包**：CRXJS Vite Plugin
- **代码规范**：ESLint + TypeScript

### 代码规范

本项目使用 ESLint 进行代码质量检查：

```bash
# 运行 ESLint 检查
pnpm lint

# 检查 TypeScript 类型
pnpm type-check
```


## 📝 配置说明

所有用户设置存储在 Chrome 本地存储中，包括：
- 选择的主题
- 启用的小部件及其设置
- 背景偏好和刷新间隔
- 语言选择
- 快速链接

## 🔒 隐私

- 所有数据都存储在本地，不会上传到任何服务器
- 不收集用户任何个人信息
- 后台无网络请求（除非用户启用在线背景功能）

## 🤝 贡献

欢迎提交 Pull Request 或报告 Issue！

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 💡 反馈与建议

如果你有任何想法、建议或发现了 bug，欢迎：
- 提交 Issue
- 发起 Pull Request
- 直接联系我们

## 🚧 开发路线图

- [ ] 更多小部件（倒计时、报价、待办事项等）
- [ ] 小部件位置自定义
- [ ] 主题编辑器
- [ ] 设置导出/导入
- [ ] 协作功能
- [ ] 浅色/深色主题切换