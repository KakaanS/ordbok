import { render } from "@testing-library/react";
import ResultDisplay from "./SearchResult";
import exDataBuild from "../__test__/exampleDataBuild.json"; // Wherever your mockWordData is stored
import { FavoriteCtxProvider } from "../store/favoriteCtx";

describe("ResultDisplay", () => {
  it("should render the ResultDisplay component", () => {
    const { getByText } = render(
      <FavoriteCtxProvider>
        <ResultDisplay result={exDataBuild} />
      </FavoriteCtxProvider>
    );
    const resultElement = getByText("Exact matches:");
    expect(resultElement).toBeInTheDocument();
  });
});
