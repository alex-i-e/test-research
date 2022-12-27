import { rest } from "msw";
import { imagesApiResponse } from "./fixtures/images";

export const handlers = [
  rest.get("https://api.unsplash.com/search/photos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(imagesApiResponse));
  }),
];
