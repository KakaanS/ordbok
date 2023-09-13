import "./App.css";
import "./styles/layout.css";

import { SearchBar } from "./components/SearchBar";
import Favorites from "./components/favorites";
import { FavoriteCtxProvider } from "./store/favoriteCtx";
import DarkTheme from "./components/DarkTheme";
import { useEffect, useState } from "react";

function App() {
  const initialTheme = localStorage.getItem("theme") || "light";
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    initialTheme === "dark"
  );

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <div className={`appContainer ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
      <DarkTheme toggleTheme={toggleTheme} />
      <FavoriteCtxProvider>
        <Favorites />
        <SearchBar />
      </FavoriteCtxProvider>
    </div>
  );
}

export default App;
