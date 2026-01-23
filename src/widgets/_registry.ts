/**
 * Widget Registry - 完全自动发现的小部件系统
 *
 * 核心原理：
 * 1. 使用 import.meta.glob 自动加载所有 manifest.ts 文件
 * 2. 从 manifest 中提取 widget 的元数据
 * 3. 通过通用函数动态加载组件（不使用 switch）
 *
 * 开发者只需：
 * 在 src/widgets 目录下创建 {widgetId}/ 文件夹
 * 添加 manifest.ts（导出 {widgetId}Manifest）和 index.tsx（导出 {WidgetId}）即可
 * 完全无需修改这个文件！
 */

import type { WidgetType } from '@/types';

// ============================================================
// WidgetManifest 类型定义
// ============================================================

export interface WidgetManifest {
  id: WidgetType
  name: string
  description: string
  enabled: boolean
  category: string
  icon: string
  version: string
  features: {
    draggable: boolean
    closeable: boolean
    resizable: boolean
  }
}

// ============================================================
// 自动加载所有 Manifest（无需手动注册）
// ============================================================

/**
 * 使用 import.meta.glob 自动加载所有 widget 的 manifest
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const manifestModules: Record<string, any> = import.meta.glob('./*/manifest.ts', { eager: true });

/**
 * 从加载的模块中提取 manifest 对象
 */
const buildManifests = (): WidgetManifest[] => {
  const manifests: WidgetManifest[] = [];

  for (const [path, module] of Object.entries(manifestModules)) {
    // 从路径提取 widget id: ./weather/manifest.ts -> weather
    const match = path.match(/\.\/(\w+)\/manifest\.ts$/);
    if (match) {
      const widgetId = match[1];

      // 根据命名约定获取导出的 manifest: {widgetId}Manifest
      const manifestName = `${widgetId}Manifest`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const manifest = (module as Record<string, any>)[manifestName];

      if (manifest) {
        manifests.push(manifest);
      } else {
        console.warn(
          `Widget "${widgetId}": Expected export named "${manifestName}" in ${path}, but not found.` +
          `\nPlease export your manifest as: export const ${manifestName} = { ... }`
        );
      }
    }
  }

  return manifests;
};

/**
 * 所有已注册 widget 的 manifest 列表
 * 完全自动发现，无需手动导入或注册！
 */
const manifests: WidgetManifest[] = buildManifests();

/**
 * 自动构建 widget registry
 * 从 manifests 数组中提取数据
 */
export const widgetRegistry = manifests.reduce(
  (acc, manifest) => {
    acc[manifest.id] = manifest;
    return acc;
  },
  {} as Record<string, WidgetManifest>
);

// ============================================================
// 通用的动态加载函数 - 替代 switch 语句
// ============================================================

/**
 * 预加载所有 widget 组件（使用 import.meta.glob）
 * 这样可以在构建时确定所有的组件依赖关系
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentModules: Record<string, any> = import.meta.glob('./**/index.tsx', { eager: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildComponentMap = (): Record<string, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map: Record<string, any> = {};

  for (const [path, module] of Object.entries(componentModules)) {
    // 从路径提取 widget id: ./weather/index.tsx -> weather
    const match = path.match(/\.\/(\w+)\/index\.tsx$/);
    if (match) {
      const widgetId = match[1];

      // 获取导出的组件
      const componentName = widgetId.charAt(0).toUpperCase() + widgetId.slice(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component = (module as Record<string, any>)[componentName];

      if (component) {
        map[widgetId] = component;
      }
    }
  }

  return map;
};

const componentMap = buildComponentMap();

/**
 * 同步获取已加载的 widget 组件
 * 用于 FloatingWidgets 中的实时渲染
 * 不使用 switch 语句，而是从预加载的 map 中获取
 */
export const getWidgetComponent = (widgetId: string) => {
  const component = componentMap[widgetId];

  if (!component) {
    console.warn(`Component for widget "${widgetId}" not found`);
    return null;
  }

  return component;
};

// ============================================================
// 元数据查询 API
// ============================================================

/**
 * 获取指定小部件的 manifest 信息
 * @param widgetId - 小部件 ID
 * @returns 小部件的 manifest 对象，如果不存在返回 undefined
 */
export const getWidgetManifest = (widgetId: string): WidgetManifest | undefined => {
  return widgetRegistry[widgetId];
};

/**
 * 获取小部件的显示名称（用于 UI 文本）
 * @param widgetId - 小部件 ID
 * @returns 小部件的显示名称
 */
export const getWidgetName = (widgetId: string): string => {
  const manifest = getWidgetManifest(widgetId);
  return manifest?.name || widgetId;
};

/**
 * 获取小部件的描述（用于 UI 文本）
 * @param widgetId - 小部件 ID
 * @returns 小部件的描述
 */
export const getWidgetDescription = (widgetId: string): string => {
  const manifest = getWidgetManifest(widgetId);
  return manifest?.description || '';
};

