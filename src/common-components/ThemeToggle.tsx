
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md focus:outline-none transition-colors duration-300 group"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-yellow-400 dark:group-hover:border-blue-400 animate-border"></span>
      {theme === 'light' ? (
        <FaSun className="text-yellow-500 text-2xl transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <FaMoon className="text-blue-400 text-2xl transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );

// Add this to your global CSS (e.g., index.css):
// @keyframes borderPulse {
//   0%, 100% { border-color: transparent; }
//   50% { border-color: #fbbf24; }
// }
// .animate-border {
//   animation: borderPulse 1s infinite;
// }
};

export default ThemeToggle;
