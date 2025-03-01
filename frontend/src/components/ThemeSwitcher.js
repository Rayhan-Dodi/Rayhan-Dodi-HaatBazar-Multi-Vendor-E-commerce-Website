import React, { useState, useEffect } from 'react';

const themes = [
  { name: "Default", className: "" },
  { name: "Neon", className: "theme-neon" },
  { name: "Glassmorphism", className: "theme-glassmorphism" },
  { name: "Cyberpunk", className: "theme-cyberpunk" },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0].className);

  useEffect(() => {
    const root = document.documentElement;

    themes.forEach((theme) => {
      root.classList.remove(theme.className);
    });

    if (currentTheme) {
      root.classList.add(currentTheme);
    }
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme.className);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Switch Theme</h2>
      <div className="flex space-x-4 mt-4">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-transform transform hover:scale-105 
              ${theme.className === currentTheme
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}
            `}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;

/* CSS (To be added to your Tailwind or global stylesheet) */
/* Neon Theme */
.theme-neon {
  --tw-bg-opacity: 1;
  background-color: rgba(0, 255, 255, var(--tw-bg-opacity));
  color: #0ff;
  text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
}

/* Glassmorphism Theme */
.theme-glassmorphism {
  backdrop-filter: blur(10px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Cyberpunk Theme */
.theme-cyberpunk {
  background: linear-gradient(135deg, #ff007c, #3700ff);
  color: #fff;
  text-shadow: 0 0 10px #ff007c, 0 0 20px #3700ff;
}
