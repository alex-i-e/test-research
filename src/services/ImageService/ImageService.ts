import axios from "axios";
import {
  _CLIENT_ID,
  DEFAULT_lIST_OPTIONS,
  IMAGE_SERVICE_API,
} from "../constants";
import { ImageApiResponse } from "./interfaces";

class ImageService {
  static async getAll(
    params: Partial<{
      query: string;
      per_page: number;
      page: number;
    }>
  ) {
    try {
      const response = await axios.get<ImageApiResponse>(
        `${IMAGE_SERVICE_API}/search/photos`,
        {
          params: {
            client_id: _CLIENT_ID,
            ...DEFAULT_lIST_OPTIONS,
            ...params,
          },
        }
      );

      return response.data;
    } catch (e) {
      // @todo: add an error handling
      console.log("Error while fetching...");
      return {
        results: [],
        total: 0,
        total_pages: 0,
      } as ImageApiResponse;
    }
  }
}

export { ImageService };
