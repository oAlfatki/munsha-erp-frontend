import '@/core/i18n/i18n';
import { App } from '@/app/App';
import '@/core/config/validation';
import { createRoot } from 'react-dom/client';
import '@/core/styles/index.css';
createRoot(document.getElementById('root')!).render(<App />);
