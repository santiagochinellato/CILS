export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredTheme(): ThemeMode | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'dark' || v === 'light' ? v : null;
}

export function detectPreferredTheme(): ThemeMode {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function initTheme() {
  const stored = getStoredTheme();
  const mode = stored ?? detectPreferredTheme();
  applyTheme(mode);
  return mode;
}

export function toggleTheme(): ThemeMode {
  const root = document.documentElement;
  const willBeDark = !root.classList.contains('dark');
  const mode: ThemeMode = willBeDark ? 'dark' : 'light';
  applyTheme(mode);
  localStorage.setItem(STORAGE_KEY, mode);
  return mode;
}
