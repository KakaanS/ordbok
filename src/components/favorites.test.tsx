import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Component & Context
import Favorites from "./favorites";
import { FavoriteCtxProvider } from "../store/favoriteCtx";

test("renders favorites heading", () => {
  render(
    <FavoriteCtxProvider>
      <Favorites />
    </FavoriteCtxProvider>
  );
  const favoritesHeading = screen.getByText("Favorites");
  expect(favoritesHeading).toBeInTheDocument();
});
