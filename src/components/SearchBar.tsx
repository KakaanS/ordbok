import * as http from "../util/http";
import { ChangeEvent, useState } from "react";

import ResultDisplay from "./SearchResult";

export const SearchBar = () => {
  const [word, setWord] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const data = await http.fetchWordData(word);
      setResult(data);
    } catch (error) {
      console.log("error fetching word", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>
      <div>{result && <ResultDisplay result={result} />}</div>
    </div>
  );
};
