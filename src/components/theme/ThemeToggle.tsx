'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative"
      aria-label={theme === 'light' ? 'Dark mode\'ga o\'tish' : 'Light mode\'ga o\'tish'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  )
}