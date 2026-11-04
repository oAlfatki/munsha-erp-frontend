import { useTheme } from '@/core/theme/ThemeProvider';
import { Monitor,Moon,Sun } from 'lucide-react';
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="تغيير الثيم"
      title={`الثيم: ${theme}`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
    >
      <Icon size={18} />
    </button>
  );
}
