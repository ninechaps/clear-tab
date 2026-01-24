import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageChange = (value: 'en' | 'zh') => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className="w-auto min-w-20 h-10 px-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('language.english')}</SelectItem>
        <SelectItem value="zh">{t('language.chinese')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
