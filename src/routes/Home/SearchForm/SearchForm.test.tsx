import { it, describe, expect, vi } from "vitest";
import { screen, render } from "../../../tests/test-utils";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  it("should render form", async () => {
    render(
      <SearchForm
        onInputChange={vi.fn()}
        onSearch={vi.fn()}
        isLoading={false}
      />
    );

    const search = await screen.findByPlaceholderText("Please type text");
    expect(search).toBeInTheDocument();
  });
});
