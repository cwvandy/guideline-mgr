/*
** components/theme/switcher.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

"use client";

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed bottom-2 left-20 z-100">
      <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </Button>
    </div>
  );
}

export { ThemeSwitcher };