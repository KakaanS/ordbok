const wordURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWordData(word: string) {
  try {
    const response = await fetch(`${wordURL}${word}`);
    if (!response.ok) {
      throw new Error("Word not found");
    }
    return response.json();
  } catch (error) {
    console.log("error feching word", error);
    throw error;
  }
}
