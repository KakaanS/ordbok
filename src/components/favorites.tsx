import { useFavoriteCtx } from "../store/favoriteCtx";
import WordData from "../data/types";
import "../styles/layout.css";
import "../styles/favorites.css";

/**
 * This is a component that renders a list of faovorite words.
 * It also has a button that removes the word from the list.
 *
 */

function Favorites() {
  const { state, dispatch } = useFavoriteCtx();

  const handleRemoveWord = (word: string) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: word });
  };

  const handleWordClick = (word: WordData) => {
    dispatch({ type: "SET_SELECTED_WORD", payload: word });
  };

  return (
    <div className="favoritesContainer">
      <h2>Favorites</h2>
      <ul>
        {state.favorites.map((favorite, index) => (
          <li
            className="favoriteItem"
            key={index}
            onClick={() => handleWordClick(favorite)}
          >
            {favorite.word}
            <button
              className="removeBtn"
              onClick={() => handleRemoveWord(favorite.word)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
