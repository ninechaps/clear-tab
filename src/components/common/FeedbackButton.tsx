import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeedbackButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    window.open('https://github.com/ninechaps/clear-tab/issues', '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in h-auto"
      title={t('common.feedback')}
    >
      <MessageCircle className="w-5 h-5"/>
    </Button>
  );
}
