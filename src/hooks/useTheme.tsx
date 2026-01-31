import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  const { theme, toggleTheme } = context;
  const isDarkMode = theme === 'dark';

  return { theme, isDarkMode, toggleTheme };
};