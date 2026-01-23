import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/useSettingsStore';

export function Clock() {
  const [time, setTime] = useState(new Date());
  const { clockSettings } = useSettingsStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = clockSettings.format === '12h'
      ? time.getHours() % 12 || 12
      : time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const period = clockSettings.format === '12h'
      ? (time.getHours() >= 12 ? ' PM' : ' AM')
      : '';

    if (clockSettings.showSeconds) {
      return { main: `${hours}:${minutes}`, seconds, period };
    }
    return { main: `${hours}:${minutes}`, seconds: null, period };
  }, [time, clockSettings.format, clockSettings.showSeconds]);

  const formattedDate = useMemo(() => {
    const localeString = i18n.language === 'zh' ? 'zh-CN' : 'en-US';
    return time.toLocaleDateString(localeString, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [time, i18n.language]);

  return (
    <div className="text-center text-white">
      {/* Time display */}
      <div className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tight mb-3 drop-shadow-lg transition-all duration-300 hover:drop-shadow-2xl group cursor-default">
        <span className="inline-block transition-transform duration-300 group-hover:scale-[1.02]">
          {formattedTime.main}
        </span>
        {formattedTime.seconds && (
          <span className="text-4xl sm:text-5xl md:text-6xl opacity-50 ml-2 tabular-nums">
            :{formattedTime.seconds}
          </span>
        )}
        {formattedTime.period && (
          <span className="text-2xl sm:text-3xl md:text-4xl opacity-60 ml-2 font-light">
            {formattedTime.period}
          </span>
        )}
      </div>

      {/* Date display */}
      <div className="text-lg sm:text-xl md:text-2xl font-light opacity-60 tracking-wide transition-opacity duration-300 hover:opacity-80">
        {formattedDate}
      </div>
    </div>
  );
}
