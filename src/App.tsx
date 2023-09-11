import "./App.css";
import { SearchBar } from "./components/SearchBar";
import Favorites from "./components/favorites";
import { FavoriteCtxProvider } from "./store/favoriteCtx";

function App() {
  return (
    <>
      <FavoriteCtxProvider>
        <Favorites />
        <SearchBar />
      </FavoriteCtxProvider>
    </>
  );
}

export default App;
