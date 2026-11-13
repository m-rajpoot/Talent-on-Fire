import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'
import useTheme from '@/hooks/useTheme'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            className="rounded-full cursor-pointer shrink-0 max-sm:size-8"
        >
            {
                isDark
                    ? <Sun className="size-[18px] text-amber-300 transition-transform duration-500 hover:rotate-90" />
                    : <Moon className="size-[18px] text-[#6A38C2] transition-transform duration-500 hover:-rotate-12" />
            }
        </Button>
    )
}

export default ThemeToggle
