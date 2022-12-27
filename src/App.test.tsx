import { it, describe, expect } from "vitest";

import App from "./App";
import { render, screen, userEvent } from "./tests/test-utils";

describe("App", () => {
  it("should render login page", async () => {
    render(<App />);
    expect(
      await screen.findByText(/Enjoy image searching/i)
    ).toBeInTheDocument();
  });

  it("should redirect on home page after login", async () => {
    render(<App />);

    const input = await screen.findByPlaceholderText("Please type your name");

    expect(input).toBeInTheDocument();
    await userEvent.type(input, "Bob");

    expect(input).toHaveValue("Bob");

    const submit = await screen.findByText("Submit");
    await userEvent.click(submit);
    expect(await screen.findByText(/Welcome, Bob/i)).toBeInTheDocument();
  });

  it("should come back to login page after logout", async () => {
    render(<App />);

    const input = await screen.findByPlaceholderText("Please type your name");
    await userEvent.type(input, "Bob");

    const submit = await screen.findByText("Submit");
    await userEvent.click(submit);
    expect(await screen.findByText(/Welcome, Bob/i)).toBeInTheDocument();

    const logout = await screen.findByText("Logout");
    await userEvent.click(logout);

    expect(
      await screen.findByText(/Enjoy image searching/i)
    ).toBeInTheDocument();
  });
});
