import { App } from '@/app/App';
import '@/app/styles.css';
import '@/core/config/locale';
import '@/core/config/validation';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(<App />);
