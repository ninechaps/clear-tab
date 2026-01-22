import { Routes, Route } from 'react-router-dom'
import { widgetRegistry } from '@/widgets/_registry'
import { HomePage } from '@/pages/HomePage'
import { WidgetPage } from '@/pages/WidgetPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* 主页路由 */}
      <Route path="/" element={<HomePage />} />

      {/* 动态生成：每个 widget 的独立路由 */}
      {Object.keys(widgetRegistry).map(widgetId => (
        <Route
          key={widgetId}
          path={`/widget/${widgetId}`}
          element={<WidgetPage widgetId={widgetId} />}
        />
      ))}

      {/* 404 页面 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
