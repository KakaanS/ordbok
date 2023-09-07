import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

it("should have hello world", () => {
  render(<App />);
  const message = screen.getByText(/hello world/i);
  expect(message).toBeVisible();
});
