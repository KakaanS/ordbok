/**
 * This file contains the http request to the dictionary api.
 */

const wordURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWordData(word: string) {
  const response = await fetch(`${wordURL}${word}`);
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.title || "Could not fetch word data");
  }

  return data;
}
