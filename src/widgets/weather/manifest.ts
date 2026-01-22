export const weatherManifest = {
  // 标识信息
  id: 'weather',
  name: 'Weather',
  description: 'Weather information',

  // 默认配置
  enabled: false,
  category: 'info',

  // 元数据
  icon: '🌤️',
  version: '1.0.0',

  // 支持的功能标志
  features: {
    draggable: true,      // 可拖拽
    closeable: true,      // 可关闭
    resizable: false,     // 不可调整大小
  },
}
