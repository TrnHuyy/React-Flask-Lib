// themeContext.js
import React, { ReactNode, createContext, useState } from 'react';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
  }

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {}
});
