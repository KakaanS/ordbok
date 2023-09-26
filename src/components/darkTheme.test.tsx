import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import DarkTheme from "./DarkTheme";

const localStorageMock = {
  getItem: vi.fn(() => "dark"),
  setItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

it("DarkTheme Component toggles theme on button click", async () => {
  render(<DarkTheme toggleTheme={() => {}} />);
  expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
  expect(localStorageMock.getItem).toHaveReturnedWith("dark");

  const toggleButton = screen.getByRole("button");
  await userEvent.click(toggleButton);
  expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");

  await userEvent.click(toggleButton);

  expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
});

it("should render a button", () => {
  render(<DarkTheme toggleTheme={() => {}} />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
