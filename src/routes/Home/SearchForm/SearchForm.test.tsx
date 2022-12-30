import React from "react";
import { it, describe, expect, vi } from "vitest";

import { screen, render, userEvent } from "../../../tests/test-utils";
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

  it("should trigger onSearch on form submit", async () => {
    const onInputChangeMock = vi.fn();
    const onSearchMock = vi.fn();
    render(
      <SearchForm
        onInputChange={onInputChangeMock}
        onSearch={onSearchMock}
        isLoading={false}
      />
    );

    const input = await screen.findByPlaceholderText("Please type text");
    await userEvent.type(input, "cat");
    expect(input).toHaveValue("cat");

    const submit = await screen.findByText("Search");
    await userEvent.click(submit);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it("should NOT trigger onSearch when submitted several times with the same search value", async () => {
    const onInputChangeMock = vi.fn();
    const onSearchMock = vi.fn();
    render(
      <SearchForm
        onInputChange={onInputChangeMock}
        onSearch={onSearchMock}
        isLoading={false}
      />
    );

    const input = await screen.findByPlaceholderText("Please type text");
    await userEvent.type(input, "cat");

    const submit = await screen.findByText("Search");
    expect(submit).toBeEnabled();
    await userEvent.click(submit);
    expect(submit).toBeDisabled();
    await userEvent.click(submit);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it("should trigger onInputChange when search value was changed", async () => {
    const onInputChangeMock = vi.fn();
    const onSearchMock = vi.fn();
    render(
      <SearchForm
        onInputChange={onInputChangeMock}
        onSearch={onSearchMock}
        isLoading={false}
      />
    );

    const input = await screen.findByPlaceholderText("Please type text");
    await userEvent.type(input, "horse");

    expect(onInputChangeMock).toHaveBeenCalledTimes(5);
  });

  it("should return search value on getSearchValue() trigger", async () => {
    const onInputChangeMock = vi.fn();
    const onSearchMock = vi.fn();

    const formRefMock = {
      current: {
        getSearchValue: vi.fn(),
      },
    };

    render(
      <SearchForm
        ref={formRefMock}
        onInputChange={onInputChangeMock}
        onSearch={onSearchMock}
        isLoading={false}
      />
    );

    const input = await screen.findByPlaceholderText("Please type text");
    await userEvent.type(input, "dog");

    expect(formRefMock.current.getSearchValue()).toEqual("dog");
  });
});
