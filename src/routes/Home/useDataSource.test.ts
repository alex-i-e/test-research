import { FormEvent } from "react";
import { vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useDataSource } from "./useDataSource";
import { ImageService } from "../../services/ImageService/ImageService";

describe("useDataSource", async () => {
  it("should return default properties", () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn(),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    expect(result.current).toStrictEqual({
      isFirstPageLoaded: false,
      sources: [],
      page: null,
      pageRef: { current: null },
      isLoading: false,
      setPage: expect.any(Function),
      onNewRequest: expect.any(Function),
      loadNextPage: expect.any(Function),
      resetSources: expect.any(Function),
    });
  });

  it("should not send request if query was empty", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => ""),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(() => result.current.onNewRequest(event));

    await expect(result.current.sources).toStrictEqual([]);
    await expect(result.current.page).toStrictEqual(null);
    await expect(result.current.pageRef.current).toEqual(null);
  });

  it("should not set flag isFirstPageLoaded if query was filled and onNewRequest() returned empty list", async () => {
    vi.spyOn(ImageService, "getAll").mockResolvedValueOnce({
      results: [],
    } as any);
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "cat"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(async () => await result.current.onNewRequest(event));

    await expect(result.current.page).toEqual(1);
    await expect(result.current.pageRef.current).toEqual(1);
    await expect(result.current.isFirstPageLoaded).toEqual(false);
    await expect(result.current.sources).toEqual([]);
  });

  it("should set flag isFirstPageLoaded if query was filled and onNewRequest() returned filled list", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "cat"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(async () => await result.current.onNewRequest(event));

    await expect(result.current.page).toEqual(1);
    await expect(result.current.pageRef.current).toEqual(1);
    await expect(result.current.isFirstPageLoaded).toEqual(true);
    await expect(result.current.sources.length).toStrictEqual(20);
  });

  it("should retrieve second page sources if loadNextPage() was triggered", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "cat"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(async () => await result.current.onNewRequest(event));

    await expect(result.current.page).toEqual(1);
    await expect(result.current.pageRef.current).toEqual(1);
    await expect(result.current.isFirstPageLoaded).toEqual(true);

    await act(async () => await result.current.loadNextPage());

    await expect(result.current.page).toEqual(2);
    await expect(result.current.pageRef.current).toEqual(2);
    await expect(result.current.isFirstPageLoaded).toEqual(true);
    await expect(result.current.sources.length).toStrictEqual(40);
  });

  it("should reset source list if resetSources() was triggered", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "cat"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(async () => await result.current.onNewRequest(event));

    await expect(result.current.page).toEqual(1);
    await expect(result.current.pageRef.current).toEqual(1);
    await expect(result.current.isFirstPageLoaded).toEqual(true);

    await act(async () => await result.current.loadNextPage());

    await expect(result.current.page).toEqual(2);
    await expect(result.current.pageRef.current).toEqual(2);
    await expect(result.current.isFirstPageLoaded).toEqual(true);
    await expect(result.current.sources.length).toStrictEqual(40);

    await act(async () => await result.current.resetSources());

    await expect(result.current.page).toEqual(null);
    await expect(result.current.pageRef.current).toEqual(null);
    await expect(result.current.isFirstPageLoaded).toEqual(false);
    await expect(result.current.sources.length).toStrictEqual(0);
  });

  it("should not trigger next page request if sources from first page were not retrieved", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "cat"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    await expect(result.current.page).toEqual(null);
    await expect(result.current.pageRef.current).toEqual(null);
    await expect(result.current.isFirstPageLoaded).toEqual(false);
    await expect(result.current.sources.length).toStrictEqual(0);

    await act(async () => await result.current.loadNextPage());

    await expect(result.current.page).toEqual(null);
    await expect(result.current.pageRef.current).toEqual(null);
    await expect(result.current.isFirstPageLoaded).toEqual(false);
    await expect(result.current.sources.length).toStrictEqual(0);
  });

  it("should return empty result if an error was thrown while requesting ", async () => {
    const formRef = {
      current: {
        getSearchValue: vi.fn().mockImplementation(() => "force::reject"),
      },
    };
    const { result } = renderHook(() => useDataSource({ formRef }));

    const event = {
      preventDefault: vi.fn(),
    } as any as FormEvent<HTMLFormElement>;
    await act(async () => await result.current.onNewRequest(event));

    await expect(result.current.page).toEqual(1);
    await expect(result.current.pageRef.current).toEqual(1);
    await expect(result.current.isFirstPageLoaded).toEqual(false);
    await expect(result.current.sources).toEqual([]);
  });
});
