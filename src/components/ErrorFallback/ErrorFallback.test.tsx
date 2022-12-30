import React from "react";
import { describe, expect, vi, afterAll, beforeAll } from "vitest";

import { render, screen, userEvent } from "../../tests/test-utils";
import { ErrorFallback } from "./ErrorFallback";

describe("ErrorFallback", () => {
  const oldWindowLocation = window.location;

  beforeAll(() => {
    // @ts-ignore: "location" is read-only property
    delete window.location;
    // @ts-ignore: "location" is read-only property
    window.location = Object.defineProperties(
      {},
      {
        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
        reload: {
          configurable: true,
          value: vi.fn(),
        },
      }
    );
  });
  afterAll(() => {
    // restore `window.location`
    window.location = oldWindowLocation;
  });

  it("should render component", async () => {
    const error = {
      name: "error",
      message: "component throws a error",
    };

    render(<ErrorFallback error={error} resetErrorBoundary={vi.fn} />);

    expect(
      await screen.findByText(/component throws a error/i)
    ).toBeInTheDocument();
  });

  it("should reload page on submit", async () => {
    const error = {
      name: "error",
      message: "component throws a error",
    };

    render(<ErrorFallback error={error} resetErrorBoundary={vi.fn} />);
    expect(window.location.reload).not.toHaveBeenCalled();

    const refreshButton = await screen.findByText("Refresh page");
    await userEvent.click(refreshButton);
    expect(window.location.reload).toHaveBeenCalledOnce();
  });
});
