import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Quote {
  text: string
  author: string
}

const quotes: Quote[] = [
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' },
  { text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
  { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
  { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { text: '设计不仅仅是它看起来和感觉如何，设计是它如何工作。', author: 'Steve Jobs' },
  { text: '简单可能比复杂更难，但它是值得的。', author: 'Steve Jobs' },
  { text: '不要为了讨好所有人而活，你无法做到。', author: 'Steve Jobs' },
  { text: '你的时间有限，不要浪费它来复制别人的人生。', author: 'Steve Jobs' },
  { text: '坚持你的梦想，不要放弃。', author: '未知' },
];

export function Quote() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleRefresh}
        disabled={isRefreshing}
        variant="ghost"
        size="sm"
        className="absolute -top-10 right-0 p-1 text-white/40 hover:text-white/60 transition-all duration-300 disabled:opacity-50 h-auto"
        title="Refresh quote"
      >
        <RefreshCw
          className={`w-4 h-4 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
        />
      </Button>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md">
        <div className="mb-6">
          <p className="text-lg font-light italic text-white/90 leading-relaxed">
            "{currentQuote.text}"
          </p>
        </div>
        <p className="text-sm text-white/60 text-right">— {currentQuote.author}</p>
      </div>
    </div>
  );
}
