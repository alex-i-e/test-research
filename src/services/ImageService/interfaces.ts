export interface ImageApi {
  id: string;
  created_at: string; // utc
  updated_at: string; // utc
  promoted_at: string; // utc
  width: number;
  height: number;
  color: string; //"#A7A2A1",
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  alt_description: string | null;
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    instagram_username: string;
    twitter_username: string;
    portfolio_url: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
    };
  };
  current_user_collections: unknown[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  sponsorship: unknown;
  topic_submissions: unknown;
  tags: unknown;
}
export interface ImageApiResponse {
  total: number;
  total_pages: number;
  results: ImageApi[];
}
