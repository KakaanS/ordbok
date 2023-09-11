import { useFavoriteCtx } from "../store/favoriteCtx";

function Favorites() {
  const { state, dispatch } = useFavoriteCtx();

  const handleWordClick = (word) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: word });
    console.log("word", word);
  };
  const handleRemoveWord = (word) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: word });
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {state.favorites.map((favorite, index) => (
          <li key={index} onClick={() => handleWordClick(favorite.word)}>
            {favorite.word}
            <button onClick={() => handleRemoveWord(favorite.word)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
