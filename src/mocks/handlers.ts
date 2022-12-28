import { rest } from "msw";
import { imagesApiResponse } from "./fixtures/images";

export const handlers = [
  rest.get("https://api.unsplash.com/search/photos", (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    if (query === "force::reject") {
      return res(ctx.status(400), ctx.json(new Error("failed")));
    }

    return res(ctx.status(200), ctx.json(imagesApiResponse));
  }),
];
