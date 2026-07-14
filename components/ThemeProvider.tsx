"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

function ThemeCookieSync() {
  const { theme, setTheme } = useTheme();
  
  // Sync from cookie on mount if it differs
  React.useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
    if (match && match[2] !== theme && (match[2] === 'light' || match[2] === 'dark')) {
      setTheme(match[2]);
    }
  }, [theme, setTheme]);

  // Sync to cookie on theme change
  React.useEffect(() => {
    if (theme === 'dark' || theme === 'light') {
      document.cookie = `theme=${theme}; domain=.cancellls.com; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [theme]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  );
}
