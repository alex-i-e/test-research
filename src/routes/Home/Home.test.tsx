import React from "react";
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

  it("should reset result if search was updated", async () => {
    render(<Home />);

    expect(
      await screen.findByText(/Nothing to show yet./i)
    ).toBeInTheDocument();

    const input = await screen.findByPlaceholderText("Please type text");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "cat");
    expect(input).toHaveValue("cat");

    const search = await screen.findByText("Search");
    await userEvent.click(search);

    const catimages = await screen.findAllByTestId("image");
    expect(catimages.length).toBe(20);

    await userEvent.type(input, "dog");
    expect(input).toHaveValue("catdog");

    expect(
      await screen.findByText(/Nothing to show yet./i)
    ).toBeInTheDocument();
  });

  it("should submit 'query' by Enter", async () => {
    render(<Home />);

    expect(
      await screen.findByText(/Nothing to show yet./i)
    ).toBeInTheDocument();

    const input = await screen.findByPlaceholderText("Please type text");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "cat");
    expect(input).toHaveValue("cat");
    await userEvent.type(input, "[Enter]");

    const catImages = await screen.findAllByTestId("image");
    expect(catImages.length).toBe(20);
  });

  it("should ignore submit by Enter or by click if the query was not updated", async () => {
    render(<Home />);

    expect(
      await screen.findByText(/Nothing to show yet./i)
    ).toBeInTheDocument();

    const input = await screen.findByPlaceholderText("Please type text");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "cat");
    expect(input).toHaveValue("cat");
    await userEvent.type(input, "[Enter]");

    const catImages = await screen.findAllByTestId("image");
    expect(catImages.length).toBe(20);

    await userEvent.type(input, "[Enter]");
    const clickEnterImages = await screen.findAllByTestId("image");
    expect(clickEnterImages.length).toBe(20);

    const search = await screen.findByText("Search");
    await userEvent.click(search);
    const submitSearchImages = await screen.findAllByTestId("image");
    expect(submitSearchImages.length).toBe(20);
  });
});
