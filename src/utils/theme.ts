// Mantiene el tipo original para no romper comparaciones existentes,
// pero internamente sólo devolveremos/aplicaremos 'light'.
export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredTheme(): ThemeMode | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'dark' || v === 'light' ? v : null;
}

// Siempre preferimos claro.
export function detectPreferredTheme(): ThemeMode {
  return 'light';
}

export function applyTheme(_mode: ThemeMode) {
  const root = document.documentElement;
  // Forzamos quitar la clase dark siempre
  root.classList.remove('dark');
}

export function initTheme() {
  // Ignoramos lo almacenado y la preferencia del sistema; siempre claro.
  const mode: ThemeMode = 'light';
  localStorage.setItem(STORAGE_KEY, mode);
  applyTheme(mode);
  return mode;
}

export function toggleTheme(): ThemeMode {
  // El toggle ya no cambia a oscuro; mantiene siempre claro.
  const mode: ThemeMode = 'light';
  localStorage.setItem(STORAGE_KEY, mode);
  applyTheme(mode);
  return mode;
}
