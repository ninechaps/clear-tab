import { Sun } from 'lucide-react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useI18n } from '@/i18n'

export function Weather() {
  const { weatherSettings } = useSettingsStore()
  const { t } = useI18n()

  // Placeholder - would integrate with a weather API
  const mockWeather = {
    temp: weatherSettings.unit === 'celsius' ? 22 : 72,
    condition: t.weather.sunny,
    location: weatherSettings.location || t.weather.location,
  }

  const unit = weatherSettings.unit === 'celsius' ? '°C' : '°F'

  return (
    <div className="flex items-center gap-4 text-white bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
      <div className="text-4xl">
        <Sun className="w-12 h-12" />
      </div>
      <div>
        <div className="text-3xl font-light">
          {mockWeather.temp}{unit}
        </div>
        <div className="text-sm opacity-70">
          {mockWeather.condition} · {mockWeather.location}
        </div>
      </div>
    </div>
  )
}
