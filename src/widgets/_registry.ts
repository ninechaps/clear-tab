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
 * 跟踪重复的 widget IDs
 */
let duplicateWidgetIds: string[] = [];

/**
 * 从加载的模块中提取 manifest 对象
 * 直接使用 manifest 中的 id 字段，支持任何包含 id 的命名约定
 */
const buildManifests = (): WidgetManifest[] => {
  const manifests: WidgetManifest[] = [];
  const seenIds = new Set<string>();
  duplicateWidgetIds = [];

  for (const [path, module] of Object.entries(manifestModules)) {
    // 查找任何包含 id 字段的导出对象
    for (const [exportName, exported] of Object.entries(module)) {
      // 检查是否是有效的 manifest 对象
      if (
        exported &&
        typeof exported === 'object' &&
        'id' in exported &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (exported as any).id === 'string'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const manifest = exported as any as WidgetManifest;

        // 检测重复 ID
        if (seenIds.has(manifest.id)) {
          duplicateWidgetIds.push(manifest.id);
          console.warn(
            `⚠️  Duplicate widget ID detected: "${manifest.id}" in ${path} (export: ${exportName}). Skipping this widget.`
          );
          continue;
        }

        seenIds.add(manifest.id);
        manifests.push(manifest);
        break; // 只取第一个包含 id 的导出
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
 * 将 kebab-case 转换为 PascalCase
 * 例如: 'color-converter' -> 'ColorConverter'
 */
const kebabToPascalCase = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

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

  // 使用已注册的 manifests 来查找对应的组件
  // 这样可以确保只加载已注册的 widgets 的组件
  for (const manifest of manifests) {
    const componentName = kebabToPascalCase(manifest.id);

    // 在 componentModules 中查找对应的组件
    for (const [path, module] of Object.entries(componentModules)) {
      // 匹配 ./widget-id/index.tsx 的路径格式
      if (path.includes(`/${manifest.id}/index.tsx`)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const component = (module as Record<string, any>)[componentName];

        if (component) {
          map[manifest.id] = component;
        } else {
          console.warn(
            `Widget "${manifest.id}": Expected export named "${componentName}" in ${path}, but not found.`
          );
        }
        break;
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

/**
 * 获取所有重复的 widget IDs
 * @returns 重复的 widget ID 数组
 */
export const getDuplicateWidgetIds = (): string[] => {
  return duplicateWidgetIds;
};

