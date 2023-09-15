import * as http from "../util/http";
import { ChangeEvent, useState } from "react";

import ResultDisplay from "./SearchResult";
import WordData from "../data/types";
import { useFavoriteCtx } from "../store/favoriteCtx";

import "../styles/search&result.css";
import "../styles/layout.css";

/**
 * This is the component that managing the search bar and you will also find the result component rendered here.
 */

const SearchBar = () => {
  const [word, setWord] = useState<string>("");
  const [result, setResult] = useState<WordData[]>([]);
  const { dispatch } = useFavoriteCtx();

  const handleSearch = async () => {
    try {
      setResult([]);
      const data = await http.fetchWordData(word);
      console.log("data", data);
      console.log("3");

      if (data && data.length < 0) {
        dispatch({ type: "SET_SELECTED_WORD", payload: data[0] });
      } else {
        dispatch({ type: "SET_SELECTED_WORD", payload: null });
      }
      setResult(data);
    } catch (error) {
      console.log("error fetching word", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <ResultDisplay result={result} />
      </div>
    </div>
  );
};

export default SearchBar;
