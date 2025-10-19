import { useEffect, useState } from 'react';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialize theme based on user preference or localStorage
    const isDarkOS = window.matchMedia(COLOR_SCHEME_QUERY).matches;
    const isDarkStored = localStorage.getItem('darkMode') === 'true';
    const isDarkPreferred = isDarkStored ?? isDarkOS;
    
    setDarkMode(isDarkPreferred);
  }, []);
  
  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Persist preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  
  // Listen for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (e) => {
      // Only update if user hasn't explicitly chosen
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return {
    darkMode,
    toggleDarkMode: () => setDarkMode(prev => !prev),
    setDarkMode,
  };
}