import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

import { FavoriteCtxProvider } from "../store/favoriteCtx";

const custumRender = () => {
  return render(
    <FavoriteCtxProvider>
      <SearchBar />
    </FavoriteCtxProvider>
  );
};

test("if there is a searchbar", () => {
  custumRender();
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeInTheDocument();
});

test("if there is a button", () => {
  custumRender();
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

// lägg till test på om det inte finns något i input fältet.
