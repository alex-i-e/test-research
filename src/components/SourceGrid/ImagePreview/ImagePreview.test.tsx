import { it, describe, expect } from "vitest";

import { render, screen } from "../../../tests/test-utils";
import { ImagePreview } from "./ImagePreview";
import { imagesApiResponse } from "../../../mocks/fixtures/images";

describe("ImagePreview", () => {
  it("should render <img/> with the following attributes", async () => {
    const source = imagesApiResponse.results[1] as any;
    render(<ImagePreview source={source} />);

    const img = await screen.findByTestId(source.id);
    expect(img).toBeInTheDocument();

    const srcSet = `${source.urls.raw}&w=200&dpr=1 1x, ${source.urls.raw}&w=200&fit=max&q=40&dpr=2 2x`;
    const imageHeight = (source.height / source.width) * 200;
    expect(img).toHaveAttribute("src", source.urls.thumb);
    source.alt_description &&
      expect(img).toHaveProperty("alt", source.alt_description);
    source.description &&
      expect(img).toHaveAttribute("title", source.description);
    expect(img).toHaveAttribute("data-is-loaded", "false");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveStyle(`--image-height: ${imageHeight}px;`);
    expect(img).toHaveAttribute("srcSet", srcSet);

    const bgBox = await screen.findByTestId(`bg-${source.id}`);
    expect(bgBox).toBeInTheDocument();
    expect(bgBox).toHaveStyle(
      `--image-height: ${imageHeight}px; --image-bg-color: ${source.color};`
    );
  });
});
