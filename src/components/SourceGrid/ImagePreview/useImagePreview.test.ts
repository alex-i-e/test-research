import { act, renderHook } from "@testing-library/react";

import { useImagePreview } from "./useImagePreview";
import { imagesApiResponse } from "../../../mocks/fixtures/images";
import { ImageApi } from "../../../services/ImageService/interfaces";

describe("useImagePreview", () => {
  const source = imagesApiResponse.results[0] as ImageApi;

  it("should return default properties", () => {
    const { result } = renderHook(() => useImagePreview(source));

    expect(result.current).toStrictEqual({
      isLoaded: false,
      imageHeight: "266.66666666666663",
      srcSet:
        "https://images.unsplash.com/photo-1632538896458-f09b58492db7?ixid=MnwzOTI0Njd8MHwxfHNlYXJjaHwxfHxjfGVufDB8fHx8MTY3MjA5MTQ1Ng&ixlib=rb-4.0.3&w=200&dpr=1 1x, https://images.unsplash.com/photo-1632538896458-f09b58492db7?ixid=MnwzOTI0Njd8MHwxfHNlYXJjaHwxfHxjfGVufDB8fHx8MTY3MjA5MTQ1Ng&ixlib=rb-4.0.3&w=200&fit=max&q=40&dpr=2 2x",
      onLoad: expect.any(Function),
    });
  });

  it("should update state when the image will be loaded", async () => {
    const { result } = renderHook(() => useImagePreview(source));

    await act(() => result.current.onLoad());

    expect(result.current).toStrictEqual({
      isLoaded: true,
      imageHeight: "266.66666666666663",
      srcSet:
        "https://images.unsplash.com/photo-1632538896458-f09b58492db7?ixid=MnwzOTI0Njd8MHwxfHNlYXJjaHwxfHxjfGVufDB8fHx8MTY3MjA5MTQ1Ng&ixlib=rb-4.0.3&w=200&dpr=1 1x, https://images.unsplash.com/photo-1632538896458-f09b58492db7?ixid=MnwzOTI0Njd8MHwxfHNlYXJjaHwxfHxjfGVufDB8fHx8MTY3MjA5MTQ1Ng&ixlib=rb-4.0.3&w=200&fit=max&q=40&dpr=2 2x",
      onLoad: expect.any(Function),
    });
  });
});
