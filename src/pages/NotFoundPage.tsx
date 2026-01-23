import { Link } from 'react-router-dom';
import { Background } from '@/components/common';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Background />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/60 mb-8 text-lg">Page not found</p>
        <Link to="/">
          <Button className="px-8 py-3 bg-white/15 hover:bg-white/25 text-white rounded-lg transition-colors">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
