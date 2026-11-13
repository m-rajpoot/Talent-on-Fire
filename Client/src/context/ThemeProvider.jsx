import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_THEME, THEME_STORAGE_KEY, ThemeContext } from './themeContext'

const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY)
        if (saved === 'light' || saved === 'dark') return saved
    } catch {
        // storage blocked (private mode etc.) -> use default
    }
    return DEFAULT_THEME
}

const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(getInitialTheme)

    // apply the theme to <html> so every `dark:` class and CSS variable switches together
    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', theme === 'dark')
        root.style.colorScheme = theme
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme)
        } catch {
            // ignore storage errors
        }
    }, [theme])

    const setTheme = useCallback((value) => {
        if (value === 'light' || value === 'dark') setThemeState(value)
    }, [])

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [])

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
