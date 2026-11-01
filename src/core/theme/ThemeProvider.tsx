import type { Theme } from '@/core/types/Theme';
import type { ThemeProviderProps } from '@/core/types/ThemeProviderProps';
import { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  theme: 'system',
  setTheme: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setValue] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('munsha-theme');
      return t === 'light' || t === 'dark' ? t : 'system';
    } catch {
      return 'system';
    }
  });
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () =>
      document.documentElement.classList.toggle(
        'dark',
        theme === 'dark' || (theme === 'system' && media.matches),
      );
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [theme]);
  const setTheme = (value: Theme) => {
    setValue(value);
    try {
      localStorage.setItem('munsha-theme', value);
    } catch {
      /* A disabled storage must not prevent changing the theme. */
    }
  };
  return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
}
export const useTheme = () => useContext(Context);
