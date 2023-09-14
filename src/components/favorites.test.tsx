import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component & Context
import Favorites from "./favorites";
import { FavoriteCtxProvider } from "../store/favoriteCtx";

// Unit testing:

test("displays favorite words and allows removal", () => {
  const favorites = [{ word: "FavoriteWord1" }, { word: "FavoriteWord2" }];

  render(
    <FavoriteCtxProvider>
      <Favorites />
    </FavoriteCtxProvider>
  );

  favorites.forEach((favorite) => {
    expect(screen.getByText(favorite.word)).toBeInTheDocument();
  });
});
