import { createContext } from 'react'

// localStorage key used by ThemeProvider and by the inline script in index.html (keep both the same)
export const THEME_STORAGE_KEY = 'hire-the-fire-theme'

// default theme for first-time visitors
export const DEFAULT_THEME = 'dark'

export const ThemeContext = createContext({
    theme: DEFAULT_THEME,
    setTheme: () => { },
    toggleTheme: () => { },
})
