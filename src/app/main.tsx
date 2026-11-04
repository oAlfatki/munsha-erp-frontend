import { App } from '@/app/App';
import '@/core/config/validation';
import '@/core/i18n/i18n';
import '@/core/styles/index.css';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
