import { it, describe, expect } from "vitest";

import Home from "./Home";
import { render, screen, userEvent } from "../../tests/test-utils";

describe("Home", () => {
  it("should render home page with empty list", async () => {
    render(<Home />);
    expect(
      await screen.findByText(/Nothing to show yet./i)
    ).toBeInTheDocument();
  });

  it("should retrieve data after type in search input", async () => {
    render(<Home />);

    const input = await screen.findByPlaceholderText("Please type text");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "cat");
    expect(input).toHaveValue("cat");

    const search = await screen.findByText("Search");
    await userEvent.click(search);

    const images = await screen.findAllByTestId("image");
    expect(images.length).toBe(20);
  });
});
