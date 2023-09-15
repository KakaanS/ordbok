import React, { useState, useEffect } from "react";
import "../App.css";

/**
 * This is the component that managing the theme of the website.
 */

interface DarkThemeProps {
  toggleTheme: () => void;
}

const DarkTheme: React.FC<DarkThemeProps> = ({ toggleTheme }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkTheme(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <div>
      <button className="themeToggleBtn" onClick={toggleTheme}>
        Switch Theme
      </button>
    </div>
  );
};

export default DarkTheme;
