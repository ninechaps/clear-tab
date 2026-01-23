import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@/i18n/config';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
