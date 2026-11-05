import { App } from '@/app/App';
import '@/app/styles.css';
import '@/core/config/validation';
import '@/core/config/locale';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
