import { useState, useEffect, useCallback } from 'react';
import { initTheme, toggleTheme as toggleThemeUtil } from '../utils/theme';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(initTheme());
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = toggleThemeUtil();
    setTheme(newTheme);
    return newTheme;
  }, []);

  return { theme, toggleTheme } as const;
}
